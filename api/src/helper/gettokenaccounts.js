
const getTokenAccounts = async (wallet, currentPage, env) => {
  const heliusURL = `https://mainnet.helius-rpc.com?api-key=${env.RPC_API_KEY}`;

  try {
    const response = await fetch(heliusURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "getTokenAccounts",
        params: {
          owner: wallet,
          page: currentPage,
          limit: 1000,
          options: {
            showZeroBalance: true,
          },
        },
      }),
    });

    const data = await response.json();

    if (!data.result) {
      throw new Error("[API_ERROR_THIRD]: Invalid response from Helius");
    }

    return data.result;

  } catch (err) {
    throw new Error("[API_ERROR_THIRD]");
  }
};

export const getBatchTokenAccounts = async (wallet, env) => {
  let currentPage = 1;
  let hasMore = true;
  let allTokenAccounts = [];

  while (hasMore && currentPage <= 5) {
    const { total, limit, token_accounts } = await getTokenAccounts(wallet, currentPage, env);
    allTokenAccounts = allTokenAccounts.concat(token_accounts || []);

    hasMore = limit <= total;
    currentPage++;
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  return {
    totalAccounts: allTokenAccounts?.length,
    tokenAccounts: allTokenAccounts,
    hasMoreData: hasMore,
  };
};
