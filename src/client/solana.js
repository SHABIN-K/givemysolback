import { Connection } from "@solana/web3.js";

const solanaClient = new Connection(import.meta.env.VITE_RPC_ENDPOINT, "confirmed");

export default solanaClient;
