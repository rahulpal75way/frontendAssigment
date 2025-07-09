import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { CircularProgress, Box, Typography, Button } from "@mui/material";

import UserLayout from "../layouts/UserLayout";
import AdminLayout from "../layouts/AdminLayout";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import FallbackUI from "../components/FallbackUI";

// Lazy-loaded User Pages
const UserDashboard = lazy(() => import("../pages/user/Dashboard"));
const Transfer = lazy(() => import("../pages/user/Transfer"));
const Withdraw = lazy(() => import("../pages/user/Withdraw"));
const TxnHistory = lazy(() => import("../pages/user/History"));
const Deposit = lazy(() => import("../pages/user/Deposit"));

// Lazy-loaded Admin Pages
const AdminDashboard = lazy(() => import("../pages/admin/Dashbaord"));
const Commissions = lazy(() => import("../pages/admin/Commission"));

// Fallback Error Page
const ErrorPage = lazy(() => import("../pages/Error/Error"));

export const AppRouter = () => {
  return (
    <ErrorBoundary FallbackComponent={<FallbackUI/>}>
      <Suspense
        fallback={
          <Box display="flex" justifyContent="center" mt={6}>
            <CircularProgress />
          </Box>
        }
      >
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Root Redirect */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* User Routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<UserLayout />}>
              <Route path="/dashboard" element={<UserDashboard />} />
              <Route path="/transfer" element={<Transfer />} />
              <Route path="/withdraw" element={<Withdraw />} />
              <Route path="/history" element={<TxnHistory />} />
              <Route path="/deposite" element={<Deposit />} />
            </Route>
          </Route>

          {/* Admin Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="commissions" element={<Commissions />} />
            </Route>
          </Route>

          {/* 404 Page */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
};
