import { ProfileHeader } from "@/components/profile-header"
import { SocialIcons } from "@/components/social-icons"
import { CTALinks } from "@/components/cta-links"
import { TestimonialsCarousel } from "@/components/testimonials-carousel"
import { FeaturedContent } from "@/components/featured-content"
import { ProfileFooter } from "@/components/profile-footer"
import { AmbientBackground } from "@/components/ambient-background"
import { ThemeToggle } from "@/components/theme-toggle"
import { getPageData } from "@/lib/data"

export default async function ProfilePage() {
  const { profile, socialLinks, ctaLinks, featuredLinks, facilitators, testimonials } =
    await getPageData()

  return (
    <>
      <ThemeToggle />
      <AmbientBackground />
      <main className="relative mx-auto flex min-h-screen max-w-xl flex-col items-center px-4 pb-8">
        {/* Profile Header with Banner + Avatar + Bio + Stats */}
        <ProfileHeader profile={profile} />

        {/* Social Media Icons */}
        <section className="mt-6 w-full" aria-label="Redes sociales">
          <SocialIcons links={socialLinks} />
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
          <CTALinks links={ctaLinks} facilitators={facilitators} />
        </section>

        {/* Testimonials Carousel */}
        {testimonials.length > 0 && (
          <>
            <div className="my-6 flex w-full items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-widest">
                Testimonios
              </span>
              <div className="h-px flex-1 bg-border" />
            </div>

            <section className="w-full" aria-label="Testimonios">
              <TestimonialsCarousel testimonials={testimonials} />
            </section>
          </>
        )}

        {/* Divider – only show if there are featured items */}
        {featuredLinks.length > 0 && (
          <>
            <div className="my-6 flex w-full items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-widest">
                Destacado
              </span>
              <div className="h-px flex-1 bg-border" />
            </div>

            {/* Featured Content Cards */}
            <section className="w-full" aria-label="Contenido destacado">
              <FeaturedContent links={featuredLinks} />
            </section>
          </>
        )}

        {/* Footer */}
        <ProfileFooter />
      </main>
    </>
  )
}
