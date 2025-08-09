// SEO Configuration for Zumetrix Labs
// Global SEO settings and structured data

export const SEO_CONFIG = {
  // Basic Site Info
  siteName: "Zumetrix Labs",
  siteUrl: "https://zumetrix.com",
  defaultTitle: "Zumetrix Labs | Expert Software Development Agency | SaaS MVP, React/Node.js, AI Automation",
  defaultDescription: "Pakistan's leading software development agency founded by expert developers Zia Hussain and Syed Omer Shah. We specialize in SaaS MVP development, React/Node.js applications, AI automation services, mobile app development, Firebase integration, and custom software solutions.",
  
  // Global Keywords
  globalKeywords: [
    "Zumetrix Labs",
    "Zia Hussain",
    "Syed Omer Shah", 
    "software development agency Pakistan",
    "SaaS MVP development",
    "React developer Pakistan",
    "Node.js development",
    "Firebase experts",
    "AI automation services",
    "mobile app development Pakistan",
    "custom software solutions",
    "web development company",
    "startup MVP builder",
    "no-code automation",
    "business automation Pakistan"
  ],

  // International Target Markets
  targetMarkets: {
    primary: ["Pakistan", "United States", "United Kingdom", "Canada", "Australia"],
    cities: [
      // Pakistan
      "Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad",
      // US
      "San Francisco", "New York", "Austin", "Seattle", "Los Angeles", "Boston", "Chicago",
      // UK
      "London", "Manchester", "Birmingham", "Edinburgh", "Bristol",
      // Canada
      "Toronto", "Vancouver", "Montreal", "Calgary", "Ottawa",
      // EU
      "Berlin", "Munich", "Amsterdam", "Stockholm", "Copenhagen", "Zurich", "Dublin",
      // Middle East
      "Dubai", "Abu Dhabi", "Riyadh", "Doha", "Kuwait City",
      // APAC
      "Singapore", "Sydney", "Melbourne", "Auckland", "Hong Kong"
    ]
  },

  // Service-Specific Keywords
  serviceKeywords: {
    saas: [
      "SaaS MVP development",
      "SaaS product development", 
      "startup MVP builder",
      "React SaaS development",
      "Firebase SaaS",
      "SaaS dashboard development",
      "MVP development agency",
      "SaaS development company"
    ],
    react: [
      "React development agency",
      "React developer Pakistan",
      "Next.js development",
      "TypeScript development",
      "React Node.js agency",
      "frontend development Pakistan",
      "React dashboard development"
    ],
    ai: [
      "AI automation services",
      "OpenAI integration",
      "ChatGPT automation",
      "AI workflow automation",
      "business process automation",
      "AI chatbot development",
      "machine learning solutions"
    ],
    mobile: [
      "mobile app development Pakistan",
      "React Native development",
      "Flutter app development",
      "iOS app development",
      "Android app development",
      "cross-platform app development"
    ],
    firebase: [
      "Firebase development",
      "Firebase experts Pakistan",
      "Firestore development",
      "Firebase authentication",
      "Firebase hosting",
      "Firebase cloud functions"
    ]
  },

  // Founder Keywords
  founderKeywords: [
    "Zia Hussain developer",
    "Syed Zia Hussain Shah",
    "Zia Hussain software engineer",
    "Zia Hussain CEO Zumetrix",
    "Syed Omer Shah developer",
    "Syed Omer Shah CTO",
    "Pakistani software developers",
    "top developers Pakistan"
  ],

  // Intent-Based Keywords
  intentKeywords: [
    "hire React developer",
    "hire Node.js developer", 
    "hire Firebase expert",
    "build SaaS product",
    "launch MVP fast",
    "software development agency",
    "custom app development",
    "AI automation company",
    "mobile app developers",
    "web development services"
  ],

  // Schema.org Structured Data
  organizationSchema: {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://zumetrix.com/#organization",
    "name": "Zumetrix Labs",
    "alternateName": ["Zumetrix", "Zometrix"],
    "url": "https://zumetrix.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://zumetrix.com/logo.png",
      "width": 512,
      "height": 512
    },
    "description": "Pakistan's leading software development agency specializing in SaaS MVP development, React/Node.js applications, AI automation services, and mobile app development.",
    "foundingDate": "2021",
    "founders": [
      {
        "@type": "Person",
        "name": "Zia Hussain",
        "alternateName": "Syed Zia Hussain Shah",
        "jobTitle": "Co-Founder & CEO",
        "worksFor": {
          "@id": "https://zumetrix.com/#organization"
        },
        "sameAs": [
          "https://www.upwork.com/freelancers/ziahussain1",
          "https://www.fiverr.com/syedziashahgill",
          "https://www.linkedin.com/in/zia-hussain-404-/",
          "https://github.com/zia-hussain"
        ]
      },
      {
        "@type": "Person", 
        "name": "Syed Omer Shah",
        "jobTitle": "Co-Founder & CTO",
        "worksFor": {
          "@id": "https://zumetrix.com/#organization"
        },
        "sameAs": [
          "https://www.linkedin.com/in/omer-gillani/",
          "https://github.com/UmerGillani36"
        ]
      }
    ],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "Pakistan",
      "addressRegion": "Punjab"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+92-XXX-XXXXXXX",
      "contactType": "customer service",
      "email": "hello@zumetrix.com",
      "availableLanguage": ["English", "Urdu"]
    },
    "sameAs": [
      "https://www.linkedin.com/company/zumetrix-labs",
      "https://github.com/zumetrix-labs",
      "https://www.instagram.com/zumetrixlabs",
      "https://x.com/zumetrix83892"
    ],
    "areaServed": [
      {
        "@type": "Country",
        "name": "Pakistan"
      },
      {
        "@type": "Place", 
        "name": "Worldwide"
      }
    ]
  },

  // Open Graph Defaults
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Zumetrix Labs",
    images: [
      {
        url: "https://zumetrix.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Zumetrix Labs - Pakistan's Leading Software Development Agency"
      }
    ]
  },

  // Twitter Card Defaults
  twitter: {
    card: "summary_large_image",
    site: "@zumetrixlabs",
    creator: "@ziahussain"
  }
};

