import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import UserDashboard from "../pages/user/Dashboard";
import Transfer from "../pages/user/Transfer";
import Withdraw from "../pages/user/Withdraw";
import TxnHistory from "../pages/user/History";
import AdminDashboard from "../pages/admin/Dashbaord";
import Commissions from "../pages/admin/Commission";
import UserLayout from "../layouts/UserLayout";
import AdminLayout from "../layouts/AdminLayout";
import Deposit from "../pages/user/Deposit";
import Error from "../pages/Error/Error";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";


export const AppRouter = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/login" replace />} />
    {/* Public routes (blocked for logged-in users) */}
    <Route
      path="/login"
      element={
        <PublicRoute>
          <Login />
        </PublicRoute>
      }
    />
    <Route
      path="/register"
      element={
        <PublicRoute>
          <Register />
        </PublicRoute>
      }
    />

    {/* User protected routes */}
    <Route
      element={
        <ProtectedRoute>
          <UserLayout />
        </ProtectedRoute>
      }
    >
      <Route path="/dashboard" element={<UserDashboard />} />
      <Route path="/transfer" element={<Transfer />} />
      <Route path="/withdraw" element={<Withdraw />} />
      <Route path="/history" element={<TxnHistory />} />
      <Route path="/deposite" element={<Deposit />} />
    </Route>

    {/* Admin protected routes */}
    <Route
      element={
        <ProtectedRoute>
          <AdminLayout />
        </ProtectedRoute>
      }
    >
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/commissions" element={<Commissions />} />
    </Route>

    <Route path="*" element={<Error />} />
  </Routes>
);
