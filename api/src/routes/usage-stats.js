
export async function onRequestGet({ request, env }) {
    try {
        const data = await env.TOKEN_ACCOUNT_CACHE.get("global_reclaim_total");
        return new Response(data, {
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "public, max-age=60, s-maxage=3600"
            }
        });
    } catch (err) {
        return new Response(JSON.stringify({ error: "Internal server error", details: err.message }), { status: 500 });
    }
}
