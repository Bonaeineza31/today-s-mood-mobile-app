import { useEffect } from "react";
import { router } from "expo-router";
import { useAuth } from "../src/context/authcontext";
import SuperAdminDashboard from "../src/screen/superadmin";

export default function SuperAdminDashboardScreen() {
  const { user } = useAuth();

  useEffect(() => {
    if (user?.role !== "superadmin") {
      router.replace("/main");
    }
  }, [user]);

  if (user?.role !== "superadmin") return null;

  return <SuperAdminDashboard />;
}
