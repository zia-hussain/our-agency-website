import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, CheckCircle2, Clock, DollarSign, Code, Zap, ArrowRight, Star } from 'lucide-react';
import SEO from '../components/common/SEO';
import PageTransition from '../components/common/PageTransition';
import AnimatedSection from '../components/common/AnimatedSection';

const MVPDevelopmentPage: React.FC = () => {
  const process = [
    {
      phase: 'Week 1',
      title: 'Discovery & Planning',
      description: 'We start with in-depth discovery sessions to understand your vision, target market, and business goals. Our team creates detailed wireframes, technical specifications, and a comprehensive project roadmap.',
      deliverables: ['Project roadmap', 'Technical architecture', 'Wireframes', 'Feature prioritization']
    },
    {
      phase: 'Week 2-3',
      title: 'Design & Development Sprint',
      description: 'Our elite developers build your MVP using modern tech stack (React, Node.js, Firebase). We follow agile methodology with daily progress updates and weekly demo sessions.',
      deliverables: ['Core features built', 'Authentication system', 'Database schema', 'UI components']
    },
    {
      phase: 'Week 4',
      title: 'Testing & Launch',
      description: 'Comprehensive testing, bug fixes, performance optimization, and deployment. We ensure your MVP is production-ready with proper security, monitoring, and analytics in place.',
      deliverables: ['QA testing complete', 'Production deployment', 'Documentation', 'Training session']
    }
  ];

  const features = [
    'User Authentication (Email, Social Login)',
    'Responsive UI/UX Design',
    'Database Architecture',
    'API Development',
    'Payment Integration (Stripe)',
    'Admin Dashboard',
    'Real-time Features',
    'Cloud Deployment',
    'Analytics Integration',
    'Email Notifications',
    'Security Best Practices',
    'Documentation'
  ];

  const pricingTiers = [
    {
      name: 'Starter MVP',
      price: '$12,000',
      duration: '4 weeks',
      description: 'Perfect for validating your idea with early users',
      features: [
        'Up to 5 core features',
        'React + Firebase stack',
        'User authentication',
        'Responsive design',
        'Basic admin panel',
        '1 round of revisions',
        '30 days support'
      ],
      popular: false
    },
    {
      name: 'Growth MVP',
      price: '$18,000',
      duration: '6 weeks',
      description: 'Best for startups seeking funding and rapid user growth',
      features: [
        'Up to 10 core features',
        'Full-stack (React + Node.js)',
        'Payment integration',
        'Advanced analytics',
        'Custom admin dashboard',
        '2 rounds of revisions',
        '60 days support',
        'API documentation'
      ],
      popular: true
    },
    {
      name: 'Enterprise MVP',
      price: '$28,000',
      duration: '8 weeks',
      description: 'For complex products requiring advanced features',
      features: [
        'Unlimited features',
        'Custom tech stack',
        'AI/ML integration',
        'Multi-platform (Web + Mobile)',
        'Advanced security',
        'Unlimited revisions',
        '90 days support',
        'Dedicated team'
      ],
      popular: false
    }
  ];

  const caseStudies = [
    {
      company: 'TaskFlow',
      result: 'Secured $500K seed funding',
      time: '6 weeks',
      image: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      company: 'Ifyify',
      result: 'Launched to 1,000+ users',
      time: '2 weeks',
      image: 'https://images.pexels.com/photos/3861458/pexels-photo-3861458.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const faqs = [
    {
      question: 'What exactly is included in an MVP?',
      answer: 'An MVP includes your core features, user authentication, responsive design, database setup, hosting, and basic analytics. We focus on the essential functionality needed to validate your idea and attract early users, not bells and whistles that slow you down.'
    },
    {
      question: 'Can you really build an MVP in 30 days?',
      answer: 'Absolutely. We\'ve delivered 50+ MVPs using our proven process and modern tech stack. By focusing on core features, using pre-built components where appropriate, and following agile methodology, we consistently deliver production-ready MVPs in 4-8 weeks.'
    },
    {
      question: 'What tech stack do you use?',
      answer: 'We primarily use React/TypeScript for frontend, Node.js for backend, and Firebase/Supabase for database. This stack is proven, scalable, and allows rapid development. For specific requirements, we can adapt to Next.js, Python, or other technologies.'
    },
    {
      question: 'Do you provide support after launch?',
      answer: 'Yes! All packages include post-launch support (30-90 days depending on tier). This covers bug fixes, minor adjustments, and technical guidance as you onboard your first users. Extended support and feature development packages are available.'
    },
    {
      question: 'How do I know if I need an MVP?',
      answer: 'If you have an idea but haven\'t validated it with real users, you need an MVP. If you\'re seeking funding and need a working product to show investors, you need an MVP. If you want to test market demand before building a full product, you need an MVP.'
    },
    {
      question: 'What happens after the MVP is live?',
      answer: 'After launch, you\'ll gather user feedback and usage data. We can then help you iterate with Phase 2 development, adding features based on real user needs. Many of our MVP clients secure funding and scale to full products with our ongoing support.'
    }
  ];

  return (
    <PageTransition>
      <SEO
        title="SaaS MVP Development | Build & Launch in 30 Days | Zumetrix Labs"
        description="Launch your SaaS MVP in 30 days with Zumetrix Labs. Expert React, Node.js & Firebase development. $12K starting price. 100% client satisfaction. 85% funding success rate."
        keywords="MVP development, SaaS MVP, startup MVP, rapid prototyping, React development, Firebase, MVP in 30 days, startup development, venture capital MVP"
      />

      <section className="pt-24 md:pt-32 pb-12 md:pb-16 bg-gradient-to-br from-background via-background to-primary/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center px-4 py-2 bg-primary/10 backdrop-blur-xl border border-primary/20 rounded-full text-sm font-medium text-primary mb-6"
            >
              <Rocket className="w-4 h-4 mr-2" />
              SaaS MVP Development
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 tracking-tight">
              Launch Your SaaS MVP in
              <span className="block bg-shimmer bg-clip-text text-transparent mt-2">
                30 Days or Less
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              From idea to production-ready product. We build scalable SaaS MVPs using React, Node.js & Firebase that secure funding and attract users. <span className="font-semibold text-foreground">85% of our MVPs secure funding within 6 months.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center px-8 py-4 bg-foreground text-background rounded-xl font-semibold hover:opacity-90 transition-all duration-150"
              >
                Start Your MVP
                <ArrowRight size={20} className="ml-2" />
              </motion.a>
              <motion.a
                href="#pricing"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center px-8 py-4 bg-card border border-border text-foreground rounded-xl font-semibold hover:border-primary/50 transition-all duration-150"
              >
                View Pricing
              </motion.a>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-primary" />
                <span>4-8 week delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-primary" />
                <span>100% satisfaction rate</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-primary" />
                <span>Fixed-price packages</span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our 30-Day MVP Process
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              A proven methodology that's delivered 50+ successful MVPs
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {process.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-card border border-border rounded-2xl p-8 hover:border-primary/30 transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl mb-4">
                  <span className="text-xl font-bold text-primary">{index + 1}</span>
                </div>
                <div className="text-sm font-semibold text-primary mb-2">{step.phase}</div>
                <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">{step.description}</p>
                <div className="space-y-2">
                  {step.deliverables.map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Transparent, Fixed Pricing
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              No hidden fees. No hourly rates. Just clear packages designed for startups.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`bg-card border rounded-2xl p-8 hover:shadow-xl transition-all duration-300 ${
                  tier.popular ? 'border-primary shadow-glow' : 'border-border'
                }`}
              >
                {tier.popular && (
                  <div className="inline-flex items-center px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-xs font-semibold text-primary mb-4">
                    <Star size={12} className="mr-1" />
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold text-foreground mb-2">{tier.name}</h3>
                <p className="text-muted-foreground mb-4">{tier.description}</p>
                <div className="mb-6">
                  <div className="text-4xl font-bold text-foreground">{tier.price}</div>
                  <div className="text-sm text-muted-foreground">{tier.duration} delivery</div>
                </div>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="/contact"
                  className={`block text-center px-6 py-3 rounded-xl font-semibold transition-all duration-150 ${
                    tier.popular
                      ? 'bg-foreground text-background hover:opacity-90'
                      : 'bg-card border border-border text-foreground hover:border-primary/50'
                  }`}
                >
                  Get Started
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
          </AnimatedSection>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card border border-border rounded-xl p-6"
              >
                <h3 className="text-lg font-semibold text-foreground mb-2">{faq.question}</h3>
                <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Ready to Build Your MVP?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join 50+ founders who've launched successful products with Zumetrix Labs. Let's turn your idea into reality.
            </p>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center px-8 py-4 bg-foreground text-background rounded-xl font-semibold hover:opacity-90 transition-all duration-150"
            >
              Start Your Project Today
              <ArrowRight size={20} className="ml-2" />
            </motion.a>
          </AnimatedSection>
        </div>
      </section>
    </PageTransition>
  );
};

export default MVPDevelopmentPage;
