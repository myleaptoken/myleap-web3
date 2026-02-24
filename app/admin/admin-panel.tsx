"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { logoutAdmin } from "@/lib/admin-auth"
import {
  updateProfile,
  upsertSocialLink,
  deleteSocialLink,
  upsertCtaLink,
  deleteCtaLink,
  upsertModalContent,
  deleteModalContent,
  upsertFacilitator,
  deleteFacilitator,
  upsertTestimonial,
  deleteTestimonial,
  updateCrowdfundingConfig,
} from "./actions"
import {
  User,
  Link2,
  Layers,
  FileText,
  Users,
  ClipboardList,
  LogOut,
  Save,
  Plus,
  Trash2,
  Pencil,
  X,
  ChevronDown,
  ChevronUp,
  Video,
  UserCheck,
  CheckCircle2,
  Rocket,
} from "lucide-react"

/* ─── Types ─── */
interface AdminData {
  profile: Record<string, unknown> | null
  socialLinks: Record<string, unknown>[]
  ctaLinks: Record<string, unknown>[]
  modalContents: Record<string, unknown>[]
  facilitators: Record<string, unknown>[]
  surveys: Record<string, unknown>[]
  testimonials: Record<string, unknown>[]
  preUsers: Record<string, unknown>[]
  crowdfundingConfig: Record<string, unknown> | null
}

const tabs = [
  { key: "profile", label: "Perfil", icon: User },
  { key: "socials", label: "Redes", icon: Link2 },
  { key: "cta", label: "Enlaces CTA", icon: Layers },
  { key: "modals", label: "Modales", icon: FileText },
  { key: "facilitators", label: "Terapeutas", icon: Users },
  { key: "testimonials", label: "Testimonios", icon: Video },
  { key: "surveys", label: "Encuestas", icon: ClipboardList },
  { key: "preusers", label: "Pre-Usuarios", icon: UserCheck },
  { key: "crowdfunding", label: "Crowdfunding", icon: Rocket },
]

/* ─── Main ─── */
export function AdminPanel({ data }: { data: AdminData }) {
  const [activeTab, setActiveTab] = useState("profile")

  async function handleLogout() {
    await logoutAdmin()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-border bg-card/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <h1 className="text-lg font-bold text-foreground">
            Admin <span className="text-primary">My Leap</span>
          </h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
          >
            <LogOut className="h-3.5 w-3.5" />
            Salir
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-6">
        {/* Tabs */}
        <div className="mb-6 flex gap-1 overflow-x-auto rounded-xl border border-border bg-secondary/50 p-1">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.key
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-card text-foreground shadow-sm border border-border"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            )
          })}
        </div>

        {/* Tab Content */}
        <div className="rounded-xl border border-border bg-card p-4 sm:p-6">
          {activeTab === "profile" && <ProfileTab profile={data.profile} />}
          {activeTab === "socials" && (
            <SocialsTab links={data.socialLinks} profileId={data.profile?.id as string} />
          )}
          {activeTab === "cta" && (
            <CTATab links={data.ctaLinks} profileId={data.profile?.id as string} />
          )}
          {activeTab === "modals" && (
            <ModalsTab modals={data.modalContents} ctaLinks={data.ctaLinks} />
          )}
          {activeTab === "facilitators" && (
            <FacilitatorsTab facilitators={data.facilitators} />
          )}
          {activeTab === "testimonials" && (
            <TestimonialsTab testimonials={data.testimonials} />
          )}
          {activeTab === "surveys" && <SurveysTab surveys={data.surveys} />}
          {activeTab === "preusers" && <PreUsersTab preUsers={data.preUsers} />}
          {activeTab === "crowdfunding" && <CrowdfundingTab config={data.crowdfundingConfig} />}
        </div>
      )}
    </div>
  )
}

