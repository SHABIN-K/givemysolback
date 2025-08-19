import solanaClient from "../client/solana";
import { VersionedTransaction, TransactionMessage } from "@solana/web3.js";

async function stripBadInstructions(signedTx, failedIx) {
    let workingTx = signedTx;

    while (true) {
        const simResult = await solanaClient.simulateTransaction(workingTx, {
            sigVerify: false,
            replaceRecentBlockhash: true,
        });

        if (!simResult.value.err) {
            console.log("✅ All remaining instructions passed");
            break;
        }

        const [badIndex, err] = simResult.value.err.InstructionError;
        console.warn(`❌ Instruction #${badIndex} failed with:`, err);

        // Save failing info
        failedIx.push({
            index: badIndex,
            error: err,
            ata: workingTx.message.staticAccountKeys[workingTx.message.compiledInstructions[badIndex].accountKeyIndexes[0]].toBase58()
        });

        const newInstructions = workingTx.message.compiledInstructions.filter(
            (_, i) => i !== badIndex
        );

        const newMessage = new TransactionMessage({
            payerKey: workingTx.message.staticAccountKeys[0],
            recentBlockhash: workingTx.message.recentBlockhash,
            instructions: newInstructions.map(ix => ({
                programId: workingTx.message.staticAccountKeys[ix.programIdIndex],
                keys: ix.accountKeyIndexes.map(i => ({
                    pubkey: workingTx.message.staticAccountKeys[i],
                    isSigner: workingTx.message.isAccountSigner(i),
                    isWritable: workingTx.message.isAccountWritable(i),
                })),
                data: ix.data,
            })),
        }).compileToV0Message();

        workingTx = new VersionedTransaction(newMessage);
    }

    return workingTx
}

export default stripBadInstructions