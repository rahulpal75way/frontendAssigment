import { Avatar, Typography } from "@mui/material";
import { ArrowUpward, ArrowDownward } from "@mui/icons-material";

const RecentTransactionCard = ({ txn, isSender, otherName, amount }) => {
  return (
    <div
      key={txn.id}
      className="flex items-center justify-between p-4 rounded-2xl bg-white/50 hover:bg-white/70 transition-all duration-200"
    >
      <div className="flex items-center space-x-4">
        <Avatar className="w-12 h-12 bg-gradient-to-r from-gray-400 to-gray-600">
          {otherName.charAt(0)}
        </Avatar>
        <div>
          <Typography variant="body1" className="font-medium text-gray-800">
            {isSender ? `To: ${otherName}` : `From: ${otherName}`}
          </Typography>
          <Typography variant="body2" className="text-gray-500">
            {txn.type} • {txn.status}
          </Typography>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Typography
          variant="body1"
          className={`font-semibold ${
            isSender ? "text-red-600" : "text-green-600"
          }`}
        >
          {isSender ? "-" : "+"}₹{amount}
        </Typography>
        {isSender ? (
          <ArrowUpward className="text-red-600 text-sm" />
        ) : (
          <ArrowDownward className="text-green-600 text-sm" />
        )}
      </div>
    </div>
  );
};

export default RecentTransactionCard;
