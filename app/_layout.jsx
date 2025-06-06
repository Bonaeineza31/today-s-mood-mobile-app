import React from 'react';
import { Stack } from 'expo-router';
import { AuthProvider } from '../src/context/authcontext';
import { ThemeProvider } from '../src/context/theme';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="login" />
          <Stack.Screen name="register" />
          <Stack.Screen name="main" />
        </Stack>
      </AuthProvider>
    </ThemeProvider>
  );
}