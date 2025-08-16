import { PublicKey } from "@solana/web3.js";
import { getAssociatedTokenAddressSync, } from "@solana/spl-token";

import { errorResponse } from "../utils";
import serializeBatches from "../helper/serializeBatches";
import buildInstructions from "../helper/buildInstructions";

export async function onRequestPost({ request, env }) {
    try {
        const { wallet, ignoreMints, paymentConfig } = await request.json();

        if (!wallet) return errorResponse("Missing fields in request");

        let totalProcessed = 0;
        const kvKey = `${wallet}-account-data`;
        const global_total_key = "global_reclaim_total";
        const userPubkey = new PublicKey(wallet);
        const masterPubkey = new PublicKey("AK7ecjPXdnk2svnTUXWzRX1d6xfC2EhRGPP56g5GLsvn");
        const feePayerPubkey = paymentConfig?.feePayer ? new PublicKey(paymentConfig.feePayer) : userPubkey;
        const rentReceiverPubkey = paymentConfig?.rentReceiver ? new PublicKey(paymentConfig.rentReceiver) : userPubkey;

        const accountSnapshot = await env.TOKEN_ACCOUNT_CACHE.get(kvKey);
        const reclaimTotal = await env.TOKEN_ACCOUNT_CACHE.get(global_total_key);

        if (reclaimTotal) {
            const parsed = JSON.parse(reclaimTotal);
            totalProcessed = parsed.totalReclaimedAccounts || 0;
        }

        if (!accountSnapshot) return errorResponse("No account data found for this wallet", 404);

        const ignoreAtas = ignoreMints?.map(mint => {
            const mintPubkey = new PublicKey(mint);
            return getAssociatedTokenAddressSync(mintPubkey, userPubkey).toBase58();
        });

        const InstructionsBatches = await buildInstructions(ignoreAtas, accountSnapshot, userPubkey, rentReceiverPubkey);

        const serializedTxs = await serializeBatches(InstructionsBatches, feePayerPubkey, env)

        const newTotal = totalProcessed + InstructionsBatches.totalAccounts;

        await env.TOKEN_ACCOUNT_CACHE.put(global_total_key, JSON.stringify({
            totalReclaimedAccounts: newTotal,
            lastUpdated: Date.now()
        }));

        return new Response(JSON.stringify({ txs: serializedTxs }), { status: 200 });
    } catch (err) {
        return new Response(JSON.stringify({ error: "Internal server error", details: err.message }), { status: 500 });
    }
}
