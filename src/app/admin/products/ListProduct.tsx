
import { getProducts } from "../_actions/product-actions"
import DeleteProduct from "./DeleteProduct"
import EditProduct from "./EditProduct"




export const ListProduct = async () => {
    const products = await getProducts() //import Products from products page

    if (products?.success)
        return (<div className="flex flex-col max-w[500px] m-auto">

            {
                products.success.map((product) => {

                    return <div key={product.id} className="my-2 flex items-center gap-3 
        justify-between w-full p-2 border-b">
                        <p>{product.name}</p>
                        <p>{product.price}</p>
                        <div className="relative h-64">
                            <img src={product.imagePath ?? ''} alt={product.name?.toString() ?? ''} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex gap-3 items-center" >
                            <div>
                                <DeleteProduct product={product} /> </div>
                            <div>
                                <EditProduct product={product} />
                            </div>
                        </div>
                    </div>
                })
            }

        </div>)

    //yo list product admin page ma dekhaunalai banako.
    //admin le delete garne , edit garne create garne functionality admin page ma cha.
}
