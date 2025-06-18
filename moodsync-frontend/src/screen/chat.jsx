import { useState, useRef, useEffect } from "react"
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, } from "react-native"
import AnimatedBackground from "../components/animations"

export default function ChatScreen() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi there 💙 I'm here to listen. What's on your mind today?",
      isBot: true,
    },
  ])
  const [inputText, setInputText] = useState("")
  const scrollViewRef = useRef()

  const supportiveResponses = [
    "I hear you. That sounds really difficult. Tell me more about how you're feeling.",
    "Thank you for sharing that with me. Your feelings are completely valid.",
    "It takes courage to open up about these things. I'm proud of you for talking about it.",
    "That sounds overwhelming. You're not alone in feeling this way.",
    "I can understand why that would be hard. What do you think might help you feel better?",
    "It's okay to feel this way. Sometimes life can be really challenging.",
    "You're being so brave by expressing your feelings. How long have you been feeling like this?",
    "I'm here for you. What would make you feel supported right now?",
    "That sounds really tough. Remember, it's okay to not be okay sometimes.",
    "Thank you for trusting me with your feelings. What's been the hardest part?",
  ]

  const encouragingResponses = [
    "That's wonderful to hear! It sounds like you're in a good place right now.",
    "I'm so glad you're feeling positive! What's been contributing to this good mood?",
    "That's amazing! It's great to hear you're doing well.",
    "Your positive energy is contagious! Keep embracing those good feelings.",
    "That's fantastic! What's been the highlight of your day?",
  ]

  const sendMessage = () => {
    if (inputText.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: inputText,
        isBot: false,
      }
      setMessages([...messages, newMessage])

      const userMessage = inputText.toLowerCase()
      setInputText("")

      // Determine response type based on message content
      setTimeout(() => {
        let botResponse

        if (
          userMessage.includes("sad") ||
          userMessage.includes("depressed") ||
          userMessage.includes("overwhelmed") ||
          userMessage.includes("anxious") ||
          userMessage.includes("stressed") ||
          userMessage.includes("tired") ||
          userMessage.includes("lonely") ||
          userMessage.includes("worried")
        ) {
          botResponse = supportiveResponses[Math.floor(Math.random() * supportiveResponses.length)]
        } else if (
          userMessage.includes("happy") ||
          userMessage.includes("good") ||
          userMessage.includes("great") ||
          userMessage.includes("amazing") ||
          userMessage.includes("wonderful") ||
          userMessage.includes("excited")
        ) {
          botResponse = encouragingResponses[Math.floor(Math.random() * encouragingResponses.length)]
        } else {
          botResponse = supportiveResponses[Math.floor(Math.random() * supportiveResponses.length)]
        }

        const response = {
          id: messages.length + 2,
          text: botResponse,
          isBot: true,
        }
        setMessages((prev) => [...prev, response])
      }, 1500)
    }
  }

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true })
  }, [messages])

  return (
    <View style={styles.container}>
      <AnimatedBackground />

      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView style={styles.keyboardView} behavior={Platform.OS === "ios" ? "padding" : "height"}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Safe Space 💬</Text>
            <Text style={styles.headerSubtitle}>Your feelings matter here</Text>
          </View>

          {/* Messages */}
          <ScrollView ref={scrollViewRef} style={styles.messagesContainer} showsVerticalScrollIndicator={false}>
            {messages.map((message) => (
              <View
                key={message.id}
                style={[styles.messageContainer, message.isBot ? styles.botMessage : styles.userMessage]}
              >
                <Text style={[styles.messageText, message.isBot ? styles.botText : styles.userText]}>
                  {message.text}
                </Text>
              </View>
            ))}
          </ScrollView>

          {/* Input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              value={inputText}
              onChangeText={setInputText}
              placeholder="Share what's on your mind..."
              placeholderTextColor="#999"
              multiline
              maxLength={500}
            />
            <TouchableOpacity
              style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
              onPress={sendMessage}
              disabled={!inputText.trim()}
            >
              <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
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
  keyboardView: {
    flex: 1,
  },
  header: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.9)",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(226,232,240,0.5)",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2D3748",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#718096",
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  messageContainer: {
    marginBottom: 16,
    maxWidth: "85%",
    padding: 16,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  botMessage: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.95)",
    borderBottomLeftRadius: 8,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#6C63FF",
    borderBottomRightRadius: 8,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  botText: {
    color: "#2D3748",
  },
  userText: {
    color: "#FFFFFF",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 20,
    paddingBottom: Platform.OS === "ios" ? 40 : 30, // Extra padding for system navigation
    alignItems: "flex-end",
    gap: 12,
    backgroundColor: "rgba(255,255,255,0.95)",
    borderTopWidth: 1,
    borderTopColor: "rgba(226,232,240,0.5)",
  },
  textInput: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    fontSize: 16,
    maxHeight: 100,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sendButton: {
    backgroundColor: "#6C63FF",
    borderRadius: 25,
    paddingHorizontal: 24,
    paddingVertical: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  sendButtonDisabled: {
    backgroundColor: "#A0AEC0",
  },
  sendButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },
})
