import { useState, useEffect } from 'react';
import { createPurchaseOrder } from '../../services/purchaseOrderService';
import { getProducts } from '../../services/productService';
import { getWarehouses } from '../../services/warehouseService';
import { useNavigate } from 'react-router-dom';

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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Create Purchase Order</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <label className="block mb-1">Supplier Name</label>
          <input name="supplierName" value={form.supplierName} onChange={handleChange} className="border p-2 w-full" required />
        </div>
        <div>
          <label className="block mb-1">Product</label>
          <select name="productName" value={form.productName} onChange={handleChange} className="border p-2 w-full" required>
            <option value="">Select product</option>
            {products.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block mb-1">Warehouse</label>
          <select name="warehouseName" value={form.warehouseName} onChange={handleChange} className="border p-2 w-full" required>
            <option value="">Select warehouse</option>
            {warehouses.map(w => <option key={w.id} value={w.name}>{w.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block mb-1">Quantity</label>
          <input name="quantity" type="number" min="1" value={form.quantity} onChange={handleChange} className="border p-2 w-full" required />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Create</button>
      </form>
    </div>
  );
};

export default PurchaseOrderCreatePage;