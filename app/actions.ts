"use server"

import { createClient } from "@/lib/supabase/server"

interface SubmitSurveyInput {
  ctaLinkId: string
  name: string
  email: string
  answers: Record<string, string>
}

export async function submitSurvey(input: SubmitSurveyInput) {
  const supabase = await createClient()

  const { error } = await supabase.from("survey_responses").insert({
    cta_link_id: input.ctaLinkId,
    respondent_name: input.name,
    respondent_email: input.email,
    answers: input.answers,
  })

  if (error) {
    throw new Error("Error al guardar la encuesta: " + error.message)
  }

  return { success: true }
}
