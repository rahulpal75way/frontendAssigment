import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";
import {
  Email,
  Lock,
  HowToReg,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useRegisterMutation } from "../../services/api";
import { useForm } from "react-hook-form";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterMutation();

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ name, email, password, confirmPassword }) => {
    try {
      const res = await registerUser({
        name,
        email,
        password,
        confirmPassword,
      }).unwrap();
      console.log("Registration response:", res);
      toast.success("Registration successful! You can now log in.");
      navigate("/login");
    } catch (err) {
      if (Array.isArray(err?.data?.message)) {
        err.data.message.forEach(({ path, message }) => {
          if (path && path.length > 0) {
            setError(path[0], { type: "manual", message });
          }
        });
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <Container maxWidth="sm" className="relative z-10">
        <Paper
          elevation={0}
          className="backdrop-blur-lg bg-white/70 border border-white/20 shadow-2xl"
          sx={{
            borderRadius: 2,
            padding: { xs: 3, sm: 4 },
            background: "rgba(255, 255, 255, 0.85)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          }}
        >
          <Box textAlign="center" mb={4}>
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
              <HowToReg className="text-white text-2xl" />
            </div>

            <Typography
              variant="h4"
              className="font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent"
              gutterBottom
            >
              Create Account
            </Typography>
            <Typography variant="body1" className="text-gray-600">
              Sign up to get started
            </Typography>
          </Box>

          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
            {/* Name */}
            <TextField
              fullWidth
              label="Full Name"
              {...register("name", { required: "Name is required" })}
              error={!!errors.name}
              helperText={errors.name?.message}
              sx={{ mb: 3 }}
            />

            {/* Email */}
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Invalid email format",
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email className="text-gray-400" />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
            />

            {/* Password */}
            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock className="text-gray-400" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      className="text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
            />

            {/* Confirm Password */}
            <TextField
              fullWidth
              label="Confirm Password"
              type={showPassword ? "text" : "password"}
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock className="text-gray-400" />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
            />

            {/* Submit */}
            <Button
              fullWidth
              variant="contained"
              type="submit"
              disabled={isLoading}
              className="h-12 rounded-xl font-semibold text-base transition-all duration-200 hover:shadow-lg hover:scale-[1.02]"
              sx={{
                mb: 2,
                background: "linear-gradient(135deg, #43cea2 0%, #185a9d 100%)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #36d1dc 0%, #5b86e5 100%)",
                },
                textTransform: "none",
              }}
            >
              {isLoading ? (
                <Box display="flex" alignItems="center" gap={1}>
                  <CircularProgress size={20} color="inherit" />
                  Signing up...
                </Box>
              ) : (
                "Sign Up"
              )}
            </Button>

            {/* Login Link */}
            <Box textAlign="center">
              <Typography variant="body2" className="text-gray-600">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="text-blue-600 hover:text-blue-800 cursor-pointer font-medium transition-colors"
                >
                  Log in
                </a>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default Register;
