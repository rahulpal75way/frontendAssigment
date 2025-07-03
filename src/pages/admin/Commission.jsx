import React, { useMemo, useCallback, lazy, Suspense } from "react";
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

const CommissionTable = lazy(() =>
  import("../../components/commission/CommissionTable")
);
const CommissionSummaryCard = lazy(() =>
  import("../../components/commission/CommissionSummaryCard")
);

const Commissions = () => {
  const { commissions } = useSelector((state) => state.txns);

  const total = useMemo(
    () => commissions.reduce((sum, c) => sum + c.amount, 0),
    [commissions]
  );

  const typeStats = useMemo(() => {
    return commissions.reduce((acc, commission) => {
      acc[commission.type] = (acc[commission.type] || 0) + commission.amount;
      return acc;
    }, {});
  }, [commissions]);

  const getTypeIcon = useCallback((type) => {
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
  }, []);

  const getTypeColor = useCallback((type) => {
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
  }, []);

  const formatTxnId = useCallback((txnId) => {
    return `${txnId.slice(0, 8)}...${txnId.slice(-4)}`;
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-pink-400 to-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <Container maxWidth="lg" className="relative z-10">
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

        <Box
          mb={4}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <Suspense fallback={<div>Loading summary...</div>}>
            <CommissionSummaryCard
              label="Total Commission"
              value={`$${total.toFixed(2)}`}
              icon={<TrendingUp className="text-white" />}
              gradientFrom="from-green-400"
              gradientTo="to-green-600"
            />

            {Object.entries(typeStats)
              .slice(0, 3)
              .map(([type, amount]) => (
                <CommissionSummaryCard
                  key={type}
                  label={type}
                  value={`$${amount.toFixed(2)}`}
                  icon={getTypeIcon(type)}
                  color={getTypeColor(type)}
                />
              ))}
          </Suspense>
        </Box>

        <Suspense fallback={<div>Loading table...</div>}>
          <CommissionTable
            commissions={commissions}
            formatTxnId={formatTxnId}
            getTypeIcon={getTypeIcon}
            getTypeColor={getTypeColor}
            total={total}
          />
        </Suspense>
      </Container>
    </div>
  );
};

export default Commissions;
