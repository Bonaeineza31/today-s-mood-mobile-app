import { useEffect } from "react"
import { View, Text, StyleSheet, ActivityIndicator } from "react-native"
import { useAuth } from "../src/context/authcontext"
import { router } from "expo-router"
import AnimatedBackground from "../src/components/animations"

export default function IndexScreen() {
  const { user, loading } = useAuth()

  useEffect(() => {
    if (!loading) {
      if (user) {
        // User is logged in, go to main app
        router.replace("/main")
      } else {
        // User is not logged in, go to login
        router.replace("/login")
      }
    }
  }, [user, loading])

  return (
    <View style={styles.container}>
      <AnimatedBackground />
      <View style={styles.loadingContainer}>
        <Text style={styles.title}>MoodSync</Text>
        <ActivityIndicator size="large" color="#FFD700" style={styles.loader} />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 30,
    textShadowColor: "rgba(255,255,255,0.8)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  loader: {
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
  },
})
