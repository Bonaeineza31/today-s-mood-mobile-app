import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useTheme } from '../context/theme';

export default function HistoryScreen() {
  const theme = useTheme();
  const styles = createStyles(theme);

  // Mock data for now
  const moodHistory = [
    { date: '2024-01-06', mood: '😊', label: 'Happy' },
    { date: '2024-01-05', mood: '😐', label: 'Neutral' },
    { date: '2024-01-04', mood: '😄', label: 'Very Happy' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
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
      </View>
    </ScrollView>
  );
}

const createStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: 30,
  },
  historyItem: {
    flexDirection: 'row',
    backgroundColor: theme.colors.card,
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    alignItems: 'center',
  },
  moodEmoji: {
    fontSize: 30,
    marginRight: 15,
  },
  historyText: {
    flex: 1,
  },
  moodLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
  },
  dateText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
});