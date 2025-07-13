const getTokensByOwner = async (walletAddress, page = 1) => {
  try {
                  const res = await fetch(import.meta.env.VITE_RPC_ENDPOINT, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      jsonrpc: "2.0",
                      id: "search-assets-prv-spl-token",
                      method: "searchAssets",
                      params: {
                        page,
                        limit: 1000,
                        ownerAddress: walletAddress,
                        tokenType: "fungible",
                        interface: "FungibleToken",
                        options: {
                          showZeroBalance: true,
                          showNativeBalance: true,
                        },
                      },
                    }),
                  });

    const { result } = await res.json();
    const items = result?.items || [];
    const total = result?.total || 0;
    const price_per_sol_in_usd = result?.nativeBalance?.price_per_sol || 0;

    const tokens = items.map((item) => ({
      mint: item.id,
      symbol: item.content?.metadata?.symbol || "???",
      name: item.content?.metadata?.name || "Unknown",
      logoURI: item.content?.links?.image || null,
      amount: item.token_info?.balance || 0,
      decimals: item.token_info?.decimals || 0,
      tokenAccount: item.token_info?.associated_token_address,
    }));

    return {
      tokens,
      total,
      solPrice: price_per_sol_in_usd,
    };
  } catch (err) {
    console.error("❌ Failed to fetch assets:", err);
    return { tokens: [], total: null, solPrice: null };
  }
};

export default getTokensByOwner;
