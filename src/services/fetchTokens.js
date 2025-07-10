import { PublicKey } from "@solana/web3.js";
// import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import solanaClient from "../client/solana";
import { mockResults } from "../constant";
const TOKEN_PROGRAM_ID = new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA");

export const getUserPortfolio = async (walletAddress, limit = 12) => {
  const publicKey = new PublicKey(walletAddress);

  const tokenAccounts = await solanaClient.getParsedTokenAccountsByOwner(
    publicKey,
    { programId: TOKEN_PROGRAM_ID }
  );

  const rentPerAccountLamports = 2039280;
  const totalAccounts = tokenAccounts.value.length;

  const totalLamports = totalAccounts * rentPerAccountLamports;
  const totalSOL = totalLamports / 1_000_000_000;

  const res = await fetch("https://lite-api.jup.ag/price/v3?ids=So11111111111111111111111111111111111111112");
  const data = await res.json();
  const solPrice = data["So11111111111111111111111111111111111111112"].usdPrice;

  const totalUSD = totalSOL * solPrice;

  const tokens = tokenAccounts.value.slice(0, typeof limit === "number" && limit > 0 ? limit : undefined)
    .map((acc) => {
      const info = acc.account.data.parsed.info;
      return {
        mint: info.mint,
        symbol: "???", // placeholder
        name: "Unknown", // placeholder
        amount: info.tokenAmount.uiAmount,
        decimals: info.tokenAmount.decimals,
        tokenAccount: acc.pubkey.toBase58(),
      };
    });

  return {
    totalValue: totalUSD,
    solBalance: totalSOL.toFixed(4),
    totalAccounts,
    tokens,
    nfts: mockResults.nfts,
  };
};
