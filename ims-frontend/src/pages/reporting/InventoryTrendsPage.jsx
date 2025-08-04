import React, { useEffect, useState } from 'react';
import reportService from '../../services/reportService';
import { useNavigate } from 'react-router-dom';
import HomeButton from '../../components/HomeButton';

export default function InventoryTrendsPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    productId: '',
    warehouseId: ''
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch initial data for current month
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().slice(0, 10);
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString().slice(0, 10);
    setFilters(f => ({ ...f, startDate: firstDay, endDate: lastDay }));
    fetchData({ startDate: firstDay, endDate: lastDay });
    // eslint-disable-next-line
  }, []);

  const fetchData = async (params) => {
    setLoading(true);
    setError(null);
    try {
      const res = await reportService.getInventoryTrends(params);
      setData(res);
    } catch (e) {
      setError('Failed to fetch report');
    }
    setLoading(false);
  };

  const handleChange = e => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleFilter = e => {
    e.preventDefault();
    setError(null);
    if (!filters.startDate || !filters.endDate) {
      setError('Start date and end date are required.');
      return;
    }
    if (filters.startDate > filters.endDate) {
      setError('Start date cannot be after end date.');
      return;
    }
    fetchData(filters);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 relative">
      <div className="absolute top-6 left-6 z-50"><HomeButton /></div>
      <div className="absolute top-6 right-6 z-10">
        <button
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => navigate('/reporting')}
        >
          Dashboard
        </button>
      </div>
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-5xl">
        <div className="flex items-center gap-4 mb-8">
          <span className="bg-purple-600 p-3 rounded-full text-white">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 17l6-6 4 4 8-8" /></svg>
          </span>
          <h2 className="text-3xl font-bold text-gray-800">Inventory Trends Report</h2>
        </div>
        <form className="flex flex-wrap gap-4 mb-6 items-end bg-purple-50 rounded-xl p-4" onSubmit={handleFilter}>
          <div>
            <label className="block text-sm font-semibold text-purple-700">Start Date</label>
            <input type="date" name="startDate" value={filters.startDate} onChange={handleChange} className="input input-bordered" required />
          </div>
          <div>
            <label className="block text-sm font-semibold text-purple-700">End Date</label>
            <input type="date" name="endDate" value={filters.endDate} onChange={handleChange} className="input input-bordered" required />
          </div>
          <div>
            <label className="block text-sm font-semibold text-purple-700">Product ID</label>
            <input type="text" name="productId" value={filters.productId} onChange={handleChange} className="input input-bordered" placeholder="(optional)" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-purple-700">Warehouse ID</label>
            <input type="text" name="warehouseId" value={filters.warehouseId} onChange={handleChange} className="input input-bordered" placeholder="(optional)" />
          </div>
          <button type="submit" className="btn bg-purple-600 text-white hover:bg-purple-700">Filter</button>
        </form>
        {error && (
          <div className="mb-4 text-red-600 font-semibold text-center">{error}</div>
        )}
        <div className="overflow-x-auto">
          <table className="min-w-full border rounded-lg shadow">
            <thead>
              <tr className="bg-purple-100 text-purple-900">
                <th className="p-3 border">Product</th>
                <th className="p-3 border">Warehouse</th>
                <th className="p-3 border">Date</th>
                <th className="p-3 border">Quantity On Hand</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={4} className="text-center">Loading...</td></tr>
              ) : error ? (
                <tr><td colSpan={4} className="text-red-600 text-center">{error}</td></tr>
              ) : data.length === 0 ? (
                <tr><td colSpan={4} className="text-green-700 text-center">No data</td></tr>
              ) : data.map((row, idx) => (
                <tr key={idx} className="hover:bg-purple-50">
                  <td className="p-3 border font-medium">{row.productName}</td>
                  <td className="p-3 border">{row.warehouseName}</td>
                  <td className="p-3 border">{row.date}</td>
                  <td className="p-3 border text-right">{row.quantityOnHand}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}