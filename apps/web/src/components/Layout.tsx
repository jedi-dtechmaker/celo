import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Button } from '@vorra/ui';

export function Layout() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-stone-50 text-slate-950">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link to="/" className="text-xl font-bold text-emerald-700">
            Vorra
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link to="/marketplace" className="text-slate-600 hover:text-slate-900">
              Marketplace
            </Link>
            {token ? (
              <>
                <Link to="/dashboard" className="text-slate-600 hover:text-slate-900">
                  Dashboard
                </Link>
                <Button variant="ghost" onClick={handleLogout}>
                  Sign out
                </Button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-slate-600 hover:text-slate-900">
                  Sign in
                </Link>
                <Link to="/register">
                  <Button>Get started</Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="border-t border-slate-200 py-8 text-center text-sm text-slate-400">
        Vorra — AI Procurement on Celo
      </footer>
    </div>
  );
}
