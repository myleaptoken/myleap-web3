import { getCursosOneConfig, getPageData } from "@/lib/data"
import { CursosOneContent } from "./cursos-one-content"

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://myleap.world'),
  title: "Cursos Metodo ONE | MY LEAP",
  description:
    "Descubri el Metodo ONE: Optimizacion Neuro Energetica. Cursos presenciales, online en vivo y grabados para transformar tu bienestar.",
}

export default async function CursosOnePage() {
  const [config, pageData] = await Promise.all([getCursosOneConfig(), getPageData()])

  if (!config) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
        <p>Configuracion no disponible.</p>
      </div>
    )
  }

  return <CursosOneContent config={config} socialLinks={pageData.socialLinks} testimonials={pageData.testimonials} />
}
