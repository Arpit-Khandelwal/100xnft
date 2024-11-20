import GoogleProvider from "next-auth/providers/google"
import { JWT } from 'next-auth/jwt';

const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async session({ session, token }: { session: any; token: JWT })
        {
            session.accessToken = token.accessToken as string;
            return session;
        },
    }
}

export default authOptions