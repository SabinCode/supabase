import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./db";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";

export const options = {
    adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  // callbacks: {
  //   async jwt({ token, user, account, profile, isNewUser }: {profile: GoogleProfile, isNewUser: boolean, user: any, token: any, account: any}) {
  //     // Add the role property to the user object
  //     token.role = "ADMIN";
  //     return token;
  //   },
  // },
}


