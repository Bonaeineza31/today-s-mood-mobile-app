import React, { createContext, useContext, useState } from 'react';

// Create the theme context
const ThemeContext = createContext();

// Custom hook to use the theme context
export const useTheme = () => useContext(ThemeContext);

// Theme provider component
export const ThemeProvider = ({ children }) => {
  // Define your theme - keeping it clean, not solid yellow
  const theme = {
    colors: {
      background: '#F8F9FA',    // Light background, not yellow
      card: '#FFFFFF',          // White cards
      text: '#333333',          // Dark text
      textSecondary: '#666666',
      primary: '#FFD700',       // Yellow/gold for accents
      border: '#EEEEEE',
      surface: '#FFFFFF',       // White surface
      error: '#FF6B6B',
    },
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};