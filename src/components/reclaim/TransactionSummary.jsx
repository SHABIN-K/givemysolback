import React from "react";
import { formatNumber } from "../../utils";

const TransactionSummary = ({ summary }) => {
  const summaryItems = [
    { key: "zeroCount", color: "text-orange-400", label: "Zero Balance", format: v => v },
    { key: "burnCount", color: "text-red-400", label: "Burn Tokens", format: v => v },
    { key: "totalRent", color: "text-purple-400", label: "Total Rent", format: v => `${formatNumber(v)} SOL` },
    { key: "totalUSD", color: "text-green-400", label: "Total Value", format: v => `${formatNumber(v, 2)}$` },
  ];

  return (
    <div className="bg-gradient-to-r from-purple-900/20 via-pink-900/20 to-orange-900/20 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-4 sm:p-6 mb-8">
      <h3 className="text-lg sm:text-xl font-bold text-white mb-4">Transaction Summary</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
        {summaryItems.map(({ key, color, label, format }) => (
          <div className="text-center" key={key}>
            <div className={`text-xl sm:text-2xl font-bold ${color}`}>{format(summary[key])}</div>
            <div className="text-xs sm:text-sm text-gray-400">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(TransactionSummary);
