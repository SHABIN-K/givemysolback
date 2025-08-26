import cloudflareApiUrl from "../client/cloudflare";

export const getAccOverview = async walletAddress => {
  try {
    const response = await fetch(`${cloudflareApiUrl}/account-overview?wallet=${walletAddress}`);

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

export const getSignableTx = async body => {
  try {
    const response = await fetch(`${cloudflareApiUrl}/generate-signable-tx`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) throw new Error(`API Error: ${response.status}`);

    const data = await response.json();

    if (!data) throw new Error("No transactions to process");
    return data;
  } catch (err) {
    console.error("Error fetching signable transaction:", err);
    throw err;
  }
};
