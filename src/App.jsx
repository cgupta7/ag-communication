import { useRef, useState, useEffect, useCallback } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { brand, social, location, waLink } from './config'
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  useSpring,
  useScroll,
} from 'framer-motion'
import {
  Smartphone,
  Headphones,
  Wind,
  Calculator,
  Instagram,
  MessageCircle,
  MapPin,
  ArrowRight,
  Play,
  Zap,
  ChevronRight,
  RefreshCw,
} from 'lucide-react'
import { siApple, siSamsung, siGoogle, siOneplus } from 'simple-icons'
import ProductsPage from './pages/ProductsPage'

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
    filterLink: '/products?category=Smartphones',
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
    filterLink: '/products?brand=marshall',
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
    filterLink: '/products?brand=dyson',
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
    filterLink: '/products',
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

const MARQUEE_ITEMS = [
  'Apple', 'Samsung', 'Google', 'OnePlus', 'Marshall', 'Dyson',
  'JBL', 'iPhone 16 Pro', 'Galaxy S25', 'Pixel 9',
]

// ─── Brand Logo Components ─────────────────────────────────────────────────────

function SiLogo({ si, color, size = 28 }) {
  return (
    <svg role="img" viewBox="0 0 24 24" width={size} height={size} fill={color} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d={si.path} />
    </svg>
  )
}

function MarshallLogo({ color = '#C8A951', size = 28 }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} fill={color} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M8 82V18h14l18 34 18-34h14v64H60V42L46 68h-8L24 42v40H8z" />
    </svg>
  )
}

function DysonLogo({ color = '#ffffff', size = 28 }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="50" cy="50" r="38" stroke={color} strokeWidth="9" />
      <circle cx="50" cy="50" r="18" stroke={color} strokeWidth="7" />
      <circle cx="50" cy="50" r="5" fill={color} />
    </svg>
  )
}

const BRANDS = [
  {
    key: 'apple',
    label: 'Apple',
    bg: '#000000',
    color: '#ffffff',
    logo: <SiLogo si={siApple} color="#ffffff" size={26} />,
  },
  {
    key: 'samsung',
    label: 'Samsung',
    bg: '#1428A0',
    color: '#ffffff',
    logo: <SiLogo si={siSamsung} color="#ffffff" size={26} />,
  },
  {
    key: 'google',
    label: 'Google',
    bg: '#ffffff',
    color: '#5f6368',
    border: '1.5px solid #e5e7eb',
    logo: <SiLogo si={siGoogle} color="#4285F4" size={26} />,
  },
  {
    key: 'oneplus',
    label: 'OnePlus',
    bg: '#F50514',
    color: '#ffffff',
    logo: <SiLogo si={siOneplus} color="#ffffff" size={26} />,
  },
  {
    key: 'marshall',
    label: 'Marshall',
    bg: '#1a1a1a',
    color: '#C8A951',
    logo: <MarshallLogo color="#C8A951" size={26} />,
  },
  {
    key: 'dyson',
    label: 'Dyson',
    bg: '#CC2B2B',
    color: '#ffffff',
    logo: <DysonLogo color="#ffffff" size={24} />,
  },
]

// ─── Animation Variants ────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
}

// ─── InView Section Helper ─────────────────────────────────────────────────────

function InViewSection({ children, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── Animated Counter ──────────────────────────────────────────────────────────

function AnimatedCounter({ value, suffix = '', label, decimals = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    let raf
    const start = Date.now()
    const duration = 1600
    const tick = () => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = eased * value
      setDisplay(decimals > 0 ? parseFloat(current.toFixed(decimals)) : Math.round(current))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value, decimals])

  return (
    <div ref={ref} className="text-center px-3 sm:px-5">
      <div className="text-xl sm:text-2xl font-black text-brand-gradient tabular-nums">
        {display}{suffix}
      </div>
      <div className="text-[10px] sm:text-[11px] text-gray-400 font-bold mt-0.5 tracking-wide uppercase">
        {label}
      </div>
    </div>
  )
}

// ─── Scroll Progress Bar ───────────────────────────────────────────────────────

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] z-[100] origin-left"
      style={{ scaleX: scrollYProgress, background: 'linear-gradient(to right, #fb923c, #f43f5e, #ec4899)' }}
    />
  )
}