// Service-specific SEO configurations
export const SERVICE_SEO = {
  "saas-mvp": {
    title: "SaaS MVP Development for Startups: Timeline, Cost & Tech Stack | Zumetrix Labs",
    description: "Build production-ready SaaS MVPs in weeks using React, Node.js, and Firebase. Clear process, transparent pricing, and support from idea to launch.",
    keywords: "SaaS MVP development, React SaaS, startup MVP, Firebase SaaS, MVP development agency Pakistan"
  },
  "react-dashboards": {
    title: "React + Node Dashboards: Real-Time Analytics for Founders | Zumetrix Labs", 
    description: "Custom React dashboards with real-time data, beautiful UI, and scalable Node.js backends. Perfect for SaaS products and business intelligence.",
    keywords: "React dashboard development, Node.js backend, real-time analytics, custom dashboards, data visualization"
  },
  "ai-automation": {
    title: "AI Automation & No-Code Workflows: Cut Ops Time by 40-70% | Zumetrix Labs",
    description: "Streamline operations with AI automation, OpenAI integration, and no-code workflows. Reduce manual work and increase efficiency.",
    keywords: "AI automation, OpenAI integration, no-code automation, business process automation, workflow automation"
  },
  "firebase-apps": {
    title: "Firebase Apps & Integrations: Auth, Firestore, Cloud Functions | Zumetrix Labs",
    description: "Expert Firebase development services including authentication, Firestore databases, cloud functions, and hosting solutions.",
    keywords: "Firebase development, Firestore, Firebase authentication, Firebase hosting, Firebase experts Pakistan"
  }
};

export default SEO_CONFIG;