import React, { useMemo, useCallback } from "react";
import { useSelector } from "react-redux";
import { Typography, Grid, Card, IconButton, Box } from "@mui/material";
import {
  Visibility,
  Send,
  GetApp,
  Add,
  History as HistoryIcon,
} from "@mui/icons-material";
import StatsCard from "../../components/StatsCard";
import QuickActionCard from "../../components/QuickActionCard";
import RecentTransactionCard from "../../components/RecentTransactionCard";



const UserDashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const balance = useSelector((state) => state.wallet.balances[user.id] || 0);
  const users = useSelector((state) => state.users.users);
  const txns = useSelector((state) => state.txns.txns);
  const deposits = useSelector((state) => state.wallet.pendingDeposits);
  const withdrawals = useSelector((state) => state.wallet.pendingWithdrawals);

  const totalTransfers = useMemo(
    () =>
      txns
        .filter(
          (txn) =>
            (txn.from === user.id || txn.to === user.id) &&
            txn.status === "approved"
        )
        .reduce((sum, txn) => sum + txn.amount, 0),
    [txns, user.id]
  );

  const totalDeposits = useMemo(
    () =>
      deposits
        .filter((d) => d.userId === user.id && d.status === "approved")
        .reduce((sum, d) => sum + d.amount, 0),
    [deposits, user.id]
  );

  const totalWithdrawals = useMemo(
    () =>
      withdrawals
        .filter((w) => w.userId === user.id && w.status === "approved")
        .reduce((sum, w) => sum + w.amount, 0),
    [withdrawals, user.id]
  );

  const getUserName = useCallback(
    (id) => {
      if (!id) return "System";
      const userObj = users.find((u) => u.id === id);
      return userObj ? userObj.name : `User ${id}`;
    },
    [users]
  );

  const stats = useMemo(
    () => [
      {
        title: "Total Balance",
        value: `₹${balance.toFixed(2)}`,
        change: "+12.5%",
        trend: "up",
        icon: <Send />,
        color: "from-blue-500 to-cyan-500",
      },
      {
        title: "Total Deposits",
        value: `₹${totalDeposits.toFixed(2)}`,
        change: "+10%",
        trend: "up",
        icon: <Add />,
        color: "from-green-500 to-emerald-500",
      },
      {
        title: "Total Withdrawals",
        value: `₹${totalWithdrawals.toFixed(2)}`,
        change: "-5%",
        trend: "down",
        icon: <GetApp />,
        color: "from-red-500 to-pink-500",
      },
    ],
    [balance, totalDeposits, totalWithdrawals]
  );

  const recentTransactions = useMemo(
    () =>
      txns
        .filter((txn) => txn.from === user.id || txn.to === user.id)
        .slice(-5)
        .reverse(),
    [txns, user.id]
  );

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

  return (
    <div className="space-y-6 p-5">
      <Typography variant="h4">Welcome back, {user.name} 👋</Typography>

      <Grid container spacing={3}>
        {stats.map((stat, idx) => (
          <Grid item xs={12} md={4} key={idx}>
            <StatsCard stat={stat} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card className="h-full">
            <Box className="p-6">
              <Typography variant="h6" className="mb-4">
                Quick Actions
              </Typography>
              <div className="space-y-3">
                {quickActions.map((action, idx) => (
                  <QuickActionCard key={idx} action={action} />
                ))}
              </div>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card className="h-full">
            <Box className="p-6">
              <div className="flex items-center justify-between mb-6">
                <Typography variant="h6">Recent Transactions</Typography>
                <IconButton size="small" className="text-gray-400">
                  <Visibility />
                </IconButton>
              </div>
              <div className="space-y-4">
                {recentTransactions.map((txn) => {
                  const isSender = txn.from === user.id;
                  const otherParty = isSender ? txn.to : txn.from;
                  const otherName = getUserName(otherParty);
                  return (
                    <RecentTransactionCard
                      key={txn.id}
                      txn={txn}
                      isSender={isSender}
                      otherName={otherName}
                      amount={txn.amount}
                    />
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