// ─── Ambient Background ────────────────────────────────────────────────────────

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
      initial={{ opacity: 0, y: -32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-5"
    >
      <nav className="w-full max-w-5xl bg-white/55 backdrop-blur-2xl border border-white/70 shadow-[0_4px_30px_rgba(0,0,0,0.06)] rounded-full px-5 py-3 flex items-center justify-between">
        <a href="#" className="font-black text-sm sm:text-base tracking-tight text-gray-900 select-none">
          {brand.name.split(' ')[0]} <span className="text-brand-gradient">{brand.name.split(' ').slice(1).join(' ')}</span>
        </a>
        <div className="hidden md:flex items-center gap-1">
          <Link to="/products" className="px-4 py-2 rounded-full text-white font-bold text-xs bg-brand-gradient shadow-sm">Products</Link>
          <a href="#reels" className="px-4 py-2 rounded-full text-gray-600 hover:text-gray-900 hover:bg-black/5 font-semibold text-xs transition-all">Latest Drops</a>
          <a href="#contact" className="px-4 py-2 rounded-full text-gray-600 hover:text-gray-900 hover:bg-black/5 font-semibold text-xs transition-all">Contact Us</a>
        </div>
        <Link to="/products" className="md:hidden px-4 py-1.5 rounded-full text-white font-bold text-xs bg-brand-gradient">Shop</Link>
      </nav>
    </motion.header>
  )
}

// ─── Hero ──────────────────────────────────────────────────────────────────────

const HEADLINE_WORDS = [
  { text: 'UPGRADE.', gradient: false },
  { text: 'EXCHANGE.', gradient: true },
  { text: 'SAVE.', gradient: false },
]

