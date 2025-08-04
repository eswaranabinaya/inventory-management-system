import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import reportService from '../../services/reportService';
import HomeButton from '../../components/HomeButton';

export default function InventoryTurnoverPage() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    productId: '',
    warehouseId: ''
  });

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
    try {
      const res = await reportService.getInventoryTurnover(params);
      setData(res);
    } catch (e) {
      alert('Failed to fetch report');
    }
    setLoading(false);
  };

  const handleChange = e => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleFilter = e => {
    e.preventDefault();
    fetchData(filters);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 relative">
      <div className="absolute top-6 left-6 z-50"><HomeButton /></div>
      <div className="absolute top-6 right-6 z-10">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => navigate('/reporting')}
        >
          Dashboard
        </button>
      </div>
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-6xl">
        <div className="flex items-center gap-4 mb-8">
          <span className="bg-blue-600 p-3 rounded-full text-white">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </span>
          <h2 className="text-3xl font-bold text-gray-800">Inventory Turnover Report</h2>
        </div>
        <form className="flex flex-wrap gap-4 mb-6 items-end bg-blue-50 rounded-xl p-4" onSubmit={handleFilter}>
          <div>
            <label className="block text-sm font-semibold text-blue-700">Start Date</label>
            <input type="date" name="startDate" value={filters.startDate} onChange={handleChange} className="input input-bordered" required />
          </div>
          <div>
            <label className="block text-sm font-semibold text-blue-700">End Date</label>
            <input type="date" name="endDate" value={filters.endDate} onChange={handleChange} className="input input-bordered" required />
          </div>
          <div>
            <label className="block text-sm font-semibold text-blue-700">Product ID</label>
            <input type="text" name="productId" value={filters.productId} onChange={handleChange} className="input input-bordered" placeholder="(optional)" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-blue-700">Warehouse ID</label>
            <input type="text" name="warehouseId" value={filters.warehouseId} onChange={handleChange} className="input input-bordered" placeholder="(optional)" />
          </div>
          <button type="submit" className="btn bg-blue-600 text-white hover:bg-blue-700">Filter</button>
        </form>
        <div className="overflow-x-auto">
          <table className="min-w-full border rounded-lg shadow">
            <thead>
              <tr className="bg-blue-100 text-blue-900">
                <th className="p-3 border">Product</th>
                <th className="p-3 border">Warehouse</th>
                <th className="p-3 border">Period</th>
                <th className="p-3 border">COGS</th>
                <th className="p-3 border">Avg Inventory</th>
                <th className="p-3 border">Turnover Ratio</th>
                <th className="p-3 border">Unit Cost</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="text-center">Loading...</td></tr>
              ) : data.length === 0 ? (
                <tr><td colSpan={6} className="text-green-700 text-center">No data</td></tr>
              ) : data.map((row, idx) => (
                <tr key={idx} className="hover:bg-blue-50">
                  <td className="p-3 border font-medium">{row.productName}</td>
                  <td className="p-3 border">{row.warehouseName}</td>
                  <td className="p-3 border">{row.periodStart} to {row.periodEnd}</td>
                  <td className="p-3 border text-right">{row.costOfGoodsSold}</td>
                  <td className="p-3 border text-right">{row.averageInventory}</td>
                  <td className="p-3 border text-right font-semibold">{row.turnoverRatio}</td>
                  <td className="p-3 border text-right">{row.unitCost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}