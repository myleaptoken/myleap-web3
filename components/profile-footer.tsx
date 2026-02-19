import { Heart } from "lucide-react"

export function ProfileFooter() {
  return (
    <footer className="mt-8 pb-8 flex flex-col items-center gap-2 animate-fade-up" style={{ animationDelay: "0.9s" }}>
      <div className="h-px w-16 bg-border" />
      <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
        Hecho con <Heart className="h-3 w-3 text-primary fill-primary" /> por MyLeap
      </p>
      <p className="text-xs text-muted-foreground/50">
        &copy; {new Date().getFullYear()} MyLeap. Todos los derechos reservados.
      </p>
    </footer>
  )
}
