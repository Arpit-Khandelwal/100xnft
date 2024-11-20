import { signIn, useSession } from "next-auth/react";
import MintNFT from "./MintNFT";

export default function Landing()
{

    const { data: session } = useSession();

    return <>
        {!session? 
            <div className="flex justify-center mt-4">
                <button
                    onClick={() => signIn()}
                    className="center text-4xl p-48"
                    >
                    Sign in with Google
                </button>
            </div>
            :

        <MintNFT />
        }



    </>
}