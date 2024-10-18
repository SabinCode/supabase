"use client"

import { useFormState, useFormStatus } from "react-dom"
import { createProductWithImages } from "../_actions/product-actions"
import { ElementRef, useRef, useState } from "react"




//params ma product, handleCloseEditing use garera . createProductForm ma nai edit ko logic milauna khojeko..
// export const CreateProductForm = () => {
//     const [createProductFormResponse, createProductFormAction] = useFormState(createProduct, null)

//     const formRef = useRef<ElementRef<"form">>(null)

//     const { pending } = useFormStatus()
//     if (formRef.current && createProductFormResponse?.success) {
//         formRef.current.reset()
//     }


//     return (
//         <>
//             <form
//                 ref={formRef}
//                 className="flex flex-col gap-4 border-b p-4 border rounded-md"
//                 action={createProductFormAction} >

//                 <input
//                     type="text"
//                     name="name"
//                     placeholder="Product Name"
//                     className="input input-bordered w-full  "
//                 />
//                 <input
//                     type="number"
//                     name="price"
//                     placeholder="Product Price"
//                     className="input input-bordered w-full"
//                 />
//                 <input
//                     type="file"
//                     name="image"
//                     placeholder="Product Image url"
//                     className="input input-bordered w-full"
//                 />
//                 <button
//                     type="submit"
//                     className="btn btn-primary bg-slate-700 text-white my-2
//                     justify-center gap-2 py-3 px-5 border-2 w-auto hover:opacity-80 rounded-md">
//                     Create Product
//                 </button>

//                 <p className="text-red-500">{createProductFormResponse?.message}</p>

//             </form >
//         </>
//     )
// }




// export const CreateProductForm = () => {
//   const [formResponse, setFormResponse] = useState<{ message: string; success: boolean } | null>(null);
//   const formRef = useRef<HTMLFormElement>(null);

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     const formData = new FormData(formRef.current as HTMLFormElement);

//     try {
//       const response = await createProductWithImages(undefined, formData);
//       setFormResponse(response);

//       if (formRef.current && response.success) {
//         formRef.current.reset(); // Reset the form after successful submission
//       }
//     } catch (error) {
//       console.error("Error submitting form", error);
//       setFormResponse({ message: "Error submitting form", success: false });
//     }
//   };

//   return (
//     <>
//       <form
//         ref={formRef}
//         onSubmit={handleSubmit}
//         className="flex flex-col gap-4 border-b p-4 border rounded-md"
//       >
//         <input
//           type="text"
//           name="name"
//           placeholder="Product Name"
//           className="input input-bordered w-full"
//           required
//         />
//         <input
//           type="number"
//           name="price"
//           placeholder="Product Price"
//           className="input input-bordered w-full"
//           required
//         />
//         <input
//           type="file"
//           name="image"
//           accept="image/*"
//           placeholder="Main Image"
//           className="input input-bordered w-full"
//           required
//         />
//         <input
//           type="file"
//           name="files"
//           accept="image/*"
//           placeholder="Additional Images"
//           className="input input-bordered w-full"
//           multiple
//         />
//         <button
//           type="submit"
//           className="btn btn-primary bg-slate-700 text-white my-2 justify-center gap-2 py-3 px-5 border-2 w-auto hover:opacity-80 rounded-md"
//         >
//           Create Product
//         </button>

//         <p className="text-red-500">{formResponse?.message}</p>
//       </form>
//     </>
//   );
// };






import { useRouter } from 'next/navigation'


export function CreateProductForm() {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)
    const router = useRouter()

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)
        setError(null)
        setSuccess

        const formData = new FormData(event.currentTarget)
       
        const result = await createProductWithImages(formData)

        setIsLoading(false)

        if (result.success) {
            router.push(`/products/${result.product?.id}`)
        } else {
            setError('Failed to create product. Please try again.')
        }
    }

    

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Name
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>

            <div>
                <label  className="block text-sm font-medium text-gray-700">
                    Description
                </label>
                <textarea
                    id="description"
                    name="description"
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                ></textarea>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Brand
                </label>
                <input
                    type="text"
                    id="brand"
                    name="brand"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>

            <div>
                <label  className="block text-sm font-medium text-gray-700">
                    Size
                </label>
                <input
                    type="text"
                    id="size"
                    name="size"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Color
                </label>
                <input
                    type="text"
                    id="color"
                    name="color"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>

            <div>
                <label  className="block text-sm font-medium text-gray-700">
                    Slug
                </label>
                <input
                    type="text"
                    id="slug"
                    name="slug"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Stock
                </label>
                <input
                    type="number"
                    id="stock"
                    name="stock"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Price
                </label>
                <input
                    type="number"
                    id="price"
                    name="price"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>

            <div>
                <label  className="block text-sm font-medium text-gray-700">
                    Category
                </label>
                <input
                    type="text"
                    id="category"
                    name="category"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Main Image
                </label>
                <input
                    type="file"
                    id="mainImage"
                    name="mainImage"
                    accept="image/*"
                    required
                    className="mt-1 block w-full"
                />
            </div>

            <div>
                <label  className="block text-sm font-medium text-gray-700">
                    Detail Images
                </label>
                <input
                    type="file"
                    id="detailImages"
                    name="detailImages"
                    accept="image/*"
                    multiple
                    className="mt-1 block w-full"
                />
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                {isLoading ? 'Creating...' : 'Create Product'}
                {error && <div className="text-red-500">{error}</div>}
                {success && <div className="text-green-500">{success}</div>}
            </button>
        </form>
    )
}