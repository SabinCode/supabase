import { options } from "@/options";
import { getServerSession } from "next-auth";
import { LogoutButton } from "./login/logout-button";
import { GoogleButton } from "./login/google-button";


export default async function Home() {
  const session = await getServerSession(options)
  console.log({session})

  if(session) {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>Welcome to Supabase Project -You are logged in as - {session?.user?.email}</h1>

      <LogoutButton />
    </div>
  );
}
return (
  <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    <h1>Welcome to Supabase Project- You are not logged in</h1>
    <GoogleButton />
  </div>
);
}
