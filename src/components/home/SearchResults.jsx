import React from "react";
import { CheckCircle, Coins, ExternalLink } from "lucide-react";
import { formatNumber } from "../../utils";

const SearchResults = ({ searchResults, resetSearch }) => {
  if (!searchResults || (searchResults.totalAccounts === 0 && searchResults.solBalance === 0)) {
    return (
      <div className="max-w-2xl mx-auto mt-16">
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-8 text-center">
          <div className="relative mx-auto mb-6 w-24 h-24">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-600 rounded-2xl transform rotate-12 opacity-60"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-gray-600 to-gray-500 rounded-2xl transform -rotate-6 opacity-80"></div>
            <div className="relative bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl p-4 border border-gray-600 flex flex-col items-center justify-center h-full">
              <div className="text-2xl mb-1">💸</div>
              <div className="w-8 h-0.5 bg-gray-500 rounded"></div>
              <div className="w-6 h-0.5 bg-gray-600 rounded mt-1"></div>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-white mb-4">No Tokens Found</h3>
          <p className="text-gray-400 mb-6 leading-relaxed">
            This wallet appears to be empty or doesn't contain any recoverable tokens. This could mean:
          </p>

          <div className="text-left bg-gray-900/50 rounded-xl p-6 mb-6 space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-gray-300 text-sm">The wallet has already been emptied</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-gray-300 text-sm">It's a new wallet with no transaction history</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-gray-300 text-sm">The address might be incorrect</p>
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={resetSearch}
              className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 text-white font-bold py-4 px-6 rounded-xl text-base transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              🔍 Try Another Wallet
            </button>

            <p className="text-gray-500 text-sm">Double-check the wallet address and try again</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-16">
      {/* Results Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-full mb-4">
          <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
          <span className="text-sm text-green-300 font-medium">Scan Complete!</span>
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Found Your Tokens! 🎉</h2>
        <p className="text-gray-400">Here's what we discovered in your wallet</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400">${formatNumber(searchResults.totalUSD, 2)}</div>
            <div className="text-sm text-gray-400 mt-1">Total Value</div>
          </div>
        </div>
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400">{searchResults.solBalance.toFixed(4)} SOL</div>
            <div className="text-sm text-gray-400 mt-1">SOL Balance</div>
          </div>
        </div>
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-400">{searchResults.totalAccounts}</div>
            <div className="text-sm text-gray-400 mt-1">Assets Found</div>
          </div>
        </div>
      </div>

      {searchResults.hasMoreTokens && (
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 mb-8">
          <p className="text-yellow-200 text-sm text-center">
            <strong>Note:</strong> Your portfolio is quite large. Because of this, the total token count, SOL balance, and USD
            value shown may not include everything. Please note the actual balance might be higher than what's displayed here.
          </p>
        </div>
      )}

      {/* Tokens Section */}
      <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6 mb-8">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center">
          <Coins className="w-5 h-5 mr-2 text-yellow-400" />
          Token Holdings
        </h3>
        <div className="relative">
          <div
            className={`grid gap-4 ${
              searchResults.tokens.length === 1
                ? "grid-cols-1"
                : searchResults.tokens.length === 2
                ? "grid-cols-1 sm:grid-cols-2"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {searchResults.tokens.map((token, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-4 bg-gray-900/50 border border-gray-700/30 rounded-xl transition-all ${
                  index >= 6 ? "opacity-90 blur-[0.8px]" : ""
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center overflow-hidden">
                    {token.logoURI ? (
                      <img
                        src={token.logoURI}
                        alt={token.name}
                        onError={e => {
                          e.target.onerror = null;
                          e.target.src = "/fallback-coin.png";
                        }}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-white font-bold text-sm">{token.symbol.slice(0, 2)}</span>
                    )}
                  </div>

                  <div>
                    <div className="text-white font-semibold">{token.name.slice(0, 15)}</div>
                    <div className="text-gray-400 text-sm">{token.symbol}</div>
                  </div>
                </div>
                <button
                  onClick={e => {
                    e.stopPropagation();
                    window.open(`https://solscan.io/account/${token.mint}`, "_blank");
                  }}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                  title="Copy mint address"
                >
                  <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-gray-800/95 via-gray-800/70 to-transparent rounded-b-xl flex flex-col items-center justify-center pb-4 space-y-4">
            <button className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 text-white font-bold py-3 px-8 rounded-xl text-base transition-all duration-300 transform hover:scale-105 shadow-2xl relative overflow-hidden group z-10">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <span className="relative flex items-center justify-center gap-2">
                <Coins className="w-5 h-5" />
                🚀 Reclaim All Tokens
              </span>
            </button>
            {searchResults.totalAccounts > 15 && (
              <span className="text-gray-300 text-sm font-medium">+{searchResults.totalAccounts - 15} more tokens...</span>
            )}
          </div>
        </div>
      </div>

      {/* Scan Another Wallet */}
      <div className="text-center mt-6">
        <button onClick={resetSearch} className="text-gray-400 hover:text-white underline text-sm transition-colors">
          Scan Another Wallet
        </button>
      </div>
    </div>
  );
};

export default SearchResults;
