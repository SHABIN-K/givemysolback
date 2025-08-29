import React from "react";

const ConnectingState = ({ selectedOption }) => {
  const isConnecting = selectedOption === "connect";

  return (
    <div className="text-center py-6 sm:py-8">
      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-2xl">
        <div className="loading-spinner w-5 h-5 sm:w-6 sm:h-6"></div>
      </div>
      <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
        {isConnecting ? "Connecting Wallet..." : "Importing Wallet..."}
      </h3>
      <p className="text-gray-400 text-xs sm:text-sm px-2 sm:px-4">
        {isConnecting
          ? "Please approve the connection in your wallet extension"
          : "Processing your private key securely"}
      </p>
    </div>
  );
};

export default ConnectingState;
