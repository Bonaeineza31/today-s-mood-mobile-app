import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from 'react-native';
import { useTheme } from '../context/theme';
import AnimatedBackground from '../components/animations';
import MoodButton from '../components/moodbutton';

const moodOptions = [
  { emoji: '😄', label: 'Very Happy', value: 5, color: '#FFD700' },
  { emoji: '😊', label: 'Happy', value: 4, color: '#90EE90' },
  { emoji: '😐', label: 'Neutral', value: 3, color: '#87CEEB' },
  { emoji: '😔', label: 'Sad', value: 2, color: '#DDA0DD' },
  { emoji: '😢', label: 'Very Sad', value: 1, color: '#F0A0A0' },
];

export default function TodayScreen() {
  const theme = useTheme();
  const [selectedMood, setSelectedMood] = useState(null);

  const handleMoodPress = (mood) => {
    setSelectedMood(mood);
  };

  const handleSaveMood = () => {
    if (!selectedMood) {
      Alert.alert('Please select a mood');
      return;
    }
    
    Alert.alert('Mood Saved!', `You're feeling ${selectedMood.label} today! 🎉`);
  };

  const styles = createStyles(theme);

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
          <Text style={styles.title}>How are you feeling today?</Text>
          
          <View style={styles.moodGrid}>
            {moodOptions.map((mood, index) => (
              <View key={index} style={styles.moodButtonContainer}>
                <MoodButton
                  mood={mood}
                  selected={selectedMood?.value === mood.value}
                  onPress={handleMoodPress}
                />
              </View>
            ))}
          </View>

          {selectedMood && (
            <TouchableOpacity style={styles.saveButton} onPress={handleSaveMood}>
              <Text style={styles.saveButtonText}>Save Mood</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const createStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent', // Let the animated background show through
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
  moodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  moodButtonContainer: {
    width: '48%',
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: '#FFD700',
    borderRadius: 15,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});