"use client"

import { useState } from "react"
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Alert } from "react-native"

export default function TodayScreen() {
  const [selectedMood, setSelectedMood] = useState(null)

  const moods = [
    { emoji: "😄", label: "Great", color: "#FFD93D" },
    { emoji: "😊", label: "Good", color: "#6BCF7F" },
    { emoji: "😐", label: "Okay", color: "#74C0FC" },
    { emoji: "😔", label: "Bad", color: "#A78BFA" },
    { emoji: "😢", label: "Awful", color: "#F687B3" },
  ]

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood)
    Alert.alert("Mood Saved!", `You're feeling ${mood.label} today.`)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>How are you feeling today?</Text>

        <View style={styles.moodContainer}>
          {moods.map((mood, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.moodButton,
                { backgroundColor: mood.color },
                selectedMood?.label === mood.label && styles.selected,
              ]}
              onPress={() => handleMoodSelect(mood)}
            >
              <Text style={styles.emoji}>{mood.emoji}</Text>
              <Text style={styles.label}>{mood.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {selectedMood && (
          <View style={styles.result}>
            <Text style={styles.resultText}>
              Today: {selectedMood.emoji} {selectedMood.label}
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7FAFC",
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 40,
    color: "#2D3748",
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
    margin: 5,
  },
  selected: {
    transform: [{ scale: 1.1 }],
  },
  emoji: {
    fontSize: 30,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    color: "#2D3748",
  },
  result: {
    marginTop: 40,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
  },
  resultText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2D3748",
  },
})
