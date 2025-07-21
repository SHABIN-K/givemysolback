import redssponse from "../../../../worker/src/cache/res.json";

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

  if (!wallet) return new Response("Missing wallet address", { status: 400 });

  try {
    const heliusURL = `https://mainnet.helius-rpc.com?api-key=${env.RPC_API_KEY}`;

    const resMintdetail = await fetch(heliusURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "getAssetBatch",
        params: {
          ids: ["5zcHcvMhSzo4YjssiZoAmTzVx9JSCCuzwPUdewb1pump", "7kB8ZkSBJr2uiBWfveqkVBN7EpZMFom5PqeWUB62DCRD"],
        },
      }),
    });
    const Mintdetail = await resMintdetail.json();

    console.log(Mintdetail?.result);
    if (Mintdetail) {
      return new Response(JSON.stringify(Mintdetail?.result));
    }

    const response = await fetch(heliusURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "getTokenAccounts",
        params: {
          owner: wallet,
          page: 1,
          limit: 1000,
          options: {
            showZeroBalance: true,
          },
        },
      }),
    });

    const data = await response.json();

    // If Helius returned an error
    if (data.error) {
      return new Response(JSON.stringify({ error: data.error.message }), { status: 500 });
    }
    let verifiedMintCount = 0;
    const tokenAccounts = Array.isArray(data?.result?.token_accounts) ? data.result.token_accounts : [];
    // const zeroBalanceAccounts = tokenAccounts.filter(i => i.amount === 0);
    const BalanceAccounts = tokenAccounts.filter(i => i.amount !== 0).map(i => i.mint);

    const finalVerifiedAccounts = BalanceAccounts.filter(mint => {
      if (VERIFIED_MINTS.has(mint)) {
        verifiedMintCount++;
        return false;
      }
      return true;
    });
    console.log(finalVerifiedAccounts, verifiedMintCount, BalanceAccounts.length);

    return new Response(JSON.stringify(data?.result?.token_accounts));
  } catch (err) {
    return new Response(JSON.stringify({ error: "Internal server error", details: err.message }), { status: 500 });
  }
}
