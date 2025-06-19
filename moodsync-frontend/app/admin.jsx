import { useEffect } from "react";
import { router } from "expo-router";
import { useAuth } from "../src/context/authcontext";
import AdminDashboard from "../src/screen/admin";

export default function Admin() {
  const { user } = useAuth();

  useEffect(() => {
    if (user && user.role !== "admin") {
      router.replace("/main");
    }
  }, [user]);

  if (!user || user.role !== "admin") return null;

  return <AdminDashboard />;
}
