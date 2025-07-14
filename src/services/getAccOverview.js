import cloudflareApiUrl from "../client/cloudflare";

export const getAccOverview = async walletAddress => {
  try {
    const response = await fetch(`${cloudflareApiUrl}/account-overview?wallet=${walletAddress}`, {
      headers: {
        "x-api-key": import.meta.env.VITE_WORKER_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error fetching account overview:", err);
    throw err;
  }
};
