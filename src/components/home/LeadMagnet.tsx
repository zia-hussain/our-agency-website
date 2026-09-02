import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, CheckCircle, FileText, ListChecks, Layers3, Rocket } from 'lucide-react';
import AnimatedSection from '../common/AnimatedSection';
import { routeLead } from '../../services/leadRouter';
import { trackCTAClick } from '../../utils/analytics';

const LeadMagnet: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [hpToken, setHpToken] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await routeLead({
        email,
        name: name || undefined,
        source: 'homepage_lead_magnet',
        leadType: 'lead_magnet',
        magnetName: '30-Day SaaS MVP Blueprint',
        hpToken: hpToken || undefined,
        metadata: {
          pdfName: '30-day-saas-mvp-blueprint.pdf',
          requestedAsset: '/downloads/30-day-saas-mvp-blueprint.pdf',
          marketingConsent,
        },
      });

      if (!result.success) throw new Error(result.error || 'Lead capture failed');

      trackCTAClick('Lead Magnet - MVP Blueprint', window.location.pathname);

      setEmailSent(Boolean(result.userEmailSent));
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 lg:py-20 bg-card/20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSection className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-card/70 backdrop-blur-xl border border-border rounded-3xl p-8 md:p-12 shadow-2xl"
          >
            {!isSubmitted ? (
              <>
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/30 rounded-2xl flex items-center justify-center">
                    <FileText size={40} className="text-primary" />
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="inline-flex items-center px-4 py-2 bg-card/50 backdrop-blur-xl border border-border rounded-full text-sm font-medium text-primary mb-8"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Free Download
                </motion.div>

                <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-4 tracking-tight leading-[1.1]">
                  Get Your Free
                  <span className="block bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent mt-2">
                    30-Day SaaS MVP Blueprint
                  </span>
                </h2>

                <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                  A practical planning guide for moving from an idea to a focused first release. It includes a 30-day framework, stack guidance, feature prioritization, and a launch checklist.
                </p>

                <div className="grid md:grid-cols-3 gap-4 mb-8 max-w-3xl mx-auto">
                  {[
                    { icon: ListChecks, title: 'Step-by-Step Process', desc: 'From idea to launch' },
                    { icon: Layers3, title: 'Tech Stack Guide', desc: 'What to use & why' },
                    { icon: Rocket, title: 'Launch Checklist', desc: 'Ready-to-use template' }
                  ].map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      className="bg-background/50 border border-border/50 rounded-lg p-4 flex flex-col items-center text-center"
                    >
                      <feature.icon size={20} className="text-primary mb-2" />
                      <div className="text-sm font-semibold text-foreground mb-1">
                        {feature.title}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {feature.desc}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
                  <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden">
                    <label htmlFor="lm-company-confirm">Leave this field empty</label>
                    <input
                      id="lm-company-confirm"
                      name="company_confirm"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={hpToken}
                      onChange={(e) => setHpToken(e.target.value)}
                    />
                  </div>
                  <label htmlFor="blueprint-name" className="sr-only">
                    Your name
                  </label>
                  <input
                    id="blueprint-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background/80 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  <label htmlFor="blueprint-email" className="sr-only">
                    Your email address
                  </label>
                  <input
                    id="blueprint-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background/80 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-primary to-primary/90 text-primary-foreground px-6 py-4 rounded-full font-semibold hover:shadow-glow transition-all duration-150 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Download size={20} />
                        Download Free Guide
                      </>
                    )}
                  </motion.button>
                  <label className="flex cursor-pointer items-start gap-3 text-left">
                    <input
                      type="checkbox"
                      checked={marketingConsent}
                      onChange={(event) => setMarketingConsent(event.target.checked)}
                      className="mt-1 h-4 w-4 accent-primary"
                    />
                    <span className="text-xs leading-relaxed text-muted-foreground">
                      Also send me occasional practical product and automation
                      notes. Optional. Unsubscribe anytime.
                    </span>
                  </label>
                </form>

                <p className="text-xs text-muted-foreground mt-4">
                  The guide is delivered whether or not you join the mailing list.
                </p>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-primary" />
                    <span>PDF planning guide</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-primary" />
                    <span>Proven frameworks</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-primary" />
                    <span>Built from 80+ project lessons</span>
                  </div>
                </div>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12"
              >
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={40} className="text-primary" />
                </div>
                <h3 className="text-3xl font-bold text-foreground mb-4">
                  {emailSent ? 'Blueprint Sent' : 'Request Saved'}
                </h3>
                <p className="text-lg text-muted-foreground mb-6">
                  {emailSent ? (
                    <>
                      We sent the MVP Blueprint to <span className="font-medium text-foreground">{email}</span>.
                    </>
                  ) : (
                    <>
                      Your request is saved. You can download the blueprint now, and we will follow up if email delivery is not configured yet.
                    </>
                  )}
                </p>
                <a
                  href="/downloads/30-day-saas-mvp-blueprint.pdf"
                  download
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium hover:opacity-90 transition-opacity mb-6"
                >
                  <Download size={18} />
                  Download PDF
                </a>
                <p className="text-muted-foreground">
                  While you're here, want to discuss your project?
                  <a href="/contact" className="text-primary font-medium hover:underline ml-1">
                    Book a free consultation
                  </a>
                </p>
              </motion.div>
            )}
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default LeadMagnet;
