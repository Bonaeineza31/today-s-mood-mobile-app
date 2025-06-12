import { SafeAreaView, StyleSheet, View, Platform, StatusBar } from "react-native"

export default function ScreenView({ children }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.inner}>{children}</View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  inner: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
})
