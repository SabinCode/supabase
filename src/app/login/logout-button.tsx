"use client";
import { signOut, useSession } from "next-auth/react";
import React from "react";


export const LogoutButton = () => {
    const session = useSession();
    console.log("🚀 ~ LogoutButton ~ session:", session) //client component session use garera protected page rakhna milne vayo.
    function handleLogout() {
        // Handle logout logic here
        signOut({ callbackUrl: "/" }); //we can set it to "/login"  page
    }

    return (
        <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleLogout}
        >
            Logout
        </button>
    );
};

//logout button lai inspect garera herda LogoutButton Session ma , data , user ma name , email n img aako cha.
//tei vara sessio use garera protected page rakhna milne vayo.

