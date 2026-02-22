"use server"

import { createClient } from "@/lib/supabase/server"

interface SubmitSurveyInput {
  ctaLinkId: string
  name: string
  email: string
  phone: string
  dolor: string
  experiencia: string
  expectativa: string
}

export async function submitSurvey(input: SubmitSurveyInput) {
  const supabase = await createClient()

  const { error } = await supabase.from("survey_responses").insert({
    cta_link_id: input.ctaLinkId,
    respondent_name: input.name,
    respondent_email: input.email,
    respondent_phone: input.phone,
    dolor: input.dolor,
    experiencia: input.experiencia,
    expectativa: input.expectativa,
  })

  if (error) {
    throw new Error("Error al guardar la encuesta: " + error.message)
  }

  // Also register as pre-user
  await supabase.from("pre_users").insert({
    name: input.name,
    email: input.email,
    phone: input.phone,
    dolor: input.dolor,
    experiencia: input.experiencia,
    expectativa: input.expectativa,
    source: "survey",
  })

  return { success: true }
}
