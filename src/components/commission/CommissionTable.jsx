import React from "react";
import {
  Paper,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Avatar,
} from "@mui/material";

const CommissionTable = ({
  commissions,
  formatTxnId,
  getTypeIcon,
  getTypeColor,
  total,
}) => {
  return (
    <Paper
      elevation={0}
      className="backdrop-blur-lg bg-white/80 border border-white/20 shadow-2xl"
      sx={{
        borderRadius: 4,
        background: "rgba(255, 255, 255, 0.85)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      }}
    >
      <Box p={3}>
        <Typography variant="h6" className="font-semibold text-gray-800 mb-4">
          Commission Transactions
        </Typography>

        <TableContainer sx={{ maxHeight: 400, overflowY: "auto" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="font-semibold text-gray-700">
                  Transaction ID
                </TableCell>
                <TableCell className="font-semibold text-gray-700">
                  Type
                </TableCell>
                <TableCell
                  className="font-semibold text-gray-700"
                  align="right"
                >
                  Amount
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {commissions.map((commission, index) => (
                <TableRow
                  key={commission.txnId}
                  className="hover:bg-gray-50/50 transition-colors"
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 text-white text-sm">
                        {index + 1}
                      </Avatar>
                      <Typography
                        variant="body2"
                        className="font-mono text-gray-700"
                      >
                        {formatTxnId(commission.txnId)}
                      </Typography>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Chip
                      icon={getTypeIcon(commission.type)}
                      label={
                        commission.type.charAt(0).toUpperCase() +
                        commission.type.slice(1)
                      }
                      color={getTypeColor(commission.type)}
                      variant="outlined"
                      size="small"
                      className="capitalize"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="body1"
                      className="font-semibold text-green-600"
                    >
                      ${commission.amount.toFixed(2)}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box
          mt={3}
          pt={3}
          className="border-t border-gray-200/50 flex justify-between items-center"
        >
          <Typography variant="body2" className="text-gray-600">
            Total {commissions.length} transactions
          </Typography>
          <Typography variant="h6" className="font-bold text-gray-800">
            Total: ${total.toFixed(2)}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default CommissionTable;
