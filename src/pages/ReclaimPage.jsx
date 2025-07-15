import React from "react";
import { ArrowLeft, Coins, Zap, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ReclaimPage = () => {
//   const navigate = useNavigate();

  return (
    <div className="min-h-screen py-8">
      {/* Back Button */}
      <div className="mb-8">
        <button
        //   onClick={() => navigate("/connect-wallet")}
          className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Wallet</span>
        </button>
      </div>

      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-full mb-6">
          <Coins className="w-4 h-4 mr-2 text-green-400" />
          <span className="text-sm text-green-300 font-medium">Token Reclaim</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-white">🚀 Reclaim Your Tokens</h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">Time to get your forgotten SOL and tokens back!</p>
      </div>

      {/* Sample Reclaim Interface */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl">
              <Zap className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Ready to Reclaim! 🎉</h3>
            <p className="text-gray-400">This is where the magic happens - token reclaim functionality</p>
          </div>

          {/* Sample Progress Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-6 bg-green-500/10 border border-green-500/20 rounded-xl">
              <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <h4 className="text-white font-semibold mb-2">Wallet Connected</h4>
              <p className="text-gray-400 text-sm">Successfully connected to your wallet</p>
            </div>
            <div className="text-center p-6 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
              <Coins className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
              <h4 className="text-white font-semibold mb-2">Tokens Scanned</h4>
              <p className="text-gray-400 text-sm">Found recoverable tokens in your wallet</p>
            </div>
            <div className="text-center p-6 bg-blue-500/10 border border-blue-500/20 rounded-xl">
              <Zap className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <h4 className="text-white font-semibold mb-2">Ready to Reclaim</h4>
              <p className="text-gray-400 text-sm">All systems ready for token recovery</p>
            </div>
          </div>

          {/* Sample Action Button */}
          <div className="text-center">
            <button
              onClick={() => {
                alert(
                  "🚀 Token reclaim functionality would be implemented here!\n\nThis would:\n- Create transactions to recover tokens\n- Handle multiple token transfers\n- Show progress and confirmations"
                );
              }}
              className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-500 hover:from-green-700 hover:via-emerald-700 hover:to-teal-600 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2 mx-auto"
            >
              <Zap className="w-5 h-5" />
              <span>🎯 Start Token Recovery</span>
            </button>

            <p className="text-gray-500 text-sm mt-4">Sample reclaim page - functionality to be implemented</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReclaimPage;
