"use client"

import { useState } from "react"
import Link from "next/link"
import { AmbientBackground } from "@/components/ambient-background"
import type { SocialLink } from "@/lib/types"
import {
  ArrowLeft,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  Check,
  ArrowRight,
  Sparkles,
  Monitor,
  Video,
  MapPin,
  HelpCircle,
  Heart,
} from "lucide-react"

/* ─── Types ─── */
interface CourseOption {
  id: string
  title: string
  badge: string
  description: string
  features: string[]
  price: string
  cta_text: string
  whatsapp_message: string
}

interface FaqItem { q: string; a: string }

interface CursosConfig {
  id: string
  hero_title: string
  hero_subtitle: string
  hero_description: string
  hero_image_url: string | null
  course_options: CourseOption[]
  whatsapp_number: string
  contact_cta_title: string
  contact_cta_description: string
  contact_cta_button_text: string
  contact_cta_message: string
  faq_items: FaqItem[]
  social_cta_title: string
  social_cta_description: string
}

/* ─── Social icon map (inline SVGs) ─── */
const socialIconMap: Record<string, React.ReactNode> = {
  instagram: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
  ),
  tiktok: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" /></svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
  ),
  spotify: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" /></svg>
  ),
  twitter: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
  ),
  x: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
  ),
  globe: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
  ),
}

const courseIcons: Record<string, React.ReactNode> = {
  presencial: <MapPin className="h-5 w-5" />,
  "online-vivo": <Monitor className="h-5 w-5" />,
  "online-grabado": <Video className="h-5 w-5" />,
}

/* ─── Main ─── */
export function CursosOneContent({
  config,
  socialLinks,
}: {
  config: Record<string, unknown>
  socialLinks: SocialLink[]
}) {
  const c = config as unknown as CursosConfig
  const waBase = `https://wa.me/${c.whatsapp_number.replace(/[^0-9]/g, "")}`

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <AmbientBackground />

      <div className="relative z-10 mx-auto max-w-lg px-4 py-6 space-y-10">
        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Volver a MY LEAP
        </Link>

        {/* Hero */}
        <HeroSection c={c} waBase={waBase} />

        {/* Course Options Carousel */}
        <CourseCarousel options={c.course_options} waBase={waBase} />

        {/* Contact CTA */}
        <ContactCTA c={c} waBase={waBase} />

        {/* FAQ */}
        <FaqSection items={c.faq_items} />

        {/* Social CTA */}
        <SocialCTA c={c} socialLinks={socialLinks} />

        {/* Footer */}
        <footer className="text-center pb-6">
          <p className="text-[10px] text-muted-foreground/50">
            {"MY LEAP \u00b7 Metodo ONE \u00b7 Todos los derechos reservados"}
          </p>
        </footer>
      </div>
    </div>
  )
}

