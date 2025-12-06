import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, MessageCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { trackCTAClick } from '../../utils/analytics';
import { SITE_CONFIG } from '../../config/site';

const StickyCTABar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

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
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="fixed bottom-0 left-0 right-0 z-30 bg-background/80 backdrop-blur-xl border-t border-border shadow-lg"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-3 gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <div className="hidden sm:flex w-9 h-9 bg-primary/10 border border-primary/20 rounded-full flex-shrink-0 items-center justify-center">
                    <MessageCircle size={18} className="text-primary" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-foreground text-sm sm:text-base truncate">
                      Ready to start your project?
                    </h3>
                    <p className="text-muted-foreground text-xs sm:text-sm hidden md:block">
                      Get a free consultation and project estimate
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleScheduleCall}
                  className="bg-primary text-primary-foreground px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity flex items-center gap-2 whitespace-nowrap"
                >
                  <Calendar size={16} className="hidden sm:inline" />
                  <span className="hidden sm:inline">Schedule Call</span>
                  <span className="sm:hidden">Call</span>
                </motion.button>

                <Link to="/contact">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => trackCTAClick('Sticky CTA - Contact', window.location.pathname)}
                    className="border border-border text-foreground px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg font-medium text-sm hover:bg-card/50 hover:border-primary/30 transition-all flex items-center gap-2 whitespace-nowrap"
                  >
                    <span>Contact</span>
                    <ArrowRight size={16} className="hidden sm:inline" />
                  </motion.button>
                </Link>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleDismiss}
                  className="text-muted-foreground hover:text-foreground transition-colors p-1"
                  aria-label="Dismiss"
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
