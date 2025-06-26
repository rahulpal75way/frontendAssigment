import React from "react";
import { Button, Typography, Container, Box, Paper } from "@mui/material";
import {
  ErrorOutline,
  Home,
  RefreshOutlined,
  ArrowBack,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Error = () => {

  const user = useAuth(); 
  const navigate = useNavigate();

  const handleGoHome = () => {
    if (user?.role === "admin") {
      navigate("/admin/dashboard");
    } else if (user?.role === "user") {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-pink-400 to-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <Container maxWidth="md" className="relative z-10">
        <Paper
          elevation={0}
          className="backdrop-blur-lg bg-white/70 border border-white/20 shadow-2xl"
          sx={{
            borderRadius: 4,
            padding: { xs: 4, sm: 6 },
            background: "rgba(255, 255, 255, 0.85)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            textAlign: "center",
          }}
        >
          {/* Error Icon */}
          <Box mb={4}>
            <div className="w-24 h-24 bg-gradient-to-r from-red-400 to-pink-500 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg animate-bounce">
              <ErrorOutline className="text-white text-4xl" />
            </div>

            {/* Error Code */}
            <Typography
              variant="h1"
              className="font-bold bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent mb-2"
              sx={{
                fontSize: { xs: "4rem", sm: "6rem", md: "8rem" },
                lineHeight: 1,
                fontWeight: 900,
              }}
            >
              404
            </Typography>

            <Typography
              variant="h4"
              className="font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4"
              sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }}
            >
              Oops! Page Not Found
            </Typography>

            <Typography
              variant="body1"
              className="text-gray-600 mb-8 max-w-md mx-auto"
              sx={{ fontSize: { xs: "1rem", sm: "1.1rem" } }}
            >
              The page you're looking for seems to have wandered off into the
              digital void. Don't worry, it happens to the best of us!
            </Typography>
          </Box>

          {/* Action Buttons */}
          <Box className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* Go Home Button */}
            <Button
              variant="contained"
              onClick={handleGoHome}
              startIcon={<Home />}
              className="h-12 px-8 rounded-xl font-semibold text-base transition-all duration-200 hover:shadow-lg hover:scale-[1.02]"
              sx={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)",
                },
                textTransform: "none",
                minWidth: { xs: "200px", sm: "auto" },
              }}
            >
              Go Home
            </Button>

            {/* Go Back Button */}
            <Button
              variant="outlined"
              onClick={handleGoBack}
              startIcon={<ArrowBack />}
              className="h-12 px-8 rounded-xl font-semibold text-base transition-all duration-200 hover:shadow-md"
              sx={{
                borderColor: "rgba(156, 163, 175, 0.3)",
                color: "rgb(75, 85, 99)",
                "&:hover": {
                  borderColor: "rgba(156, 163, 175, 0.5)",
                  backgroundColor: "rgba(249, 250, 251, 0.8)",
                },
                textTransform: "none",
                minWidth: { xs: "200px", sm: "auto" },
              }}
            >
              Go Back
            </Button>

            {/* Refresh Button */}
            <Button
              variant="text"
              onClick={handleRefresh}
              startIcon={<RefreshOutlined />}
              className="h-12 px-6 rounded-xl font-medium text-base transition-all duration-200"
              sx={{
                color: "rgb(107, 114, 128)",
                "&:hover": {
                  backgroundColor: "rgba(249, 250, 251, 0.5)",
                },
                textTransform: "none",
                minWidth: { xs: "200px", sm: "auto" },
              }}
            >
              Refresh Page
            </Button>
          </Box>

          {/* Additional Help Text */}
          <Box mt={6} pt={4} className="border-t border-gray-200/50">
            <Typography variant="body2" className="text-gray-500 mb-2">
              Still having trouble?
            </Typography>
            <Typography variant="body2" className="text-gray-600">
              Contact our support team or check our{" "}
              <span className="text-blue-600 hover:text-blue-800 cursor-pointer font-medium transition-colors">
                help center
              </span>{" "}
              for assistance.
            </Typography>
          </Box>

          {/* Fun Animation Elements */}
          <Box className="absolute top-4 left-4 opacity-20">
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-ping"></div>
          </Box>
          <Box className="absolute top-8 right-6 opacity-20">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-ping delay-500"></div>
          </Box>
          <Box className="absolute bottom-6 left-8 opacity-20">
            <div className="w-4 h-4 bg-pink-400 rounded-full animate-ping delay-1000"></div>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default Error;
