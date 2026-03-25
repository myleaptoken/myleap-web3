import Link from "next/link"
import { Mail, ArrowLeft } from "lucide-react"

export default function VerifyPage() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-6 text-center">
        {/* Icon */}
        <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <Mail className="h-8 w-8 text-primary" />
        </div>

        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">Revisa tu Email</h1>
          <p className="text-sm text-muted-foreground">
            Te enviamos un enlace de verificacion. Haz click en el enlace para activar tu cuenta.
          </p>
        </div>

        {/* Info */}
        <div className="p-4 rounded-lg bg-secondary/50 border border-border text-sm text-muted-foreground">
          Si no ves el email, revisa tu carpeta de spam.
        </div>

        {/* Back link */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al inicio
        </Link>
      </div>
    </main>
  )
}
