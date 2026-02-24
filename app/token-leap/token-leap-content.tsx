"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Zap,
  Users,
  TrendingUp,
  Shield,
  Gift,
  Star,
  ChevronDown,
  ChevronUp,
  Rocket,
  Crown,
  Gem,
  ExternalLink,
  CheckCircle2,
  Sparkles,
} from "lucide-react"
import type { Testimonial } from "@/lib/types"
import { TestimonialsCarousel } from "@/components/testimonials-carousel"

/* ── Icon map for dynamic icons from DB ── */
const iconMap: Record<string, React.ReactNode> = {
  Zap: <Zap className="h-5 w-5" />,
  Users: <Users className="h-5 w-5" />,
  Gift: <Gift className="h-5 w-5" />,
  TrendingUp: <TrendingUp className="h-5 w-5" />,
  Star: <Star className="h-5 w-5" />,
  Crown: <Crown className="h-5 w-5" />,
  Gem: <Gem className="h-5 w-5" />,
  Rocket: <Rocket className="h-5 w-5" />,
  Shield: <Shield className="h-5 w-5" />,
  Sparkles: <Sparkles className="h-5 w-5" />,
}

/* ── Types ── */
interface CrowdfundingConfig {
  hero_badge: string
  hero_title: string
  hero_description: string
  hero_cta_text: string
  hero_cta_url: string
  hero_stats: { value: string; label: string }[]
  what_is_title: string
  what_is_points: { icon: string; title: string; desc: string }[]
  tiers: { name: string; price: string; tokens: string; icon: string; popular: boolean; benefits: string[] }[]
  tiers_subtitle: string
  how_it_works: { num: string; title: string; desc: string }[]
  faq_items: { q: string; a: string }[]
  final_cta_title: string
  final_cta_description: string
  final_cta_primary_text: string
  final_cta_primary_url: string
  final_cta_secondary_text: string
  final_cta_secondary_url: string
}

interface Props {
  config: Record<string, unknown> | null
  testimonials: Testimonial[]
}

/* ══════════════════════════════════════
   HERO
   ══════════════════════════════════════ */
