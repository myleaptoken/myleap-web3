"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { loginAdmin } from "@/lib/admin-auth"
import { Lock, Eye, EyeOff, LogIn } from "lucide-react"

export default function AdminLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const result = await loginAdmin(username, password)
      if (result.success) {
        router.push("/admin")
      } else {
        setError(result.error ?? "Error desconocido")
      }
    } catch {
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

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="username" className="text-xs font-semibold text-foreground">
                Usuario
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Usuario"
                required
                className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="password" className="text-xs font-semibold text-foreground">
                Contrasena
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
        </div>
      </div>
    </div>
  )
}
