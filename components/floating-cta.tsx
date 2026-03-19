"use client"

import { useState } from "react"
import Link from "next/link"
import { Sparkles } from "lucide-react"
import { SanacionModal } from "@/components/sanacion-modal"

interface SanacionOption {
  id: string
  title: string
  description: string | null
  price: string
  badge: string | null
  whatsapp_message: string
}

interface FloatingCtaProps {
  enabled: boolean
  text: string | null
  url: string | null
  sanacionConfig?: {
    modal_title: string
    modal_subtitle: string | null
    whatsapp_number: string
  } | null
  sanacionOptions?: SanacionOption[]
}

export function FloatingCta({ enabled, text, url, sanacionConfig, sanacionOptions }: FloatingCtaProps) {
  const [modalOpen, setModalOpen] = useState(false)

  if (!enabled) return null

  const buttonText = text || "Iniciar Sanacion"
  const isModal = url === "#sanacion-modal" && sanacionConfig && sanacionOptions && sanacionOptions.length > 0
  const isInternal = url?.startsWith("/") && !isModal

  const buttonClasses =
    "fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 " +
    "gradient-button-animated border border-cyan-400/30"

  // Modal mode
  if (isModal) {
    return (
      <>
        <button onClick={() => setModalOpen(true)} className={buttonClasses}>
          <Sparkles className="h-3.5 w-3.5 text-white" />
          <span className="text-white">{buttonText}</span>
        </button>
        <SanacionModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          config={sanacionConfig}
          options={sanacionOptions}
        />
      </>
    )
  }

  // Internal link mode
  if (isInternal && url) {
    return (
      <Link href={url} className={buttonClasses}>
        <Sparkles className="h-3.5 w-3.5 text-white" />
        <span className="text-white">{buttonText}</span>
      </Link>
    )
  }

  // External link mode
  if (url) {
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

  return null
}
