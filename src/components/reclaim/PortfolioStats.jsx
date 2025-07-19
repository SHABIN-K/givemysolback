import React from "react";

const statItems = [
  { label: "Burn Tokens", color: "text-red-400", key: "burnCandidatesCount" },
  { label: "Verified Tokens", color: "text-blue-400", key: "verifiedTokensCount" },
  { label: "Zero Balance", color: "text-green-400", key: "zeroBalanceCount" },
];

const PortfolioStats = ({ stats }) => {
  return (
    <dl className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-8" aria-label="Portfolio statistics">
      {statItems.map(({ label, color, key }) => (
        <div
          key={label}
          className="bg-gray-800/50 backdrop-blur-xl rounded-xl border border-gray-700/50 p-4 text-center"
        >
          <dd className={`text-xl sm:text-2xl font-bold ${color}`}>{stats?.[key] ?? 0}</dd>
          <dt className="text-xs sm:text-sm text-gray-400 mt-1">{label}</dt>
        </div>
        
      ))}
    </dl>
  );
}; 

export default PortfolioStats;