"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Heart,
  GraduationCap,
  BookOpen,
  MessageCircle,
  Video,
  Calendar,
  Clock,
  Users,
  Download,
  ExternalLink,
  Star,
  ClipboardCheck,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  MapPin,
} from "lucide-react"

/* ───────────────────────────────────────────
   0) Registrate y Sana – Encuesta + Sesion Gratuita
   ─────────────────────────────────────────── */

const surveyQuestions = [
  {
    id: "nombre",
    label: "Nombre completo",
    type: "text" as const,
    placeholder: "Tu nombre",
  },
  {
    id: "email",
    label: "Email",
    type: "email" as const,
    placeholder: "tu@email.com",
  },
  {
    id: "dolor",
    label: "Que tipo de malestar o dolor experimentas?",
    type: "select" as const,
    options: [
      "Dolor fisico (espalda, cuello, articulaciones)",
      "Estres o ansiedad",
      "Cansancio cronico / fatiga",
      "Bloqueo emocional",
      "Insomnio o problemas de sueno",
      "Otro",
    ],
  },
  {
    id: "experiencia",
    label: "Has tenido alguna experiencia previa con sanacion energetica?",
    type: "select" as const,
    options: ["Si, varias veces", "Solo una vez", "Nunca, es mi primera vez"],
  },
  {
    id: "expectativa",
    label: "Que esperas de esta sesion gratuita?",
    type: "select" as const,
    options: [
      "Aliviar un dolor o malestar especifico",
      "Relajarme y reducir el estres",
      "Conocer de que se trata la sanacion energetica",
      "Conectar conmigo mismo/a",
    ],
  },
]

