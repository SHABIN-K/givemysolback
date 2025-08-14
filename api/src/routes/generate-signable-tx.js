import { Connection, PublicKey, Transaction } from "@solana/web3.js";
import { getAssociatedTokenAddressSync, } from "@solana/spl-token";

import { errorResponse, RPC_URL } from "../utils";
import buildCloseInstructions from "../helper/buildCloseInstructions";

export async function onRequestPost({ request, env }) {
    try {
        const { wallet, ignoreMints } = await request.json();

        if (!wallet) return errorResponse("Missing fields in request");

        const kvKey = `${wallet}-account-data`;
        const accountSnapshot = await env.TOKEN_ACCOUNT_CACHE.get(kvKey);
        if (!accountSnapshot) return errorResponse("No account data found for this wallet", 403);

        const ownerPubkey = new PublicKey(wallet);
        const atas = ignoreMints.map(mint => {
            const mintPubkey = new PublicKey(mint);
            return getAssociatedTokenAddressSync(mintPubkey, ownerPubkey).toBase58();
        });

        const { zeroBalanceAccounts, burnCandidateAccounts } = JSON.parse(accountSnapshot || "{}");
        const instructionBatches = await buildCloseInstructions(atas, zeroBalanceAccounts, ownerPubkey);

        const connection = new Connection(RPC_URL, "processed");
        const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash("finalized");

        const serializedTxs = [];

        for (const batch of instructionBatches) {
            const tx = new Transaction({
                blockhash,
                lastValidBlockHeight,
                feePayer: ownerPubkey
            }).add(...batch);

            const b64 = tx.serialize({ requireAllSignatures: false, verifySignatures: false }).toString("base64");

            serializedTxs.push(b64);
        }

        return new Response(JSON.stringify({ txs: serializedTxs, count: serializedTxs.length }), { status: 200 });
    } catch (err) {
        return new Response(JSON.stringify({ error: "Internal server error", details: err.message }), { status: 500 });
    }
}
