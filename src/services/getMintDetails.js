async function getMintDetails(mint) {
    const url = `https://lite-api.jup.ag/tokens/v2/search?query=${mint}`;

    // try {
    // const res = await fetch(url);
    // if (!res.ok) throw new Error("Mint not found");
    // const data = await res.json();
    // return {
    //     mint: mint,
    //     symbol: data[0]?.symbol || "???",
    //     name: data[0]?.name || "Unknown",
    //     logoURI: data[0]?.icon || null,
    // }
    return {
        mint: "6aEHmLAkaKjMuUCoiSQYeKY5rYD6fDzyYuzgTQRvpump",
        symbol: "Pio",
        name: "Pulcino Pio",
        logoURI: "https://ipfs.io/ipfs/bafkreie3rq3pjulkvimw3ipbn7sto4anupbpdwp7aoqajeb3zo6xjeulwe"
    }

    // } catch (error) {
    //     console.error("[JUP-API-ERROR] :", error);
    //     throw new Error("something went wrong");
    // }
}

export default getMintDetails;
