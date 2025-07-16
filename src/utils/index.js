import bs58 from "bs58";
import { Keypair } from "@solana/web3.js";

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
