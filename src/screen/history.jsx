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
import MoodCard from '../components/moodcard';

export default function HistoryScreen() {
  const theme = useTheme();
  const styles = createStyles(theme);

  const moodHistory = [
    { date: '2024-01-06', mood: '😊', label: 'Happy' },
    { date: '2024-01-05', mood: '😐', label: 'Neutral' },
    { date: '2024-01-04', mood: '😄', label: 'Very Happy' },
    { date: '2024-01-03', mood: '😔', label: 'Sad' },
    { date: '2024-01-02', mood: '😊', label: 'Happy' },
  ];

  const handleCardPress = (entry) => {
    Alert.alert(
      'Mood Details',
      `On ${entry.date}, you were feeling ${entry.label} ${entry.mood}`
    );
  };

  return (
    <View style={styles.container}>
      {/* Animated background with floating smileys */}
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
    backgroundColor: 'transparent',
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 120,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
    marginTop: 20,
    textShadowColor: 'rgba(255, 255, 255, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});