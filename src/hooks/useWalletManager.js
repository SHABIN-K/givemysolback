import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

import { getImportedWallet } from "../utils/EncryptStorage";

export default function useWalletManager() {
  const extWallet = useWallet();
  const [importedWallet, setImportedWallet] = useState(getImportedWallet());
  const [isChecking, setIsChecking] = useState(true);

  // Sync on storage change
  useEffect(() => {
    const update = () => {
      const wallet = getImportedWallet();
      setImportedWallet(wallet);
      setTimeout(() => setIsChecking(false), 300);
    };

    update();
    window.addEventListener("storage", update);

    return () => {
      window.removeEventListener("storage", update);
    };
  }, []);

  const isExtensionConnected = extWallet.connected;
  const isImportedConnected = importedWallet?.connected;

  const connected = isExtensionConnected || isImportedConnected;
  const publicKey = isExtensionConnected ? extWallet.publicKey.toBase58() : importedWallet?.publicKey;

  const disconnect = () => {
    if (isExtensionConnected) {
      extWallet.disconnect();
    } else if (isImportedConnected) {
      importedWallet?.disconnect?.();
    }
  };

  return {
    connected,
    publicKey,
    disconnect,
    source: isExtensionConnected ? "connect" : isImportedConnected ? "import" : null,
    isChecking,
  };
}
