import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light'); // Tema inicial: claro

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const themeStyles = {
    dark: {
      backgroundColor: '#1a1a1a',
      color: '#ffffff',
      buttonBackground: '#333333',
      buttonColor: '#ffffff',
      inputBackground: '#2a2a2a',
      inputColor: '#ffffff',
    },
    light: {
      backgroundColor: '#f5f5f5',
      color: '#000000',
      buttonBackground: '#ffffff',
      buttonColor: '#000000',
      inputBackground: '#ffffff',
      inputColor: '#000000',
    },
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, themeStyles: themeStyles[theme] }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);