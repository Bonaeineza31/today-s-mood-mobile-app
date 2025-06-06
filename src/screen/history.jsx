import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useTheme } from '../context/theme';
import AnimatedBackground from '../components/animations'; // Keep floating smileys!

export default function HistoryScreen() {
  const theme = useTheme();
  const styles = createStyles(theme);

  // Mock data for now
  const moodHistory = [
    { date: '2024-01-06', mood: '😊', label: 'Happy' },
    { date: '2024-01-05', mood: '😐', label: 'Neutral' },
    { date: '2024-01-04', mood: '😄', label: 'Very Happy' },
    { date: '2024-01-03', mood: '😔', label: 'Sad' },
    { date: '2024-01-02', mood: '😊', label: 'Happy' },
  ];

  return (
    <View style={styles.container}>
      {/* Keep the floating smiley background! */}
      <AnimatedBackground />
      
      <SafeAreaView style={styles.safeArea}>
        <ScrollView 
          style={styles.scrollView} 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Mood History</Text>
          
          {moodHistory.map((entry, index) => (
            <View key={index} style={styles.historyItem}>
              <Text style={styles.moodEmoji}>{entry.mood}</Text>
              <View style={styles.historyText}>
                <Text style={styles.moodLabel}>{entry.label}</Text>
                <Text style={styles.dateText}>{entry.date}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const createStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 120, // Extra space for tab bar
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  historyItem: {
    flexDirection: 'row',
    backgroundColor: theme.colors.card,
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  moodEmoji: {
    fontSize: 40,
    marginRight: 20,
  },
  historyText: {
    flex: 1,
  },
  moodLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 4,
  },
  dateText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
});