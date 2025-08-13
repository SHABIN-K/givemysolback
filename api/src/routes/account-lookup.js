import { getBatchTokenAccounts } from "../helper/gettokenaccounts";
import { errorResponse, rentPerAccountLamports } from "../utils";

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

export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const wallet = url.searchParams.get("wallet");

  if (!wallet) return errorResponse("Missing wallet address")

  try {
    const { totalAccounts, tokenAccounts, hasMoreData } = await getBatchTokenAccounts(wallet, env);

    const {
      zeroBalanceAccounts,
      burnCandidateAccounts: BurnATA,
      finalVerifiedAccounts,
      verifiedMintCount,
    } = classifyTokenAccounts(tokenAccounts, metadata);

    // let verifiedMintCount = 0;

    // const zeroBalanceAccounts = tokenAccounts.filter(i => i.amount === 0);
    // const BalanceAccounts = tokenAccounts.filter(i => i.amount !== 0).map(i => i.mint);

    // const finalVerifiedAccounts = BalanceAccounts.filter(mint => {
    //   if (VERIFIED_MINTS.has(mint)) {
    //     verifiedMintCount++;
    //     return false;
    //   }
    //   return true;
    // });
    // console.log(finalVerifiedAccounts, verifiedMintCount, BalanceAccounts.length);


    const result = {
      rentPerAccountLamports,
      totalAccounts: totalAccounts - verifiedMintCount,
      // zeroBalanceAccCount: zeroBalanceAccounts.length,
      // burnTokenAccCount,
      // VerifiedAccCount: finalVerifiedAccounts.length,
      // zeroBalanceAccounts,
      // BurnATA,
      // VerifiedAccounts: finalVerifiedAccounts,
      hasMoreData,
    };

    return new Response(JSON.stringify(result));
  } catch (err) {
    return new Response(JSON.stringify({ error: "Internal server error", details: err.message }), { status: 500 });
  }
}
