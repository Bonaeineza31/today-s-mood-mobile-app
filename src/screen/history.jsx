import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Alert,} from 'react-native';
import { Feather } from '@expo/vector-icons';
import AnimatedBackground from '../components/animations';

export default function HistoryScreen() {
  const moodHistory = [
    { date: '2024-01-06', mood: '😊', label: 'Pretty Good', value: 4, note: 'Had a great lunch with friends' },
    { date: '2024-01-05', mood: '😐', label: 'Just Okay', value: 3, note: 'Work was stressful' },
    { date: '2024-01-04', mood: '😄', label: 'Amazing!', value: 5, note: 'Got promoted at work!' },
    { date: '2024-01-03', mood: '😔', label: 'Not Great', value: 2, note: 'Feeling a bit lonely' },
    { date: '2024-01-02', mood: '😊', label: 'Pretty Good', value: 4, note: 'Nice weekend with family' },
  ];

  const getMoodColor = (value) => {
    switch(value) {
      case 5: return '#FFD93D';
      case 4: return '#6BCF7F';
      case 3: return '#74C0FC';
      case 2: return '#A78BFA';
      case 1: return '#F687B3';
      default: return '#74C0FC';
    }
  };

  const handleCardPress = (entry) => {
    Alert.alert(
      `${entry.date} - ${entry.label}`,
      entry.note || 'No notes for this day'
    );
  };

  return (
    <View style={styles.container}>
      <AnimatedBackground />
      
      <SafeAreaView style={styles.safeArea}>
        <ScrollView 
          style={styles.scrollView} 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.headerCard}>
            <Text style={styles.headerEmoji}>📅</Text>
            <Text style={styles.title}>Your Mood Journey</Text>
            <Text style={styles.subtitle}>Reflecting on your emotional path</Text>
          </View>
          
          {moodHistory.map((entry, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.historyCard}
              onPress={() => handleCardPress(entry)}
            >
              <View style={styles.cardLeft}>
                <View style={[styles.moodIndicator, { backgroundColor: getMoodColor(entry.value) }]}>
                  <Text style={styles.moodEmoji}>{entry.mood}</Text>
                </View>
              </View>
              
              <View style={styles.cardContent}>
                <Text style={styles.moodLabel}>{entry.label}</Text>
                <Text style={styles.dateText}>{entry.date}</Text>
                {entry.note && (
                  <Text style={styles.noteText} numberOfLines={2}>
                    {entry.note}
                  </Text>
                )}
              </View>
              
              <View style={styles.cardRight}>
                <Feather name="chevron-right" size={20} color="#A0AEC0" />
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

// All styles are inline - no external spacing references
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 120,
  },
  headerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 32,
    marginBottom: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  headerEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3748',
    marginTop: 8,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#718096',
    textAlign: 'center',
  },
  historyCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardLeft: {
    marginRight: 16,
  },
  moodIndicator: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moodEmoji: {
    fontSize: 24,
  },
  cardContent: {
    flex: 1,
  },
  moodLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 4,
  },
  noteText: {
    fontSize: 14,
    color: '#A0AEC0',
    fontStyle: 'italic',
  },
  cardRight: {
    marginLeft: 8,
  },
});