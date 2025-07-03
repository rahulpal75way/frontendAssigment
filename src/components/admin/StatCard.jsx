// components/StatCard.jsx
import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
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
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        background: "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.1)",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 20px 40px -5px rgba(0, 0, 0, 0.15)",
        },
      }}
    >
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {stat.title}
            </Typography>
            <Typography variant="h4" fontWeight={700} color="text.primary">
              {stat.value}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ${stat.amount.toLocaleString()}
            </Typography>
          </Box>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 3,
              background: stat.gradient,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
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
