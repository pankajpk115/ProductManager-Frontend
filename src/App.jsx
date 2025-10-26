import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductList from "./components/ProductList.jsx";
import ProductForm from "./components/ProductForm.jsx";

const BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://productmanager-backend-vd2u.onrender.com";

function App() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const api = axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json" },
  });

  // Fetch all products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/products");
      setProducts(res.data);
      setError("");
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
      await api.post("/api/products", product);
      fetchProducts();
    } catch (err) {
      console.error("❌ Error adding product:", err);
      setError("Could not add product. Try again.");
    }
  };

  // Update
  const updateProduct = async (id, product) => {
    try {
      await api.put(`/api/products/${id}`, product);
      setEditingProduct(null);
      fetchProducts();
    } catch (err) {
      console.error("❌ Error updating product:", err);
      setError("Could not update product.");
    }
  };

  // Delete
  const deleteProduct = async (id) => {
    try {
      await api.delete(`/api/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error("❌ Error deleting product:", err);
      setError("Could not delete product.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-500 to-blue-500 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-500 mb-6 text-center">
          Product Manager
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
