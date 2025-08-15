import cache from "../cache/res.json";
import cacheTx from "../cache/tx.json";
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

export const getAccLookup = async walletAddress => {
  try {
    const response = await fetch(`${cloudflareApiUrl}/account-lookup?wallet=${walletAddress}`);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    // const data = cache;
    return data;
  } catch (err) {
    console.error("Error fetching account lookup:", err);
    throw err;
  }
};

export const getSignableTx = async body => {
  try {
    const response = await fetch(`${cloudflareApiUrl}/generate-signable-tx`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    // const response = await fetch(`http://127.0.0.1:8787/generate-signable-tx`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(body),
    // });

    if (!response.ok) throw new Error(`API Error: ${response.status}`);

    const data = await response.json();

    if (!data) throw new Error("No transactions to process");
    // const data = cacheTx
    return data;
  } catch (err) {
    console.error("Error fetching signable transaction:", err);
    throw err;
  }
};
