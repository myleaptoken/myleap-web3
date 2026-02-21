"use client"

import { useRef, useCallback } from "react"
import { useRouter } from "next/navigation"

export function AdminAvatarTrigger({ profileName }: { profileName: string }) {
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
      className="h-24 w-24 sm:h-32 sm:w-32 rounded-full border-4 border-transparent bg-[#0d1a2d] overflow-hidden animate-pulse-glow cursor-default focus:outline-none"
      aria-label={`${profileName} Logo`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/avatar.png"
        alt={`${profileName} Logo`}
        width={128}
        height={128}
        className="h-full w-full object-cover"
      />
    </button>
  )
}
