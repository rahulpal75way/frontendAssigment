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
import { useGetUserTransactionsQuery, useGetWalletQuery } from "../../services/api";





const UserDashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const users = useSelector((state) => state.auth.users);


  const { data: txns = [], isLoading: txnsLoading } =
    useGetUserTransactionsQuery(user.id, {
      refetchOnMountOrArgChange: true,
      // pollingInterval: 3000, // optional: auto-refresh every 3s
    });

  const { data: walletData } = useGetWalletQuery(user.id, {
    refetchOnMountOrArgChange: true,
  });
  const balance = walletData?.balance || 0;

  console.log("Transactions:", txns);
  console.log("Wallet Balance:", walletData);


  const deposits = walletData?.deposits || [];
  const withdrawals = walletData?.withdrawals || [];

  const totalDeposits = useMemo(() => {
    return deposits
      .filter((d) => d.status === "approved")
      .reduce((sum, d) => sum + d.amount, 0);
  }, [deposits]);

  const totalWithdrawals = useMemo(() => {
    return withdrawals
      .filter((w) => w.action === "withdrawal" && w.status === "approved")
      .reduce((sum, w) => sum + w.amount, 0);
  }, [withdrawals]);

  // const totalTransfers = useMemo(() => {
  //   return withdrawals
  //     .filter((t) => t.action === "transfer" && t.status === "approved")
  //     .reduce((sum, t) => sum + t.amount, 0);
  // }, [withdrawals]);

  const recentTransactions = useMemo(() => {
    const allTxns = [...deposits, ...withdrawals];
    return allTxns
      .filter((txn) => txn.userId === user.id || txn.receiverId === user.id)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);
  }, [deposits, withdrawals, user.id]);

  

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

  console.log("loading", txnsLoading);

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
                  const isSender = txn.userId === user.id;
                  const otherParty = txn.receiverId || txn.userId;
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
