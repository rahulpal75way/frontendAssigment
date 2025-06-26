import React from "react";
import { useSelector } from "react-redux";
import {
  Card,
  Typography,
  Grid,
  Box,
  Avatar,
  LinearProgress,
  Chip,
  IconButton,
  Paper,
} from "@mui/material";
import {
  AccountBalanceWallet,
  TrendingUp,
  TrendingDown,
  Send,
  GetApp,
  MoreVert,
  Visibility,
  Add,
  ArrowUpward,
  ArrowDownward,
  History as HistoryIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const balance = useSelector((state) => state.wallet.balances[user.id] || 0);
  const navigate = useNavigate();
  const txns = useSelector((state) => state.txns.txns);
  const deposits = useSelector((state) => state.wallet.pendingDeposits);
  const withdrawals = useSelector((state) => state.wallet.pendingWithdrawals);


  const totalTransfers = txns
    .filter(
      (txn) =>
        (txn.from === user.id || txn.to === user.id) &&
        txn.status === "approved"
    )
    .reduce((sum, txn) => sum + txn.amount, 0);

  const totalDeposits = deposits
    .filter((d) => d.userId === user.id && d.status === "approved")
    .reduce((sum, d) => sum + d.amount, 0);

  const totalWithdrawals = withdrawals
    .filter((w) => w.userId === user.id && w.status === "approved")
    .reduce((sum, w) => sum + w.amount, 0);

  const stats = [
    {
      title: "Total Balance",
      value: `₹${balance.toFixed(2)}`,
      change: "+12.5%",
      trend: "up",
      icon: <AccountBalanceWallet className="text-2xl" />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Total Deposits",
      value: `₹${totalDeposits.toFixed(2)}`,
      change: "+10%",
      trend: "up",
      icon: <ArrowDownward className="text-2xl" />,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Total Withdrawals",
      value: `₹${totalWithdrawals.toFixed(2)}`,
      change: "-5%",
      trend: "down",
      icon: <ArrowUpward className="text-2xl" />,
      color: "from-red-500 to-pink-500",
    },
  ];

  const users = useSelector((state) => state.users.users);

  const getUserName = (id) => {
    if (!id) return "System";
    const user = users.find((u) => u.id === id);
    return user ? user.name : `User ${id}`;
  };

  const recentTransactions = txns
    .filter((txn) => txn.from === user.id || txn.to === user.id)
    .slice(-5) 
    .reverse(); 

  const quickActions = [
    {
      title: "Send Money",
      icon: <Send />,
      color: "from-blue-500 to-purple-600",
      path: "/transfer",
    },
    {
      title: "Withdraw",
      icon: <GetApp />,
      color: "from-green-500 to-teal-600",
      path: "/withdraw",
    },
    {
      title: "Add Money",
      icon: <Add />,
      color: "from-orange-500 to-red-600",
      path: "/deposite",
    },
    {
      title: "History",
      icon: <HistoryIcon />,
      color: "from-purple-500 to-pink-600",
      path: "/history",
    },
  ];

  console.log("totalDeposits,  =", totalDeposits, totalWithdrawals);
  console.log("user", user);
  console.log("deposits", deposits);
  console.log("withdrawals", withdrawals);
  console.log("txns", txns);
  console.log("user", user);

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <Typography variant="h4" className="font-bold text-gray-800 mb-2">
          Welcome back, {user.name}! 👋
        </Typography>
        <Typography variant="body1" className="text-gray-600">
          Here's what's happening with your wallet today.
        </Typography>
      </div>

      {/* Stats Cards */}
      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} md={4} key={index}>
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

                <Typography
                  variant="h4"
                  className="font-bold text-gray-800 mb-2"
                >
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
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Quick Actions */}
        <Grid item xs={12} md={4}>
          <Card
            elevation={0}
            className="backdrop-blur-lg bg-white/70 border border-white/20 h-full"
            sx={{
              borderRadius: 3,
              background: "rgba(255, 255, 255, 0.8)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <Box className="p-6">
              <Typography
                variant="h6"
                className="font-semibold text-gray-800 mb-4"
              >
                Quick Actions
              </Typography>

              <div className="space-y-3">
                {quickActions.map((action, index) => (
                  <div
                    key={index}
                    className="flex items-center p-4 rounded-2xl bg-white/50 hover:bg-white/70 cursor-pointer transition-all duration-200 hover:scale-105"
                    onClick={() => navigate(action.path)}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-r ${action.color} flex items-center justify-center text-white mr-4`}
                    >
                      {action.icon}
                    </div>
                    <Typography
                      variant="body1"
                      className="font-medium text-gray-700"
                    >
                      {action.title}
                    </Typography>
                  </div>
                ))}
              </div>
            </Box>
          </Card>
        </Grid>

        {/* Recent Transactions */}
        <Grid item xs={12} md={8}>
          <Card
            elevation={0}
            className="backdrop-blur-lg bg-white/70 border border-white/20 h-full"
            sx={{
              borderRadius: 3,
              background: "rgba(255, 255, 255, 0.8)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <Box className="p-6">
              <div className="flex items-center justify-between mb-6">
                <Typography
                  variant="h6"
                  className="font-semibold text-gray-800"
                >
                  Recent Transactions
                </Typography>
                <IconButton size="small" className="text-gray-400">
                  <Visibility />
                </IconButton>
              </div>

              <div className="space-y-4">
                {recentTransactions.map((txn) => {
                  const isSender = txn.from === user.id;
                  const otherPartyId = isSender ? txn.to : txn.from;
                  const otherName = getUserName(otherPartyId);
                  const amount = txn.amount;

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
                          <Typography
                            variant="body1"
                            className="font-medium text-gray-800"
                          >
                            {isSender
                              ? `To: ${otherName}`
                              : `From: ${otherName}`}
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
                })}
              </div>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default UserDashboard;
