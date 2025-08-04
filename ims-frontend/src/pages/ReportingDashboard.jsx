import React from 'react';
import { useNavigate } from 'react-router-dom';
import HomeButton from '../components/HomeButton';

const features = [
  {
    title: 'Inventory Turnover',
    description: 'Analyze how quickly inventory is sold and replaced.',
    color: 'bg-blue-600 hover:bg-blue-700',
    icon: (
      <svg className="w-10 h-10 mb-2 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    ),
    route: '/reporting/inventory-turnover',
  },
  {
    title: 'Stock Valuation',
    description: 'View the current value of your inventory stock.',
    color: 'bg-green-600 hover:bg-green-700',
    icon: (
      <svg className="w-10 h-10 mb-2 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 0V4m0 8v8m8-8a8 8 0 11-16 0 8 8 0 0116 0z" /></svg>
    ),
    route: '/reporting/stock-valuation',
  },
  {
    title: 'Inventory Trends',
    description: 'Track inventory levels over time for better planning.',
    color: 'bg-purple-600 hover:bg-purple-700',
    icon: (
      <svg className="w-10 h-10 mb-2 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 17l6-6 4 4 8-8" /></svg>
    ),
    route: '/reporting/inventory-trends',
  },
];

export default function ReportingDashboard() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 relative">
      <div className="absolute top-6 left-6 z-10">
        <HomeButton />
      </div>
      <h1 className="text-3xl font-bold mb-10">Reporting Dashboard</h1>
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl justify-center items-center">
        {features.map((f, idx) => (
          <button
            key={f.title}
            className={`flex flex-col items-center justify-center w-72 h-56 rounded-2xl shadow-lg transition-all duration-200 transform hover:scale-105 ${f.color}`}
            onClick={() => navigate(f.route)}
          >
            {f.icon}
            <span className="text-2xl font-bold text-white mb-2">{f.title}</span>
            <span className="text-white text-base text-center px-4 opacity-90">{f.description}</span>
          </button>
        ))}
      </div>
    </div>
  );
}