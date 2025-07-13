import { PublicKey } from "@solana/web3.js";
import solanaClient from "../client/solana";

const TOKEN_PROGRAM_ID = new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA");
const rentPerAccountLamports = 2039280;

export const getUserPortfolio = async walletAddress => {
  const publicKey = new PublicKey(walletAddress);

  const tokenAccounts = await solanaClient.getParsedTokenAccountsByOwner(publicKey, { programId: TOKEN_PROGRAM_ID });

  const totalAccounts = tokenAccounts.value.length;
  const hasMoreTokens = totalAccounts >= 2500;
  const totalSOL = (totalAccounts * rentPerAccountLamports) / 1_000_000_000;

  const limitedTokenAccounts = tokenAccounts.value.slice(0, 15);
  const mintList = limitedTokenAccounts.map(acc => acc.account.data.parsed.info.mint);

  const metaRes = await fetch(`https://lite-api.jup.ag/tokens/v2/search?query=${mintList.join(",")}`);
  const metaData = await metaRes.json();

  const tokens = limitedTokenAccounts.map(acc => {
    const info = acc.account.data.parsed.info;
    const mint = info.mint;
    const meta = metaData.find(m => m.id === mint);

    return {
      mint,
      symbol: meta?.symbol || "???",
      name: meta?.name || "Unknown",
      logoURI: meta?.icon || null,
      amount: info.tokenAmount.uiAmount,
      decimals: info.tokenAmount.decimals,
      tokenAccount: acc.pubkey.toBase58(),
    };
  });

  return {
    solBalance: totalSOL,
    totalAccounts,
    tokens,
    hasMoreTokens: hasMoreTokens,
  };
};
