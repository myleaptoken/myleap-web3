import { ProfileHeader } from "@/components/profile-header"
import { SocialIcons } from "@/components/social-icons"
import { CTALinks } from "@/components/cta-links"
import { FeaturedContent } from "@/components/featured-content"
import { EmailCapture } from "@/components/email-capture"
import { ProfileFooter } from "@/components/profile-footer"
import { AmbientBackground } from "@/components/ambient-background"
import { ThemeToggle } from "@/components/theme-toggle"

export default function ProfilePage() {
  return (
    <>
      <ThemeToggle />
      <AmbientBackground />
      <main className="relative mx-auto flex min-h-screen max-w-xl flex-col items-center px-4 pb-8">
        {/* Profile Header with Banner + Avatar + Bio + Stats */}
        <ProfileHeader />

        {/* Social Media Icons */}
        <section className="mt-6 w-full" aria-label="Redes sociales">
          <SocialIcons />
        </section>

        {/* Divider */}
        <div className="my-6 flex w-full items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted-foreground font-medium uppercase tracking-widest">
            Enlaces
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>

        {/* CTA Link Buttons */}
        <section className="w-full" aria-label="Enlaces principales">
          <CTALinks />
        </section>

        {/* Divider */}
        <div className="my-6 flex w-full items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted-foreground font-medium uppercase tracking-widest">
            Destacado
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>

        {/* Featured Content Cards */}
        <section className="w-full" aria-label="Contenido destacado">
          <FeaturedContent />
        </section>

        {/* Email Capture */}
        <section className="mt-8 w-full" aria-label="Suscripcion newsletter">
          <EmailCapture />
        </section>

        {/* Footer */}
        <ProfileFooter />
      </main>
    </>
  )
}
