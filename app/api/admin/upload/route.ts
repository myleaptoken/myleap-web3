import { NextRequest, NextResponse } from "next/server"
import { isAdminAuthenticated } from "@/lib/admin-auth"
import { createClient as createSupabaseClient } from "@supabase/supabase-js"

export const runtime = "nodejs"
export const maxDuration = 300

function getAdminSupabase() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  )
}

/**
 * POST - Upload ANY file (images + videos) via server proxy.
 * The service role key bypasses all RLS policies.
 * Node.js runtime has no built-in body size limit.
 */
export async function POST(request: NextRequest) {
  try {
    const authed = await isAdminAuthenticated()
    if (!authed) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get("file") as File | null
    const bucket = (formData.get("bucket") as string) || "testimonials"

    if (!file || file.size === 0) {
      return NextResponse.json({ error: "No se recibio archivo" }, { status: 400 })
    }

    console.log("[v0] Upload start:", file.name, "size:", file.size, "type:", file.type, "bucket:", bucket)

    const supabase = getAdminSupabase()
    const ext = (file.name.split(".").pop() || "bin").toLowerCase()
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`

    // Read file into buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    console.log("[v0] Buffer ready, size:", buffer.length, "uploading as:", fileName)

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, buffer, {
        contentType: file.type || "application/octet-stream",
        upsert: false,
      })

    if (error) {
      console.log("[v0] Supabase upload error:", error.message)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log("[v0] Upload success:", data.path)

    const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(fileName)

    console.log("[v0] Public URL:", urlData.publicUrl)

    return NextResponse.json({ url: urlData.publicUrl })
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error desconocido"
    console.log("[v0] Upload exception:", message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
