import React from "react";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ConnectedState = ({ selectedOption, onDisconnect }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-green-500/30 p-6 text-center">
      <div className="mb-4">
        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl">
          <CheckCircle className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Wallet Connected! 🎉</h3>
        <p className="text-gray-300 mb-3 text-sm px-4">
          Successfully {selectedOption === "connect" ? "connected to" : "imported"} your wallet
        </p>
        <div className="bg-gray-900/50 rounded-xl p-3 mb-4">
          <p className="text-xs text-gray-400 mb-1">Connected Address:</p>
          <p className="text-white font-mono text-xs break-all">4Nd1mVHGtpVaZYnT6bEuBnPWZG8GqVE2xRTKnxJdV8fR</p>
        </div>
      </div>

      <div className="space-y-3">
        <button
          onClick={() => navigate("/reclaim")}
          className="w-full bg-gradient-to-r from-green-600 via-emerald-600 to-teal-500 hover:from-green-700 hover:via-emerald-700 hover:to-teal-600 text-white font-bold py-3 px-4 rounded-xl text-base transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
        >
          <span>🚀 Continue to Reclaim</span>
        </button>

        <button
          onClick={onDisconnect}
          className="w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-xl transition-all duration-300 text-sm"
        >
          Disconnect Wallet
        </button>
      </div>
    </div>
  );
};

export default ConnectedState;
