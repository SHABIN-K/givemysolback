import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { SessionWalletProvider, useSessionKeyManager } from "@magicblock-labs/gum-react-sdk";


const SessionProvider = ({ children }) => {
  const { connection } = useConnection();
  const anchorWallet = useAnchorWallet();
  
  const cluster = "devnet"; // or "mainnet-beta", "testnet", "localnet" ,"devnet"
  const sessionWallet = useSessionKeyManager(anchorWallet, connection, cluster);

  return <SessionWalletProvider sessionWallet={sessionWallet}>{children}</SessionWalletProvider>;
};

export default SessionProvider;
