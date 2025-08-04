import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      console.log('Attempting login with:', form); // Debug log
      const API_URL = import.meta.env.VITE_API_URL;
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      console.log('Response status:', res.status); // Debug log
      console.log('Response headers:', res.headers); // Debug log
      
      if (!res.ok) {
        const errorText = await res.text();
        console.log('Error response:', errorText); // Debug log
        throw new Error('Invalid username or password');
      }
      
      const data = await res.json();
      console.log('Login response:', data); // Debug log
      
      if (!data.token) {
        throw new Error('No token received from server');
      }
      
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.username);
      localStorage.setItem('role', data.role);
      console.log('Token stored:', localStorage.getItem('token')); // Debug log
      console.log('Navigating to /home...'); // Debug log
      // Navigate directly to /home instead of / to avoid routing issues
      navigate('/home');
    } catch (err) {
      console.error('Login error:', err); // Debug log
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow max-w-sm w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        {error && <div className="text-red-600 mb-4">{error}</div>}
        <div className="mb-4">
          <label className="block mb-1">Username</label>
          <input name="username" value={form.username} onChange={handleChange} className="border p-2 w-full" required />
        </div>
        <div className="mb-6">
          <label className="block mb-1">Password</label>
          <input name="password" type="password" value={form.password} onChange={handleChange} className="border p-2 w-full" required />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">Login</button>
        <div className="mt-4 text-center">
          <span>Don't have an account? </span>
          <button type="button" className="text-blue-600 underline" onClick={() => navigate('/register')}>Register</button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;