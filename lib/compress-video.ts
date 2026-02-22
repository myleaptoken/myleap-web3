/**
 * Client-side video compression using Canvas + MediaRecorder.
 * Simplified and robust approach that avoids real-time playback issues.
 */

const MAX_UPLOAD_MB = 200

export interface CompressionProgress {
  stage: "loading" | "compressing" | "finalizing" | "done" | "skipped"
  percent: number
  message: string
}

export async function compressVideo(
  file: File,
  onProgress?: (p: CompressionProgress) => void,
): Promise<File> {
  const fileSizeMB = file.size / (1024 * 1024)

  // If under limit, skip compression
  if (fileSizeMB <= MAX_UPLOAD_MB) {
    onProgress?.({ stage: "skipped", percent: 100, message: `Video de ${fileSizeMB.toFixed(1)}MB listo para subir` })
    return file
  }

  onProgress?.({ stage: "loading", percent: 5, message: "Cargando video para comprimir..." })

  // Create a video element to read metadata
  const videoUrl = URL.createObjectURL(file)
  const video = document.createElement("video")
  video.muted = true
  video.playsInline = true
  video.preload = "auto"
  video.src = videoUrl

  // Wait for metadata + enough data to play
  await new Promise<void>((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error("Timeout cargando video")), 30000)
    video.oncanplaythrough = () => { clearTimeout(timeout); resolve() }
    video.onloadedmetadata = () => {
      // Also start loading data
      video.currentTime = 0
    }
    video.onerror = () => { clearTimeout(timeout); reject(new Error("No se pudo cargar el video")) }
  })

  const duration = video.duration
  if (!duration || !isFinite(duration) || duration <= 0) {
    URL.revokeObjectURL(videoUrl)
    throw new Error("No se pudo determinar la duracion del video")
  }

  // Calculate dimensions (scale down to 720p max)
  let width = video.videoWidth
  let height = video.videoHeight
  const maxW = 1280, maxH = 720
  if (width > maxW || height > maxH) {
    const scale = Math.min(maxW / width, maxH / height)
    width = Math.round(width * scale)
    height = Math.round(height * scale)
  }
  // Even dimensions
  width = width - (width % 2)
  height = height - (height % 2)

  // Target bitrate calculation
  const targetMB = MAX_UPLOAD_MB * 0.85
  const targetBits = targetMB * 8 * 1024 * 1024
  const videoBps = Math.max(Math.floor(targetBits / duration - 128000), 500000)

  onProgress?.({ stage: "compressing", percent: 10, message: `Comprimiendo ${fileSizeMB.toFixed(0)}MB a ~${Math.round(targetMB)}MB...` })

  // Set up canvas
  const canvas = document.createElement("canvas")
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext("2d")!

  // Canvas stream at 30fps
  const fps = 30
  const canvasStream = canvas.captureStream(fps)

  // Select best supported mime type
  const mimeTypes = [
    "video/webm;codecs=vp8,opus",
    "video/webm;codecs=vp9,opus",
    "video/webm",
  ]
  let selectedMime = ""
  for (const mime of mimeTypes) {
    if (MediaRecorder.isTypeSupported(mime)) {
      selectedMime = mime
      break
    }
  }
  if (!selectedMime) {
    URL.revokeObjectURL(videoUrl)
    throw new Error("Tu navegador no soporta la compresion de video. Usa Chrome o Edge.")
  }

  // Frame-by-frame approach: seek through video and capture each frame
  // This avoids real-time playback issues
  const chunks: Blob[] = []
  const recorder = new MediaRecorder(canvasStream, {
    mimeType: selectedMime,
    videoBitsPerSecond: videoBps,
  })

  recorder.ondataavailable = (e) => {
    if (e.data.size > 0) chunks.push(e.data)
  }

  const recorderStopped = new Promise<void>((resolve) => {
    recorder.onstop = () => resolve()
  })

  recorder.start(500)

  // Process frames by seeking through the video
  const totalFrames = Math.ceil(duration * fps)
  const frameInterval = 1 / fps

  for (let i = 0; i <= totalFrames; i++) {
    const seekTime = Math.min(i * frameInterval, duration)

    // Seek to the frame
    video.currentTime = seekTime
    await new Promise<void>((resolve) => {
      const onSeeked = () => {
        video.removeEventListener("seeked", onSeeked)
        resolve()
      }
      video.addEventListener("seeked", onSeeked)
    })

    // Draw frame to canvas
    ctx.drawImage(video, 0, 0, width, height)

    // Wait for frame duration to maintain timing for MediaRecorder
    await new Promise((r) => setTimeout(r, 10))

    // Update progress
    if (i % 30 === 0 || i === totalFrames) {
      const percent = 10 + Math.round((i / totalFrames) * 80)
      const currentSec = Math.round(seekTime)
      const totalSec = Math.round(duration)
      onProgress?.({
        stage: "compressing",
        percent: Math.min(percent, 90),
        message: `Comprimiendo... ${currentSec}s / ${totalSec}s`,
      })
    }
  }

  onProgress?.({ stage: "finalizing", percent: 92, message: "Finalizando compresion..." })

  recorder.stop()
  await recorderStopped

  URL.revokeObjectURL(videoUrl)

  const blob = new Blob(chunks, { type: selectedMime.split(";")[0] })
  const ext = selectedMime.includes("webm") ? "webm" : "mp4"
  const compressedFile = new File(
    [blob],
    file.name.replace(/\.[^.]+$/, `.compressed.${ext}`),
    { type: blob.type },
  )

  const newSizeMB = compressedFile.size / (1024 * 1024)
  onProgress?.({
    stage: "done",
    percent: 100,
    message: `Comprimido: ${fileSizeMB.toFixed(1)}MB -> ${newSizeMB.toFixed(1)}MB`,
  })

  return compressedFile
}
