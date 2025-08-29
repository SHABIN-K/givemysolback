import CryptoJS from "crypto-js";
import React, { useEffect, useState } from "react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

import { isValidPrivateKey } from "../utils";
import { STORAGE_KEY } from "../utils/EncryptStorage";
import useWalletManager from "../hooks/useWalletManager";

import Loading from "../components/Loading";
import { ConnectedState, ConnectingState, PrivateKeyImport, WalletConnectionOptions } from "../components/wallet";

const WalletConnectionPage = () => {
  const { setVisible } = useWalletModal();
  const { connected, walletAddress: publicKey, disconnect, isChecking } = useWalletManager();

  const [pubKey, setPubKey] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [passphrase, setPassphrase] = useState("");

  const [error, setError] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    if (connected && publicKey) {
      setPubKey(publicKey);
      setSelectedOption("connect");
      setIsConnected(true);
    } else {
      resetTostate();
    }
  }, [connected, publicKey]);

  const handlePrivateKeySubmit = async () => {
    if (!privateKey || !passphrase) {
      setError("Private key and password are required");
      return;
    }

    if (passphrase.length < 6) {
      setError("Use a longer password (min 6 characters)");
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
    disconnect();
    resetTostate();
  };

  const resetTostate = () => {
    setIsConnected(false);
    setIsConnecting(false);
    setSelectedOption(null);
    setPrivateKey("");
    setPassphrase("");
    setPubKey("");
    setError("");
  };

  if (isChecking) {
    return <Loading placeholder="Please wait a moment..." />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-2xl">
          {!isChecking && !isConnected && (
            <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-4 sm:p-6">
              {!selectedOption && !isConnecting ? (
                <WalletConnectionOptions
                  onConnectWallet={() => setVisible(true)}
                  onImportWallet={() => setSelectedOption("import")}
                />
              ) : selectedOption === "import" && !isConnecting ? (
                <PrivateKeyImport
                  privateKey={privateKey}
                  setPrivateKey={setPrivateKey}
                  passphrase={passphrase}
                  setPassphrase={setPassphrase}
                  error={error}
                  onSubmit={handlePrivateKeySubmit}
                  onBack={resetTostate}
                />
              ) : isConnecting ? (
                <ConnectingState selectedOption={selectedOption} />
              ) : null}
            </div>
          )}

          {!isChecking && (connected || isConnected) && (
            <ConnectedState pubKey={pubKey} selectedOption={selectedOption} onDisconnect={handleDisconnect} />
          )}
        </div>
      </div>
    </div>
  );
};

export default WalletConnectionPage;
