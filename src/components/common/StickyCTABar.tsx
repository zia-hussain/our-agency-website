import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, MessageCircle, ArrowRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { trackCTAClick, trackCalendlyClick } from '../../utils/analytics';
import { buildCalendlyUrl } from '../../utils/attribution';

// The bar says something different depending on where the reader is, so it
// offers the proportionate next step instead of the same generic ask on every
// page: the free diagnostic on rescue pages, the build conversation on build
// pages, the workflow on automation pages, a call everywhere else.
type BarFamily = 'rescue' | 'build' | 'automate' | 'general';

const familyFor = (pathname: string): BarFamily => {
  if (
    pathname === '/services/product-rescue-stabilization' ||
    pathname === '/rescue-or-rebuild' ||
    pathname.includes('rescue') ||
    pathname.includes('stuck') ||
    pathname.includes('stabilization') ||
    pathname.includes('taking-over')
  )
    return 'rescue';
  if (
    pathname === '/services/saas-mvp-development' ||
    pathname === '/services/web-application-development' ||
    pathname === '/services/mobile-app-development' ||
    pathname.includes('mvp') ||
    pathname.includes('decision-room')
  )
    return 'build';
  if (pathname === '/services/ai-automation-solutions' || pathname.includes('automation')) return 'automate';
  return 'general';
};

const BAR_COPY: Record<BarFamily, { title: string; sub: string; subMobile: string; secondary: { label: string; href: string } }> = {
  rescue: {
    title: 'Not sure if it’s a rescue or a rebuild?',
    sub: 'Four questions, no email, an honest read — then decide.',
    subMobile: 'Four free questions.',
    secondary: { label: 'Four free questions', href: '/rescue-or-rebuild' },
  },
  build: {
    title: 'Want the V1 decision first?',
    sub: 'Tell us what you’re building; the scope is decided in writing before any code.',
    subMobile: 'Tell us what you’re building.',
    secondary: { label: 'Tell us what you’re building', href: '/contact?service=saas-mvp-development&situation=nothing-built' },
  },
  automate: {
    title: 'Start with one workflow.',
    sub: 'The one that hurts most — built, live, watched. Then decide if there’s a second.',
    subMobile: 'The one that hurts most.',
    secondary: { label: 'Show us the workflow', href: '/contact?service=ai-automation-solutions&situation=manual-workflow' },
  },
  general: {
    title: 'Tell us where you are.',
    sub: 'A 30-minute call with Zia or Omer. If something fits, we’ll say which; if not, we’ll say that.',
    subMobile: 'We’ll tell you what fits.',
    secondary: { label: 'Write to us', href: '/contact' },
  },
};

const StickyCTABar: React.FC = () => {
  const { pathname } = useLocation();
  const copy = BAR_COPY[familyFor(pathname)];
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (isDismissed) return;

      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      setIsVisible(scrollPosition > windowHeight * 0.5);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  useEffect(() => {
    const root = document.documentElement;
    const bar = barRef.current;

    if (!bar || !isVisible || isDismissed) {
      root.style.setProperty('--sticky-cta-height', '0px');
      return;
    }

    const updateHeight = () => {
      root.style.setProperty('--sticky-cta-height', `${bar.getBoundingClientRect().height}px`);
    };

    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(bar);

    return () => {
      observer.disconnect();
      root.style.setProperty('--sticky-cta-height', '0px');
    };
  }, [isVisible, isDismissed]);

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
  };

  const handleScheduleCall = () => {
    trackCalendlyClick('sticky-bar');
    window.open(buildCalendlyUrl('sticky-bar'), '_blank', 'noopener');
  };

  return (
    <AnimatePresence>
      {isVisible && !isDismissed && (
        <motion.div
          ref={barRef}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="fixed bottom-0 left-0 right-0 z-30 bg-background/80 backdrop-blur-xl border-t border-border shadow-lg"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-2.5 sm:flex sm:items-center sm:justify-between sm:gap-4 sm:py-3">
              <div className="flex min-w-0 items-center justify-between gap-3 sm:flex-1">
                <div className="flex items-center gap-3">
                  <div className="flex w-9 h-9 bg-primary/10 border border-primary/20 rounded-full flex-shrink-0 items-center justify-center">
                    <MessageCircle size={18} className="text-primary" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold text-foreground sm:text-base">
                      {copy.title}
                    </h3>
                    <p className="mt-0.5 text-xs text-muted-foreground sm:hidden">
                      {copy.subMobile}
                    </p>
                    <p className="hidden text-sm text-muted-foreground md:block">
                      {copy.sub}
                    </p>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleDismiss}
                  className="btn-sheen rounded-full p-2 text-muted-foreground transition-colors hover:text-foreground sm:hidden"
                  aria-label="Dismiss project call to action"
                >
                  <X size={18} />
                </motion.button>
              </div>

              <div className="mt-2.5 grid grid-cols-2 gap-2 sm:mt-0 sm:flex sm:flex-shrink-0 sm:items-center sm:gap-3">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleScheduleCall}
                  className="btn-sheen flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 sm:px-6"
                >
                  <Calendar size={16} />
                  <span className="hidden sm:inline">Book a call</span>
                  <span className="sm:hidden">Book a call</span>
                </motion.button>

                <Link to={copy.secondary.href} className="block">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => trackCTAClick('Sticky CTA - Secondary', window.location.pathname)}
                    className="btn-sheen flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-full border border-border px-4 py-2.5 text-sm font-medium text-foreground transition-all hover:border-primary/30 hover:bg-card/50 sm:w-auto sm:px-6"
                  >
                    <span>{copy.secondary.label}</span>
                    <ArrowRight size={16} />
                  </motion.button>
                </Link>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleDismiss}
                  className="btn-sheen hidden rounded-full p-1 text-muted-foreground transition-colors hover:text-foreground sm:block"
                  aria-label="Dismiss project call to action"
                >
                  <X size={18} />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyCTABar;
