import { useState, useMemo, useRef } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  Search,
  X,
  MessageCircle,
  ChevronDown,
  SlidersHorizontal,
  Zap,
} from 'lucide-react'
import { products, BRAND_META, CATEGORIES } from '../data/products'
import { brand, social, waLink } from '../config'
import { AGLogo } from '../components/AGLogo'

// ─── Helpers ───────────────────────────────────────────────────────────────────

function formatPrice(n) {
  return '₹' + n.toLocaleString('en-IN')
}

// Fallback placeholder when image fails to load
function ProductImage({ src, alt, brandId }) {
  const [failed, setFailed] = useState(false)
  const meta = BRAND_META[brandId]

  if (failed) {
    return (
      <div
        className="w-full h-full flex flex-col items-center justify-center gap-2 rounded-2xl"
        style={{ background: `linear-gradient(135deg, ${meta.bg}22, ${meta.bg}44)` }}
      >
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-xs font-black"
          style={{ background: meta.bg, color: meta.text }}
        >
          {meta.label[0]}
        </div>
        <span className="text-[10px] font-semibold text-gray-400 text-center px-2">{alt}</span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
    />
  )
}

// ─── Product Card ──────────────────────────────────────────────────────────────

function ProductCard({ product, index }) {
  const meta = BRAND_META[product.brandId]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.04, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="group relative bg-white/70 backdrop-blur-xl border border-white/80 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
    >
      {/* Badge */}
      {product.badge && (
        <div
          className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full text-[10px] font-black tracking-wide"
          style={{ background: meta.bg, color: meta.text }}
        >
          {product.badge}
        </div>
      )}

      {/* Image area */}
      <div className="relative h-52 flex items-center justify-center p-6 bg-gradient-to-br from-gray-50/80 to-white/60">
        {/* Ambient glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-500 blur-2xl"
          style={{ background: `radial-gradient(circle, ${meta.bg}, transparent)` }}
        />
        <ProductImage src={product.image} alt={product.name} brandId={product.brandId} />
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 p-4 pt-3 gap-2">
        {/* Brand chip */}
        <span
          className="self-start px-2 py-0.5 rounded-full text-[10px] font-black tracking-wider"
          style={{ background: `${meta.bg}18`, color: meta.bg === '#000000' ? '#374151' : meta.bg }}
        >
          {meta.label}
        </span>

        {/* Name + tagline */}
        <div>
          <h3 className="font-black text-gray-900 text-sm leading-tight">{product.name}</h3>
          <p className="text-[11px] text-gray-400 mt-0.5 truncate">{product.keySpec}</p>
        </div>

        {/* Specs preview */}
        <div className="flex-1" />

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-base font-black text-gray-900">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-xs text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
          )}
        </div>

        {/* Colors */}
        {product.colors?.length > 0 && (
          <p className="text-[10px] text-gray-400 truncate">
            {product.colors.slice(0, 3).join(' · ')}{product.colors.length > 3 ? ` +${product.colors.length - 3}` : ''}
          </p>
        )}

        {/* CTA */}
        <motion.a
          href={waLink(product.name)}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="mt-1 flex items-center justify-center gap-1.5 bg-green-500 hover:bg-green-400 text-white text-xs font-bold py-2.5 rounded-2xl transition-colors"
          style={{ boxShadow: '0 4px 14px rgba(34,197,94,0.3)' }}
        >
          <MessageCircle size={13} />
          Get Quote
        </motion.a>
      </div>
    </motion.div>
  )
}

// ─── Products Page ─────────────────────────────────────────────────────────────

