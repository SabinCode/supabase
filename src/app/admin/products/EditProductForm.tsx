"use client"; // You need to use this to indicate this is a client component.

import { useState } from "react";
import { Product } from "@prisma/client";

interface EditProductFormProps {
  product: Product;
  onSubmit: (updatedProduct: Product) => Promise<void>;

  handleCloseEditing: () => void;
}

const EditProductForm = ({ product, onSubmit, handleCloseEditing }: EditProductFormProps) => {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [image, setImage] = useState(product.imagePath);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedProduct: Product = {
      ...product,
      name,
      price,
      imagePath: image,
      filePath: image,

      // Add more properties as needed
    };

    await onSubmit(updatedProduct);
    handleCloseEditing(); // Call the submit handler from the parent component
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-3 p-4 border rounded-md">
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full"
          required
        />
      </div>

      <div>
        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          value={price || ""}
          onChange={(e) => setPrice(parseInt(e.target.value))}
          className="border p-2 w-full"
          required
        />
      </div>

      <div>
        <label htmlFor="image">Image URL</label>
        <input
          type="file"
          id="image"
          value={image || ""}
          onChange={(e) => setImage(e.target.value)}
          className="border p-2 w-full"
        />
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Save Changes
        </button>
        <button
          type="button"
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          onClick={handleCloseEditing}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditProductForm;
