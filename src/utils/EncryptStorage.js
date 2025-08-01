import CryptoJS from "crypto-js";

export const STORAGE_KEY = "encryptedPrivateKey";
const MAX_LIFETIME = 1 * 60 * 60 * 1000; // 1 hours in ms

export function decryptPrivateKey(passphrase) {
  const item = localStorage.getItem(STORAGE_KEY);
  if (!item) return null;

  try {
    const { encrypted } = JSON.parse(item);
    const bytes = CryptoJS.AES.decrypt(encrypted, passphrase);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return decrypted || null;
  } catch {
    return null;
  }
}

export function clearStoredKey() {
  localStorage.removeItem(STORAGE_KEY);
}

export function getImportedWallet() {
  const item = localStorage.getItem(STORAGE_KEY);
  if (!item) return null;

  try {
    const { walletAddress } = JSON.parse(item);
    if (!walletAddress) return null;

    return {
      connected: true,
      publicKey: walletAddress,
      disconnect: () => {
        localStorage.removeItem(STORAGE_KEY);
        window.dispatchEvent(new Event("storage"));
      },
    };
  } catch (error) {
    console.error("Failed to parse imported wallet:", error);
    return null;
  }
}

export function checkAndCleanupStoredKey() {
  const item = localStorage.getItem(STORAGE_KEY);
  if (!item) return;

  try {
    const parsed = JSON.parse(item);
    const expired = Date.now() - parsed.savedAt > MAX_LIFETIME;
    if (expired) {
      localStorage.removeItem(STORAGE_KEY);
      console.log("[wallet] Auto-removed expired encrypted key");
    }
  } catch {
    // If corrupted or invalid, remove it too
    localStorage.removeItem(STORAGE_KEY);
  }
}
