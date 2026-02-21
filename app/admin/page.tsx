import { redirect } from "next/navigation"
import { isAdminAuthenticated } from "@/lib/admin-auth"
import { getAdminData } from "./actions"
import { AdminPanel } from "./admin-panel"

export default async function AdminPage() {
  const authed = await isAdminAuthenticated()
  if (!authed) redirect("/admin/login")

  const data = await getAdminData()
  return <AdminPanel data={data} />
}
