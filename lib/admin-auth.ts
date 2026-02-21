"use server"

import { cookies } from "next/headers"

const ADMIN_USER = "myleap"
const ADMIN_PASS = "metodoone"
const SESSION_COOKIE = "admin_session"
const SESSION_VALUE = "authenticated_myleap_admin"

export async function loginAdmin(username: string, password: string) {
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    const cookieStore = await cookies()
    cookieStore.set(SESSION_COOKIE, SESSION_VALUE, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    })
    return { success: true }
  }
  return { success: false, error: "Credenciales incorrectas" }
}

export async function logoutAdmin() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE)
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  const session = cookieStore.get(SESSION_COOKIE)
  return session?.value === SESSION_VALUE
}
