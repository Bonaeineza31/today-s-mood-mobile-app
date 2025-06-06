import React, { createContext, useContext, useState } from 'react';

// Create the theme context
const ThemeContext = createContext();

// Custom hook to use the theme context
export const useTheme = () => useContext(ThemeContext);

// Theme provider component
export const ThemeProvider = ({ children }) => {
  // Define your theme
  const theme = {
    colors: {
      // Yellow theme based on the screenshot
      background: '#FFEB3B', // Bright yellow background
      card: '#FFFFFF',       // White cards
      text: '#333333',       // Dark text
      textSecondary: '#666666',
      primary: '#FF9800',    // Orange for buttons
      border: '#EEEEEE',
      surface: '#FFFFFF',    // White surface
      error: '#FF6B6B',
    },
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};