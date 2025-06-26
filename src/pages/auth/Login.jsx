
import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Container,
  Box,
  Paper,
  InputAdornment,
  IconButton,
  Divider,
  Chip,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  LoginOutlined,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { login } from "../../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { mockUsers } from "../../utils/data";
import useRoleRedirect from "../../hooks/useRoleRedirect";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setIsLoading(true);


    setTimeout(() => {
      const user = mockUsers.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        dispatch(login(user));
        navigate(user.role === "admin" ? "/admin/dashboard" : "/dashboard");
      } else {
        setErrors({ general: "Invalid email or password" });
      }

      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-pink-400 to-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <Container maxWidth="sm" className="relative z-10">
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
              <LoginOutlined className="text-white text-2xl" />
            </div>

            <Typography
              variant="h4"
              className="font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent"
              gutterBottom
            >
              Welcome Back
            </Typography>

            <Typography variant="body1" className="text-gray-600">
              Sign in to your account to continue
            </Typography>
          </Box>

          {/* Error Message */}
          {errors.general && (
            <Box mb={3}>
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <Typography variant="body2" className="text-red-600">
                  {errors.general}
                </Typography>
              </div>
            </Box>
          )}

          {/* Form */}
          <Box component="form" noValidate>
            {/* Email Field */}
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors({ ...errors, email: null });
              }}
              onKeyPress={handleKeyPress}
              error={!!errors.email}
              helperText={errors.email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email className="text-gray-400" />
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 3,
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

            {/* Password Field */}
            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors({ ...errors, password: null });
              }}
              onKeyPress={handleKeyPress}
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock className="text-gray-400" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      className="text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 3,
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

            {/* Forgot Password */}
            <Box textAlign="right" mb={3}>
              <Typography
                variant="body2"
                className="text-blue-600 hover:text-blue-800 cursor-pointer transition-colors"
              >
                Forgot your password?
              </Typography>
            </Box>

            {/* Login Button */}
            <Button
              fullWidth
              variant="contained"
              onClick={handleLogin}
              disabled={isLoading}
              className="h-12 rounded-xl font-semibold text-base transition-all duration-200 hover:shadow-lg hover:scale-[1.02]"
              sx={{
                mb: 3,
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
                  <span>Signing in...</span>
                </div>
              ) : (
                "Sign In"
              )}
            </Button>

            {/* Divider */}
            <Box my={3}>
              <Divider>
                <Chip
                  label="or continue with"
                  size="small"
                  className="bg-gray-50 text-gray-500"
                />
              </Divider>
            </Box>

            {/* Social Login */}
            <Button
              fullWidth
              variant="outlined"
              className="h-12 rounded-xl font-medium text-base border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-200"
              sx={{
                mb: 3,
                textTransform: "none",
                borderColor: "rgba(156, 163, 175, 0.3)",
                "&:hover": {
                  borderColor: "rgba(156, 163, 175, 0.5)",
                  backgroundColor: "rgba(249, 250, 251, 0.8)",
                },
              }}
            >
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-red-500 rounded"></div>
                <span>Continue with Google</span>
              </div>
            </Button>

            {/* Sign Up Link */}
            <Box textAlign="center">
              <Typography variant="body2" className="text-gray-600">
                Don't have an account?{" "}
                <span className="text-blue-600 hover:text-blue-800 cursor-pointer font-medium transition-colors">
                  <Link to="/register"> Sign up here</Link>
                </span>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default Login;
