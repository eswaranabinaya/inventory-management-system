import { useEffect, useState } from 'react';
import { getWarehouses, deleteWarehouse } from '../../services/warehouseService';
import { Link, useNavigate } from 'react-router-dom';

const WarehouseListPage = () => {
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchWarehouses = async () => {
    setLoading(true);
    try {
      const data = await getWarehouses();
      setWarehouses(data);
    } catch (err) {
      alert('Failed to fetch warehouses: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWarehouses();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this warehouse?')) return;
    try {
      await deleteWarehouse(id);
      fetchWarehouses();
    } catch (err) {
      alert('Failed to delete warehouse: ' + err.message);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Warehouse List</h1>
        <Link to="/warehouses/new" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add Warehouse</Link>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Location</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {warehouses.length === 0 ? (
              <tr><td colSpan={3} className="text-center p-4">No warehouses found.</td></tr>
            ) : (
              warehouses.map(warehouse => (
                <tr key={warehouse.id}>
                  <td className="p-2 border">{warehouse.name}</td>
                  <td className="p-2 border">{warehouse.location}</td>
                  <td className="p-2 border space-x-2">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => navigate(`/warehouses/${warehouse.id}/edit`)}
                    >Edit</button>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => handleDelete(warehouse.id)}
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

export default WarehouseListPage;