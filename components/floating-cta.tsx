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
    "fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 " +
    "bg-primary text-primary-foreground hover:shadow-primary/30 " +
    "border border-primary/20 backdrop-blur-sm"

  if (isInternal) {
    return (
      <Link href={url} className={buttonClasses}>
        <Sparkles className="h-3.5 w-3.5 section-title-shimmer" />
        <span className="section-title-shimmer">{buttonText}</span>
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
      <Sparkles className="h-3.5 w-3.5 section-title-shimmer" />
      <span className="section-title-shimmer">{buttonText}</span>
    </a>
  )
}
