import React from "react";
import { useThemeMode } from "../context/ThemeContext";
import { useTheme } from "@emotion/react";

const ThemeToggleButton = () => {
  const { isDarkMode, toggleTheme } = useThemeMode();
  const theme = useTheme();

  const buttonStyle = {
    position: "fixed",
    top: "20px",
    right: "20px",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    border: "none",
    borderRadius: "50%",
    width: "60px",
    height: "60px",
    cursor: "pointer",
    fontSize: "24px",
    boxShadow: theme.shadows[4],
    transition: "all 0.3s ease",
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <button
      style={buttonStyle}
      onClick={toggleTheme}
      title={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
      onMouseEnter={(e) => {
        e.target.style.transform = "scale(1.1)";
        e.target.style.boxShadow = theme.shadows[6];
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = "scale(1)";
        e.target.style.boxShadow = theme.shadows[4];
      }}
    >
      {isDarkMode ? "☀️" : "🌙"}
    </button>
  );
};

export default ThemeToggleButton;
