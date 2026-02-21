import { createClient } from "@/lib/supabase/server"
import type {
  Profile,
  SocialLink,
  CTALinkWithModal,
  Facilitator,
  PageData,
} from "@/lib/types"

export async function getPageData(): Promise<PageData> {
  const supabase = await createClient()

  // Fetch all data in parallel
  const [profileRes, socialsRes, ctaRes, facilitatorsRes] = await Promise.all([
    supabase.from("profile").select("*").limit(1).single(),
    supabase
      .from("social_links")
      .select("*")
      .eq("is_active", true)
      .order("display_order"),
    supabase
      .from("cta_links")
      .select("*, cta_modal_content(*)")
      .eq("is_active", true)
      .order("display_order"),
    supabase
      .from("facilitators")
      .select("*")
      .eq("is_active", true)
      .order("display_order"),
  ])

  const profile = (profileRes.data as Profile) ?? {
    id: "",
    name: "My Leap",
    subtitle: "Sanacion Energetica & Metodo ONE",
    bio: "",
    avatar_url: null,
    banner_url: null,
    stat_leapers: "0",
    stat_cursos: "0",
    stat_estudiantes: "0",
  }

  const socialLinks = (socialsRes.data as SocialLink[]) ?? []
  const allCtaLinks = (ctaRes.data as CTALinkWithModal[]) ?? []
  const facilitators = (facilitatorsRes.data as Facilitator[]) ?? []

  // Split CTA links: all active for the links section, featured only for the featured section
  const ctaLinks = allCtaLinks
  const featuredLinks = allCtaLinks.filter((l) => l.is_featured)

  return { profile, socialLinks, ctaLinks, featuredLinks, facilitators }
}
