import { PublicKey } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";

export const getUserPortfolio = async (connection, walletAddress) => {
  const publicKey = new PublicKey(walletAddress);

  const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
    publicKey,
    { programId: TOKEN_PROGRAM_ID }
  );

  console.log(tokenAccounts);

  const tokens = tokenAccounts.value.map((acc) => {
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
    totalValue: 247.83,
    solBalance: 12.45,
    tokens,
  };
};
