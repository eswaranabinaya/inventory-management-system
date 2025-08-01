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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductListPage />} />
        <Route path="/products/new" element={<ProductCreatePage />} />
        <Route path="/products/:id/edit" element={<ProductEditPage />} />
        <Route path="/warehouses" element={<WarehouseListPage />} />
        <Route path="/warehouses/new" element={<WarehouseCreatePage />} />
        <Route path="/warehouses/:id/edit" element={<WarehouseEditPage />} />
        <Route path="/inventory" element={<InventoryListPage />} />
        <Route path="/inventory/new" element={<InventoryCreatePage />} />
        <Route path="/inventory/:id/edit" element={<InventoryEditPage />} />
        <Route path="/purchase-orders" element={<PurchaseOrderListPage />} />
        <Route path="/purchase-orders/new" element={<PurchaseOrderCreatePage />} />
        <Route path="/stock-alerts" element={<StockAlertsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