function Hero() {
  // Mouse-tracking parallax for the 3D phone card
  const phoneRef = useRef(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-160, 160], [14, -14]), { stiffness: 280, damping: 32 })
  const rotateY = useSpring(useTransform(mouseX, [-160, 160], [-14, 14]), { stiffness: 280, damping: 32 })

  const handlePhoneMouseMove = useCallback((e) => {
    const rect = phoneRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set(e.clientX - rect.left - rect.width / 2)
    mouseY.set(e.clientY - rect.top - rect.height / 2)
  }, [mouseX, mouseY])

  const handlePhoneMouseLeave = useCallback(() => {
    mouseX.set(0)
    mouseY.set(0)
  }, [mouseX, mouseY])

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-28 pb-16">

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-md border border-white/80 rounded-full px-5 py-2 mb-8 shadow-sm"
      >
        <motion.span animate={{ rotate: [0, 15, -10, 15, 0] }} transition={{ delay: 1.5, duration: 0.6 }}>
          <Zap size={11} className="text-orange-400" />
        </motion.span>
        <span className="text-[11px] font-black tracking-[0.18em] text-gray-500 uppercase">Premium Electronics Store</span>
        <motion.span animate={{ rotate: [0, -15, 10, -15, 0] }} transition={{ delay: 1.7, duration: 0.6 }}>
          <Zap size={11} className="text-pink-400" />
        </motion.span>
      </motion.div>

      {/* Headline — word by word slide-up */}
      <div className="font-black tracking-tight leading-[1.0] mb-8" style={{ fontSize: 'clamp(3rem, 10vw, 7.5rem)' }}>
        {HEADLINE_WORDS.map((word, i) => (
          <div key={word.text} className="overflow-hidden">
            <motion.div
              initial={{ y: '110%', skewY: 6 }}
              animate={{ y: '0%', skewY: 0 }}
              transition={{ delay: 0.2 + i * 0.18, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            >
              {word.gradient
                ? <span className="text-brand-gradient">{word.text}</span>
                : <span className="text-gray-900">{word.text}</span>
              }
            </motion.div>
          </div>
        ))}
      </div>

      {/* BUY | SELL | EXCHANGE */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.75, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center gap-3 mb-10"
      >
        <motion.span
          animate={{ scale: [1, 1.4, 1] }}
          transition={{ delay: 1.4, duration: 0.4, repeat: Infinity, repeatDelay: 3 }}
          className="w-2.5 h-2.5 rounded-full bg-orange-400 block"
          style={{ boxShadow: '0 0 10px rgba(251,146,60,0.9)' }}
        />
        <p className="text-sm sm:text-base md:text-lg font-black tracking-[0.22em] text-gray-800">
          BUY | SELL | EXCHANGE
        </p>
        <motion.span
          animate={{ scale: [1, 1.4, 1] }}
          transition={{ delay: 1.7, duration: 0.4, repeat: Infinity, repeatDelay: 3 }}
          className="w-2.5 h-2.5 rounded-full bg-pink-400 block"
          style={{ boxShadow: '0 0 10px rgba(236,72,153,0.9)' }}
        />
      </motion.div>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col sm:flex-row gap-3"
      >
        <motion.a
          href="/products"
          whileHover={{ scale: 1.05, y: -3 }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          className="inline-flex items-center justify-center gap-2 bg-brand-gradient text-white font-bold px-8 py-4 rounded-full text-sm"
          style={{ boxShadow: '0 10px 35px rgba(244,63,94,0.38)' }}
        >
          Explore Premium Models
          <motion.span animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}>
            <ArrowRight size={16} />
          </motion.span>
        </motion.a>

        <motion.a
          href={waLink()}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05, y: -3 }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          className="inline-flex items-center justify-center gap-2 bg-white/70 backdrop-blur-md border border-white/80 text-gray-800 font-bold px-8 py-4 rounded-full text-sm shadow-sm"
        >
          <MessageCircle size={16} className="text-green-500" /> WhatsApp Us
        </motion.a>
      </motion.div>

      {/* Animated Stats Row */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.55 }}
        className="mt-10 flex items-center bg-white/60 backdrop-blur-md border border-white/70 rounded-2xl px-4 py-3 shadow-sm divide-x divide-gray-100"
      >
        <AnimatedCounter value={500} suffix="+" label="Products" />
        <AnimatedCounter value={4.9} suffix="★" label="Rating" decimals={1} />
        <AnimatedCounter value={30} suffix="min" label="Exchange" />
        <AnimatedCounter value={5} suffix="yr" label="Trusted" />
      </motion.div>

      {/* 3D Phone Card — mouse parallax */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        ref={phoneRef}
        onMouseMove={handlePhoneMouseMove}
        onMouseLeave={handlePhoneMouseLeave}
        className="mt-16 relative cursor-pointer select-none"
      >
        {/* pulsing glow */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.55, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="w-64 h-64 rounded-full bg-gradient-to-br from-orange-300/40 to-pink-300/40 blur-3xl" />
        </motion.div>

        {/* phone card — floats AND follows mouse in 3D */}
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          style={{ rotateX, rotateY, transformPerspective: 900 }}
          className="relative bg-white/75 backdrop-blur-xl border border-white/80 rounded-[2.5rem] p-8 shadow-[0_24px_70px_rgba(0,0,0,0.1)]"
        >
          <Smartphone size={64} strokeWidth={1.4} style={{ color: '#f43f5e', filter: 'drop-shadow(0 4px 16px rgba(244,63,94,0.45))' }} />
        </motion.div>

        {/* floating badge — left */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.5, duration: 0.5, type: 'spring', stiffness: 200 }}
          className="absolute -left-4 sm:-left-14 top-4 bg-white/85 backdrop-blur-md border border-white/90 rounded-2xl px-3 py-2 shadow-md text-xs font-bold text-gray-700 flex items-center gap-1.5"
        >
          <span className="w-2 h-2 rounded-full bg-green-400" /> In Stock Now
        </motion.div>

        {/* floating badge — right */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.7, duration: 0.5, type: 'spring', stiffness: 200 }}
          className="absolute -right-4 sm:-right-14 bottom-4 bg-white/85 backdrop-blur-md border border-white/90 rounded-2xl px-3 py-2 shadow-md text-xs font-bold flex items-center gap-1.5"
        >
          <RefreshCw size={11} style={{ color: '#f43f5e' }} />
          <span className="text-brand-gradient">Exchange Ready</span>
        </motion.div>
      </motion.div>
    </section>
  )
}

