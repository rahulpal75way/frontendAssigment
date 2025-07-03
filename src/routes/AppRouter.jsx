import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";

import UserLayout from "../layouts/UserLayout";
import AdminLayout from "../layouts/AdminLayout";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

// Auth Pages (don't lazy load for quicker access)
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import { CircularProgress } from "@mui/material";

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
const Error = lazy(() => import("../pages/Error/Error"));

export const AppRouter = () => {
  return (
    <Suspense fallback={<CircularProgress sx={{ m: 6 }} />}>
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
        <Route path="*" element={<Error />} />
      </Routes>
    </Suspense>
  );
};
