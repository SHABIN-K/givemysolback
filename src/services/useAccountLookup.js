import useSWR from "swr";
import cache from "../cache/res.json";
import cloudflareApiUrl from "../client/cloudflare";

const fetcher = (url) => fetch(url).then(res => {
    if (!res.ok) throw new Error(`API Error: ${res.status}`);
    return res.json();
});

export function useAccountLookup(walletAddress) {
    const shouldFetch = walletAddress ? `${cloudflareApiUrl}/account-lookup?wallet=${walletAddress}` : null;
    const { data, error, isLoading } = useSWR(shouldFetch, fetcher, {
        refreshInterval: 15 * 60 * 1000,
        revalidateOnFocus: false,
        fallbackData: cache
    });

    return {
        accountData: data,
        loading: isLoading,
        error,
    };
}
