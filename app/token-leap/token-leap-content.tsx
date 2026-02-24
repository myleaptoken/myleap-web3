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

/* ══════════════════════════════════════
   HERO
   ══════════════════════════════════════ */
function Hero() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 sm:p-10">
      {/* Decorative glow */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative flex flex-col items-center text-center gap-5">
        {/* Badge */}
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/30 px-3 py-1 text-xs font-bold text-primary uppercase tracking-wider">
          <Rocket className="h-3 w-3" />
          Crowdfunding Abierto
        </span>

        {/* Logo mark */}
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 border border-primary/30">
          <Zap className="h-8 w-8 text-primary" />
        </div>

        <h1 className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-balance title-shimmer-text">
          TOKEN LEAP
        </h1>
        <p className="max-w-md text-sm sm:text-base text-muted-foreground leading-relaxed text-pretty">
          Sumate al movimiento que esta transformando el bienestar.
          Adquiri tokens LEAP y accede a beneficios exclusivos de la comunidad MY LEAP,
          potenciada por Metodo ONE.
        </p>

        {/* Quick stats */}
        <div className="flex items-center gap-4 sm:gap-8 mt-2">
          <QuickStat value="500+" label="Leapers" />
          <div className="h-8 w-px bg-border" />
          <QuickStat value="12" label="Cursos" />
          <div className="h-8 w-px bg-border" />
          <QuickStat value="3" label="Paises" />
        </div>

        <a
          href="#tiers"
          className="mt-2 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.02] transition-all duration-300"
        >
          <Zap className="h-4 w-4" />
          Quiero mis Tokens LEAP
        </a>
      </div>
    </section>
  )
}

function QuickStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-lg sm:text-xl font-bold text-foreground font-mono">{value}</span>
      <span className="text-[11px] text-muted-foreground">{label}</span>
    </div>
  )
}

/* ══════════════════════════════════════
   WHAT IS TOKEN LEAP
   ══════════════════════════════════════ */