export default function ProductsPage() {
  const [searchParams] = useSearchParams()
  const [activeBrand, setActiveBrand] = useState(searchParams.get('brand') || 'all')
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'All')
  const [search, setSearch] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const searchRef = useRef(null)

  const filtered = useMemo(() => {
    return products.filter(p => {
      const matchBrand = activeBrand === 'all' || p.brandId === activeBrand
      const matchCategory = activeCategory === 'All' || p.category === activeCategory
      const q = search.toLowerCase()
      const matchSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        BRAND_META[p.brandId].label.toLowerCase().includes(q) ||
        p.keySpec?.toLowerCase().includes(q)
      return matchBrand && matchCategory && matchSearch
    })
  }, [activeBrand, activeCategory, search])

  const brandTabs = [
    { id: 'all', label: 'All Brands', bg: '#6366f1', text: '#fff' },
    ...Object.entries(BRAND_META).map(([id, m]) => ({ id, label: m.label, bg: m.bg, text: m.text })),
  ]

  return (
    <div className="relative min-h-screen overflow-x-hidden selection:bg-pink-100 selection:text-pink-900">
      {/* Ambient BG */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-white">
        <div className="absolute -top-[20%] -left-[15%] w-[70%] h-[70%] rounded-full bg-orange-200/40 mix-blend-multiply blur-[130px]" />
        <div className="absolute top-[20%] -right-[20%] w-[70%] h-[70%] rounded-full bg-pink-200/35 mix-blend-multiply blur-[150px]" />
        <div className="absolute bottom-0 left-[10%] w-[60%] h-[60%] rounded-full bg-rose-100/40 mix-blend-multiply blur-[120px]" />
      </div>

      {/* ── Sticky Header ── */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-2xl border-b border-white/60 shadow-sm">
        {/* Top bar: logo + back + search */}
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-1.5 text-gray-500 hover:text-gray-900 transition-colors flex-shrink-0"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline text-xs font-semibold">Home</span>
          </Link>

          <Link to="/" className="flex items-center gap-2 select-none flex-shrink-0">
            <AGLogo size={30} />
            <span className="font-black text-sm tracking-tight text-gray-900">
              {brand.name.split(' ')[0]}{' '}
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(to right, #fb923c, #f43f5e, #ec4899)' }}
              >
                {brand.name.split(' ').slice(1).join(' ')}
              </span>
            </span>
          </Link>

          {/* Search bar */}
          <div className="flex-1 relative max-w-md ml-auto">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
            <input
              ref={searchRef}
              type="text"
              placeholder="Search products…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-gray-100/80 border border-gray-200/60 rounded-full pl-8 pr-8 py-2 text-xs text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-orange-300/50 focus:border-orange-300 transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
              >
                <X size={13} />
              </button>
            )}
          </div>

          {/* Filter toggle (mobile) */}
          <button
            onClick={() => setShowFilters(f => !f)}
            className={`sm:hidden flex items-center gap-1 px-3 py-2 rounded-full text-xs font-semibold border transition-all ${
              showFilters
                ? 'bg-orange-500 text-white border-orange-500'
                : 'bg-white text-gray-600 border-gray-200'
            }`}
          >
            <SlidersHorizontal size={13} />
          </button>
        </div>

        {/* Brand tabs */}
        <div className="max-w-7xl mx-auto px-4 pb-3">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-0.5">
            {brandTabs.map(tab => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveBrand(tab.id)}
                whileTap={{ scale: 0.95 }}
                className="flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-black tracking-wide transition-all duration-200 border"
                style={
                  activeBrand === tab.id
                    ? { background: tab.bg, color: tab.text, borderColor: tab.bg, boxShadow: `0 4px 14px ${tab.bg}55` }
                    : { background: 'transparent', color: '#6b7280', borderColor: '#e5e7eb' }
                }
              >
                {tab.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Category filter (collapsible on mobile, always visible on sm+) */}
        <AnimatePresence>
          {(showFilters || true) && (
            <motion.div
              key="cats"
              initial={false}
              className="max-w-7xl mx-auto px-4 pb-3 hidden sm:block"
            >
              <div className="flex gap-1.5 flex-wrap">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all border ${
                      activeCategory === cat
                        ? 'bg-gray-900 text-white border-gray-900'
                        : 'bg-white/60 text-gray-500 border-gray-200 hover:border-gray-400 hover:text-gray-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile category accordion */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              key="cats-mobile"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="sm:hidden overflow-hidden"
            >
              <div className="max-w-7xl mx-auto px-4 pb-3">
                <div className="flex gap-1.5 flex-wrap">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat}
                      onClick={() => { setActiveCategory(cat); setShowFilters(false) }}
                      className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all border ${
                        activeCategory === cat
                          ? 'bg-gray-900 text-white border-gray-900'
                          : 'bg-white/60 text-gray-500 border-gray-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Main Content ── */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Page heading + count */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-black text-2xl sm:text-3xl text-gray-900">
              {activeBrand === 'all' ? 'All Products' : `${BRAND_META[activeBrand]?.label} Products`}
              {activeCategory !== 'All' && (
                <span className="text-gray-400"> · {activeCategory}</span>
              )}
            </h1>
            <p className="text-xs text-gray-400 mt-1 flex items-center gap-1.5">
              <Zap size={11} className="text-orange-400" />
              {filtered.length} product{filtered.length !== 1 ? 's' : ''} found
              {search && <span> for "{search}"</span>}
            </p>
          </div>

          {/* Active filters clear */}
          {(activeBrand !== 'all' || activeCategory !== 'All' || search) && (
            <button
              onClick={() => { setActiveBrand('all'); setActiveCategory('All'); setSearch('') }}
              className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-600 font-semibold transition-colors"
            >
              <X size={13} />
              Clear filters
            </button>
          )}
        </div>

        {/* Product Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-4xl mb-4">🔍</div>
            <p className="text-gray-400 font-semibold">No products match your search.</p>
            <button
              onClick={() => { setActiveBrand('all'); setActiveCategory('All'); setSearch('') }}
              className="mt-4 text-sm text-orange-500 hover:underline font-semibold"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Footer CTA */}
        <div className="mt-16 text-center py-10 border-t border-gray-100">
          <p className="text-sm text-gray-500 mb-4">
            Can't find what you're looking for? We carry many more models in store.
          </p>
          <motion.a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white font-bold px-8 py-3.5 rounded-full text-sm transition-colors"
            style={{ boxShadow: '0 6px 24px rgba(34,197,94,0.38)' }}
          >
            <MessageCircle size={16} />
            Ask on WhatsApp
          </motion.a>
          <p className="mt-6 text-xs text-gray-400">
            &copy; {new Date().getFullYear()} {brand.nameDisplay} — {brand.tagline}
          </p>
        </div>
      </main>
    </div>
  )
}
