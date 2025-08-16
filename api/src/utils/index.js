export const rentPerAccountLamports = 2039280;

export const errorResponse = (msg, status = 400) => new Response(JSON.stringify({ error: msg }), { status });
