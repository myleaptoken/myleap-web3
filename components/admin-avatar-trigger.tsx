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
    <div className="relative h-24 w-24 sm:h-32 sm:w-32 rounded-full p-1 gradient-border-animated">
      <button
        type="button"
        onClick={handleClick}
        className="h-full w-full rounded-full overflow-hidden bg-background cursor-default focus:outline-none"
        aria-label={`${profileName} Logo`}
      >
        {avatarVideoUrl ? (
          <video
            src={avatarVideoUrl}
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover rounded-full"
          />
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src="/images/avatar.png"
            alt={`${profileName} Logo`}
            width={128}
            height={128}
            className="h-full w-full object-cover rounded-full"
          />
        )}
      </button>
    </div>
  )
}
