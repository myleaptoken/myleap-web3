import { Metadata } from "next"
import { getLandingSanarData } from "@/lib/data"
import { SanarLandingContent } from "./sanar-landing-content"

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://myleap.world'),
  title: "Sanar | MY LEAP - Potenciado por Método ONE",
  description: "Descubre el poder de la sanación energética con sesiones personalizadas que te ayudarán a liberar bloqueos emocionales y alcanzar tu máximo potencial.",
}

export default async function SanarPage() {
  const data = await getLandingSanarData()
  
  return (
    <SanarLandingContent
      landingConfig={data.landingConfig}
      sanacionConfig={data.sanacionConfig}
      sanacionOptions={data.sanacionOptions}
      profile={data.profile}
      socialLinks={data.socialLinks}
      testimonials={data.testimonials}
    />
  )
}
