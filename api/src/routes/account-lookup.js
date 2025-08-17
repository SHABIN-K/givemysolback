import classifyTokenAccounts from "../helper/getClassifeidToken";
import { getBatchTokenAccounts } from "../helper/gettokenaccounts";
import { errorResponse, rentPerAccountLamports } from "../utils";

export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const wallet = url.searchParams.get("wallet");
  const skipCache = url.searchParams.get("skipCache") === "true";

  if (!wallet) return errorResponse("Missing wallet address")

  const kvKey = `${wallet}-account-data`;

  try {
    const cached = !skipCache ? await env.TOKEN_ACCOUNT_CACHE.get(kvKey, { type: "json" }) : null;
    if (cached) {

      const result = {
        rentPerAccountLamports,
        totalAccounts: cached?.totalAccounts || 0,
        zeroBalanceAccCount: cached?.zeroBalanceAccounts.length || 0,
        burnTokenAccCount: cached?.burnCandidateAccounts.length || 0,
        hasMoreData: false,
      };

      return new Response(JSON.stringify(result));
    }

    const { totalAccounts, tokenAccounts, hasMoreData } = await getBatchTokenAccounts(wallet, env);

    const { zeroBalanceAccounts, burnCandidateAccounts, verifiedMintCount } = classifyTokenAccounts(tokenAccounts);

    const totalAcnt = totalAccounts - verifiedMintCount

    await env.TOKEN_ACCOUNT_CACHE.put(kvKey, JSON.stringify({
      zeroBalanceAccounts, burnCandidateAccounts, totalAccounts: totalAcnt
    }), { expirationTtl: 1000 });

    const result = {
      rentPerAccountLamports,
      totalAccounts: totalAcnt,
      zeroBalanceAccCount: zeroBalanceAccounts.length,
      burnTokenAccCount: burnCandidateAccounts.length,
      hasMoreData: hasMoreData || false,
    };

    return new Response(JSON.stringify(result));
  } catch (err) {
    return new Response(JSON.stringify({ error: "Internal server error", details: err.message }), { status: 500 });
  }
}
