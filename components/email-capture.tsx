"use client"

import { useState } from "react"
import { Send, Zap } from "lucide-react"

export function EmailCapture() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setEmail("")
    }
  }

  return (
    <div
      className="w-full rounded-2xl border border-border bg-card p-6 sm:p-8 animate-fade-up relative overflow-hidden"
      style={{ animationDelay: "0.75s" }}
    >
      {/* Decorative glow */}
      <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative">
        <div className="flex items-center gap-2 mb-2">
          <Zap className="h-5 w-5 text-primary" />
          <h3 className="font-bold text-foreground text-base sm:text-lg">
            Newsletter Semanal
          </h3>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Recibe tips, recursos y estrategias directamente en tu bandeja. Sin spam, solo valor.
        </p>

        {submitted ? (
          <div className="mt-5 flex items-center gap-2 rounded-xl bg-primary/10 border border-primary/30 p-4 animate-scale-in">
            <span className="text-primary text-lg">&#10003;</span>
            <p className="text-sm text-primary font-medium">
              Te has suscrito exitosamente
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-5 flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
              className="flex-1 rounded-xl border border-border bg-secondary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
            />
            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 hover:scale-105 active:scale-95"
            >
              <Send className="h-4 w-4" />
              Suscribirse
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
