import React from "react";
import {
  Container,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Avatar,
} from "@mui/material";
import {
  TrendingUp,
  AccountBalance,
  Public,
  LocationOn,
  GetApp,
  CallMade,
} from "@mui/icons-material";
import { useSelector } from "react-redux";

const Commissions = () => {
 
  const { commissions } = useSelector((state) => state.txns);

  const total = commissions.reduce((sum, c) => sum + c.amount, 0);


  const typeStats = commissions.reduce((acc, commission) => {
    acc[commission.type] = (acc[commission.type] || 0) + commission.amount;
    return acc;
  }, {});

  const getTypeIcon = (type) => {
    switch (type) {
      case "deposit":
        return <GetApp className="text-green-500" />;
      case "withdrawal":
        return <CallMade className="text-red-500" />;
      case "international":
        return <Public className="text-blue-500" />;
      case "local":
        return <LocationOn className="text-purple-500" />;
      default:
        return <AccountBalance className="text-gray-500" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "deposit":
        return "success";
      case "withdrawal":
        return "error";
      case "international":
        return "primary";
      case "local":
        return "secondary";
      default:
        return "default";
    }
  };

  const formatTxnId = (txnId) => {
    return `${txnId.slice(0, 8)}...${txnId.slice(-4)}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-pink-400 to-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <Container maxWidth="lg" className="relative z-10">
        {/* Header */}
        <Box mb={4}>
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <TrendingUp className="text-white text-xl" />
            </div>
            <div>
              <Typography
                variant="h4"
                className="font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent"
              >
                Commission Report
              </Typography>
              <Typography variant="body1" className="text-gray-600">
                Overview of all commission transactions
              </Typography>
            </div>
          </div>
        </Box>

        {/* Summary Cards */}
        <Box
          mb={4}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {/* Total Commission Card */}
          <Card
            className="backdrop-blur-lg bg-white/80 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300"
            sx={{
              borderRadius: 3,
              background: "rgba(255, 255, 255, 0.85)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <Typography variant="body2" className="text-gray-600 mb-1">
                    Total Commission
                  </Typography>
                  <Typography variant="h4" className="font-bold text-green-600">
                    ${total.toFixed(2)}
                  </Typography>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center">
                  <TrendingUp className="text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Type Stats Cards */}
          {Object.entries(typeStats)
            .slice(0, 3)
            .map(([type, amount]) => (
              <Card
                key={type}
                className="backdrop-blur-lg bg-white/80 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300"
                sx={{
                  borderRadius: 3,
                  background: "rgba(255, 255, 255, 0.85)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Typography
                        variant="body2"
                        className="text-gray-600 mb-1 capitalize"
                      >
                        {type}
                      </Typography>
                      <Typography
                        variant="h5"
                        className="font-bold text-gray-800"
                      >
                        ${amount.toFixed(2)}
                      </Typography>
                    </div>
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      {getTypeIcon(type)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </Box>

        {/* Commission Table */}
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
            <Typography
              variant="h6"
              className="font-semibold text-gray-800 mb-4"
            >
              Commission Transactions
            </Typography>

            <TableContainer
              sx={{
                maxHeight: 400,
                overflowY: "auto",
              }}
            >
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
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 text-white text-sm">
                            {index + 1}
                          </Avatar>
                          <div>
                            <Typography
                              variant="body2"
                              className="font-mono text-gray-700"
                            >
                              {formatTxnId(commission.txnId)}
                            </Typography>
                          </div>
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

            {/* Footer Summary */}
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
      </Container>
    </div>
  );
};

export default Commissions;
