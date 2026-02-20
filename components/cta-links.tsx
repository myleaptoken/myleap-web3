"use client"

import { useState } from "react"
import {
  BookOpen,
  MessageCircle,
  GraduationCap,
  Heart,
  ChevronRight,
  Sparkles,
} from "lucide-react"
import {
  RegistrateYSanaModal,
  SanacionGrupalModal,
  MetodoOneModal,
  EbookModal,
  ConsultaModal,
} from "@/components/cta-modals"

type ModalKey = "registrate" | "sanacion" | "metodo" | "ebook" | "consulta"

interface CTALink {
  title: string
  description: string
  modalKey: ModalKey
  icon: React.ReactNode
  variant: "primary" | "secondary" | "accent" | "outline"
  badge?: string
}

const ctaLinks: CTALink[] = [
  {
    title: "Registrate y Sana",
    description: "Completa la encuesta y disfruta la sanaci\u00f3n",
    modalKey: "registrate",
    icon: <Sparkles className="h-5 w-5" />,
    variant: "accent",
    badge: "GRATIS",
  },
  {
    title: "Sanaci\u00f3n Grupal a Distancia",
    description: "Conectate a la Videollamada y sana",
    modalKey: "sanacion",
    icon: <Heart className="h-5 w-5" />,
    variant: "primary",
    badge: "EN VIVO",
  },
  {
    title: "M\u00e9todo ONE",
    description: "Metodolog\u00eda de sanaci\u00f3n con energ\u00eda",
    modalKey: "metodo",
    icon: <GraduationCap className="h-5 w-5" />,
    variant: "accent",
  },
  {
    title: "E-book: El Poder Sanador de la Energ\u00eda",
    description: "Un mundo de posibilidades",
    modalKey: "ebook",
    icon: <BookOpen className="h-5 w-5" />,
    variant: "secondary",
    badge: "NUEVO",
  },
  {
    title: "Consulta 1:1 Personalizada",
    description: "Sesi\u00f3n privada para tus dolores",
    modalKey: "consulta",
    icon: <MessageCircle className="h-5 w-5" />,
    variant: "primary",
  },
]

const variantStyles = {
  primary:
    "bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/30 border-primary",
  accent:
    "bg-primary/10 text-primary border-primary/40 hover:bg-primary/20 hover:border-primary",
  secondary:
    "bg-secondary text-secondary-foreground border-border hover:border-primary/50 hover:bg-secondary/80",
  outline:
    "bg-transparent text-foreground border-border hover:border-primary/50 hover:bg-secondary/50",
}

export function CTALinks() {
  const [openModal, setOpenModal] = useState<ModalKey | null>(null)

  return (
    <>
      <div className="flex flex-col gap-3 w-full">
        {ctaLinks.map((link, index) => (
          <CTAButton
            key={link.title}
            link={link}
            index={index}
            onOpen={() => setOpenModal(link.modalKey)}
          />
        ))}
      </div>

      {/* Modals */}
      <RegistrateYSanaModal
        open={openModal === "registrate"}
        onOpenChange={(v) => !v && setOpenModal(null)}
      />
      <SanacionGrupalModal
        open={openModal === "sanacion"}
        onOpenChange={(v) => !v && setOpenModal(null)}
      />
      <MetodoOneModal
        open={openModal === "metodo"}
        onOpenChange={(v) => !v && setOpenModal(null)}
      />
      <EbookModal
        open={openModal === "ebook"}
        onOpenChange={(v) => !v && setOpenModal(null)}
      />
      <ConsultaModal
        open={openModal === "consulta"}
        onOpenChange={(v) => !v && setOpenModal(null)}
      />
    </>
  )
}

function CTAButton({
  link,
  index,
  onOpen,
}: {
  link: CTALink
  index: number
  onOpen: () => void
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <button
      type="button"
      onClick={onOpen}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        group relative flex items-center gap-4 rounded-xl border p-4 sm:p-5
        transition-all duration-300 ease-out animate-fade-up text-left cursor-pointer
        hover:scale-[1.02] hover:-translate-y-0.5
        ${variantStyles[link.variant]}
      `}
      style={{ animationDelay: `${0.05 * index + 0.3}s` }}
    >
      {/* Shimmer effect on hover */}
      {isHovered && link.variant === "primary" && (
        <div className="absolute inset-0 rounded-xl overflow-hidden">
          <div
            className="absolute inset-0 animate-shimmer"
            style={{
              backgroundImage:
                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
              backgroundSize: "200% 100%",
            }}
          />
        </div>
      )}

      {/* Icon */}
      <div
        className={`
        relative flex h-10 w-10 shrink-0 items-center justify-center rounded-lg
        transition-all duration-300
        ${link.variant === "primary" ? "bg-primary-foreground/15" : "bg-primary/10"}
        group-hover:scale-110
      `}
      >
        {link.icon}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm sm:text-base truncate">
            {link.title}
          </span>
          {link.badge && (
            <span className="shrink-0 rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground uppercase tracking-wider">
              {link.badge}
            </span>
          )}
        </div>
        <p className="mt-0.5 text-xs sm:text-sm opacity-70 truncate">
          {link.description}
        </p>
      </div>

      {/* Arrow */}
      <ChevronRight
        className={`
        h-4 w-4 shrink-0 opacity-40 transition-all duration-300
        group-hover:opacity-100 group-hover:translate-x-0.5
      `}
      />
    </button>
  )
}
