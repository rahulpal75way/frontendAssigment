import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const savedTxns = JSON.parse(localStorage.getItem("app_state"))?.txns;

const initialState = savedTxns || {
  txns: [],
  commissions: [],
};

const txnSlice = createSlice({
  name: "txns",
  initialState,
  reducers: {
    initiateTransfer(state, action) {
      state.txns.push({
        id: uuidv4(),
        ...action.payload,
        status: "pending",
      });
    },
    approveTransfer(state, action) {
      const txn = state.txns.find((t) => t.id === action.payload.id);
      if (txn) {
        txn.status = "approved";

        const rate = txn.type === "intl" ? 0.05 : 0.01;
        const commissionAmount = txn.amount * rate;

        state.commissions.push({
          txnId: uuidv4(),
          amount: commissionAmount,
          type: txn.type,
        });
      }
    },
    rejectTransfer(state, action) {
      const txn = state.txns.find((t) => t.id === action.payload.id);
      if (txn) txn.status = "rejected";
    },
    addCommission(state, action) {
      const { txnId, amount, type } = action.payload;
      state.commissions.push({ txnId, amount, type });
    },
    recordDeposit(state, action) {
      state.txns.push({
        id: uuidv4(),
        ...action.payload,
        status: "approved",
        action: "deposit",
        type: "deposit",
      });
    },
    recordWithdrawal(state, action) {
      state.txns.push({
        id: uuidv4(),
        ...action.payload,
        status: "approved",
        action: "withdrawal",
        type: "withdrawal",
      });
    },
  },
});

export const {
  initiateTransfer,
  approveTransfer,
  rejectTransfer,
  addCommission,
  recordDeposit,
  recordWithdrawal,
} = txnSlice.actions;

export default txnSlice.reducer;
