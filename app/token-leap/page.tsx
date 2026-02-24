import type { Metadata } from "next"
import { TokenLeapContent } from "./token-leap-content"

export const metadata: Metadata = {
  title: "Token LEAP | Sumate al Movimiento Leapers",
  description:
    "Compra tokens LEAP y accede a los beneficios exclusivos de la comunidad MY LEAP. Invierte en bienestar, energia y crecimiento colectivo.",
  openGraph: {
    title: "Token LEAP | Sumate al Movimiento Leapers",
    description:
      "Invierte en bienestar, energia y crecimiento colectivo con Token LEAP.",
  },
}

export default function TokenLeapPage() {
  return <TokenLeapContent />
}
