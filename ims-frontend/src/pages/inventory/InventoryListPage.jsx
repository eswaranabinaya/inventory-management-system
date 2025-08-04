import { useEffect, useState } from 'react';
import { getInventories, deleteInventory } from '../../services/inventoryService';
import { getProducts } from '../../services/productService';
import { getWarehouses } from '../../services/warehouseService';
import { Link, useNavigate } from 'react-router-dom';

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
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Inventory List</h1>
        <Link to="/inventory/new" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add Inventory</Link>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Product</th>
              <th className="p-2 border">Warehouse</th>
              <th className="p-2 border">Quantity</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {inventory.length === 0 ? (
              <tr><td colSpan={4} className="text-center p-4">No inventory records found.</td></tr>
            ) : (
              inventory.map(item => (
                <tr key={item.id}>
                  <td className="p-2 border">{item.productName || products.find(p => p.id === item.productId)?.name || item.productId}</td>
                  <td className="p-2 border">{item.warehouseName || warehouses.find(w => w.id === item.warehouseId)?.name || item.warehouseId}</td>
                  <td className="p-2 border">{item.quantity}</td>
                  <td className="p-2 border space-x-2">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => navigate(`/inventory/${item.id}/edit`)}
                    >Edit</button>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => handleDelete(item.id)}
                    >Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default InventoryListPage;