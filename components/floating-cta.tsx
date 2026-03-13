"use client"

import Link from "next/link"
import { Sparkles } from "lucide-react"

interface FloatingCtaProps {
  enabled: boolean
  text: string | null
  url: string | null
}

export function FloatingCta({ enabled, text, url }: FloatingCtaProps) {
  if (!enabled || !url) return null

  const isInternal = url.startsWith("/")
  const buttonText = text || "Iniciar Sanación"

  const buttonClasses =
    "fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 " +
    "gradient-button-animated border border-cyan-400/30"

  if (isInternal) {
    return (
      <Link href={url} className={buttonClasses}>
        <Sparkles className="h-3.5 w-3.5 text-white" />
        <span className="text-white">{buttonText}</span>
      </Link>
    )
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={buttonClasses}
    >
      <Sparkles className="h-3.5 w-3.5 text-white" />
      <span className="text-white">{buttonText}</span>
    </a>
  )
}
