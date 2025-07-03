// TxnHistory.jsx
import React, { useMemo, useCallback } from "react";
import { useSelector } from "react-redux";
import HeaderSection from "../../components/HeaderSection";
import TransactionTable from "../../components/TransactionTable";

const TxnHistory = () => {
  const user = useSelector((state) => state.auth.user);
  const { txns } = useSelector((state) => state.txns);

  const filtered = useMemo(
    () => txns.filter((t) => t.from === user.id || t.to === user.id),
    [txns, user.id]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-pink-400 to-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <HeaderSection />
        <TransactionTable txns={filtered} userId={user.id} />
      </div>
    </div>
  );
};

export default TxnHistory;
