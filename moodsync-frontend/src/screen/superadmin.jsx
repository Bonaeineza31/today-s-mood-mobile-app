import { View, Text, StyleSheet } from "react-native";
import { useAuth } from "../context/authcontext";

export default function SuperAdminDashboard() {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Super Admin 👑</Text>
      <Text style={styles.subtitle}>Logged in as: {user?.email}</Text>

      <Text style={styles.section}>Coming next:</Text>
      <Text>• View / Enable / Disable Users</Text>
      <Text>• Promote to Admin / Demote</Text>
      <Text>• Delete Users</Text>
      <Text>• Global Mood + Blog Statistics</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 10 },
  subtitle: { fontSize: 16, color: "#555", marginBottom: 20 },
  section: { fontSize: 18, fontWeight: "bold", marginTop: 20, marginBottom: 10 },
});
