import React, { useState, useEffect } from "react";

const ProductForm = ({ addProduct, editingProduct, updateProduct }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name);
      setPrice(editingProduct.price);
      setCategory(editingProduct.category);
    }
  }, [editingProduct]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const product = { name, price: Number(price), category };
    if (editingProduct) updateProduct(editingProduct._id, product);
    else addProduct(product);
    setName("");
    setPrice("");
    setCategory("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-200 shadow-lg rounded-2xl p-6 mb-6 flex flex-wrap gap-4 items-center"
    >
      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="flex-1 min-w-[200px] border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
        required
      />

      <input
        type="number"
        placeholder="Price (₹)"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="flex-1 min-w-[150px] border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
        required
      />

      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="flex-1 min-w-[200px] border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
        required
      />

      <button
        type="submit"
        className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2 rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-200"
      >
        {editingProduct ? "Update Product" : "Add Product"}
      </button>
    </form>
  );
};

export default ProductForm;
