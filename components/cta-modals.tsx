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
  Star,
  ClipboardCheck,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  MapPin,
} from "lucide-react"
import type { CTALinkWithModal, Facilitator } from "@/lib/types"
import { submitSurvey } from "@/app/actions"

/* ─── Icon map for modal headers ─── */
const headerIconMap: Record<string, React.ReactNode> = {
  Heart: <Heart className="h-5 w-5 text-primary" />,
  Sparkles: <Sparkles className="h-5 w-5 text-primary" />,
  GraduationCap: <GraduationCap className="h-5 w-5 text-primary" />,
  BookOpen: <BookOpen className="h-5 w-5 text-primary" />,
  MessageCircle: <MessageCircle className="h-5 w-5 text-primary" />,
}

/* ─── Main dynamic modal ─── */
export function DynamicModal({
  link,
  facilitators,
  open,
  onOpenChange,
}: {
  link: CTALinkWithModal | null
  facilitators: Facilitator[]
  open: boolean
  onOpenChange: (v: boolean) => void
}) {
  if (!link) return null

  const modal = link.cta_modal_content?.[0] ?? null
  if (!modal) return null

  const extra = (modal.extra_data ?? {}) as Record<string, unknown>

  switch (modal.modal_type) {
    case "survey":
      return (
        <SurveyModal
          link={link}
          modal={modal}
          extra={extra}
          open={open}
          onOpenChange={onOpenChange}
        />
      )
    case "zoom":
      return (
        <ZoomModal
          link={link}
          modal={modal}
          extra={extra}
          open={open}
          onOpenChange={onOpenChange}
        />
      )
    case "video":
      return (
        <VideoModal
          link={link}
          modal={modal}
          extra={extra}
          open={open}
          onOpenChange={onOpenChange}
        />
      )
    case "ebook":
      return (
        <EbookModal
          link={link}
          modal={modal}
          extra={extra}
          open={open}
          onOpenChange={onOpenChange}
        />
      )
    case "facilitators":
      return (
        <FacilitatorsModal
          link={link}
          modal={modal}
          facilitators={facilitators}
          open={open}
          onOpenChange={onOpenChange}
        />
      )
    default:
      return (
        <InfoModal
          link={link}
          modal={modal}
          open={open}
          onOpenChange={onOpenChange}
        />
      )
  }
}

/* ─── Shared types ─── */
interface ModalBaseProps {
  link: CTALinkWithModal
  modal: CTALinkWithModal["cta_modal_content"] extends (infer T)[] | null
    ? NonNullable<T>
    : never
  open: boolean
  onOpenChange: (v: boolean) => void
}

/* ========================================
   0) SURVEY MODAL (Registrate y Sana)
   ======================================== */
