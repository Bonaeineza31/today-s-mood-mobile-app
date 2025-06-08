import React, { createContext, useContext, useState } from 'react';


const ThemeContext = createContext();


export const useTheme = () => useContext(ThemeContext);


export const ThemeProvider = ({ children }) => {

  const theme = {
    colors: {
      background: '#F8F9FA',    
      card: '#FFFFFF',          
      text: '#333333',          
      textSecondary: '#666666',
      primary: '#FFD700',       
      border: '#EEEEEE',
      surface: '#FFFFFF',     
      error: '#FF6B6B',
    },
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};