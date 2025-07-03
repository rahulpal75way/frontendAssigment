// ThemeContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { darkTheme, theme } from "../theme";

// Create Theme Context
const ThemeContext = createContext();

// Custom hook to use theme context
export const useThemeMode = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeMode must be used within a ThemeContextProvider");
  }
  return context;
};

// Theme Provider Component
export const ThemeContextProvider = ({ children }) => {
  // Get initial theme from localStorage or default to light
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme-mode");
    return savedTheme === "dark";
  });

  // Toggle theme function
  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Save theme preference to localStorage
  useEffect(() => {
    localStorage.setItem("theme-mode", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  // Apply theme to document body for global styles
  useEffect(() => {
    const currentTheme = isDarkMode ? darkTheme : theme;
    document.body.style.backgroundColor =
      currentTheme.palette.background.default;
    document.body.style.color = currentTheme.palette.text.primary;
    document.body.style.transition =
      "background-color 0.3s ease, color 0.3s ease";
  }, [isDarkMode]);

  const value = {
    isDarkMode,
    toggleTheme,
    themeName: isDarkMode ? "dark" : "light",
  };

  return (
    <ThemeContext.Provider value={value}>
      <ThemeProvider theme={isDarkMode ? darkTheme : theme}>
        <CssBaseline /> {/* Provides consistent CSS baseline */}
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
