import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Smartphone,
  Headphones,
  Wind,
  Calculator,
  Instagram,
  MessageCircle,
  ArrowRight,
  Play,
  Zap,
  ChevronRight,
  RefreshCw,
} from 'lucide-react'

// ─── Data ──────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  {
    id: 1,
    Icon: Smartphone,
    title: 'High-End Mobiles',
    subtitle: 'Apple · Samsung',
    desc: 'iPhone Pro series & Galaxy S Ultra — flagship specs, premium experience.',
    iconColor: '#fb923c',
    accentFrom: 'from-orange-50',
    accentTo: 'to-rose-50',
    border: 'border-orange-100',
    dot: 'bg-orange-400',
    shadow: 'hover:shadow-orange-100',
  },
  {
    id: 2,
    Icon: Headphones,
    title: 'Audio Gear',
    subtitle: 'Marshall · JBL',
    desc: 'Audiophile-grade headphones, earphones, and Bluetooth speakers.',
    iconColor: '#ec4899',
    accentFrom: 'from-pink-50',
    accentTo: 'to-rose-50',
    border: 'border-pink-100',
    dot: 'bg-pink-400',
    shadow: 'hover:shadow-pink-100',
  },
  {
    id: 3,
    Icon: Wind,
    title: 'Personal Tech',
    subtitle: 'Dyson',
    desc: 'Hair stylers, air purifiers, and cutting-edge grooming devices.',
    iconColor: '#f43f5e',
    accentFrom: 'from-rose-50',
    accentTo: 'to-orange-50',
    border: 'border-rose-100',
    dot: 'bg-rose-400',
    shadow: 'hover:shadow-rose-100',
  },
  {
    id: 4,
    Icon: Calculator,
    title: 'Business Tools',
    subtitle: 'Counting Machines & More',
    desc: 'Professional note counting machines for modern businesses.',
    iconColor: '#fb923c',
    accentFrom: 'from-amber-50',
    accentTo: 'to-orange-50',
    border: 'border-amber-100',
    dot: 'bg-amber-400',
    shadow: 'hover:shadow-amber-100',
  },
]

const REELS = [
  {
    id: 1,
    img: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=300&q=80',
    caption: 'iPhone 15 Pro Max',
  },
  {
    id: 2,
    img: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=300&q=80',
    caption: 'Marshall Headphones',
  },
  {
    id: 3,
    img: 'https://images.unsplash.com/photo-1592899677958-6928f01b0f58?auto=format&fit=crop&w=300&q=80',
    caption: 'Galaxy S24 Ultra',
  },
  {
    id: 4,
    img: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=300&q=80',
    caption: 'Dyson Airwrap',
  },
  {
    id: 5,
    img: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=300&q=80',
    caption: 'JBL Charge 5',
  },
]

const BRANDS = [
  { name: 'APPLE',    bg: '#000000', color: '#ffffff' },
  { name: 'SAMSUNG',  bg: '#1428A0', color: '#ffffff' },
  { name: 'GOOGLE',   bg: '#4285F4', color: '#ffffff' },
  { name: 'ONEPLUS',  bg: '#F50514', color: '#ffffff' },
  { name: 'MARSHALL', bg: '#1a1a1a', color: '#C8A951' },
  { name: 'DYSON',    bg: '#CC2B2B', color: '#ffffff' },
]

// ─── Animation Helpers ─────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

function InViewSection({ children, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── Ambient Background Orbs ───────────────────────────────────────────────────

function AmbientBg() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-white">
      <div className="absolute -top-[20%] -left-[15%] w-[70%] h-[70%] rounded-full bg-orange-200/50 mix-blend-multiply blur-[130px]" />
      <div className="absolute top-[20%] -right-[20%] w-[70%] h-[70%] rounded-full bg-pink-200/45 mix-blend-multiply blur-[150px]" />
      <div className="absolute bottom-0 left-[10%] w-[60%] h-[60%] rounded-full bg-rose-100/50 mix-blend-multiply blur-[120px]" />
    </div>
  )
}

// ─── Navbar ────────────────────────────────────────────────────────────────────

function Navbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-5"
    >
      <nav className="w-full max-w-5xl bg-white/55 backdrop-blur-2xl border border-white/70 shadow-[0_4px_30px_rgba(0,0,0,0.06)] rounded-full px-5 py-3 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="font-black text-sm sm:text-base tracking-tight text-gray-900 select-none">
          AG{' '}
          <span className="text-brand-gradient">COMMUNICATION</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          <a
            href="#products"
            className="px-4 py-2 rounded-full text-white font-bold text-xs bg-brand-gradient shadow-sm"
          >
            Products
          </a>
          <a
            href="#reels"
            className="px-4 py-2 rounded-full text-gray-600 hover:text-gray-900 hover:bg-black/5 font-semibold text-xs transition-all"
          >
            Latest Drops
          </a>
          <a
            href="#contact"
            className="px-4 py-2 rounded-full text-gray-600 hover:text-gray-900 hover:bg-black/5 font-semibold text-xs transition-all"
          >
            Contact Us
          </a>
        </div>

        {/* Mobile CTA */}
        <a
          href="#products"
          className="md:hidden px-4 py-1.5 rounded-full text-white font-bold text-xs bg-brand-gradient"
        >
          Shop
        </a>
      </nav>
    </motion.header>
  )
}

