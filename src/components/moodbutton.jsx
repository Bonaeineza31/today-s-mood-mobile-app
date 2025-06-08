import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from 'react-native';
import { useAuth } from '../context/authcontext';
import AnimatedBackground from '../components/animations';

export default function ProfileScreen() {
  const { logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', onPress: logout },
      ]
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
            <Text style={styles.headerEmoji}>👤</Text>
            <Text style={styles.title}>Your Profile</Text>
            <Text style={styles.subtitle}>Manage your mood journey</Text>
          </View>
          
          <View style={styles.profileCard}>
            <Text style={styles.profileEmoji}>😊</Text>
            <Text style={styles.profileName}>Mood Tracker</Text>
            <Text style={styles.profileEmail}>user@moodsync.com</Text>
          </View>
          
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

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
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#718096',
    textAlign: 'center',
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 30,
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileEmoji: {
    fontSize: 60,
    marginBottom: 15,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 8,
  },
  profileEmail: {
    fontSize: 16,
    color: '#718096',
  },
  logoutButton: {
    backgroundColor: '#FF6B6B',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});