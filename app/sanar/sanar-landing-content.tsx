"use client"

import { useState } from "react"
import Link from "next/link"
import { AmbientBackground } from "@/components/ambient-background"
import { SocialIcons } from "@/components/social-icons"
import { TestimonialsCarousel } from "@/components/testimonials-carousel"
import { AdminAvatarTrigger } from "@/components/admin-avatar-trigger"
import { ThemeToggle } from "@/components/theme-toggle"
import { SanacionModal } from "@/components/sanacion-modal"
import type { SocialLink, Testimonial, Profile } from "@/lib/types"
import { Sparkles, Heart, Zap, Brain, ArrowLeft, MessageCircle } from "lucide-react"

interface SanacionOption {
  id: string
  title: string
  description: string | null
  price: string
  badge: string | null
  duration: string | null
  whatsapp_message: string
}

interface SanarLandingContentProps {
  landingConfig: Record<string, unknown> | null
  sanacionConfig: Record<string, unknown> | null
  sanacionOptions: SanacionOption[]
  profile: Profile | null
  socialLinks: SocialLink[]
  testimonials: Testimonial[]
}

export function SanarLandingContent({
  landingConfig,
  sanacionConfig,
  sanacionOptions,
  profile,
  socialLinks,
  testimonials,
}: SanarLandingContentProps) {
  const [modalOpen, setModalOpen] = useState(false)

  const config = landingConfig ?? {}
  const p = profile ?? { name: "MY LEAP", avatar_video_url: null }

  return (
    <>
      <ThemeToggle />
      <AmbientBackground />

      <main className="relative min-h-screen w-full overflow-x-hidden">
        <div className="mx-auto flex w-full max-w-md flex-col items-center px-4 py-6 pb-16">
          
          {/* Back to Home */}
          <div className="w-full mb-4">
            <Link 
              href="/" 
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Volver al inicio
            </Link>
          </div>

          {/* Header: Logo + Title + Subtitle */}
          <div className="flex flex-col items-center text-center animate-fade-up">
            <div className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-full gradient-border-animated p-1">
              <div className="h-full w-full rounded-full overflow-hidden bg-background">
                {p.avatar_video_url ? (
                  <video
                    src={p.avatar_video_url}
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
                    alt="MY LEAP Logo"
                    className="h-full w-full object-cover rounded-full"
                  />
                )}
              </div>
            </div>

            <h1 className="mt-4 text-2xl sm:text-3xl font-black font-mono tracking-tight title-shimmer-text">
              {p.name?.toUpperCase() ?? "MY LEAP"}
            </h1>
            <p className="mt-1 text-sm sm:text-base text-primary font-medium flex items-center gap-1.5">
              <span className="font-normal">Potenciado Por</span>
              <span className="text-base sm:text-lg font-bold tracking-wide subtitle-shimmer-text">
                Método ONE
              </span>
            </p>
          </div>

          {/* Social Icons */}
          <div className="mt-4">
            <SocialIcons links={socialLinks} />
          </div>

          {/* Hero Section */}
          <section className="mt-8 text-center animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <span className="inline-block px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-primary/10 text-primary section-title-shimmer">
              {(config.hero_tagline as string) ?? "Sanación Holística"}
            </span>
            <h2 className="mt-4 text-xl sm:text-2xl font-bold text-foreground text-balance leading-tight">
              {(config.hero_title as string) ?? "Transforma tu vida desde el interior"}
            </h2>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed text-pretty">
              {(config.hero_description as string) ?? "Descubre el poder de la sanación energética con sesiones personalizadas."}
            </p>
            <button
              onClick={() => setModalOpen(true)}
              className="mt-5 inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold gradient-button-animated border border-cyan-400/30 transition-all duration-300 hover:scale-105"
            >
              <Sparkles className="h-4 w-4 text-white" />
              <span className="text-white">{(config.hero_cta_text as string) ?? "Agendar Sesión"}</span>
            </button>
          </section>

          {/* Benefits */}
          <section className="mt-10 w-full space-y-3 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 energy-line-left" />
              <span className="text-xs font-semibold uppercase tracking-widest section-title-shimmer">
                Beneficios
              </span>
              <div className="flex-1 energy-line-right" />
            </div>

            <BenefitCard
              icon={<Heart className="h-5 w-5" />}
              title={(config.benefit_1_title as string) ?? "Liberación Emocional"}
              description={(config.benefit_1_description as string) ?? "Libera traumas y bloqueos emocionales."}
            />
            <BenefitCard
              icon={<Zap className="h-5 w-5" />}
              title={(config.benefit_2_title as string) ?? "Equilibrio Energético"}
              description={(config.benefit_2_description as string) ?? "Restaura el flujo natural de energía."}
            />
            <BenefitCard
              icon={<Brain className="h-5 w-5" />}
              title={(config.benefit_3_title as string) ?? "Claridad Mental"}
              description={(config.benefit_3_description as string) ?? "Encuentra paz interior y claridad."}
            />
          </section>

          {/* Services from Sanacion Options */}
          <section className="mt-10 w-full animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 energy-line-left" />
              <span className="text-xs font-semibold uppercase tracking-widest section-title-shimmer">
                Servicios
              </span>
              <div className="flex-1 energy-line-right" />
            </div>

            <div className="space-y-3">
              {sanacionOptions.map((option) => (
                <ServiceCard
                  key={option.id}
                  option={option}
                  whatsappNumber={(sanacionConfig?.whatsapp_number as string) ?? ""}
                />
              ))}
            </div>
          </section>

          {/* Testimonials */}
          {testimonials.length > 0 && (
            <section className="mt-10 w-full animate-fade-up" style={{ animationDelay: "0.4s" }}>
              <div className="flex items-center gap-3 my-6">
                <div className="flex-1 energy-line-left" />
                <span className="text-sm font-bold uppercase tracking-widest section-title-shimmer">
                  Testimonios
                </span>
                <div className="flex-1 energy-line-right" />
              </div>
              <TestimonialsCarousel testimonials={testimonials} />
            </section>
          )}

          {/* Final CTA */}
          <section className="mt-10 w-full text-center animate-fade-up" style={{ animationDelay: "0.5s" }}>
            <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6">
              <h3 className="text-lg font-bold text-foreground">
                {(config.cta_title as string) ?? "¿Listo para comenzar tu transformación?"}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {(config.cta_description as string) ?? "Da el primer paso hacia una vida más plena."}
              </p>
              <button
                onClick={() => setModalOpen(true)}
                className="mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold gradient-button-animated border border-cyan-400/30 transition-all duration-300 hover:scale-105"
              >
                <Sparkles className="h-4 w-4 text-white" />
                <span className="text-white">Comenzar Ahora</span>
              </button>
            </div>
          </section>

          {/* Footer */}
          <footer className="mt-10 text-center">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} MY LEAP. Potenciado por Método ONE.
            </p>
          </footer>
        </div>
      </main>

      {/* Sanacion Modal */}
      {sanacionConfig && (
        <SanacionModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          config={{
            modal_title: sanacionConfig.modal_title as string,
            modal_subtitle: sanacionConfig.modal_subtitle as string | null,
            whatsapp_number: sanacionConfig.whatsapp_number as string,
          }}
          options={sanacionOptions}
        />
      )}
    </>
  )
}

function BenefitCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-border bg-card/50 backdrop-blur-sm p-4 transition-all duration-300 hover:border-primary/40 hover:shadow-md">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        {icon}
      </div>
      <div>
        <h4 className="text-sm font-semibold text-foreground">{title}</h4>
        <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  )
}

function ServiceCard({ option, whatsappNumber }: { option: SanacionOption; whatsappNumber: string }) {
  const waLink = `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(option.whatsapp_message)}`

  return (
    <a
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 rounded-xl border border-border bg-card/50 backdrop-blur-sm p-4 transition-all duration-300 hover:border-primary/40 hover:shadow-md hover:scale-[1.02] group"
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-sm font-semibold text-foreground">{option.title}</span>
          {option.duration && (
            <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-secondary text-muted-foreground group-hover:bg-cyan-500/20 group-hover:text-cyan-400 transition-colors">
              {option.duration}
            </span>
          )}
          {option.badge && (
            <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-primary/10 text-primary group-hover:bg-green-500/20 group-hover:text-green-400 transition-colors">
              {option.badge}
            </span>
          )}
        </div>
        {option.description && (
          <p className="text-[11px] text-muted-foreground truncate mt-0.5">{option.description}</p>
        )}
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <span className="text-sm font-bold text-foreground group-hover:text-cyan-400 transition-colors">
          {option.price}
        </span>
        <MessageCircle className="h-4 w-4 text-muted-foreground group-hover:text-green-500 transition-colors" />
      </div>
    </a>
  )
}
