import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const HomePage = () => {
  const navigate = useNavigate();
  const [alertCount, setAlertCount] = useState(0);

  useEffect(() => {
    fetch('/api/stock-alerts')
      .then(res => res.ok ? res.json() : [])
      .then(data => setAlertCount(data.length))
      .catch(() => setAlertCount(0));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-8">Inventory Management System</h1>
      <div className="flex space-x-8">
        <button
          onClick={() => navigate('/products')}
          className="bg-blue-600 text-white px-8 py-6 rounded-lg shadow hover:bg-blue-700 text-xl font-semibold"
        >
          Products
        </button>
        <button
          onClick={() => navigate('/warehouses')}
          className="bg-green-600 text-white px-8 py-6 rounded-lg shadow hover:bg-green-700 text-xl font-semibold"
        >
          Warehouses
        </button>
        <button
          onClick={() => navigate('/inventory')}
          className="bg-purple-600 text-white px-8 py-6 rounded-lg shadow hover:bg-purple-700 text-xl font-semibold"
        >
          Inventory
        </button>
        <button
          onClick={() => navigate('/purchase-orders')}
          className="bg-yellow-600 text-white px-8 py-6 rounded-lg shadow hover:bg-yellow-700 text-xl font-semibold"
        >
          Purchase Orders
        </button>
        <button
          onClick={() => navigate('/stock-alerts')}
          className="relative bg-red-600 text-white px-8 py-6 rounded-lg shadow hover:bg-red-700 text-xl font-semibold"
        >
          Stock Alerts
          {alertCount > 0 && (
            <span className="absolute top-2 right-2 bg-white text-red-600 rounded-full px-3 py-1 text-sm font-bold border border-red-600">
              {alertCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default HomePage;