"use client"

import { useRef, useCallback } from "react"
import { useRouter } from "next/navigation"

export function AdminAvatarTrigger({ profileName, avatarVideoUrl }: { profileName: string; avatarVideoUrl?: string | null }) {
  const router = useRouter()
  const clickCountRef = useRef(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleClick = useCallback(() => {
    clickCountRef.current += 1

    if (timerRef.current) clearTimeout(timerRef.current)

    if (clickCountRef.current >= 3) {
      clickCountRef.current = 0
      router.push("/admin/login")
      return
    }

    timerRef.current = setTimeout(() => {
      clickCountRef.current = 0
    }, 600)
  }, [router])

  return (
    <button
      type="button"
      onClick={handleClick}
      className="h-24 w-24 sm:h-32 sm:w-32 rounded-full border-4 border-cyan-500/50 bg-gradient-to-br from-cyan-600/20 to-cyan-900/40 overflow-hidden animate-pulse-glow cursor-default focus:outline-none"
      aria-label={`${profileName} Logo`}
    >
      {avatarVideoUrl ? (
        <video
          src={avatarVideoUrl}
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
        />
      ) : (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src="/images/avatar.png"
          alt={`${profileName} Logo`}
          width={128}
          height={128}
          className="h-full w-full object-cover"
        />
      )}
    </button>
  )
}
