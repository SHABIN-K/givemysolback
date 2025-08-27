import cloudflareApiUrl from "../client/cloudflare";

async function getAppStats() {
    try {
        const response = await fetch(`${cloudflareApiUrl}/usage-stats`);

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (err) {
        console.error("Error fetching app stats:", err);
        throw err;
    }
}

export default getAppStats;
