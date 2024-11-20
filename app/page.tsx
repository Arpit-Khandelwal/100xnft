"use client"
import Landing from "@/app/components/Landing";
import { SessionProvider } from "next-auth/react";


export default function Home() {
  return (
    <>
    <SessionProvider>

      <Landing />
    </SessionProvider>
    </>
  );
}
