import React from "react";

const ProductList = ({ products, setEditingProduct, deleteProduct }) => {
  return (
    <div className="bg-gray-50 p-6 rounded-3xl shadow-lg border border-gray-200 mt-6">
      <h2 className="text-4xl font-semibold text-gray-800 mb-4">
        Products
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gradient-to-r from-purple-200 via-pink-200 to-red-200 text-gray-800 uppercase text-xs font-semibold tracking-wider">
            <tr>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Price</th>
              <th className="px-6 py-3 text-left">Category</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product, index) => (
                <tr
                  key={product._id}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-100"
                  } hover:bg-purple-50 transition-all duration-300`}
                >
                  <td className="px-6 py-3 font-medium text-gray-900">
                    {product.name}
                  </td>
                  <td className="px-6 py-3 text-purple-700 font-semibold">
                    ₹{product.price.toLocaleString()}
                  </td>
                  <td className="px-6 py-3 text-gray-600">{product.category}</td>
                  <td className="px-6 py-3 text-center space-x-2">
                    <button
                      onClick={() => setEditingProduct(product)}
                      className="inline-block bg-blue-500 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-medium px-4 py-2 rounded-xl shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteProduct(product._id)}
                      className="inline-block bg-gradient-to-r from-red-500 to-rose-500 hover:from-rose-500 hover:to-red-500 text-white text-sm font-medium px-4 py-2 rounded-xl shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-8 text-gray-400 italic"
                >
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
