import React, { useState } from "react";
import { ArrowLeft, Wallet } from "lucide-react";
import { useNavigate } from "react-router-dom";
import WalletConnectionOptions from "../components/wallet/WalletConnectionOptions";
import PrivateKeyImport from "../components/wallet/PrivateKeyImport";
import ConnectingState from "../components/wallet/ConnectingState";
import ConnectedState from "../components/wallet/ConnectedState";

const WalletConnectionPage = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [privateKey, setPrivateKey] = useState("");
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [privateKeyError, setPrivateKeyError] = useState("");

  const handleConnectWallet = () => {
    setSelectedOption("connect");
    setIsConnecting(true);

    // Simulate connection process
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
    }, 2000);
  };

  const handleImportWallet = () => {
    setSelectedOption("import");
  };

  const handlePrivateKeySubmit = () => {
    // Basic validation
    if (!privateKey.trim()) {
      setPrivateKeyError("Private key is required");
      return;
    }

    // Simple validation - check if it looks like a private key (base58 string, roughly 88 characters)
    if (privateKey.length < 80 || privateKey.length > 100) {
      setPrivateKeyError("Invalid private key format");
      return;
    }

    setPrivateKeyError("");
    setIsConnecting(true);

    // Simulate import process
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
    }, 2000);
  };

  const handleDisconnect = () => {
    setSelectedOption(null);
    setIsConnected(false);
    setIsConnecting(false);
    setPrivateKey("");
    setPrivateKeyError("");
  };

  const handleBackToOptions = () => {
    setSelectedOption(null);
    setPrivateKey("");
    setPrivateKeyError("");
  };

  const handlePrivateKeyChange = value => {
    setPrivateKey(value);
    setPrivateKeyError("");
  };

  return (
    <div className="min-h-screen flex flex-col py-4 px-4">
      {/* Back Button */}
      <div className="mb-4">
        <button
          onClick={() => navigate("/")}
          className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm">Back to Search</span>
        </button>
      </div>

      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center px-3 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-full mb-4">
          <Wallet className="w-3 h-3 mr-2 text-purple-400" />
          <span className="text-xs text-purple-300 font-medium">Wallet Connection</span>
        </div>

        <h1 className="text-3xl font-bold mb-3 text-white">Connect Your Wallet</h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Choose how you want to access your wallet to reclaim your tokens
        </p>
      </div>

      {/* Main Content - Centered and Compact */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-2xl">
          {!isConnected ? (
            <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6">
              {!selectedOption && !isConnecting ? (
                <WalletConnectionOptions onConnectWallet={handleConnectWallet} onImportWallet={handleImportWallet} />
              ) : selectedOption === "import" && !isConnecting ? (
                <PrivateKeyImport
                  privateKey={privateKey}
                  setPrivateKey={handlePrivateKeyChange}
                  showPrivateKey={showPrivateKey}
                  setShowPrivateKey={setShowPrivateKey}
                  privateKeyError={privateKeyError}
                  onSubmit={handlePrivateKeySubmit}
                  onBack={handleBackToOptions}
                />
              ) : isConnecting ? (
                <ConnectingState selectedOption={selectedOption} />
              ) : null}
            </div>
          ) : (
            <ConnectedState selectedOption={selectedOption} onDisconnect={handleDisconnect} />
          )}
        </div>
      </div>
    </div>
  );
};

export default WalletConnectionPage;
