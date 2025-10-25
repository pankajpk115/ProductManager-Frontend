import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductList from "./components/ProductList.jsx";
import ProductForm from "./components/ProductForm.jsx";

const API_URL = "http://localhost:5000/api/products";

function App() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = async () => {
    const res = await axios.get(API_URL);
    setProducts(res.data);
  };

  useEffect(() => { fetchProducts(); }, []);

  const addProduct = async (product) => {
    await axios.post(API_URL, product);
    fetchProducts();
  };

  const updateProduct = async (id, product) => {
    await axios.put(`${API_URL}/${id}`, product);
    setEditingProduct(null);
    fetchProducts();
  };

  const deleteProduct = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchProducts();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product Manager</h1>
      <ProductForm addProduct={addProduct} editingProduct={editingProduct} updateProduct={updateProduct} />
      <ProductList products={products} setEditingProduct={setEditingProduct} deleteProduct={deleteProduct} />
    </div>
  );
}

export default App;
