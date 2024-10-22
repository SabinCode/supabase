"use server"


import { prisma } from "@/db"
import { options } from "@/options"
import { Product } from "@prisma/client"
import { getServerSession } from "next-auth"
import { revalidatePath } from "next/cache"

export const editProduct = async (product: Product) => {
    // Add product logic here
    const session = await getServerSession(options)
    if (session?.user?.email !== "tamangteppiche@gmail.com") {
        throw new Error("Unauthorized")
    }

    try{
        await prisma.product.update({
            where: {
                id: product.id
            },
            data: {
                name: product.name,
                price: product.price,
                size: product.size,
                stock: product.stock,
                slug: product.slug,
                brand: product.brand,
                color: product.color,
                description: product.description,
                category: product.category,
                
                imagePath: product.imagePath,
                filePath: product.filePath
            }
        })

        revalidatePath("/")
        revalidatePath("/admin/products")
        return{message:"Product edited", success:true}
    } catch (error) {
        console.error("failded to edit product", error)
    }
    }