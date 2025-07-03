import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = () => {
  const user = useAuth();

  // Check if the user is authenticated
  if (!user) {
    return <Navigate to="/login" replace />; // Redirect to login if not authenticated
  }

  return <Outlet />; // Render nested routes if authenticated
};

export default ProtectedRoute;
