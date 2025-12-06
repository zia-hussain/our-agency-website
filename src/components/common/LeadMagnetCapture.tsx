import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Sparkles, CheckCircle2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { trackCTAClick } from '../../utils/analytics';

interface LeadMagnetCaptureProps {
  isOpen: boolean;
  onClose: () => void;
  magnetType: 'pdf' | 'calculator' | 'checklist' | 'template' | 'guide' | 'ebook' | 'other';
  magnetName: string;
  title: string;
  description: string;
  metadata?: Record<string, any>;
  onSuccess?: (email: string) => void;
}

const LeadMagnetCapture: React.FC<LeadMagnetCaptureProps> = ({
  isOpen,
  onClose,
  magnetType,
  magnetName,
  title,
  description,
  metadata = {},
  onSuccess,
}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('lead_magnets')
        .insert({
          email,
          name: name || null,
          magnet_type: magnetType,
          magnet_name: magnetName,
          metadata,
          page_url: window.location.href,
          user_agent: navigator.userAgent,
          status: 'new'
        });

      if (error) throw error;

      trackCTAClick(`Lead Magnet - ${magnetName}`, window.location.pathname);
      setIsSuccess(true);

      if (onSuccess) {
        onSuccess(email);
      }

      setTimeout(() => {
        onClose();
        setEmail('');
        setName('');
        setIsSuccess(false);
      }, 2000);
    } catch (error) {
      console.error('Error capturing lead:', error);
      alert('Failed to process request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50 p-4"
          >
            <div className="bg-card/95 backdrop-blur-xl border border-border rounded-2xl shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-b border-border p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center">
                      {isSuccess ? (
                        <CheckCircle2 size={24} className="text-primary" />
                      ) : (
                        <Download size={24} className="text-primary" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground text-lg">{title}</h3>
                      <p className="text-sm text-muted-foreground">{description}</p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X size={20} />
                  </motion.button>
                </div>
              </div>

              <div className="p-6">
                {isSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Sparkles size={32} className="text-primary" />
                    </div>
                    <h4 className="text-xl font-bold text-foreground mb-2">
                      Success!
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      Check your email for the download link
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Your Name (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email Address <span className="text-primary">*</span>
                      </label>
                      <input
                        type="email"
                        placeholder="you@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      />
                    </div>

                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                      <p className="text-xs text-muted-foreground">
                        We'll send you the {magnetType === 'pdf' ? 'PDF' : 'resource'} instantly. No spam, unsubscribe anytime.
                      </p>
                    </div>

                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={isSubmitting || !email}
                      className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Download size={18} />
                          Get Instant Access
                        </>
                      )}
                    </motion.button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LeadMagnetCapture;
