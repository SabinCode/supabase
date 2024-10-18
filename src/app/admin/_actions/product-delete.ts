"use server"


import { prisma } from "@/db"
import { options } from "@/options"
import { Product } from "@prisma/client"
import { getServerSession } from "next-auth"
import { revalidatePath } from "next/cache"


export async function deleteProduct(product: Product) {
         
    const session = await getServerSession(options)
    if (session?.user?.email !== "tamangteppiche@gmail.com") {
        throw new Error("Unauthorized")
    }


    try {
        await prisma.product.delete({
            where: {
                id: product.id
            }
        })
        revalidatePath("/")
        revalidatePath("/admin/products") 
        return{message:"Product deleted", success:true}
    } catch (error) {
        console.log(error)
        return{message:"Product not deleted", success:false}
    }
}