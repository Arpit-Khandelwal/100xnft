import auth from "@/utils/auth";
import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt";
const handler = NextAuth(auth)

export { handler as GET, handler as POST }