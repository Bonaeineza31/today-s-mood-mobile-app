
import { useEffect } from "react"
import { router } from "expo-router"
import { useAuth } from "../src/context/authcontext"
import AdminDashboard from "../src/screen/admin"

export default function Admin() {
  const { user } = useAuth()
  const isAdmin = user?.email === "admin@moodsync.com"

  useEffect(() => {
    // Redirect non-admin users
    if (!isAdmin) {
      router.replace("/main")
    }
  }, [isAdmin])

  if (!isAdmin) {
    return null
  }

  return <AdminDashboard />
}
