import React from "react";
import { CheckCircle, Coins, Sparkles, Copy, ExternalLink } from "lucide-react";

const SearchResults = ({ searchResults, resetSearch }) => {
  const formatNumber = (num) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  };
  console.log(searchResults?.tokens?.length);
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="max-w-4xl mx-auto mt-16">
      {/* Results Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-full mb-4">
          <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
          <span className="text-sm text-green-300 font-medium">
            Scan Complete!
          </span>
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">
          Found Your Tokens! 🎉
        </h2>
        <p className="text-gray-400">
          Here's what we discovered in your wallet
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400">
              ${formatNumber(searchResults.totalValue)}
            </div>
            <div className="text-sm text-gray-400 mt-1">Total Value</div>
          </div>
        </div>
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400">
              {searchResults.solBalance} SOL
            </div>
            <div className="text-sm text-gray-400 mt-1">SOL Balance</div>
          </div>
        </div>
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-400">
              {searchResults.tokens.length + searchResults.nfts.length}
            </div>
            <div className="text-sm text-gray-400 mt-1">Assets Found</div>
          </div>
        </div>
      </div>

      {/* Tokens Section */}
      <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6 mb-8">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center">
          <Coins className="w-5 h-5 mr-2 text-yellow-400" />
          Token Holdings
        </h3>
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
              className="flex items-center justify-between p-4 bg-gray-900/50 border border-gray-700/30 rounded-xl"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {token.symbol.slice(0, 2)}
                  </span>
                </div>
                <div>
                  <div className="text-white font-semibold">{token.name}</div>
                  <div className="text-gray-400 text-sm">{token.symbol}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-white font-semibold">{token.balance}</div>
                <div className="text-green-400 text-sm">
                  ${formatNumber(token.value)}
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(token.mint)}
                className="p-2 text-gray-400 hover:text-white transition-colors"
                title="Copy mint address"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* NFTs Section */}
      <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6 mb-8">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center">
          <Sparkles className="w-5 h-5 mr-2 text-pink-400" />
          NFT Collection
        </h3>
        <div
          className={`grid gap-4 ${
            searchResults.nfts.length === 1
              ? "grid-cols-1"
              : searchResults.nfts.length === 2
              ? "grid-cols-1 sm:grid-cols-2"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {searchResults.nfts.map((nft, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 p-4 bg-gray-900/50 border border-gray-700/30 rounded-xl"
            >
              <img
                src={nft.image}
                alt={nft.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <div className="text-white font-semibold">{nft.name}</div>
                <div className="text-gray-400 text-sm">{nft.collection}</div>
                <div className="text-purple-400 text-sm font-medium">
                  {nft.value} SOL
                </div>
              </div>
              <button className="p-2 text-gray-400 hover:text-white transition-colors">
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="text-center">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105">
            Export Results 📊
          </button>
          <button
            onClick={resetSearch}
            className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300"
          >
            Scan Another Wallet
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
