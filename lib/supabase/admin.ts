import { createClient as createSupabaseClient } from "@supabase/supabase-js"

/**
 * Admin Supabase client using the service role key.
 * Bypasses RLS entirely - only use in server actions behind requireAdmin().
 * Does NOT touch cookies, so it won't interfere with the admin session.
 */
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  )
}
