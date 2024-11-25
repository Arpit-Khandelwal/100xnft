"use client";

export default function MintNFT()
{

  const [loading, setLoading] = useState(false);
  const [NFT, setNFT] = useState("")
  const [status, setStatus] = useState("")
  const mintNFT = async () =>
  {
    setLoading(true)

    try {
      const response = await fetch("/api/mint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address: publicKey.publicKey?.toString()
        })
      });

      const data = await response.json();

      if (data.success) {

        setStatus("NFT minted successfully!");
        alert("NFT minted successfully!");
        console.log("NFT Details:", data.nft);
        setNFT(data.nft)

      } else {
        setStatus("Minting failed.");
        alert("Minting failed.");
        console.error(data.error);
      }
    } catch (error) {
      setStatus("An error occurred while minting.");
      console.error(error);
    }
    finally {
      setLoading(false)
    }
  };
  const publicKey = useWallet()
  const user = useSession();
  const email = user.data?.user?.email

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      {!publicKey.publicKey && <ConnectWallet />}
      <h1 className="text-xl m-4 text-center">Your Public key is: {publicKey.publicKey?.toString()}</h1>
      {loading ? (
      <Loading />
      ) : (
      <>
        {NFT ? (
        <div className="text-center">
          NFT Minted successfully at <a className="text-green-200" href={"https://translator.shyft.to/address/" +NFT+ "?cluster=devnet"}>
            {NFT}
            </a>
        </div>
        ) : (
          <>
          <div className="text-center">Congratulations! {email} is eligible for the 100x Devs Mint</div>
        <button
          className="text-2xl p-4 bg-blue-500 text-white rounded hover:bg-blue-700"
          onClick={mintNFT}
          >
          Mint 100x NFT
        </button>
        <div className="text-red-500">Tip: If minting fails, please try again</div>
          </>
        )}
      </>
      )}
      {!loading && status && <h3 className="text-center">{status}</h3>}
    </div>
  )
}


import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useState } from "react";
import Loading from "./Loading";
import { getSession, useSession } from "next-auth/react";

export function ConnectWallet()
{
  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="border hover:border-slate-900 rounded">
        <WalletMultiButton style={{}} />
      </div>
    </main>
  );
}