/* ─── Hero ─── */
function HeroSection({ c, waBase }: { c: CursosConfig; waBase: string }) {
  return (
    <section className="text-center space-y-5">
      {/* Logo / Avatar */}
      <div className="flex justify-center">
        <div className="h-20 w-20 overflow-hidden rounded-2xl border-2 border-primary/30 shadow-lg shadow-primary/10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={c.hero_image_url || "/images/avatar.png"}
            alt="Metodo ONE"
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* Badge */}
      <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1">
        <Sparkles className="h-3 w-3 text-primary" />
        <span className="text-[11px] font-semibold text-primary">{c.hero_subtitle}</span>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold tracking-tight text-foreground text-balance">
        {c.hero_title}
      </h1>

      {/* Description */}
      <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto text-pretty">
        {c.hero_description}
      </p>

      {/* CTA */}
      <a
        href={`${waBase}?text=${encodeURIComponent(c.contact_cta_message)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 hover:opacity-90 transition-all"
      >
        <MessageCircle className="h-4 w-4" /> Quiero Informacion
      </a>
    </section>
  )
}

/* ─── Course Carousel ─── */
function CourseCarousel({ options, waBase }: { options: CourseOption[]; waBase: string }) {
  const [active, setActive] = useState(0)

  return (
    <section className="space-y-4">
      {/* Tab selector */}
      <div className="flex rounded-xl border border-border bg-card overflow-hidden">
        {options.map((opt, i) => (
          <button
            key={opt.id}
            onClick={() => setActive(i)}
            className={`flex-1 flex flex-col items-center gap-1 py-3 px-2 text-center transition-all text-[11px] font-medium ${
              active === i
                ? "bg-primary/10 text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
            }`}
          >
            {courseIcons[opt.id] ?? <Sparkles className="h-4 w-4" />}
            <span>{opt.title}</span>
          </button>
        ))}
      </div>

      {/* Active card */}
      {options[active] && <CourseCard option={options[active]} waBase={waBase} />}
    </section>
  )
}

function CourseCard({ option, waBase }: { option: CourseOption; waBase: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 space-y-4 animate-fade-up">
      {/* Badge + Title */}
      <div className="space-y-2">
        <span className="inline-block rounded-full bg-accent/10 border border-accent/30 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent">
          {option.badge}
        </span>
        <h3 className="text-lg font-bold text-foreground">{option.title}</h3>
        <p className="text-xs text-muted-foreground leading-relaxed">{option.description}</p>
      </div>

      {/* Price */}
      <div className="rounded-lg bg-secondary/50 border border-border px-3 py-2">
        <span className="text-xs font-semibold text-foreground">{option.price}</span>
      </div>

      {/* Features */}
      <ul className="space-y-2">
        {option.features.map((f, i) => (
          <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
            <Check className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href={`${waBase}?text=${encodeURIComponent(option.whatsapp_message)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 hover:opacity-90 transition-all"
      >
        {option.cta_text} <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  )
}

/* ─── Contact CTA ─── */
function ContactCTA({ c, waBase }: { c: CursosConfig; waBase: string }) {
  return (
    <section className="rounded-xl border border-primary/20 bg-primary/5 p-5 text-center space-y-3">
      <div className="flex justify-center">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
          <MessageCircle className="h-5 w-5 text-primary" />
        </div>
      </div>
      <h2 className="text-base font-bold text-foreground">{c.contact_cta_title}</h2>
      <p className="text-xs text-muted-foreground leading-relaxed">{c.contact_cta_description}</p>
      <a
        href={`${waBase}?text=${encodeURIComponent(c.contact_cta_message)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#25D366]/25 hover:opacity-90 transition-all"
      >
        <MessageCircle className="h-4 w-4" /> {c.contact_cta_button_text}
      </a>
    </section>
  )
}

/* ─── FAQ ─── */
function FaqSection({ items }: { items: FaqItem[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
          <HelpCircle className="h-3.5 w-3.5 text-primary" />
        </div>
        <h2 className="text-sm font-bold text-foreground">Preguntas Frecuentes</h2>
      </div>
      <div className="space-y-2">
        {items.map((item, i) => {
          const isOpen = openIdx === i
          return (
            <div key={i} className="rounded-xl border border-border bg-card overflow-hidden">
              <button
                onClick={() => setOpenIdx(isOpen ? null : i)}
                className="flex w-full items-center justify-between p-3.5 text-left"
              >
                <span className="text-xs font-semibold text-foreground pr-4">{item.q}</span>
                {isOpen ? (
                  <ChevronUp className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                ) : (
                  <ChevronDown className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                )}
              </button>
              {isOpen && (
                <div className="border-t border-border px-3.5 pb-3.5 pt-2">
                  <p className="text-[11px] text-muted-foreground leading-relaxed">{item.a}</p>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}

/* ─── Social CTA ─── */
function SocialCTA({ c, socialLinks }: { c: CursosConfig; socialLinks: SocialLink[] }) {
  if (!socialLinks.length) return null

  return (
    <section className="text-center space-y-4">
      <div className="flex justify-center">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
          <Heart className="h-4 w-4 text-primary" />
        </div>
      </div>
      <h2 className="text-base font-bold text-foreground">{c.social_cta_title}</h2>
      <p className="text-xs text-muted-foreground leading-relaxed">{c.social_cta_description}</p>
      <div className="flex items-center justify-center gap-3">
        {socialLinks.map((link) => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.platform}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-secondary text-muted-foreground transition-all duration-300 hover:border-primary hover:text-primary hover:bg-primary/10 hover:scale-110"
          >
            {socialIconMap[link.platform] ?? socialIconMap.globe}
          </a>
        ))}
      </div>
    </section>
  )
}