/* ─── Crowdfunding Tab ─── */
function CrowdfundingTab({ config }: { config: Record<string, unknown> | null }) {
  const [data, setData] = useState<Record<string, unknown>>(config ?? {})
  const [isPending, startTransition] = useTransition()
  const [editSection, setEditSection] = useState<string | null>(null)
  const router = useRouter()

  if (!config) {
    return (
      <div className="text-center py-8 text-sm text-muted-foreground">
        No hay configuracion de crowdfunding. Crea un registro en la tabla crowdfunding_config.
      </div>
    )
  }

  function save() {
    startTransition(async () => {
      const id = data.id as string
      const payload = { ...data }
      delete payload.id
      delete payload.updated_at
      await updateCrowdfundingConfig(id, payload)
      setEditSection(null)
      router.refresh()
    })
  }

  function updateField(key: string, value: unknown) {
    setData((prev) => ({ ...prev, [key]: value }))
  }

  function updateJsonArray(key: string, index: number, field: string, value: string) {
    const arr = [...((data[key] as Record<string, unknown>[]) ?? [])]
    arr[index] = { ...arr[index], [field]: value }
    updateField(key, arr)
  }

  function addJsonItem(key: string, template: Record<string, unknown>) {
    const arr = [...((data[key] as Record<string, unknown>[]) ?? []), template]
    updateField(key, arr)
  }

  function removeJsonItem(key: string, index: number) {
    const arr = [...((data[key] as Record<string, unknown>[]) ?? [])]
    arr.splice(index, 1)
    updateField(key, arr)
  }

  const sections = [
    { key: "hero", label: "Hero / Portada" },
    { key: "whatis", label: "Que es Token LEAP" },
    { key: "tiers", label: "Niveles de Inversion" },
    { key: "howit", label: "Como Funciona" },
    { key: "faq", label: "Preguntas Frecuentes" },
    { key: "final", label: "CTA Final" },
  ]

  return (
    <div className="space-y-4">
      <SectionHeader title="Pagina de Crowdfunding" />
      <p className="text-xs text-muted-foreground">
        Edita cada seccion de la pagina <span className="font-mono text-primary">/token-leap</span>
      </p>

      <div className="space-y-2">
        {sections.map((sec) => {
          const isOpen = editSection === sec.key
          return (
            <div key={sec.key} className="rounded-xl border border-border overflow-hidden">
              <button
                onClick={() => setEditSection(isOpen ? null : sec.key)}
                className="flex w-full items-center justify-between p-4 hover:bg-secondary/50 transition-colors"
              >
                <span className="text-sm font-semibold text-foreground">{sec.label}</span>
                {isOpen ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
              </button>
              {isOpen && (
                <div className="border-t border-border p-4 space-y-3 bg-secondary/20">
                  {sec.key === "hero" && (
                    <>
                      <FieldInput label="Badge" value={(data.hero_badge as string) ?? ""} onChange={(v) => updateField("hero_badge", v)} />
                      <FieldInput label="Titulo" value={(data.hero_title as string) ?? ""} onChange={(v) => updateField("hero_title", v)} />
                      <CfTextArea label="Descripcion" value={(data.hero_description as string) ?? ""} onChange={(v) => updateField("hero_description", v)} />
                      <FieldInput label="Texto del CTA" value={(data.hero_cta_text as string) ?? ""} onChange={(v) => updateField("hero_cta_text", v)} />
                      <FieldInput label="URL del CTA" value={(data.hero_cta_url as string) ?? ""} onChange={(v) => updateField("hero_cta_url", v)} />
                      <label className="text-xs font-medium text-foreground">Stats</label>
                      {((data.hero_stats as { value: string; label: string }[]) ?? []).map((s, i) => (
                        <div key={i} className="flex gap-2 items-end">
                          <FieldInput label="Valor" value={s.value} onChange={(v) => updateJsonArray("hero_stats", i, "value", v)} />
                          <FieldInput label="Label" value={s.label} onChange={(v) => updateJsonArray("hero_stats", i, "label", v)} />
                          <button onClick={() => removeJsonItem("hero_stats", i)} className="p-1.5 text-muted-foreground hover:text-destructive-foreground"><Trash2 className="h-3.5 w-3.5" /></button>
                        </div>
                      ))}
                      <button onClick={() => addJsonItem("hero_stats", { value: "0", label: "Nuevo" })} className="text-xs text-primary hover:underline flex items-center gap-1"><Plus className="h-3 w-3" /> Agregar stat</button>
                    </>
                  )}

                  {sec.key === "whatis" && (
                    <>
                      <FieldInput label="Titulo de seccion" value={(data.what_is_title as string) ?? ""} onChange={(v) => updateField("what_is_title", v)} />
                      <label className="text-xs font-medium text-foreground">Puntos</label>
                      {((data.what_is_points as { icon: string; title: string; desc: string }[]) ?? []).map((p, i) => (
                        <div key={i} className="rounded-lg border border-border p-3 space-y-2">
                          <div className="flex gap-2">
                            <FieldInput label="Icono" value={p.icon} onChange={(v) => updateJsonArray("what_is_points", i, "icon", v)} placeholder="Zap, Users, Gift..." />
                            <FieldInput label="Titulo" value={p.title} onChange={(v) => updateJsonArray("what_is_points", i, "title", v)} />
                            <button onClick={() => removeJsonItem("what_is_points", i)} className="p-1.5 text-muted-foreground hover:text-destructive-foreground self-end"><Trash2 className="h-3.5 w-3.5" /></button>
                          </div>
                          <CfTextArea label="Descripcion" value={p.desc} onChange={(v) => updateJsonArray("what_is_points", i, "desc", v)} />
                        </div>
                      ))}
                      <button onClick={() => addJsonItem("what_is_points", { icon: "Zap", title: "Nuevo", desc: "" })} className="text-xs text-primary hover:underline flex items-center gap-1"><Plus className="h-3 w-3" /> Agregar punto</button>
                    </>
                  )}

                  {sec.key === "tiers" && (
                    <>
                      <CfTextArea label="Subtitulo de tiers" value={(data.tiers_subtitle as string) ?? ""} onChange={(v) => updateField("tiers_subtitle", v)} />
                      <label className="text-xs font-medium text-foreground">Niveles</label>
                      {((data.tiers as { name: string; price: string; tokens: string; icon: string; popular: boolean; benefits: string[] }[]) ?? []).map((t, i) => (
                        <div key={i} className="rounded-lg border border-border p-3 space-y-2">
                          <div className="flex gap-2 items-end">
                            <FieldInput label="Nombre" value={t.name} onChange={(v) => updateJsonArray("tiers", i, "name", v)} />
                            <FieldInput label="Precio" value={t.price} onChange={(v) => updateJsonArray("tiers", i, "price", v)} />
                            <FieldInput label="Tokens" value={t.tokens} onChange={(v) => updateJsonArray("tiers", i, "tokens", v)} />
                            <button onClick={() => removeJsonItem("tiers", i)} className="p-1.5 text-muted-foreground hover:text-destructive-foreground"><Trash2 className="h-3.5 w-3.5" /></button>
                          </div>
                          <div className="flex gap-2 items-end">
                            <FieldInput label="Icono" value={t.icon} onChange={(v) => updateJsonArray("tiers", i, "icon", v)} placeholder="Zap, Star, Crown..." />
                            <ToggleField label="Popular" checked={t.popular} onChange={(v) => {
                              const arr = [...((data.tiers as Record<string, unknown>[]) ?? [])]
                              arr[i] = { ...arr[i], popular: v }
                              updateField("tiers", arr)
                            }} />
                          </div>
                          <label className="text-[10px] font-medium text-muted-foreground">Beneficios (uno por linea)</label>
                          <textarea
                            value={(t.benefits ?? []).join("\n")}
                            onChange={(e) => {
                              const arr = [...((data.tiers as Record<string, unknown>[]) ?? [])]
                              arr[i] = { ...arr[i], benefits: e.target.value.split("\n") }
                              updateField("tiers", arr)
                            }}
                            rows={4}
                            className="w-full rounded-lg border border-border bg-secondary/30 px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-y"
                          />
                        </div>
                      ))}
                      <button onClick={() => addJsonItem("tiers", { name: "Nuevo Tier", price: "$0 USD", tokens: "0 LEAP", icon: "Zap", popular: false, benefits: [] })} className="text-xs text-primary hover:underline flex items-center gap-1"><Plus className="h-3 w-3" /> Agregar tier</button>
                    </>
                  )}

                  {sec.key === "howit" && (
                    <>
                      <label className="text-xs font-medium text-foreground">Pasos</label>
                      {((data.how_it_works as { num: string; title: string; desc: string }[]) ?? []).map((s, i) => (
                        <div key={i} className="flex gap-2 items-end">
                          <FieldInput label="Num" value={s.num} onChange={(v) => updateJsonArray("how_it_works", i, "num", v)} />
                          <FieldInput label="Titulo" value={s.title} onChange={(v) => updateJsonArray("how_it_works", i, "title", v)} />
                          <FieldInput label="Desc" value={s.desc} onChange={(v) => updateJsonArray("how_it_works", i, "desc", v)} />
                          <button onClick={() => removeJsonItem("how_it_works", i)} className="p-1.5 text-muted-foreground hover:text-destructive-foreground"><Trash2 className="h-3.5 w-3.5" /></button>
                        </div>
                      ))}
                      <button onClick={() => addJsonItem("how_it_works", { num: String(((data.how_it_works as unknown[]) ?? []).length + 1), title: "", desc: "" })} className="text-xs text-primary hover:underline flex items-center gap-1"><Plus className="h-3 w-3" /> Agregar paso</button>
                    </>
                  )}

                  {sec.key === "faq" && (
                    <>
                      <label className="text-xs font-medium text-foreground">Preguntas y Respuestas</label>
                      {((data.faq_items as { q: string; a: string }[]) ?? []).map((f, i) => (
                        <div key={i} className="rounded-lg border border-border p-3 space-y-2">
                          <div className="flex gap-2 items-end">
                            <div className="flex-1"><FieldInput label="Pregunta" value={f.q} onChange={(v) => updateJsonArray("faq_items", i, "q", v)} /></div>
                            <button onClick={() => removeJsonItem("faq_items", i)} className="p-1.5 text-muted-foreground hover:text-destructive-foreground"><Trash2 className="h-3.5 w-3.5" /></button>
                          </div>
                          <CfTextArea label="Respuesta" value={f.a} onChange={(v) => updateJsonArray("faq_items", i, "a", v)} />
                        </div>
                      ))}
                      <button onClick={() => addJsonItem("faq_items", { q: "", a: "" })} className="text-xs text-primary hover:underline flex items-center gap-1"><Plus className="h-3 w-3" /> Agregar pregunta</button>
                    </>
                  )}

                  {sec.key === "final" && (
                    <>
                      <FieldInput label="Titulo" value={(data.final_cta_title as string) ?? ""} onChange={(v) => updateField("final_cta_title", v)} />
                      <CfTextArea label="Descripcion" value={(data.final_cta_description as string) ?? ""} onChange={(v) => updateField("final_cta_description", v)} />
                      <FieldInput label="Texto boton primario" value={(data.final_cta_primary_text as string) ?? ""} onChange={(v) => updateField("final_cta_primary_text", v)} />
                      <FieldInput label="URL boton primario" value={(data.final_cta_primary_url as string) ?? ""} onChange={(v) => updateField("final_cta_primary_url", v)} />
                      <FieldInput label="Texto boton secundario" value={(data.final_cta_secondary_text as string) ?? ""} onChange={(v) => updateField("final_cta_secondary_text", v)} />
                      <FieldInput label="URL boton secundario" value={(data.final_cta_secondary_url as string) ?? ""} onChange={(v) => updateField("final_cta_secondary_url", v)} />
                    </>
                  )}

                  <ActionButton onClick={save} loading={isPending} label="Guardar Cambios" icon={Save} />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ─── Crowdfunding TextArea Helper ─── */
function CfTextArea({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-medium text-foreground">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className="w-full rounded-lg border border-border bg-secondary/30 px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-y"
      />
    </div>
  )
}


/* ─── Shared Components ─── */
function FieldInput({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  textarea,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  type?: string
  placeholder?: string
  textarea?: boolean
}) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-semibold text-foreground">{label}</label>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
          className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors resize-none"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
        />
      )}
    </div>
  )
}

function ToggleField({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-5 w-9 shrink-0 rounded-full transition-colors ${
          checked ? "bg-primary" : "bg-border"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 rounded-full bg-card shadow-sm transition-transform mt-0.5 ${
            checked ? "translate-x-4.5 ml-0" : "translate-x-0.5"
          }`}
        />
      </button>
      <span className="text-xs text-foreground">{label}</span>
    </label>
  )
}

function ActionButton({
  onClick,
  loading,
  label,
  icon: Icon,
  variant = "primary",
}: {
  onClick: () => void
  loading: boolean
  label: string
  icon: React.ElementType
  variant?: "primary" | "danger" | "secondary"
}) {
  const styles = {
    primary:
      "bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/30",
    danger:
      "bg-destructive/10 text-destructive-foreground hover:bg-destructive/20",
    secondary:
      "border border-border text-foreground hover:bg-secondary",
  }
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 ${styles[variant]}`}
    >
      <Icon className="h-3.5 w-3.5" />
      {loading ? "Guardando..." : label}
    </button>
  )
}

function SectionHeader({
  title,
  onAdd,
}: {
  title: string
  onAdd?: () => void
}) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-base font-bold text-foreground">{title}</h2>
      {onAdd && (
        <button
          onClick={onAdd}
          className="flex items-center gap-1.5 rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/20 transition-colors"
        >
          <Plus className="h-3.5 w-3.5" />
          Agregar
        </button>
      )}
    </div>
  )
}

/* ─── Profile Tab ─── */
function ProfileTab({
  profile,
}: {
  profile: Record<string, unknown> | null
}) {
  const [form, setForm] = useState({
    name: (profile?.name as string) ?? "",
    subtitle: (profile?.subtitle as string) ?? "",
    bio: (profile?.bio as string) ?? "",
    avatar_url: (profile?.avatar_url as string) ?? "",
    banner_url: (profile?.banner_url as string) ?? "",
    stat_leapers: (profile?.stat_leapers as string) ?? "",
    stat_cursos: (profile?.stat_cursos as string) ?? "",
    stat_estudiantes: (profile?.stat_estudiantes as string) ?? "",
  })
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  function save() {
    startTransition(async () => {
      await updateProfile(profile?.id as string, form)
      router.refresh()
    })
  }

  return (
    <div className="space-y-4">
      <SectionHeader title="Informacion del Perfil" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FieldInput label="Nombre" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
        <FieldInput label="Subtitulo" value={form.subtitle} onChange={(v) => setForm({ ...form, subtitle: v })} />
        <FieldInput label="Avatar URL" value={form.avatar_url} onChange={(v) => setForm({ ...form, avatar_url: v })} />
        <FieldInput label="Banner URL" value={form.banner_url} onChange={(v) => setForm({ ...form, banner_url: v })} />
        <FieldInput label="Stat Leapers" value={form.stat_leapers} onChange={(v) => setForm({ ...form, stat_leapers: v })} />
        <FieldInput label="Stat Cursos" value={form.stat_cursos} onChange={(v) => setForm({ ...form, stat_cursos: v })} />
        <FieldInput label="Stat Estudiantes" value={form.stat_estudiantes} onChange={(v) => setForm({ ...form, stat_estudiantes: v })} />
      </div>
      <FieldInput label="Bio" value={form.bio} onChange={(v) => setForm({ ...form, bio: v })} textarea />
      <ActionButton onClick={save} loading={isPending} label="Guardar Perfil" icon={Save} />
    </div>
  )
}

/* ─── Socials Tab ─── */
function SocialsTab({
  links,
  profileId,
}: {
  links: Record<string, unknown>[]
  profileId: string
}) {
  const [items, setItems] = useState(links)
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  function openNew() {
    setEditing({ platform: "", url: "", display_order: items.length, is_active: true, profile_id: profileId })
  }

  function save() {
    if (!editing) return
    startTransition(async () => {
      await upsertSocialLink({ ...editing, profile_id: profileId })
      setEditing(null)
      router.refresh()
    })
  }

  function remove(id: string) {
    startTransition(async () => {
      await deleteSocialLink(id)
      setItems(items.filter((i) => i.id !== id))
      router.refresh()
    })
  }

  return (
    <div className="space-y-4">
      <SectionHeader title="Redes Sociales" onAdd={openNew} />

      {/* List */}
      <div className="space-y-2">
        {items.map((link) => (
          <div
            key={link.id as string}
            className="flex items-center gap-3 rounded-lg border border-border p-3"
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground capitalize">
                {link.platform as string}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {link.url as string}
              </p>
            </div>
            <span className={`text-xs px-2 py-0.5 rounded-full ${link.is_active ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
              {link.is_active ? "Activo" : "Inactivo"}
            </span>
            <button
              onClick={() => setEditing({ ...link })}
              className="p-1.5 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
            >
              <Pencil className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => remove(link.id as string)}
              className="p-1.5 rounded-lg hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive-foreground"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Edit Form */}
      {editing && (
        <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">
              {editing.id ? "Editar Red Social" : "Nueva Red Social"}
            </h3>
            <button onClick={() => setEditing(null)} className="text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <FieldInput
              label="Plataforma"
              value={(editing.platform as string) ?? ""}
              onChange={(v) => setEditing({ ...editing, platform: v })}
              placeholder="instagram, tiktok, youtube..."
            />
            <FieldInput
              label="URL"
              value={(editing.url as string) ?? ""}
              onChange={(v) => setEditing({ ...editing, url: v })}
              placeholder="https://..."
            />
            <FieldInput
              label="Orden"
              value={String(editing.display_order ?? 0)}
              onChange={(v) => setEditing({ ...editing, display_order: parseInt(v) || 0 })}
              type="number"
            />
            <ToggleField
              label="Activo"
              checked={(editing.is_active as boolean) ?? true}
              onChange={(v) => setEditing({ ...editing, is_active: v })}
            />
          </div>
          <ActionButton onClick={save} loading={isPending} label="Guardar" icon={Save} />
        </div>
      )}
    </div>
  )
}

/* ─── CTA Links Tab ─── */
function CTATab({
  links,
  profileId,
}: {
  links: Record<string, unknown>[]
  profileId: string
}) {
  const [items] = useState(links)
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  function openNew() {
    setEditing({
      title: "",
      description: "",
      icon_name: "Heart",
      variant: "primary",
      badge: "",
      modal_key: "",
      display_order: items.length,
      is_active: true,
      is_featured: false,
      featured_image: "",
      featured_tag: "",
      featured_stat_1_label: "",
      featured_stat_2_label: "",
      profile_id: profileId,
    })
  }

  function save() {
    if (!editing) return
    startTransition(async () => {
      const data = { ...editing, profile_id: profileId }
      // Clean empty strings to null
      for (const k of ["badge", "featured_image", "featured_tag", "featured_stat_1_label", "featured_stat_2_label"]) {
        if (data[k] === "") data[k] = null
      }
      await upsertCtaLink(data)
      setEditing(null)
      router.refresh()
    })
  }

  function remove(id: string) {
    startTransition(async () => {
      await deleteCtaLink(id)
      router.refresh()
    })
  }

  return (
    <div className="space-y-4">
      <SectionHeader title="Enlaces CTA" onAdd={openNew} />

      <div className="space-y-2">
        {items.map((link) => (
          <div
            key={link.id as string}
            className="flex items-center gap-3 rounded-lg border border-border p-3"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-foreground">
                  {link.title as string}
                </p>
                {link.badge && (
                  <span className="text-[10px] font-bold bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">
                    {link.badge as string}
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {link.modal_key as string} | {link.variant as string}
              </p>
            </div>
            <div className="flex items-center gap-1">
              {link.is_featured && (
                <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full font-medium">
                  Destacado
                </span>
              )}
              <span className={`text-xs px-2 py-0.5 rounded-full ${link.is_active ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                {link.is_active ? "Activo" : "Inactivo"}
              </span>
            </div>
            <button
              onClick={() => setEditing({ ...link })}
              className="p-1.5 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
            >
              <Pencil className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => remove(link.id as string)}
              className="p-1.5 rounded-lg hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive-foreground"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>

      {editing && (
        <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">
              {editing.id ? "Editar Enlace CTA" : "Nuevo Enlace CTA"}
            </h3>
            <button onClick={() => setEditing(null)} className="text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <FieldInput label="Titulo" value={(editing.title as string) ?? ""} onChange={(v) => setEditing({ ...editing, title: v })} />
            <FieldInput label="Descripcion" value={(editing.description as string) ?? ""} onChange={(v) => setEditing({ ...editing, description: v })} />
            <FieldInput label="Icono (Lucide)" value={(editing.icon_name as string) ?? ""} onChange={(v) => setEditing({ ...editing, icon_name: v })} placeholder="Heart, Sparkles, BookOpen..." />
            <FieldInput label="Variante" value={(editing.variant as string) ?? ""} onChange={(v) => setEditing({ ...editing, variant: v })} placeholder="primary, accent, secondary" />
            <FieldInput label="Badge" value={(editing.badge as string) ?? ""} onChange={(v) => setEditing({ ...editing, badge: v })} placeholder="EN VIVO, NUEVO, GRATIS" />
            <FieldInput label="Modal Key" value={(editing.modal_key as string) ?? ""} onChange={(v) => setEditing({ ...editing, modal_key: v })} placeholder="sanacion, metodo, ebook..." />
            <FieldInput label="Orden" value={String(editing.display_order ?? 0)} onChange={(v) => setEditing({ ...editing, display_order: parseInt(v) || 0 })} type="number" />
          </div>
          <div className="flex flex-wrap gap-4">
            <ToggleField label="Activo" checked={(editing.is_active as boolean) ?? true} onChange={(v) => setEditing({ ...editing, is_active: v })} />
            <ToggleField label="Destacado" checked={(editing.is_featured as boolean) ?? false} onChange={(v) => setEditing({ ...editing, is_featured: v })} />
          </div>
          {editing.is_featured && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-border">
              <FieldInput label="Imagen destacada URL" value={(editing.featured_image as string) ?? ""} onChange={(v) => setEditing({ ...editing, featured_image: v })} />
              <FieldInput label="Tag destacado" value={(editing.featured_tag as string) ?? ""} onChange={(v) => setEditing({ ...editing, featured_tag: v })} placeholder="Curso, En Vivo..." />
              <FieldInput label="Stat 1" value={(editing.featured_stat_1_label as string) ?? ""} onChange={(v) => setEditing({ ...editing, featured_stat_1_label: v })} />
              <FieldInput label="Stat 2" value={(editing.featured_stat_2_label as string) ?? ""} onChange={(v) => setEditing({ ...editing, featured_stat_2_label: v })} />
            </div>
          )}
          <ActionButton onClick={save} loading={isPending} label="Guardar" icon={Save} />
        </div>
      )}
    </div>
  )
}

/* ─── Modals Tab ─── */
function ModalsTab({
  modals,
  ctaLinks,
}: {
  modals: Record<string, unknown>[]
  ctaLinks: Record<string, unknown>[]
}) {
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null)
  const [jsonStr, setJsonStr] = useState("")
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  function openEdit(modal: Record<string, unknown>) {
    setEditing({ ...modal })
    setJsonStr(JSON.stringify(modal.extra_data ?? {}, null, 2))
  }

  function openNew() {
    setEditing({
      cta_link_id: "",
      modal_title: "",
      modal_subtitle: "",
      modal_body: "",
      modal_type: "info",
      extra_data: {},
      cta_button_text: "",
      cta_button_url: "",
    })
    setJsonStr("{}")
  }

  function save() {
    if (!editing) return
    let parsedExtra = {}
    try {
      parsedExtra = JSON.parse(jsonStr)
    } catch {
      alert("JSON invalido en extra_data")
      return
    }
    startTransition(async () => {
      const data = { ...editing, extra_data: parsedExtra }
      for (const k of ["cta_button_text", "cta_button_url", "modal_subtitle", "modal_body"]) {
        if (data[k] === "") data[k] = null
      }
      await upsertModalContent(data)
      setEditing(null)
      router.refresh()
    })
  }

  function remove(id: string) {
    startTransition(async () => {
      await deleteModalContent(id)
      router.refresh()
    })
  }

  function getCtaTitle(ctaLinkId: string) {
    const cta = ctaLinks.find((c) => c.id === ctaLinkId)
    return (cta?.title as string) ?? ctaLinkId
  }

  return (
    <div className="space-y-4">
      <SectionHeader title="Contenido de Modales" onAdd={openNew} />

      <div className="space-y-2">
        {modals.map((modal) => (
          <div
            key={modal.id as string}
            className="flex items-center gap-3 rounded-lg border border-border p-3"
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">
                {modal.modal_title as string}
              </p>
              <p className="text-xs text-muted-foreground">
                Tipo: {modal.modal_type as string} | CTA: {getCtaTitle(modal.cta_link_id as string)}
              </p>
            </div>
            <button
              onClick={() => openEdit(modal)}
              className="p-1.5 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
            >
              <Pencil className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => remove(modal.id as string)}
              className="p-1.5 rounded-lg hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive-foreground"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>

      {editing && (
        <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">
              {editing.id ? "Editar Modal" : "Nuevo Modal"}
            </h3>
            <button onClick={() => setEditing(null)} className="text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-foreground">CTA Link asociado</label>
              <select
                value={(editing.cta_link_id as string) ?? ""}
                onChange={(e) => setEditing({ ...editing, cta_link_id: e.target.value })}
                className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              >
                <option value="">Seleccionar...</option>
                {ctaLinks.map((cta) => (
                  <option key={cta.id as string} value={cta.id as string}>
                    {cta.title as string}
                  </option>
                ))}
              </select>
            </div>
            <FieldInput label="Tipo de Modal" value={(editing.modal_type as string) ?? ""} onChange={(v) => setEditing({ ...editing, modal_type: v })} placeholder="info, zoom, video, ebook, survey, facilitators" />
            <FieldInput label="Titulo" value={(editing.modal_title as string) ?? ""} onChange={(v) => setEditing({ ...editing, modal_title: v })} />
            <FieldInput label="Subtitulo" value={(editing.modal_subtitle as string) ?? ""} onChange={(v) => setEditing({ ...editing, modal_subtitle: v })} />
            <FieldInput label="Texto boton CTA" value={(editing.cta_button_text as string) ?? ""} onChange={(v) => setEditing({ ...editing, cta_button_text: v })} />
            <FieldInput label="URL boton CTA" value={(editing.cta_button_url as string) ?? ""} onChange={(v) => setEditing({ ...editing, cta_button_url: v })} />
          </div>
          <FieldInput label="Cuerpo del Modal" value={(editing.modal_body as string) ?? ""} onChange={(v) => setEditing({ ...editing, modal_body: v })} textarea />
          <div className="space-y-1">
            <label className="text-xs font-semibold text-foreground">Extra Data (JSON)</label>
            <textarea
              value={jsonStr}
              onChange={(e) => setJsonStr(e.target.value)}
              rows={8}
              className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-xs text-foreground font-mono placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors resize-none"
            />
          </div>
          <ActionButton onClick={save} loading={isPending} label="Guardar" icon={Save} />
        </div>
      )}
    </div>
  )
}

/* ─── Facilitators Tab ─── */
function FacilitatorsTab({
  facilitators,
}: {
  facilitators: Record<string, unknown>[]
}) {
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  function openNew() {
    setEditing({
      name: "",
      specialty: "",
      avatar_url: "",
      whatsapp_url: "",
      booking_url: "",
      bio: "",
      display_order: facilitators.length,
      is_active: true,
    })
  }

  function save() {
    if (!editing) return
    startTransition(async () => {
      const data = { ...editing }
      for (const k of ["specialty", "avatar_url", "whatsapp_url", "booking_url", "bio"]) {
        if (data[k] === "") data[k] = null
      }
      await upsertFacilitator(data)
      setEditing(null)
      router.refresh()
    })
  }

  function remove(id: string) {
    startTransition(async () => {
      await deleteFacilitator(id)
      router.refresh()
    })
  }

  return (
    <div className="space-y-4">
      <SectionHeader title="Facilitadores / Terapeutas" onAdd={openNew} />

      <div className="space-y-2">
        {facilitators.map((f) => (
          <div
            key={f.id as string}
            className="flex items-center gap-3 rounded-lg border border-border p-3"
          >
            {f.avatar_url && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={f.avatar_url as string}
                alt={f.name as string}
                className="h-10 w-10 rounded-full object-cover border border-border shrink-0"
              />
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">
                {f.name as string}
              </p>
              <p className="text-xs text-muted-foreground">
                {f.specialty as string}
              </p>
            </div>
            <span className={`text-xs px-2 py-0.5 rounded-full ${f.is_active ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
              {f.is_active ? "Activo" : "Inactivo"}
            </span>
            <button
              onClick={() => setEditing({ ...f })}
              className="p-1.5 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
            >
              <Pencil className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => remove(f.id as string)}
              className="p-1.5 rounded-lg hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive-foreground"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>

      {editing && (
        <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">
              {editing.id ? "Editar Facilitador" : "Nuevo Facilitador"}
            </h3>
            <button onClick={() => setEditing(null)} className="text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <FieldInput label="Nombre" value={(editing.name as string) ?? ""} onChange={(v) => setEditing({ ...editing, name: v })} />
            <FieldInput label="Especialidad" value={(editing.specialty as string) ?? ""} onChange={(v) => setEditing({ ...editing, specialty: v })} />
            <FieldInput label="Avatar URL" value={(editing.avatar_url as string) ?? ""} onChange={(v) => setEditing({ ...editing, avatar_url: v })} />
            <FieldInput label="WhatsApp URL" value={(editing.whatsapp_url as string) ?? ""} onChange={(v) => setEditing({ ...editing, whatsapp_url: v })} />
            <FieldInput label="Booking URL" value={(editing.booking_url as string) ?? ""} onChange={(v) => setEditing({ ...editing, booking_url: v })} />
            <FieldInput label="Orden" value={String(editing.display_order ?? 0)} onChange={(v) => setEditing({ ...editing, display_order: parseInt(v) || 0 })} type="number" />
          </div>
          <FieldInput label="Bio" value={(editing.bio as string) ?? ""} onChange={(v) => setEditing({ ...editing, bio: v })} textarea />
          <ToggleField label="Activo" checked={(editing.is_active as boolean) ?? true} onChange={(v) => setEditing({ ...editing, is_active: v })} />
          <ActionButton onClick={save} loading={isPending} label="Guardar" icon={Save} />
        </div>
      )}
    </div>
  )
}

/* ─── Testimonials Tab ─── */
function TestimonialsTab({
  testimonials,
}: {
  testimonials: Record<string, unknown>[]
}) {
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null)
  const [isPending, startTransition] = useTransition()
  const [uploadingThumb, setUploadingThumb] = useState(false)
  const [videoUrlInput, setVideoUrlInput] = useState("")
  const router = useRouter()

  function openNew() {
    setVideoUrlInput("")
    setEditing({
      name: "",
      subtitle: "",
      thumbnail_url: "",
      video_url: "",
      display_order: testimonials.length,
      is_active: true,
    })
  }

  function applyVideoUrl() {
    const val = videoUrlInput.trim()
    if (!val) return
    setEditing((prev) => prev ? { ...prev, video_url: val } : prev)
  }

  async function uploadThumbnail(file: File) {
    setUploadingThumb(true)
    try {
      const fd = new FormData()
      fd.append("file", file)
      fd.append("bucket", "testimonials")
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd })
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: `Error ${res.status}` }))
        throw new Error(err.error || "Error al subir")
      }
      const { url } = await res.json()
      setEditing((prev) => prev ? { ...prev, thumbnail_url: url } : prev)
    } catch (err) {
      alert("Error: " + (err instanceof Error ? err.message : "desconocido"))
    } finally {
      setUploadingThumb(false)
    }
  }

  function save() {
    if (!editing) return
    if (!editing.video_url) {
      alert("Debes agregar una URL de video antes de guardar.")
      return
    }
    if (!editing.name) {
      alert("Debes agregar un nombre.")
      return
    }
    startTransition(async () => {
      const data = { ...editing }
      // If no custom thumbnail, try to get YouTube thumbnail
      if (!data.thumbnail_url || data.thumbnail_url === "") {
        const ytMatch = (data.video_url as string).match(
          /(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
        )
        if (ytMatch) {
          data.thumbnail_url = `https://img.youtube.com/vi/${ytMatch[1]}/hqdefault.jpg`
        }
      }
      for (const k of ["subtitle"]) {
        if (data[k] === "") data[k] = null
      }
      if (data.thumbnail_url === "") data.thumbnail_url = null
      await upsertTestimonial(data)
      setEditing(null)
      setVideoUrlInput("")
      router.refresh()
    })
  }

  function remove(id: string) {
    startTransition(async () => {
      await deleteTestimonial(id)
      router.refresh()
    })
  }

  return (
    <div className="space-y-4">
      <SectionHeader title="Video Testimonios" onAdd={openNew} />

      <div className="space-y-2">
        {testimonials.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-8">
            No hay testimonios. Agrega uno con el boton +
          </p>
        )}
        {testimonials.map((t) => {
          const ytThumb = !t.thumbnail_url && t.video_url
            ? (t.video_url as string).match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
            : null
          const thumbSrc = (t.thumbnail_url as string) || (ytThumb ? `https://img.youtube.com/vi/${ytThumb[1]}/hqdefault.jpg` : "")
          return (
          <div
            key={t.id as string}
            className="flex items-center gap-3 rounded-lg border border-border p-3"
          >
            {thumbSrc ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={thumbSrc}
                alt={t.name as string}
                className="h-12 w-16 rounded-lg object-cover border border-border shrink-0"
              />
            ) : (
              <div className="h-12 w-16 rounded-lg bg-secondary flex items-center justify-center shrink-0 border border-border">
                <Video className="h-4 w-4 text-muted-foreground" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{t.name as string}</p>
              <p className="text-[10px] text-muted-foreground/60 truncate mt-0.5">
                {(t.video_url as string) || "Sin video"}
              </p>
            </div>
            <span className={`text-xs px-2 py-0.5 rounded-full ${t.is_active ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
              {t.is_active ? "Activo" : "Inactivo"}
            </span>
            <button onClick={() => { setEditing({ ...t }); setVideoUrlInput("") }} className="p-1.5 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
              <Pencil className="h-3.5 w-3.5" />
            </button>
            <button onClick={() => remove(t.id as string)} className="p-1.5 rounded-lg hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive-foreground">
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        )})}
      </div>

      {editing && (
        <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">
              {editing.id ? "Editar Testimonio" : "Nuevo Testimonio"}
            </h3>
            <button onClick={() => { setEditing(null); setVideoUrlInput("") }} className="text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <FieldInput label="Nombre" value={(editing.name as string) ?? ""} onChange={(v) => setEditing({ ...editing, name: v })} />
            <FieldInput label="Subtitulo" value={(editing.subtitle as string) ?? ""} onChange={(v) => setEditing({ ...editing, subtitle: v })} placeholder="Ej: Paciente, Estudiante..." />
            <FieldInput label="Orden" value={String(editing.display_order ?? 0)} onChange={(v) => setEditing({ ...editing, display_order: parseInt(v) || 0 })} type="number" />
          </div>

          {/* Video URL */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground">URL del Video</label>
            {editing.video_url ? (
              <div className="flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/5 p-2.5">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                <p className="text-[10px] text-muted-foreground truncate flex-1">{editing.video_url as string}</p>
                <button
                  onClick={() => { setEditing({ ...editing, video_url: "" }); setVideoUrlInput("") }}
                  className="text-xs text-destructive-foreground hover:underline shrink-0"
                >
                  Cambiar
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={videoUrlInput}
                  onChange={(e) => setVideoUrlInput(e.target.value)}
                  placeholder="https://youtube.com/watch?v=... o URL directa"
                  className="flex-1 rounded-lg border border-border bg-secondary/30 px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary"
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); applyVideoUrl() } }}
                />
                <button
                  type="button"
                  onClick={applyVideoUrl}
                  disabled={!videoUrlInput.trim()}
                  className="rounded-lg bg-primary px-3 py-2 text-xs font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-40 transition-colors"
                >
                  Agregar
                </button>
              </div>
            )}
          </div>

          {/* Thumbnail */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground">Miniatura <span className="font-normal text-muted-foreground">(opcional - se usa la de YouTube si no subes una)</span></label>
            {editing.thumbnail_url ? (
              <div className="flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/5 p-2.5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={editing.thumbnail_url as string} alt="Miniatura" className="h-8 w-12 rounded object-cover border border-border" />
                <p className="text-[10px] text-muted-foreground truncate flex-1">{(editing.thumbnail_url as string).split("/").pop()}</p>
                <button onClick={() => setEditing({ ...editing, thumbnail_url: "" })} className="text-xs text-destructive-foreground hover:underline shrink-0">Quitar</button>
              </div>
            ) : (
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadThumbnail(f) }}
                  className="absolute inset-0 opacity-0 cursor-pointer z-10"
                  disabled={uploadingThumb}
                />
                <div className={`flex items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border p-3 text-xs text-muted-foreground hover:border-primary/50 hover:text-foreground transition-colors ${uploadingThumb ? "animate-pulse" : ""}`}>
                  {uploadingThumb ? "Subiendo imagen..." : "Haz clic o arrastra una imagen"}
                </div>
              </div>
            )}
          </div>

          <ToggleField label="Activo" checked={(editing.is_active as boolean) ?? true} onChange={(v) => setEditing({ ...editing, is_active: v })} />
          <ActionButton onClick={save} loading={isPending || uploadingThumb} label="Guardar y Publicar" icon={Save} />
        </div>
      )}
    </div>
  )
}

/* ─── Surveys Tab ─── */
function SurveysTab({ surveys }: { surveys: Record<string, unknown>[] }) {
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <div className="space-y-4">
      <SectionHeader title="Respuestas de Encuestas" />
      {surveys.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-8">
          Aun no hay respuestas de encuestas.
        </p>
      )}
      <div className="space-y-2">
        {surveys.map((s) => {
          const isOpen = expanded === (s.id as string)
          return (
            <div
              key={s.id as string}
              className="rounded-lg border border-border overflow-hidden"
            >
              <button
                onClick={() => setExpanded(isOpen ? null : (s.id as string))}
                className="flex w-full items-center gap-3 p-3 text-left hover:bg-secondary/50 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">
                    {s.respondent_name as string}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {s.respondent_email as string}
                    {s.respondent_phone ? ` | ${s.respondent_phone as string}` : ""}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground shrink-0">
                  {new Date(s.created_at as string).toLocaleDateString("es-AR")}
                </span>
                {isOpen ? (
                  <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
                )}
              </button>
              {isOpen && (
                <div className="border-t border-border p-3 bg-secondary/30 space-y-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <p className="text-[10px] font-semibold text-muted-foreground uppercase">Dolor / Malestar</p>
                      <p className="text-xs text-foreground">{(s.dolor as string) || "-"}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold text-muted-foreground uppercase">Experiencia previa</p>
                      <p className="text-xs text-foreground">{(s.experiencia as string) || "-"}</p>
                    </div>
                    <div className="sm:col-span-2">
                      <p className="text-[10px] font-semibold text-muted-foreground uppercase">Expectativa</p>
                      <p className="text-xs text-foreground">{(s.expectativa as string) || "-"}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ─── Pre-Users Tab ─── */
function PreUsersTab({ preUsers }: { preUsers: Record<string, unknown>[] }) {
  return (
    <div className="space-y-4">
      <SectionHeader title="Pre-Usuarios Registrados" />
      <p className="text-xs text-muted-foreground">
        Usuarios que completaron la encuesta de registro. Total: <span className="font-semibold text-foreground">{preUsers.length}</span>
      </p>

      {preUsers.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-8">
          Aun no hay pre-usuarios registrados.
        </p>
      )}

      {/* Table */}
      {preUsers.length > 0 && (
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="px-3 py-2 text-[10px] font-semibold text-muted-foreground uppercase">Nombre</th>
                <th className="px-3 py-2 text-[10px] font-semibold text-muted-foreground uppercase">Email</th>
                <th className="px-3 py-2 text-[10px] font-semibold text-muted-foreground uppercase">Celular</th>
                <th className="px-3 py-2 text-[10px] font-semibold text-muted-foreground uppercase">Dolor</th>
                <th className="px-3 py-2 text-[10px] font-semibold text-muted-foreground uppercase">Experiencia</th>
                <th className="px-3 py-2 text-[10px] font-semibold text-muted-foreground uppercase">Expectativa</th>
                <th className="px-3 py-2 text-[10px] font-semibold text-muted-foreground uppercase">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {preUsers.map((u) => (
                <tr key={u.id as string} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                  <td className="px-3 py-2 text-xs font-medium text-foreground whitespace-nowrap">{u.name as string}</td>
                  <td className="px-3 py-2 text-xs text-muted-foreground">{u.email as string}</td>
                  <td className="px-3 py-2 text-xs text-muted-foreground whitespace-nowrap">{(u.phone as string) || "-"}</td>
                  <td className="px-3 py-2 text-xs text-muted-foreground max-w-32 truncate">{(u.dolor as string) || "-"}</td>
                  <td className="px-3 py-2 text-xs text-muted-foreground max-w-28 truncate">{(u.experiencia as string) || "-"}</td>
                  <td className="px-3 py-2 text-xs text-muted-foreground max-w-32 truncate">{(u.expectativa as string) || "-"}</td>
                  <td className="px-3 py-2 text-xs text-muted-foreground whitespace-nowrap">
                    {new Date(u.created_at as string).toLocaleDateString("es-AR")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
