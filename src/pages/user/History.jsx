import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import HeaderSection from "../../components/HeaderSection";
import TransactionTable from "../../components/TransactionTable";
import { Box, useTheme } from "@mui/material";

const TxnHistory = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  const user = useSelector((state) => state.auth.user);
  const { txns } = useSelector((state) => state.txns);

  const filtered = useMemo(
    () => txns.filter((t) => t.from === user.id || t.to === user.id),
    [txns, user.id]
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: theme.palette.background.default,
        p: 2,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Gradient Bubbles */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "-10rem",
            right: "-10rem",
            width: "20rem",
            height: "20rem",
            background:
              "linear-gradient(135deg, rgba(59,130,246,0.2), rgba(139,92,246,0.2))",
            borderRadius: "50%",
            filter: "blur(40px)",
            animation: "pulse 4s ease-in-out infinite",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: "-10rem",
            left: "-10rem",
            width: "20rem",
            height: "20rem",
            background:
              "linear-gradient(135deg, rgba(236,72,153,0.2), rgba(251,191,36,0.2))",
            borderRadius: "50%",
            filter: "blur(40px)",
            animation: "pulse 4s ease-in-out infinite",
            animationDelay: "1s",
          }}
        />
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          maxWidth: "96rem",
          mx: "auto",
        }}
      >
        <HeaderSection />
        <TransactionTable txns={filtered} userId={user.id} />
      </Box>
    </Box>
  );
};

export default TxnHistory;
