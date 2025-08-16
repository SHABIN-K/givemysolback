import { Connection, Transaction } from "@solana/web3.js";

async function serializeBatchArray(batches, feePayer, connection) {
    const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash("finalized");

    return batches.map(batch => {
        const tx = new Transaction({
            blockhash,
            lastValidBlockHeight,
            feePayer
        }).add(...batch);

        return tx.serialize({ requireAllSignatures: false, verifySignatures: false }).toString("base64");
    });
}

async function serializeBatches(ixBatches, feePayer, env) {
    const connection = new Connection(env.RPC_URL, "processed");
    return {
        burnOnly: await serializeBatchArray(ixBatches?.burnOnlyBatches || [], feePayer, connection),
        closeOnly: await serializeBatchArray(ixBatches?.closeOnlyBatches || [], feePayer, connection),
        closeAfterBurn: await serializeBatchArray(ixBatches?.closeAfterBurnBatches || [], feePayer, connection)
    };
}

export default serializeBatches;