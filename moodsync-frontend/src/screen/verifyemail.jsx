import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { router } from "expo-router";
import { verifyEmail } from "../services/authService"; // Replace with your API call
import AnimatedBackground from "../components/animations";

export default function VerifyEmailScreen() {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (!email || !token) {
      return Alert.alert("Error", "Email and code are required.");
    }

    setLoading(true);
    try {
      const res = await verifyEmail(email, token);
      if (res.success) {
        Alert.alert("Verified", "Your account has been verified.");
        router.replace("/login");
      } else {
        Alert.alert("Failed", res.error || "Invalid code.");
      }
    } catch (err) {
      Alert.alert("Error", "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <AnimatedBackground />
      <View style={styles.inner}>
        <Text style={styles.title}>Verify Your Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Your email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Verification code"
          value={token}
          onChangeText={setToken}
        />
        <TouchableOpacity style={styles.button} onPress={handleVerify}>
          <Text style={styles.buttonText}>{loading ? "Verifying..." : "Verify"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center" },
  inner: { padding: 30 },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  input: {
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    backgroundColor: "white",
  },
  button: {
    backgroundColor: "#6C63FF",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: { color: "white", fontWeight: "bold" },
});
