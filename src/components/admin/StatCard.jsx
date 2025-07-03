// components/StatCard.jsx
import React from "react";
import { Card, CardContent, Typography, Box, useTheme } from "@mui/material";
import {
  TrendingUp,
  TrendingDown,
  SwapHoriz,
  Pending as PendingIcon,
} from "@mui/icons-material";

const iconMap = {
  up: <TrendingUp />,
  down: <TrendingDown />,
  transfer: <SwapHoriz />,
  pending: <PendingIcon />,
};

const StatCard = ({ stat }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 2,
        background: isDarkMode
          ? "rgba(18, 18, 18, 0.8)"
          : "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(20px)",
        border: `1px solid ${
          isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.2)"
        }`,
        boxShadow: isDarkMode
          ? "0 10px 30px -5px rgba(0, 0, 0, 0.3)"
          : "0 10px 30px -5px rgba(0, 0, 0, 0.1)",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: isDarkMode
            ? "0 20px 40px -5px rgba(0, 0, 0, 0.4)"
            : "0 20px 40px -5px rgba(0, 0, 0, 0.15)",
        },
      }}
    >
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography
              variant="body2"
              color="text.secondary"
              gutterBottom
              sx={{
                color: isDarkMode
                  ? "rgba(255, 255, 255, 0.7)"
                  : "text.secondary",
              }}
            >
              {stat.title}
            </Typography>
            <Typography
              variant="h4"
              fontWeight={700}
              sx={{
                color: isDarkMode ? "rgba(255, 255, 255, 0.9)" : "text.primary",
              }}
            >
              {stat.value}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: isDarkMode
                  ? "rgba(255, 255, 255, 0.6)"
                  : "text.secondary",
              }}
            >
              ${stat.amount.toLocaleString()}
            </Typography>
          </Box>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2,
              background: stat.gradient,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              boxShadow: isDarkMode
                ? "0 4px 12px rgba(0, 0, 0, 0.3)"
                : "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            {iconMap[stat.icon] || stat.icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StatCard;
