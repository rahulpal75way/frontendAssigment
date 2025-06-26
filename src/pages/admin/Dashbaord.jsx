
import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Card,
  CardContent,
  Grid,
  Avatar,
  Fade,
  Tooltip,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  AccountBalance,
  TrendingUp,
  TrendingDown,
  SwapHoriz,
  CheckCircle,
  Pending,
  AttachMoney,
  Group,
  Visibility,
  MoreVert,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  approveWithdrawal,
  handleApproveWithdrawal,
  handleRejectDeposit,
  handleRejectWithdrawal,
} from "../../features/wallet/walletSlice";
import { approveTransfer, rejectTransfer } from "../../features/transaction/txnSlice";
import { handleApproveDeposit } from "../../features/wallet/walletSlice";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("deposits");

  const { pendingDeposits, pendingWithdrawals } = useSelector(
    (state) => state.wallet
  );
  const { txns } = useSelector((state) => state.txns);
  const rejectedDeposits = pendingDeposits.filter(
    (d) => d.status === "rejected"
  );
  const rejectedWithdrawals = pendingWithdrawals.filter(
    (w) => w.status === "rejected"
  );
  const rejectedTransfers = txns.filter(
    (t) =>
      t.status === "rejected" &&
      t.from !== null &&
      t.to !== null &&
      (t.type === "local" || t.type === "international")
  );


  const handleApprove = (id, type) => {
    if (type === "deposit") {
      dispatch(handleApproveDeposit(id));
    } else if (type === "withdraw") {
      dispatch(handleApproveWithdrawal(id));
    } else if (type === "transfer") {
      dispatch(approveTransfer({ id }));
    }
  };

  const handleReject = (id, type) => {
    if (type === "deposit") {
      dispatch(handleRejectDeposit(id));
    } else if (type === "withdraw") {
      dispatch(handleRejectWithdrawal(id));
    } else if (type === "transfer") {
      dispatch(rejectTransfer({ id }));
    }
  };
  


  const pendingDepositsData = pendingDeposits.filter(
    (d) => d.status === "pending"
  );
  const pendingWithdrawalsData = pendingWithdrawals.filter(
    (w) => w.status === "pending"
  );


  const pendingTransfersData = txns.filter(
    (t) =>
      t.from !== null &&
      t.to !== null &&
      (t.status === "pending" || !t.status) &&
      t.type &&
      (t.type === "local" || t.type === "international")
  );


  const stats = [
    {
      title: "Pending Deposits",
      value: pendingDepositsData.length,
      amount: pendingDepositsData.reduce((sum, d) => sum + d.amount, 0),
      icon: <TrendingUp />,
      color: "success",
      gradient: "linear-gradient(135deg, #4ade80 0%, #22c55e 100%)",
    },
    {
      title: "Pending Withdrawals",
      value: pendingWithdrawalsData.length,
      amount: pendingWithdrawalsData.reduce((sum, w) => sum + w.amount, 0),
      icon: <TrendingDown />,
      color: "error",
      gradient: "linear-gradient(135deg, #f87171 0%, #ef4444 100%)",
    },
    {
      title: "Pending Transfers",
      value: pendingTransfersData.length,
      amount: pendingTransfersData.reduce((sum, t) => sum + t.amount, 0),
      icon: <SwapHoriz />,
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
      icon: <Pending />,
      color: "primary",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
  ];

  const tabData = [
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
      data: [...rejectedDeposits, ...rejectedWithdrawals, ...rejectedTransfers],
      type: "mixed",
    },
  ];

  const renderTable = (data, type) => {

    const getColumns = (type) => {
      if (type === "transfer") {
        const columns = [
          { key: "id", label: "Transaction ID" },
          { key: "from", label: "From User" },
          { key: "to", label: "To User" },
          { key: "type", label: "Transfer Type" },
          { key: "amount", label: "Amount" },
          { key: "status", label: "Status" },
        ];
        if (type !== "mixed") {
          columns.push({ key: "actions", label: "Actions" });
        }
        return columns;
      } else {
        const columns = [
          { key: "id", label: "Transaction ID" },
          { key: "userId", label: "User ID" },
          { key: "amount", label: "Amount" },
          { key: "status", label: "Status" },
        ];
        if (type !== "mixed") {
          columns.push({ key: "actions", label: "Actions" });
        }
        return columns;
      }
    };
    

    const columns = getColumns(type);

    return (
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  key={col.key}
                  sx={{ fontWeight: 600, color: "text.secondary" }}
                >
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  align="center"
                  sx={{ py: 4 }}
                >
                  <Typography variant="body2" color="text.secondary">
                    No pending {type}s found
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              data.map((item, index) => (
                <Fade in={true} timeout={300 * (index + 1)} key={item.id}>
                  <TableRow
                    hover
                    sx={{
                      "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.02)" },
                    }}
                  >
                    {/* Transaction ID */}
                    <TableCell>
                      <Typography variant="body2" fontFamily="monospace">
                        {item.id.slice(0, 8)}...
                      </Typography>
                    </TableCell>

                    {/* Conditional columns based on type */}
                    {type === "transfer" ? (
                      <>
                        {/* From User */}
                        <TableCell>
                          <Box display="flex" alignItems="center" gap={1}>
                            <Avatar
                              sx={{
                                width: 24,
                                height: 24,
                                fontSize: "0.75rem",
                              }}
                            >
                              {item.from?.toString().slice(0, 2) || "N/A"}
                            </Avatar>
                            <Typography variant="body2">
                              User {item.from}
                            </Typography>
                          </Box>
                        </TableCell>
                        {/* To User */}
                        <TableCell>
                          <Box display="flex" alignItems="center" gap={1}>
                            <Avatar
                              sx={{
                                width: 24,
                                height: 24,
                                fontSize: "0.75rem",
                                bgcolor: "secondary.main",
                              }}
                            >
                              {item.to?.toString().slice(0, 2) || "N/A"}
                            </Avatar>
                            <Typography variant="body2">
                              User {item.to}
                            </Typography>
                          </Box>
                        </TableCell>
                        {/* Transfer Type */}
                        <TableCell>
                          <Chip
                            label={item.type || "Transfer"}
                            size="small"
                            color={
                              item.type === "international"
                                ? "secondary"
                                : "primary"
                            }
                            variant="outlined"
                            sx={{ textTransform: "capitalize" }}
                          />
                        </TableCell>
                      </>
                    ) : (
                      /* User ID for deposits/withdrawals */
                      <TableCell>
                        <Box display="flex" alignItems="center" gap={1}>
                          <Avatar
                            sx={{ width: 24, height: 24, fontSize: "0.75rem" }}
                          >
                            {item.userId?.toString().slice(0, 2) || "N/A"}
                          </Avatar>
                          <Typography variant="body2">
                            User {item.userId}
                          </Typography>
                        </Box>
                      </TableCell>
                    )}

                    {/* Amount */}
                    <TableCell>
                      <Typography
                        variant="body2"
                        fontWeight={600}
                        color="primary.main"
                      >
                        ${item.amount.toLocaleString()}
                      </Typography>
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      <Chip
                        label={item.status || "pending"}
                        size="small"
                        color={
                          item.status === "approved" ? "success" : "warning"
                        }
                        variant="outlined"
                        sx={{ textTransform: "capitalize" }}
                      />
                    </TableCell>

                    {/* Actions */}
                    <TableCell>
                      {(item.status === "pending" || !item.status) && (
                        <Box display="flex" gap={1}>
                          <Tooltip title="Approve Transaction">
                            <Button
                              variant="contained"
                              size="small"
                              onClick={() =>
                                handleApprove(
                                  item.id,
                                  type === "mixed" ? getActualType(item) : type
                                )
                              }
                              sx={{
                                minWidth: "auto",
                                background:
                                  "linear-gradient(135deg, #4ade80 0%, #22c55e 100%)",
                                "&:hover": {
                                  background:
                                    "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                                },
                                textTransform: "none",
                                fontWeight: 600,
                              }}
                            >
                              <CheckCircle sx={{ fontSize: 16, mr: 0.5 }} />
                              Approve
                            </Button>
                          </Tooltip>

                          <Tooltip title="Reject Transaction">
                            <Button
                              variant="outlined"
                              size="small"
                              color="error"
                              onClick={() =>
                                handleReject(
                                  item.id,
                                  type === "mixed" ? getActualType(item) : type
                                )
                              }
                              sx={{ textTransform: "none", fontWeight: 600 }}
                            >
                              Reject
                            </Button>
                          </Tooltip>
                        </Box>
                      )}
                    </TableCell>
                  </TableRow>
                </Fade>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  const getActualType = (item) => {
    return item?.type
      ? "transfer"
      : item?.to === null && item?.from !== null
      ? "withdraw"
      : "deposit";
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-pink-400 to-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-green-400 to-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-500"></div>
      </div>

      <Container maxWidth="xl" sx={{ py: 4, position: "relative", zIndex: 1 }}>
        {/* Header */}
        <Paper
          elevation={0}
          sx={{
            borderRadius: 4,
            padding: 3,
            mb: 4,
            background: "rgba(255, 255, 255, 0.85)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
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

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Fade in={true} timeout={300 * (index + 1)}>
                <Card
                  elevation={0}
                  sx={{
                    borderRadius: 4,
                    background: "rgba(255, 255, 255, 0.8)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.1)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 20px 40px -5px rgba(0, 0, 0, 0.15)",
                    },
                  }}
                >
                  <CardContent>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Box>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          gutterBottom
                        >
                          {stat.title}
                        </Typography>
                        <Typography
                          variant="h4"
                          fontWeight={700}
                          color="text.primary"
                        >
                          {stat.value}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          ${stat.amount.toLocaleString()}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: 3,
                          background: stat.gradient,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "white",
                        }}
                      >
                        {stat.icon}
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Fade>
            </Grid>
          ))}
        </Grid>

        {/* Main Content */}
        <Paper
          elevation={0}
          sx={{
            borderRadius: 4,
            background: "rgba(255, 255, 255, 0.85)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            overflow: "hidden",
          }}
        >
          {/* Tabs */}
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              px: 3,
              pt: 2,
              width: {
                xs: "100%", // full width on small screens
                md: "800px", // fixed 800px on medium and up
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 2,
                overflowX: "auto",
                pb: 1,
                "&::-webkit-scrollbar": {
                  display: "none",
                },
                scrollbarWidth: "none", // for Firefox
              }}
            >
              {tabData.map((tab) => (
                <Button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  variant={activeTab === tab.id ? "contained" : "text"}
                  sx={{
                    textTransform: "none",
                    fontWeight: 600,
                    borderRadius: 2,
                    whiteSpace: "nowrap",
                    flexShrink: 0, // prevent shrinking to keep scrolling
                    ...(activeTab === tab.id && {
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      width: "120px",
                    }),
                  }}
                >
                  <span>
                    {tab.label}
                    <Chip
                      size="small"
                      label={tab.data.length}
                      sx={{
                        ml: 1,
                        height: 20,
                        backgroundColor:
                          activeTab === tab.id
                            ? "rgba(255,255,255,0.2)"
                            : "rgba(0,0,0,0.1)",
                        color:
                          activeTab === tab.id ? "white" : "text.secondary",
                      }}
                    />
                  </span>
                </Button>
              ))}
            </Box>
          </Box>

          {/* Table Content */}
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
                {renderTable(tab.data, tab.type)}
              </Box>
            ))}
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default AdminDashboard;
