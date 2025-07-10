import React from "react";
import { Search, Coins } from "lucide-react";

const SearchCard = ({ address, setAddress, isSearching, handleSearch }) => {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-8 shadow-2xl max-w-2xl mx-auto mb-16">
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-300 mb-4">
          Enter Your Solana Wallet Address
        </label>
        <div className="relative">
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="4Nd1mVHGtpVaZYnT6bEuBnPWZG8GqVE2xRTKnxJdV8fR..."
            className="w-full pl-14 pr-6 py-4 text-lg bg-gray-900/80 border-2 border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-pink-500 focus:outline-none focus:ring-4 focus:ring-pink-500/20 transition-all"
          />
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-7 h-7 bg-gradient-to-r from-pink-500 to-orange-500 rounded-lg flex items-center justify-center">
            <Coins className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>

      <button
        onClick={handleSearch}
        disabled={!address.trim() || isSearching}
        className="w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-bold py-4 px-8 rounded-xl text-lg flex items-center justify-center gap-3 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        {isSearching ? (
          <>
            <div className="loading-spinner"></div>
            <span>Scanning Blockchain...</span>
          </>
        ) : (
          <>
            <Search className="w-6 h-6" />
            <span>Find My Lost Tokens 🔍</span>
          </>
        )}
      </button>

      <div className="mt-8 pt-6 border-t border-gray-700 grid grid-cols-3 gap-4 text-center">
        <div className="p-4 bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20 rounded-xl">
          <div className="text-2xl font-bold text-pink-400">47,291</div>
          <div className="text-xs text-gray-400 mt-1">Wallets Scanned</div>
        </div>
        <div className="p-4 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border border-orange-500/20 rounded-xl">
          <div className="text-2xl font-bold text-orange-400">₿ 2,847</div>
          <div className="text-xs text-gray-400 mt-1">SOL Recovered</div>
        </div>
        <div className="p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl">
          <div className="text-2xl font-bold text-blue-400">$1.2M</div>
          <div className="text-xs text-gray-400 mt-1">Total Value</div>
        </div>
      </div>
    </div>
  );
};

export default SearchCard;
