import InventoryForm from '../../components/inventory/InventoryForm';
import { createInventory } from '../../services/inventoryService';
import { getProducts } from '../../services/productService';
import { getWarehouses } from '../../services/warehouseService';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const InventoryCreatePage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [prods, whs] = await Promise.all([
          getProducts(),
          getWarehouses()
        ]);
        setProducts(prods);
        setWarehouses(whs);
      } catch (err) {
        alert('Failed to fetch products/warehouses: ' + err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (data) => {
    try {
      await createInventory(data);
      navigate('/inventory');
    } catch (err) {
      alert('Failed to create inventory: ' + err.message);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Create Inventory</h1>
      <InventoryForm onSubmit={handleSubmit} submitLabel="Create" products={products} warehouses={warehouses} />
    </div>
  );
};

export default InventoryCreatePage;