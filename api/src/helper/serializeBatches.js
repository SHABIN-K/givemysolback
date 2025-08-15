import { Connection, Transaction } from "@solana/web3.js";

async function serializeBatchArray(batches, ownerPubkey, connection) {
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

async function serializeBatches(ixBatches, ownerPubkey, env) {
    const connection = new Connection(env.RPC_URL, "processed");
    return {
        burnOnly: await serializeBatchArray(ixBatches?.burnOnlyBatches || [], ownerPubkey, connection),
        closeOnly: await serializeBatchArray(ixBatches?.closeOnlyBatches || [], ownerPubkey, connection),
        closeAfterBurn: await serializeBatchArray(ixBatches?.closeAfterBurnBatches || [], ownerPubkey, connection)
    };
}

export default serializeBatches;