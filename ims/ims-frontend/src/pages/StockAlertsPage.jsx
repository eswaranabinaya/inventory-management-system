import { useEffect, useState } from 'react';

const fetchStockAlerts = async () => {
  const res = await fetch('/api/stock-alerts');
  if (!res.ok) throw new Error('Failed to fetch stock alerts');
  return res.json();
};

const resolveStockAlert = async (id) => {
  const res = await fetch(`/api/stock-alerts/${id}/resolve`, { method: 'POST' });
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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Stock Alerts</h1>
      {loading ? (
        <p>Loading...</p>
      ) : alerts.length === 0 ? (
        <p className="text-green-600">No active stock alerts.</p>
      ) : (
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Product</th>
              <th className="p-2 border">Warehouse</th>
              <th className="p-2 border">Quantity</th>
              <th className="p-2 border">Threshold</th>
              <th className="p-2 border">Created At</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {alerts.map(alert => (
              <tr key={alert.id}>
                <td className="p-2 border">{alert.inventory.product.name}</td>
                <td className="p-2 border">{alert.inventory.warehouse.name}</td>
                <td className="p-2 border">{alert.quantity}</td>
                <td className="p-2 border">{alert.threshold}</td>
                <td className="p-2 border">{new Date(alert.createdAt).toLocaleString()}</td>
                <td className="p-2 border">
                  <button className="text-green-600 hover:underline" onClick={() => handleResolve(alert.id)}>
                    Resolve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StockAlertsPage;