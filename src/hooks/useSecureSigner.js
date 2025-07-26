import bs58 from "bs58";
import { v4 as uuidv4 } from "uuid";
import { useWallet } from "@solana/wallet-adapter-react";

import cloudflareApiUrl from "../client/cloudflare";

const useSecureSigner = () => {
  const { publicKey, signMessage } = useWallet();

  const signAuthorizationMessage = async tokenAccounts => {
    if (!publicKey || !signMessage) throw new Error("Wallet not connected");

    const nonce = uuidv4();
    const timestamp = new Date().toISOString();
    const message = `I have reviewed and approved the selected valuable tokens to be closed or burned. Proceed with the cleanup.
    Wallet: ${publicKey.toBase58()}
    Nonce: ${nonce}
    Timestamp: ${timestamp}
    `.trim();

    const encodedMessage = new TextEncoder().encode(message);
    const signature = await signMessage(encodedMessage);

    return {
      ata: tokenAccounts,
      message,
      signature: bs58.encode(signature),
      wallet: publicKey.toBase58(),
      nonce,
      timestamp,
    };
  };

  const authorizeTokenClosure = async signedData => {
    try {
      const res = await fetch(`${cloudflareApiUrl}/authorize-tokens`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signedData),
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      return await res.json();
    } catch (err) {
      console.error("Failed to authorize token closure:", err);
      throw err;
    }
  };

  return { signAuthorizationMessage, authorizeTokenClosure };
};

export default useSecureSigner;
