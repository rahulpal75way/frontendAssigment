import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const CommissionSummaryCard = ({
  label,
  value,
  icon,
  gradientFrom = "from-gray-400",
  gradientTo = "to-gray-600",
}) => {
  return (
    <Card
      className="backdrop-blur-lg bg-white/80 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300"
      sx={{
        borderRadius: 3,
        background: "rgba(255, 255, 255, 0.85)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
      }}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <Typography
              variant="body2"
              className="text-gray-600 mb-1 capitalize"
            >
              {label}
            </Typography>
            <Typography variant="h5" className="font-bold text-gray-800">
              {value}
            </Typography>
          </div>
          <div
            className={`w-10 h-10 bg-gradient-to-r ${gradientFrom} ${gradientTo} rounded-full flex items-center justify-center`}
          >
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommissionSummaryCard;
