import React, { useState, useMemo, useCallback, lazy, Suspense } from "react";
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  CircularProgress,
  useTheme,
} from "@mui/material";
import { Dashboard as DashboardIcon } from "@mui/icons-material";
import {
  // useDispatch,
  useSelector,
} from "react-redux";
import {
  useGetAllTransactionsQuery,
  useApproveTransactionMutation,
  useRejectTransactionMutation,
} from "../../services/api";

const StatCard = lazy(() => import("../../components/admin/StatCard"));
const TransactionTabs = lazy(() =>
  import("../../components/admin/TransactionTabs")
);
const TransactionTable = lazy(() =>
  import("../../components/admin/TransactionTable")
);

const AdminDashboard = () => {
  // const dispatch = useDispatch();
  const [approveTransaction] = useApproveTransactionMutation();
  const [rejectTransaction] = useRejectTransactionMutation();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const [activeTab, setActiveTab] = useState("deposits");
  const user = useSelector((state) => state.auth.user);

  const { data: txns = [], isLoading: txnsLoading } =
    useGetAllTransactionsQuery(user.id, {
      refetchOnMountOrArgChange: true,
    });

  const handleApprove = useCallback(
    async (id) => {
      try {
        await approveTransaction(id).unwrap();
      } catch (err) {
        console.error("Approval failed", err);
      }
    },
    [approveTransaction]
  );

  const handleReject = useCallback(
    async (id) => {
      try {
        await rejectTransaction(id).unwrap();
      } catch (err) {
        console.error("Rejection failed", err);
      }
    },
    [rejectTransaction]
  );

  // PENDING
  const pendingDepositsData = useMemo(
    () => txns.filter((t) => t.type === "deposit" && t.status === "pending"),
    [txns]
  );
  const pendingWithdrawalsData = useMemo(
    () => txns.filter((t) => t.type === "withdrawal" && t.status === "pending"),
    [txns]
  );
  const pendingTransfersData = useMemo(
    () =>
      txns.filter(
        (t) =>
          ["local", "intl"].includes(t.type) &&
          t.status === "pending" &&
          t.user &&
          t.receiver
      ),
    [txns]
  );

  // REJECTED
  const rejectedDeposits = useMemo(
    () => txns.filter((t) => t.type === "deposit" && t.status === "rejected"),
    [txns]
  );
  const rejectedWithdrawals = useMemo(
    () =>
      txns.filter((t) => t.type === "withdrawal" && t.status === "rejected"),
    [txns]
  );
  const rejectedTransfers = useMemo(
    () =>
      txns.filter(
        (t) =>
          ["local", "intl"].includes(t.type) &&
          t.status === "rejected" &&
          t.user &&
          t.receiver
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
    <Box
      sx={{
        minHeight: "100vh",
        background: isDarkMode
          ? "linear-gradient(to bottom right, #1e1e1e, #2c2c2c)"
          : "linear-gradient(to bottom right, #ebf4ff, #fce7f3)",
        py: 4,
      }}
    >
      <Container maxWidth="xl">
        <Paper
          elevation={0}
          sx={{
            borderRadius: 2,
            p: 3,
            mb: 4,
            backgroundColor: isDarkMode
              ? "rgba(30,30,30,0.85)"
              : "rgba(255,255,255,0.85)",
            backdropFilter: "blur(20px)",
            border: `1px solid ${
              isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"
            }`,
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
                sx={{
                  background: isDarkMode
                    ? "linear-gradient(to right, #f3f4f6, #d1d5db)"
                    : "linear-gradient(to right, #1f2937, #374151)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Admin Dashboard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Manage pending transactions and monitor system activity
              </Typography>
            </Box>
          </Box>
        </Paper>

        {/* Stat Cards */}
        <Suspense
          fallback={
            <CircularProgress sx={{ display: "block", mx: "auto", my: 4 }} />
          }
        >
          {txnsLoading ? (
            <Box display="flex" justifyContent="center" my={5}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              {/* existing stat cards */}
              <Grid container spacing={3} sx={{ mb: 4 }}>
                {stats.map((stat, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <StatCard stat={stat} delay={300 * (index + 1)} />
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </Suspense>

        {/* Transaction Tabs + Table */}
        <Paper
          elevation={0}
          sx={{
            borderRadius: 2,
            backgroundColor: isDarkMode
              ? "rgba(30,30,30,0.85)"
              : "rgba(255,255,255,0.85)",
            backdropFilter: "blur(20px)",
            border: `1px solid ${
              isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"
            }`,
            overflow: "hidden",
          }}
        >
          <Suspense
            fallback={
              <CircularProgress sx={{ display: "block", mx: "auto", my: 4 }} />
            }
          >
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
                    onApprove={(id) => handleApprove(id)}
                    onReject={(id) => handleReject(id)}
                  />
                </Box>
              ))}
            </Box>
          </Suspense>
        </Paper>
      </Container>
    </Box>
  );
};

export default AdminDashboard;
