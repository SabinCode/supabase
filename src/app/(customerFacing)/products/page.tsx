"use server"
import { prisma } from "@/db";
import Link from "next/link";

const Products = async () => {
    const products = await prisma.product.findMany(
        {
            select: {
                id: true,
                name: true,
                price: true,
                imagePath: true
            }
        }
    )

    //console.log(products) //server ma as an array products aauna paryo
    return (<>
        <div className="text-3xl font-bold">Products</div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-3">

        {products.map((product) => (
            <Link href={`/products/${product.id}`} key={product.id} className="my-2 flex items-center gap-3 
        justify-between w-full p-2 border-b">
               <h1>{product.name}</h1> 

             {/* <h1>{product.price}</h1> */}

                {/* <div>{product.image}</div>  */}
                <div className="relative h-64">
                    <img src={product.imagePath ?? ''} alt={product.name?.toString() ?? ''} className="w-full h-full object-cover" />
                </div>

            </Link>

         
        ))}

        </div>
    </>
    )
};
export default Products;
//yo server ma products as an array aauna paryo
//yo page userslai product dekhaunalai banako.
//yo page ma products ko image name and price matra render garera
//products ma click garda single productkko purai details aauna banauna paryo.