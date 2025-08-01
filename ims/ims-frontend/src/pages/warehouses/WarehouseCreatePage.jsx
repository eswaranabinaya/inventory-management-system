import WarehouseForm from '../../components/warehouses/WarehouseForm';
import { createWarehouse } from '../../services/warehouseService';
import { useNavigate } from 'react-router-dom';

const WarehouseCreatePage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    try {
      await createWarehouse(data);
      navigate('/warehouses');
    } catch (err) {
      alert('Failed to create warehouse: ' + err.message);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Create Warehouse</h1>
      <WarehouseForm onSubmit={handleSubmit} submitLabel="Create" />
    </div>
  );
};

export default WarehouseCreatePage;