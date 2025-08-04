import React, { useEffect, useState } from 'react';
import reportService from '../../services/reportService';
import { useNavigate } from 'react-router-dom';
import HomeButton from '../../components/HomeButton';

export default function StockValuationPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setError(null);
    reportService.getStockValuation()
      .then(setData)
      .catch(err => setError(err.response?.data?.message || err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 relative">
      <div className="absolute top-6 left-6 z-50"><HomeButton /></div>
      <div className="absolute top-6 right-6 z-10">
        <button
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => navigate('/reporting')}
        >
          Dashboard
        </button>
      </div>
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-4xl">
        <div className="flex items-center gap-4 mb-8">
          <span className="bg-green-600 p-3 rounded-full text-white">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 0V4m0 8v8m8-8a8 8 0 11-16 0 8 8 0 0116 0z" /></svg>
          </span>
          <h2 className="text-3xl font-bold text-gray-800">Stock Valuation Report</h2>
        </div>
        {loading ? (
          <p className="text-lg text-gray-600">Loading...</p>
        ) : error ? (
          <p className="text-red-600 text-lg">{error}</p>
        ) : data.length === 0 ? (
          <p className="text-green-700 text-lg">No stock valuation data available.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded-lg shadow">
              <thead>
                <tr className="bg-green-100 text-green-900">
                  <th className="p-3 border">Product</th>
                  <th className="p-3 border">Warehouse</th>
                  <th className="p-3 border">Quantity On Hand</th>
                  <th className="p-3 border">Unit Cost</th>
                  <th className="p-3 border">Total Value</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, idx) => (
                  <tr key={idx} className="hover:bg-green-50">
                    <td className="p-3 border font-medium">{row.productName}</td>
                    <td className="p-3 border">{row.warehouseName}</td>
                    <td className="p-3 border text-right">{row.quantityOnHand}</td>
                    <td className="p-3 border text-right">{row.unitCost}</td>
                    <td className="p-3 border text-right font-semibold">{row.totalValue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}