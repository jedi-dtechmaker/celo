import { CELO_ATTRIBUTION_TAG } from '@vorra/shared';

const actions = [
  { title: 'Find trusted suppliers', desc: 'Browse verified suppliers across Africa' },
  { title: 'Compare prices with AI', desc: 'Let AI find the best deals for you' },
  { title: 'Fund cUSD escrow', desc: 'Secure payments on Celo blockchain' },
  { title: 'Track tagged Celo volume', desc: 'Monitor your hackathon leaderboard rank' },
];

export function Home() {
  return (
    <section className="mx-auto flex min-h-[80vh] w-full max-w-6xl flex-col justify-center px-6 py-10">
      <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
        Celo Agentic Payments & DeFAI Hackathon
      </p>
      <div className="mt-4 max-w-3xl">
        <h1 className="text-5xl font-bold leading-tight text-slate-950">
          Vorra turns procurement into a trusted onchain workflow.
        </h1>
        <p className="mt-6 text-lg leading-8 text-slate-700">
          Buyers discover suppliers, ask AI for recommendations, and settle cross-border orders
          through cUSD escrow on Celo.
        </p>
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {actions.map((a) => (
          <div key={a.title} className="rounded-md border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-sm font-medium text-slate-800">{a.title}</p>
            <p className="mt-1 text-xs text-slate-500">{a.desc}</p>
          </div>
        ))}
      </div>
      <div className="mt-10 rounded-md border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-950">
        Hackathon attribution tag: <strong>{CELO_ATTRIBUTION_TAG}</strong>
      </div>
    </section>
  );
}
