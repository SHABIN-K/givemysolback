import React, { useState } from "react";
import WalletConnectionOptions from "../components/wallet/WalletConnectionOptions";
import PrivateKeyImport from "../components/wallet/PrivateKeyImport";
import ConnectingState from "../components/wallet/ConnectingState";
import ConnectedState from "../components/wallet/ConnectedState";

const WalletConnectionPage = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [privateKey, setPrivateKey] = useState("");
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
    <div className="min-h-screen flex flex-col py-4">
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
// 4cmZxDEXJ1AVbHZognaZipNMYbz3L8M9ESpsaSeV9iRYg5M3SQYRB6MDkaGBL3CBiiR9hg5GMGy13EbaoCdrvGbM
