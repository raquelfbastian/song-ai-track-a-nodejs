import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProduct } from '../api/client'
import { Product } from '../types/Product'

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) getProduct(id).then(setProduct).finally(() => setLoading(false))
  }, [id])

  if (loading) return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center">
      <div className="text-stone-400 text-center">
        <div className="text-3xl mb-2 animate-spin">☕</div>
        <p className="text-sm">GET /api/products/{id}</p>
      </div>
    </div>
  )

  if (!product) return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center">
      <div className="text-center">
        <p className="text-stone-600 mb-3">Product not found</p>
        <Link to="/" className="text-amber-600 text-sm">← Back to catalog</Link>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-stone-50">
      <nav className="bg-stone-900 px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-amber-500 text-sm font-medium">← Back</Link>
        <span className="text-white font-semibold">☕ Kape Ko</span>
        <span className="text-stone-500 text-xs">{product.id}</span>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-10">
        {/* Badge */}
        <span className="text-xs font-semibold bg-amber-50 text-amber-800 px-3 py-1 rounded-full">
          {product.roast} Roast
        </span>

        {/* Name + hook */}
        <h1 className="text-3xl font-light text-stone-900 mt-4 mb-2">{product.name}</h1>
        {product.marketing_hook && (
          <p className="text-lg italic text-amber-700 mb-6">"{product.marketing_hook}"</p>
        )}

        {/* Origin */}
        <div className="bg-white border border-stone-200 rounded-xl p-5 mb-6">
          <div className="grid grid-cols-2 gap-4 text-sm">
            {[
              ['Origin', product.origin],
              ['Farmer', product.farmer],
              ['Altitude', product.altitude],
              ['Variety', product.variety],
              ['Process', product.process],
            ].map(([l, v]) => (
              <div key={l}>
                <div className="text-xs text-stone-400 mb-0.5">{l}</div>
                <div className="font-medium text-stone-800">{v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Flavor */}
        <div className="flex flex-wrap gap-2 mb-6">
          {product.flavor_notes.map(f => (
            <span key={f} className="bg-amber-50 text-amber-800 text-sm px-3 py-1 rounded-full">
              {f}
            </span>
          ))}
        </div>

        {/* Description */}
        {product.product_description && (
          <div className="text-stone-700 text-sm leading-relaxed mb-8 whitespace-pre-line">
            {product.product_description}
          </div>
        )}

        {/* Feature bullets */}
        {product.feature_bullets && (
          <ul className="mb-8 space-y-2">
            {product.feature_bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-stone-700">
                <span className="text-amber-500 mt-0.5">▸</span>
                {b}
              </li>
            ))}
          </ul>
        )}

        {/* Pricing + CTA */}
        <div className="bg-white border border-stone-200 rounded-xl p-6">
          <div className="flex gap-8 mb-6">
            <div>
              <p className="text-xs text-stone-400 mb-1">One-time</p>
              <p className="text-2xl font-bold text-stone-900">₱{product.price_php}</p>
            </div>
            <div>
              <p className="text-xs text-stone-400 mb-1">Monthly subscription</p>
              <p className="text-2xl font-bold text-amber-600">₱{product.sub_price_php}</p>
              <p className="text-xs text-green-600 mt-0.5">
                Save ₱{product.price_php - product.sub_price_php}/mo
              </p>
            </div>
          </div>
          <button className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold
            py-3 rounded-xl transition-colors text-sm">
            Subscribe — ₱{product.sub_price_php}/mo via GCash
          </button>
        </div>

        {/* Pairing */}
        {product.pairing_suggestion && (
          <p className="text-center text-stone-400 text-sm italic mt-6">
            ☕ {product.pairing_suggestion}
          </p>
        )}
      </div>
    </div>
  )
}
