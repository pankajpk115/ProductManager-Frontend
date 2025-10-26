import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductList from "./components/ProductList.jsx";
import ProductForm from "./components/ProductForm.jsx";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://productmanager-backend-vd2u.onrender.com/api/products";

function App() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch all products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setProducts(res.data);
    } catch (err) {
      console.error("❌ Error fetching products:", err);
      setError("Failed to load products. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Add product
  const addProduct = async (product) => {
    try {
      await axios.post(API_URL, product);
      fetchProducts();
    } catch (err) {
      console.error("❌ Error adding product:", err);
      setError("Could not add product. Try again.");
    }
  };

  // Update product
  const updateProduct = async (id, product) => {
    try {
      await axios.put(`${API_URL}/${id}`, product);
      setEditingProduct(null);
      fetchProducts();
    } catch (err) {
      console.error("❌ Error updating product:", err);
      setError("Could not update product.");
    }
  };

  // Delete product
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchProducts();
    } catch (err) {
      console.error("❌ Error deleting product:", err);
      setError("Could not delete product.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
        <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          🛒 Product Manager
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-lg mb-4 text-center">
            {error}
          </div>
        )}

        <ProductForm
          addProduct={addProduct}
          editingProduct={editingProduct}
          updateProduct={updateProduct}
        />

        {loading ? (
          <p className="text-center text-gray-500 mt-6">Loading products...</p>
        ) : (
          <ProductList
            products={products}
            setEditingProduct={setEditingProduct}
            deleteProduct={deleteProduct}
          />
        )}
      </div>
    </div>
  );
}

export default App;
