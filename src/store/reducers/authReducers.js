import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { api } from "../../services/api";

// Initial state
const initialState = {
  accessToken: localStorage.getItem("access_token") ?? "",
  refreshToken: localStorage.getItem("refresh_token") ?? "",
  isAuthenticated: Boolean(localStorage.getItem("access_token")),
  loading: true,
  user: JSON.parse(localStorage.getItem("user") || "null"),

  // ✅ Additional state restored from localStorage
  pendingDeposits: JSON.parse(localStorage.getItem("pending_deposits") || "[]"),
  pendingWithdrawals: JSON.parse(
    localStorage.getItem("pending_withdrawals") || "[]"
  ),
  users: JSON.parse(localStorage.getItem("users") || "[]"),
};


// Helpers
const _setTokens = (state, data) => {
  const { accessToken, refreshToken } = data.tokens || {};
  const user = data.user ?? null;

  if (accessToken) localStorage.setItem("access_token", accessToken);
  if (refreshToken) localStorage.setItem("refresh_token", refreshToken);
  if (user) localStorage.setItem("user", JSON.stringify(user));

  // ✅ Save extended data to localStorage
  localStorage.setItem("wallet_balance", data.walletBalance ?? 0);
  localStorage.setItem("txns", JSON.stringify(data.txns ?? []));
  localStorage.setItem(
    "pending_deposits",
    JSON.stringify(data.pendingDeposits ?? [])
  );
  localStorage.setItem(
    "pending_withdrawals",
    JSON.stringify(data.pendingWithdrawals ?? [])
  );
  localStorage.setItem("users", JSON.stringify(data.users ?? []));

  // Update state
  state.accessToken = accessToken ?? "";
  state.refreshToken = refreshToken ?? "";
  state.isAuthenticated = Boolean(accessToken);
  state.loading = false;
  state.user = user;

  state.walletBalance = data.walletBalance ?? 0;
  state.txns = data.txns ?? [];
  state.pendingDeposits = data.pendingDeposits ?? [];
  state.pendingWithdrawals = data.pendingWithdrawals ?? [];
  state.users = data.users ?? [];

  return state;
};


const _resetTokens = (state) => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("user");

  // ✅ Clear additional fields
  localStorage.removeItem("wallet_balance");
  localStorage.removeItem("txns");
  localStorage.removeItem("pending_deposits");
  localStorage.removeItem("pending_withdrawals");
  localStorage.removeItem("users");

  state.accessToken = "";
  state.refreshToken = "";
  state.isAuthenticated = false;
  state.loading = false;
  state.user = null;

  state.walletBalance = 0;
  state.txns = [];
  state.pendingDeposits = [];
  state.pendingWithdrawals = [];
  state.users = [];

  return state;
};


// Slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload.loading;
    },
    setTokens: (state, action) => {
      return _setTokens(state, action.payload);
    },
    resetTokens: (state) => {
      return _resetTokens(state);
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isAnyOf(
          api.endpoints.login.matchPending
        ),
        (state) => {
          state.loading = true;
          return state;
        }
      )
      .addMatcher(api.endpoints.login.matchFulfilled, (state, action) => {
        return _setTokens(state, action.payload.data);
      })
      .addMatcher(
        isAnyOf(
          api.endpoints.login.matchRejected
        ),
        (state) => {
          return _resetTokens(state);
        }
      );
  },
});

export const { setLoading, setTokens, resetTokens } = authSlice.actions;

export default authSlice.reducer;
