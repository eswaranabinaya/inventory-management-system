import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import InventoryForm from '../../components/inventory/InventoryForm';
import { getInventory, updateInventory } from '../../services/inventoryService';
import { getProducts } from '../../services/productService';
import { getWarehouses } from '../../services/warehouseService';

const InventoryEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(null);
  const [products, setProducts] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [inv, prods, whs] = await Promise.all([
          getInventory(id),
          getProducts(),
          getWarehouses()
        ]);
        setInitialValues({
          productId: inv.productId,
          warehouseId: inv.warehouseId,
          quantity: inv.quantity,
        });
        setProducts(prods);
        setWarehouses(whs);
      } catch (err) {
        alert('Failed to fetch inventory/products/warehouses: ' + err.message);
        navigate('/inventory');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, navigate]);

  const handleSubmit = async (data) => {
    try {
      await updateInventory(id, data);
      navigate('/inventory');
    } catch (err) {
      alert('Failed to update inventory: ' + err.message);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (!initialValues) return null;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Inventory</h1>
      <InventoryForm initialValues={initialValues} onSubmit={handleSubmit} submitLabel="Update" products={products} warehouses={warehouses} />
    </div>
  );
};

export default InventoryEditPage;