import React, { useMemo, useCallback, lazy, Suspense } from "react";
import {
  Container,
  Typography,
  Box,
  useTheme,
  CircularProgress,
} from "@mui/material";
import {
  TrendingUp,
  AccountBalance,
  Public,
  LocationOn,
  GetApp,
  CallMade,
} from "@mui/icons-material";
// import { useSelector } from "react-redux";
import { useGetCommissionsQuery } from "../../services/api";

const CommissionTable = lazy(() =>
  import("../../components/commission/CommissionTable")
);
const CommissionSummaryCard = lazy(() =>
  import("../../components/commission/CommissionSummaryCard")
);

const Commissions = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const { data, } = useGetCommissionsQuery();

  const commissions = useMemo(() => data?.data || [], [data]);

  const total = useMemo(
    () => commissions.reduce((sum, c) => sum + c.amount, 0),
    [commissions]
  );

  const typeStats = useMemo(() => {
    return commissions.reduce((acc, commission) => {
      const type = commission.txn?.type || commission.type;
      acc[type] = (acc[type] || 0) + commission.amount;
      return acc;
    }, {});
  }, [commissions]);
  

  const getTypeIcon = useCallback((type) => {
    switch (type) {
      case "deposit":
        return <GetApp color="success" />;
      case "withdrawal":
        return <CallMade color="error" />;
      case "international":
        return <Public color="primary" />;
      case "local":
        return <LocationOn color="secondary" />;
      default:
        return <AccountBalance color="disabled" />;
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
    <Box
      sx={{
        minHeight: "100vh",
        py: 4,
        px: 2,
        position: "relative",
        background: isDarkMode
          ? "linear-gradient(to bottom right, #121212, #1e1e1e)"
          : "linear-gradient(to bottom right, #ebf4ff, #fce7f3)",
        "&::before, &::after": {
          content: '""',
          position: "absolute",
          borderRadius: "50%",
          filter: "blur(100px)",
          opacity: 0.2,
          zIndex: 0,
        },
        "&::before": {
          top: -120,
          right: -120,
          width: 320,
          height: 320,
          background: "linear-gradient(to right, #3b82f6, #8b5cf6)",
        },
        "&::after": {
          bottom: -120,
          left: -120,
          width: 320,
          height: 320,
          background: "linear-gradient(to right, #ec4899, #facc15)",
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Box mb={4}>
          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 2,
                background: "linear-gradient(to right, #3b82f6, #8b5cf6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: 3,
              }}
            >
              <TrendingUp sx={{ color: "#fff" }} />
            </Box>
            <Box>
              <Typography
                variant="h4"
                fontWeight="bold"
                sx={{
                  background: isDarkMode
                    ? "linear-gradient(to right, #f3f4f6, #d1d5db)"
                    : "linear-gradient(to right, #1f2937, #374151)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Commission Report
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Overview of all commission transactions
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box
          mb={4}
          display="grid"
          gridTemplateColumns={{
            xs: "1fr",
            sm: "1fr 1fr",
            lg: "repeat(4, 1fr)",
          }}
          gap={3}
        >
          <Suspense fallback={<CircularProgress sx={{ mx: "auto", my: 2 }} />}>
            <CommissionSummaryCard
              label="Total Commission"
              value={`$${total.toFixed(2)}`}
              icon={<TrendingUp sx={{ color: "#fff" }} />}
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

        <Suspense fallback={<CircularProgress sx={{ mx: "auto", my: 2 }} />}>
          <CommissionTable
            commissions={commissions}
            formatTxnId={formatTxnId}
            getTypeIcon={getTypeIcon}
            getTypeColor={getTypeColor}
            total={total}
          />
        </Suspense>
      </Container>
    </Box>
  );
};

export default Commissions;
