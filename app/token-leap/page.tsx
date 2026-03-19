import type { Metadata } from "next"
import { getCrowdfundingConfig } from "@/lib/data"
import { createClient } from "@/lib/supabase/server"
import type { Testimonial } from "@/lib/types"
import { TokenLeapContent } from "./token-leap-content"

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://myleap.world'),
  title: "Token LEAP | Sumate al Movimiento Leapers",
  description:
    "Compra tokens LEAP y accede a los beneficios exclusivos de la comunidad MY LEAP. Invierte en bienestar, energia y crecimiento colectivo.",
  openGraph: {
    title: "Token LEAP | Sumate al Movimiento Leapers",
    description:
      "Invierte en bienestar, energia y crecimiento colectivo con Token LEAP.",
  },
}

export default async function TokenLeapPage() {
  const [config, supabase] = await Promise.all([
    getCrowdfundingConfig(),
    createClient(),
  ])

  const { data: testimonialsData } = await supabase
    .from("testimonials")
    .select("*")
    .eq("is_active", true)
    .order("display_order")

  const testimonials = (testimonialsData as Testimonial[]) ?? []

  return <TokenLeapContent config={config} testimonials={testimonials} />
}
