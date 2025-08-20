import { PublicKey } from "@solana/web3.js";
import { getAssociatedTokenAddressSync, TOKEN_2022_PROGRAM_ID, TOKEN_PROGRAM_ID, } from "@solana/spl-token";

import { errorResponse } from "../utils";
import serializeBatches from "../helper/serializeBatches";
import buildInstructions from "../helper/buildInstructions";

export async function onRequestPost({ request, env }) {
    try {
        const { wallet, ignoreMints, invalidATA, paymentConfig } = await request.json();

        if (!wallet) return errorResponse("Missing fields in request");

        let totalProcessed = 0;
        const kvKey = `${wallet}-account-data`;
        const global_total_key = "global_reclaim_total";
        const userPubkey = new PublicKey(wallet);
        const commissionPercent = Math.min(100, Math.max(0, paymentConfig.commissionPercent ?? 5));  // default 5%
        const feePayerPubkey = paymentConfig?.feePayer ? new PublicKey(paymentConfig.feePayer) : userPubkey;
        const rentReceiverPubkey = paymentConfig?.rentReceiver ? new PublicKey(paymentConfig.rentReceiver) : userPubkey;

        const accountSnapshot = await env.TOKEN_ACCOUNT_CACHE.get(kvKey);
        const reclaimTotal = await env.TOKEN_ACCOUNT_CACHE.get(global_total_key);

        if (reclaimTotal) {
            const parsed = JSON.parse(reclaimTotal);
            totalProcessed = parsed.totalReclaimedAccounts || 0;
        }

        if (!accountSnapshot) return errorResponse("No account data found in this wallet", 404);

        const ignoreAtas = ignoreMints?.map(({ mint, token22 }) => {
            const mintPubkey = new PublicKey(mint);
            const programId = token22 ? TOKEN_2022_PROGRAM_ID : TOKEN_PROGRAM_ID;

            return getAssociatedTokenAddressSync(
                mintPubkey,
                userPubkey,
                false,
                programId,
            ).toBase58();
        });

        const InstructionsBatches = await buildInstructions(
            ignoreAtas,
            accountSnapshot,
            userPubkey,
            rentReceiverPubkey,
            commissionPercent,
            invalidATA
        );

        const serializedTxs = await serializeBatches(InstructionsBatches, feePayerPubkey)

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
