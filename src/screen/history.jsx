import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useTheme } from '../context/theme';
import AnimatedBackground from '../components/animations';
import MoodCard from '../components/moodcard'; // Use your animated component!

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
    { date: '2024-01-01', mood: '😄', label: 'Very Happy' },
  ];

  const handleCardPress = (entry) => {
    Alert.alert(
      'Mood Details',
      `On ${entry.date}, you were feeling ${entry.label} ${entry.mood}`
    );
  };

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
            <MoodCard
              key={index}
              mood={entry.mood}
              date={entry.date}
              label={entry.label}
              onPress={() => handleCardPress(entry)}
            />
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
});