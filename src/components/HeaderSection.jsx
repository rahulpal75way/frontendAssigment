import React from "react";
import { Typography } from "@mui/material";
import { History } from "@mui/icons-material";

const HeaderSection = () => {
  return (
    <div className="text-center mb-6">
      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
        <History className="text-white text-2xl" />
      </div>

      <Typography
        variant="h4"
        className="font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent"
        gutterBottom
      >
        Transaction History
      </Typography>

      <Typography variant="body1" className="text-gray-600">
        View all your transaction activity
      </Typography>
    </div>
  );
};

export default HeaderSection;
