// Code-split & optimized AdminDashboard.jsx

import React, { useState, useMemo, useCallback, lazy, Suspense } from "react";
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Chip,
  Grid,
  Fade,
} from "@mui/material";
import { Dashboard as DashboardIcon } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  handleApproveDeposit,
  handleApproveWithdrawal,
  handleRejectDeposit,
  handleRejectWithdrawal,
} from "../../features/wallet/walletSlice";
import {
  approveTransfer,
  rejectTransfer,
} from "../../features/transaction/txnSlice";

const StatCard = lazy(() => import("../../components/admin/StatCard"));
const TransactionTabs = lazy(() => import("../../components/admin/TransactionTabs"));
const TransactionTable = lazy(() =>import("../../components/admin/TransactionTable"));

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("deposits");

  const { pendingDeposits, pendingWithdrawals } = useSelector(
    (state) => state.wallet
  );
  const { txns } = useSelector((state) => state.txns);

  const handleApprove = useCallback(
    (id, type) => {
      if (type === "deposit") dispatch(handleApproveDeposit(id));
      else if (type === "withdraw") dispatch(handleApproveWithdrawal(id));
      else if (type === "transfer") dispatch(approveTransfer({ id }));
    },
    [dispatch]
  );

  const handleReject = useCallback(
    (id, type) => {
      if (type === "deposit") dispatch(handleRejectDeposit(id));
      else if (type === "withdraw") dispatch(handleRejectWithdrawal(id));
      else if (type === "transfer") dispatch(rejectTransfer({ id }));
    },
    [dispatch]
  );

  const pendingDepositsData = useMemo(
    () => pendingDeposits.filter((d) => d.status === "pending"),
    [pendingDeposits]
  );
  const pendingWithdrawalsData = useMemo(
    () => pendingWithdrawals.filter((w) => w.status === "pending"),
    [pendingWithdrawals]
  );

  const pendingTransfersData = useMemo(
    () =>
      txns.filter(
        (t) =>
          t.from &&
          t.to &&
          (!t.status || t.status === "pending") &&
          ["local", "international"].includes(t.type)
      ),
    [txns]
  );

  const rejectedDeposits = useMemo(
    () => pendingDeposits.filter((d) => d.status === "rejected"),
    [pendingDeposits]
  );
  const rejectedWithdrawals = useMemo(
    () => pendingWithdrawals.filter((w) => w.status === "rejected"),
    [pendingWithdrawals]
  );
  const rejectedTransfers = useMemo(
    () =>
      txns.filter(
        (t) =>
          t.status === "rejected" &&
          t.from &&
          t.to &&
          ["local", "international"].includes(t.type)
      ),
    [txns]
  );

  const stats = useMemo(
    () => [
      {
        title: "Pending Deposits",
        value: pendingDepositsData.length,
        amount: pendingDepositsData.reduce((sum, d) => sum + d.amount, 0),
        icon: "up",
        color: "success",
        gradient: "linear-gradient(135deg, #4ade80 0%, #22c55e 100%)",
      },
      {
        title: "Pending Withdrawals",
        value: pendingWithdrawalsData.length,
        amount: pendingWithdrawalsData.reduce((sum, w) => sum + w.amount, 0),
        icon: "down",
        color: "error",
        gradient: "linear-gradient(135deg, #f87171 0%, #ef4444 100%)",
      },
      {
        title: "Pending Transfers",
        value: pendingTransfersData.length,
        amount: pendingTransfersData.reduce((sum, t) => sum + t.amount, 0),
        icon: "transfer",
        color: "warning",
        gradient: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
      },
      {
        title: "Total Pending",
        value:
          pendingDepositsData.length +
          pendingWithdrawalsData.length +
          pendingTransfersData.length,
        amount:
          pendingDepositsData.reduce((sum, d) => sum + d.amount, 0) +
          pendingWithdrawalsData.reduce((sum, w) => sum + w.amount, 0) +
          pendingTransfersData.reduce((sum, t) => sum + t.amount, 0),
        icon: "pending",
        color: "primary",
        gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      },
    ],
    [pendingDepositsData, pendingWithdrawalsData, pendingTransfersData]
  );

  const tabData = useMemo(
    () => [
      {
        id: "deposits",
        label: "Deposits",
        data: pendingDepositsData,
        type: "deposit",
      },
      {
        id: "withdrawals",
        label: "Withdrawals",
        data: pendingWithdrawalsData,
        type: "withdraw",
      },
      {
        id: "transfers",
        label: "Transfers",
        data: pendingTransfersData,
        type: "transfer",
      },
      {
        id: "rejected",
        label: "Rejected",
        data: [
          ...rejectedDeposits,
          ...rejectedWithdrawals,
          ...rejectedTransfers,
        ],
        type: "mixed",
      },
    ],
    [
      pendingDepositsData,
      pendingWithdrawalsData,
      pendingTransfersData,
      rejectedDeposits,
      rejectedWithdrawals,
      rejectedTransfers,
    ]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Container maxWidth="xl" sx={{ py: 4, position: "relative", zIndex: 1 }}>
        <Paper
          elevation={0}
          sx={{
            borderRadius: 4,
            padding: 3,
            mb: 4,
            background: "rgba(255, 255, 255, 0.85)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <DashboardIcon className="text-white" />
            </div>
            <Box>
              <Typography
                variant="h4"
                className="font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent"
              >
                Admin Dashboard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Manage pending transactions and monitor system activity
              </Typography>
            </Box>
          </Box>
        </Paper>

        <Suspense fallback={<div>Loading stats...</div>}>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {stats.map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <StatCard stat={stat} delay={300 * (index + 1)} />
              </Grid>
            ))}
          </Grid>
        </Suspense>

        <Paper
          elevation={0}
          sx={{
            borderRadius: 4,
            background: "rgba(255, 255, 255, 0.85)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            overflow: "hidden",
          }}
        >
          <Suspense fallback={<div>Loading tabs...</div>}>
            <TransactionTabs
              tabs={tabData}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            <Box sx={{ p: 3 }}>
              {tabData.map((tab) => (
                <Box
                  key={tab.id}
                  sx={{ display: activeTab === tab.id ? "block" : "none" }}
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    mb={3}
                  >
                    <Typography variant="h6" fontWeight={600}>
                      Pending {tab.label}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {tab.data.length} transactions
                    </Typography>
                  </Box>
                  <TransactionTable
                    data={tab.data}
                    type={tab.type}
                    onApprove={handleApprove}
                    onReject={handleReject}
                  />
                </Box>
              ))}
            </Box>
          </Suspense>
        </Paper>
      </Container>
    </div>
  );
};

export default AdminDashboard;
