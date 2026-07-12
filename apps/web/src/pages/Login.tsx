import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@vorra/ui';

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL ?? 'http://localhost:3000'}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message ?? 'Login failed');
      }
      const data = await res.json();
      localStorage.setItem('token', data.token);
      navigate('/marketplace');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="mx-auto mt-20 max-w-md px-6">
      <h1 className="text-2xl font-bold text-slate-950">Sign in to Vorra</h1>
      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        {error && <p className="text-sm text-red-600">{error}</p>}
        <div>
          <label className="block text-sm font-medium text-slate-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            required
          />
        </div>
        <Button type="submit" className="w-full">Sign in</Button>
        <p className="text-center text-sm text-slate-500">
          Don't have an account?{' '}
          <Link to="/register" className="text-emerald-700 hover:underline">Register</Link>
        </p>
      </form>
    </div>
  );
}
