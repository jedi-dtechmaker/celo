import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Product {
  id: string;
  title: string;
  unit: string;
  unitPrice: number;
  currency: string;
  country: string | null;
  deliveryDays: number | null;
  seller: { id: string; fullName: string; trustScore: number | null };
  category: { name: string };
  images: { imageUrl: string }[];
}

export function Marketplace() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params = new URLSearchParams();
        if (search) params.set('search', search);
        const res = await fetch(
          `${import.meta.env.VITE_API_URL ?? 'http://localhost:3000'}/products?${params}`,
        );
        const data = await res.json();
        setProducts(data.products ?? []);
      } catch {
        // API not available yet
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [search]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-950">Marketplace</h1>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-64 rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
      </div>

      {loading ? (
        <p className="mt-10 text-center text-slate-500">Loading...</p>
      ) : products.length === 0 ? (
        <div className="mt-20 text-center">
          <p className="text-lg text-slate-500">No products yet</p>
          <p className="mt-2 text-sm text-slate-400">Sellers can list products after registering.</p>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <Link
              key={p.id}
              to={`/products/${p.id}`}
              className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md"
            >
              <div className="aspect-video rounded-md bg-slate-100" />
              <h3 className="mt-3 text-sm font-semibold text-slate-900">{p.title}</h3>
              <p className="mt-1 text-xs text-slate-500">{p.category.name}</p>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-lg font-bold text-emerald-700">
                  {p.unitPrice} {p.currency}/{p.unit}
                </span>
                {p.country && (
                  <span className="text-xs text-slate-400">{p.country}</span>
                )}
              </div>
              {p.seller && (
                <p className="mt-1 text-xs text-slate-400">
                  Seller: {p.seller.fullName}
                  {p.seller.trustScore != null && ` · Trust: ${p.seller.trustScore}`}
                </p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
