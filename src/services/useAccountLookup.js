import useSWR from "swr";
import cloudflareApiUrl from "../client/cloudflare";

const fetcher = (url) => fetch(url).then(res => {
    if (!res.ok) throw new Error(`API Error: ${res.status}`);
    return res.json();
});

export function useAccountLookup(walletAddress) {
    const baseUrl = walletAddress ? `${cloudflareApiUrl}/account-lookup?wallet=${walletAddress}` : null;
    const { data, error, isLoading, mutate: swrMutate } = useSWR(baseUrl, fetcher, {
        refreshInterval: 15 * 60 * 1000,
        revalidateOnFocus: false,
    });

    const refetch = async () => {
        if (!walletAddress) return;

        const refetchUrl = `${cloudflareApiUrl}/account-lookup?wallet=${walletAddress}&skipCache=true`;
        const freshData = await fetcher(refetchUrl);

        // Update SWR cache for the main key
        swrMutate(freshData, false);
    };

    return {
        accountData: data,
        loading: isLoading,
        error,
        refetch
    };
}
