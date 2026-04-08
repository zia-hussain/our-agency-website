import { useEffect, useRef, useState } from 'react';
import { motion, useAnimationFrame } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Home, Search } from 'lucide-react';

const GLITCH_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@!%&';

function GlitchText({ text, className }: { text: string; className?: string }) {
  const [displayed, setDisplayed] = useState(text);
  const iterRef = useRef(0);
  const frameRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    iterRef.current = 0;
    frameRef.current = setInterval(() => {
      setDisplayed(
        text
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' ';
            if (i < iterRef.current) return text[i];
            return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
          })
          .join('')
      );
      iterRef.current += 0.5;
      if (iterRef.current >= text.length) {
        setDisplayed(text);
        if (frameRef.current) clearInterval(frameRef.current);
      }
    }, 30);
    return () => { if (frameRef.current) clearInterval(frameRef.current); };
  }, [text]);

  return <span className={className}>{displayed}</span>;
}

function FloatingOrb({ x, y, size, delay }: { x: string; y: string; size: number; delay: number }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ left: x, top: y, width: size, height: size, background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)' }}
      animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 6, delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

const LINKS = [
  { label: 'Home',      href: '/' },
  { label: 'Work',      href: '/portfolio' },
  { label: 'Services',  href: '/services' },
  { label: 'About',     href: '/about' },
  { label: 'Contact',   href: '/contact' },
];

export default function NotFoundPage() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="relative min-h-screen bg-[#070707] overflow-hidden flex flex-col">
      {/* Ambient orbs */}
      <FloatingOrb x="10%" y="20%" size={400} delay={0} />
      <FloatingOrb x="70%" y="60%" size={300} delay={2} />
      <FloatingOrb x="40%" y="80%" size={500} delay={1} />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Scanline */}
      <motion.div
        className="absolute left-0 right-0 h-px bg-white/5 pointer-events-none"
        animate={{ top: ['0%', '100%'] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />

      {/* Nav */}
      <div className="relative z-10 flex items-center justify-between px-6 sm:px-12 py-6">
        <Link to="/" className="flex items-center gap-2.5 group">
          <img
            src="/logo/Logo Icon.png"
            alt="Zumetrix Labs"
            className="h-7 w-auto opacity-50 group-hover:opacity-80 transition-opacity duration-300"
            onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
          <span className="text-white/30 text-sm font-medium group-hover:text-white/60 transition-colors duration-300">Zumetrix Labs</span>
        </Link>
        <Link to="/"
          className="flex items-center gap-2 px-4 py-2 border border-white/10 rounded-full text-white/30 hover:text-white/70 hover:border-white/20 text-sm transition-all duration-200">
          <Home className="w-3.5 h-3.5" />
          <span className="hidden sm:block">Go home</span>
        </Link>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center">
        {/* 404 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="relative mb-6 select-none"
        >
          <div
            className="text-[160px] sm:text-[220px] lg:text-[280px] font-black leading-none tracking-tighter"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.02) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            404
          </div>
          {/* Glitch layer */}
          <motion.div
            className="absolute inset-0 text-[160px] sm:text-[220px] lg:text-[280px] font-black leading-none tracking-tighter text-white/5"
            animate={{ x: [0, -3, 3, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 0.15, repeat: Infinity, repeatDelay: 4 }}
          >
            404
          </motion.div>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="max-w-xl"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight mb-4">
            <GlitchText text="This page doesn't exist." />
          </h1>
          <p className="text-white/30 text-base sm:text-lg font-light leading-relaxed mb-3">
            Whatever you were looking for — it's not here. Maybe it moved, maybe it never existed, maybe the internet ate it.
          </p>
          {path && path !== '/' && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-white/15 text-sm font-mono mt-2"
            >
              <span className="text-white/20">tried:</span> {path}
            </motion.p>
          )}
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center gap-3 mt-10"
        >
          <Link
            to="/"
            className="group flex items-center gap-3 px-8 py-4 bg-white text-black text-sm font-semibold rounded-full hover:bg-white/90 active:scale-[0.97] transition-all duration-200 shadow-[0_0_40px_rgba(255,255,255,0.08)]"
          >
            <Home className="w-4 h-4" />
            Take me home
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
          <Link
            to="/portfolio"
            className="flex items-center gap-2 px-8 py-4 border border-white/10 text-white/50 text-sm font-medium rounded-full hover:border-white/20 hover:text-white/80 active:scale-[0.97] transition-all duration-200"
          >
            Browse our work
          </Link>
        </motion.div>

        {/* Quick nav */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-2"
        >
          <span className="text-white/15 text-xs mr-1">or jump to</span>
          {LINKS.map((link, i) => (
            <Link
              key={i}
              to={link.href}
              className="px-3 py-1.5 rounded-full border border-white/6 text-white/25 text-xs hover:border-white/15 hover:text-white/50 transition-all duration-200"
            >
              {link.label}
            </Link>
          ))}
        </motion.div>
      </div>

      {/* Bottom signature */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="relative z-10 text-center pb-8"
      >
        <p className="text-white/10 text-xs font-mono">
          ERR_ROUTE_NOT_FOUND · Zumetrix Labs · {new Date().getFullYear()}
        </p>
      </motion.div>
    </div>
  );
}
