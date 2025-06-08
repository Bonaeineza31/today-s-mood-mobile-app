import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { 
  Ionicons, 
  MaterialIcons, 
  FontAwesome, 
  AntDesign, 
  Entypo, 
  Feather,
  MaterialCommunityIcons,
  SimpleLineIcons 
} from '@expo/vector-icons';

export default function IconShowcase() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Available Icon Sets</Text>
      
      <View style={styles.iconSection}>
        <Text style={styles.sectionTitle}>Feather Icons (Clean & Modern)</Text>
        <View style={styles.iconRow}>
          <Feather name="heart" size={24} color="#FF6B9D" />
          <Feather name="smile" size={24} color="#4ECDC4" />
          <Feather name="message-circle" size={24} color="#6C63FF" />
          <Feather name="calendar" size={24} color="#FFE66D" />
          <Feather name="user" size={24} color="#A78BFA" />
          <Feather name="trending-up" size={24} color="#6BCF7F" />
        </View>
      </View>

      <View style={styles.iconSection}>
        <Text style={styles.sectionTitle}>Material Community Icons</Text>
        <View style={styles.iconRow}>
          <MaterialCommunityIcons name="emoticon-happy" size={24} color="#FFD93D" />
          <MaterialCommunityIcons name="chat-processing" size={24} color="#FF6B9D" />
          <MaterialCommunityIcons name="calendar-heart" size={24} color="#4ECDC4" />
          <MaterialCommunityIcons name="chart-line" size={24} color="#6C63FF" />
          <MaterialCommunityIcons name="account-heart" size={24} color="#A78BFA" />
        </View>
      </View>

      <View style={styles.iconSection}>
        <Text style={styles.sectionTitle}>AntDesign Icons</Text>
        <View style={styles.iconRow}>
          <AntDesign name="heart" size={24} color="#FF6B9D" />
          <AntDesign name="smile-circle" size={24} color="#4ECDC4" />
          <AntDesign name="message1" size={24} color="#6C63FF" />
          <AntDesign name="calendar" size={24} color="#FFE66D" />
          <AntDesign name="user" size={24} color="#A78BFA" />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F8F9FF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#2D3748',
  },
  iconSection: {
    marginBottom: 30,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#2D3748',
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});