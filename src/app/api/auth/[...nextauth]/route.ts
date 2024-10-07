// import { prisma } from "@/db";
// import { PrismaAdapter } from "@auth/prisma-adapter";
// import { Prisma } from "@prisma/client";
import {options} from "@/options";
import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth(options);

export { handler as GET, handler as POST }; //underthe hood yesma get and post ko logic cha.

    

