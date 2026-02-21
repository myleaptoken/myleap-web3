"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { loginAdmin } from "@/lib/admin-auth"
import { Lock, Eye, EyeOff, LogIn, ArrowLeft } from "lucide-react"

export default function AdminLoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)

    try {
      const result = await loginAdmin(formData)
      // If loginAdmin succeeds it calls redirect() which throws a NEXT_REDIRECT
      // If we reach here, credentials were wrong
      if (result && !result.success) {
        setError(result.error ?? "Error desconocido")
      }
    } catch (err: unknown) {
      // redirect() throws a special error in Next.js, we need to re-throw it
      const error = err as { digest?: string }
      if (error?.digest?.startsWith("NEXT_REDIRECT")) {
        throw err
      }
      setError("Error al iniciar sesion")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm animate-fade-up">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-lg">
          <div className="flex flex-col items-center mb-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 mb-4">
              <Lock className="h-7 w-7 text-primary" />
            </div>
            <h1 className="text-xl font-bold text-foreground">Admin Panel</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Ingresa tus credenciales
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label
                htmlFor="username"
                className="text-xs font-semibold text-foreground"
              >
                Usuario
              </label>
              <input
                id="username"
                name="username"
                type="text"
                placeholder="Usuario"
                required
                className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="text-xs font-semibold text-foreground"
              >
                Contrasena
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Contrasena"
                  required
                  className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2.5 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-xs text-destructive-foreground font-medium bg-destructive/10 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
            >
              <LogIn className="h-4 w-4" />
              {loading ? "Ingresando..." : "Ingresar"}
            </button>
          </form>

          <button
            type="button"
            onClick={() => router.push("/")}
            className="flex w-full items-center justify-center gap-2 mt-4 rounded-xl border border-border px-6 py-2.5 text-sm font-medium text-muted-foreground transition-all duration-300 hover:text-foreground hover:border-primary/50 hover:bg-secondary/50"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  )
}
