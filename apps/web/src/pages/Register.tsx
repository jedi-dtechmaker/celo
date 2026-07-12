import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@vorra/ui';

export function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    role: 'BUYER',
    country: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL ?? 'http://localhost:3000'}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message ?? 'Registration failed');
      }
      const data = await res.json();
      localStorage.setItem('token', data.token);
      navigate('/marketplace');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <div className="mx-auto mt-20 max-w-md px-6">
      <h1 className="text-2xl font-bold text-slate-950">Create your account</h1>
      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        {error && <p className="text-sm text-red-600">{error}</p>}
        <div>
          <label className="block text-sm font-medium text-slate-700">Full Name</label>
          <input type="text" value={form.fullName} onChange={update('fullName')}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Email</label>
          <input type="email" value={form.email} onChange={update('email')}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Password</label>
          <input type="password" value={form.password} onChange={update('password')}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" required minLength={8} />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Country</label>
          <input type="text" value={form.country} onChange={update('country')}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">I am a</label>
          <select value={form.role} onChange={update('role')}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm">
            <option value="BUYER">Buyer</option>
            <option value="SELLER">Seller</option>
          </select>
        </div>
        <Button type="submit" className="w-full">Create account</Button>
        <p className="text-center text-sm text-slate-500">
          Already have an account?{' '}
          <Link to="/login" className="text-emerald-700 hover:underline">Sign in</Link>
        </p>
      </form>
    </div>
  );
}
