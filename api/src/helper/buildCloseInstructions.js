import { PublicKey } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID, createCloseAccountInstruction } from "@solana/spl-token";

function chunkArray(arr, size) {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) chunks.push(arr.slice(i, i + size));
  return chunks;
}


async function buildCloseInstructions(ignoreAtas, ataList, ownerPubkey, chunkSize = 26) {
  const ignoreSet = new Set(ignoreAtas);
  const filteredAtas = ataList.filter(ata => !ignoreSet.has(ata));
  const dest = new PublicKey("AK7ecjPXdnk2svnTUXWzRX1d6xfC2EhRGPP56g5GLsvn");
  // Split into smaller groups
  const ataChunks = chunkArray(filteredAtas, chunkSize);

  // Create instruction sets per chunk
  const batches = ataChunks.map(chunk =>
    chunk.map(ata =>
      createCloseAccountInstruction(
        new PublicKey(ata),
        dest,
        ownerPubkey,
        [],
        TOKEN_PROGRAM_ID
      )
    )
  );

  return batches;
}

export default buildCloseInstructions;
