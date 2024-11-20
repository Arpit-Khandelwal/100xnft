import { Keypair, PublicKey } from "@solana/web3.js";
import { getMetaplex } from "@/utils/solana";
import { getServerSession } from "next-auth";
import authOptions  from "@/utils/auth"; 
import { NextRequest } from "next/server";
import { createNFT } from "@/init/create-nft";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  // user verification from email list / api
  const email = session.user.email

  if (!session) {
      
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  try {
    const { address } = await req.json();

    const payerKeypair = Keypair.fromSecretKey(
      Uint8Array.from(JSON.parse(process.env.SOL_PRIVATE_KEY as string))
    );

    const metaplex = getMetaplex(payerKeypair);


    // const nftMetadata = {
    //   name: "100x test",
    //   symbol: "TEST100X",
    //   uri: "https://your-nft-metadata.com/metadata.json", // Replace with your actual URI
    //   sellerFeeBasisPoints: 50, // 0.5% royalties,
    // };
    
    // const { nft } = await metaplex.nfts().create({
    //   ...nftMetadata,
    //   tokenOwner: new PublicKey(address), // Optional: Replace with user's wallet address
    // });



    const nft = await createNFT(address);

    return new Response(JSON.stringify({ success: true, nft }), { status: 200 });
  } catch (error) {
    console.error("Minting failed:", error);
    return new Response(JSON.stringify({ error: "Minting failed" }), { status: 500 });
  }
}
