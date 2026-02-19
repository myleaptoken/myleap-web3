"use client"

import { useState } from "react"
import {
  BookOpen,
  Rocket,
  MessageCircle,
  Gift,
  ExternalLink,
  GraduationCap,
  Users,
  Sparkles,
  ShoppingBag,
  Mail,
} from "lucide-react"

interface CTALink {
  title: string
  description: string
  href: string
  icon: React.ReactNode
  variant: "primary" | "secondary" | "accent" | "outline"
  badge?: string
}

const ctaLinks: CTALink[] = [
  {
    title: "Curso Gratuito: Marketing Digital",
    description: "Aprende los fundamentos del marketing online",
    href: "#curso-gratis",
    icon: <Gift className="h-5 w-5" />,
    variant: "primary",
    badge: "GRATIS",
  },
  {
    title: "Academia MyLeap",
    description: "Accede a todos nuestros cursos premium",
    href: "#academia",
    icon: <GraduationCap className="h-5 w-5" />,
    variant: "accent",
    badge: "NUEVO",
  },
  {
    title: "Masterclass en Vivo",
    description: "Reserva tu lugar en nuestra proxima clase",
    href: "#masterclass",
    icon: <Rocket className="h-5 w-5" />,
    variant: "secondary",
  },
  {
    title: "E-book: Estrategias de Crecimiento",
    description: "Descarga nuestra guia completa",
    href: "#ebook",
    icon: <BookOpen className="h-5 w-5" />,
    variant: "outline",
  },
  {
    title: "Comunidad Privada",
    description: "Unete a miles de emprendedores",
    href: "#comunidad",
    icon: <Users className="h-5 w-5" />,
    variant: "secondary",
  },
  {
    title: "Herramientas IA para Negocios",
    description: "Potencia tu negocio con inteligencia artificial",
    href: "#herramientas-ia",
    icon: <Sparkles className="h-5 w-5" />,
    variant: "accent",
  },
  {
    title: "Tienda Digital",
    description: "Templates, recursos y mas",
    href: "#tienda",
    icon: <ShoppingBag className="h-5 w-5" />,
    variant: "outline",
  },
  {
    title: "Contacto y Colaboraciones",
    description: "Trabajemos juntos en tu proximo proyecto",
    href: "#contacto",
    icon: <Mail className="h-5 w-5" />,
    variant: "secondary",
  },
  {
    title: "Consulta 1:1 Personalizada",
    description: "Sesion privada para tu negocio",
    href: "#consulta",
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
  return (
    <div className="flex flex-col gap-3 w-full">
      {ctaLinks.map((link, index) => (
        <CTAButton key={link.title} link={link} index={index} />
      ))}
    </div>
  )
}

function CTAButton({ link, index }: { link: CTALink; index: number }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        group relative flex items-center gap-4 rounded-xl border p-4 sm:p-5
        transition-all duration-300 ease-out animate-fade-up
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
      <ExternalLink
        className={`
        h-4 w-4 shrink-0 opacity-40 transition-all duration-300
        group-hover:opacity-100 group-hover:translate-x-0.5
      `}
      />
    </a>
  )
}
