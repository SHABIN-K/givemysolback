import { PublicKey } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID, createCloseAccountInstruction, createBurnInstruction, TOKEN_2022_PROGRAM_ID } from "@solana/spl-token";

function chunkArray(arr, size = 1) {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) chunks.push(arr.slice(i, i + size));
    return chunks;
}

/**
 * buildInstructions
 *
 * Creates the transaction instructions needed to process token accounts.
 *
 * @param {Array} ignoreAtas - List of associated token accounts (ATAs) to ignore during processing.
 * @param {Object} accountSnapshot - Snapshot of the user's token accounts, including total counts, zero-balance accounts, and burn candidates.
 * @param {PublicKey} userPubkey - The public key of the user whose accounts are being processed.
 * @param {PublicKey} rentReceiverPubkey - The public key that will receive any reclaimed SOL (rent) from closed accounts.
 * @param {number} commissionPercent - The percentage of accounts to take as commission during processing.
 * @param {Array} invalidATA - List of ATA to change to token22 format during processing.
 *
 * @returns {Promise<Array>} Array of Solana transaction instructions ready to be sent.
 *
 * This function filters out ignored ATAs,
 * and generates all instructions needed to close accounts and send rent/fees accordingly.
 */
function buildInstructions(ignoreAtas, accountSnapshot, userPubkey, rentReceiverPubkey, commissionPercent, invalidATA) {
    const { zeroBalanceAccounts = [], burnCandidateAccounts = [], totalAccounts } = JSON.parse(accountSnapshot || "{}");

    const ignoreSet = new Set(ignoreAtas);
    const invalidATASet = new Set(invalidATA);
    const masterPubkey = new PublicKey("AK7ecjPXdnk2svnTUXWzRX1d6xfC2EhRGPP56g5GLsvn");
    const effectiveTotal = totalAccounts - ignoreSet.size;
    const commissionAccounts = totalAccounts > 5 ? Math.ceil((effectiveTotal * commissionPercent) / 100) : 0;

    // Filter ignored accounts
    const filteredZeroAcc = zeroBalanceAccounts.filter(ata => !ignoreSet.has(ata));
    const filteredBurnAcc = burnCandidateAccounts.filter(acc => !ignoreSet.has(acc.address));

    const closeOnlyInstr = [];
    const burnOnlyInstr = [];
    const closeAfterBurnInstr = [];

    let remainingCommission = commissionAccounts;

    const getDestinationAndProgram = (ata, remainingCommission) => {
        const destination = remainingCommission > 0 ? masterPubkey : rentReceiverPubkey;
        const programId = invalidATASet.has(ata) ? TOKEN_2022_PROGRAM_ID : TOKEN_PROGRAM_ID;
        return { destination, programId };
    };

    // Create instruction sets per chunk
    // Zero balance accounts: just close
    for (const ata of filteredZeroAcc) {
        const { destination, programId } = getDestinationAndProgram(ata, remainingCommission);
        closeOnlyInstr.push(
            createCloseAccountInstruction(
                new PublicKey(ata),
                destination,
                userPubkey,
                [],
                programId
            )
        );

        if (remainingCommission > 0) remainingCommission--;
    }

    // Burn candidates: burn then close
    for (const { address, mint, amount } of filteredBurnAcc) {
        const ataPk = new PublicKey(address);
        const mintPk = new PublicKey(mint);
        const { destination, programId } = getDestinationAndProgram(address, remainingCommission);

        burnOnlyInstr.push(
            createBurnInstruction(
                ataPk,
                mintPk,
                userPubkey,
                amount,
                [],
                programId
            ),
        );

        closeAfterBurnInstr.push(
            createCloseAccountInstruction(
                ataPk,
                destination,
                userPubkey,
                [],
                programId
            )
        );

        if (remainingCommission > 0) remainingCommission--;
    }

    return {
        closeOnlyBatches: chunkArray(closeOnlyInstr, 24),
        burnOnlyBatches: chunkArray(burnOnlyInstr, 12),
        closeAfterBurnBatches: chunkArray(closeAfterBurnInstr, 24),
        totalAccounts
    };
}

export default buildInstructions;
