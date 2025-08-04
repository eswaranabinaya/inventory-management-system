import axios from 'axios';

const API_BASE = `${import.meta.env.VITE_API_URL}/api/reports`;

function getAuthHeaders() {
  const token = localStorage.getItem('token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
}

const getInventoryTurnover = async (params) => {
  const { startDate, endDate, productId, warehouseId } = params;
  const query = [];
  if (startDate) query.push(`startDate=${startDate}`);
  if (endDate) query.push(`endDate=${endDate}`);
  if (productId) query.push(`productId=${productId}`);
  if (warehouseId) query.push(`warehouseId=${warehouseId}`);
  const url = `${API_BASE}/inventory-turnover?${query.join('&')}`;
  const res = await axios.get(url, { headers: getAuthHeaders() });
  return res.data;
};

const getStockValuation = async (params = {}) => {
  const { productId, warehouseId } = params;
  const query = [];
  if (productId) query.push(`productId=${productId}`);
  if (warehouseId) query.push(`warehouseId=${warehouseId}`);
  const url = `${API_BASE}/stock-valuation${query.length ? '?' + query.join('&') : ''}`;
  const res = await axios.get(url, { headers: getAuthHeaders() });
  return res.data;
};

const getInventoryTrends = async (params) => {
  const { startDate, endDate, productId, warehouseId } = params;
  const query = [];
  if (startDate) query.push(`startDate=${startDate}`);
  if (endDate) query.push(`endDate=${endDate}`);
  if (productId) query.push(`productId=${productId}`);
  if (warehouseId) query.push(`warehouseId=${warehouseId}`);
  const url = `${API_BASE}/inventory-trends?${query.join('&')}`;
  const res = await axios.get(url, { headers: getAuthHeaders() });
  return res.data;
};

const reportService = {
  getInventoryTurnover,
  getStockValuation,
  getInventoryTrends,
};

export default reportService;