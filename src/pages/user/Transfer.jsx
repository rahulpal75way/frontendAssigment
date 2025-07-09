import React, { useMemo, useState } from "react";
import {
  // useDispatch,
  useSelector
} from "react-redux";
import { useGetWalletQuery, useTransferTransactionMutation } from "../../services/api";

import {
  TextField,
  Button,
  Typography,
  MenuItem,
  Box,
  Paper,
  InputAdornment,
  useTheme,
} from "@mui/material";
import {
  AccountBalanceWallet,
  Person,
  AttachMoney,
  Public,
  SwapHoriz,
} from "@mui/icons-material";
import toast from "react-hot-toast";
import { ErrorBoundary } from "react-error-boundary";
import FallbackUI from "../../components/FallbackUI";

const Transfer = () => {
  // const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const theme = useTheme();
  const allUsers = useSelector((state) => state.auth.users || []);
  const users = useMemo(
    () => allUsers.filter((u) => u.id !== user.id && u.role !== "ADMIN"),
    [allUsers, user.id]
  );
  const { data: walletData } = useGetWalletQuery(user.id, {
      refetchOnMountOrArgChange: true,
    });
    const balance = walletData?.balance || 0;


  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("local");
  const [errors, setErrors] = useState({});
  const [transferTransaction, { isLoading }] = useTransferTransactionMutation();


  // Theme-aware styles
  const isDarkMode = theme.palette.mode === "dark";

  const validateForm = () => {
    const newErrors = {};

    if (!to) {
      newErrors.to = "Please select a recipient";
    }

    if (!amount) {
      newErrors.amount = "Amount is required";
    } else if (parseFloat(amount) <= 0) {
      newErrors.amount = "Amount must be greater than 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const numericAmount = parseFloat(amount);

    if (numericAmount > balance) {
      toast.error("Insufficient balance for this transfer.");
      return;
    }

    try {
      await transferTransaction({
        userId: user.id,
        receiverId: to,
        amount: numericAmount,
        type,
        action: "transfer",
      }).unwrap();

      setTo("");
      setAmount("");
      setType("local");

      toast.success("Transfer submitted for admin approval.");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to initiate transfer");
    }
  };
  

  return (
    <ErrorBoundary FallbackComponent={<FallbackUI/>}>
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: theme.palette.background.default,
          p: 2,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background decorative elements */}
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
                ? "linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)"
                : "linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)",
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
                ? "linear-gradient(135deg, rgba(236, 72, 153, 0.2) 0%, rgba(251, 191, 36, 0.2) 100%)"
                : "linear-gradient(135deg, rgba(236, 72, 153, 0.2) 0%, rgba(251, 191, 36, 0.2) 100%)",
              borderRadius: "50%",
              filter: "blur(40px)",
              animation: "pulse 4s ease-in-out infinite",
              animationDelay: "1s",
            }}
          />
        </Box>

        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            maxWidth: "48rem",
            mx: "auto",
          }}
        >
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
                  background:
                    "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                  borderRadius: "16px",
                  mx: "auto",
                  mb: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)",
                }}
              >
                <SwapHoriz sx={{ color: "white", fontSize: "2rem" }} />
              </Box>

              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  background: isDarkMode
                    ? "linear-gradient(135deg, #f3f4f6 0%, #d1d5db 100%)"
                    : "linear-gradient(135deg, #1f2937 0%, #4b5563 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  mb: 1,
                }}
              >
                Transfer Funds
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: theme.palette.text.secondary,
                }}
              >
                Send money to another user securely
              </Typography>
            </Box>

            {/* Form */}
            <Box component="form" noValidate>
              {/* Recipient Field */}
              <TextField
                select
                fullWidth
                label="Send To"
                value={to}
                onChange={(e) => {
                  setTo(e.target.value);
                  if (errors.to) setErrors({ ...errors, to: null });
                }}
                error={!!errors.to}
                helperText={errors.to}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person sx={{ color: theme.palette.text.secondary }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 3,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    backgroundColor: isDarkMode
                      ? "rgba(255, 255, 255, 0.05)"
                      : "rgba(255, 255, 255, 0.8)",
                    "&:hover": {
                      backgroundColor: isDarkMode
                        ? "rgba(255, 255, 255, 0.1)"
                        : "rgba(255, 255, 255, 0.9)",
                    },
                    "&.Mui-focused": {
                      backgroundColor: isDarkMode
                        ? "rgba(255, 255, 255, 0.1)"
                        : "rgba(255, 255, 255, 1)",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: theme.palette.text.secondary,
                  },
                  "& .MuiOutlinedInput-input": {
                    color: theme.palette.text.primary,
                  },
                }}
              >
                {users
                  .filter((u) => u.role !== "admin")
                  .map((u) => (
                    <MenuItem key={u.id} value={u.id}>
                      {u.name} ({u.email})
                    </MenuItem>
                  ))}
              </TextField>

              {/* Amount Field */}
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
                      <AttachMoney
                        sx={{ color: theme.palette.text.secondary }}
                      />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 3,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    backgroundColor: isDarkMode
                      ? "rgba(255, 255, 255, 0.05)"
                      : "rgba(255, 255, 255, 0.8)",
                    "&:hover": {
                      backgroundColor: isDarkMode
                        ? "rgba(255, 255, 255, 0.1)"
                        : "rgba(255, 255, 255, 0.9)",
                    },
                    "&.Mui-focused": {
                      backgroundColor: isDarkMode
                        ? "rgba(255, 255, 255, 0.1)"
                        : "rgba(255, 255, 255, 1)",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: theme.palette.text.secondary,
                  },
                  "& .MuiOutlinedInput-input": {
                    color: theme.palette.text.primary,
                  },
                }}
              />

              {/* Transfer Type Field */}
              <TextField
                select
                fullWidth
                label="Transfer Type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {type === "local" ? (
                        <AccountBalanceWallet
                          sx={{ color: theme.palette.text.secondary }}
                        />
                      ) : (
                        <Public sx={{ color: theme.palette.text.secondary }} />
                      )}
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 4,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    backgroundColor: isDarkMode
                      ? "rgba(255, 255, 255, 0.05)"
                      : "rgba(255, 255, 255, 0.8)",
                    "&:hover": {
                      backgroundColor: isDarkMode
                        ? "rgba(255, 255, 255, 0.1)"
                        : "rgba(255, 255, 255, 0.9)",
                    },
                    "&.Mui-focused": {
                      backgroundColor: isDarkMode
                        ? "rgba(255, 255, 255, 0.1)"
                        : "rgba(255, 255, 255, 1)",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: theme.palette.text.secondary,
                  },
                  "& .MuiOutlinedInput-input": {
                    color: theme.palette.text.primary,
                  },
                }}
              >
                <MenuItem value="local">Local</MenuItem>
                <MenuItem value="intl">International</MenuItem>
              </TextField>

              {/* Submit Button */}
              <Button
                fullWidth
                variant="contained"
                onClick={handleSubmit}
                disabled={isLoading}
                sx={{
                  height: 48,
                  borderRadius: 3,
                  fontWeight: 600,
                  fontSize: "1rem",
                  transition: "all 0.2s ease",
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)",
                    transform: "scale(1.02)",
                    boxShadow: "0 10px 25px -5px rgba(102, 126, 234, 0.4)",
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
                  "Submit Transfer"
                )}
              </Button>
            </Box>
          </Paper>
        </Box>
      </Box>
    </ErrorBoundary>
  );
};

export default Transfer;