function WhatIsSection() {
  const points = [
    {
      icon: <Zap className="h-5 w-5 text-primary" />,
      title: "Acceso a Cursos y Talleres",
      desc: "Usa tus tokens para inscribirte en cursos de Metodo ONE, talleres de energia y sesiones exclusivas.",
    },
    {
      icon: <Users className="h-5 w-5 text-primary" />,
      title: "Comunidad Leapers",
      desc: "Forma parte de una red de personas comprometidas con su crecimiento personal y bienestar integral.",
    },
    {
      icon: <Gift className="h-5 w-5 text-primary" />,
      title: "Beneficios Crecientes",
      desc: "Cuantos mas tokens tengas, mayores son los beneficios: descuentos, acceso VIP, sesiones privadas y mas.",
    },
    {
      icon: <TrendingUp className="h-5 w-5 text-primary" />,
      title: "Valor Creciente",
      desc: "Los tokens LEAP son limitados. A medida que la comunidad crece, el valor de tus tokens se potencia.",
    },
  ]

  return (
    <section className="space-y-5">
      <SectionTitle icon={<Sparkles className="h-4 w-4" />} label="Que es Token LEAP" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {points.map((p) => (
          <div
            key={p.title}
            className="flex gap-3 rounded-xl border border-border bg-card p-4 hover:border-primary/40 transition-colors"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              {p.icon}
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
const tiers = [
  {
    name: "Explorer",
    price: "$100 USD",
    tokens: "100 LEAP",
    icon: <Zap className="h-5 w-5" />,
    color: "border-primary/30 bg-primary/5",
    benefits: [
      "Acceso a la comunidad Leapers",
      "1 curso basico de Metodo ONE",
      "Canal exclusivo de contenido",
      "Badge de Explorer en tu perfil",
    ],
  },
  {
    name: "Pioneer",
    price: "$500 USD",
    tokens: "600 LEAP",
    icon: <Star className="h-5 w-5" />,
    color: "border-primary/50 bg-primary/10",
    popular: true,
    benefits: [
      "Todo lo de Explorer",
      "3 cursos a eleccion",
      "1 sesion privada mensual",
      "Descuento 20% en eventos",
      "Acceso anticipado a nuevos cursos",
      "Badge de Pioneer en tu perfil",
    ],
  },
  {
    name: "Founder",
    price: "$1,000 USD",
    tokens: "1,500 LEAP",
    icon: <Crown className="h-5 w-5" />,
    color: "border-chart-5/50 bg-chart-5/10",
    benefits: [
      "Todo lo de Pioneer",
      "Acceso ilimitado a cursos",
      "2 sesiones privadas mensuales",
      "Participacion en decisiones de la comunidad",
      "Invitacion a retiros presenciales",
      "Mencion como Fundador/a",
    ],
  },
  {
    name: "Visionary",
    price: "$5,000 USD",
    tokens: "10,000 LEAP",
    icon: <Gem className="h-5 w-5" />,
    color: "border-chart-4/50 bg-chart-4/10",
    benefits: [
      "Todo lo de Founder",
      "Co-creacion de contenido con el equipo",
      "Sesiones ilimitadas privadas",
      "Porcentaje de ingresos recurrentes",
      "Asiento en el consejo Leapers",
      "Experiencia VIP en todos los eventos",
      "Marca personal dentro del ecosistema",
    ],
  },
  {
    name: "Legendary",
    price: "$10,000+ USD",
    tokens: "25,000+ LEAP",
    icon: <Rocket className="h-5 w-5" />,
    color: "border-primary bg-primary/15",
    benefits: [
      "Todo lo de Visionary",
      "Partnership estrategico con MY LEAP",
      "Revenue share del ecosistema",
      "Tu propia linea de cursos/talleres",
      "Acceso total a infraestructura y marca",
      "Reunion trimestral con founders",
      "Legado permanente en la comunidad",
    ],
  },
]

function TiersSection() {
  return (
    <section id="tiers" className="space-y-5 scroll-mt-8">
      <SectionTitle icon={<Crown className="h-4 w-4" />} label="Niveles de Inversion" />
      <p className="text-xs sm:text-sm text-muted-foreground text-center max-w-md mx-auto leading-relaxed">
        Elegi el nivel que mas resuene con vos. Cada tier incluye todos los beneficios del anterior
        y suma ventajas exclusivas.
      </p>
      <div className="flex flex-col gap-3">
        {tiers.map((tier) => (
          <TierCard key={tier.name} tier={tier} />
        ))}
      </div>
    </section>
  )
}

function TierCard({
  tier,
}: {
  tier: (typeof tiers)[number]
}) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      className={`relative rounded-xl border ${tier.color} p-4 sm:p-5 transition-all duration-300 hover:shadow-md`}
    >
      {tier.popular && (
        <span className="absolute -top-2.5 right-4 rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-bold text-primary-foreground uppercase tracking-wider">
          Popular
        </span>
      )}

      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          {tier.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2 flex-wrap">
            <h3 className="text-base font-bold text-foreground">{tier.name}</h3>
            <span className="text-xs font-mono text-muted-foreground">{tier.tokens}</span>
          </div>
          <p className="text-lg sm:text-xl font-black text-primary font-mono mt-0.5">
            {tier.price}
          </p>
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
            href="https://wa.me/5491100000000?text=Hola!%20Quiero%20adquirir%20tokens%20LEAP%20nivel%20"
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
function HowItWorks() {
  const steps = [
    { num: "1", title: "Elegi tu nivel", desc: "Selecciona el tier que mejor se ajuste a tu vision." },
    { num: "2", title: "Contactanos", desc: "Coordina el pago seguro via WhatsApp o email." },
    { num: "3", title: "Recibi tus tokens", desc: "Los tokens LEAP se acreditan en tu cuenta." },
    { num: "4", title: "Disfruta los beneficios", desc: "Accede a cursos, sesiones y la comunidad Leapers." },
  ]

  return (
    <section className="space-y-5">
      <SectionTitle icon={<Shield className="h-4 w-4" />} label="Como Funciona" />
      <div className="grid grid-cols-2 gap-3">
        {steps.map((s) => (
          <div key={s.num} className="rounded-xl border border-border bg-card p-4 text-center">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary font-mono">
              {s.num}
            </span>
            <h3 className="mt-2 text-xs font-semibold text-foreground">{s.title}</h3>
            <p className="mt-0.5 text-[11px] text-muted-foreground leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ══════════════════════════════════════
   SOCIAL PROOF
   ══════════════════════════════════════ */
function SocialProof() {
  const quotes = [
    {
      text: "MY LEAP cambio mi forma de ver la energia. Los tokens me dieron acceso a una comunidad increible.",
      name: "Maria C.",
      role: "Pioneer Leaper",
    },
    {
      text: "Invertir en tokens LEAP fue la mejor decision. Los cursos de Metodo ONE son transformadores.",
      name: "Lucas R.",
      role: "Founder Leaper",
    },
    {
      text: "La comunidad Leapers es unica. El valor que recibi supera con creces mi inversion.",
      name: "Valentina S.",
      role: "Explorer Leaper",
    },
  ]

  return (
    <section className="space-y-5">
      <SectionTitle icon={<Users className="h-4 w-4" />} label="La Comunidad Habla" />
      <div className="flex flex-col gap-3">
        {quotes.map((q) => (
          <div key={q.name} className="rounded-xl border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground leading-relaxed italic">
              {`"${q.text}"`}
            </p>
            <div className="mt-2 flex items-center gap-2">
              <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center text-primary text-[10px] font-bold">
                {q.name[0]}
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground">{q.name}</p>
                <p className="text-[10px] text-muted-foreground">{q.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ══════════════════════════════════════
   FAQ
   ══════════════════════════════════════ */
const faqItems = [
  {
    q: "Que puedo hacer con los tokens LEAP?",
    a: "Los tokens te dan acceso a cursos, talleres, sesiones privadas, eventos presenciales y beneficios exclusivos dentro del ecosistema MY LEAP. Cuanto mayor sea tu nivel, mas beneficios desbloqueás.",
  },
  {
    q: "Como adquiero los tokens?",
    a: "Elegis tu nivel de inversion, nos contactas por WhatsApp o email, coordinas el pago y recibis tus tokens acreditados en tu cuenta de la plataforma.",
  },
  {
    q: "Puedo comprar mas tokens despues?",
    a: "Si, podes subir de nivel en cualquier momento. Solo pagas la diferencia entre tu tier actual y el nuevo.",
  },
  {
    q: "Los tokens tienen vencimiento?",
    a: "No. Tus tokens LEAP no vencen. Son tuyos mientras seas parte de la comunidad.",
  },
  {
    q: "Que pasa si la comunidad crece?",
    a: "Los tokens son limitados. A medida que la comunidad crece, los beneficios y el valor del ecosistema se potencian para todos los holders.",
  },
  {
    q: "Puedo participar en la toma de decisiones?",
    a: "Desde el nivel Founder, tenes voz y voto en decisiones clave de la comunidad, nuevos cursos y direccion del proyecto.",
  },
]

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="space-y-5">
      <SectionTitle icon={<Shield className="h-4 w-4" />} label="Preguntas Frecuentes" />
      <div className="flex flex-col gap-2">
        {faqItems.map((item, i) => (
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
function FinalCTA() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-primary/30 bg-primary/5 p-6 sm:p-8 text-center">
      <div className="pointer-events-none absolute -top-16 -right-16 h-32 w-32 rounded-full bg-primary/15 blur-3xl" />
      <h2 className="text-xl sm:text-2xl font-black font-mono tracking-tight title-shimmer-text">
        TU SALTO EMPIEZA HOY
      </h2>
      <p className="mt-2 text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
        Unite a la comunidad que esta redefiniendo el bienestar.
        Cada token LEAP es una inversion en vos y en el crecimiento colectivo.
      </p>
      <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-3">
        <a
          href="#tiers"
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.02] transition-all duration-300"
        >
          <Rocket className="h-4 w-4" />
          Ver Niveles de Inversion
        </a>
        <a
          href="https://wa.me/5491100000000?text=Hola!%20Quiero%20info%20sobre%20Token%20LEAP"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground hover:border-primary/50 transition-colors"
        >
          <ExternalLink className="h-4 w-4" />
          Hablar con el Equipo
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
   MAIN PAGE
   ══════════════════════════════════════ */
export function TokenLeapContent() {
  return (
    <main className="relative mx-auto flex min-h-screen max-w-xl flex-col items-center px-4 pb-8 pt-6 gap-8">
      {/* Back navigation */}
      <div className="w-full">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Volver a MY LEAP
        </Link>
      </div>

      <Hero />
      <WhatIsSection />
      <TiersSection />
      <HowItWorks />
      <SocialProof />
      <FAQSection />
      <FinalCTA />

      {/* Footer */}
      <footer className="w-full text-center pt-4 pb-2 border-t border-border">
        <p className="text-[10px] text-muted-foreground">
          MY LEAP &middot; Potenciado por Metodo ONE
        </p>
      </footer>
    </main>
  )
}
