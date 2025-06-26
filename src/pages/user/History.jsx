
import React from "react";
import { useSelector } from "react-redux";
import {
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";
import {
  History,
  TrendingUp,
  TrendingDown,
  ArrowDownward as DownloadIcon,
  ArrowUpward as UploadIcon,
} from "@mui/icons-material";


const TxnHistory = () => {
  const user = useSelector((state) => state.auth.user);
  const { txns } = useSelector((state) => state.txns);

  const filtered = txns.filter((t) => t.from === user.id || t.to === user.id);

  
  
  

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "success";
      case "pending":
        return "warning";
      case "failed":
        return "error";
      default:
        return "default";
    }
  };

  const getTransactionType = (txn) => {
    if (txn.action === "deposit")
      return { type: "deposit", icon: <DownloadIcon /> };
    if (txn.action === "withdrawal")
      return { type: "withdrawal", icon: <UploadIcon /> };
    if (txn.from === user.id) return { type: "sent", icon: <TrendingUp /> };
    if (txn.to === user.id) return { type: "received", icon: <TrendingDown /> };
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
     
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-pink-400 to-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <Paper
          elevation={0}
          className="backdrop-blur-lg bg-white/70 border border-white/20 shadow-2xl"
          sx={{
            borderRadius: 4,
            padding: { xs: 3, sm: 4 },
            background: "rgba(255, 255, 255, 0.85)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          }}
        >
          {/* Header */}
          <Box textAlign="center" mb={4}>
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
          </Box>

          {/* Transaction Table */}
          <TableContainer
            component={Paper}
            elevation={0}
            sx={{
              borderRadius: 3,
              background: "rgba(255, 255, 255, 0.8)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
              maxHeight: 400,
              overflowY: "auto",
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      backgroundColor: "rgba(99, 102, 241, 0.1)",
                      color: "#374151",
                    }}
                  >
                    Transaction ID
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      backgroundColor: "rgba(99, 102, 241, 0.1)",
                      color: "#374151",
                    }}
                  >
                    Direction
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      backgroundColor: "rgba(99, 102, 241, 0.1)",
                      color: "#374151",
                    }}
                  >
                    From
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      backgroundColor: "rgba(99, 102, 241, 0.1)",
                      color: "#374151",
                    }}
                  >
                    To
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      backgroundColor: "rgba(99, 102, 241, 0.1)",
                      color: "#374151",
                    }}
                  >
                    Amount
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      backgroundColor: "rgba(99, 102, 241, 0.1)",
                      color: "#374151",
                    }}
                  >
                    Type
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      backgroundColor: "rgba(99, 102, 241, 0.1)",
                      color: "#374151",
                    }}
                  >
                    Status
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                      <Typography variant="body1" className="text-gray-500">
                        No transactions found
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((txn) => {
                    const { type: direction, icon } = getTransactionType(txn);
                    return (
                      <TableRow
                        key={txn.id}
                        sx={{
                          "&:hover": {
                            backgroundColor: "rgba(99, 102, 241, 0.05)",
                          },
                        }}
                      >
                        <TableCell>
                          <Typography
                            variant="body2"
                            className="font-mono text-sm"
                          >
                            #{txn.id}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {icon}
                            <span
                              className={`capitalize ${
                                direction === "sent"
                                  ? "text-red-600"
                                  : "text-green-600"
                              }`}
                            >
                              {direction}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>{txn.from}</TableCell>
                        <TableCell>{txn.to}</TableCell>
                        <TableCell>
                          <Typography
                            variant="body2"
                            className={`font-semibold ${
                              direction === "sent"
                                ? "text-red-600"
                                : "text-green-600"
                            }`}
                          >
                            {direction === "sent" ? "-" : "+"}$
                            {txn.amount.toFixed(2)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={txn.type}
                            size="small"
                            variant="outlined"
                            className="capitalize"
                            sx={{
                              borderColor: "rgba(99, 102, 241, 0.3)",
                              color: "#6366f1",
                              backgroundColor: "rgba(99, 102, 241, 0.1)",
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={txn.status}
                            size="small"
                            color={getStatusColor(txn.status)}
                            className="capitalize"
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    </div>
  );
};

export default TxnHistory;
