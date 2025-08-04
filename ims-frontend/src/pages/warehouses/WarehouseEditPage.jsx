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
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 relative overflow-x-hidden">
      <div className="absolute top-6 left-6 z-50"><HomeButton /></div>
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-300 opacity-30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-300 opacity-30 rounded-full blur-3xl" />
      </div>
      <div className="z-10 flex flex-col items-center justify-center py-16 w-full">
        <div className="flex items-center gap-4 mb-6">
          <span className="bg-green-600 p-3 rounded-full text-white shadow-lg">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="10" width="18" height="11" rx="2" /><path d="M7 10V6a5 5 0 0110 0v4" /></svg>
          </span>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Edit Warehouse</h1>
            <p className="text-gray-600 text-base">Update an existing warehouse location.</p>
          </div>
        </div>
        <div className="bg-white bg-opacity-90 backdrop-blur-lg rounded-2xl shadow-xl p-8 w-full max-w-xl">
          <WarehouseForm initialValues={initialValues} onSubmit={handleSubmit} submitLabel="Update" />
        </div>
      </div>
      <footer className="z-10 w-full text-center py-6 text-gray-500 text-sm absolute bottom-0 left-0">
        © 2024 Inventory Management System. All rights reserved.
      </footer>
    </div>
  );
};

export default WarehouseEditPage;