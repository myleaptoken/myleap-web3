"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { User, LogOut, Loader2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import type { User as SupabaseUser } from "@supabase/supabase-js"

interface UserProfile {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  role: string
}

export function UserButton() {
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const supabase = createClient()

    // Get initial user
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
      if (user) {
        // Fetch profile
        supabase
          .from("user_profiles")
          .select("*")
          .eq("id", user.id)
          .single()
          .then(({ data }) => {
            setProfile(data)
            setLoading(false)
          })
      } else {
        setLoading(false)
      }
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        if (session?.user) {
          const { data } = await supabase
            .from("user_profiles")
            .select("*")
            .eq("id", session.user.id)
            .single()
          setProfile(data)
        } else {
          setProfile(null)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    setUser(null)
    setProfile(null)
    setMenuOpen(false)
    router.refresh()
  }

  if (loading) {
    return (
      <div className="fixed top-4 left-4 z-50">
        <div className="w-9 h-9 rounded-full bg-secondary/80 backdrop-blur-sm border border-border flex items-center justify-center">
          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
        </div>
      </div>
    )
  }

  // Not logged in - show login button
  if (!user) {
    return (
      <Link
        href="/auth/login"
        className="fixed top-4 left-4 z-50 flex items-center gap-2 px-3 py-2 rounded-full bg-secondary/80 backdrop-blur-sm border border-border text-sm font-medium text-foreground hover:bg-secondary transition-colors"
      >
        <User className="h-4 w-4" />
        <span className="hidden sm:inline">Ingresar</span>
      </Link>
    )
  }

  // Logged in - show user menu
  const initials = profile?.full_name
    ? profile.full_name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
    : user.email?.[0].toUpperCase() ?? "U"

  return (
    <div className="fixed top-4 left-4 z-50">
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="w-9 h-9 rounded-full bg-primary text-primary-foreground font-semibold text-sm flex items-center justify-center border-2 border-cyan-400/30 hover:border-cyan-400/60 transition-colors"
      >
        {profile?.avatar_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={profile.avatar_url}
            alt={profile.full_name ?? "Avatar"}
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          initials
        )}
      </button>

      {/* Dropdown Menu */}
      {menuOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setMenuOpen(false)} 
          />
          <div className="absolute top-12 left-0 z-50 w-56 rounded-xl bg-card border border-border shadow-lg overflow-hidden animate-fade-up">
            {/* User info */}
            <div className="p-3 border-b border-border">
              <p className="text-sm font-medium text-foreground truncate">
                {profile?.full_name || "Usuario"}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {user.email}
              </p>
              {profile?.role && profile.role !== "user" && (
                <span className="mt-1 inline-block text-[10px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                  {profile.role === "facilitator" ? "Terapeuta" : profile.role === "premium" ? "Premium" : profile.role}
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="p-1">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Cerrar Sesion
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
