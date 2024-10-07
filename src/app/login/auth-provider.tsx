"use client";


import { SessionProvider } from "next-auth/react";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    return (
    <SessionProvider>{children}</SessionProvider>)
    
}


//client component banayera AuthProvider lai layout .tsx ma use gareko cha.
//<AuthProvider>{children}</AuthProvider> yesari layout .tsx ma use garepaxi sabai children(client component) ma  
//pani Session use garna milcha