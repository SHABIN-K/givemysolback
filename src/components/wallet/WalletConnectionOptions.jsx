import React from "react";
import { Wallet, Key, Link } from "lucide-react";

const WalletConnectionOptions = ({ onConnectWallet, onImportWallet }) => {
  return (
    <>
      <div className="text-center mb-4 sm:mb-6">
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-2xl">
          <Link className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Choose Connection Method</h3>
        <p className="text-gray-400 text-xs sm:text-sm px-2 sm:px-4">Select how you want to connect your Solana wallet</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
        <button
          data-umami-event="connect-wallet-start"
          onClick={onConnectWallet}
          className="relative w-full p-4 sm:p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 hover:border-blue-400 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg group text-center"
        >
          <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-2 sm:px-3 py-1 rounded-full shadow-lg">
            ⭐ Recommended
          </div>

          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-2 sm:mb-3 shadow-xl group-hover:shadow-blue-500/25 transition-all duration-300">
            <Wallet className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <h4 className="text-white font-bold text-base sm:text-lg mb-1 sm:mb-2">Connect Wallet</h4>
          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed px-1 sm:px-2">
            Connect using browser extension wallets like Phantom, Solflare, or Backpack
          </p>
          <div className="mt-2 sm:mt-3 text-xs text-blue-300 font-medium">🔒 Most Secure Method</div>
        </button>

        <button
          data-umami-event="import-wallet-start"
          onClick={onImportWallet}
          className="w-full p-4 sm:p-6 bg-gradient-to-r from-orange-500/10 to-pink-500/10 border border-orange-500/30 hover:border-orange-400 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg group text-center"
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-2 sm:mb-3 shadow-xl group-hover:shadow-orange-500/25 transition-all duration-300">
            <Key className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <h4 className="text-white font-bold text-base sm:text-lg mb-1 sm:mb-2">Import Wallet</h4>
          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed px-1 sm:px-2">
            Import using your private key for direct access
          </p>
          <div className="mt-2 sm:mt-3 text-xs text-orange-300 font-medium">⚡ Quick Access</div>
        </button>
      </div>
    </>
  );
};

export default WalletConnectionOptions;
