"use server"

import { createAdminClient } from "@/lib/supabase/admin"
import { isAdminAuthenticated } from "@/lib/admin-auth"
import { revalidatePath } from "next/cache"

function revalidateAll() {
  revalidatePath("/", "layout")
  revalidatePath("/admin", "page")
}

async function requireAdmin() {
  const authed = await isAdminAuthenticated()
  if (!authed) throw new Error("No autorizado")
}

// ─── Profile ───
export async function updateProfile(id: string, data: Record<string, unknown>) {
  await requireAdmin()
  const supabase = createAdminClient()
  const { error } = await supabase.from("profile").update(data).eq("id", id)
  if (error) throw new Error(error.message)
  revalidateAll()
  return { success: true }
}

// ─── Social Links ───
export async function upsertSocialLink(data: Record<string, unknown>) {
  await requireAdmin()
  const supabase = createAdminClient()
  if (data.id) {
    const id = data.id
    delete data.id
    const { error } = await supabase.from("social_links").update(data).eq("id", id)
    if (error) throw new Error(error.message)
  } else {
    const { error } = await supabase.from("social_links").insert(data)
    if (error) throw new Error(error.message)
  }
  revalidateAll()
  return { success: true }
}

export async function deleteSocialLink(id: string) {
  await requireAdmin()
  const supabase = createAdminClient()
  const { error } = await supabase.from("social_links").delete().eq("id", id)
  if (error) throw new Error(error.message)
  revalidateAll()
  return { success: true }
}

// ─── CTA Links ───
export async function upsertCtaLink(data: Record<string, unknown>) {
  await requireAdmin()
  const supabase = createAdminClient()
  if (data.id) {
    const id = data.id
    delete data.id
    const { error } = await supabase.from("cta_links").update(data).eq("id", id)
    if (error) throw new Error(error.message)
  } else {
    const { error } = await supabase.from("cta_links").insert(data)
    if (error) throw new Error(error.message)
  }
  revalidateAll()
  return { success: true }
}

export async function deleteCtaLink(id: string) {
  await requireAdmin()
  const supabase = createAdminClient()
  const { error } = await supabase.from("cta_links").delete().eq("id", id)
  if (error) throw new Error(error.message)
  revalidateAll()
  return { success: true }
}

// ─── CTA Modal Content ───
export async function upsertModalContent(data: Record<string, unknown>) {
  await requireAdmin()
  const supabase = createAdminClient()
  if (data.id) {
    const id = data.id
    delete data.id
    const { error } = await supabase.from("cta_modal_content").update(data).eq("id", id)
    if (error) throw new Error(error.message)
  } else {
    const { error } = await supabase.from("cta_modal_content").insert(data)
    if (error) throw new Error(error.message)
  }
  revalidateAll()
  return { success: true }
}

export async function deleteModalContent(id: string) {
  await requireAdmin()
  const supabase = createAdminClient()
  const { error } = await supabase.from("cta_modal_content").delete().eq("id", id)
  if (error) throw new Error(error.message)
  revalidateAll()
  return { success: true }
}

// ─── Facilitators ───
export async function upsertFacilitator(data: Record<string, unknown>) {
  await requireAdmin()
  const supabase = createAdminClient()
  if (data.id) {
    const id = data.id
    delete data.id
    const { error } = await supabase.from("facilitators").update(data).eq("id", id)
    if (error) throw new Error(error.message)
  } else {
    const { error } = await supabase.from("facilitators").insert(data)
    if (error) throw new Error(error.message)
  }
  revalidateAll()
  return { success: true }
}

export async function deleteFacilitator(id: string) {
  await requireAdmin()
  const supabase = createAdminClient()
  const { error } = await supabase.from("facilitators").delete().eq("id", id)
  if (error) throw new Error(error.message)
  revalidateAll()
  return { success: true }
}

// ─── Testimonials ───
export async function upsertTestimonial(data: Record<string, unknown>) {
  await requireAdmin()
  const supabase = createAdminClient()
  if (data.id) {
    const id = data.id
    delete data.id
    const { error } = await supabase.from("testimonials").update(data).eq("id", id)
    if (error) throw new Error(error.message)
  } else {
    const { error } = await supabase.from("testimonials").insert(data)
    if (error) throw new Error(error.message)
  }
  revalidateAll()
  return { success: true }
}

export async function deleteTestimonial(id: string) {
  await requireAdmin()
  const supabase = createAdminClient()
  const { error } = await supabase.from("testimonials").delete().eq("id", id)
  if (error) throw new Error(error.message)
  revalidateAll()
  return { success: true }
}

// ─── Crowdfunding Config ───
export async function updateCrowdfundingConfig(id: string, data: Record<string, unknown>) {
  await requireAdmin()
  const supabase = createAdminClient()
  const { error } = await supabase.from("crowdfunding_config").update({ ...data, updated_at: new Date().toISOString() }).eq("id", id)
  if (error) throw new Error(error.message)
  revalidateAll()
  return { success: true }
}

// ─── Fetch all admin data ───
export async function getAdminData() {
  await requireAdmin()
  const supabase = createAdminClient()

  const [profileRes, socialsRes, ctaRes, modalsRes, facilitatorsRes, surveysRes, testimonialsRes, preUsersRes, crowdfundingRes] =
    await Promise.all([
      supabase.from("profile").select("*").limit(1).single(),
      supabase.from("social_links").select("*").order("display_order"),
      supabase.from("cta_links").select("*").order("display_order"),
      supabase.from("cta_modal_content").select("*"),
      supabase.from("facilitators").select("*").order("display_order"),
      supabase.from("survey_responses").select("*").order("created_at", { ascending: false }),
      supabase.from("testimonials").select("*").order("display_order"),
      supabase.from("pre_users").select("*").order("created_at", { ascending: false }),
      supabase.from("crowdfunding_config").select("*").limit(1).single(),
    ])

  return {
    profile: profileRes.data,
    socialLinks: socialsRes.data ?? [],
    ctaLinks: ctaRes.data ?? [],
    modalContents: modalsRes.data ?? [],
    facilitators: facilitatorsRes.data ?? [],
    surveys: surveysRes.data ?? [],
    testimonials: testimonialsRes.data ?? [],
    preUsers: preUsersRes.data ?? [],
    crowdfundingConfig: crowdfundingRes.data,
  }
}
