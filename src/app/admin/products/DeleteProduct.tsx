"use client"

import { Product } from "@prisma/client";
import { useState } from "react";
import { deleteProduct } from "../_actions/product-delete";
import { MdDelete } from "react-icons/md";
import { ImSpinner } from "react-icons/im";

// const DeleteProduct = ({ params }: { params: { id: string } }) => {
//     const router = useRouter()


//     const handleDelete = async () => {

//         try {
//             await deleteProduct(params.id)
//             alert("Product deleted")
//             router.push("/admin/products") // redirect to /admin/products
//         } catch (error) {
//             console.error("failded to delete product", error)
//         }
//     }
//     return (
//         <>
//             <h1>Delete Product</h1>
//             <p>Are you sure you want to delete this product?</p>
//             <button onClick={handleDelete}>Delete</button>
//         </>
//     )

// }

// export default DeleteProduct




// const DeleteProduct = async () => {
//     ("use server")
//   const products = await prisma.product.findMany({
//     where: {
//       price: {
//         gt: 100,
//       },
//     },
//   });

//   const handleDelete = async (productId: string) => {
//     ("use client")
//     try {
//       await deleteProduct(productId); // Call the server action to delete the product
//     } catch (error) {
//       console.error("Failed to delete product:", error);
//     }
//   };

//   return (
//     <>
//       <div className="text-3xl font-bold">Products</div>
//       {products.map((product) => (
//         <div key={product.id} className="text-2xl">
//           <p>{product.name}</p>
//           <p>{product.price}</p>
//           <p>{product.image}</p>
//           <button
//             onClick={() => handleDelete(product.id)}
//             className="btn btn-danger"
//           >
//             Delete Product
//           </button>
//         </div>
//       ))}
//     </>
//   );
// };

// export default DeleteProduct;


// const DeleteProduct = ({ product }: { product: Product }) => {
//     const [loading, setLoading] = useState(false)

//     const handleDelete = async (product: Product) => {
//         setLoading(true)
//         //const response = await deleteProduct(product) //
//         await deleteProduct(product)
//         setLoading(false)

//         return (<button onClick={() => handleDelete(product)}>
//             {!loading && <MdDelete size={30} />}
//             {loading && <ImSpinner size={30} className="animate-spin" />}
//         </button>

//         )
//     }
// }

// export default DeleteProduct

const DeleteProduct = ({ product }: { product: Product }) => {
    const [loading, setLoading] = useState(false);
  
    const handleDelete = async () => {
      setLoading(true);
      await deleteProduct(product);
      setLoading(false);
    };
  
    return (
      <button onClick={handleDelete}>
        {!loading && <MdDelete size={30} />}
        {loading && <ImSpinner size={30} className="animate-spin" />}
      </button>
    );
  };
  
  export default DeleteProduct