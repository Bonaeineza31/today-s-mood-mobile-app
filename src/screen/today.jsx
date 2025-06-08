"use client"

import { useState } from "react"
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Alert } from "react-native"
import AnimatedBackground from "../components/animations"

export default function TodayScreen() {
  const [selectedMood, setSelectedMood] = useState(null)

  const moods = [
    { emoji: "😄", label: "Amazing", value: 5, color: "#FFD93D" },
    { emoji: "😊", label: "Good", value: 4, color: "#6BCF7F" },
    { emoji: "😐", label: "Okay", value: 3, color: "#74C0FC" },
    { emoji: "😔", label: "Bad", value: 2, color: "#A78BFA" },
    { emoji: "😢", label: "Awful", value: 1, color: "#F687B3" },
  ]

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood)
    Alert.alert("Mood Saved! 🎉", `You're feeling ${mood.label} today.`, [{ text: "OK" }])
  }

  return (
    <View style={styles.container}>
      <AnimatedBackground />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>How are you feeling today?</Text>
            <Text style={styles.subtitle}>Choose your mood</Text>
          </View>

          {/* Mood Buttons */}
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

          {/* Selected Mood Display */}
          {selectedMood && (
            <View style={styles.selectedContainer}>
              <Text style={styles.selectedText}>
                Today you're feeling: {selectedMood.emoji} {selectedMood.label}
              </Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    </View>
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
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2D3748",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#718096",
    textAlign: "center",
  },
  moodContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 15,
  },
  moodButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  selectedMood: {
    transform: [{ scale: 1.1 }],
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  moodEmoji: {
    fontSize: 32,
    marginBottom: 4,
  },
  moodLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#2D3748",
  },
  selectedContainer: {
    marginTop: 40,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
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
  },
})
