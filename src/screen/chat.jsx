"use client"

import { useState } from "react"
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, ScrollView } from "react-native"

export default function ChatScreen() {
  const [messages, setMessages] = useState([{ id: 1, text: "Hi! How are you feeling today?", isBot: true }])
  const [inputText, setInputText] = useState("")

  const sendMessage = () => {
    if (inputText.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: inputText,
        isBot: false,
      }
      setMessages([...messages, newMessage])
      setInputText("")

      // Simple bot response
      setTimeout(() => {
        const botResponse = {
          id: messages.length + 2,
          text: "I understand. Tell me more about that.",
          isBot: true,
        }
        setMessages((prev) => [...prev, botResponse])
      }, 1000)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Mood Chat 💬</Text>

      <ScrollView style={styles.messages}>
        {messages.map((message) => (
          <View key={message.id} style={[styles.message, message.isBot ? styles.botMessage : styles.userMessage]}>
            <Text style={[styles.messageText, message.isBot ? styles.botText : styles.userText]}>{message.text}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type your message..."
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7FAFC",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    padding: 20,
    color: "#2D3748",
  },
  messages: {
    flex: 1,
    paddingHorizontal: 20,
  },
  message: {
    marginBottom: 10,
    padding: 12,
    borderRadius: 15,
    maxWidth: "80%",
  },
  botMessage: {
    backgroundColor: "white",
    alignSelf: "flex-start",
  },
  userMessage: {
    backgroundColor: "#6C63FF",
    alignSelf: "flex-end",
  },
  messageText: {
    fontSize: 16,
  },
  botText: {
    color: "#2D3748",
  },
  userText: {
    color: "white",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 20,
    gap: 10,
  },
  input: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: "#6C63FF",
    borderRadius: 20,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  sendText: {
    color: "white",
    fontWeight: "600",
  },
})
