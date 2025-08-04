import React from 'react';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import WarehouseForm from '../../components/warehouses/WarehouseForm';
import { getWarehouse, updateWarehouse } from '../../services/warehouseService';
import HomeButton from "../../components/HomeButton";

const WarehouseEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWarehouse = async () => {
      try {
        const data = await getWarehouse(id);
        setInitialValues({
          name: data.name,
          location: data.location || '',
        });
      } catch (err) {
        alert('Failed to fetch warehouse: ' + err.message);
        navigate('/warehouses');
      } finally {
        setLoading(false);
      }
    };
    fetchWarehouse();
  }, [id, navigate]);

  const handleSubmit = async (data) => {
    try {
      await updateWarehouse(id, data);
      navigate('/warehouses');
    } catch (err) {
      alert('Failed to update warehouse: ' + err.message);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (!initialValues) return null;

  return (
    <div className="p-6">
      <HomeButton />
      <h1 className="text-2xl font-bold mb-4">Edit Warehouse</h1>
      <WarehouseForm initialValues={initialValues} onSubmit={handleSubmit} submitLabel="Update" />
    </div>
  );
};

export default WarehouseEditPage;