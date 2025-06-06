import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
  SafeAreaView,
} from 'react-native';
import { useTheme } from '../context/theme';

// Using actual emoji images like in your screenshot
const moodOptions = [
  { 
    emoji: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-06-06%20at%2020.02.11_ca5b9cbd.jpg-wWS4jHUxzSpufRQwBzA6b6jxNhL4Fq.jpeg', 
    label: 'Very Happy', 
    value: 5, 
    imageStyle: { width: 70, height: 70 } 
  },
  { 
    emoji: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-06-06%20at%2020.02.11_ca5b9cbd.jpg-wWS4jHUxzSpufRQwBzA6b6jxNhL4Fq.jpeg', 
    label: 'Happy', 
    value: 4, 
    imageStyle: { width: 70, height: 70 } 
  },
  { 
    emoji: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-06-06%20at%2020.02.11_ca5b9cbd.jpg-wWS4jHUxzSpufRQwBzA6b6jxNhL4Fq.jpeg', 
    label: 'Neutral', 
    value: 3, 
    imageStyle: { width: 70, height: 70 } 
  },
  { 
    emoji: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-06-06%20at%2020.02.11_ca5b9cbd.jpg-wWS4jHUxzSpufRQwBzA6b6jxNhL4Fq.jpeg', 
    label: 'Sad', 
    value: 2, 
    imageStyle: { width: 70, height: 70 } 
  },
  { 
    emoji: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-06-06%20at%2020.02.11_ca5b9cbd.jpg-wWS4jHUxzSpufRQwBzA6b6jxNhL4Fq.jpeg', 
    label: 'Very Sad', 
    value: 1, 
    imageStyle: { width: 70, height: 70 } 
  },
];

export default function TodayScreen() {
  const theme = useTheme();
  const [selectedMood, setSelectedMood] = useState(null);

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
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        <View style={styles.moodGrid}>
          {moodOptions.map((mood, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.moodButton,
                selectedMood?.value === mood.value && styles.selectedMood,
              ]}
              onPress={() => setSelectedMood(mood)}
            >
              <Image 
                source={{ uri: mood.emoji }} 
                style={mood.imageStyle} 
                resizeMode="contain"
              />
              <Text style={styles.moodLabel}>{mood.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity 
          style={styles.saveButton} 
          onPress={handleSaveMood}
        >
          <Text style={styles.saveButtonText}>Save Mood</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (theme) => StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100, // Extra padding at bottom to avoid tab bar overlap
  },
  moodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  moodButton: {
    width: '48%',
    backgroundColor: theme.colors.card,
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedMood: {
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  moodLabel: {
    fontSize: 16,
    color: theme.colors.text,
    textAlign: 'center',
    fontWeight: '500',
    marginTop: 10,
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