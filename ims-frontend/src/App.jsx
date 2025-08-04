import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductListPage from './pages/products/ProductListPage';
import ProductCreatePage from './pages/products/ProductCreatePage';
import ProductEditPage from './pages/products/ProductEditPage';
import WarehouseListPage from './pages/warehouses/WarehouseListPage';
import WarehouseCreatePage from './pages/warehouses/WarehouseCreatePage';
import WarehouseEditPage from './pages/warehouses/WarehouseEditPage';
import InventoryListPage from './pages/inventory/InventoryListPage';
import InventoryCreatePage from './pages/inventory/InventoryCreatePage';
import InventoryEditPage from './pages/inventory/InventoryEditPage';
import PurchaseOrderListPage from './pages/purchaseOrders/PurchaseOrderListPage';
import PurchaseOrderCreatePage from './pages/purchaseOrders/PurchaseOrderCreatePage';
import StockAlertsPage from './pages/StockAlertsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ReportingDashboard from './pages/ReportingDashboard';
import InventoryTurnoverPage from './pages/reporting/InventoryTurnoverPage';
import StockValuationPage from './pages/reporting/StockValuationPage';
import InventoryTrendsPage from './pages/reporting/InventoryTrendsPage';

function RequireAuth({ children }) {
  const token = localStorage.getItem('token');
  console.log('RequireAuth - Token:', token); // Debug log
  if (!token) {
    console.log('RequireAuth - No token, redirecting to login'); // Debug log
    return <Navigate to="/login" replace />;
  }
  console.log('RequireAuth - Token found, rendering children'); // Debug log
  return children;
}

function App() {
  const token = localStorage.getItem('token');
  console.log('App - Current token:', token); // Debug log
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={token ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />} />
        <Route path="/home" element={<RequireAuth><HomePage /></RequireAuth>} />
        <Route path="/products" element={<RequireAuth><ProductListPage /></RequireAuth>} />
        <Route path="/products/new" element={<RequireAuth><ProductCreatePage /></RequireAuth>} />
        <Route path="/products/:id/edit" element={<RequireAuth><ProductEditPage /></RequireAuth>} />
        <Route path="/warehouses" element={<RequireAuth><WarehouseListPage /></RequireAuth>} />
        <Route path="/warehouses/new" element={<RequireAuth><WarehouseCreatePage /></RequireAuth>} />
        <Route path="/warehouses/:id/edit" element={<RequireAuth><WarehouseEditPage /></RequireAuth>} />
        <Route path="/inventory" element={<RequireAuth><InventoryListPage /></RequireAuth>} />
        <Route path="/inventory/new" element={<RequireAuth><InventoryCreatePage /></RequireAuth>} />
        <Route path="/inventory/:id/edit" element={<RequireAuth><InventoryEditPage /></RequireAuth>} />
        <Route path="/purchase-orders" element={<RequireAuth><PurchaseOrderListPage /></RequireAuth>} />
        <Route path="/purchase-orders/new" element={<RequireAuth><PurchaseOrderCreatePage /></RequireAuth>} />
        <Route path="/stock-alerts" element={<RequireAuth><StockAlertsPage /></RequireAuth>} />
        <Route path="/reporting" element={<RequireAuth><ReportingDashboard /></RequireAuth>} />
        <Route path="/reporting/inventory-turnover" element={<RequireAuth><InventoryTurnoverPage /></RequireAuth>} />
        <Route path="/reporting/stock-valuation" element={<RequireAuth><StockValuationPage /></RequireAuth>} />
        <Route path="/reporting/inventory-trends" element={<RequireAuth><InventoryTrendsPage /></RequireAuth>} />
      </Routes>
    </Router>
  );
}

export default App;
