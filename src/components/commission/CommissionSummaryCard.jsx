import React from "react";
import { Card, CardContent, Typography, Box, useTheme } from "@mui/material";

const CommissionSummaryCard = ({
  label,
  value,
  icon,
  gradientFrom = "#9CA3AF", // gray-400
  gradientTo = "#4B5563", // gray-600
}) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 2,
        backgroundColor: isDarkMode
          ? "rgba(18, 18, 18, 0.85)"
          : "rgba(255, 255, 255, 0.85)",
        backdropFilter: "blur(20px)",
        border: `1px solid ${
          isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"
        }`,
        boxShadow: isDarkMode
          ? "0 8px 24px rgba(0, 0, 0, 0.4)"
          : "0 8px 24px rgba(0, 0, 0, 0.1)",
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: isDarkMode
            ? "0 16px 32px rgba(0, 0, 0, 0.5)"
            : "0 16px 32px rgba(0, 0, 0, 0.15)",
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography
              variant="body2"
              sx={{
                color: isDarkMode
                  ? "rgba(255,255,255,0.7)"
                  : theme.palette.text.secondary,
                textTransform: "capitalize",
                mb: 0.5,
              }}
            >
              {label}
            </Typography>
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{
                color: isDarkMode
                  ? "rgba(255,255,255,0.95)"
                  : theme.palette.text.primary,
              }}
            >
              {value}
            </Typography>
          </Box>

          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: `linear-gradient(to right, ${gradientFrom}, ${gradientTo})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              boxShadow: isDarkMode
                ? "0 4px 12px rgba(0, 0, 0, 0.3)"
                : "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CommissionSummaryCard;
