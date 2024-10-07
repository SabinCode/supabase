"use client";
import React from "react";
import { signIn } from "next-auth/react";

export const GoogleButton = () => {
    function handleGoogleLogin() {
        // Handle Google login logic here
        signIn("google", { callbackUrl: "/"});
    }
    return (
        <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleGoogleLogin}
        >
            Login with Google
        </button>
    );
};