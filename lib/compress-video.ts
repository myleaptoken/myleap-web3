/**
 * Client-side video compression using Canvas + MediaRecorder.
 * Re-encodes the video at a lower bitrate to reduce file size.
 * No external dependencies required - uses only browser APIs.
 */

const TARGET_SIZE_MB = 90 // Target under 100MB
const MAX_WIDTH = 1280
const MAX_HEIGHT = 720

export interface CompressionProgress {
  stage: "loading" | "compressing" | "done"
  percent: number // 0-100
  message: string
}

export async function compressVideo(
  file: File,
  onProgress?: (p: CompressionProgress) => void,
): Promise<File> {
  const fileSizeMB = file.size / (1024 * 1024)

  // If already under limit, return as-is
  if (fileSizeMB <= TARGET_SIZE_MB) {
    onProgress?.({ stage: "done", percent: 100, message: "Video ya es menor a 100MB" })
    return file
  }

  onProgress?.({ stage: "loading", percent: 0, message: "Cargando video..." })

  // Create video element to read metadata
  const videoUrl = URL.createObjectURL(file)
  const video = document.createElement("video")
  video.muted = true
  video.playsInline = true
  video.preload = "auto"
  video.src = videoUrl

  await new Promise<void>((resolve, reject) => {
    video.onloadedmetadata = () => resolve()
    video.onerror = () => reject(new Error("No se pudo cargar el video"))
  })

  const duration = video.duration
  if (!duration || !isFinite(duration)) {
    URL.revokeObjectURL(videoUrl)
    throw new Error("No se pudo determinar la duracion del video")
  }

  // Calculate target dimensions maintaining aspect ratio
  let width = video.videoWidth
  let height = video.videoHeight
  if (width > MAX_WIDTH) {
    height = Math.round((height * MAX_WIDTH) / width)
    width = MAX_WIDTH
  }
  if (height > MAX_HEIGHT) {
    width = Math.round((width * MAX_HEIGHT) / height)
    height = MAX_HEIGHT
  }
  // Ensure even dimensions (required by many codecs)
  width = width % 2 === 0 ? width : width - 1
  height = height % 2 === 0 ? height : height - 1

  // Calculate target bitrate to fit under TARGET_SIZE_MB
  // Total bits = TARGET_SIZE_MB * 8 * 1024 * 1024
  // Bitrate = Total bits / duration (with some margin for audio + overhead)
  const targetTotalBits = TARGET_SIZE_MB * 8 * 1024 * 1024 * 0.85 // 85% margin
  const audioBitrate = 128000 // 128kbps audio
  const videoBitrate = Math.floor((targetTotalBits / duration) - audioBitrate)

  onProgress?.({ stage: "compressing", percent: 5, message: `Comprimiendo ${fileSizeMB.toFixed(0)}MB -> ~${TARGET_SIZE_MB}MB...` })

  // Set up canvas for re-encoding
  const canvas = document.createElement("canvas")
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext("2d")!

  // Capture stream from canvas + audio from video
  const canvasStream = canvas.captureStream(30) // 30fps
  let combinedStream: MediaStream

  // Try to capture audio from the video
  try {
    const audioCtx = new AudioContext()
    const source = audioCtx.createMediaElementSource(video)
    const dest = audioCtx.createMediaStreamDestination()
    source.connect(dest)
    source.connect(audioCtx.destination)
    const audioTrack = dest.stream.getAudioTracks()[0]
    if (audioTrack) {
      combinedStream = new MediaStream([
        ...canvasStream.getVideoTracks(),
        audioTrack,
      ])
    } else {
      combinedStream = canvasStream
    }
  } catch {
    combinedStream = canvasStream
  }

  // Use MediaRecorder with target bitrate
  const mimeTypes = [
    "video/webm;codecs=vp9,opus",
    "video/webm;codecs=vp8,opus",
    "video/webm",
    "video/mp4",
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
    throw new Error("Tu navegador no soporta compresion de video")
  }

  const chunks: Blob[] = []
  const recorder = new MediaRecorder(combinedStream, {
    mimeType: selectedMime,
    videoBitsPerSecond: Math.max(videoBitrate, 500000), // min 500kbps
  })

  recorder.ondataavailable = (e) => {
    if (e.data.size > 0) chunks.push(e.data)
  }

  const recordingDone = new Promise<Blob>((resolve) => {
    recorder.onstop = () => {
      resolve(new Blob(chunks, { type: selectedMime.split(";")[0] }))
    }
  })

  recorder.start(1000) // Collect data every second

  // Play video and draw frames to canvas
  video.currentTime = 0
  await video.play()

  const drawFrame = () => {
    if (video.ended || video.paused) return
    ctx.drawImage(video, 0, 0, width, height)

    const progress = Math.min(95, 5 + (video.currentTime / duration) * 90)
    onProgress?.({
      stage: "compressing",
      percent: Math.round(progress),
      message: `Comprimiendo... ${Math.round(video.currentTime)}s / ${Math.round(duration)}s`,
    })

    requestAnimationFrame(drawFrame)
  }
  requestAnimationFrame(drawFrame)

  // Wait for video to finish playing
  await new Promise<void>((resolve) => {
    video.onended = () => resolve()
  })

  recorder.stop()
  const compressedBlob = await recordingDone

  URL.revokeObjectURL(videoUrl)

  const ext = selectedMime.includes("webm") ? "webm" : "mp4"
  const compressedFile = new File(
    [compressedBlob],
    file.name.replace(/\.[^.]+$/, `.compressed.${ext}`),
    { type: compressedBlob.type },
  )

  const newSizeMB = compressedFile.size / (1024 * 1024)
  onProgress?.({
    stage: "done",
    percent: 100,
    message: `Comprimido: ${fileSizeMB.toFixed(1)}MB -> ${newSizeMB.toFixed(1)}MB`,
  })

  return compressedFile
}
