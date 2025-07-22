import React from "react";
import { formatNumber } from "../../utils";

const TransactionSummary = ({ summary }) => {
  return (
    <div className="bg-gradient-to-r from-purple-900/20 via-pink-900/20 to-orange-900/20 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-4 sm:p-6 mb-8">
      <h3 className="text-lg sm:text-xl font-bold text-white mb-4">Transaction Summary</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <div className="text-center">
          <div className="text-xl sm:text-2xl font-bold text-green-400">{summary.zeroCount}</div>
          <div className="text-xs sm:text-sm text-gray-400">Zero Balance</div>
        </div>
        <div className="text-center">
          <div className="text-xl sm:text-2xl font-bold text-red-400">{summary.burnCount}</div>
          <div className="text-xs sm:text-sm text-gray-400">Burn Tokens</div>
        </div>
        <div className="text-center">
          <div className="text-xl sm:text-2xl font-bold text-blue-400">{summary.verifiedCount}</div>
          <div className="text-xs sm:text-sm text-gray-400">Verified Tokens</div>
        </div>
        <div className="text-center">
          <div className="text-xl sm:text-2xl font-bold text-purple-400">{formatNumber(summary.totalRent)} SOL</div>
          <div className="text-xs sm:text-sm text-gray-400">Total Rent</div>
        </div>
      </div>
    </div>
  );
};

export default TransactionSummary;
