import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleRequestDeposit } from "../../features/wallet/walletSlice";
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  InputAdornment,
  useTheme,
} from "@mui/material";
import { AccountBalanceWallet, AttachMoney } from "@mui/icons-material";
import toast from "react-hot-toast";

const Deposit = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  const [amount, setAmount] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!amount) {
      newErrors.amount = "Amount is required";
    } else if (parseFloat(amount) <= 0) {
      newErrors.amount = "Amount must be greater than 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDeposit = () => {
    if (!validateForm()) return;

    setIsLoading(true);

    setTimeout(() => {
      dispatch(
        handleRequestDeposit({
          userId: user.id,
          amount: parseFloat(amount),
        })
      );
      setAmount("");
      setIsLoading(false);
      toast.success("Deposit request submitted for admin approval.");
    }, 1000);
  };

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
      {/* Decorative background */}
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
            background: isDarkMode
              ? "linear-gradient(135deg, rgba(72, 187, 120, 0.2), rgba(66, 153, 225, 0.2))"
              : "linear-gradient(135deg, rgba(72, 187, 120, 0.2), rgba(66, 153, 225, 0.2))",
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
            background: isDarkMode
              ? "linear-gradient(135deg, rgba(251, 191, 36, 0.2), rgba(236, 72, 153, 0.2))"
              : "linear-gradient(135deg, rgba(251, 191, 36, 0.2), rgba(236, 72, 153, 0.2))",
            borderRadius: "50%",
            filter: "blur(40px)",
            animation: "pulse 4s ease-in-out infinite",
            animationDelay: "1s",
          }}
        />
      </Box>

      <Box sx={{ position: "relative", zIndex: 1, maxWidth: 480, mx: "auto" }}>
        <Paper
          elevation={0}
          sx={{
            borderRadius: 2,
            padding: { xs: 3, sm: 4 },
            backgroundColor: isDarkMode
              ? "rgba(18, 18, 18, 0.85)"
              : "rgba(255, 255, 255, 0.85)",
            backdropFilter: "blur(20px)",
            border: `1px solid ${
              isDarkMode
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(255, 255, 255, 0.2)"
            }`,
            boxShadow: isDarkMode
              ? "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
              : "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          }}
        >
          {/* Header */}
          <Box textAlign="center" mb={4}>
            <Box
              sx={{
                width: 64,
                height: 64,
                background: "linear-gradient(135deg, #38b2ac 0%, #3182ce 100%)",
                borderRadius: "16px",
                mx: "auto",
                mb: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 10px 25px -5px rgba(56, 178, 172, 0.4)",
              }}
            >
              <AccountBalanceWallet sx={{ color: "white", fontSize: 32 }} />
            </Box>

            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                background: isDarkMode
                  ? "linear-gradient(135deg, #f3f4f6, #d1d5db)"
                  : "linear-gradient(135deg, #1f2937, #4b5563)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
              gutterBottom
            >
              Deposit Funds
            </Typography>

            <Typography variant="body1" color="text.secondary">
              Submit a deposit request to add funds to your wallet
            </Typography>
          </Box>

          {/* Form */}
          <Box component="form" noValidate>
            <TextField
              fullWidth
              label="Amount"
              type="number"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                if (errors.amount) setErrors({ ...errors, amount: null });
              }}
              error={!!errors.amount}
              helperText={errors.amount}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AttachMoney sx={{ color: theme.palette.text.secondary }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 4,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  backgroundColor: isDarkMode
                    ? "rgba(255,255,255,0.05)"
                    : "rgba(255,255,255,0.8)",
                  "&:hover": {
                    backgroundColor: isDarkMode
                      ? "rgba(255,255,255,0.1)"
                      : "rgba(255,255,255,0.9)",
                  },
                  "&.Mui-focused": {
                    backgroundColor: isDarkMode
                      ? "rgba(255,255,255,0.1)"
                      : "rgba(255,255,255,1)",
                  },
                },
              }}
            />

            {/* Submit Button */}
            <Button
              fullWidth
              variant="contained"
              onClick={handleDeposit}
              disabled={isLoading}
              sx={{
                height: 48,
                borderRadius: 3,
                fontWeight: 600,
                fontSize: "1rem",
                transition: "all 0.2s ease",
                background: "linear-gradient(135deg, #38b2ac 0%, #3182ce 100%)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #2c7a7b 0%, #2b6cb0 100%)",
                  transform: "scale(1.02)",
                  boxShadow: "0 10px 25px -5px rgba(56, 178, 172, 0.4)",
                },
                "&:disabled": {
                  background: isDarkMode
                    ? "rgba(156, 163, 175, 0.3)"
                    : "rgba(156, 163, 175, 0.5)",
                  transform: "none",
                },
                textTransform: "none",
              }}
            >
              {isLoading ? (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box
                    sx={{
                      width: 20,
                      height: 20,
                      border: "2px solid white",
                      borderTop: "2px solid transparent",
                      borderRadius: "50%",
                      animation: "spin 1s linear infinite",
                      "@keyframes spin": {
                        "0%": { transform: "rotate(0deg)" },
                        "100%": { transform: "rotate(360deg)" },
                      },
                    }}
                  />
                  <Typography>Processing...</Typography>
                </Box>
              ) : (
                "Request Deposit"
              )}
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Deposit;
