// import AsyncStorage from '@react-native-async-storage/async-storage';

// const MOODS = [
//   { emoji: '😄', label: 'Amazing', value: 5, color: '#10b981' },
//   { emoji: '😊', label: 'Good', value: 4, color: '#3b82f6' },
//   { emoji: '😐', label: 'Okay', value: 3, color: '#f59e0b' },
//   { emoji: '😔', label: 'Low', value: 2, color: '#f97316' },
//   { emoji: '😢', label: 'Terrible', value: 1, color: '#ef4444' },
// ];

// const MOOD_ENTRIES_KEY = 'mood_entries';

// export const moodService = {
//   MOODS,

//   async getMoodEntries(userId) {
//     try {
//       const entries = await AsyncStorage.getItem(`${MOOD_ENTRIES_KEY}_${userId}`);
//       return entries ? JSON.parse(entries) : [];
//     } catch (error) {
//       console.error('Error getting mood entries:', error);
//       return [];
//     }
//   },

//   async saveMoodEntry(userId, entry) {
//     try {
//       const entries = await this.getMoodEntries(userId);
//       const newEntry = {
//         id: Date.now().toString(),
//         ...entry,
//         date: new Date().toISOString(),
//       };
      
//       entries.unshift(newEntry); // Add to beginning
//       await AsyncStorage.setItem(`${MOOD_ENTRIES_KEY}_${userId}`, JSON.stringify(entries));
//       return newEntry;
//     } catch (error) {
//       console.error('Error saving mood entry:', error);
//       throw error;
//     }
//   },

//   async deleteMoodEntry(userId, entryId) {
//     try {
//       const entries = await this.getMoodEntries(userId);
//       const filteredEntries = entries.filter(e => e.id !== entryId);
//       await AsyncStorage.setItem(`${MOOD_ENTRIES_KEY}_${userId}`, JSON.stringify(filteredEntries));
//     } catch (error) {
//       console.error('Error deleting mood entry:', error);
//       throw error;
//     }
//   },

//   async getMoodStats(userId) {
//     try {
//       const entries = await this.getMoodEntries(userId);
//       const now = new Date();
//       const thisWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
//       const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);

//       // Calculate average mood
//       const averageMood = entries.length > 0 
//         ? (entries.reduce((sum, entry) => sum + entry.mood.value, 0) / entries.length).toFixed(1)
//         : 0;

//       // Find most common mood
//       const moodCounts = {};
//       entries.forEach(entry => {
//         const moodLabel = entry.mood.label;
//         moodCounts[moodLabel] = (moodCounts[moodLabel] || 0) + 1;
//       });

//       let topMood = null;
//       let topMoodCount = 0;
//       Object.keys(moodCounts).forEach(mood => {
//         if (moodCounts[mood] > topMoodCount) {
//           topMood = MOODS.find(m => m.label === mood);
//           topMoodCount = moodCounts[mood];
//         }
//       });

//       return {
//         total: entries.length,
//         thisWeek: entries.filter(e => new Date(e.date) >= thisWeek).length,
//         thisMonth: entries.filter(e => new Date(e.date) >= thisMonth).length,
//         averageMood,
//         topMood,
//       };
//     } catch (error) {
//       console.error('Error getting mood stats:', error);
//       return { total: 0, thisWeek: 0, thisMonth: 0, averageMood: 0, topMood: null };
//     }
//   }
// };