// ─── Hero ──────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-28 pb-16">
      {/* Pill badge */}
      <motion.div
        custom={0}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-md border border-white/80 rounded-full px-5 py-2 mb-7 shadow-sm"
      >
        <Zap size={11} className="text-orange-400" />
        <span className="text-[11px] font-black tracking-[0.18em] text-gray-500 uppercase">
          Premium Electronics Store
        </span>
        <Zap size={11} className="text-pink-400" />
      </motion.div>

      {/* Headline */}
      <motion.h1
        custom={1}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="font-black tracking-tight leading-[1.02] text-gray-900 mb-7"
        style={{ fontSize: 'clamp(3rem, 10vw, 7.5rem)' }}
      >
        UPGRADE.
        <br />
        <span className="text-brand-gradient">EXCHANGE.</span>
        <br />
        SAVE.
      </motion.h1>

      {/* Buy | Sell | Exchange badge */}
      <motion.div
        custom={2}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="flex items-center gap-3 mb-10"
      >
        <span
          className="w-2.5 h-2.5 rounded-full bg-orange-400"
          style={{ boxShadow: '0 0 10px rgba(251,146,60,0.8)' }}
        />
        <p className="text-sm sm:text-base md:text-lg font-black tracking-[0.22em] text-gray-800">
          BUY | SELL | EXCHANGE
        </p>
        <span
          className="w-2.5 h-2.5 rounded-full bg-pink-400"
          style={{ boxShadow: '0 0 10px rgba(236,72,153,0.8)' }}
        />
      </motion.div>

      {/* CTAs */}
      <motion.div
        custom={3}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="flex flex-col sm:flex-row gap-3"
      >
        <motion.a
          href="#products"
          whileHover={{ scale: 1.04, y: -3 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center justify-center gap-2 bg-brand-gradient text-white font-bold px-8 py-4 rounded-full text-sm"
          style={{ boxShadow: '0 10px 35px rgba(244,63,94,0.38)' }}
        >
          Explore Premium Models
          <ArrowRight size={16} />
        </motion.a>

        <motion.a
          href="https://wa.me/919876543210"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.04, y: -3 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center justify-center gap-2 bg-white/70 backdrop-blur-md border border-white/80 text-gray-800 font-bold px-8 py-4 rounded-full text-sm shadow-sm"
        >
          <MessageCircle size={16} className="text-green-500" />
          WhatsApp Us
        </motion.a>
      </motion.div>

      {/* Floating phone card */}
      <motion.div
        custom={4}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="mt-20 relative"
      >
        {/* Glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-56 h-56 rounded-full bg-gradient-to-br from-orange-300/35 to-pink-300/35 blur-3xl" />
        </div>

        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          className="relative bg-white/75 backdrop-blur-xl border border-white/80 rounded-[2.5rem] p-8 shadow-[0_24px_70px_rgba(0,0,0,0.09)]"
        >
          <Smartphone
            size={64}
            strokeWidth={1.4}
            style={{ color: '#f43f5e', filter: 'drop-shadow(0 4px 14px rgba(244,63,94,0.4))' }}
          />
        </motion.div>

        {/* Floating badges */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="absolute -left-4 sm:-left-12 top-4 bg-white/80 backdrop-blur-md border border-white/90 rounded-2xl px-3 py-2 shadow-md text-xs font-bold text-gray-700 flex items-center gap-1.5"
        >
          <span className="w-2 h-2 rounded-full bg-green-400" />
          In Stock Now
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.4, duration: 0.5 }}
          className="absolute -right-4 sm:-right-12 bottom-4 bg-white/80 backdrop-blur-md border border-white/90 rounded-2xl px-3 py-2 shadow-md text-xs font-bold flex items-center gap-1.5"
        >
          <RefreshCw size={11} style={{ color: '#f43f5e' }} />
          <span className="text-brand-gradient">Exchange Ready</span>
        </motion.div>
      </motion.div>
    </section>
  )
}

// ─── Category Card ─────────────────────────────────────────────────────────────

