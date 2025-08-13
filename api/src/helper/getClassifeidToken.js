const VERIFIED_MINTS = new Set([
  "11111111111111111111111111111111", // Native SOL (system program ID)
  "So11111111111111111111111111111111111111111", // SOL (SOL)
  "So11111111111111111111111111111111111111112", // Wrapped SOL (wSOL)
  "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", // USDC
  "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB", // USDT
  "4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R", // RAY (Raydium)
  "jtojtomepa8beP8AuQc6eXt5FriJwfFMwQx2v2f9mCL", // JTO (Jito)
  "J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn", // jitoSOL
  "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN", // JUP (Jupiter)
  "9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E", // BTC (renBTC)
]);

/**
 * Efficiently classifies Solana token accounts into three categories using hash-based lookups:
 *
 * - zeroBalanceAccounts: Tokens with a 0 balance (likely safe to close).
 * - burnCandidateAccounts: Unverified tokens with a non-zero balance (potentially unwanted; can consider burning).
 * - finalVerifiedAccounts: Tokens verified via metadata but not present in the hardcoded VERIFIED_MINTS list.
 */

function classifyTokenAccounts(tokenAccounts, metadata) {
  let verifiedMintCount = 0;
  const zeroBalanceAccounts = [];
  const verifiedAccounts = [];
  const burnCandidateAccounts = {
    ataOnly: [], // Contains only ATA addresses
    fullData: [], // Contains full account objects
  };

  for (const account of tokenAccounts) {
    const amount = Number(account.amount);
    const isVerified = account?.reputation === "ok";

    if (isVerified) {
      verifiedAccounts.push(account);
      continue;
    }

    if (amount === 0) {
      zeroBalanceAccounts.push(account.address);
      continue;
    }

    const meta = metadata[account.tokenAddress] ?? {};
    if (meta && meta.is_calculate_on_portfolio && meta.is_show_value) {
      burnCandidateAccounts.fullData.push(account);
    } else {
      burnCandidateAccounts.ataOnly.push(account.address);
    }
  }

  const finalVerifiedAccounts = verifiedAccounts.filter(account => {
    if (VERIFIED_MINTS.has(account.tokenAddress)) {
      verifiedMintCount++;
      return false;
    }
    return true;
  });

  return {
    zeroBalanceAccounts,
    burnCandidateAccounts,
    finalVerifiedAccounts,
    verifiedMintCount,
  };
}

export default classifyTokenAccounts;
