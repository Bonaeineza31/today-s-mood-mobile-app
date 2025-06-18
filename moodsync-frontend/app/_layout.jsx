import React from 'react';
import { Stack } from 'expo-router';
import { ThemeProvider } from '../src/context/theme';
import { AuthProvider } from '../src/context/authcontext';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <StatusBar style="dark" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: '#FFFFFF' }
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="login" />
          <Stack.Screen name="register" />
          <Stack.Screen name="forgotp" />
          <Stack.Screen name="reset-password" />
          <Stack.Screen 
            name="main" 
            options={{ 
              headerShown: false,
              // This prevents gesture navigation which might conflict with tab navigation
              gestureEnabled: false 
            }} 
          />
        </Stack>
      </AuthProvider>
    </ThemeProvider>
  );
}