"use server"
import { prisma } from "@/db";
import Link from "next/link";
import Image from "next/image";

const Products = async () => {
    const products = await prisma.product.findMany(
        {
            select: {
                id: true,
                name: true,
                price: true,
                imagePath: true,
                slug: true,
            }
        }
    )

    //console.log(products) //server ma as an array products aauna paryo
    return (<div className="container mx-auto px-4 py-8">
        <div className="text-3xl font-bold mb-8">Products</div>

        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-3"> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">


        {products.map((product) => (
            //     <Link href={`/products/${product.id}`} key={product.id} className="my-2 flex items-center gap-3 
            // justify-between w-full p-2 border-b">

            <Link href={`/products/${product.id}`} key={product.id} className="group">


             {/* <h1>{product.price}</h1> */}

                {/* <div>{product.image}</div>  */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 ease-in-out transform hover:scale-105">
                <div className="relative h-64">
                        <img src={product.imagePath ?? ''} alt={product.name?.toString() ?? ''}
                            
                            
                            className="transition-opacity duration-300 ease-in-out group-hover:opacity-75 " />

                    </div>
                    <div className="p-4">
                        <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
                        <p className="text-gray-600">CHF{product.price?.toFixed(2)}</p>
                    </div>
                </div>

            </Link>

         
        ))}

        </div>
    </div>
    )
};
export default Products;
//yo server ma products as an array aauna paryo
//yo page userslai product dekhaunalai banako.
//yo page ma products ko image name and price matra render garera
//products ma click garda single productkko purai details aauna banauna paryo.