"use client"

import { useState } from "react"
import { MdClose, MdEdit } from "react-icons/md"

import { Product } from "@prisma/client"
import EditProductForm from "./EditProductForm"
import { editProduct } from "../_actions/product-edit"

const EditProduct = ({ product }: { product: Product }) => {
    const [isEditing, setIsEditing] = useState(false)

    const handleOpenEditing = () => {
        setIsEditing(true)
    }


    const handleCloseEditing = () => {
        setIsEditing(false)
    }

    const handleSubmit = async (updatedProduct: Product) => {
        try {
            await editProduct(updatedProduct)
            handleCloseEditing()

        } catch (error) {
            console.error("failded to edit product", error)
        }
    }

    return (
        <>
            {!isEditing &&
                <button className="cursor-pointer "
                    onClick={handleOpenEditing}
                >
                    <MdEdit size={30} />
                </button>
            }

            {isEditing && (<div className="absolute top-0 left-0 w-full h-full bg-slate-500 
            bg-opacity-70 flex items-center justify-center">

                <div className="relative bg-white p-8 w-full max-w-[600px] rounded-md">
                    <button className="absolute top-3 right-3 text-slate-500 "
                    >
                        <MdClose size={30} onClick={handleCloseEditing} />
                    </button>
                    <EditProductForm product={product}
                        onSubmit={handleSubmit}
                        handleCloseEditing={handleCloseEditing} />

                </div>
            </div>
            )}
        </>
    )
}

export default EditProduct
