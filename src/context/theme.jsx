import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  const theme = {
    isDark,
    colors: {
      background: isDark ? '#1a1a1a' : '#ffeb3b', // Bright yellow background
      surface: isDark ? '#2d2d2d' : '#fff9c4', // Light yellow surface
      card: isDark ? '#374151' : '#ffffff',
      text: isDark ? '#ffffff' : '#1f2937',
      textSecondary: isDark ? '#d1d5db' : '#4a4a4a',
      primary: '#ff9800', // Orange for buttons
      primaryDark: '#f57c00',
      border: isDark ? '#4b5563' : '#fbc02d',
      accent: '#ffeb3b', // Yellow accent
    },
    toggleTheme: () => setIsDark(!isDark),
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};