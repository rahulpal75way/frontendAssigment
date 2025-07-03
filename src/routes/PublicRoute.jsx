import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PublicRoute = () => {
  const user = useAuth();

  if (user?.role === "admin") {
    return <Navigate to="/admin/dashboard" replace />;
  } else if (user?.role === "user") {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />; // ✅ This is necessary to render nested routes like /login
};

export default PublicRoute;
