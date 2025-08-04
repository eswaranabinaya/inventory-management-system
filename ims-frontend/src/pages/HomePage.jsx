import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const features = [
  {
    title: 'Products',
    color: 'bg-blue-600 hover:bg-blue-700',
    icon: (
      <svg className="w-10 h-10 mb-2 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M16 3v4M8 3v4" /></svg>
    ),
    route: '/products',
    description: 'Manage your product catalog, SKUs, and details.'
  },
  {
    title: 'Warehouses',
    color: 'bg-green-600 hover:bg-green-700',
    icon: (
      <svg className="w-10 h-10 mb-2 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="10" width="18" height="11" rx="2" /><path d="M7 10V6a5 5 0 0110 0v4" /></svg>
    ),
    route: '/warehouses',
    description: 'Organize and track your warehouse locations.'
  },
  {
    title: 'Inventory',
    color: 'bg-purple-600 hover:bg-purple-700',
    icon: (
      <svg className="w-10 h-10 mb-2 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M12 3v4" /></svg>
    ),
    route: '/inventory',
    description: 'View and adjust your current inventory levels.'
  },
  {
    title: 'Purchase Orders',
    color: 'bg-yellow-600 hover:bg-yellow-700',
    icon: (
      <svg className="w-10 h-10 mb-2 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="6" y="3" width="12" height="18" rx="2" /><path d="M9 7h6M9 11h6M9 15h3" /></svg>
    ),
    route: '/purchase-orders',
    description: 'Create and manage supplier purchase orders.'
  },
  {
    title: 'Stock Alerts',
    color: 'bg-red-600 hover:bg-red-700',
    icon: (
      <svg className="w-10 h-10 mb-2 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M13 16h-1v-4h-1m1-4h.01" /><path d="M12 19a2 2 0 002-2H10a2 2 0 002 2z" /></svg>
    ),
    route: '/stock-alerts',
    description: 'Get notified about low or critical stock.'
  },
  {
    title: 'Dashboard',
    color: 'bg-gray-700 hover:bg-gray-800',
    icon: (
      <svg className="w-10 h-10 mb-2 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8v-10h-8v10zm0-18v6h8V3h-8z" /></svg>
    ),
    route: '/reporting',
    description: 'Reporting & analytics for your inventory.'
  },
];

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

const HomePage = () => {
  const navigate = useNavigate();
  const [alertCount, setAlertCount] = useState(0);

  useEffect(() => {
    fetch('/api/stock-alerts', {
      headers: {
        ...getAuthHeaders(),
      },
    })
      .then(res => res.ok ? res.json() : [])
      .then(data => setAlertCount(data.length))
      .catch(() => setAlertCount(0));
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 relative overflow-x-hidden">
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
        {/* Decorative blurred circles for depth */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-300 opacity-30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-300 opacity-30 rounded-full blur-3xl" />
      </div>
      <div className="absolute top-6 right-6 z-50">
        <button
          className="flex items-center justify-center bg-gray-200 hover:bg-red-500 text-gray-700 hover:text-white rounded-full w-12 h-12 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
          onClick={handleLogout}
          aria-label="Logout"
          title="Logout"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" />
          </svg>
        </button>
      </div>
      <div className="z-10 flex flex-col items-center justify-center py-16">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 animate-fade-in">Inventory Management System</h1>
        <p className="text-xl md:text-2xl text-gray-700 mb-10 animate-fade-in-slow">Your cloud-native, enterprise-grade inventory platform.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-5xl animate-fade-in-slowest">
          {features.map((f, idx) => (
            <button
              key={f.title}
              className={`relative flex flex-col items-center justify-center rounded-2xl shadow-xl transition-all duration-200 transform hover:scale-105 ${f.color} bg-opacity-90 backdrop-blur-lg p-8 min-h-[220px]`}
              onClick={() => navigate(f.route)}
            >
              {f.icon}
              <span className="text-2xl font-bold text-white mb-1 drop-shadow">{f.title}</span>
              <span className="text-white text-base text-center px-2 opacity-90 mb-2">{f.description}</span>
              {f.title === 'Stock Alerts' && alertCount > 0 && (
                <span className="absolute top-4 right-4 animate-bounce bg-white text-red-600 rounded-full px-3 py-1 text-sm font-bold border border-red-600 shadow-lg">
                  {alertCount}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
      <footer className="z-10 w-full text-center py-6 text-gray-500 text-sm absolute bottom-0 left-0">
        © 2024 Inventory Management System. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;