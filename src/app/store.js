import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import userReducer from "../features/user/userSlice";
import walletReducer from "../features/wallet/walletSlice";
import txnReducer from "../features/transaction/txnSlice";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("app_state");
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch {
    return undefined;
  }
};

const saveState = (state) => {
  const { auth, ...rest } = state;
  localStorage.setItem("app_state", JSON.stringify(rest));
};


const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    wallet: walletReducer,
    txns: txnReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  saveState(store.getState());
});
