import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useTheme } from '../context/theme';
import { useAuth } from '../context/authcontext';

export default function ProfileScreen() {
  const theme = useTheme();
  const { logout } = useAuth();
  const styles = createStyles(theme);

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
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Profile</Text>
        
        <View style={styles.profileCard}>
          <Text style={styles.profileEmoji}>👤</Text>
          <Text style={styles.profileName}>User</Text>
          <Text style={styles.profileEmail}>user@example.com</Text>
        </View>
        
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
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
  profileCard: {
    backgroundColor: theme.colors.card,
    borderRadius: 15,
    padding: 30,
    alignItems: 'center',
    marginBottom: 30,
  },
  profileEmoji: {
    fontSize: 60,
    marginBottom: 15,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 5,
  },
  profileEmail: {
    fontSize: 16,
    color: theme.colors.textSecondary,
  },
  logoutButton: {
    backgroundColor: '#FF6B6B',
    borderRadius: 15,
    paddingVertical: 15,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});