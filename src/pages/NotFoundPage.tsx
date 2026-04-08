import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

const GLITCH_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@!%&';

function GlitchText({ text, className }: { text: string; className?: string }) {
  const [displayed, setDisplayed] = useState('');
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
      iterRef.current += 0.6;
      if (iterRef.current >= text.length) {
        setDisplayed(text);
        if (frameRef.current) clearInterval(frameRef.current);
      }
    }, 28);
    return () => { if (frameRef.current) clearInterval(frameRef.current); };
  }, [text]);

  return <span className={className}>{displayed}</span>;
}

const LINKS = [
  { label: 'Home',     href: '/' },
  { label: 'Our Work', href: '/portfolio' },
  { label: 'Services', href: '/services' },
  { label: 'About',    href: '/about' },
  { label: 'Contact',  href: '/contact' },
  { label: 'Blog',     href: '/articles' },
];

export default function NotFoundPage() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="relative min-h-screen bg-[#0C0C0C] overflow-hidden flex flex-col">

      {/* Subtle beige radial glow top-left */}
      <div
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(196,138,100,0.05) 0%, transparent 70%)' }}
      />
      {/* Subtle beige radial glow bottom-right */}
      <div
        className="absolute -bottom-60 -right-40 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(196,138,100,0.03) 0%, transparent 70%)' }}
      />

      {/* Nav */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 flex items-center justify-between px-6 sm:px-12 py-6"
      >
        <Link to="/" className="flex items-center gap-2.5 group">
          <img
            src="/logo/Logo Icon.png"
            alt="Zumetrix Labs"
            className="h-7 w-auto"
            style={{ filter: 'brightness(0.5) sepia(1) saturate(2) hue-rotate(-20deg)' }}
            onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
          <span className="text-[#EDEDED]/30 text-sm font-medium group-hover:text-[#EDEDED]/60 transition-colors duration-300">
            Zumetrix Labs
          </span>
        </Link>
        <Link
          to="/"
          className="flex items-center gap-2 px-5 py-2.5 border border-[#1E1E1E] rounded-full text-[#EDEDED]/30 hover:text-[#EDEDED]/70 hover:border-[#C48A64]/30 text-sm transition-all duration-300"
        >
          Back to site
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center pb-10">

        {/* 404 number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className="relative mb-2 select-none"
        >
          <div
            className="text-[140px] sm:text-[200px] lg:text-[240px] font-black leading-none tracking-tighter"
            style={{
              background: 'linear-gradient(180deg, rgba(196,138,100,0.22) 0%, rgba(196,138,100,0.04) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            404
          </div>
          {/* Glitch layer */}
          <motion.div
            className="absolute inset-0 text-[140px] sm:text-[200px] lg:text-[240px] font-black leading-none tracking-tighter"
            style={{
              background: 'linear-gradient(180deg, rgba(196,138,100,0.10) 0%, transparent 60%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
            animate={{ x: [0, -2, 2, 0], opacity: [0, 0.8, 0] }}
            transition={{ duration: 0.12, repeat: Infinity, repeatDelay: 5 }}
          >
            404
          </motion.div>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          className="w-16 h-px bg-[#C48A64]/30 mb-10"
        />

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="max-w-lg mb-4"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#EDEDED] leading-tight tracking-tight">
            <GlitchText text="This page got lost" />
            <br />
            <span className="text-[#C48A64]">
              <GlitchText text="somewhere in the build." />
            </span>
          </h1>
        </motion.div>

        {/* Sub copy */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="text-[#EDEDED]/35 text-base sm:text-lg font-light max-w-md leading-relaxed mb-3"
        >
          The URL you hit doesn't match anything we've built — yet. Maybe it moved, maybe it never existed, maybe you were just exploring.
        </motion.p>

        {/* Path display */}
        {path && path !== '/' && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
            className="text-[#EDEDED]/15 text-xs font-mono mb-10"
          >
            <span className="text-[#C48A64]/30">GET</span> {path}{' '}
            <span className="text-[#C48A64]/30 ml-2">404</span>
          </motion.p>
        )}

        {(!path || path === '/') && <div className="mb-10" />}

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="flex flex-col sm:flex-row items-center gap-3 mb-16"
        >
          <Link
            to="/"
            className="group flex items-center gap-3 px-8 py-4 bg-[#C48A64] text-black text-sm font-semibold rounded-full hover:bg-[#DCA973] active:scale-[0.97] transition-all duration-200 shadow-[0_0_32px_rgba(196,138,100,0.2)]"
          >
            Take me home
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
          <Link
            to="/contact"
            className="flex items-center gap-2 px-8 py-4 border border-[#1E1E1E] text-[#EDEDED]/40 text-sm font-medium rounded-full hover:border-[#C48A64]/25 hover:text-[#EDEDED]/70 active:scale-[0.97] transition-all duration-300"
          >
            Talk to us
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Quick nav links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-2"
        >
          <span className="text-[#EDEDED]/15 text-xs mr-1">Or find what you need —</span>
          {LINKS.map((link, i) => (
            <Link
              key={i}
              to={link.href}
              className="px-3.5 py-1.5 rounded-full border border-[#1E1E1E] text-[#EDEDED]/25 text-xs hover:border-[#C48A64]/25 hover:text-[#C48A64]/70 transition-all duration-200"
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
        transition={{ delay: 0.9 }}
        className="relative z-10 flex items-center justify-center pb-7"
      >
        <p className="text-[#EDEDED]/8 text-[11px] font-mono tracking-wider">
          ZUMETRIX LABS · ERR_ROUTE_NOT_FOUND · {new Date().getFullYear()}
        </p>
      </motion.div>
    </div>
  );
}
