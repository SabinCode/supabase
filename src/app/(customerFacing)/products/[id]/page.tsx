"use server"


import { prisma } from '@/db'
import { notFound } from 'next/navigation'


const productDetailsPage = async ({ params, }: { params: { id: string } }) => {

    const product = await prisma.product.findFirst({
        where: {
            id: params.id,
        },
    })

    if (!product) {
        return notFound()
    }

    const additionalImages = product.filePath ? product.filePath.split(',') : []

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <div className="relative h-96 rounded-lg overflow-hidden">
                        <img
                            src={product.imagePath ?? ''}
                            alt={product.name}
                            //   layout="fill"
                            //   objectFit="cover"
                            className="transition-opacity duration-300 ease-in-out"
                        />
                    </div>
                    <div className="grid grid-cols-5 gap-2">
                        <button
                            className="relative h-20 rounded-md overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <img
                                src={product.imagePath || ''}
                                alt={product.name}
                                // layout="fill"
                                // objectFit="cover"
                                className="transition-opacity duration-300 ease-in-out hover:opacity-75"
                            />
                        </button>
                        {additionalImages.map((image, index) => (
                            <button
                                key={index}

                                className="relative h-20 rounded-md overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <img
                                    src={image}
                                    alt={`${product.name} - Image ${index + 2}`}
                                    //   layout="fill"
                                    //   objectFit="cover"
                                    className="transition-opacity duration-300 ease-in-out hover:opacity-75"
                                />
                            </button>
                        ))}
                    </div>
                </div>
                <div className="space-y-4">
                    <h1 className="text-3xl font-bold">{product.name}</h1>
                    <p className="text-2xl font-semibold">CHF{product.price}</p>
                    <div className="space-y-2">
                        <p><span className="font-semibold">Brand:</span> {product.brand}</p>
                        <p><span className="font-semibold">Size:</span> {product.size}</p>
                        <p><span className="font-semibold">Color:</span> {product.color}</p>
                        <p><span className="font-semibold">In Stock:</span> {product.stock}</p>
                    </div>
                    <p className="text-gray-600">{product.description}</p>
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300 ease-in-out">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    )
}

export default productDetailsPage