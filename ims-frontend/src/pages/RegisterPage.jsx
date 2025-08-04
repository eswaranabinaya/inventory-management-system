import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
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
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Registration failed');
      const data = await res.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.username);
      localStorage.setItem('role', data.role);
      navigate('/home');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow max-w-sm w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
        {error && <div className="text-red-600 mb-4">{error}</div>}
        <div className="mb-4">
          <label className="block mb-1">Username</label>
          <input name="username" value={form.username} onChange={handleChange} className="border p-2 w-full" required />
        </div>
        <div className="mb-6">
          <label className="block mb-1">Password</label>
          <input name="password" type="password" value={form.password} onChange={handleChange} className="border p-2 w-full" required />
        </div>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded w-full">Register</button>
        <div className="mt-4 text-center">
          <span>Already have an account? </span>
          <button type="button" className="text-blue-600 underline" onClick={() => navigate('/login')}>Login</button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;