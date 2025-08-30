import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Coins, ExternalLink } from "lucide-react";

const SearchResults = ({ searchResults, resetSearch }) => {
  const navigate = useNavigate();

  if (!searchResults || (searchResults.totalAccounts === 0 && searchResults.solBalance === 0)) {
    return (
      <div className="max-w-2xl mx-auto mt-8 sm:mt-16 px-4">
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6 sm:p-8 pt-10 sm:pt-12 text-center">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">No assets showing right now</h3>
          <p className="text-gray-400 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
            This wallet has no SPL accounts associated with it, so there are no recoverable assets in your wallet at the moment.
          </p>

          <button onClick={resetSearch} className="text-gray-400 hover:text-white underline text-sm transition-colors">
            Scan Another Wallet
          </button>
        </div>
      </div>
    );
  }

  const stats = [
    { value: `${searchResults.solBalance.toFixed(4)} SOL`, label: "SOL Balance", color: "text-purple-400" },
    { value: `$${Math.round(searchResults.totalUSD).toLocaleString()}`, label: "Total Value", color: "text-green-400" },
    { value: searchResults.totalAccounts, label: "Assets Found", color: "text-orange-400" },
  ];

  return (
    <div className="max-w-4xl mx-auto mt-8 sm:mt-16 ">
      <div className="text-center mb-6 sm:mb-8">
        <div className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-full mb-3 sm:mb-4">
          <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-400 mr-1.5 sm:mr-2" />
          <span className="text-xs sm:text-sm text-green-300 font-medium">Scan Complete!</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">What You Own, All Here 🎉</h2>
        <p className="text-gray-400 text-sm sm:text-base">
          An instant view of everything that's yours, together in one overview.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {stats.map((data, idx) => (
          <div key={idx} className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-4 sm:p-6">
            <div className="text-center">
              <div className={`text-2xl sm:text-3xl font-bold ${data?.color}`}>{data?.value}</div>
              <div className="text-xs sm:text-sm text-gray-400 mt-1">{data?.label}</div>
            </div>
          </div>
        ))}
      </div>

      {searchResults.hasMoreTokens && (
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-3 sm:p-4 mb-6 sm:mb-8">
          <p className="text-yellow-200 text-xs sm:text-sm text-center">
            <strong>Note:</strong> Your portfolio is quite large. Because of this, the total token count, SOL balance, and USD
            value shown may not include everything. Please note the actual balance might be higher than what's displayed here.
          </p>
        </div>
      )}

      <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-4 sm:p-6 mb-6 sm:mb-8">
        <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6 flex items-center">
          <Coins className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-yellow-400" />
          Token Holdings
        </h3>
        <div className="relative">
          <div
            className={`grid gap-3 sm:gap-4 ${
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
                className={`flex items-center justify-between p-3 sm:p-4 bg-gray-900/50 border border-gray-700/30 rounded-xl transition-all ${
                  index >= 6 ? "opacity-90 blur-[0.8px]" : ""
                }`}
              >
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center overflow-hidden">
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
                      <span className="text-white font-bold text-xs sm:text-sm">{token.symbol.slice(0, 2)}</span>
                    )}
                  </div>

                  <div>
                    <div className="text-white font-semibold text-sm sm:text-base">{token.name.slice(0, 15)}</div>
                    <div className="text-gray-400 text-xs sm:text-sm">{token.symbol}</div>
                  </div>
                </div>
                <button
                  onClick={e => {
                    e.stopPropagation();
                    window.open(`https://solscan.io/account/${token.mint}`, "_blank");
                  }}
                  className="p-1.5 sm:p-2 text-gray-400 hover:text-white transition-colors"
                  title="Copy mint address"
                >
                  <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-32 sm:h-40 bg-gradient-to-t from-gray-800/95 via-gray-800/70 to-transparent rounded-b-xl flex flex-col items-center justify-center pb-3 sm:pb-4 space-y-3 sm:space-y-4">
            <button
              onClick={() => navigate("/manage-wallet")}
              className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 text-white font-bold py-2.5 sm:py-3 px-6 sm:px-8 rounded-xl text-sm sm:text-base transition-all duration-300 transform hover:scale-105 shadow-2xl relative overflow-hidden group z-10"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <span className="relative flex items-center justify-center gap-2">
                <Coins className="w-4 h-4 sm:w-5 sm:h-5" />
                Reclaim SOL
              </span>
            </button>
            {searchResults.totalAccounts > 15 && (
              <span className="text-gray-300 text-xs sm:text-sm font-medium">
                +{searchResults.totalAccounts - 15} more tokens...
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="text-center mt-4 sm:mt-6">
        <button onClick={resetSearch} className="text-gray-400 hover:text-white underline text-sm transition-colors">
          Scan Another Wallet
        </button>
      </div>
    </div>
  );
};

export default SearchResults;
