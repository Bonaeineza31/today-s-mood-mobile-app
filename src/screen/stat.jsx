import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useTheme } from '../context/theme';

export default function StatsScreen() {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Mood Statistics</Text>
        
        <View style={styles.statCard}>
          <Text style={styles.statTitle}>This Week</Text>
          <Text style={styles.statValue}>😊 Most Common Mood</Text>
        </View>
        
        <View style={styles.statCard}>
          <Text style={styles.statTitle}>Average Mood</Text>
          <Text style={styles.statValue}>4.2 / 5.0</Text>
        </View>
        
        <View style={styles.statCard}>
          <Text style={styles.statTitle}>Streak</Text>
          <Text style={styles.statValue}>7 days</Text>
        </View>
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
  statCard: {
    backgroundColor: theme.colors.card,
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
  },
  statTitle: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
});