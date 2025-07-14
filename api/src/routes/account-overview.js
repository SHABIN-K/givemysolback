const rentPerAccountLamports = 2039280;

export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const wallet = url.searchParams.get("wallet");

  if (!wallet) {
    return new Response("Missing wallet address", { status: 400 });
  }

  try {
    const heliusURL = `https://mainnet.helius-rpc.com/?api-key=${env.RPC_API_KEY}`;

    const response = await fetch(heliusURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "getTokenAccountsByOwner",
        params: [wallet, { programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA" }, { encoding: "jsonParsed" }],
      }),
    });

    const data = await response.json();

    // If Helius returned an error
    if (data.error) {
      return new Response(JSON.stringify({ error: data.error.message }), { status: 500 });
    }

    const tokenAccounts = data.result?.value || [];
    const totalAccounts = tokenAccounts.length;
    const hasMoreTokens = totalAccounts > 2500;
    const totalSOL = (totalAccounts * rentPerAccountLamports) / 1_000_000_000;

    const limitedTokenAccounts = tokenAccounts.slice(0, 15);
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
        tokenAccountAddress: acc.pubkey,
      };
    });

    return new Response(
      JSON.stringify({
        solBalance: totalSOL,
        totalAccounts,
        hasMoreTokens,
        tokens,
      })
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: "Internal server error", details: err.message }), { status: 500 });
  }
}
