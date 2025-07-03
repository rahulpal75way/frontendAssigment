import { Card, Typography, Box, IconButton, Chip } from "@mui/material";
import { TrendingUp, TrendingDown, MoreVert } from "@mui/icons-material";

const StatsCard = ({ stat }) => {
  return (
    <Card
      elevation={0}
      className="relative overflow-hidden backdrop-blur-lg bg-white/70 border border-white/20 hover:shadow-xl transition-all duration-300 hover:scale-105"
      sx={{
        borderRadius: 3,
        background: "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
      }}
    >
      <Box className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div
            className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${stat.color} flex items-center justify-center text-white shadow-lg`}
          >
            {stat.icon}
          </div>
          <IconButton size="small" className="text-gray-400">
            <MoreVert />
          </IconButton>
        </div>
        <Typography variant="h4" className="font-bold text-gray-800 mb-2">
          {stat.value}
        </Typography>
        <div className="flex items-center justify-between">
          <Typography variant="body2" className="text-gray-600">
            {stat.title}
          </Typography>
          <Chip
            label={stat.change}
            size="small"
            className={`${
              stat.trend === "up"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
            icon={
              stat.trend === "up" ? (
                <TrendingUp className="text-sm" />
              ) : (
                <TrendingDown className="text-sm" />
              )
            }
          />
        </div>
      </Box>
    </Card>
  );
};

export default StatsCard;
