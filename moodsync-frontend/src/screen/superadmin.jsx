import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useAuth } from "../context/authcontext";
import AnimatedBackground from "../components/animations";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";

export default function SuperAdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [moods, setMoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("user");

  const loadStats = async () => {
    try {
      const res = await fetch("http://192.168.43.200:3000/api/superadmin/stats");
      const data = await res.json();
      setStats(data);

      const userRes = await fetch("http://192.168.43.200:3000/api/superadmin/users");
      const usersData = await userRes.json();
      setUsers(usersData);

      const moodsRes = await fetch("http://192.168.43.200:3000/api/superadmin/moods");
      const moodsData = await moodsRes.json();
      setMoods(moodsData);
    } catch (err) {
      console.error("Error loading stats", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    loadStats();
  };

  const handleInvite = async () => {
    if (!inviteEmail || !inviteRole) return Alert.alert("Error", "Email and role are required");
    try {
      const res = await fetch("http://192.168.43.200:3000/api/superadmin/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: inviteEmail, role: inviteRole }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      Alert.alert("Success", data.message || "Invitation sent successfully");
      setInviteEmail("");
      setInviteRole("user");
      loadStats();
    } catch (err) {
      Alert.alert("Error", err.message || "Failed to send invite");
    }
  };

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync("authToken");
    router.replace("/login");
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFD700" />
        <Text style={styles.loadingText}>Loading dashboard...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <AnimatedBackground />
      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <Text style={styles.title}>Super Admin Dashboard</Text>

        <View style={styles.card}><Text style={styles.label}>Users: </Text><Text style={styles.value}>{stats?.users}</Text></View>
        <View style={styles.card}><Text style={styles.label}>Blogs: </Text><Text style={styles.value}>{stats?.blogs}</Text></View>
        <View style={styles.card}><Text style={styles.label}>Mood Logs: </Text><Text style={styles.value}>{stats?.moods}</Text></View>

        <Text style={styles.sectionTitle}>Invite New User</Text>
        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder="Enter email"
            value={inviteEmail}
            onChangeText={setInviteEmail}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Role (admin or user)"
            value={inviteRole}
            onChangeText={setInviteRole}
          />
          <TouchableOpacity style={styles.button} onPress={handleInvite}>
            <Text style={styles.buttonText}>Send Invite</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#FFD700", marginTop: 20 }]}
            onPress={handleLogout}
          >
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>All Users</Text>
        {users.map((u) => (
          <View key={u.id} style={styles.userCard}>
            <Text style={styles.userInfo}>{u.email}</Text>
            <Text style={styles.userRole}>{u.role}</Text>
          </View>
        ))}

        <Text style={styles.sectionTitle}>Recent Moods</Text>
        {moods.map((mood) => (
          <View key={mood.id} style={styles.userCard}>
            <Text style={styles.userInfo}>{mood.user_name} - {mood.mood}</Text>
            <Text style={styles.userRole}>{new Date(mood.logged_at).toLocaleString()}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20 },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 20 },
  sectionTitle: { fontSize: 20, fontWeight: "600", marginTop: 30, marginBottom: 10 },
  card: {
    backgroundColor: "white",
    padding: 20,
    marginBottom: 15,
    borderRadius: 16,
    elevation: 2,
  },
  input: {
    backgroundColor: "#f0f0f0",
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#FFD700",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  label: { fontSize: 18, color: "#555" },
  value: { fontSize: 22, fontWeight: "bold", color: "#FFD700" },
  userCard: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  userInfo: { fontSize: 16, fontWeight: "500" },
  userRole: { fontSize: 14, fontStyle: "italic", color: "#666" },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  loadingText: { marginTop: 10, fontSize: 16, color: "#999" },
});
