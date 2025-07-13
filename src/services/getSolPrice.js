
async function getSolPrice() {
  const SOL_ID = "So11111111111111111111111111111111111111112";
  const url = `https://lite-api.jup.ag/price/v3?ids=${SOL_ID}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch SOL price");
    const data = await res.json();
    return data[SOL_ID].usdPrice;
  } catch (error) {
    console.error("Error fetching SOL price:", error);
    return null;
  }
}

export default getSolPrice;
