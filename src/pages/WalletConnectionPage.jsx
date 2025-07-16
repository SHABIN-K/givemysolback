import CryptoJS from "crypto-js";
import React, { useState } from "react";

import { isValidPrivateKey } from "../utils";
import { clearStoredKey, STORAGE_KEY } from "../utils/EncryptStorage";

import { ConnectedState, ConnectingState, PrivateKeyImport, WalletConnectionOptions } from "../components/wallet";

const WalletConnectionPage = () => {
  const [pubKey, setPubKey] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [passphrase, setPassphrase] = useState("");

  const [error, setError] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleConnectWallet = () => {
    setSelectedOption("connect");
    setIsConnecting(true);

    // Simulate connection process
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
    }, 2000);
  };

  const handlePrivateKeySubmit = async () => {
    if (!privateKey || !passphrase) {
      setError("Private key and password are required");
      return;
    }

    if (passphrase.length < 8) {
      setError("Use a longer password (min 8 characters)");
      return;
    }

    const isValid = isValidPrivateKey(privateKey.trim());

    if (!isValid) {
      setError("Invalid private key. Please double-check and try again.");
      return;
    }
    setError("");
    setPubKey(isValid);
    setIsConnecting(true);

    const encrypted = CryptoJS.AES.encrypt(privateKey.trim(), passphrase.trim()).toString();
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        encrypted,
        walletAddress: isValid,
        savedAt: Date.now(),
      })
    );

    // Simulate import process
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
      setPassphrase("");
      setPrivateKey("");
    }, 1500);
  };

  const handleDisconnect = () => {
    clearStoredKey();
    setSelectedOption(null);
    setIsConnected(false);
    setIsConnecting(false);
    setPrivateKey("");
    setPassphrase("");
    setPubKey("");
    setError("");
  };

  const handleBackToOptions = () => {
    setSelectedOption(null);
    setPrivateKey("");
    setPassphrase("");
    setError("");
  };

  const handleImportWallet = () => {
    setSelectedOption("import");
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
                  setPrivateKey={setPrivateKey}
                  passphrase={passphrase}
                  setPassphrase={setPassphrase}
                  error={error}
                  onSubmit={handlePrivateKeySubmit}
                  onBack={handleBackToOptions}
                />
              ) : isConnecting ? (
                <ConnectingState selectedOption={selectedOption} />
              ) : null}
            </div>
          ) : (
            <ConnectedState pubKey={pubKey} selectedOption={selectedOption} onDisconnect={handleDisconnect} />
          )}
        </div>
      </div>
    </div>
  );
};

export default WalletConnectionPage;
// 4cmZxDEXJ1AVbHZognaZipNMYbz3L8M9ESpsaSeV9iRYg5M3SQYRB6MDkaGBL3CBiiR9hg5GMGy13EbaoCdrvGbM
