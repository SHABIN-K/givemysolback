export const rentPerAccountLamports = 2039280;

export const errorResponse = (msg, status = 400) => new Response(JSON.stringify({ error: msg }), { status });

export function toBase64(uint8array) {
    let binary = "";
    for (let i = 0; i < uint8array.length; i++) {
        binary += String.fromCharCode(uint8array[i]);
    }
    return btoa(binary);
}