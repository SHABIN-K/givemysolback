import React from "react";
import { Coins } from "lucide-react";

const SearchCard = ({ address, setAddress, isSearching, handleSearch, placeholder, usage }) => {
  const handleKeyPress = e => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const stats = [
    { key: "accountsClosed", label: "Accounts Closed", colors: ["pink-500", "purple-500"], textColor: "pink-400" },
    { key: "solRecovered", label: "SOL Recovered", colors: ["orange-500", "yellow-500"], textColor: "orange-400" },
    { key: "totalValue", label: "Total Value", colors: ["blue-500", "cyan-500"], textColor: "blue-400" },
  ];

  return (
    <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-8 shadow-2xl max-w-2xl mx-auto mb-16">
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            value={address}
            onChange={e => setAddress(e.target.value)}
            onKeyUp={handleKeyPress}
            placeholder={placeholder}
            className="w-full pl-14 pr-6 py-4 text-lg bg-gray-900/80 border-2 border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-pink-500 focus:outline-none focus:ring-4 focus:ring-pink-500/20 transition-all"
          />
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-7 h-7 bg-gradient-to-r from-pink-500 to-orange-500 rounded-lg flex items-center justify-center">
            <Coins className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>

      {address && (
        <button
          onClick={handleSearch}
          disabled={!address.trim() || isSearching}
          className="w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-semibold py-4 px-8 rounded-xl text-lg flex items-center justify-center shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSearching ? (
            <>
              <div className="loading-spinner" />
              <span>Scanning Blockchain...</span>
            </>
          ) : (
            <span>Scan My Wallet</span>
          )}
        </button>
      )}

      <div className="mt-8 pt-6 border-t border-gray-700 grid grid-cols-3 gap-4 text-center">
        {stats.map(stat => (
          <div
            key={stat.key}
            className={`p-4 bg-gradient-to-r from-${stat.colors[0]}/10 to-${stat.colors[1]}/10 border border-${stat.colors[0]}/20 rounded-xl`}
          >
            <div className={`text-2xl font-bold text-${stat.textColor}`}>{usage[stat.key] || "0"}</div>
            <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchCard;
