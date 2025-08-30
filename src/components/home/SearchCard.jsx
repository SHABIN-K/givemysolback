import React from "react";
import { Coins } from "lucide-react";

const SearchCard = ({ address, setAddress, isSearching, handleSearch, placeholder, usage }) => {
  const handleKeyPress = e => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // prettier-ignore
  const stats = [
    { key: "accountsClosed", label: "Accounts Closed", bgFrom: "from-pink-500/10", bgTo: "to-purple-500/10", border: "border-pink-500/20", text: "text-pink-400"},
    { key: "totalValue", label: "Total Value", bgFrom: "from-blue-500/10", bgTo: "to-cyan-500/10", border: "border-blue-500/20", text: "text-blue-400"},
    { key: "solRecovered", label: "SOL Recovered", bgFrom: "from-orange-500/10", bgTo: "to-yellow-500/10", border: "border-orange-500/20", text: "text-orange-400"},
  ];

  return (
    <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-4 sm:p-8 shadow-2xl max-w-2xl mx-auto mb-8">
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            value={address}
            onChange={e => setAddress(e.target.value)}
            onKeyUp={handleKeyPress}
            placeholder={placeholder}
            className="w-full pl-12 pr-4 py-3 sm:pl-14 sm:pr-6 sm:py-4 text-sm sm:text-base md:text-lg bg-gray-900/80 border-2 border-pink-500 rounded-xl text-white placeholder-gray-400 focus:border-pink-500 focus:outline-none focus:ring-4 focus:ring-pink-500/20 transition-all"
          />
          <div className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 sm:w-7 sm:h-7 bg-gradient-to-r from-pink-500 to-orange-500 rounded-lg flex items-center justify-center">
            <Coins className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
          </div>
        </div>
      </div>

      {address && (
        <button
          onClick={handleSearch}
          disabled={!address.trim() || isSearching}
          className="w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-xl text-base sm:text-lg flex items-center justify-center shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
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

      <div className="mt-6 sm:mt-8 pt-6 border-t border-gray-700 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-center">
        {stats.map(stat => (
          <div
            key={stat.key}
            className={`p-3 sm:p-4 bg-gradient-to-r ${stat.bgFrom} ${stat.bgTo} border ${stat.border} rounded-xl`}
          >
            <div className={`text-xl sm:text-2xl font-bold ${stat.text}`}>{usage[stat.key] || "0"}</div>
            <div className="text-xs sm:text-sm text-gray-400 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchCard;
