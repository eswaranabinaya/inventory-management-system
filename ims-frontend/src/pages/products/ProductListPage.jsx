import React from 'react';
import { useEffect, useState } from 'react';
import { getProducts, deleteProduct } from '../../services/productService';
import { Link, useNavigate } from 'react-router-dom';
import HomeButton from "../../components/HomeButton";

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      alert('Failed to fetch products: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await deleteProduct(id);
      fetchProducts();
    } catch (err) {
      alert('Failed to delete product: ' + err.message);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 relative overflow-x-hidden">
      <div className="absolute top-6 left-6 z-50"><HomeButton /></div>
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-300 opacity-30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-300 opacity-30 rounded-full blur-3xl" />
      </div>
      <div className="z-10 flex flex-col items-center justify-center py-16 w-full">
        <div className="flex items-center gap-4 mb-6">
          <span className="bg-blue-600 p-3 rounded-full text-white shadow-lg">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M16 3v4M8 3v4" /></svg>
          </span>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Product List</h1>
            <p className="text-gray-600 text-base">Manage your product catalog, SKUs, and details.</p>
          </div>
          <Link to="/products/new" className="ml-auto bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl shadow flex items-center gap-2 font-semibold transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
            Add Product
          </Link>
        </div>
        <div className="bg-white bg-opacity-90 backdrop-blur-lg rounded-2xl shadow-xl p-6 w-full max-w-5xl">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border rounded-lg shadow">
                <thead>
                  <tr className="bg-blue-100 text-blue-900">
                    <th className="p-3 border">Name</th>
                    <th className="p-3 border">SKU</th>
                    <th className="p-3 border">Category</th>
                    <th className="p-3 border">Price</th>
                    <th className="p-3 border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length === 0 ? (
                    <tr><td colSpan={5} className="text-center p-4">No products found.</td></tr>
                  ) : (
                    products.map(product => (
                      <tr key={product.id} className="hover:bg-blue-50">
                        <td className="p-3 border font-medium">{product.name}</td>
                        <td className="p-3 border">{product.sku}</td>
                        <td className="p-3 border">{product.category}</td>
                        <td className="p-3 border">{product.price}</td>
                        <td className="p-3 border space-x-2">
                          <button
                            className="inline-flex items-center gap-1 bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold transition-all"
                            onClick={() => navigate(`/products/${product.id}/edit`)}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6-6m2 2l-6 6m2 2l-6 6" /></svg>
                            Edit
                          </button>
                          <button
                            className="inline-flex items-center gap-1 bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded-full text-sm font-semibold transition-all"
                            onClick={() => handleDelete(product.id)}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <footer className="z-10 w-full text-center py-6 text-gray-500 text-sm absolute bottom-0 left-0">
        © 2024 Inventory Management System. All rights reserved.
      </footer>
    </div>
  );
};

export default ProductListPage;