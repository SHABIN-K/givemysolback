import React from "react";
import { ArrowLeft, Key, AlertTriangle } from "lucide-react";

const PrivateKeyImport = ({ privateKey, setPrivateKey, passphrase, setPassphrase, error, onSubmit, onBack }) => {
  const handleKeyPress = e => {
    if (e.key === "Enter") onSubmit();
  };

  return (
    <>
      <div className="mb-3 sm:mb-4">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors group mb-3 sm:mb-4"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm">Back to Options</span>
        </button>
      </div>

      <div className="text-center mb-4 sm:mb-6">
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-2xl">
          <Key className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Import Your Wallet</h3>
        <p className="text-gray-400 text-xs sm:text-sm px-2 sm:px-4">Paste your private key to import your Solana wallet</p>
      </div>

      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-3 mb-3 sm:mb-4">
        <div className="flex items-start space-x-2 sm:space-x-3">
          <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="text-yellow-200 font-semibold mb-1 text-xs sm:text-sm">Security Notice</h4>
            <p className="text-yellow-200/80 text-xs">
              Your private key is processed locally and never stored on our servers. Make sure you're on the correct website and
              no one is watching your screen.
            </p>
          </div>
        </div>
      </div>

      {/* Private Key Input */}
      <div className="mb-3 sm:mb-4">
        <div className="relative space-y-2 sm:space-y-3">
          <textarea
            value={privateKey}
            onChange={e => setPrivateKey(e.target.value)}
            onKeyUp={handleKeyPress}
            maxLength={100}
            placeholder="Paste your Wallet private key..."
            className={`w-full px-3 py-2 sm:py-3 bg-gray-900/80 border-2 ${
              error ? "border-red-500" : "border-gray-600"
            } rounded-xl text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-500/20 transition-all resize-none overflow-y-hidden h-16 sm:h-20 font-mono text-xs sm:text-sm`}
          />
          <input
            type="text"
            value={passphrase}
            onChange={e => setPassphrase(e.target.value)}
            placeholder="Set a password to protect your wallet..."
            className={`w-full px-3 py-2 bg-gray-900/80 border-2 ${
              error ? "border-red-500" : "border-gray-600"
            } rounded-xl text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-500/20 transition-all font-mono text-xs sm:text-sm`}
          />
        </div>
        {error && (
          <p className="text-red-400 text-xs mt-2 flex items-center space-x-1">
            <AlertTriangle className="w-3 h-3" />
            <span>{error}</span>
          </p>
        )}
      </div>

      <button
        onClick={onSubmit}
        disabled={!privateKey || !passphrase}
        className="w-full bg-gradient-to-r from-orange-600 via-pink-600 to-red-500 hover:from-orange-700 hover:via-pink-700 hover:to-red-600 disabled:from-gray-600 disabled:via-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-bold py-2.5 sm:py-3 px-4 rounded-xl text-sm sm:text-base transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 shadow-lg flex items-center justify-center space-x-2"
      >
        <span>🔐 Import Wallet</span>
      </button>
    </>
  );
};

export default PrivateKeyImport;
