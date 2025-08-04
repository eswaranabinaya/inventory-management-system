import { useState, useEffect } from 'react';
import { createPurchaseOrder } from '../../services/purchaseOrderService';
import { getProducts } from '../../services/productService';
import { getWarehouses } from '../../services/warehouseService';
import { useNavigate } from 'react-router-dom';
import HomeButton from "../../components/HomeButton";

const PurchaseOrderCreatePage = () => {
  const [form, setForm] = useState({ supplierName: '', productName: '', warehouseName: '', quantity: '' });
  const [products, setProducts] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getProducts().then(setProducts);
    getWarehouses().then(setWarehouses);
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await createPurchaseOrder({ ...form, quantity: Number(form.quantity) });
      navigate('/purchase-orders');
    } catch (err) {
      alert('Failed to create purchase order: ' + err.message);
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
          <span className="bg-yellow-500 p-3 rounded-full text-white shadow-lg">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="6" y="3" width="12" height="18" rx="2" /><path d="M9 7h6M9 11h6M9 15h3" /></svg>
          </span>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Create Purchase Order</h1>
            <p className="text-gray-600 text-base">Add a new supplier purchase order.</p>
          </div>
        </div>
        <div className="bg-white bg-opacity-90 backdrop-blur-lg rounded-2xl shadow-xl p-8 w-full max-w-xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1">Supplier Name</label>
              <input name="supplierName" value={form.supplierName} onChange={handleChange} className="border p-2 w-full rounded" required />
            </div>
            <div>
              <label className="block mb-1">Product</label>
              <select name="productName" value={form.productName} onChange={handleChange} className="border p-2 w-full rounded" required>
                <option value="">Select product</option>
                {products.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block mb-1">Warehouse</label>
              <select name="warehouseName" value={form.warehouseName} onChange={handleChange} className="border p-2 w-full rounded" required>
                <option value="">Select warehouse</option>
                {warehouses.map(w => <option key={w.id} value={w.name}>{w.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block mb-1">Quantity</label>
              <input name="quantity" type="number" min="1" value={form.quantity} onChange={handleChange} className="border p-2 w-full rounded" required />
            </div>
            <button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-xl shadow font-semibold transition-all w-full">Create</button>
          </form>
        </div>
      </div>
      <footer className="z-10 w-full text-center py-6 text-gray-500 text-sm absolute bottom-0 left-0">
        © 2024 Inventory Management System. All rights reserved.
      </footer>
    </div>
  );
};

export default PurchaseOrderCreatePage;