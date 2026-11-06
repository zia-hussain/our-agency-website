import { FACTS } from "../config/facts";
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
    mockups: [
      "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/3861458/pexels-photo-3861458.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },

  // Company Logos Carousel - INFINITE SMOOTH SLIDER
  // Client logos. `permitted` is written-permission status: only permitted
  // logos render anywhere on the site (TrustTicker). Set it to true the day a
  // client confirms in writing; nothing else needs to change.
  companyLogosCarousel: {
    logos: [
      { name: "Tech Skills", imageUrl: "/companies_logos/techskills.webp", permitted: false },
      { name: "Floating Stone Ranch", imageUrl: "/companies_logos/fsr.webp", permitted: false },
      { name: "Safco", imageUrl: "/companies_logos/safco.webp", permitted: false },
      { name: "Skills X Swap", imageUrl: "/companies_logos/skillsxswap.webp", permitted: false },
      { name: "Bio Tech Energy (BTE)", imageUrl: "/companies_logos/bte.webp", permitted: false },
    ],
  },

  trustBand: {
    globalStats: [
      { icon: "projects", value: FACTS.counts.projectsShipped, label: "Projects delivered" },
      { icon: "globe", value: FACTS.counts.clients, label: "Clients on four continents" },
      { icon: "reviews", value: FACTS.counts.writtenReviews, label: "Written reviews, five platforms" },
      { icon: "success", value: "Founder-led", label: "Zia and Omer on every project" },
    ],
    clients: [
      {
        name: "Forlag",
        slug: "forlag-publishing-sales-inventory-dashboard",
        country: "Norway",
        industry: "Publishing & Book Sales",
        project: "Sales & Inventory Dashboard",
      },
      {
        name: "Floating Stone Ranch",
        slug: "floating-stone-ranch-processor-intake-engine",
        country: "Canada",
        industry: "Beef Processing & Logistics",
        project: "Processor Intake & Logistics Automation",
      },
      {
        name: "Skill x Swap",
        slug: "skill-x-swap-mvp",
        country: "United Kingdom",
        industry: "EdTech & Skill Sharing",
        project: "Credit-Based Marketplace MVP",
      },
    ],
  },

  // Services Preview - CONVERSION FOCUSED
  servicesPreview: {
    services: [
      {
        id: "saas-mvp",
        icon: "rocket",
        title: "SaaS MVP Development",
        oneLiner:
          "Launch a focused SaaS product in 4-8 weeks with a foundation built to grow",
        description:
          "A production-ready SaaS platform built on React, Node.js, and Firebase — user authentication, payment processing, and real-time features included, not bolted on later.",
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
          "Turn repetitive manual work into workflows that run without you",
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
          "One codebase, both app stores, no compromise on how it feels",
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
      "Three things we do that cost us some deals and keep the rest.",
    sections: [
      {
        icon: "problem",
        title: "We'll tell you not to build it.",
        description:
          "Every rescue assessment we sell can end with \"keep what you have\" — it costs the same either way. Every build starts by writing down what the first version won't include. Founders who want a yes to everything leave; the ones who stay get software that was decided, not accumulated.",
        stats: "Decided before it's built",
      },
      {
        icon: "approach",
        title: "The people who scoped it build it.",
        description:
          "Zia and Omer are on the first call, write the scope, and are still answering the thread after launch — with a small specialist team across design, development, QA and automation doing the work beside them. No handoff to a team you've never met.",
        stats: "Founders close, delivery deep",
      },
      {
        icon: "results",
        title: "We'd rather be checkable than impressive.",
        description:
          FACTS.counts.writtenReviews + " written reviews sit on Fiverr, Upwork, Trustpilot, Clutch and Google — platforms we can't edit, including the one 4.3. Every number on this site traces to a record, every case study says what the client reported versus what we measured, and every price is published before the call.",
        stats: "Prices before the call",
      },
    ],
    cta: {
      text: "See how we work",
      link: "/about#how-we-build",
    },
  },


  // Founders Strip - EXPERT CREDIBILITY
  foundersStrip: {
    title: "Founder-led from",
    themedTitle: "strategy through delivery",
    subtitle:
      "Zia owns what gets built and why; Omer owns how it gets built and that it holds. Both stay on every engagement from first call to after launch, with a small specialist team across design, development, QA and automation behind them.",
    founders: [
      {
        name: "Zia Hussain",
        fullName: "Syed Zia Hussain Shah",
        role: "Co-Founder & CEO",
        credibility: [
          "Decides what gets built first, not just what's asked for",
          "Keeps scope honest instead of just big",
          "Has shipped the code, not just managed it",
        ],
        expertise: [
          "React/TypeScript",
          "Business Strategy",
          "Client Success",
          "SaaS Architecture",
        ],
        achievements: "Turns business problems into focused product decisions",
        image: "/profile_images/zia-hussain-portrait-thumb.webp",
        linkedin: "https://www.linkedin.com/in/zia-hussain-404-/",
        // Website CTAs book through the one company destination (Phase 1,
        // one attributable booking funnel). Zia's personal Calendly remains
        // in use off-site; it is deliberately not linked from the website.
        calendly: "https://calendly.com/zumetrix-labs/consultation",
      },
      {
        name: "Omer Gillani",
        fullName: "Syed Omer Shah Gillani",
        role: "Co-Founder & CTO",
        credibility: [
          "Builds systems that survive contact with real users",
          "Designs the automation instead of just wiring up Zapier",
          "Writes code meant to still hold up at 10x the load",
        ],

        expertise: [
          "AI Automation",
          "System Architecture",
          "Cloud Infrastructure",
          "Performance Optimization",
        ],
        achievements: "Turns product decisions into maintainable software",
        image: "/profile_images/omer-gillani-portrait-thumb.webp",
        linkedin: "https://www.linkedin.com/in/omer-gillani/",
        calendly: "https://calendly.com/zumetrix-labs/consultation",
      },
    ],
  },

  // Tech Stack Band - CORE CAPABILITIES
  techStack: {
    subtitle:
      "React when it's right. Python when that's better. No-code when it ships faster and holds up. Here's the full range we build with.",
  },

  // Final CTA
  finalCTA: {
    headline: `${BRAND_CONTENT.finalCTA.headline.line1} ${BRAND_CONTENT.finalCTA.headline.line2}`,
    subtitle:
      "Book a 30-minute call. No pitch, no pressure. We'll ask questions, challenge assumptions, and tell you if we're the right fit.",
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
    projectsCompleted: FACTS.counts.projectsShipped,
    happyClients: FACTS.counts.clients,
    avgMVPTime: "Scope dependent",
    fundingSuccess: "Not claimed",
    clientSatisfaction: "Project references available",
    countriesServed: "Global",
    responseTime: "2 business days",
  },

};

// API-ready data access functions
export const getSiteData = () => SITE_DATA;
export const getHeroData = () => SITE_DATA.hero;
export const getServicesPreview = () => SITE_DATA.servicesPreview;
export const getFounders = () => SITE_DATA.foundersStrip.founders;
export const getMetrics = () => SITE_DATA.metrics;
