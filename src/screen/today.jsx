import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useTheme } from '../context/theme';

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
  const [note, setNote] = useState('');

  const handleSaveMood = () => {
    if (!selectedMood) {
      Alert.alert('Please select a mood');
      return;
    }
    
    Alert.alert('Mood Saved!', `You're feeling ${selectedMood.label} today!`);
    // Here you would save to your database
  };

  const styles = createStyles(theme);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        
        <Text style={styles.title}>How are you feeling today?</Text>
        
        <View style={styles.moodGrid}>
          {moodOptions.map((mood) => (
            <TouchableOpacity
              key={mood.value}
              style={[
                styles.moodButton,
                selectedMood?.value === mood.value && styles.selectedMood,
                { borderColor: mood.color }
              ]}
              onPress={() => setSelectedMood(mood)}
            >
              <Text style={styles.moodEmoji}>{mood.emoji}</Text>
              <Text style={styles.moodLabel}>{mood.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {selectedMood && (
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveMood}>
            <Text style={styles.saveButtonText}>Save Mood</Text>
          </TouchableOpacity>
        )}
        
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
  moodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  moodButton: {
    width: '45%',
    backgroundColor: theme.colors.card,
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 2,
    borderColor: theme.colors.border,
  },
  selectedMood: {
    borderWidth: 3,
    transform: [{ scale: 1.05 }],
  },
  moodEmoji: {
    fontSize: 40,
    marginBottom: 8,
  },
  moodLabel: {
    fontSize: 14,
    color: theme.colors.text,
    textAlign: 'center',
    fontWeight: '500',
  },
  saveButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 15,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});