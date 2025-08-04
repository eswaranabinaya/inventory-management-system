import { useEffect, useState } from 'react';
import HomeButton from "../components/HomeButton";

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

const API_URL = import.meta.env.VITE_API_URL;

const fetchStockAlerts = async () => {
  const res = await fetch(`${API_URL}/api/stock-alerts`, {
    headers: {
      ...getAuthHeaders(),
    },
  });
  if (!res.ok) throw new Error('Failed to fetch stock alerts');
  return res.json();
};

const resolveStockAlert = async (id) => {
  const res = await fetch(`${API_URL}/api/stock-alerts/${id}/resolve`, {
    method: 'POST',
    headers: {
      ...getAuthHeaders(),
    },
  });
  if (!res.ok) throw new Error('Failed to resolve alert');
};

const StockAlertsPage = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadAlerts = async () => {
    setLoading(true);
    try {
      const data = await fetchStockAlerts();
      setAlerts(data);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAlerts();
  }, []);

  const handleResolve = async (id) => {
    if (!window.confirm('Mark this alert as resolved?')) return;
    try {
      await resolveStockAlert(id);
      loadAlerts();
    } catch (err) {
      alert(err.message);
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
          <span className="relative bg-red-600 p-3 rounded-full text-white shadow-lg">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M13 16h-1v-4h-1m1-4h.01" /><path d="M12 19a2 2 0 002-2H10a2 2 0 002 2z" /></svg>
            {Array.isArray(alerts) && alerts.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-white text-red-600 rounded-full px-2 py-0.5 text-xs font-bold border border-red-600 shadow z-20">
                {alerts.length}
              </span>
            )}
          </span>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Stock Alerts</h1>
            <p className="text-gray-600 text-base">Get notified about low or critical stock.</p>
          </div>
        </div>
        <div className="bg-white bg-opacity-90 backdrop-blur-lg rounded-2xl shadow-xl p-6 w-full max-w-5xl">
          {loading ? (
            <p>Loading...</p>
          ) : alerts.length === 0 ? (
            <p className="text-green-600">No active stock alerts.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border rounded-lg shadow">
                <thead>
                  <tr className="bg-red-100 text-red-900">
                    <th className="p-3 border">Product</th>
                    <th className="p-3 border">Warehouse</th>
                    <th className="p-3 border">Quantity</th>
                    <th className="p-3 border">Threshold</th>
                    <th className="p-3 border">Created At</th>
                    <th className="p-3 border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {alerts.map(alert => (
                    <tr key={alert.id} className="hover:bg-red-50">
                      <td className="p-3 border font-medium">{alert.productName}</td>
                      <td className="p-3 border">{alert.warehouseName}</td>
                      <td className="p-3 border">{alert.quantity}</td>
                      <td className="p-3 border">{alert.threshold}</td>
                      <td className="p-3 border">{new Date(alert.createdAt).toLocaleString()}</td>
                      <td className="p-3 border">
                        <button
                          className="inline-flex items-center gap-1 bg-green-100 hover:bg-green-200 text-green-700 px-3 py-1 rounded-full text-sm font-semibold transition-all"
                          onClick={() => handleResolve(alert.id)}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                          Resolve
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <footer className="z-10 w-full text-center py-6 text-gray-500 text-sm absolute bottom-0 left-0">
        © 2024 Inventory Management System. All rights reserved.
      </footer>
    </div>
  );
};

export default StockAlertsPage;