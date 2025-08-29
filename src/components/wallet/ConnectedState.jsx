import React from "react";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ConnectedState = ({ pubKey, selectedOption, onDisconnect }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-green-500/30 p-4 sm:p-6 text-center">
      <div className="mb-3 sm:mb-4">
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-2xl">
          <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Wallet Connected! 🎉</h3>
        <p className="text-gray-300 mb-2 sm:mb-3 text-xs sm:text-sm px-2 sm:px-4">
          Successfully {selectedOption === "connect" ? "connected to" : "imported"} your wallet
        </p>
        <div className="bg-gray-900/50 rounded-xl p-2 sm:p-3 mb-3 sm:mb-4">
          <p className="text-xs text-gray-400 mb-1">Connected Address:</p>
          <p className="text-white font-mono text-xs break-all">{pubKey || "something went wrong"}</p>
        </div>
      </div>

      <div className="space-y-2 sm:space-y-3">
        <button
          onClick={() => navigate("/manage-wallet")}
          className="w-full bg-gradient-to-r from-green-600 via-emerald-600 to-teal-500 hover:from-green-700 hover:via-emerald-700 hover:to-teal-600 text-white font-bold py-2.5 sm:py-3 px-4 rounded-xl text-sm sm:text-base transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
        >
          <span>🚀 Continue to Reclaim</span>
        </button>

        <button
          onClick={onDisconnect}
          className="w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-xl transition-all duration-300 text-xs sm:text-sm"
        >
          Disconnect Wallet
        </button>
      </div>
    </div>
  );
};

export default ConnectedState;
