import { clusterApiUrl, Connection } from "@solana/web3.js";

const solanaClient = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");

export default solanaClient;
