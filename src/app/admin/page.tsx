import { options } from "@/options"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import React from "react"

const Admin = async() => {
    const Session = await getServerSession(options)


    if(!Session) {
        redirect("/login")
    }
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">  
        <h1>protetected Admin Page</h1>
        </div>
    )
}

export default Admin

//admin page withoud Session herna namilne vayo. protected page vayo login xoina vane
//ani sidai login page ma falne vayo redirect le , if admin page aauna khojda
//ki component vitra if session choina vane , login to view more return garne. SEssion cha vane aru return garne.

