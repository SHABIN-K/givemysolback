import { Transaction } from "@solana/web3.js";
import solanaClient from "../client/solana";

async function signAllBatches(label, txs, wallet) {
    if (!txs?.length) {
        console.log(`⚠️ No transactions in section: ${label}`);
        return [];
    }

    // Decode Base64 → Transaction[]
    const transactions = txs.map(b64Tx => {
        const txBytes = Uint8Array.from(atob(b64Tx), c => c.charCodeAt(0));
        return Transaction.from(txBytes);
    });

    // Sign all
    const signedTxs = await wallet.signAllTransactions(transactions);

    // Send & confirm
    const txids = [];
    for (const signedTx of signedTxs) {
        const txid = await solanaClient.sendRawTransaction(signedTx.serialize(), { skipPreflight: false });
        txids.push(txid);
        console.log(`✅ [${label}] Sent:`, txid.slice(0, 10));
    }

    for (const txid of txids) {
        await solanaClient.confirmTransaction(txid, {
            commitment: "confirmed",
            strategy: { type: "single" },
        });
        console.log(`🎯 [${label}] Confirmed:`, txid.slice(0, 10));
    }

    return txids;
}


export default signAllBatches