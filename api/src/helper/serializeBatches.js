import { TransactionMessage, VersionedTransaction } from "@solana/web3.js";
import { toBase64 } from "../utils";

async function serializeBatchArray(batches, feePayer) {
    return batches.map(batch => {
        const messageV0 = new TransactionMessage({
            payerKey: feePayer,
            recentBlockhash: "11111111111111111111111111111111",
            instructions: batch
        }).compileToV0Message();

        const vtx = new VersionedTransaction(messageV0);
        
        // Serialize to base64
        return toBase64(vtx.serialize());
    });
}

async function serializeBatches(ixBatches, feePayer) {
    return {
        burnOnly: await serializeBatchArray(ixBatches?.burnOnlyBatches || [], feePayer),
        closeOnly: await serializeBatchArray(ixBatches?.closeOnlyBatches || [], feePayer),
        closeAfterBurn: await serializeBatchArray(ixBatches?.closeAfterBurnBatches || [], feePayer)
    };
}

export default serializeBatches;