function CategoryCard({ cat, index }) {
  const { Icon, title, subtitle, desc, iconColor, accentFrom, accentTo, border, dot, shadow } = cat
  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      variants={fadeUp}
      whileHover={{ y: -7, transition: { duration: 0.22 } }}
      className={`relative bg-gradient-to-br ${accentFrom} ${accentTo} backdrop-blur-lg border ${border} rounded-3xl p-6 shadow-sm ${shadow} hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden`}
    >
      {/* Background glow blob */}
      <div
        className="absolute -top-6 -right-6 w-20 h-20 rounded-full blur-2xl opacity-40 group-hover:opacity-70 group-hover:scale-150 transition-all duration-500"
        style={{ background: iconColor }}
      />

      {/* Icon container */}
      <div className="relative mb-5 w-11 h-11 rounded-2xl bg-white/90 shadow-sm flex items-center justify-center">
        <Icon size={22} strokeWidth={1.8} style={{ color: iconColor }} />
      </div>

      {/* Dot accent */}
      <span className={`inline-block w-1.5 h-1.5 rounded-full ${dot} mb-2.5`} />

      <h3 className="font-bold text-gray-900 text-[15px] mb-0.5">{title}</h3>
      <p className="text-[11px] font-semibold text-gray-400 mb-2.5 tracking-wide">{subtitle}</p>
      <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>

      {/* Link */}
      <div
        className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-brand-gradient"
        style={{ color: iconColor }}
      >
        View All <ChevronRight size={12} />
      </div>
    </motion.div>
  )
}

// ─── Reel Card ─────────────────────────────────────────────────────────────────

function ReelCard({ reel, index }) {
  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      whileHover={{ scale: 1.04, transition: { duration: 0.2 } }}
      className="relative flex-shrink-0 min-w-[130px] h-[232px] rounded-2xl overflow-hidden snap-center border border-white/10 cursor-pointer group"
    >
      <img
        src={reel.img}
        alt={reel.caption}
        className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

      {/* Instagram badge */}
      <div className="absolute top-2.5 left-2.5 bg-black/50 backdrop-blur-sm rounded-lg p-1.5">
        <Instagram size={11} className="text-white" />
      </div>

      {/* Play button (shown on hover) */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="w-10 h-10 rounded-full bg-white/25 backdrop-blur-sm flex items-center justify-center border border-white/40">
          <Play size={14} className="text-white fill-white ml-0.5" />
        </div>
      </div>

      {/* Caption */}
      <p className="absolute bottom-2.5 left-2.5 right-2.5 text-[10px] font-semibold text-white/90 truncate">
        {reel.caption}
      </p>
    </motion.div>
  )
}

// ─── Categories + Reels Section ────────────────────────────────────────────────

