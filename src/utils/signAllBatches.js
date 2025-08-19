import solanaClient from "../client/solana";
import stripBadInstructions from "./stripBadInstructions";
import { VersionedTransaction } from "@solana/web3.js";

async function signAllBatches(label, txs, browserWallet, walletKeypair, walletPubkey, feePayerKey, failedInstructions) {
    // Decode Base64 → VersionedTransaction[] and strip bad instructions in parallel
    const transactions = await Promise.all(
        txs.map(async (b64Tx, i) => {
            const txBytes = Uint8Array.from(atob(b64Tx), c => c.charCodeAt(0));
            const vtx = VersionedTransaction.deserialize(txBytes);

            // Strip failing instructions BEFORE signing
            const cleanedTx = await stripBadInstructions(vtx, failedInstructions);

            // Skip empty transactions
            if (cleanedTx.message.compiledInstructions.length === 0) {
                console.warn(`⚠️ [${label}] Transaction #${i} has no instructions after stripping. Skipping.`);
                return null;
            }

            return cleanedTx;
        })
    );

    // Get a fresh blockhash 
    const { blockhash, lastValidBlockHeight } = await solanaClient.getLatestBlockhash("finalized");

    // Filter out null (empty) transactions
    const validTransactions = transactions
        .filter(tx => tx !== null)
        .map(tx => {
            tx.message.recentBlockhash = blockhash;
            tx.lastValidBlockHeight = lastValidBlockHeight;
            return tx;
        });


    // Sign all
    let signedTxs;

    if (browserWallet?.signAllTransactions && !walletKeypair) {
        signedTxs = await browserWallet.signAllTransactions(validTransactions);
    } else if (walletKeypair) {
        signedTxs = validTransactions.map(tx => {
            tx.sign([walletKeypair]);
            return tx;
        });
    } else {
        throw new Error("No signer available. Connect a wallet or import one.");
    }

    // Add feePayer signature if feepayer is availbe
    if (feePayerKey && feePayerKey.publicKey.toBase58() !== walletPubkey.toBase58()) {
        signedTxs.forEach(tx => tx.sign([feePayerKey]));
    }

    // Send Tx
    const txids = [];

    for (const signedTx of signedTxs) {
        try {
            //send the cleaned transaction (without failing instructions)
            const txid = await solanaClient.sendRawTransaction(signedTx.serialize(), { skipPreflight: false });
            txids.push(txid);

            console.log(`✅ [${label}] Sent:`, txid.slice(0, 10));
        } catch (e) {
            console.error("❌ Transaction completely failed:", e);
        }
    }

    return txids;
}


export default signAllBatches