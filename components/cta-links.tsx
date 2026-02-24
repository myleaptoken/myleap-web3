"use client"

import { useState } from "react"
import Link from "next/link"
import {
  BookOpen,
  MessageCircle,
  GraduationCap,
  Heart,
  ChevronRight,
  Sparkles,
  Star as StarIcon,
  Rocket,
} from "lucide-react"
import type { CTALinkWithModal, Facilitator } from "@/lib/types"
import { DynamicModal } from "@/components/cta-modals"

/* Map icon_name from DB to a Lucide component */
const iconMap: Record<string, React.ReactNode> = {
  Heart: <Heart className="h-5 w-5" />,
  Sparkles: <Sparkles className="h-5 w-5" />,
  GraduationCap: <GraduationCap className="h-5 w-5" />,
  BookOpen: <BookOpen className="h-5 w-5" />,
  MessageCircle: <MessageCircle className="h-5 w-5" />,
  Star: <StarIcon className="h-5 w-5" />,
  Rocket: <Rocket className="h-5 w-5" />,
}

const variantStyles: Record<string, string> = {
  primary:
    "bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/30 border-primary",
  accent:
    "bg-primary/10 text-primary border-primary/40 hover:bg-primary/20 hover:border-primary",
  secondary:
    "bg-secondary text-secondary-foreground border-border hover:border-primary/50 hover:bg-secondary/80",
  outline:
    "bg-transparent text-foreground border-border hover:border-primary/50 hover:bg-secondary/50",
}

export function CTALinks({
  links,
  facilitators,
}: {
  links: CTALinkWithModal[]
  facilitators: Facilitator[]
}) {
  const [openModalKey, setOpenModalKey] = useState<string | null>(null)

  const activeLink = links.find((l) => l.modal_key === openModalKey) ?? null

  return (
    <>
      <div className="flex flex-col gap-3 w-full">
        {links.map((link, index) => (
          <CTAButton
            key={link.id}
            link={link}
            index={index}
            onOpen={() => setOpenModalKey(link.modal_key)}
          />
        ))}
      </div>

      {/* Single dynamic modal driven by DB data */}
      <DynamicModal
        link={activeLink}
        facilitators={facilitators}
        open={openModalKey !== null}
        onOpenChange={(v) => !v && setOpenModalKey(null)}
      />
    </>
  )
}

function CTAButton({
  link,
  index,
  onOpen,
}: {
  link: CTALinkWithModal
  index: number
  onOpen: () => void
}) {
  const [isHovered, setIsHovered] = useState(false)
  const variant = link.variant || "primary"
  const isNavigate = link.modal_key === "navigate" && link.url

  const className = `
    group relative flex items-center gap-4 rounded-xl border p-4 sm:p-5
    transition-all duration-300 ease-out animate-fade-up text-left cursor-pointer
    hover:scale-[1.02] hover:-translate-y-0.5
    ${variantStyles[variant] ?? variantStyles.primary}
  `

  const inner = (
    <>
      {/* Shimmer effect on hover */}
      {isHovered && variant === "primary" && (
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
        ${variant === "primary" ? "bg-primary-foreground/15" : "bg-primary/10"}
        group-hover:scale-110
      `}
      >
        {iconMap[link.icon_name] ?? <Heart className="h-5 w-5" />}
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
        {link.description && (
          <p className="mt-0.5 text-xs sm:text-sm opacity-70 truncate">
            {link.description}
          </p>
        )}
      </div>

      {/* Arrow */}
      <ChevronRight
        className="h-4 w-4 shrink-0 opacity-40 transition-all duration-300
        group-hover:opacity-100 group-hover:translate-x-0.5"
      />
    </button>
  )
}
