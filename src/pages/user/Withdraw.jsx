
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestWithdrawal } from "../../features/wallet/walletSlice";
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  InputAdornment,
} from "@mui/material";
import { AccountBalanceWallet, AttachMoney } from "@mui/icons-material";
import toast from "react-hot-toast";

const Withdraw = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
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

  const handleWithdraw = () => {
    if (!validateForm()) return;

    setIsLoading(true);


    setTimeout(() => {
      dispatch(
        requestWithdrawal({
          userId: user.id,
          amount: parseFloat(amount),
        })
      );
      setAmount("");
      setIsLoading(false);
      toast.success("Withdrawal request submitted for admin approval.");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-pink-400 to-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-md mx-auto">
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
              <AccountBalanceWallet className="text-white text-2xl" />
            </div>

            <Typography
              variant="h4"
              className="font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent"
              gutterBottom
            >
              Withdraw Funds
            </Typography>

            <Typography variant="body1" className="text-gray-600">
              Request a withdrawal from your account
            </Typography>
          </Box>

          {/* Form */}
          <Box component="form" noValidate>
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
                    <AttachMoney className="text-gray-400" />
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 4,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                  },
                  "&.Mui-focused": {
                    backgroundColor: "rgba(255, 255, 255, 1)",
                  },
                },
              }}
            />

            {/* Submit Button */}
            <Button
              fullWidth
              variant="contained"
              onClick={handleWithdraw}
              disabled={isLoading}
              className="h-12 rounded-xl font-semibold text-base transition-all duration-200 hover:shadow-lg hover:scale-[1.02]"
              sx={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)",
                },
                "&:disabled": {
                  background: "rgba(156, 163, 175, 0.5)",
                },
                textTransform: "none",
              }}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                "Request Withdrawal"
              )}
            </Button>
          </Box>
        </Paper>
      </div>
    </div>
  );
};

export default Withdraw;
