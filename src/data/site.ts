// Zumetrix Labs - Complete Site Data

export const SITE_DATA = {
  // Company Information
  company: {
    name: import.meta.env.VITE_COMPANY_NAME || "Zumetrix Labs",
    tagline:
      import.meta.env.VITE_COMPANY_TAGLINE ||
      "Forge Your Digital Empire. Conquer Tomorrow.",
    email: import.meta.env.VITE_COMPANY_EMAIL || "hello@zumetrix.com",
    phone: import.meta.env.VITE_COMPANY_PHONE || "+92 XXX XXXXXXX",
    address: import.meta.env.VITE_COMPANY_ADDRESS || "Pakistan",
    website: import.meta.env.VITE_COMPANY_WEBSITE || "https://www.zumetrix.com",
  },

  // Hero Section Data
  hero: {
    overline: "Software Development for Founders",
    headline: "We build software for founders who need thinking partners, not order-takers",
    subtext: "50+ projects built. Some raised funding. Some didn't. The difference was usually how clear the problem was. We push back on unclear ideas, challenge assumptions, and say no when it makes sense. That's uncomfortable. It's also why our projects actually launch.",
    primaryCTA: {
      text: "Start Your Project",
      link: "/contact",
    },
    secondaryCTA: {
      text: "View Our Work",
      link: "/portfolio",
    },
    proofPoints: [
      { icon: "star", text: "5.0 rating" },
      { icon: "projects", text: "50+ projects" },
      { icon: "reviews", text: "100% 5-star reviews" },
      { icon: "speed", text: "<30d MVP delivery" },
    ],
    mockups: [
      "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/3861458/pexels-photo-3861458.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },

  // Company Logos Carousel - INFINITE SMOOTH SLIDER
  companyLogosCarousel: {
    eyebrow: "TRUSTED BY INDUSTRY LEADERS",
    title: "Proud to collaborate with ",
    themedTitle:"exceptional companies",
    logos: [
      { name: "Google", imageUrl: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/google.svg" },
      { name: "Microsoft", imageUrl: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/microsoft.svg" },
      { name: "Apple", imageUrl: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/apple.svg" },
      { name: "Amazon", imageUrl: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/amazon.svg" },
      { name: "Meta", imageUrl: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/meta.svg" },
      { name: "Netflix", imageUrl: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/netflix.svg" },
      { name: "Spotify", imageUrl: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/spotify.svg" },
      { name: "Tesla", imageUrl: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/tesla.svg" },
    ]
  },

  // Trust Band - GLOBAL CLIENT SHOWCASE
  trustBand: {
    title:
      "Trusted by Leading Global Companies ",
    themedTitle: "Across International Markets",
    subtitle:
      "From Silicon Valley startups to London enterprises - we deliver software that solves real problems",
    globalStats: [
      { icon: "globe", value: "Global", label: "Market Reach" },
      { icon: "projects", value: "50+", label: "Projects Delivered" },
      { icon: "success", value: "100%", label: "Success Rate" },
      { icon: "response", value: "85%", label: "Funding Success" },
    ],
    clients: [
      {
        name: "Best Business Services",
        country: "United States",
        industry: "AI & Business Tools",
        project: "AI Personal Branding Platform",
      },
      {
        name: "WellnessPath Technologies",
        country: "Canada",
        industry: "Healthcare & Wellness",
        project: "Mobile Health Tracking App",
      },
      {
        name: "RetailOps Enterprise",
        country: "United Kingdom",
        industry: "E-commerce & Retail",
        project: "Automation Platform",
      },
      {
        name: "TaskFlow Solutions",
        country: "Australia",
        industry: "Productivity Software",
        project: "Project Management MVP",
      },
      {
        name: "EduTech Institute",
        country: "Singapore",
        industry: "Education Technology",
        project: "Online Learning Platform",
      },
      {
        name: "LogiCorp International",
        country: "UAE",
        industry: "Logistics & Supply Chain",
        project: "Smart Delivery System",
      },
    ],
  },

  // Services Preview - CONVERSION FOCUSED
  servicesPreview: {
    title: "Enterprise-Grade Software Development Services",
    subtitle:
      "From SaaS MVPs to AI automation - we deliver solutions that drive measurable business growth",
    services: [
      {
        id: "saas-mvp",
        icon: "rocket",
        title: "SaaS MVP Development",
        oneLiner:
          "Launch your SaaS product in 30 days with enterprise-grade architecture",
        description:
          "Transform your business idea into a production-ready SaaS platform using React, Node.js, and Firebase. Complete with user authentication, payment processing, and real-time features.",
        pricing: "Starting at $12,000",
        timeline: "4-8 weeks",
        popular: true,
        bullets: [
          "React/TypeScript + Node.js full-stack development",
          "Stripe payments + Firebase authentication integrated",
          "Real-time features + comprehensive analytics dashboard",
          "Enterprise security + scalable cloud architecture",
        ],
        link: "/services/saas-mvp-development",
      },
      {
        id: "ai-automation",
        icon: "brain",
        title: "AI Automation & Workflows",
        oneLiner:
          "Automate business processes and scale operations intelligently",
        description:
          "Streamline your operations with custom AI workflows, OpenAI integration, and no-code automation solutions that reduce manual work by 70%.",
        pricing: "Starting at $8,000",
        timeline: "2-6 weeks",
        popular: false,
        bullets: [
          "OpenAI integration + custom AI workflow development",
          "No-code automation (Zapier, Make.com, n8n) setup",
          "Business process optimization + intelligent chatbots",
          "Document processing + data extraction automation",
        ],
        link: "/services/ai-automation-solutions",
      },
      {
        id: "web-mobile",
        icon: "devices",
        title: "Web & Mobile Applications",
        oneLiner:
          "Cross-platform applications that feel native and perform flawlessly",
        description:
          "Build responsive web applications and cross-platform mobile apps using React Native and modern web technologies for global audiences.",
        pricing: "Starting at $15,000",
        timeline: "6-12 weeks",
        popular: false,
        bullets: [
          "React Native + Flutter cross-platform development",
          "Progressive Web Apps (PWA) with offline support",
          "Enterprise-grade security + performance optimization",
          "App Store deployment + ongoing maintenance support",
        ],
        link: "/services/mobile-app-development",
      },
    ],
  },

  // Signature Method - WHY CHOOSE ZUMETRIX
  signatureMethod: {
    title: "Why Founders Choose Us (And Why Some Don't)",
    subtitle:
      "We're technical. We're direct. We've done this before.",
    sections: [
      {
        icon: "problem",
        title: "The Problem With Most Agencies",
        description:
          "Most agencies say yes to everything. Vague ideas become vague products. Six months later, nothing works. We ask uncomfortable questions early because we'd rather lose a deal than build something that fails.",
        stats: "Most projects fail from unclear thinking",
      },
      {
        icon: "approach",
        title: "How We Work Different",
        description:
          "We push back on unclear ideas. We challenge assumptions. We say no when it makes sense. Our founders personally architect every solution. Not order-takers—thinking partners.",
        stats: "Top Rated on Upwork",
      },
      {
        icon: "results",
        title: "What Actually Happens",
        description:
          "50+ projects delivered in the last 3 years. Some raised funding. Some didn't. The difference? How clear the problem was before we started building. We help with that clarity.",
        stats: "4-6 week average delivery",
      },
    ],
    cta: {
      text: "See Our Process",
      link: "/about#process",
    },
  },

  // Featured Case Studies - SUCCESS STORIES
  featuredCaseStudies: {
    title: "Success Stories from Global Markets",
    subtitle:
      "Real results for real businesses across US, UK, Canada, Australia, UAE & Singapore",
    cta: {
      text: "View All Projects",
      link: "/portfolio",
    },
  },

  // Founders Strip - EXPERT CREDIBILITY
  foundersStrip: {
    title: "Led By Experienced Founders",
    themedTitle: "From Silicon Valley to Global",
    subtitle:
      "Combined 7+ years building successful products for international markets and scaling startups",
    founders: [
      {
        name: "Zia Hussain",
        fullName: "Syed Zia Hussain Shah",
        role: "Co-Founder & CEO",
        credibility: [
          "Expert React/Node.js developer",
          "50+ international projects",
          "Business strategy specialist",
        ],
        expertise: [
          "React/TypeScript",
          "Business Strategy",
          "Client Success",
          "SaaS Architecture",
        ],
        achievements: "Led 30+ successful MVP launches",
        image: "/zia-hussain-founder.png",
        linkedin: "https://www.linkedin.com/in/zia-hussain-404-/",
        calendly: "https://calendly.com/zia-hussain/consultation",
      },
      {
        name: "Syed Omer Shah",
        fullName: "Syed Omer Shah",
        role: "Co-Founder & CTO",
        credibility: [
          "AI automation expert",
          "Scalable architecture specialist",
          "Enterprise systems architect",
        ],

        expertise: [
          "AI Automation",
          "System Architecture",
          "Cloud Infrastructure",
          "Performance Optimization",
        ],
        achievements: "Built systems serving 100K+ users",
        image: "/syed-omer-shah-founder.png",
        linkedin: "https://www.linkedin.com/in/omer-gillani/",
        calendly: "https://calendly.com/omer_shah/consultation",
      },
    ],
  },

  // Tech Stack Band - CORE CAPABILITIES
  techStack: {
    title: "Modern Technologies",
    themedTitle: "Powering Your Success",
    subtitle:
      "Modern, scalable, and battle-tested tools used by leading tech companies to build enterprise solutions",
    coreCapabilities: [
      {
        icon: "frontend",
        title: "Frontend Excellence",
        description: "React, Next.js, TypeScript for scalable user interfaces",
        technologies: ["React", "Next.js", "TypeScript", "TailwindCSS"],
      },
      {
        icon: "backend",
        title: "Backend Mastery",
        description:
          "Node.js, Python, databases for robust server architecture",
        technologies: ["Node.js", "Python", "PostgreSQL", "MongoDB"],
      },
      {
        icon: "cloud",
        title: "Cloud Infrastructure",
        description: "AWS, Firebase, Vercel for global deployment and scaling",
        technologies: ["AWS", "Firebase", "Vercel", "Docker"],
      },
      {
        icon: "ai",
        title: "AI Integration",
        description:
          "OpenAI, automation workflows for intelligent business solutions",
        technologies: ["OpenAI", "LangChain", "Zapier", "Make.com"],
      },
      {
        icon: "mobile",
        title: "Mobile Development",
        description:
          "React Native, Flutter for cross-platform mobile excellence",
        technologies: ["React Native", "Flutter", "Expo", "App Store"],
      },
    ],
  },

  // Testimonials - SOCIAL PROOF CAROUSEL
  testimonials: [
    {
      id: 1,
      quote:
        "Zumetrix Labs delivered exactly what we envisioned and more. The AI integration is seamless, the user experience is fantastic, and the code quality is exceptional. Looking forward to Phase 2 expansion!",
      author: "Kelly Andrews",
      role: "Founder & CEO",
      company: "Best Business Services",
      country: "United States",
      project: "Ifyify - AI Personal Branding Tool",
      avatar:
        "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=150",
      rating: 5,
      results: "300% user engagement increase",
      industry: "AI & Business Tools",
    },
    {
      id: 2,
      quote:
        "The team at Zumetrix Labs created an amazing wellness app that our users absolutely love. The AI insights feature is particularly impressive and has become our key differentiator in the market.",
      author: "Sarah Johnson",
      role: "CEO & Co-Founder",
      company: "WellnessPath Technologies",
      country: "Canada",
      project: "WellnessTracker Mobile App",
      avatar:
        "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=150",
      rating: 5,
      results: "50K+ downloads in 30 days",
      industry: "Healthcare Technology",
    },
    {
      id: 3,
      quote:
        "Zumetrix Labs completely transformed our entire operation. The automation platform they built has saved us hundreds of hours monthly and significantly reduced errors while allowing us to scale confidently.",
      author: "James Mitchell",
      role: "Operations Director",
      company: "RetailOps Enterprise",
      country: "United Kingdom",
      project: "E-commerce Automation Platform",
      avatar:
        "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150",
      rating: 5,
      results: "75% cost reduction achieved",
      industry: "E-commerce & Retail",
    },
    {
      id: 4,
      quote:
        "Zumetrix Labs helped us build and launch our MVP in record time. The quality was exceptional and it directly contributed to our successful $500K funding round. Their expertise was invaluable.",
      author: "Michael Chen",
      role: "Founder & CEO",
      company: "TaskFlow Solutions",
      country: "Australia",
      project: "Project Management MVP",
      avatar:
        "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150",
      rating: 5,
      results: "$500K funding secured",
      industry: "Productivity Software",
    },
    {
      id: 5,
      quote:
        "The EduPlatform has revolutionized our teaching capabilities. Students are more engaged, instructors have better tools, and our operational efficiency has improved dramatically.",
      author: "Dr. Amanda Lee",
      role: "Director of Technology",
      company: "EduTech Institute",
      country: "Singapore",
      project: "Online Learning Platform",
      avatar:
        "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150",
      rating: 5,
      results: "5K+ active students onboarded",
      industry: "Education Technology",
    },
    {
      id: 6,
      quote:
        "LogiTrack has transformed our delivery operations completely. The route optimization alone has saved us thousands in fuel costs, and our customers love the real-time tracking.",
      author: "Ahmed Al-Rashid",
      role: "Operations Manager",
      company: "LogiCorp International",
      country: "UAE",
      project: "Smart Delivery & Logistics App",
      avatar:
        "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150",
      rating: 5,
      results: "30% delivery time reduction",
      industry: "Logistics & Supply Chain",
    },
  ],

  // Final CTA
  finalCTA: {
    headline: "Have a project? Let's talk.",
    subtitle:
      "Book a 30-minute call. No pitch, no pressure. We'll ask questions, challenge assumptions, and tell you honestly if we're the right fit.",
    primaryCTA: {
      text: "Book Free Strategy Call",
      link: "https://calendly.com/zumetrix-labs/consultation",
    },
    secondaryCTA: {
      text: "Send Project Brief",
      link: "/contact",
    },
    trustSignals: [
      "24-hour response guaranteed",
      "Expert insights & strategy",
      "No obligation consultation",
    ],
    globalProof: {
      clients: "50+ international clients",
      countries: "6 countries served",
      satisfaction: "100% client satisfaction",
      delivery: "30-day average MVP delivery",
    },
  },

  // Business Metrics - CREDIBILITY NUMBERS
  metrics: {
    projectsCompleted: import.meta.env.VITE_PROJECTS_COMPLETED || "50+",
    happyClients: import.meta.env.VITE_HAPPY_CLIENTS || "25+",
    yearsExperience: import.meta.env.VITE_YEARS_EXPERIENCE || "6+",
    successRate: import.meta.env.VITE_SUCCESS_RATE || "100%",
    avgMVPTime: "30 days",
    fundingSuccess: "85%",
    clientSatisfaction: "100%",
    countriesServed: "6",
    responseTime: "24 hours",
  },

  // Client Logos & Trust Badges
  clientLogos: {
    title: "Trusted by Leading",
    themedTitle: " Startups & Enterprises",
    subtitle: "50+ projects delivered across US, UK, Canada, Australia, UAE, and Singapore",
    trustBadges: [
      {
        value: '5.0',
        label: 'Rating',
        subtext: 'Based on 50+ projects',
        icon: 'award'
      },
      {
        value: '100%',
        label: 'Satisfaction',
        subtext: 'Client success rate',
        icon: 'users'
      },
      {
        value: '50+',
        label: 'Projects',
        subtext: 'Delivered globally',
        icon: 'briefcase'
      },
      {
        value: 'Top Rated',
        label: 'On Upwork',
        subtext: '100% Job Success',
        icon: 'star'
      }
    ],
    clients: [
      { name: 'Ifyify', industry: 'SaaS Platform' },
      { name: 'RetailOps', industry: 'E-Commerce' },
      { name: 'TaskFlow', industry: 'Productivity' },
      { name: 'EduTech', industry: 'Education' },
      { name: 'WellnessPath', industry: 'Healthcare' },
      { name: 'LogiCorp', industry: 'Logistics' },
    ],
    bottomBadge: {
      rating: '5.0',
      reviews: '50+ client reviews',
      satisfaction: '100% satisfaction rate'
    }
  },

  // Lead Magnet - MVP Blueprint
  leadMagnet: {
    badge: 'Free Download',
    title: 'Get Your Free',
    highlight: '30-Day SaaS MVP Blueprint',
    description: 'Download our comprehensive guide: The exact process we use to build production-ready MVPs in 30 days. Includes timeline breakdown, tech stack recommendations, feature prioritization framework, and launch checklist.',
    features: [
      { title: 'Step-by-Step Process', desc: 'From idea to launch' },
      { title: 'Tech Stack Guide', desc: 'What to use & why' },
      { title: 'Launch Checklist', desc: 'Ready-to-use template' }
    ],
    bottomFeatures: [
      '10-page PDF guide',
      'Proven frameworks',
      'Used by 50+ startups'
    ],
    formSubject: 'New Lead Magnet Download: MVP Blueprint',
    privacy: 'No spam. Unsubscribe anytime. We respect your privacy.',
    successMessage: {
      title: 'Success! Check Your Email',
      description: 'We\'ve sent the MVP Blueprint to',
      cta: 'While you\'re here, want to discuss your project?',
      ctaLink: '/contact',
      ctaText: 'Book a free consultation'
    }
  },

  // AI ROI Calculator Configuration
  aiROICalculator: {
    badge: 'Interactive ROI Calculator',
    title: 'See Your',
    highlight: 'Automation Savings',
    description: 'Calculate exactly how much time and money AI automation could save your team',
    defaults: {
      employees: 5,
      avgHourlyRate: 50,
      hoursPerWeek: 5,
      processType: 'data_entry'
    },
    limits: {
      employees: { min: 1, max: 500 },
      avgHourlyRate: { min: 15, max: 300 },
      hoursPerWeek: { min: 1, max: 40 }
    },
    processTypes: [
      { id: 'data_entry', name: 'Data Entry & Processing', reduction: 80, icon: '📊' },
      { id: 'customer_support', name: 'Customer Support', reduction: 60, icon: '💬' },
      { id: 'reporting', name: 'Reports & Analytics', reduction: 70, icon: '📈' },
      { id: 'scheduling', name: 'Scheduling & Coordination', reduction: 75, icon: '📅' },
      { id: 'email_mgmt', name: 'Email Management', reduction: 65, icon: '📧' }
    ],
    automationCost: 5000,
    reportIncludes: [
      'Automation strategy tailored to your process',
      'Phase-by-phase implementation roadmap',
      'Technology stack recommendations',
      'Detailed cost & timeline breakdown'
    ],
    formSubject: 'AI ROI Calculator - Custom Report Request',
    successMessage: {
      title: 'Report Sent Successfully!',
      ctaText: 'Book Free Consultation',
      ctaLink: '/contact'
    }
  },
};

// API-ready data access functions
export const getSiteData = () => SITE_DATA;
export const getHeroData = () => SITE_DATA.hero;
export const getServicesPreview = () => SITE_DATA.servicesPreview;
export const getTestimonials = () => SITE_DATA.testimonials;
export const getFeaturedTestimonials = () => SITE_DATA.testimonials.slice(0, 3);
export const getFounders = () => SITE_DATA.foundersStrip.founders;
export const getMetrics = () => SITE_DATA.metrics;
export const getClientLogosData = () => SITE_DATA.clientLogos;
export const getLeadMagnetData = () => SITE_DATA.leadMagnet;
export const getAIROICalculatorData = () => SITE_DATA.aiROICalculator;
