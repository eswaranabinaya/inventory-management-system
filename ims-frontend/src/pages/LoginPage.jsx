import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/react.svg'; // Use your logo or keep as placeholder

const LoginPage = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Invalid username or password');
      const data = await res.json();
      if (!data.token) throw new Error('No token received from server');
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.username);
      localStorage.setItem('role', data.role);
      navigate('/home');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-purple-400 to-pink-300">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10 flex flex-col items-center">
        <img src={logo} alt="IMS Logo" className="h-14 mb-4" />
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">Inventory Management</h2>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              value={form.username}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium"
                onClick={() => setShowPassword(v => !v)}
                tabIndex={-1}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-lg shadow transition"
          >
            Sign In
          </button>
        </form>
        <div className="flex w-full justify-between mt-6 text-sm">
          <button type="button" className="text-blue-500 hover:underline" onClick={() => navigate('/forgot-password')}>Forgot password?</button>
          <button type="button" className="text-blue-500 hover:underline" onClick={() => navigate('/register')}>Create account</button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;