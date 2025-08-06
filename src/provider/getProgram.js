import { Program, AnchorProvider, web3, setProvider } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";


const getProgram = async (CONNECTION) => {
  const wallet = new PublicKey("7UG4iznNESFLbdCTiGMCzBQve5P4SpzPUizkhurK4ipY");
  const provider = new AnchorProvider(CONNECTION, wallet, {
    commitment: "confirmed",
  });

  setProvider(provider);

  // Your program ID
  const programId = new web3.PublicKey("ArotQ2qaeFwL8vHdSPhB8wy7T7bQ66cHhU6mS2WH9y1L");

  // Load IDL from chain
  const idl = await Program.fetchIdl(programId, provider);

  // Create the program instance
  const program = new Program(idl, provider);

  return program
}

export default getProgram