function CategoriesAndReels() {
  return (
    <section
      id="products"
      className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20 relative z-10"
    >
      {/* ── Left: Categories ── */}
      <div>
        <InViewSection>
          <div className="flex items-center gap-3 mb-7">
            <h2 className="text-base font-black text-gray-900 uppercase tracking-widest">
              Premium Categories
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-orange-200 via-rose-200 to-transparent" />
          </div>
        </InViewSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {CATEGORIES.map((cat, i) => (
            <CategoryCard key={cat.id} cat={cat} index={i} />
          ))}
        </div>
      </div>

      {/* ── Right: Reels ── */}
      <div id="reels">
        <InViewSection>
          <div className="flex items-center gap-2.5 mb-7">
            <Instagram size={17} className="text-pink-500 flex-shrink-0" />
            <h2 className="text-base font-black text-gray-900 tracking-tight">
              Latest from{' '}
              <span className="text-brand-gradient">@agcommunication.in</span>
            </h2>
          </div>
        </InViewSection>

        <InViewSection>
          <div className="bg-gray-950 rounded-[2rem] p-5 shadow-2xl relative overflow-hidden">
            {/* Top glow line */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[2px] rounded-full bg-gradient-to-r from-orange-400 to-pink-500 opacity-60"
            />

            {/* Horizontal scroll container */}
            <div className="flex gap-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2">
              {REELS.map((reel, i) => (
                <ReelCard key={reel.id} reel={reel} index={i} />
              ))}
            </div>

            {/* Watch Reels CTA */}
            <div className="flex justify-center mt-5">
              <motion.a
                href="https://www.instagram.com/agcommunication.in/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 bg-brand-gradient text-white text-[13px] font-bold px-7 py-2.5 rounded-full"
                style={{ boxShadow: '0 4px 20px rgba(244,63,94,0.4)' }}
              >
                <Instagram size={14} />
                Watch Reels
              </motion.a>
            </div>
          </div>
        </InViewSection>
      </div>
    </section>
  )
}

// ─── Brands Banner ─────────────────────────────────────────────────────────────

function BrandsBanner() {
  return (
    <InViewSection>
      <section className="max-w-6xl mx-auto px-4 mb-20 relative z-10">
        <div className="bg-white/70 backdrop-blur-xl border border-white/80 rounded-2xl p-6 shadow-sm">
          <p className="text-center text-[10px] font-black tracking-[0.22em] text-gray-400 uppercase mb-5">
            Top Brands We Carry
          </p>
          <div className="flex flex-wrap justify-center items-center gap-3">
            {BRANDS.map((brand, i) => (
              <motion.div
                key={brand.name}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                whileHover={{ scale: 1.07, y: -3, transition: { duration: 0.18 } }}
                className="px-6 py-2.5 rounded-xl font-black text-sm tracking-wider cursor-pointer shadow-sm hover:shadow-md transition-shadow"
                style={{ background: brand.bg, color: brand.color }}
              >
                {brand.name}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </InViewSection>
  )
}

// ─── Footer / Contact CTA ──────────────────────────────────────────────────────

function Footer() {
  return (
    <footer id="contact" className="relative z-10 px-4 pb-10">
      <div className="max-w-6xl mx-auto">
        <InViewSection>
          <div className="bg-white/65 backdrop-blur-xl border border-white/75 rounded-3xl p-8 sm:p-10 shadow-sm mb-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3">
              Ready to{' '}
              <span className="text-brand-gradient">Upgrade?</span>
            </h2>
            <p className="text-gray-500 text-sm max-w-md mx-auto mb-7">
              Visit us in-store or reach out via WhatsApp for the fastest response.
              Trade in your old device and save big.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <motion.a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-white font-bold px-7 py-3.5 rounded-full text-sm transition-colors"
                style={{ boxShadow: '0 6px 24px rgba(34,197,94,0.38)' }}
              >
                <MessageCircle size={16} />
                Chat on WhatsApp
              </motion.a>

              <motion.a
                href="https://www.instagram.com/agcommunication.in/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-2 bg-white border border-gray-100 text-gray-800 font-bold px-7 py-3.5 rounded-full text-sm shadow-sm hover:shadow-md transition-shadow"
              >
                <Instagram size={16} className="text-pink-500" />
                Follow on Instagram
              </motion.a>
            </div>
          </div>
        </InViewSection>

        <p className="text-center text-gray-400 text-xs font-medium">
          &copy; {new Date().getFullYear()} AG Communication. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

// ─── WhatsApp FAB ──────────────────────────────────────────────────────────────

function WhatsAppFAB() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2.2, duration: 0.4 }}
        className="hidden sm:block bg-brand-gradient text-white text-xs font-black px-4 py-2.5 rounded-full shadow-lg select-none"
      >
        Fast Inquiries! 💬
      </motion.div>

      {/* WhatsApp button */}
      <motion.a
        href="https://wa.me/919876543210"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.8, type: 'spring', stiffness: 220, damping: 15 }}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-400 text-white flex items-center justify-center transition-colors"
        style={{ boxShadow: '0 4px 22px rgba(34,197,94,0.55)' }}
        aria-label="Chat on WhatsApp"
      >
        {/* WhatsApp SVG icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          fill="white"
          width="26"
          height="26"
        >
          <path d="M16 2C8.268 2 2 8.268 2 16c0 2.47.677 4.782 1.853 6.77L2 30l7.43-1.82A13.93 13.93 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5a11.45 11.45 0 0 1-5.837-1.602l-.418-.249-4.41 1.082 1.12-4.3-.273-.442A11.5 11.5 0 1 1 16 27.5zm6.317-8.563c-.346-.173-2.047-1.01-2.365-1.125-.317-.115-.548-.173-.779.173-.23.346-.892 1.125-1.093 1.356-.2.23-.4.26-.748.086-.346-.173-1.46-.538-2.783-1.72-1.028-.918-1.722-2.05-1.924-2.397-.2-.346-.02-.533.153-.705.157-.155.346-.404.52-.606.173-.202.23-.346.346-.577.115-.23.058-.433-.029-.606-.086-.173-.779-1.877-1.067-2.57-.282-.673-.568-.582-.779-.593l-.663-.011c-.23 0-.606.086-.923.433-.317.346-1.21 1.183-1.21 2.886s1.239 3.346 1.41 3.577c.173.23 2.44 3.724 5.913 5.221.826.356 1.47.569 1.974.728.829.263 1.584.226 2.18.137.665-.099 2.047-.836 2.336-1.644.288-.808.288-1.5.2-1.644-.086-.144-.317-.23-.663-.404z" />
        </svg>
      </motion.a>
    </div>
  )
}

// ─── App Root ──────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden selection:bg-pink-100 selection:text-pink-900">
      <AmbientBg />
      <Navbar />
      <main>
        <Hero />
        <CategoriesAndReels />
        <BrandsBanner />
        <Footer />
      </main>
      <WhatsAppFAB />
    </div>
  )
}
