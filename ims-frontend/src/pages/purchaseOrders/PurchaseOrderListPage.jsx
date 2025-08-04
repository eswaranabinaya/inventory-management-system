import { useEffect, useState } from 'react';
import { getPurchaseOrders, fulfillPurchaseOrder } from '../../services/purchaseOrderService';
import { useNavigate } from 'react-router-dom';
import HomeButton from "../../components/HomeButton";

const PurchaseOrderListPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 relative overflow-x-hidden">
      <div className="absolute top-6 left-6 z-50"><HomeButton /></div>
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-300 opacity-30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-300 opacity-30 rounded-full blur-3xl" />
      </div>
      <div className="z-10 flex flex-col items-center justify-center py-16 w-full">
        <div className="flex items-center gap-4 mb-6 w-full max-w-5xl">
          <span className="bg-yellow-500 p-3 rounded-full text-white shadow-lg">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="6" y="3" width="12" height="18" rx="2" /><path d="M9 7h6M9 11h6M9 15h3" /></svg>
          </span>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Purchase Orders</h1>
            <p className="text-gray-600 text-base">Create and manage supplier purchase orders.</p>
          </div>
          <button
            className="ml-auto bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-xl shadow flex items-center gap-2 font-semibold transition-all"
            onClick={() => navigate('/purchase-orders/new')}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
            Create Purchase Order
          </button>
        </div>
        <div className="bg-white bg-opacity-90 backdrop-blur-lg rounded-2xl shadow-xl p-6 w-full max-w-5xl">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border rounded-lg shadow">
                <thead>
                  <tr className="bg-yellow-100 text-yellow-900">
                    <th className="p-3 border">Supplier</th>
                    <th className="p-3 border">Product</th>
                    <th className="p-3 border">Warehouse</th>
                    <th className="p-3 border">Quantity</th>
                    <th className="p-3 border">Status</th>
                    <th className="p-3 border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length === 0 ? (
                    <tr><td colSpan={6} className="text-center p-4">No purchase orders found.</td></tr>
                  ) : (
                    orders.map(order => (
                      <tr key={order.id} className="hover:bg-yellow-50">
                        <td className="p-3 border font-medium">{order.supplierName}</td>
                        <td className="p-3 border">{order.productName}</td>
                        <td className="p-3 border">{order.warehouseName}</td>
                        <td className="p-3 border">{order.quantity}</td>
                        <td className="p-3 border">{order.status}</td>
                        <td className="p-3 border space-x-2">
                          {order.status === 'PENDING' && (
                            <button
                              className="inline-flex items-center gap-1 bg-green-100 hover:bg-green-200 text-green-700 px-3 py-1 rounded-full text-sm font-semibold transition-all"
                              onClick={() => handleFulfill(order.id)}
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                              Fulfill
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
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

export default PurchaseOrderListPage;