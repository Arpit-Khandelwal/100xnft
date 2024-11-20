// utils/solana.js
import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";
import { Metaplex, keypairIdentity } from "@metaplex-foundation/js";

const SOLANA_NETWORK = "devnet"; // Use "mainnet-beta" for production

export const connection = new Connection(clusterApiUrl(SOLANA_NETWORK));

export const getMetaplex = (keypair:any) => {
  return Metaplex.make(connection).use(keypairIdentity(keypair));
};