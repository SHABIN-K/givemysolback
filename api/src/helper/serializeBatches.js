import { RPC_URL } from "../utils";
import { Connection, Transaction } from "@solana/web3.js";

const connection = new Connection(RPC_URL, "processed");

async function serializeBatchArray(batches, ownerPubkey) {
    const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash("finalized");

    return batches.map(batch => {
        const tx = new Transaction({
            blockhash,
            lastValidBlockHeight,
            feePayer: ownerPubkey
        }).add(...batch);

        return tx.serialize({ requireAllSignatures: false, verifySignatures: false }).toString("base64");
    });
}

async function serializeBatches(ixBatches, ownerPubkey) {
    return {
        burnOnly: await serializeBatchArray(ixBatches?.burnOnlyBatches || [], ownerPubkey),
        closeOnly: await serializeBatchArray(ixBatches?.closeOnlyBatches || [], ownerPubkey),
        closeAfterBurn: await serializeBatchArray(ixBatches?.closeAfterBurnBatches || [], ownerPubkey)
    };
}

export default serializeBatches;