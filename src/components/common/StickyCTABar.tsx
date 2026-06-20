import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, MessageCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { trackCTAClick } from '../../utils/analytics';
import { SITE_CONFIG } from '../../config/site';

const StickyCTABar: React.FC = () => {
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
    trackCTAClick('Sticky CTA - Schedule Call', window.location.pathname);
    window.open(
      SITE_CONFIG.contact.calendlyUrl || 'https://calendly.com/zumetrix-labs/consultation',
      '_blank'
    );
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
                      Ready to start your project?
                    </h3>
                    <p className="mt-0.5 text-xs text-muted-foreground sm:hidden">
                      Tell us what you want to build.
                    </p>
                    <p className="hidden text-sm text-muted-foreground md:block">
                      Get a free consultation and project estimate
                    </p>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleDismiss}
                  className="p-2 text-muted-foreground transition-colors hover:text-foreground sm:hidden"
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
                  className="flex items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 sm:px-6"
                >
                  <Calendar size={16} />
                  <span className="hidden sm:inline">Schedule Call</span>
                  <span className="sm:hidden">Book a Call</span>
                </motion.button>

                <Link to="/contact" className="block">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => trackCTAClick('Sticky CTA - Contact', window.location.pathname)}
                    className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground transition-all hover:border-primary/30 hover:bg-card/50 sm:w-auto sm:px-6"
                  >
                    <span>Contact</span>
                    <ArrowRight size={16} />
                  </motion.button>
                </Link>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleDismiss}
                  className="hidden p-1 text-muted-foreground transition-colors hover:text-foreground sm:block"
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
