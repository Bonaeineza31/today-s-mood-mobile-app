import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, RefreshControl } from "react-native";
import { getSuperAdminStats } from "../services/superadminService";
import AnimatedBackground from "../components/animations";

export default function SuperAdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadStats = async () => {
    try {
      const data = await getSuperAdminStats();
      setStats(data);
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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6C63FF" />
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
        <View style={styles.card}>
          <Text style={styles.label}>Users:</Text>
          <Text style={styles.value}>{stats?.users}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.label}>Blogs:</Text>
          <Text style={styles.value}>{stats?.blogs}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.label}>Mood Logs:</Text>
          <Text style={styles.value}>{stats?.moods}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20 },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 20 },
  card: {
    backgroundColor: "white",
    padding: 20,
    marginBottom: 15,
    borderRadius: 16,
    elevation: 2,
  },
  label: { fontSize: 18, color: "#555" },
  value: { fontSize: 22, fontWeight: "bold", color: "#6C63FF" },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  loadingText: { marginTop: 10, fontSize: 16, color: "#999" },
});