function SurveyModal({
  link,
  modal,
  extra,
  open,
  onOpenChange,
}: ModalBaseProps & { extra: Record<string, unknown> }) {
  const [step, setStep] = useState<"info" | "survey" | "success">("info")
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)

  const details = (extra.details ?? {}) as Record<string, string>
  const includes = (extra.includes ?? []) as string[]
  const surveyQuestions = (extra.survey_questions ?? []) as Array<{
    id: string
    label: string
    type: string
    placeholder?: string
    options?: string[]
  }>

  const handleClose = (v: boolean) => {
    if (!v) {
      setStep("info")
      setAnswers({})
    }
    onOpenChange(v)
  }

  const allAnswered = surveyQuestions.every(
    (q) => answers[q.id] && answers[q.id].trim() !== ""
  )

  const handleSubmit = async () => {
    if (!allAnswered) return
    setSubmitting(true)
    try {
      await submitSurvey({
        ctaLinkId: link.id,
        name: answers.nombre || "",
        email: answers.email || "",
        phone: answers.celular || "",
        dolor: answers.dolor || "",
        experiencia: answers.experiencia || "",
        expectativa: answers.expectativa || "",
      })
      setStep("success")
    } catch {
      // still show success for now
      setStep("success")
    } finally {
      setSubmitting(false)
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
                  {headerIconMap[link.icon_name] ?? (
                    <Sparkles className="h-5 w-5 text-primary" />
                  )}
                </div>
                <div>
                  <DialogTitle className="text-lg font-bold text-foreground">
                    {modal.modal_title}
                  </DialogTitle>
                  <DialogDescription className="text-sm text-muted-foreground">
                    {modal.modal_subtitle}
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <div className="space-y-5">
              {modal.modal_body && (
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {modal.modal_body}
                </p>
              )}

              {/* Details grid */}
              {Object.keys(details).length > 0 && (
                <div className="rounded-xl border border-border bg-secondary/50 p-4 space-y-3">
                  <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    Detalles de la Sesion
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(details).map(([key, val]) => {
                      const icons: Record<string, React.ReactNode> = {
                        duracion: <Clock className="h-4 w-4 text-primary mt-0.5" />,
                        costo: <Heart className="h-4 w-4 text-primary mt-0.5" />,
                        lugar: <MapPin className="h-4 w-4 text-primary mt-0.5" />,
                        cupos: <Users className="h-4 w-4 text-primary mt-0.5" />,
                      }
                      return (
                        <div key={key} className="flex items-start gap-2">
                          {icons[key] ?? (
                            <Clock className="h-4 w-4 text-primary mt-0.5" />
                          )}
                          <div>
                            <p className="text-xs font-medium text-foreground capitalize">
                              {key}
                            </p>
                            <p className="text-xs text-muted-foreground">{val}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Includes */}
              {includes.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-foreground">
                    Que incluye la experiencia
                  </h4>
                  <ul className="space-y-2">
                    {includes.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
                        <span className="text-xs text-muted-foreground">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <DialogFooter className="mt-2">
              <button
                type="button"
                onClick={() => setStep("survey")}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.02] active:scale-95"
              >
                <ClipboardCheck className="h-4 w-4" />
                {modal.cta_button_text ?? "Completar Encuesta para Sanar"}
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
                Responde estas breves preguntas para que nuestro facilitador
                pueda preparar tu sesion de la mejor manera posible.
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
                        setAnswers((prev) => ({
                          ...prev,
                          [q.id]: e.target.value,
                        }))
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
                        setAnswers((prev) => ({
                          ...prev,
                          [q.id]: e.target.value,
                        }))
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
                disabled={!allAnswered || submitting}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-none disabled:cursor-not-allowed"
              >
                <ArrowRight className="h-4 w-4" />
                {submitting ? "Enviando..." : "Enviar y Reservar Mi Sesion"}
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
                  Gracias
                  {answers.nombre
                    ? `, ${answers.nombre.split(" ")[0]}`
                    : ""}
                  !! por abrirte a la sanacion
                </p>
              </div>

              <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 w-full max-w-sm space-y-2">
                <h4 className="text-sm font-semibold text-foreground">
                  Proximos pasos
                </h4>
                <ul className="space-y-1.5 text-left">
                  {[
                    "Acercate al terapeuta",
                    "Comenta detalladamente tus dolencias",
                    "Vive la sanacion con tu corazon abierto",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
                      <span className="text-xs text-muted-foreground">
                        {item}
                      </span>
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

/* ========================================
   a) ZOOM MODAL (Sanacion Grupal)
   ======================================== */
function ZoomModal({
  link,
  modal,
  extra,
  open,
  onOpenChange,
}: ModalBaseProps & { extra: Record<string, unknown> }) {
  const schedule = (extra.schedule ?? {}) as Record<string, string>
  const features = (extra.features ?? []) as string[]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-1">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              {headerIconMap[link.icon_name] ?? (
                <Heart className="h-5 w-5 text-primary" />
              )}
            </div>
            <div>
              <DialogTitle className="text-lg font-bold text-foreground">
                {modal.modal_title}
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                {modal.modal_subtitle}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-5">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground uppercase tracking-wider">
              EN VIVO
            </span>
            <span className="text-xs text-muted-foreground">
              Sesiones semanales
            </span>
          </div>

          {modal.modal_body && (
            <p className="text-sm text-muted-foreground leading-relaxed">
              {modal.modal_body}
            </p>
          )}

          {/* Schedule details */}
          <div className="rounded-xl border border-border bg-secondary/50 p-4 space-y-3">
            <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Video className="h-4 w-4 text-primary" />
              Datos de la Reunion
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {schedule.day && (
                <div className="flex items-start gap-2">
                  <Calendar className="h-4 w-4 text-primary mt-0.5" />
                  <div>
                    <p className="text-xs font-medium text-foreground">Dia</p>
                    <p className="text-xs text-muted-foreground">
                      {schedule.day}
                    </p>
                  </div>
                </div>
              )}
              {schedule.time && (
                <div className="flex items-start gap-2">
                  <Clock className="h-4 w-4 text-primary mt-0.5" />
                  <div>
                    <p className="text-xs font-medium text-foreground">Hora</p>
                    <p className="text-xs text-muted-foreground">
                      {schedule.time}
                    </p>
                  </div>
                </div>
              )}
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
                  <p className="text-xs font-medium text-foreground">
                    Plataforma
                  </p>
                  <p className="text-xs text-muted-foreground">Zoom</p>
                </div>
              </div>
            </div>
          </div>

          {/* Zoom credentials */}
          <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 space-y-2">
            <h4 className="text-sm font-semibold text-foreground">
              Acceso a Zoom
            </h4>
            <div className="space-y-1">
              {extra.zoom_id && (
                <p className="text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">
                    ID de reunion:
                  </span>{" "}
                  {String(extra.zoom_id)}
                </p>
              )}
              {extra.zoom_password && (
                <p className="text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">
                    Contrasena:
                  </span>{" "}
                  {String(extra.zoom_password)}
                </p>
              )}
            </div>
          </div>

          {/* Features */}
          {features.length > 0 && (
            <ul className="space-y-2">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
                  <span className="text-xs text-muted-foreground">{f}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <DialogFooter className="mt-2">
          <a
            href={modal.cta_button_url ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.02] active:scale-95"
          >
            <Video className="h-4 w-4" />
            {modal.cta_button_text ?? "Unirse a Zoom"}
          </a>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

/* ========================================
   b) VIDEO MODAL (Metodo ONE)
   ======================================== */
function VideoModal({
  link,
  modal,
  extra,
  open,
  onOpenChange,
}: ModalBaseProps & { extra: Record<string, unknown> }) {
  const benefits = (extra.benefits ?? []) as string[]
  const stats = (extra.stats ?? {}) as Record<string, string>
  const youtubeId = extra.youtube_short_id as string | undefined

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-1">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              {headerIconMap[link.icon_name] ?? (
                <GraduationCap className="h-5 w-5 text-primary" />
              )}
            </div>
            <div>
              <DialogTitle className="text-lg font-bold text-foreground">
                {modal.modal_title}
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                {modal.modal_subtitle}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-5">
          {modal.modal_body && (
            <p className="text-sm text-muted-foreground leading-relaxed">
              {modal.modal_body}
            </p>
          )}

          {/* Benefits */}
          {benefits.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-foreground">
                Beneficios principales
              </h4>
              <ul className="space-y-2">
                {benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <Star className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
                    <span className="text-xs text-muted-foreground">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Stats */}
          {Object.keys(stats).length > 0 && (
            <div className="grid grid-cols-3 gap-3">
              {Object.entries(stats).map(([key, val]) => (
                <div
                  key={key}
                  className="rounded-xl border border-border bg-secondary/50 p-3 text-center"
                >
                  <p className="text-lg font-bold text-foreground font-mono">
                    {val}
                  </p>
                  <p className="text-xs text-muted-foreground capitalize">
                    {key}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* YouTube Short */}
          {youtubeId && (
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Video className="h-4 w-4 text-primary" />
                Conoce el Metodo ONE
              </h4>
              <div className="relative w-full overflow-hidden rounded-xl border border-border aspect-[9/16] max-h-[400px] mx-auto max-w-[225px]">
                <iframe
                  src={`https://www.youtube.com/embed/${youtubeId}`}
                  title="Metodo ONE - Video Short"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              </div>
            </div>
          )}
        </div>

        {modal.cta_button_text && (
          <DialogFooter className="mt-2">
            <a
              href={modal.cta_button_url ?? "#"}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.02] active:scale-95"
            >
              <GraduationCap className="h-4 w-4" />
              {modal.cta_button_text}
            </a>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}

/* ========================================
   c) EBOOK MODAL
   ======================================== */
function EbookModal({
  link,
  modal,
  extra,
  open,
  onOpenChange,
}: ModalBaseProps & { extra: Record<string, unknown> }) {
  const chapters = (extra.chapters ?? []) as string[]
  const format = (extra.format as string) ?? "PDF"
  const pages = (extra.pages as string) ?? ""
  const language = (extra.language as string) ?? "Espanol"

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-1">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              {headerIconMap[link.icon_name] ?? (
                <BookOpen className="h-5 w-5 text-primary" />
              )}
            </div>
            <div>
              <DialogTitle className="text-lg font-bold text-foreground">
                {modal.modal_title}
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                {modal.modal_subtitle}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-5">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground uppercase tracking-wider">
              NUEVO
            </span>
            <span className="text-xs text-muted-foreground">
              Descarga gratuita
            </span>
          </div>

          {/* Book cover */}
          <div className="relative mx-auto w-48 h-64 rounded-xl border border-border bg-gradient-to-br from-primary/10 to-primary/5 flex flex-col items-center justify-center overflow-hidden shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
            <BookOpen className="h-12 w-12 text-primary mb-3 relative z-10" />
            <p className="text-xs font-bold text-foreground text-center px-4 relative z-10 leading-tight">
              {modal.modal_title}
            </p>
            <p className="text-[10px] text-muted-foreground mt-1 relative z-10">
              MyLeap
            </p>
          </div>

          {modal.modal_body && (
            <p className="text-sm text-muted-foreground leading-relaxed">
              {modal.modal_body}
            </p>
          )}

          {/* Chapters */}
          {chapters.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-foreground">
                Que encontraras
              </h4>
              <div className="grid grid-cols-1 gap-2">
                {chapters.map((ch) => (
                  <div
                    key={ch}
                    className="flex items-start gap-2 rounded-lg bg-secondary/50 p-2.5 border border-border"
                  >
                    <Star className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
                    <span className="text-xs text-muted-foreground">{ch}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            {pages && (
              <div className="rounded-xl border border-border bg-secondary/50 p-3 text-center">
                <p className="text-lg font-bold text-foreground font-mono">
                  {pages.replace(/[^0-9]/g, "") || pages}
                </p>
                <p className="text-xs text-muted-foreground">Paginas</p>
              </div>
            )}
            <div className="rounded-xl border border-border bg-secondary/50 p-3 text-center">
              <p className="text-lg font-bold text-foreground font-mono">
                {chapters.length || 12}
              </p>
              <p className="text-xs text-muted-foreground">Capitulos</p>
            </div>
            <div className="rounded-xl border border-border bg-secondary/50 p-3 text-center">
              <p className="text-lg font-bold text-primary font-mono">
                {format}
              </p>
              <p className="text-xs text-muted-foreground">Formato</p>
            </div>
          </div>
        </div>

        <DialogFooter className="mt-2">
          <a
            href={modal.cta_button_url ?? "#descargar-ebook"}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.02] active:scale-95"
          >
            <Download className="h-4 w-4" />
            {modal.cta_button_text ?? "Descargar E-book Gratis"}
          </a>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

/* ========================================
   d) FACILITATORS MODAL (Consulta 1:1)
   ======================================== */
function FacilitatorsModal({
  link,
  modal,
  facilitators,
  open,
  onOpenChange,
}: ModalBaseProps & { facilitators: Facilitator[] }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-1">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              {headerIconMap[link.icon_name] ?? (
                <MessageCircle className="h-5 w-5 text-primary" />
              )}
            </div>
            <div>
              <DialogTitle className="text-lg font-bold text-foreground">
                {modal.modal_title}
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                {modal.modal_subtitle}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          {modal.modal_body && (
            <p className="text-sm text-muted-foreground leading-relaxed">
              {modal.modal_body}
            </p>
          )}
          <div className="space-y-3">
            {facilitators.map((f) => (
              <FacilitatorCard key={f.id} facilitator={f} />
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function FacilitatorCard({ facilitator }: { facilitator: Facilitator }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 transition-all duration-300 hover:border-primary/40 hover:shadow-md">
      <div className="flex items-start gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={facilitator.avatar_url ?? ""}
          alt={facilitator.name}
          className="h-12 w-12 shrink-0 rounded-full object-cover border-2 border-primary/20"
        />
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-foreground">
            {facilitator.name}
          </h4>
          <p className="text-xs text-muted-foreground">
            {facilitator.specialty}
          </p>
        </div>
      </div>

      {facilitator.bio && (
        <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
          {facilitator.bio}
        </p>
      )}

      <div className="mt-3 flex gap-2">
        {facilitator.whatsapp_url && (
          <a
            href={facilitator.whatsapp_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#25D366] px-4 py-2.5 text-xs font-semibold text-[#fff] transition-all duration-300 hover:shadow-lg hover:shadow-[#25D366]/30 hover:scale-[1.02] active:scale-95"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-3.5 w-3.5"
              fill="currentColor"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp
          </a>
        )}
        {facilitator.booking_url && (
          <a
            href={facilitator.booking_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-primary bg-primary/10 px-4 py-2.5 text-xs font-semibold text-primary transition-all duration-300 hover:bg-primary/20 hover:scale-[1.02] active:scale-95"
          >
            <Calendar className="h-3.5 w-3.5" />
            Agendar Sesion
          </a>
        )}
      </div>
    </div>
  )
}

/* ========================================
   GENERIC INFO MODAL (fallback)
   ======================================== */
function InfoModal({
  link,
  modal,
  open,
  onOpenChange,
}: ModalBaseProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-1">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              {headerIconMap[link.icon_name] ?? (
                <Heart className="h-5 w-5 text-primary" />
              )}
            </div>
            <div>
              <DialogTitle className="text-lg font-bold text-foreground">
                {modal.modal_title}
              </DialogTitle>
              {modal.modal_subtitle && (
                <DialogDescription className="text-sm text-muted-foreground">
                  {modal.modal_subtitle}
                </DialogDescription>
              )}
            </div>
          </div>
        </DialogHeader>
        {modal.modal_body && (
          <p className="text-sm text-muted-foreground leading-relaxed">
            {modal.modal_body}
          </p>
        )}
        {modal.cta_button_text && (
          <DialogFooter className="mt-2">
            <a
              href={modal.cta_button_url ?? "#"}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.02] active:scale-95"
            >
              {modal.cta_button_text}
            </a>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}
