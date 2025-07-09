import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { ErrorBoundary } from "react-error-boundary";
import { Typography, Box, Button } from "@mui/material";
import FallbackUI from "../components/FallbackUI";

const PublicRoute = () => {
  const user = useAuth();

  if (user?.role === "ADMIN") {
    return <Navigate to="/admin/dashboard" replace />;
  } else if (user?.role === "USER" || user?.role === "CANDIDATE") {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <ErrorBoundary FallbackComponent={<FallbackUI/>}>
      <Outlet />
    </ErrorBoundary>
  );
};

export default PublicRoute;
