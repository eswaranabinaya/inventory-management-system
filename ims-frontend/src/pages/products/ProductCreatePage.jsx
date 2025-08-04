import React from 'react';
import ProductForm from '../../components/products/ProductForm';
import { createProduct } from '../../services/productService';
import { useNavigate } from 'react-router-dom';
import HomeButton from "../../components/HomeButton";

const ProductCreatePage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    try {
      await createProduct(data);
      navigate('/products');
    } catch (err) {
      alert('Failed to create product: ' + err.message);
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
            <h1 className="text-3xl font-bold text-gray-900">Create Product</h1>
            <p className="text-gray-600 text-base">Add a new product to your catalog.</p>
          </div>
        </div>
        <div className="bg-white bg-opacity-90 backdrop-blur-lg rounded-2xl shadow-xl p-8 w-full max-w-xl">
          <ProductForm onSubmit={handleSubmit} submitLabel="Create" />
        </div>
      </div>
      <footer className="z-10 w-full text-center py-6 text-gray-500 text-sm absolute bottom-0 left-0">
        © 2024 Inventory Management System. All rights reserved.
      </footer>
    </div>
  );
};

export default ProductCreatePage;