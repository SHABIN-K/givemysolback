import bs58 from "bs58";
import { Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";

export function isValidPrivateKey(base58Key) {
  try {
    const secretKey = bs58.decode(base58Key);
    const keypair = Keypair.fromSecretKey(secretKey);

    return keypair && keypair.publicKey.toBase58();
  } catch (err) {
    console.error("[isValidPrivateKey] :", err.message);
    return false;
  }
}

export const formatNumber = (num, maxFractionDigit = 6) => {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: maxFractionDigit,
  }).format(num);
};

export const calculateTotalRentInSOL = count => {
  const totalLamports = count * 2039280;
  return totalLamports / LAMPORTS_PER_SOL;
};


export const trackEvent = (eventName, data) => {
  if (window.umami) {
    window.umami.track(eventName, data);
  }
};
