import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { trackCTAClick } from '../../utils/analytics';

interface NewsletterSubscribeProps {
  source?: string;
  variant?: 'default' | 'compact';
}

const NewsletterSubscribe: React.FC<NewsletterSubscribeProps> = ({
  source = 'footer',
  variant = 'default'
}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) return;

    setStatus('loading');

    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert({
          email,
          name: name || null,
          source,
          is_active: true,
          tags: [source]
        });

      if (error) {
        if (error.code === '23505') {
          setMessage('You\'re already subscribed!');
          setStatus('error');
        } else {
          throw error;
        }
      } else {
        trackCTAClick(`Newsletter Subscribe - ${source}`, window.location.pathname);
        setMessage('Success! Check your email for confirmation.');
        setStatus('success');
        setEmail('');
        setName('');

        setTimeout(() => {
          setStatus('idle');
          setMessage('');
        }, 5000);
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      setMessage('Something went wrong. Please try again.');
      setStatus('error');

      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 5000);
    }
  };

  if (variant === 'compact') {
    return (
      <div className="w-full">
        {status === 'success' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 text-primary text-sm"
          >
            <CheckCircle size={16} />
            <span>{message}</span>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-2">
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                disabled={status === 'loading'}
                className="flex-1 px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
              />
              <motion.button
                type="submit"
                disabled={status === 'loading' || !email}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-4 py-2 rounded-lg font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {status === 'loading' ? (
                  'Subscribing...'
                ) : (
                  <>
                    <Mail size={16} />
                    Subscribe
                  </>
                )}
              </motion.button>
            </div>
            {status === 'error' && (
              <div className="flex items-center gap-2 text-destructive text-xs">
                <AlertCircle size={14} />
                <span>{message}</span>
              </div>
            )}
          </form>
        )}
      </div>
    );
  }

  return (
    <div className="w-full">
      {status === 'success' ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-primary/10 border border-primary/20 rounded-lg p-4 flex items-center gap-3"
        >
          <CheckCircle size={24} className="text-primary flex-shrink-0" />
          <p className="text-foreground">{message}</p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name (optional)"
            disabled={status === 'loading'}
            className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
          />
          <div className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              disabled={status === 'loading'}
              className="flex-1 px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
            />
            <motion.button
              type="submit"
              disabled={status === 'loading' || !email}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-6 py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {status === 'loading' ? (
                'Subscribing...'
              ) : (
                <>
                  <Mail size={18} />
                  Subscribe
                </>
              )}
            </motion.button>
          </div>
          {status === 'error' && (
            <div className="flex items-center gap-2 text-destructive text-sm">
              <AlertCircle size={16} />
              <span>{message}</span>
            </div>
          )}
        </form>
      )}
    </div>
  );
};

export default NewsletterSubscribe;
