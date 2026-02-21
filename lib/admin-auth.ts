"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const ADMIN_USER = "myleap"
const ADMIN_PASS = "metodoone"
const SESSION_COOKIE = "admin_session"
const SESSION_VALUE = "authenticated_myleap_admin"

export async function loginAdmin(formData: FormData) {
  const username = (formData.get("username") as string)?.trim()
  const password = (formData.get("password") as string)?.trim()

  if (username === ADMIN_USER && password === ADMIN_PASS) {
    const cookieStore = await cookies()
    cookieStore.set(SESSION_COOKIE, SESSION_VALUE, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    })
    redirect("/admin")
  }

  return { success: false, error: "Credenciales incorrectas" }
}

export async function logoutAdmin() {
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, "", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  })
  redirect("/")
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  const session = cookieStore.get(SESSION_COOKIE)
  return session?.value === SESSION_VALUE
}
