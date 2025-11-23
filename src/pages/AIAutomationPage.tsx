import React from 'react';
import { motion } from 'framer-motion';
import { Brain, CheckCircle2, Clock, DollarSign, Zap, ArrowRight, Star, TrendingUp, BarChart3 } from 'lucide-react';
import SEO from '../components/common/SEO';
import PageTransition from '../components/common/PageTransition';
import AnimatedSection from '../components/common/AnimatedSection';

const AIAutomationPage: React.FC = () => {
  const useCases = [
    {
      icon: '📧',
      title: 'Email Automation',
      description: 'Automatically categorize, respond to, and route emails based on content and urgency',
      timeSaved: '65%',
      examples: ['Customer support triage', 'Sales lead qualification', 'Internal communications']
    },
    {
      icon: '📊',
      title: 'Data Processing',
      description: 'Extract, transform, and analyze data from documents, spreadsheets, and databases',
      timeSaved: '80%',
      examples: ['Invoice processing', 'Report generation', 'Data entry automation']
    },
    {
      icon: '💬',
      title: 'Customer Support',
      description: 'AI chatbots and intelligent routing that handle common queries 24/7',
      timeSaved: '60%',
      examples: ['FAQ automation', 'Ticket routing', 'Multi-language support']
    },
    {
      icon: '📅',
      title: 'Workflow Automation',
      description: 'Connect your apps and automate repetitive tasks across your entire tech stack',
      timeSaved: '75%',
      examples: ['CRM updates', 'Slack notifications', 'Calendar management']
    },
    {
      icon: '📈',
      title: 'Analytics & Reporting',
      description: 'Automated data collection, analysis, and report generation with AI insights',
      timeSaved: '70%',
      examples: ['Sales dashboards', 'Performance reports', 'Trend analysis']
    },
    {
      icon: '🤖',
      title: 'AI Content Generation',
      description: 'Generate marketing copy, product descriptions, and personalized content at scale',
      timeSaved: '85%',
      examples: ['Product descriptions', 'Email campaigns', 'Social media posts']
    }
  ];

  const technologies = [
    {
      name: 'OpenAI GPT-4',
      description: 'Advanced natural language processing and generation',
      use: 'Chatbots, content generation, document analysis'
    },
    {
      name: 'Zapier & Make.com',
      description: 'No-code automation platforms connecting 5,000+ apps',
      use: 'Workflow automation, app integrations'
    },
    {
      name: 'n8n',
      description: 'Self-hosted automation for complete control',
      use: 'Custom workflows, data processing'
    },
    {
      name: 'Custom AI Models',
      description: 'Tailored machine learning solutions',
      use: 'Specialized automation, predictive analytics'
    }
  ];

  const pricingTiers = [
    {
      name: 'Starter Automation',
      price: '$5,000',
      duration: '2 weeks',
      description: 'Perfect for automating 1-2 key processes',
      features: [
        '1-2 automated workflows',
        'OpenAI integration',
        'Zapier/Make.com setup',
        'Up to 3 app integrations',
        'Basic AI training',
        'Documentation',
        '30 days support'
      ],
      popular: false
    },
    {
      name: 'Growth Automation',
      price: '$8,000',
      duration: '4 weeks',
      description: 'Best for scaling operations with multiple automations',
      features: [
        '3-5 automated workflows',
        'Advanced AI integration',
        'Custom chatbot development',
        'Up to 10 app integrations',
        'Advanced AI training',
        'Analytics dashboard',
        '60 days support',
        'Ongoing optimization'
      ],
      popular: true
    },
    {
      name: 'Enterprise Automation',
      price: '$15,000+',
      duration: '6-8 weeks',
      description: 'Complete automation overhaul for your organization',
      features: [
        'Unlimited workflows',
        'Custom AI model development',
        'Enterprise integrations',
        'Dedicated automation engineer',
        'Advanced security protocols',
        'Custom analytics',
        '90 days support',
        'Priority updates'
      ],
      popular: false
    }
  ];

  const process = [
    {
      phase: 'Week 1',
      title: 'Process Audit & Strategy',
      description: 'We analyze your current workflows, identify automation opportunities, and calculate potential ROI. Our team maps out your processes and creates a prioritized automation roadmap.',
      deliverables: ['Process documentation', 'ROI calculation', 'Automation roadmap', 'Tech stack recommendations']
    },
    {
      phase: 'Week 2-3',
      title: 'Build & Integration',
      description: 'We develop your custom automation workflows, integrate AI models, and connect all your apps. Testing happens throughout to ensure reliability and accuracy.',
      deliverables: ['Automated workflows', 'AI integration', 'App connections', 'Testing & QA']
    },
    {
      phase: 'Week 4',
      title: 'Training & Launch',
      description: 'We train your team, document everything, and launch your automations. Post-launch monitoring ensures everything runs smoothly and delivers expected results.',
      deliverables: ['Team training', 'Documentation', 'Launch support', 'Performance monitoring']
    }
  ];

  const caseStudy = {
    company: 'RetailOps Enterprise',
    industry: 'E-commerce',
    challenge: 'Processing 10,000+ orders daily manually, leading to errors and delays',
    solution: 'Automated order processing, inventory management, and customer communications',
    results: [
      { metric: '75%', label: 'Reduction in processing time' },
      { metric: '99.5%', label: 'Order accuracy achieved' },
      { metric: '50%', label: 'Cost savings annually' },
      { metric: '$2M+', label: 'Saved in operational costs' }
    ],
    testimonial: {
      quote: 'Zumetrix Labs completely transformed our operation. The automation platform they built has saved us hundreds of hours monthly and significantly reduced errors.',
      author: 'James Mitchell',
      role: 'Operations Director'
    }
  };

  const faqs = [
    {
      question: 'How quickly will I see ROI from automation?',
      answer: 'Most clients see immediate time savings (50-80% reduction in manual work) and achieve full ROI within 3-6 months. The exact timeline depends on the complexity of your processes and automation scope. Our average client saves $50K+ annually in operational costs.'
    },
    {
      question: 'Do I need technical expertise to use these automations?',
      answer: 'No! We build user-friendly automations that your team can use without technical knowledge. We provide comprehensive training and documentation, and most workflows run automatically in the background. You focus on your business, not managing technology.'
    },
    {
      question: 'Can you integrate with our existing tools?',
      answer: 'Yes. We work with 5,000+ apps including Salesforce, HubSpot, Slack, Google Workspace, Microsoft 365, QuickBooks, Shopify, and more. If your tools have APIs, we can integrate them. For proprietary systems, we can build custom integrations.'
    },
    {
      question: 'What if our processes change?',
      answer: 'Automations are flexible and can be updated as your business evolves. All packages include initial revisions, and we offer ongoing support packages for continuous optimization. Many clients start with basic automations and expand as they see results.'
    },
    {
      question: 'Is my data secure with AI automation?',
      answer: 'Absolutely. We follow enterprise-grade security practices, use encrypted connections, and never store sensitive data unnecessarily. For OpenAI integrations, we implement strict privacy controls. Your data security is our top priority.'
    },
    {
      question: 'Can you automate processes unique to my industry?',
      answer: 'Yes! While we have templates for common workflows, we specialize in custom automation for unique business processes. We\'ve automated workflows in healthcare, legal, finance, e-commerce, logistics, and more. Every business is different, and we tailor solutions to your specific needs.'
    }
  ];

  return (
    <PageTransition>
      <SEO
        title="AI Automation Services | Save 70% Time & Costs | Zumetrix Labs"
        description="Transform your operations with AI automation. OpenAI integration, workflow automation, custom chatbots. $5K starting price. Average client saves $50K+ annually. 100% satisfaction."
        keywords="AI automation, OpenAI integration, workflow automation, business process automation, chatbot development, RPA, intelligent automation, AI consulting"
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
              <Brain className="w-4 h-4 mr-2" />
              AI Automation & Workflows
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 tracking-tight">
              Automate Your Business
              <span className="block bg-shimmer bg-clip-text text-transparent mt-2">
                Save 70% on Operations
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              Transform repetitive tasks into automated workflows powered by AI. <span className="font-semibold text-foreground">Our clients save an average of $50K+ annually</span> while eliminating errors and freeing teams to focus on high-value work.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center px-8 py-4 bg-foreground text-background rounded-xl font-semibold hover:opacity-90 transition-all duration-150"
              >
                Get Free Automation Audit
                <ArrowRight size={20} className="ml-2" />
              </motion.a>
              <motion.a
                href="#roi-calculator"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center px-8 py-4 bg-card border border-border text-foreground rounded-xl font-semibold hover:border-primary/50 transition-all duration-150"
              >
                Calculate Your Savings
              </motion.a>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-primary" />
                <span>70-80% time reduction</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-primary" />
                <span>$50K+ avg annual savings</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-primary" />
                <span>2-4 week delivery</span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What Can You Automate?
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              From customer support to data processing, we automate workflows across your entire organization
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card border border-border rounded-2xl p-6 hover:border-primary/30 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{useCase.icon}</div>
                <h3 className="text-xl font-bold text-foreground mb-2">{useCase.title}</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">{useCase.description}</p>
                <div className="inline-flex items-center px-3 py-1 bg-primary/10 rounded-full text-sm font-semibold text-primary mb-3">
                  <TrendingUp size={14} className="mr-1" />
                  {useCase.timeSaved} time saved
                </div>
                <ul className="space-y-1">
                  {useCase.examples.map((example, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="text-primary mt-1 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{example}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Real Results from Real Clients
            </h2>
          </AnimatedSection>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card border border-border rounded-3xl p-8 md:p-12"
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center px-3 py-1 bg-primary/10 rounded-full text-sm font-semibold text-primary mb-4">
                  {caseStudy.industry}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">{caseStudy.company}</h3>
                <div className="space-y-4 mb-6">
                  <div>
                    <div className="text-sm font-semibold text-primary mb-1">The Challenge</div>
                    <p className="text-muted-foreground">{caseStudy.challenge}</p>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-primary mb-1">Our Solution</div>
                    <p className="text-muted-foreground">{caseStudy.solution}</p>
                  </div>
                </div>
                <div className="bg-background/50 rounded-xl p-6 border border-border/50">
                  <p className="text-muted-foreground italic mb-4">"{caseStudy.testimonial.quote}"</p>
                  <div>
                    <div className="font-semibold text-foreground">{caseStudy.testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{caseStudy.testimonial.role}</div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {caseStudy.results.map((result, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-6 text-center"
                  >
                    <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">{result.metric}</div>
                    <div className="text-sm text-muted-foreground">{result.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Automation Process
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              A proven methodology that delivers measurable results in weeks, not months
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

      <section id="pricing" className="py-16 md:py-24 bg-card/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Transparent, Fixed Pricing
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              No hourly rates. No surprises. Just clear packages with guaranteed ROI.
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

      <section className="py-16 md:py-24 bg-background">
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
              Ready to Automate Your Business?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Get a free automation audit and discover how much time and money you could save. No obligation.
            </p>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center px-8 py-4 bg-foreground text-background rounded-xl font-semibold hover:opacity-90 transition-all duration-150"
            >
              Get Free Automation Audit
              <ArrowRight size={20} className="ml-2" />
            </motion.a>
          </AnimatedSection>
        </div>
      </section>
    </PageTransition>
  );
};

export default AIAutomationPage;
