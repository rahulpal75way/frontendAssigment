import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { addCommission, recordDeposit, recordWithdrawal } from "../transaction/txnSlice";

const savedWallet = JSON.parse(localStorage.getItem("app_state"))?.wallet;

const initialState = savedWallet || {
  balances: {},
  pendingDeposits: [],
  pendingWithdrawals: [],
};

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    requestDeposit(state, action) {
      state.pendingDeposits.push({
        id: uuidv4(),
        ...action.payload,
        status: "pending",
      });
    },

    requestWithdrawal(state, action) {
      state.pendingWithdrawals.push({
        id: uuidv4(),
        ...action.payload,
        status: "pending",
      });
    },

    approveDeposit(state, action) {
      const req = state.pendingDeposits.find((r) => r.id === action.payload.id);
      if (req) {
        req.status = "approved";
        state.balances[req.userId] =
          (state.balances[req.userId] || 0) + req.amount;
      }
    },

    approveWithdrawal(state, action) {
      const req = state.pendingWithdrawals.find(
        (r) => r.id === action.payload.id
      );
      if (req) {
        req.status = "approved";
        state.balances[req.userId] =
          (state.balances[req.userId] || 0) - req.amount;
      }
    },

    rejectDeposit(state, action) {
      const req = state.pendingDeposits.find((r) => r.id === action.payload.id);
      if (req && req.status === "pending") {
        req.status = "rejected";
      }
    },

    rejectWithdrawal(state, action) {
      const req = state.pendingWithdrawals.find(
        (r) => r.id === action.payload.id
      );
      if (req && req.status === "pending") {
        req.status = "rejected";
      }
    },
  },
});

export const {
  requestDeposit,
  approveDeposit,
  requestWithdrawal,
  approveWithdrawal,
  rejectDeposit,
  rejectWithdrawal,
} = walletSlice.actions;

export default walletSlice.reducer;

export const handleApproveDeposit = (id) => (dispatch, getState) => {
  const state = getState();
  const depositReq = state.wallet.pendingDeposits.find((d) => d.id === id);

  if (depositReq && depositReq.status !== "approved") {
    dispatch(approveDeposit({ id }));

    const commissionAmount = depositReq.amount * 0.02;

    dispatch(
      addCommission({
        txnId: id,
        amount: commissionAmount,
        type: "deposit",
      })
    );

    dispatch(
      recordDeposit({
        from: null,
        to: depositReq.userId,
        amount: depositReq.amount,
      })
    );
  }
};

export const handleApproveWithdrawal = (id) => (dispatch, getState) => {
  const state = getState();
  const withdrawalReq = state.wallet.pendingWithdrawals.find(
    (r) => r.id === id
  );

  if (withdrawalReq && withdrawalReq.status !== "approved") {
    dispatch(approveWithdrawal({ id }));

    dispatch(
      recordWithdrawal({
        from: withdrawalReq.userId,
        to: null,
        amount: withdrawalReq.amount,
      })
    );

    const commissionAmount = withdrawalReq.amount * 0.02;

    dispatch(
      addCommission({
        txnId: withdrawalReq.id,
        amount: commissionAmount,
        type: "withdrawal",
      })
    );
  }
};

export const handleRejectDeposit = (id) => (dispatch, getState) => {
  const state = getState();
  const depositReq = state.wallet.pendingDeposits.find((d) => d.id === id);

  if (depositReq && depositReq.status === "pending") {
    dispatch(rejectDeposit({ id }));
  }
};

export const handleRejectWithdrawal = (id) => (dispatch, getState) => {
  const state = getState();
  const withdrawalReq = state.wallet.pendingWithdrawals.find(
    (r) => r.id === id
  );

  if (withdrawalReq && withdrawalReq.status === "pending") {
    dispatch(rejectWithdrawal({ id }));
  }
};


