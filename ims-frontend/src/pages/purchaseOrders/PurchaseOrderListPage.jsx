import { useEffect, useState } from 'react';
import { getPurchaseOrders, fulfillPurchaseOrder } from '../../services/purchaseOrderService';
import { useNavigate } from 'react-router-dom';

const PurchaseOrderListPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await getPurchaseOrders();
      setOrders(data);
    } catch (err) {
      alert('Failed to fetch purchase orders: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleFulfill = async (id) => {
    if (!window.confirm('Mark this purchase order as received?')) return;
    try {
      await fulfillPurchaseOrder(id, { receivedBy: 'admin' });
      fetchOrders();
    } catch (err) {
      alert('Failed to fulfill purchase order: ' + err.message);
    }
  };

  const navigate = useNavigate();

  return (
    <div className="p-6">
      <div className="flex flex-col items-center mb-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-yellow-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <rect x="6" y="3" width="12" height="18" rx="2" strokeWidth="2" stroke="currentColor" fill="none"/>
          <path d="M9 7h6M9 11h6M9 15h3" strokeWidth="2" stroke="currentColor" strokeLinecap="round"/>
        </svg>
        <h1 className="text-2xl font-bold mb-4">Purchase Orders</h1>
        <button
          className="ml-auto mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 self-end"
          onClick={() => navigate('/purchase-orders/new')}
        >
          + Create Purchase Order
        </button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Supplier</th>
              <th className="p-2 border">Product</th>
              <th className="p-2 border">Warehouse</th>
              <th className="p-2 border">Quantity</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr><td colSpan={6} className="text-center p-4">No purchase orders found.</td></tr>
            ) : (
              orders.map(order => (
                <tr key={order.id}>
                  <td className="p-2 border">{order.supplierName}</td>
                  <td className="p-2 border">{order.productName}</td>
                  <td className="p-2 border">{order.warehouseName}</td>
                  <td className="p-2 border">{order.quantity}</td>
                  <td className="p-2 border">{order.status}</td>
                  <td className="p-2 border">
                    {order.status === 'PENDING' && (
                      <button className="text-green-600 hover:underline" onClick={() => handleFulfill(order.id)}>
                        Fulfill
                      </button>
                    )}
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

export default PurchaseOrderListPage;