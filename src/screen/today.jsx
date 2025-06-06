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
import MoodButton from '../components/moodbutton'; // Use your animated component!

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
    // Here you would save to your database
  };

  const styles = createStyles(theme);

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
  moodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  moodButtonContainer: {
    width: '48%', // Two buttons per row
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: theme.colors.primary,
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