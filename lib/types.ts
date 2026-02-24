/* ─── Database row types ─── */

export interface Profile {
  id: string
  name: string
  subtitle: string | null
  bio: string | null
  avatar_url: string | null
  banner_url: string | null
  stat_leapers: string
  stat_cursos: string
  stat_estudiantes: string
}

export interface SocialLink {
  id: string
  profile_id: string
  platform: string
  url: string
  display_order: number
  is_active: boolean
}

export interface CTALink {
  id: string
  profile_id: string
  title: string
  description: string | null
  icon_name: string
  variant: string
  badge: string | null
  modal_key: string
  display_order: number
  is_active: boolean
  is_featured: boolean
  featured_image: string | null
  featured_tag: string | null
  featured_stat_1_label: string | null
  featured_stat_2_label: string | null
  url: string | null
}

export interface CTAModalContent {
  id: string
  cta_link_id: string
  modal_title: string
  modal_subtitle: string | null
  modal_body: string | null
  modal_type: string
  extra_data: Record<string, unknown>
  cta_button_text: string | null
  cta_button_url: string | null
}

export interface Facilitator {
  id: string
  name: string
  specialty: string | null
  avatar_url: string | null
  whatsapp_url: string | null
  booking_url: string | null
  bio: string | null
  display_order: number
  is_active: boolean
}

export interface Testimonial {
  id: string
  name: string
  subtitle: string | null
  thumbnail_url: string | null
  video_url: string
  display_order: number
  is_active: boolean
}

export interface PreUser {
  id: string
  name: string
  email: string
  phone: string | null
  dolor: string | null
  experiencia: string | null
  expectativa: string | null
  source: string
  created_at: string
}

/* ─── Joined types for the frontend ─── */

export interface CTALinkWithModal extends CTALink {
  cta_modal_content: CTAModalContent[] | null
}

export interface PageData {
  profile: Profile
  socialLinks: SocialLink[]
  ctaLinks: CTALinkWithModal[]
  featuredLinks: CTALinkWithModal[]
  facilitators: Facilitator[]
  testimonials: Testimonial[]
}
