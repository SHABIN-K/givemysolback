import useSWR from "swr";
import React from "react";
import cache from "../cache/res.json";
import cloudflareApiUrl from "../client/cloudflare";

const fetcher = (url) => fetch(url).then(res => {
    if (!res.ok) throw new Error(`API Error: ${res.status}`);
    return res.json();
});

export function useAccountLookup(walletAddress) {
    // Load from localStorage if exists
    const raw = localStorage.getItem(`accountData:${walletAddress}`);
    let cached = null;
    if (raw) {
        try {
            cached = JSON.parse(raw);
        } catch (e) {
            cached = null;
        }
    }

    const isValidCache = cached && Date.now() - cached.cachedAt < 15 * 60 * 1000;

    const url = walletAddress && !isValidCache ? `${cloudflareApiUrl}/account-lookup?wallet=${walletAddress}` : null

    // Use SWR with fallbackData if cache is still valid
    const { data, error, isLoading } = useSWR(url, fetcher, {
        refreshInterval: 15 * 60 * 1000,
        revalidateOnFocus: false,
        fallbackData: isValidCache ? cached.data : undefined,
    });

    localStorage.setItem(`accountData:${walletAddress}`, JSON.stringify({
        data,
        cachedAt: Date.now(),
    }))

    React.useEffect(() => {
        if (data && walletAddress) {
            localStorage.setItem(`accountData:${walletAddress}`,
                JSON.stringify({ data, cachedAt: Date.now(), })
            );
        }
    }, [data, walletAddress]);

    return {
        accountData: data || (isValidCache ? cached.data : null),
        loading: isLoading && !isValidCache,
        error,
    };
}
