import React from 'react';
import { useEffect, useState } from 'react';
import { getInventories, deleteInventory } from '../../services/inventoryService';
import { getProducts } from '../../services/productService';
import { getWarehouses } from '../../services/warehouseService';
import { Link, useNavigate } from 'react-router-dom';
import HomeButton from "../../components/HomeButton";

const InventoryListPage = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const navigate = useNavigate();

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [inv, prods, whs] = await Promise.all([
        getInventories(),
        getProducts(),
        getWarehouses()
      ]);
      setInventory(inv);
      setProducts(prods);
      setWarehouses(whs);
    } catch (err) {
      alert('Failed to fetch inventory: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this inventory record?')) return;
    try {
      await deleteInventory(id);
      fetchAll();
    } catch (err) {
      alert('Failed to delete inventory: ' + err.message);
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
          <span className="bg-purple-600 p-3 rounded-full text-white shadow-lg">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M12 3v4" /></svg>
          </span>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Inventory List</h1>
            <p className="text-gray-600 text-base">View and adjust your current inventory levels.</p>
          </div>
          <Link to="/inventory/new" className="ml-auto bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-xl shadow flex items-center gap-2 font-semibold transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
            Add Inventory
          </Link>
        </div>
        <div className="bg-white bg-opacity-90 backdrop-blur-lg rounded-2xl shadow-xl p-6 w-full max-w-5xl">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border rounded-lg shadow">
                <thead>
                  <tr className="bg-purple-100 text-purple-900">
                    <th className="p-3 border">Product</th>
                    <th className="p-3 border">Warehouse</th>
                    <th className="p-3 border">Quantity</th>
                    <th className="p-3 border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {inventory.length === 0 ? (
                    <tr><td colSpan={4} className="text-center p-4">No inventory records found.</td></tr>
                  ) : (
                    inventory.map(item => (
                      <tr key={item.id} className="hover:bg-purple-50">
                        <td className="p-3 border font-medium">{item.productName || products.find(p => p.id === item.productId)?.name || item.productId}</td>
                        <td className="p-3 border">{item.warehouseName || warehouses.find(w => w.id === item.warehouseId)?.name || item.warehouseId}</td>
                        <td className="p-3 border">{item.quantity}</td>
                        <td className="p-3 border space-x-2">
                          <button
                            className="inline-flex items-center gap-1 bg-purple-100 hover:bg-purple-200 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold transition-all"
                            onClick={() => navigate(`/inventory/${item.id}/edit`)}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6-6m2 2l-6 6m2 2l-6 6" /></svg>
                            Edit
                          </button>
                          <button
                            className="inline-flex items-center gap-1 bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded-full text-sm font-semibold transition-all"
                            onClick={() => handleDelete(item.id)}
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

export default InventoryListPage;