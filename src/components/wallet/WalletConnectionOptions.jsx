import React from "react";
import { Wallet, Key, Link } from "lucide-react";

const WalletConnectionOptions = ({ onConnectWallet, onImportWallet }) => {
  return (
    <>
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl">
          <Link className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Choose Connection Method</h3>
        <p className="text-gray-400 text-sm px-4">Select how you want to connect your Solana wallet</p>
      </div>

      {/* Two Main Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {/* Connect Wallet - Recommended */}
        <button
          onClick={onConnectWallet}
          className="relative w-full p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 hover:border-blue-400 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg group text-center"
        >
          {/* Recommended Badge */}
          <div className="absolute -top-2 -right-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            ⭐ Recommended
          </div>

          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-xl group-hover:shadow-blue-500/25 transition-all duration-300">
            <Wallet className="w-6 h-6 text-white" />
          </div>
          <h4 className="text-white font-bold text-lg mb-2">Connect Wallet</h4>
          <p className="text-gray-400 text-sm leading-relaxed px-2">
            Connect using browser extension wallets like Phantom, Solflare, or Backpack
          </p>
          <div className="mt-3 text-xs text-blue-300 font-medium">🔒 Most Secure Method</div>
        </button>

        {/* Import Wallet */}
        <button
          onClick={onImportWallet}
          className="w-full p-6 bg-gradient-to-r from-orange-500/10 to-pink-500/10 border border-orange-500/30 hover:border-orange-400 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg group text-center"
        >
          <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-xl group-hover:shadow-orange-500/25 transition-all duration-300">
            <Key className="w-6 h-6 text-white" />
          </div>
          <h4 className="text-white font-bold text-lg mb-2">Import Wallet</h4>
          <p className="text-gray-400 text-sm leading-relaxed px-2">Import using your private key for direct access</p>
          <div className="mt-3 text-xs text-orange-300 font-medium">⚡ Quick Access</div>
        </button>
      </div>
    </>
  );
};

export default WalletConnectionOptions;
