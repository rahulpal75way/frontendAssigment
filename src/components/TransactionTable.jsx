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
} from "@mui/material";
import {
  TrendingUp,
  TrendingDown,
  ArrowDownward,
  ArrowUpward,
} from "@mui/icons-material";

const TransactionTable = ({ txns = [], userId = "" }) => {
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
      return { type: "deposit", icon: <ArrowDownward /> };
    if (txn.action === "withdrawal")
      return { type: "withdrawal", icon: <ArrowUpward /> };
    if (txn.from === userId) return { type: "sent", icon: <TrendingUp /> };
    if (txn.to === userId) return { type: "received", icon: <TrendingDown /> };
    return { type: "-", icon: null };
  };

  return (
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
                  backgroundColor: "rgba(99, 102, 241, 0.1)",
                  color: "#374151",
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
                <Typography variant="body1" className="text-gray-500">
                  No transactions found
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            txns.map((txn) => {
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
                    <Typography variant="body2" className="font-mono text-sm">
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
                        direction === "sent" ? "text-red-600" : "text-green-600"
                      }`}
                    >
                      {direction === "sent" ? "-" : "+"}₹{txn.amount.toFixed(2)}
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
  );
};

export default TransactionTable;
