import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProducts } from './api/client'
import { Product } from './types/Product'

const ROAST_STYLE: Record<string, { bg: string; text: string }> = {
  Light:  { bg: 'bg-amber-50',  text: 'text-amber-800' },
  Medium: { bg: 'bg-orange-50', text: 'text-orange-900' },
  Dark:   { bg: 'bg-stone-100', text: 'text-stone-800' },
}

export default function App() {
  const [products, setProducts] = useState<Product[]>([])
  const [filter, setFilter] = useState<string>('All')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  const filtered = filter === 'All'
    ? products
    : products.filter(p => p.roast === filter)

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Nav */}
      <nav className="bg-stone-900 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <span className="text-xl font-semibold text-white tracking-wide">☕ Kape Ko</span>
        <div className="flex gap-2">
          {['All','Light','Medium','Dark'].map(r => (
            <button key={r} onClick={() => setFilter(r)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                filter === r
                  ? 'bg-amber-500 text-white'
                  : 'text-stone-400 hover:text-white'
              }`}>
              {r}
            </button>
          ))}
        </div>
        <div className="flex gap-3 text-sm text-stone-400">
          <Link to="/lab3" className="hover:text-amber-400 transition-colors">Lab 3</Link>
          <Link to="/lab4" className="hover:text-amber-400 transition-colors">Lab 4</Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="bg-stone-900 text-center py-14 px-6">
        <p className="text-amber-500 text-xs font-semibold tracking-widest uppercase mb-3">
          Single Origin · Farm to Cup · Subscription
        </p>
        <h1 className="text-4xl font-light text-white mb-3 leading-snug">
          Filipino Coffee,<br />Traced to the Farm
        </h1>
        <p className="text-stone-400 text-sm">
          Every bag tells you exactly which farm it came from.
        </p>
      </div>

      {/* Body */}
      <div className="max-w-4xl mx-auto px-6 py-10">
        {loading && (
          <div className="text-center py-20 text-stone-400">
            <div className="text-3xl mb-3 animate-spin">☕</div>
            <p className="text-sm">Loading catalog from Spring Boot API...</p>
            <p className="text-xs text-stone-500 mt-1">GET /api/products</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <p className="text-red-600 font-medium mb-1">Spring Boot not running</p>
            <p className="text-red-500 text-sm mb-3">{error}</p>
            <Link to="/lab3"
              className="inline-block bg-amber-500 text-white px-4 py-2 rounded-lg text-sm font-medium">
              Go to Lab 3 → Generate catalog first
            </Link>
          </div>
        )}

        {!loading && !error && (
          <>
            <p className="text-stone-400 text-sm mb-6">
              {filtered.length} products · AI-generated via Spring Boot + LLM API
            </p>
            <div className="grid grid-cols-2 gap-5">
              {filtered.map(p => {
                const rs = ROAST_STYLE[p.roast] || ROAST_STYLE.Medium
                return (
                  <Link key={p.id} to={`/products/${p.id}`}
                    className="bg-white border border-stone-200 rounded-xl overflow-hidden hover:border-amber-300 hover:shadow-md transition-all group">
                    <div className={`h-24 flex items-center justify-center text-4xl ${rs.bg}`}>
                      ☕
                    </div>
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${rs.bg} ${rs.text}`}>
                          {p.roast} Roast
                        </span>
                        <span className="text-xs text-stone-400">{p.id}</span>
                      </div>
                      <h3 className="font-semibold text-stone-900 mb-1 group-hover:text-amber-700 transition-colors">
                        {p.name}
                      </h3>
                      <p className="text-xs text-stone-500 mb-3">{p.origin}</p>
                      {p.marketing_hook && (
                        <p className="text-xs text-stone-600 italic mb-3 line-clamp-2">
                          "{p.marketing_hook}"
                        </p>
                      )}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {p.flavor_notes.slice(0,3).map(f => (
                          <span key={f} className="text-xs bg-amber-50 text-amber-800 px-2 py-0.5 rounded-full">
                            {f}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-bold text-stone-900">₱{p.sub_price_php}</span>
                          <span className="text-xs text-stone-400">/mo</span>
                        </div>
                        <span className="text-xs text-stone-400">
                          ₱{p.price_php} one-time
                        </span>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </>
        )}
      </div>

      {/* Footer badge */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-stone-900/90 backdrop-blur
        text-xs text-stone-400 px-4 py-2 rounded-full flex items-center gap-3 shadow-lg">
        <span className="text-green-400 font-semibold">● LIVE</span>
        <span>Spring Boot :8080</span>
        <span className="text-stone-600">→</span>
        <span>React :5173</span>
        <span className="text-stone-600">→</span>
        <span>LLM API</span>
      </div>
    </div>
  )
}