function Hero({ c }: { c: CrowdfundingConfig }) {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 sm:p-10">
      <div className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative flex flex-col items-center text-center gap-5">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/30 px-3 py-1 text-xs font-bold text-primary uppercase tracking-wider">
          <Rocket className="h-3 w-3" />
          {c.hero_badge}
        </span>

        <div className="h-16 w-16 overflow-hidden rounded-2xl border border-primary/30 shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/avatar.png" alt="MY LEAP" className="h-full w-full object-cover" />
        </div>

        <h1 className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-balance title-shimmer-text">
          {c.hero_title}
        </h1>
        <p className="max-w-md text-sm sm:text-base text-muted-foreground leading-relaxed text-pretty">
          {c.hero_description}
        </p>

        {c.hero_stats.length > 0 && (
          <div className="flex items-center gap-4 sm:gap-8 mt-2">
            {c.hero_stats.map((s, i) => (
              <div key={i} className="flex items-center gap-4 sm:gap-8">
                {i > 0 && <div className="h-8 w-px bg-border" />}
                <div className="flex flex-col items-center">
                  <span className="text-lg sm:text-xl font-bold text-foreground font-mono">{s.value}</span>
                  <span className="text-[11px] text-muted-foreground">{s.label}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        <a
          href={c.hero_cta_url}
          className="mt-2 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.02] transition-all duration-300"
        >
          <Zap className="h-4 w-4" />
          {c.hero_cta_text}
        </a>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════
   WHAT IS TOKEN LEAP
   ══════════════════════════════════════ */
function WhatIsSection({ c }: { c: CrowdfundingConfig }) {
  return (
    <section className="space-y-5">
      <SectionTitle icon={<Sparkles className="h-4 w-4" />} label={c.what_is_title} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {c.what_is_points.map((p) => (
          <div
            key={p.title}
            className="flex gap-3 rounded-xl border border-border bg-card p-4 hover:border-primary/40 transition-colors"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              {iconMap[p.icon] ?? <Zap className="h-5 w-5" />}
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">{p.title}</h3>
              <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ══════════════════════════════════════
   INVESTMENT TIERS
   ══════════════════════════════════════ */
function TiersSection({ c }: { c: CrowdfundingConfig }) {
  return (
    <section id="tiers" className="space-y-5 scroll-mt-8">
      <SectionTitle icon={<Crown className="h-4 w-4" />} label="Niveles de Inversion" />
      <p className="text-xs sm:text-sm text-muted-foreground text-center max-w-md mx-auto leading-relaxed">
        {c.tiers_subtitle}
      </p>
      <div className="flex flex-col gap-3">
        {c.tiers.map((tier) => (
          <TierCard key={tier.name} tier={tier} />
        ))}
      </div>
    </section>
  )
}

function TierCard({ tier }: { tier: CrowdfundingConfig["tiers"][number] }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className={`relative rounded-xl border p-4 sm:p-5 transition-all duration-300 hover:shadow-md ${tier.popular ? "border-primary/50 bg-primary/10" : "border-border bg-card"}`}>
      {tier.popular && (
        <span className="absolute -top-2.5 right-4 rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-bold text-primary-foreground uppercase tracking-wider">
          Popular
        </span>
      )}
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          {iconMap[tier.icon] ?? <Zap className="h-5 w-5" />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2 flex-wrap">
            <h3 className="text-base font-bold text-foreground">{tier.name}</h3>
            <span className="text-xs font-mono text-muted-foreground">{tier.tokens}</span>
          </div>
          <p className="text-lg sm:text-xl font-black text-primary font-mono mt-0.5">{tier.price}</p>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
          aria-label={expanded ? "Ocultar beneficios" : "Ver beneficios"}
        >
          {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
      </div>
      {expanded && (
        <div className="mt-3 pt-3 border-t border-border/50 space-y-1.5 animate-fade-up">
          {tier.benefits.map((b) => (
            <div key={b} className="flex items-start gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
              <span className="text-xs text-muted-foreground leading-relaxed">{b}</span>
            </div>
          ))}
          <a
            href={`https://wa.me/5491100000000?text=Hola!%20Quiero%20adquirir%20tokens%20LEAP%20nivel%20${encodeURIComponent(tier.name)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.02] transition-all"
          >
            <Zap className="h-3.5 w-3.5" />
            Adquirir {tier.name}
          </a>
        </div>
      )}
    </div>
  )
}

/* ══════════════════════════════════════
   HOW IT WORKS
   ══════════════════════════════════════ */
function HowItWorks({ c }: { c: CrowdfundingConfig }) {
  return (
    <section className="space-y-4">
      <SectionTitle icon={<Shield className="h-4 w-4" />} label="Como Funciona" />
      <div className="flex gap-2 overflow-x-auto no-scrollbar">
        {c.how_it_works.map((s) => (
          <div key={s.num} className="flex-1 min-w-0 rounded-lg border border-border bg-card px-2.5 py-3 text-center">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-[11px] font-bold text-primary font-mono">
              {s.num}
            </span>
            <h3 className="mt-1.5 text-[11px] font-semibold text-foreground leading-tight">{s.title}</h3>
            <p className="mt-0.5 text-[10px] text-muted-foreground leading-snug">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ══════════════════════════════════════
   FAQ
   ══════════════════════════════════════ */
function FAQSection({ c }: { c: CrowdfundingConfig }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  return (
    <section className="space-y-5">
      <SectionTitle icon={<Shield className="h-4 w-4" />} label="Preguntas Frecuentes" />
      <div className="flex flex-col gap-2">
        {c.faq_items.map((item, i) => (
          <div key={i} className="rounded-xl border border-border bg-card overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="flex w-full items-center justify-between p-4 text-left"
            >
              <span className="text-xs sm:text-sm font-semibold text-foreground pr-4">{item.q}</span>
              {openIndex === i ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
              )}
            </button>
            {openIndex === i && (
              <div className="px-4 pb-4 animate-fade-up">
                <p className="text-xs text-muted-foreground leading-relaxed">{item.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

/* ══════════════════════════════════════
   FINAL CTA
   ══════════════════════════════════════ */
function FinalCTA({ c }: { c: CrowdfundingConfig }) {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-primary/30 bg-primary/5 p-6 sm:p-8 text-center">
      <div className="pointer-events-none absolute -top-16 -right-16 h-32 w-32 rounded-full bg-primary/15 blur-3xl" />
      <h2 className="text-xl sm:text-2xl font-black font-mono tracking-tight title-shimmer-text">
        {c.final_cta_title}
      </h2>
      <p className="mt-2 text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
        {c.final_cta_description}
      </p>
      <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-3">
        <a
          href={c.final_cta_primary_url}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.02] transition-all duration-300"
        >
          <Rocket className="h-4 w-4" />
          {c.final_cta_primary_text}
        </a>
        <a
          href={c.final_cta_secondary_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground hover:border-primary/50 transition-colors"
        >
          <ExternalLink className="h-4 w-4" />
          {c.final_cta_secondary_text}
        </a>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════
   SHARED
   ══════════════════════════════════════ */
function SectionTitle({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-px flex-1 bg-border" />
      <span className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium uppercase tracking-widest">
        {icon}
        {label}
      </span>
      <div className="h-px flex-1 bg-border" />
    </div>
  )
}

/* ══════════════════════════════════════
   MAIN
   ══════════════════════════════════════ */
export function TokenLeapContent({ config, testimonials }: Props) {
  const c: CrowdfundingConfig = {
    hero_badge: (config?.hero_badge as string) ?? "Crowdfunding Abierto",
    hero_title: (config?.hero_title as string) ?? "TOKEN LEAP",
    hero_description: (config?.hero_description as string) ?? "",
    hero_cta_text: (config?.hero_cta_text as string) ?? "Quiero mis Tokens LEAP",
    hero_cta_url: (config?.hero_cta_url as string) ?? "#tiers",
    hero_stats: (config?.hero_stats as CrowdfundingConfig["hero_stats"]) ?? [],
    what_is_title: (config?.what_is_title as string) ?? "Que es Token LEAP",
    what_is_points: (config?.what_is_points as CrowdfundingConfig["what_is_points"]) ?? [],
    tiers: (config?.tiers as CrowdfundingConfig["tiers"]) ?? [],
    tiers_subtitle: (config?.tiers_subtitle as string) ?? "",
    how_it_works: (config?.how_it_works as CrowdfundingConfig["how_it_works"]) ?? [],
    faq_items: (config?.faq_items as CrowdfundingConfig["faq_items"]) ?? [],
    final_cta_title: (config?.final_cta_title as string) ?? "TU SALTO EMPIEZA HOY",
    final_cta_description: (config?.final_cta_description as string) ?? "",
    final_cta_primary_text: (config?.final_cta_primary_text as string) ?? "Ver Niveles",
    final_cta_primary_url: (config?.final_cta_primary_url as string) ?? "#tiers",
    final_cta_secondary_text: (config?.final_cta_secondary_text as string) ?? "Hablar con el Equipo",
    final_cta_secondary_url: (config?.final_cta_secondary_url as string) ?? "#",
  }

  return (
    <main className="relative mx-auto flex min-h-screen max-w-xl flex-col items-center px-4 pb-8 pt-6 gap-8">
      <div className="w-full">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Volver a MY LEAP
        </Link>
      </div>

      <Hero c={c} />
      <WhatIsSection c={c} />
      <TiersSection c={c} />
      <HowItWorks c={c} />

      {/* Testimonials - shared carousel from main page */}
      {testimonials.length > 0 && (
        <section className="w-full space-y-5">
          <SectionTitle icon={<Users className="h-4 w-4" />} label="La Comunidad Habla" />
          <TestimonialsCarousel testimonials={testimonials} />
        </section>
      )}

      <FAQSection c={c} />
      <FinalCTA c={c} />

      <footer className="w-full text-center pt-4 pb-2 border-t border-border">
        <p className="text-[10px] text-muted-foreground">
          MY LEAP &middot; Potenciado por Metodo ONE
        </p>
      </footer>
    </main>
  )
}