export function RegistrateYSanaModal({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (v: boolean) => void
}) {
  const [step, setStep] = useState<"info" | "survey" | "success">("info")
  const [answers, setAnswers] = useState<Record<string, string>>({})

  const handleClose = (v: boolean) => {
    if (!v) {
      setStep("info")
      setAnswers({})
    }
    onOpenChange(v)
  }

  const allAnswered =
    surveyQuestions.every((q) => answers[q.id] && answers[q.id].trim() !== "")

  const handleSubmit = () => {
    if (allAnswered) {
      setStep("success")
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        {step === "info" && (
          <>
            <DialogHeader>
              <div className="flex items-center gap-3 mb-1">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <DialogTitle className="text-lg font-bold text-foreground">
                    Sanacion Energetica Gratuita
                  </DialogTitle>
                  <DialogDescription className="text-sm text-muted-foreground">
                    Sesion callejera de muestra - 15 a 20 min
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <div className="space-y-5">
              {/* Intro */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                Bienvenido a la comunidad My Leap, preparate para vivir la experiencia
                gratuita del M&#233;todo ONE.
              </p>

              {/* Details */}
              <div className="rounded-xl border border-border bg-secondary/50 p-4 space-y-3">
                <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  Detalles de la Sesion
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-start gap-2">
                    <Clock className="h-4 w-4 text-primary mt-0.5" />
                    <div>
                      <p className="text-xs font-medium text-foreground">Duracion</p>
                      <p className="text-xs text-muted-foreground">15 - 20 minutos</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Heart className="h-4 w-4 text-primary mt-0.5" />
                    <div>
                      <p className="text-xs font-medium text-foreground">Costo</p>
                      <p className="text-xs text-muted-foreground">100% Gratuito</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-primary mt-0.5" />
                    <div>
                      <p className="text-xs font-medium text-foreground">Lugar</p>
                      <p className="text-xs text-muted-foreground">Espacio publico / al aire libre</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Users className="h-4 w-4 text-primary mt-0.5" />
                    <div>
                      <p className="text-xs font-medium text-foreground">Cupos</p>
                      <p className="text-xs text-muted-foreground">Limitados por sesion</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* What you get */}
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-foreground">Que incluye la experiencia</h4>
                <ul className="space-y-2">
                  {[
                    "Sesion individual de sanacion energetica de 15-20 minutos",
                    "Facilitador certificado en el Metodo ONE",
                    "Evaluacion breve de tus dolencias",
                    "Acceso a beneficios de la comunidad",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
                      <span className="text-xs text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <DialogFooter className="mt-2">
              <button
                type="button"
                onClick={() => setStep("survey")}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.02] active:scale-95"
              >
                <ClipboardCheck className="h-4 w-4" />
                Completar Encuesta para Sanar
              </button>
            </DialogFooter>
          </>
        )}

        {step === "survey" && (
          <>
            <DialogHeader>
              <div className="flex items-center gap-3 mb-1">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <ClipboardCheck className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <DialogTitle className="text-lg font-bold text-foreground">
                    Mini Encuesta
                  </DialogTitle>
                  <DialogDescription className="text-sm text-muted-foreground">
                    Completa para acceder a tu sesion gratuita
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <div className="space-y-4">
              <p className="text-xs text-muted-foreground leading-relaxed">
                Responde estas breves preguntas para que nuestro facilitador pueda preparar
                tu sesion de la mejor manera posible.
              </p>

              {surveyQuestions.map((q) => (
                <div key={q.id} className="space-y-1.5">
                  <label
                    htmlFor={q.id}
                    className="text-xs font-semibold text-foreground"
                  >
                    {q.label}
                  </label>
                  {q.type === "select" ? (
                    <select
                      id={q.id}
                      value={answers[q.id] || ""}
                      onChange={(e) =>
                        setAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))
                      }
                      className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2.5 text-xs text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                    >
                      <option value="">Selecciona una opcion</option>
                      {q.options?.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      id={q.id}
                      type={q.type}
                      placeholder={q.placeholder}
                      value={answers[q.id] || ""}
                      onChange={(e) =>
                        setAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))
                      }
                      className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                    />
                  )}
                </div>
              ))}
            </div>

            <DialogFooter className="mt-2 flex flex-col gap-2 sm:flex-col">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!allAnswered}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-none disabled:cursor-not-allowed"
              >
                <ArrowRight className="h-4 w-4" />
                Enviar y Reservar Mi Sesion
              </button>
              <button
                type="button"
                onClick={() => setStep("info")}
                className="w-full text-xs text-muted-foreground hover:text-foreground transition-colors py-1"
              >
                Volver a la informacion
              </button>
            </DialogFooter>
          </>
        )}

        {step === "success" && (
          <>
            <div className="flex flex-col items-center text-center py-6 space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-foreground">
                  Registro Exitoso
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
                  Gracias{answers.nombre ? `, ${answers.nombre.split(" ")[0]}` : ""}! Tu sesion gratuita de sanacion
                  energetica ha sido reservada. Te contactaremos a{" "}
                  <span className="font-medium text-foreground">{answers.email || "tu email"}</span>{" "}
                  con los detalles del lugar, dia y horario.
                </p>
              </div>

              <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 w-full max-w-sm space-y-2">
                <h4 className="text-sm font-semibold text-foreground">Proximos pasos</h4>
                <ul className="space-y-1.5 text-left">
                  {[
                    "Revisa tu email para la confirmacion",
                    "Llega 5 minutos antes a la sesion",
                    "Usa ropa comoda",
                    "Trae buena energia y mente abierta",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
                      <span className="text-xs text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <DialogFooter>
              <button
                type="button"
                onClick={() => handleClose(false)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.02] active:scale-95"
              >
                <Sparkles className="h-4 w-4" />
                Cerrar
              </button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

/* ───────────────────────────────────────────
   a) Sanacion Grupal a Distancia
   ─────────────────────────────────────────── */
export function SanacionGrupalModal({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (v: boolean) => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-1">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <Heart className="h-5 w-5 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-lg font-bold text-foreground">
                Sanacion Grupal a Distancia
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                Sesion en vivo por Zoom
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-5">
          {/* Badge */}
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground uppercase tracking-wider">
              EN VIVO
            </span>
            <span className="text-xs text-muted-foreground">Sesiones semanales</span>
          </div>

          {/* Descripcion */}
          <p className="text-sm text-muted-foreground leading-relaxed">
            Conectate desde cualquier lugar del mundo a nuestra sesion grupal de sanacion energetica.
            Un espacio seguro y guiado donde trabajamos en grupo para liberar bloqueos, sanar dolores
            y elevar tu energia vital con el Metodo ONE.
          </p>

          {/* Detalles de la reunion */}
          <div className="rounded-xl border border-border bg-secondary/50 p-4 space-y-3">
            <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Video className="h-4 w-4 text-primary" />
              Datos de la Reunion
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-start gap-2">
                <Calendar className="h-4 w-4 text-primary mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-foreground">Dia</p>
                  <p className="text-xs text-muted-foreground">Todos los Martes</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="h-4 w-4 text-primary mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-foreground">Hora</p>
                  <p className="text-xs text-muted-foreground">20:00 hs (Argentina)</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Users className="h-4 w-4 text-primary mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-foreground">Cupos</p>
                  <p className="text-xs text-muted-foreground">Ilimitados</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Video className="h-4 w-4 text-primary mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-foreground">Plataforma</p>
                  <p className="text-xs text-muted-foreground">Zoom</p>
                </div>
              </div>
            </div>
          </div>

          {/* Zoom info */}
          <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 space-y-2">
            <h4 className="text-sm font-semibold text-foreground">Acceso a Zoom</h4>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">
                <span className="font-medium text-foreground">ID de reunion:</span> 123 456 7890
              </p>
              <p className="text-xs text-muted-foreground">
                <span className="font-medium text-foreground">Contrasena:</span> MYLEAP2026
              </p>
            </div>
          </div>
        </div>

        <DialogFooter className="mt-2">
          <a
            href="https://zoom.us/j/1234567890?pwd=MYLEAP2026"
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.02] active:scale-95"
          >
            <Video className="h-4 w-4" />
            Unirse a Zoom
          </a>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

/* ───────────────────────────────────────────
   b) Metodo ONE
   ─────────────────────────────────────────── */
export function MetodoOneModal({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (v: boolean) => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-1">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <GraduationCap className="h-5 w-5 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-lg font-bold text-foreground">
                Metodo ONE
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                Metodologia de sanacion con energia
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-5">
          {/* Descripcion */}
          <p className="text-sm text-muted-foreground leading-relaxed">
            El Metodo ONE es una metodologia de sanacion energetica desarrollada para
            conectar con tu esencia y liberar patrones que limitan tu bienestar. Combina
            tecnicas de imposicion de manos, respiracion consciente y meditacion activa
            para lograr una transformacion profunda a nivel fisico, emocional y espiritual.
          </p>

          {/* Beneficios */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-foreground">Beneficios principales</h4>
            <ul className="space-y-2">
              {[
                "Liberacion de bloqueos energeticos y emocionales",
                "Reduccion del estres y la ansiedad",
                "Conexion profunda con tu energia vital",
                "Sanacion de dolores fisicos y emocionales",
                "Desarrollo de la intuicion y percepcion energetica",
              ].map((benefit) => (
                <li key={benefit} className="flex items-start gap-2">
                  <Star className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
                  <span className="text-xs text-muted-foreground">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Info cards */}
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl border border-border bg-secondary/50 p-3 text-center">
              <p className="text-lg font-bold text-foreground font-mono">4h</p>
              <p className="text-xs text-muted-foreground">Duracion</p>
            </div>
            <div className="rounded-xl border border-border bg-secondary/50 p-3 text-center">
              <p className="text-lg font-bold text-foreground font-mono">3</p>
              <p className="text-xs text-muted-foreground">Niveles</p>
            </div>
            <div className="rounded-xl border border-border bg-secondary/50 p-3 text-center">
              <p className="text-lg font-bold text-primary font-mono">+1K</p>
              <p className="text-xs text-muted-foreground">Egresados</p>
            </div>
          </div>

          {/* Video Short */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Video className="h-4 w-4 text-primary" />
              Conoce el Metodo ONE
            </h4>
            <div className="relative w-full overflow-hidden rounded-xl border border-border aspect-[9/16] max-h-[400px] mx-auto max-w-[225px]">
              <iframe
                src="https://www.youtube.com/embed/eo53JchtPf4"
                title="Metodo ONE - Video Short"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            </div>
          </div>
        </div>

        <DialogFooter className="mt-2">
          <a
            href="#metodo-one"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.02] active:scale-95"
          >
            <GraduationCap className="h-4 w-4" />
            Inscribirme al Curso
          </a>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

/* ───────────────────────────────────────────
   c) E‑book
   ─────────────────────────────────────────── */
export function EbookModal({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (v: boolean) => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-1">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-lg font-bold text-foreground">
                E-book: El Poder Sanador de la Energia
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                Un mundo de posibilidades
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-5">
          {/* Badge */}
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground uppercase tracking-wider">
              NUEVO
            </span>
            <span className="text-xs text-muted-foreground">Descarga gratuita</span>
          </div>

          {/* Book cover placeholder */}
          <div className="relative mx-auto w-48 h-64 rounded-xl border border-border bg-gradient-to-br from-primary/10 to-primary/5 flex flex-col items-center justify-center overflow-hidden shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
            <BookOpen className="h-12 w-12 text-primary mb-3 relative z-10" />
            <p className="text-xs font-bold text-foreground text-center px-4 relative z-10 leading-tight">
              El Poder Sanador de la Energia
            </p>
            <p className="text-[10px] text-muted-foreground mt-1 relative z-10">MyLeap</p>
          </div>

          {/* Descripcion */}
          <p className="text-sm text-muted-foreground leading-relaxed">
            Descubre los fundamentos de la sanacion energetica en esta guia completa. Aprende como
            funciona la energia en tu cuerpo, como detectar bloqueos y las tecnicas basicas para
            comenzar tu camino de sanacion personal.
          </p>

          {/* Que encontraras */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-foreground">Que encontraras</h4>
            <div className="grid grid-cols-1 gap-2">
              {[
                "Introduccion a la energia vital y sus principios",
                "Tecnicas basicas de autodiagnostico energetico",
                "Ejercicios de respiracion y meditacion guiada",
                "Los 7 centros energeticos y como equilibrarlos",
                "Guia practica para sesiones de sanacion en casa",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2 rounded-lg bg-secondary/50 p-2.5 border border-border">
                  <Star className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
                  <span className="text-xs text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl border border-border bg-secondary/50 p-3 text-center">
              <p className="text-lg font-bold text-foreground font-mono">85</p>
              <p className="text-xs text-muted-foreground">Paginas</p>
            </div>
            <div className="rounded-xl border border-border bg-secondary/50 p-3 text-center">
              <p className="text-lg font-bold text-foreground font-mono">12</p>
              <p className="text-xs text-muted-foreground">Capitulos</p>
            </div>
            <div className="rounded-xl border border-border bg-secondary/50 p-3 text-center">
              <p className="text-lg font-bold text-primary font-mono">PDF</p>
              <p className="text-xs text-muted-foreground">Formato</p>
            </div>
          </div>
        </div>

        <DialogFooter className="mt-2">
          <a
            href="#descargar-ebook"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.02] active:scale-95"
          >
            <Download className="h-4 w-4" />
            Descargar E-book Gratis
          </a>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

/* ───────────────────────────────────────────
   d) Consulta 1:1 – Lista de Facilitadores
   ─────────────────────────────────────────── */

interface Facilitator {
  name: string
  specialty: string
  avatar: string
  rating: number
  sessions: string
  whatsappUrl: string
  bio: string
}

const facilitators: Facilitator[] = [
  {
    name: "Maria Gonzalez",
    specialty: "Sanacion Energetica & Reiki",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    rating: 4.9,
    sessions: "320+",
    whatsappUrl: "https://wa.me/5491100000001?text=Hola%20Maria,%20quiero%20agendar%20una%20sesion",
    bio: "Facilitadora certificada Metodo ONE Nivel III con mas de 5 anos de experiencia en sanacion energetica y acompanamiento terapeutico.",
  },
  {
    name: "Carlos Fernandez",
    specialty: "Bioenergetica & Meditacion",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    rating: 4.8,
    sessions: "250+",
    whatsappUrl: "https://wa.me/5491100000002?text=Hola%20Carlos,%20quiero%20agendar%20una%20sesion",
    bio: "Especialista en bioenergetica con enfoque en liberacion emocional y equilibrio de los centros energeticos.",
  },
  {
    name: "Ana Lucia Torres",
    specialty: "Sanacion Emocional & Coaching",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    rating: 5.0,
    sessions: "180+",
    whatsappUrl: "https://wa.me/5491100000003?text=Hola%20Ana%20Lucia,%20quiero%20agendar%20una%20sesion",
    bio: "Facilitadora del Metodo ONE con especializacion en coaching transformacional y sanacion del nino interior.",
  },
  {
    name: "Diego Martinez",
    specialty: "Terapia Energetica & Mindfulness",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    rating: 4.7,
    sessions: "150+",
    whatsappUrl: "https://wa.me/5491100000004?text=Hola%20Diego,%20quiero%20agendar%20una%20sesion",
    bio: "Terapeuta energetico certificado con enfoque en mindfulness y tecnicas de relajacion profunda.",
  },
]

export function ConsultaModal({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (v: boolean) => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-1">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <MessageCircle className="h-5 w-5 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-lg font-bold text-foreground">
                Consulta 1:1 Personalizada
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                Elige tu facilitador energetico
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Selecciona un facilitador certificado para tu sesion privada de sanacion.
            Cada terapeuta tiene un enfoque unico para acompanarte en tu proceso.
          </p>

          {/* Facilitators list */}
          <div className="space-y-3">
            {facilitators.map((f) => (
              <FacilitatorCard key={f.name} facilitator={f} />
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function FacilitatorCard({ facilitator }: { facilitator: Facilitator }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="rounded-xl border border-border bg-card p-4 transition-all duration-300 hover:border-primary/40 hover:shadow-md">
      {/* Header */}
      <div className="flex items-start gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={facilitator.avatar}
          alt={facilitator.name}
          className="h-12 w-12 shrink-0 rounded-full object-cover border-2 border-primary/20"
        />
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-foreground">{facilitator.name}</h4>
          <p className="text-xs text-muted-foreground">{facilitator.specialty}</p>
          <div className="flex items-center gap-3 mt-1">
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 text-primary fill-primary" />
              <span className="text-xs font-medium text-foreground">{facilitator.rating}</span>
            </div>
            <span className="text-xs text-muted-foreground">{facilitator.sessions} sesiones</span>
          </div>
        </div>
      </div>

      {/* Expandable bio */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-2 text-xs text-primary font-medium hover:underline"
      >
        {expanded ? "Ver menos" : "Ver perfil completo"}
      </button>

      {expanded && (
        <div className="mt-3 space-y-3 animate-fade-up">
          <p className="text-xs text-muted-foreground leading-relaxed">
            {facilitator.bio}
          </p>
        </div>
      )}

      {/* CTAs */}
      <div className="mt-3 flex gap-2">
        <a
          href={facilitator.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#25D366] px-4 py-2.5 text-xs font-semibold text-[#fff] transition-all duration-300 hover:shadow-lg hover:shadow-[#25D366]/30 hover:scale-[1.02] active:scale-95"
        >
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          WhatsApp
        </a>
        <a
          href={facilitator.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-primary bg-primary/10 px-4 py-2.5 text-xs font-semibold text-primary transition-all duration-300 hover:bg-primary/20 hover:scale-[1.02] active:scale-95"
        >
          <Calendar className="h-3.5 w-3.5" />
          Agendar Sesion
        </a>
      </div>
    </div>
  )
}


