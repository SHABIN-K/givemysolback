import React from "react";

const ConnectingState = ({ selectedOption }) => {
  const isConnecting = selectedOption === "connect";

  return (
    <div className="text-center py-8">
      <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl">
        <div className="loading-spinner w-6 h-6"></div>
      </div>
      <h3 className="text-xl font-bold text-white mb-2">
        {isConnecting ? "Connecting Wallet..." : "Importing Wallet..."}
      </h3>
      <p className="text-gray-400 text-sm px-4">
        {isConnecting
          ? "Please approve the connection in your wallet extension"
          : "Processing your private key securely"}
      </p>
    </div>
  );
};

export default ConnectingState;
