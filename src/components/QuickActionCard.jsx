import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const QuickActionCard = ({ action }) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex items-center p-4 rounded-2xl bg-white/50 hover:bg-white/70 cursor-pointer transition-all duration-200 hover:scale-105"
      onClick={() => navigate(action.path)}
    >
      <div
        className={`w-10 h-10 rounded-xl bg-gradient-to-r ${action.color} flex items-center justify-center text-white mr-4`}
      >
        {action.icon}
      </div>
      <Typography variant="body1" className="font-medium text-gray-700">
        {action.title}
      </Typography>
    </div>
  );
};

export default QuickActionCard;
