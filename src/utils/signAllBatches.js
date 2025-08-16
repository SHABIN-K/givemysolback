import solanaClient from "../client/solana";
import { Transaction } from "@solana/web3.js";

async function signAllBatches(label, txs, wallet, feePayerKey) {
    if (!txs?.length) {
        console.log(`⚠️ No transactions in section: ${label}`);
        return [];
    }

    // Get a fresh blockhash here
    const { blockhash, lastValidBlockHeight } = await solanaClient.getLatestBlockhash("finalized");


    // Decode Base64 → Transaction[]
    const transactions = txs.map(b64Tx => {
        const txBytes = Uint8Array.from(atob(b64Tx), c => c.charCodeAt(0));
        const tx = Transaction.from(txBytes);

        // Update blockhash & lastValidBlockHeight
        tx.recentBlockhash = blockhash;
        tx.lastValidBlockHeight = lastValidBlockHeight;
        tx.feePayer = feePayerKey ? feePayerKey.publicKey : wallet.publicKey;

        return tx;
    });

    // Sign all
    let signedTxs = await wallet.signAllTransactions(transactions);

    // Add feePayer signature if feepayer is availbe
    if (feePayerKey && feePayerKey.publicKey.toBase58() !== wallet.publicKey.toBase58()) {
        signedTxs = signedTxs.map(tx => {
            tx.partialSign(feePayerKey);
            return tx;
        });
    }

    // Send Tx
    const txids = [];
    for (const signedTx of signedTxs) {
        const txid = await solanaClient.sendRawTransaction(signedTx.serialize(), { skipPreflight: false });
        txids.push(txid);
        console.log(`✅ [${label}] Sent:`, txid.slice(0, 10));
    }

    return txids;
}


export default signAllBatches