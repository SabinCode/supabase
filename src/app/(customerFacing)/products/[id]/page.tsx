import { prisma } from "@/db"

const ProductDetails = async ({ params }: {params: {id: string}})=> {

    const singleProduct = await prisma.product.findUnique({
        where: {
            id: params.id
        }
    })

    return (
        <div>
            <h1>{singleProduct?.name}</h1>
            <div>{singleProduct?.price}</div>
            <div className="relative h-64">
                    <img src={singleProduct?.imagePath ?? ''} alt={singleProduct?.name?.toString() ?? ''} className="w-full h-full object-cover" />
                </div>


        </div>
    )
    
}

export default ProductDetails

//product ma click garda single productkko purai details nikalnalai yo banako 
//tesko lagi params ma id aako huncha tyo id liyera prisma.product.findUnique 
//oe priama.product.findfirst({where:{id: params.id}}) garda pani huncha.