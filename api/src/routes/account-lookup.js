import classifyTokenAccounts from "../helper/getClassifeidToken";
import { getBatchTokenAccounts } from "../helper/gettokenaccounts";
import { errorResponse, rentPerAccountLamports } from "../utils";

export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const wallet = url.searchParams.get("wallet");

  if (!wallet) return errorResponse("Missing wallet address")

  try {
    const { totalAccounts, tokenAccounts, hasMoreData } = await getBatchTokenAccounts(wallet, env);

    const { zeroBalanceAccounts, burnCandidateAccounts, verifiedMintCount } = classifyTokenAccounts(tokenAccounts);

    const result = {
      rentPerAccountLamports,
      totalAccounts: totalAccounts - verifiedMintCount,
      zeroBalanceAccCount: zeroBalanceAccounts.length,
      burnTokenAccCount: burnCandidateAccounts.length,
      hasMoreData,
    };

    return new Response(JSON.stringify(result));
  } catch (err) {
    return new Response(JSON.stringify({ error: "Internal server error", details: err.message }), { status: 500 });
  }
}
