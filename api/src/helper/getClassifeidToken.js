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

function classifyTokenAccounts(tokenAccounts) {
  let verifiedMintCount = 0;
  const zeroBalanceAccounts = [];
  const burnCandidateAccounts = [];

  for (const account of tokenAccounts) {
    const amount = Number(account.amount);

    if (amount === 0) {
      zeroBalanceAccounts.push(account.address);
    } else {
      if (VERIFIED_MINTS.has(account.mint)) {
        verifiedMintCount++;
      } else {
        burnCandidateAccounts.push({
          address: account.address,
          mint: account.mint,
          amount
        });
      }
    }
  }

  return {
    zeroBalanceAccounts,
    burnCandidateAccounts,
    verifiedMintCount,
  };
}

export default classifyTokenAccounts;
