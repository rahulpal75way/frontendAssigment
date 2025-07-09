import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
  useTheme,
  Box,
} from "@mui/material";
import {
  TrendingUp,
  TrendingDown,
  ArrowDownward,
  ArrowUpward,
} from "@mui/icons-material";

const TransactionTable = ({ txns = [], userId = "" }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

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
    if (txn.action === "deposit") {
      return { type: "deposit", icon: <ArrowDownward /> };
    }
    if (txn.action === "withdrawal") {
      return { type: "withdrawal", icon: <ArrowUpward /> };
    }
    if (txn.userId === userId) {
      return { type: "sent", icon: <TrendingUp /> };
    }
    if (txn.receiverId === userId) {
      return { type: "received", icon: <TrendingDown /> };
    }
    return { type: "-", icon: null };
  };
  

  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        borderRadius: 2,
        backgroundColor: isDarkMode
          ? "rgba(18, 18, 18, 0.85)"
          : "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(10px)",
        border: `1px solid ${
          isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.3)"
        }`,
        boxShadow: isDarkMode
          ? "0 8px 32px rgba(0, 0, 0, 0.5)"
          : "0 8px 32px rgba(0, 0, 0, 0.1)",
        maxHeight: 600,
        overflowY: "auto",
      }}
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {[
              "Transaction ID",
              "Direction",
              "From",
              "To",
              "Amount",
              "Type",
              "Status",
            ].map((head) => (
              <TableCell
                key={head}
                sx={{
                  fontWeight: "bold",
                       backgroundColor: isDarkMode
                                      ? theme.palette.background.paper // solid dark background
                                      : theme.palette.primary.light, // solid light background
                  color: theme.palette.text.primary,
                }}
              >
                {head}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {txns.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                <Typography variant="body1" color="text.secondary">
                  No transactions found
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            txns.map((txn) => {
              const { type: direction, icon } = getTransactionType(txn);
              const isSent = direction === "sent";
              const amountColor = isSent ? "error.main" : "success.main";

              return (
                <TableRow
                  key={txn.id}
                  sx={{
                    "&:hover": {
                      backgroundColor: isDarkMode
                        ? "rgba(255,255,255,0.03)"
                        : "rgba(99, 102, 241, 0.05)",
                    },
                  }}
                >
                  <TableCell>
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: "monospace",
                        fontSize: "0.875rem",
                      }}
                    >
                      #{txn.id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      {icon}
                      <Typography
                        sx={{
                          textTransform: "capitalize",
                          color: amountColor,
                          fontWeight: 500,
                        }}
                      >
                        {direction}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{txn.userId}</TableCell>
                  <TableCell>{txn.receiverId || "-"}</TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: "bold",
                        color: amountColor,
                      }}
                    >
                      {isSent ? "-" : "+"}₹{txn.amount.toFixed(2)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={txn.type}
                      size="small"
                      variant="outlined"
                      sx={{
                        textTransform: "capitalize",
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
                      sx={{ textTransform: "capitalize" }}
                    />
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TransactionTable;
