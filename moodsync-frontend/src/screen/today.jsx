import { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  ScrollView,
  Platform,
  StatusBar,
} from "react-native"
import AnimatedBackground from "../components/animations"
import { router } from "expo-router"
import { logMood } from "../services/mood"; 

export default function TodayScreen() {
  const [selectedMood, setSelectedMood] = useState(null)

  const moods = [
    { emoji: "😄", label: "Amazing", value: 5, color: "#FFD93D" },
    { emoji: "😊", label: "Good", value: 4, color: "#6BCF7F" },
    { emoji: "😐", label: "Okay", value: 3, color: "#74C0FC" },
    { emoji: "😔", label: "Not Great", value: 2, color: "#A78BFA" },
    { emoji: "😢", label: "Terrible", value: 1, color: "#F687B3" },
  ]

  const handleMoodSelect = async (mood) => {
  setSelectedMood(mood);

  const userId = 1; // 👈 replace this with your real logged-in user ID from auth context
  try {
    const res = await logMood({
      user_id: userId,
      mood_label: mood.label,
      mood_value: mood.value,
      emoji: mood.emoji,
    });

    if (mood.value <= 2) {
      Alert.alert(
        "I hear you 💙",
        `It sounds like you're feeling ${mood.label.toLowerCase()}. Would you like to talk about it?`,
        [
          { text: "Not now", style: "cancel" },
          { text: "Yes, let's chat", onPress: () => router.push("/chat") },
        ]
      );
    } else {
      Alert.alert("Mood Logged ✅", `You're feeling ${mood.label}. Keep it up!`);
    }
  } catch (err) {
    console.error("Mood logging failed:", err);
    Alert.alert("Error", "Could not save mood. Try again later.");
  }
};

  return (
    <SafeAreaView style={styles.safeArea}>
      <AnimatedBackground />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Welcome */}
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeEmoji}>🏠</Text>
          <Text style={styles.welcomeTitle}>Welcome Home</Text>
          <Text style={styles.welcomeSubtitle}>Take a moment to check in with yourself</Text>
        </View>

        {/* Mood prompt */}
        <View style={styles.questionCard}>
          <Text style={styles.questionText}>How are you feeling right now?</Text>
          <Text style={styles.questionSubtext}>
            It's okay to not be okay. I'm here to listen. Trust me I won't judge
          </Text>
        </View>

        {/* Mood buttons */}
        <View style={styles.moodContainer}>
          {moods.map((mood, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.moodButton,
                { backgroundColor: mood.color },
                selectedMood?.value === mood.value && styles.selectedMood,
              ]}
              onPress={() => handleMoodSelect(mood)}
            >
              <Text style={styles.moodEmoji}>{mood.emoji}</Text>
              <Text style={styles.moodLabel}>{mood.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Mood response */}
        {selectedMood && (
          <View style={styles.selectedContainer}>
            <Text style={styles.selectedText}>
              Today you're feeling: {selectedMood.emoji} {selectedMood.label}
            </Text>
            <TouchableOpacity style={styles.chatButton} onPress={() => router.push("/chat")}>
              <Text style={styles.chatButtonText}>Want to talk about it? 💬</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Encouragement */}
        <View style={styles.encouragementCard}>
          <Text style={styles.encouragementEmoji}>🌱</Text>
          <Text style={styles.encouragementTitle}>You're Not Alone</Text>
          <Text style={styles.encouragementText}>
            Every feeling is valid. Taking time to acknowledge your emotions is a sign of strength.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 120,
  },
  welcomeCard: {
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: 24,
    padding: 32,
    marginBottom: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  welcomeEmoji: {
    fontSize: 40,
    marginBottom: 12,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2D3748",
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: "#718096",
    textAlign: "center",
  },
  questionCard: {
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  questionText: {
    fontSize: 22,
    fontWeight: "600",
    color: "#2D3748",
    textAlign: "center",
    marginBottom: 8,
  },
  questionSubtext: {
    fontSize: 16,
    color: "#718096",
    textAlign: "center",
    fontStyle: "italic",
  },
  moodContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 16,
    marginBottom: 24,
  },
  moodButton: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  selectedMood: {
    transform: [{ scale: 1.15 }],
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  moodEmoji: {
    fontSize: 36,
    marginBottom: 4,
  },
  moodLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#2D3748",
    textAlign: "center",
  },
  selectedContainer: {
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2D3748",
    textAlign: "center",
    marginBottom: 16,
  },
  chatButton: {
    backgroundColor: "#6C63FF",
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  chatButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  encouragementCard: {
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  encouragementEmoji: {
    fontSize: 32,
    marginBottom: 12,
  },
  encouragementTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2D3748",
    marginBottom: 8,
  },
  encouragementText: {
    fontSize: 16,
    color: "#718096",
    textAlign: "center",
    lineHeight: 24,
  },
})
