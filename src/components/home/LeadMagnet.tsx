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
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative bg-card/40 backdrop-blur-xl border border-border/70 rounded-3xl p-8 md:p-12 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.5)] ring-1 ring-inset ring-white/[0.02] overflow-hidden"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(196,138,100,0.06),transparent_55%)]" />
            {!isSubmitted ? (
              <>
                <div className="relative flex justify-center mb-6">
                  <div className="w-16 h-16 bg-primary/[0.08] border border-primary/15 rounded-2xl flex items-center justify-center">
                    <FileText size={30} className="text-primary" />
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="relative inline-flex items-center px-3.5 py-1.5 bg-card/50 backdrop-blur-xl border border-border/70 rounded-full text-xs font-medium uppercase tracking-[0.1em] text-primary/90 mb-7"
                >
                  <Download className="w-3.5 h-3.5 mr-2" />
                  Free Download
                </motion.div>

                <h2 className="relative text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight leading-[1.15]">
                  Get your free
                  <span className="block bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent mt-1.5">
                    30-Day SaaS MVP Blueprint
                  </span>
                </h2>

                <p className="relative text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                  A practical planning guide for moving from an idea to a focused first release. It includes a 30-day framework, stack guidance, feature prioritization, and a launch checklist.
                </p>

                <div className="relative grid md:grid-cols-3 gap-3 mb-9 max-w-2xl mx-auto">
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
                      className="bg-background/40 border border-border/60 rounded-xl p-4 flex flex-col items-center text-center"
                    >
                      <feature.icon size={18} className="text-primary/85 mb-2" />
                      <div className="text-sm font-semibold text-foreground mb-1">
                        {feature.title}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {feature.desc}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <form onSubmit={handleSubmit} className="relative max-w-md mx-auto space-y-4">
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
                    className="w-full px-4 py-3 rounded-xl border border-border/70 bg-background/70 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-colors duration-200"
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
                    className="w-full px-4 py-3 rounded-xl border border-border/70 bg-background/70 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-colors duration-200"
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