// ─── Category Card — 3D Tilt ───────────────────────────────────────────────────

function CategoryCard({ cat, index }) {
  const { Icon, title, subtitle, desc, iconColor, accentFrom, accentTo, border, dot, filterLink } = cat

  return (
    <Link to={filterLink}>
      <motion.div
        custom={index}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        variants={fadeUp}
        whileHover={{ scale: 1.03, y: -5, transition: { type: 'spring', stiffness: 400, damping: 22 } }}
        className={`relative bg-gradient-to-br ${accentFrom} ${accentTo} backdrop-blur-lg border ${border} rounded-3xl p-6 shadow-sm hover:shadow-xl transition-shadow duration-300 cursor-pointer group overflow-hidden will-change-transform`}
      >
        {/* animated bg glow blob */}
        <motion.div
          className="absolute -top-6 -right-6 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-400"
          style={{ background: iconColor }}
          transition={{ duration: 0.4 }}
        />

        {/* icon — bounces on card hover */}
        <motion.div
          className="relative mb-5 w-11 h-11 rounded-2xl bg-white/90 shadow-sm flex items-center justify-center"
          whileHover={{ scale: 1.25, rotate: [0, -8, 8, -4, 0] }}
          transition={{ type: 'spring', stiffness: 500, damping: 12 }}
        >
          <Icon size={22} strokeWidth={1.8} style={{ color: iconColor }} />
        </motion.div>

        <span className={`inline-block w-1.5 h-1.5 rounded-full ${dot} mb-2.5`} />
        <h3 className="font-bold text-gray-900 text-[15px] mb-0.5">{title}</h3>
        <p className="text-[11px] font-semibold text-gray-400 mb-2.5 tracking-wide">{subtitle}</p>
        <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>

        {/* animated arrow on hover */}
        <motion.div
          className="mt-4 inline-flex items-center gap-1 text-xs font-bold"
          style={{ color: iconColor }}
          whileHover={{ x: 4 }}
          transition={{ type: 'spring', stiffness: 400 }}
        >
          View All <ChevronRight size={12} />
        </motion.div>
      </motion.div>
    </Link>
  )
}

// ─── Reel Card ─────────────────────────────────────────────────────────────────

function ReelCard({ reel, index }) {
  return (
    <motion.div
      custom={index}
      initial={{ opacity: 0, x: 40, scale: 0.92 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.06, y: -4, transition: { type: 'spring', stiffness: 350, damping: 18 } }}
      className="relative flex-shrink-0 min-w-[130px] h-[232px] rounded-2xl overflow-hidden snap-center border border-white/10 cursor-pointer group"
    >
      <motion.img
        src={reel.img}
        alt={reel.caption}
        className="absolute inset-0 w-full h-full object-cover opacity-80"
        whileHover={{ scale: 1.08, opacity: 1 }}
        transition={{ duration: 0.35 }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      <div className="absolute top-2.5 left-2.5 bg-black/50 backdrop-blur-sm rounded-lg p-1.5">
        <Instagram size={11} className="text-white" />
      </div>
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.7 }}
        whileHover={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        <div className="w-11 h-11 rounded-full bg-white/25 backdrop-blur-sm flex items-center justify-center border border-white/50">
          <Play size={15} className="text-white fill-white ml-0.5" />
        </div>
      </motion.div>
      <p className="absolute bottom-2.5 left-2.5 right-2.5 text-[10px] font-semibold text-white/90 truncate">{reel.caption}</p>
    </motion.div>
  )
}

// ─── Scrolling Marquee Strip ───────────────────────────────────────────────────

function Marquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]
  return (
    <div className="relative overflow-hidden py-3 mb-12 max-w-6xl mx-auto px-4">
      <div className="absolute left-4 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute right-4 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        className="flex gap-6 whitespace-nowrap will-change-transform"
      >
        {items.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-2.5 text-[11px] font-black text-gray-300 uppercase tracking-[0.18em]">
            <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-orange-300 to-pink-300 flex-shrink-0" />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

// ─── Categories + Reels Section ────────────────────────────────────────────────

function CategoriesAndReels() {
  return (
    <section id="products" className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16 relative z-10">
      <div>
        <InViewSection>
          <div className="flex items-center gap-3 mb-7">
            <h2 className="text-base font-black text-gray-900 uppercase tracking-widest">Premium Categories</h2>
            <motion.div
              className="flex-1 h-px bg-gradient-to-r from-orange-200 via-rose-200 to-transparent"
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </InViewSection>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {CATEGORIES.map((cat, i) => <CategoryCard key={cat.id} cat={cat} index={i} />)}
        </motion.div>
      </div>

      <div id="reels">
        <InViewSection>
          <div className="flex items-center gap-2.5 mb-7">
            <motion.div
              animate={{ rotate: [0, 15, -10, 15, 0], scale: [1, 1.2, 1] }}
              transition={{ delay: 2, duration: 0.7, repeat: Infinity, repeatDelay: 4 }}
            >
              <Instagram size={17} className="text-pink-500 flex-shrink-0" />
            </motion.div>
            <h2 className="text-base font-black text-gray-900 tracking-tight">
              Latest from <span className="text-brand-gradient">@{social.instagramHandle}</span>
            </h2>
          </div>
        </InViewSection>

        <InViewSection>
          <div className="bg-gray-950 rounded-[2rem] p-5 shadow-2xl relative overflow-hidden">
            {/* animated top glow line */}
            <motion.div
              className="absolute top-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full"
              style={{ background: 'linear-gradient(to right, #fb923c, #ec4899)' }}
              initial={{ width: '0%', opacity: 0 }}
              whileInView={{ width: '75%', opacity: 0.7 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            />

            <div className="flex gap-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2">
              {REELS.map((reel, i) => <ReelCard key={reel.id} reel={reel} index={i} />)}
            </div>

            <div className="flex justify-center mt-5">
              <motion.a
                href={social.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.06, y: -2 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                className="inline-flex items-center gap-2 bg-brand-gradient text-white text-[13px] font-bold px-7 py-2.5 rounded-full"
                style={{ boxShadow: '0 4px 22px rgba(244,63,94,0.45)' }}
              >
                <Instagram size={14} /> Watch Reels
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
    <>
      <Marquee />
      <InViewSection>
        <section className="max-w-6xl mx-auto px-4 mb-20 relative z-10">
          <div className="bg-white/70 backdrop-blur-xl border border-white/80 rounded-2xl p-6 shadow-sm">
            <p className="text-center text-[10px] font-black tracking-[0.22em] text-gray-400 uppercase mb-6">
              Top Brands We Carry
            </p>
            <motion.div
              className="flex flex-wrap justify-center items-stretch gap-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
            >
              {BRANDS.map((brand) => (
                <Link key={brand.key} to={`/products?brand=${brand.key}`}>
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, scale: 0.8, y: 16 },
                      visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 18 } },
                    }}
                    whileHover={{
                      scale: 1.12,
                      y: -6,
                      boxShadow: '0 16px 36px rgba(0,0,0,0.18)',
                      transition: { type: 'spring', stiffness: 450, damping: 14 },
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="flex flex-col items-center justify-center gap-2 px-7 py-4 rounded-2xl cursor-pointer min-w-[90px]"
                    style={{ background: brand.bg, border: brand.border ?? 'none' }}
                  >
                    {brand.logo}
                    <span className="text-[10px] font-black tracking-widest uppercase" style={{ color: brand.color }}>
                      {brand.label}
                    </span>
                  </motion.div>
                </Link>
              ))}
            </motion.div>
          </div>
        </section>
      </InViewSection>
    </>
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
              Ready to <span className="text-brand-gradient">Upgrade?</span>
            </h2>
            <p className="text-gray-500 text-sm max-w-md mx-auto mb-7">
              Visit us in-store or reach out via WhatsApp for the fastest response. Trade in your old device and save big.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 mb-6">
              <motion.a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-white font-bold px-7 py-3.5 rounded-full text-sm transition-colors"
                style={{ boxShadow: '0 6px 24px rgba(34,197,94,0.38)' }}
              >
                <MessageCircle size={16} /> Chat on WhatsApp
              </motion.a>
              <motion.a
                href={location.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                className="inline-flex items-center justify-center gap-2 bg-white border border-gray-100 text-gray-800 font-bold px-7 py-3.5 rounded-full text-sm shadow-sm hover:shadow-md transition-shadow"
              >
                <MapPin size={16} className="text-rose-500" /> Get Directions
              </motion.a>
              <motion.a
                href={social.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                className="inline-flex items-center justify-center gap-2 bg-white border border-gray-100 text-gray-800 font-bold px-7 py-3.5 rounded-full text-sm shadow-sm hover:shadow-md transition-shadow"
              >
                <Instagram size={16} className="text-pink-500" /> Follow on Instagram
              </motion.a>
            </div>

            {/* Address */}
            <div className="inline-flex items-start gap-2 bg-gray-50/80 border border-gray-100 rounded-2xl px-4 py-3 text-left max-w-sm mx-auto">
              <MapPin size={14} className="text-rose-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-gray-500 leading-relaxed">{location.address}</p>
            </div>
          </div>
        </InViewSection>
        <p className="text-center text-gray-400 text-xs font-medium">
          &copy; {new Date().getFullYear()} {brand.nameDisplay}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

// ─── WhatsApp FAB ──────────────────────────────────────────────────────────────

function WhatsAppFAB() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      <motion.div
        initial={{ opacity: 0, x: 20, scale: 0.8 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ delay: 2.5, type: 'spring', stiffness: 250, damping: 20 }}
        className="hidden sm:block bg-brand-gradient text-white text-xs font-black px-4 py-2.5 rounded-full shadow-lg select-none"
      >
        Fast Inquiries! 💬
      </motion.div>

      <motion.a
        href={waLink()}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0, rotate: -180 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ delay: 2.0, type: 'spring', stiffness: 200, damping: 16 }}
        whileHover={{ scale: 1.15, rotate: 8, transition: { type: 'spring', stiffness: 500, damping: 10 } }}
        whileTap={{ scale: 0.92 }}
        className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-400 text-white flex items-center justify-center transition-colors"
        style={{ boxShadow: '0 4px 22px rgba(34,197,94,0.55)' }}
        aria-label="Chat on WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="white" width="26" height="26">
          <path d="M16 2C8.268 2 2 8.268 2 16c0 2.47.677 4.782 1.853 6.77L2 30l7.43-1.82A13.93 13.93 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5a11.45 11.45 0 0 1-5.837-1.602l-.418-.249-4.41 1.082 1.12-4.3-.273-.442A11.5 11.5 0 1 1 16 27.5zm6.317-8.563c-.346-.173-2.047-1.01-2.365-1.125-.317-.115-.548-.173-.779.173-.23.346-.892 1.125-1.093 1.356-.2.23-.4.26-.748.086-.346-.173-1.46-.538-2.783-1.72-1.028-.918-1.722-2.05-1.924-2.397-.2-.346-.02-.533.153-.705.157-.155.346-.404.52-.606.173-.202.23-.346.346-.577.115-.23.058-.433-.029-.606-.086-.173-.779-1.877-1.067-2.57-.282-.673-.568-.582-.779-.593l-.663-.011c-.23 0-.606.086-.923.433-.317.346-1.21 1.183-1.21 2.886s1.239 3.346 1.41 3.577c.173.23 2.44 3.724 5.913 5.221.826.356 1.47.569 1.974.728.829.263 1.584.226 2.18.137.665-.099 2.047-.836 2.336-1.644.288-.808.288-1.5.2-1.644-.086-.144-.317-.23-.663-.404z" />
        </svg>
      </motion.a>
    </div>
  )
}

// ─── Landing Page ──────────────────────────────────────────────────────────────

function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden selection:bg-pink-100 selection:text-pink-900">
      <ScrollProgressBar />
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

// ─── App Root ──────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/products" element={<ProductsPage />} />
      </Routes>
    </BrowserRouter>
  )
}
