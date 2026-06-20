// Zumetrix Labs - Complete Site Data
import { BRAND_CONTENT } from "../config/content";

export const SITE_DATA = {
  // Company Information
  company: {
    name: import.meta.env.VITE_COMPANY_NAME || "Zumetrix Labs",
    tagline:
      import.meta.env.VITE_COMPANY_TAGLINE ||
      BRAND_CONTENT.brand.tagline,
    email: import.meta.env.VITE_COMPANY_EMAIL || "hello@zumetrix.com",
    phone: import.meta.env.VITE_COMPANY_PHONE || "+92 (317) 259-6525",
    address: import.meta.env.VITE_COMPANY_ADDRESS || "Pakistan",
    website: import.meta.env.VITE_COMPANY_WEBSITE || "https://zumetrix.com",
  },

  // Hero Section Data
  hero: {
    overline: "Software Development for Founders",
    headline: BRAND_CONTENT.brand.positioningStatement,
    subtext: BRAND_CONTENT.brand.longDescription,
    primaryCTA: {
      text: BRAND_CONTENT.hero.primaryCTA.text,
      link: BRAND_CONTENT.hero.primaryCTA.link,
    },
    secondaryCTA: {
      text: BRAND_CONTENT.hero.secondaryCTA.text,
      link: BRAND_CONTENT.hero.secondaryCTA.link,
    },
    proofPoints: [
      { icon: "star", text: "5.0 rating" },
      { icon: "projects", text: "50+ projects" },
      { icon: "reviews", text: "Top Rated on Upwork" },
      { icon: "speed", text: "4-8 week MVP delivery" },
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
      // { name: "Google", imageUrl: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/google.svg" },
      // { name: "Microsoft", imageUrl: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/microsoft.svg" },
      // { name: "Apple", imageUrl: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/apple.svg" },
      { name: "Tech Skills", imageUrl: "/companies_logos/techskills.png" },
      { name: "Floating Stone Ranch", imageUrl: "/companies_logos/fsr.png" },
      { name: "Safco", imageUrl: "/companies_logos/safco.png" },
      { name: "Skills X Swap", imageUrl: "/companies_logos/skillsxswap.png" },
      { name: "Bio Tech Energy (BTE)", imageUrl: "/companies_logos/bte.png" },
      // { name: "Amazon", imageUrl: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/amazon.svg" },
      // { name: "Meta", imageUrl: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/meta.svg" },
      // { name: "Netflix", imageUrl: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/netflix.svg" },
      // { name: "Spotify", imageUrl: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/spotify.svg" },
      // { name: "Tesla", imageUrl: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/tesla.svg" },
    ]
  },

  // Trust Band - GLOBAL CLIENT SHOWCASE
  trustBand: {
    title:
      "Trusted for focused delivery ",
    themedTitle: "Across real operating businesses",
    subtitle:
      "Founder-led product and engineering work across publishing, operations, marketplaces, and automation.",
    globalStats: [
      { icon: "globe", value: "Global", label: "Market Reach" },
      { icon: "projects", value: "50+", label: "Projects Delivered" },
      { icon: "success", value: "Founder-led", label: "Every Engagement" },
      { icon: "response", value: "3+ years", label: "Building for Clients" },
    ],
    clients: [
      {
        name: "Forlag",
        country: "Norway",
        industry: "Publishing & Book Sales",
        project: "Sales & Inventory Dashboard",
      },
      {
        name: "Floating Stone Ranch",
        country: "Canada",
        industry: "Beef Processing & Logistics",
        project: "Processor Intake & Logistics Automation",
      },
      {
        name: "Skill x Swap",
        country: "United Kingdom",
        industry: "EdTech & Skill Sharing",
        project: "Credit-Based Marketplace MVP",
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
          "Launch a focused SaaS product in 4-8 weeks with a foundation built to grow",
        description:
          "Transform your business idea into a production-ready SaaS platform using React, Node.js, and Firebase. Complete with user authentication, payment processing, and real-time features.",
        pricing: "Starting at $4,800",
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
          "Streamline recurring work with custom AI workflows, OpenAI integration, and practical no-code automation.",
        pricing: "Starting at $2,500",
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
        pricing: "Starting at $5,500",
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

  // Featured Case Studies - SELECTED CLIENT WORK
  featuredCaseStudies: {
    title: "Selected Client Work",
    subtitle:
      "Delivered across publishing, operations and marketplace products for teams in Norway, Canada and the United Kingdom.",
    cta: {
      text: "View All Projects",
      link: "/portfolio",
    },
  },

  // Founders Strip - EXPERT CREDIBILITY
  foundersStrip: {
    title: "Founder-led from",
    themedTitle: "strategy through delivery",
    subtitle:
      "Zia leads product direction and client strategy. Omer leads architecture and engineering delivery.",
    founders: [
      {
        name: "Zia Hussain",
        fullName: "Syed Zia Hussain Shah",
        role: "Co-Founder & CEO",
        credibility: [
          "Product direction and discovery",
          "Client strategy and scope clarity",
          "Full-stack product experience",
        ],
        expertise: [
          "React/TypeScript",
          "Business Strategy",
          "Client Success",
          "SaaS Architecture",
        ],
        achievements: "Turns business problems into focused product decisions",
        image: "/profile_images/zia-hussain-founder-optimized.jpg",
        linkedin: "https://www.linkedin.com/in/zia-hussain-404-/",
        calendly: "https://calendly.com/zia-hussain/consultation",
      },
      {
        name: "Syed Omer Shah",
        fullName: "Syed Omer Shah",
        role: "Co-Founder & CTO",
        credibility: [
          "Software architecture and delivery",
          "Automation and systems design",
          "Scalable full-stack engineering",
        ],

        expertise: [
          "AI Automation",
          "System Architecture",
          "Cloud Infrastructure",
          "Performance Optimization",
        ],
        achievements: "Turns product decisions into maintainable software",
        image: "/profile_images/syed-omer-shah-founder-optimized.jpg",
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
        "The new dashboard finally gives us a clear, real-time picture of our sales and inventory. It feels tailored for our business, not like a generic off-the-shelf tool.",
      author: "Harald",
      role: "Co-owner",
      company: "Forlag",
      country: "Norway",
      project: "Publishing Sales & Inventory Dashboard",
      projectSlug: "forlag-publishing-sales-inventory-dashboard",
      initials: "H",
      rating: 5,
      results: "Project-linked feedback",
      industry: "Publishing & Book Sales",
    },
    {
      id: 2,
      quote:
        "You translated a messy, real-world processing operation into a system that actually makes sense. This will save us time and headaches as we grow.",
      author: "James",
      role: "Owner",
      company: "Floating Stone Ranch",
      country: "Canada",
      project: "Processor Intake & Logistics Automation",
      projectSlug: "floating-stone-ranch-processor-intake-engine",
      initials: "J",
      rating: 5,
      results: "Project-linked feedback",
      industry: "Beef Processing & Logistics",
    },
    {
      id: 3,
      quote:
        "The MVP feels aligned with the exact vision I had in my head. The credits logic and flows are thoughtfully built for future scaling.",
      author: "Sam",
      role: "Founder",
      company: "Skill X Swap",
      country: "United Kingdom",
      project: "Credit-Based Skill Trading Marketplace",
      projectSlug: "skill-x-swap-mvp",
      initials: "S",
      rating: 5,
      results: "Project-linked feedback",
      industry: "EdTech & Skill Sharing",
    },
  ],

  // Final CTA
  finalCTA: {
    headline: `${BRAND_CONTENT.finalCTA.headline.line1} ${BRAND_CONTENT.finalCTA.headline.line2}`,
    subtitle:
      "Book a 30-minute call. No pitch, no pressure. We'll ask questions, challenge assumptions, and tell you honestly if we're the right fit.",
    primaryCTA: {
      text: BRAND_CONTENT.finalCTA.primaryCTA.text,
      link: BRAND_CONTENT.finalCTA.primaryCTA.link,
    },
    secondaryCTA: {
      text: BRAND_CONTENT.finalCTA.secondaryCTA.text,
      link: BRAND_CONTENT.finalCTA.secondaryCTA.link,
    },
    trustSignals: [...BRAND_CONTENT.finalCTA.trustSignals],
    globalProof: {
      clients: "Founder-led delivery",
      countries: "Remote collaboration",
      satisfaction: "Project-specific references",
      delivery: "Focused release planning",
    },
  },

  // Business Metrics - CREDIBILITY NUMBERS
  metrics: {
    projectsCompleted: import.meta.env.VITE_PROJECTS_COMPLETED || "50+",
    happyClients: import.meta.env.VITE_HAPPY_CLIENTS || "25+",
    yearsExperience: import.meta.env.VITE_YEARS_EXPERIENCE || "3+",
    successRate: import.meta.env.VITE_SUCCESS_RATE || "100%",
    avgMVPTime: "Scope dependent",
    fundingSuccess: "Not claimed",
    clientSatisfaction: "Project references available",
    countriesServed: "Global",
    responseTime: "24 hours",
  },

  // Client Logos & Trust Badges
  clientLogos: {
    title: "Trusted across",
    themedTitle: " real product work",
    subtitle: "Software, automation, and product delivery for teams working across multiple markets",
    trustBadges: [
      {
        value: '5.0',
        label: 'Rating',
        subtext: 'Based on 50+ projects',
        icon: 'award'
      },
      {
        value: 'Founder-led',
        label: 'Delivery',
        subtext: 'Direct senior involvement',
        icon: 'users'
      },
      {
        value: '50+',
        label: 'Projects',
        subtext: 'Delivered globally',
        icon: 'briefcase'
      },
      {
        value: '100%',
        label: 'Job Success',
        subtext: 'On Upwork',
        icon: 'star'
      }
    ],
    clients: [
      { name: 'Forlag', industry: 'Publishing' },
      { name: 'Floating Stone Ranch', industry: 'Operations' },
      { name: 'Skill X Swap', industry: 'Marketplace' },
    ],
    bottomBadge: {
      rating: '5.0',
      reviews: '50+ client reviews',
      satisfaction: 'Project references available'
    }
  },

  // Lead Magnet - MVP Blueprint
  leadMagnet: {
    badge: 'Free Download',
    title: 'Get Your Free',
    highlight: '30-Day SaaS MVP Blueprint',
    description: 'A practical planning guide for moving from an idea to a focused first release, with a 30-day framework, stack guidance, feature prioritization, and a launch checklist.',
    features: [
      { title: 'Step-by-Step Process', desc: 'From idea to launch' },
      { title: 'Tech Stack Guide', desc: 'What to use & why' },
      { title: 'Launch Checklist', desc: 'Ready-to-use template' }
    ],
    bottomFeatures: [
      'PDF planning guide',
      'Proven frameworks',
      'Built from 50+ project lessons'
    ],
    formSubject: 'New Lead Magnet Download: MVP Blueprint',
    privacy: 'No spam. Unsubscribe anytime. We respect your privacy.',
    successMessage: {
      title: 'Success! Your request is saved',
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
      title: 'Estimate request saved',
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
