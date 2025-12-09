import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, CheckCircle2, Clock, DollarSign, Code, ArrowRight, Star, Zap, Globe } from 'lucide-react';
import SEO from '../components/common/SEO';
import PageTransition from '../components/common/PageTransition';
import AnimatedSection from '../components/common/AnimatedSection';

const MobileAppPage: React.FC = () => {
  const appTypes = [
    {
      icon: '📱',
      title: 'Native iOS & Android',
      description: 'Platform-specific apps built with Swift and Kotlin for maximum performance',
      features: ['Best performance', 'Native UI/UX', 'Full device access', 'App Store optimized'],
      bestFor: 'Gaming, AR/VR, performance-critical apps'
    },
    {
      icon: '⚛️',
      title: 'React Native',
      description: 'Cross-platform apps with 95% code sharing between iOS and Android',
      features: ['Single codebase', '95% code reuse', 'Fast development', 'Native performance'],
      bestFor: 'Business apps, social platforms, e-commerce'
    },
    {
      icon: '🦋',
      title: 'Flutter',
      description: 'Beautiful, natively compiled apps with Google-backed technology',
      features: ['Stunning UI', 'Fast rendering', 'Hot reload', 'Web support'],
      bestFor: 'MVP apps, fintech, healthcare apps'
    },
    {
      icon: '🌐',
      title: 'Progressive Web Apps',
      description: 'Web apps that feel native with offline capabilities and app-like experience',
      features: ['No app store', 'Cross-platform', 'Instant updates', 'SEO friendly'],
      bestFor: 'Content apps, dashboards, lightweight apps'
    }
  ];

  const features = [
    {
      icon: '🔐',
      title: 'Secure Authentication',
      description: 'Biometric login, OAuth, JWT, multi-factor auth'
    },
    {
      icon: '💳',
      title: 'Payment Integration',
      description: 'Apple Pay, Google Pay, Stripe, in-app purchases'
    },
    {
      icon: '🔔',
      title: 'Push Notifications',
      description: 'FCM, APNs, segmented messaging, deep linking'
    },
    {
      icon: '📍',
      title: 'Location Services',
      description: 'GPS, geofencing, maps integration, location tracking'
    },
    {
      icon: '📷',
      title: 'Camera & Media',
      description: 'Photo/video capture, filters, image processing, AR'
    },
    {
      icon: '🔄',
      title: 'Real-time Sync',
      description: 'Offline mode, background sync, real-time updates'
    },
    {
      icon: '📊',
      title: 'Analytics & Tracking',
      description: 'User behavior, crash reporting, performance monitoring'
    },
    {
      icon: '🌍',
      title: 'Multi-language',
      description: 'Localization, RTL support, regional customization'
    }
  ];

  const process = [
    {
      phase: 'Week 1-2',
      title: 'Discovery & Design',
      description: 'We define your app concept, create wireframes, design UI/UX, and plan technical architecture. You\'ll see exactly what your app will look like before we write any code.',
      deliverables: ['App concept doc', 'Wireframes', 'UI/UX designs', 'Technical spec', 'Project roadmap']
    },
    {
      phase: 'Week 3-8',
      title: 'Development Sprint',
      description: 'Our mobile team builds your app using agile methodology with weekly demos. Features are developed iteratively, tested continuously, and refined based on feedback.',
      deliverables: ['Core features built', 'API integration', 'Testing & QA', 'Beta builds', 'Weekly updates']
    },
    {
      phase: 'Week 9-10',
      title: 'Launch & Optimization',
      description: 'App Store and Google Play submission, marketing materials, final optimizations, and post-launch support. We handle everything to ensure a successful launch.',
      deliverables: ['App Store submission', 'Marketing assets', 'Documentation', 'Training', 'Launch support']
    }
  ];

  const pricingTiers = [
    {
      name: 'Starter App',
      price: '$15,000',
      duration: '8 weeks',
      description: 'Perfect for MVPs and validating your app idea',
      features: [
        'Single platform (iOS or Android)',
        'Up to 5 key screens',
        'User authentication',
        'Basic API integration',
        'Push notifications',
        'App Store submission',
        '30 days support'
      ],
      popular: false
    },
    {
      name: 'Growth App',
      price: '$28,000',
      duration: '10-12 weeks',
      description: 'Best for feature-rich apps targeting both platforms',
      features: [
        'iOS + Android (React Native)',
        'Up to 15 screens',
        'Advanced features',
        'Payment integration',
        'Real-time features',
        'Analytics integration',
        'Both store submissions',
        '60 days support'
      ],
      popular: true
    },
    {
      name: 'Enterprise App',
      price: '$50,000+',
      duration: '12-16 weeks',
      description: 'For complex apps with custom requirements',
      features: [
        'Native iOS + Android',
        'Unlimited screens',
        'Complex integrations',
        'Offline functionality',
        'Advanced security',
        'Custom backend',
        'Full deployment',
        '90 days priority support'
      ],
      popular: false
    }
  ];

  const caseStudies = [
    {
      name: 'WellnessTracker',
      type: 'Health & Fitness',
      result: '50K+ downloads in 30 days',
      rating: '4.8/5',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'LogiTrack',
      type: 'Logistics',
      result: '30% faster deliveries',
      rating: '4.9/5',
      image: 'https://images.pexels.com/photos/7688880/pexels-photo-7688880.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const faqs = [
    {
      question: 'Should I build for iOS, Android, or both?',
      answer: 'It depends on your audience and budget. If you\'re targeting US/Europe, start with iOS as users spend more. For global reach, Android has more users. For startups, we recommend React Native or Flutter to target both platforms with one codebase, saving 40-50% in costs while reaching 100% of the market.'
    },
    {
      question: 'How long does it take to build a mobile app?',
      answer: 'Simple apps take 6-8 weeks, feature-rich apps take 10-12 weeks, and complex apps take 12-16 weeks. Timeline depends on features, platform choice (native vs. cross-platform), design complexity, and integrations. We provide detailed timelines after understanding your requirements.'
    },
    {
      question: 'What\'s the difference between native and cross-platform?',
      answer: 'Native apps (Swift/Kotlin) are built separately for iOS and Android, offering best performance and full device access but costing 2x more. Cross-platform (React Native/Flutter) uses one codebase for both platforms, saving time and money while delivering 95% of native performance. We recommend cross-platform for most business apps.'
    },
    {
      question: 'How much does app maintenance cost?',
      answer: 'Budget 15-20% of development cost annually for maintenance. This covers OS updates, bug fixes, performance optimization, and minor updates. All our packages include initial post-launch support (30-90 days). After that, we offer maintenance packages starting at $2K/month depending on complexity.'
    },
    {
      question: 'Can you help with App Store submission?',
      answer: 'Yes! All packages include App Store and Google Play submission. We handle developer accounts (if needed), app screenshots, descriptions, privacy policies, and submission process. We navigate Apple/Google review processes and address any rejection issues until your app is live.'
    },
    {
      question: 'What if I need changes after the app launches?',
      answer: 'All packages include post-launch support (30-90 days) for bug fixes and minor adjustments. For new features or significant changes, we offer flexible ongoing development packages. Most clients continue working with us for Phase 2 features based on real user feedback and analytics.'
    }
  ];

  return (
    <PageTransition>
      <SEO
        title="Mobile App Development | iOS & Android Apps | Zumetrix Labs"
        description="Expert mobile app development services. React Native, Flutter, native iOS/Android. $15K starting price. 50K+ downloads achieved. 4.8+ average rating. 100% satisfaction."
        keywords="mobile app development, iOS development, Android development, React Native, Flutter, cross-platform apps, native app development, app design"
      />

      <section className="pt-24 md:pt-32 pb-12 md:pb-16 bg-gradient-to-br from-background via-background to-primary/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center px-4 py-2 bg-primary/10 backdrop-blur-xl border border-primary/20 rounded-full text-sm font-medium text-primary mb-6"
            >
              <Smartphone className="w-4 h-4 mr-2" />
              Mobile App Development
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 tracking-tight">
              Build Mobile Apps That
              <span className="block bg-shimmer bg-clip-text text-transparent mt-2">
                Users Love & Investors Fund
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              From concept to App Store. We build iOS, Android, and cross-platform apps that drive engagement and growth. <span className="font-semibold text-foreground">Our apps average 4.8+ ratings and 50K+ downloads.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center px-8 py-4 bg-foreground text-background rounded-xl font-semibold hover:opacity-90 transition-all duration-150"
              >
                Start Your App Project
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
                <span>8-12 week delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-primary" />
                <span>4.8+ avg rating</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-primary" />
                <span>App Store submission</span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Choose Your Platform
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We build apps using the technology that best fits your goals, budget, and timeline
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {appTypes.map((type, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card border border-border rounded-2xl p-6 hover:border-primary/30 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{type.icon}</div>
                <h3 className="text-xl font-bold text-foreground mb-2">{type.title}</h3>
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{type.description}</p>
                <div className="space-y-2 mb-4">
                  {type.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-xs text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-4 border-t border-border">
                  <div className="text-xs text-muted-foreground">Best for:</div>
                  <div className="text-sm font-medium text-foreground">{type.bestFor}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Features We Build
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              From authentication to real-time sync, we implement features that users expect
            </p>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-all duration-300 text-center"
              >
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Development Process
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              A proven workflow that delivers apps on time, on budget, with high ratings
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
              No hidden fees. Clear packages. Guaranteed delivery.
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
              Ready to Build Your App?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's discuss your app idea and create a roadmap to launch. Free consultation, no obligation.
            </p>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center px-8 py-4 bg-foreground text-background rounded-xl font-semibold hover:opacity-90 transition-all duration-150"
            >
              Schedule Free Consultation
              <ArrowRight size={20} className="ml-2" />
            </motion.a>
          </AnimatedSection>
        </div>
      </section>
    </PageTransition>
  );
};

export default MobileAppPage;
