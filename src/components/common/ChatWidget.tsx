import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { trackCTAClick } from '../../utils/analytics';

type ChatStep = 'closed' | 'welcome' | 'email' | 'options' | 'message' | 'success';

const ChatWidget: React.FC = () => {
  const [step, setStep] = useState<ChatStep>('closed');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const quickOptions = [
    { label: 'MVP Development', value: 'mvp' },
    { label: 'Web Application', value: 'web' },
    { label: 'Mobile App', value: 'mobile' },
    { label: 'AI Automation', value: 'ai' },
    { label: 'Custom Solution', value: 'custom' },
  ];

  const handleOpen = () => {
    setStep('welcome');
    trackCTAClick('Chat Widget Opened', window.location.pathname);
  };

  const handleClose = () => {
    setStep('closed');
  };

  const handleEmailSubmit = async () => {
    if (!email) return;
    setStep('options');
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setStep('message');
  };

  const handleMessageSubmit = async () => {
    if (!email) return;

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('chat_leads')
        .insert({
          email,
          name: name || null,
          initial_message: `${selectedOption}: ${message}`,
          page_url: window.location.href,
          user_agent: navigator.userAgent,
          status: 'new'
        });

      if (error) throw error;

      trackCTAClick('Chat Lead Submitted', window.location.pathname);
      setStep('success');

      setTimeout(() => {
        handleClose();
        setEmail('');
        setName('');
        setMessage('');
        setSelectedOption('');
      }, 3000);
    } catch (error) {
      console.error('Error submitting chat lead:', error);
      alert('Failed to send message. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {step === 'closed' && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleOpen}
            className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-50 w-12 h-12 md:w-14 md:h-14 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-150"
            aria-label="Open chat"
          >
            <MessageCircle size={22} />
          </motion.button>
        )}

        {step !== 'closed' && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: 20 }}
            className="fixed bottom-20 md:bottom-6 right-4 left-4 md:left-auto md:right-6 z-50 w-full md:w-[400px] max-w-[calc(100vw-2rem)] max-h-[calc(100vh-8rem)] md:max-h-[600px] bg-card/95 backdrop-blur-xl border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="bg-card/80 backdrop-blur-xl border-b border-border p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 border border-primary/20 rounded-full flex items-center justify-center">
                  <Sparkles size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Zumetrix Labs</h3>
                  <p className="text-xs text-muted-foreground">Usually replies instantly</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleClose}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={20} />
              </motion.button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {step === 'welcome' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="bg-primary/10 border border-primary/20 rounded-xl p-4">
                    <p className="text-foreground text-sm leading-relaxed">
                      👋 Hi! I'm here to help you get started. What's the best email to reach you?
                    </p>
                  </div>

                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Your name (optional)"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      onKeyPress={(e) => e.key === 'Enter' && handleEmailSubmit()}
                    />
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      onKeyPress={(e) => e.key === 'Enter' && handleEmailSubmit()}
                      autoFocus
                    />
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleEmailSubmit}
                      disabled={!email}
                      className="w-full bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-4 py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Continue
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {step === 'options' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="bg-primary/10 border border-primary/20 rounded-xl p-4">
                    <p className="text-foreground text-sm leading-relaxed">
                      Great! What are you looking to build?
                    </p>
                  </div>

                  <div className="space-y-2">
                    {quickOptions.map((option) => (
                      <motion.button
                        key={option.value}
                        whileHover={{ scale: 1.02, x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleOptionSelect(option.label)}
                        className="w-full text-left px-4 py-3 rounded-lg border border-border bg-background hover:border-primary/30 hover:bg-card/50 transition-all duration-150 text-foreground"
                      >
                        {option.label}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 'message' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="bg-primary/10 border border-primary/20 rounded-xl p-4">
                    <p className="text-foreground text-sm leading-relaxed">
                      Tell us more about your {selectedOption} project
                    </p>
                  </div>

                  <div className="space-y-3">
                    <textarea
                      placeholder="Describe your project goals, timeline, and any specific requirements..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                      autoFocus
                    />
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleMessageSubmit}
                      disabled={isSubmitting || !message}
                      className="w-full bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-4 py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        'Sending...'
                      ) : (
                        <>
                          Send Message
                          <Send size={16} />
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {step === 'success' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles size={32} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    We'll get back to you within 24 hours.
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;
