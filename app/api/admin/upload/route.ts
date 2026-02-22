import { NextRequest, NextResponse } from "next/server"
import { isAdminAuthenticated } from "@/lib/admin-auth"
import { createClient as createSupabaseClient } from "@supabase/supabase-js"

export const runtime = "nodejs"
export const maxDuration = 120

function getAdminSupabase() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  )
}

/**
 * POST - Upload small files (images, small videos) via proxy
 * Body: FormData with "file" and optional "bucket"
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

    if (!file) {
      return NextResponse.json({ error: "No se recibio archivo" }, { status: 400 })
    }

    const supabase = getAdminSupabase()
    const ext = file.name.split(".").pop() || "bin"
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const { error } = await supabase.storage
      .from(bucket)
      .upload(fileName, buffer, {
        contentType: file.type || "application/octet-stream",
        upsert: false,
      })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(fileName)
    return NextResponse.json({ url: urlData.publicUrl })
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error desconocido"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

/**
 * PUT - Create a signed upload URL for large files (videos)
 * Client uploads directly to Supabase, bypassing Next.js body limits
 * Body: JSON with { fileName, contentType, bucket }
 */
export async function PUT(request: NextRequest) {
  try {
    const authed = await isAdminAuthenticated()
    if (!authed) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const { fileName, contentType, bucket = "testimonials" } = await request.json()

    if (!fileName) {
      return NextResponse.json({ error: "Falta nombre de archivo" }, { status: 400 })
    }

    const supabase = getAdminSupabase()
    const ext = fileName.split(".").pop() || "mp4"
    const storagePath = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`

    const { data, error } = await supabase.storage
      .from(bucket)
      .createSignedUploadUrl(storagePath)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(storagePath)

    return NextResponse.json({
      signedUrl: data.signedUrl,
      token: data.token,
      path: storagePath,
      publicUrl: urlData.publicUrl,
      contentType: contentType || "video/mp4",
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error desconocido"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
