// Zumetrix Labs - Complete Site Data (API-Ready Architecture)
// All site content centralized for easy management and future API migration

export const SITE_DATA = {
  // Company Information
  company: {
    name: import.meta.env.VITE_COMPANY_NAME || "Zumetrix Labs",
    tagline: import.meta.env.VITE_COMPANY_TAGLINE || "We build world-class software solutions",
    email: import.meta.env.VITE_COMPANY_EMAIL || "hello@zumetrix.com",
    phone: import.meta.env.VITE_COMPANY_PHONE || "+92 XXX XXXXXXX",
    address: import.meta.env.VITE_COMPANY_ADDRESS || "Pakistan",
    website: import.meta.env.VITE_COMPANY_WEBSITE || "https://www.zumetrix.com",
  },

  // Hero Section Data
  hero: {
    overline: "Software for Startups & Enterprises",
    headline: "From idea to MVP in 30 days. Then to scale.",
    subtext: "Trusted by 50+ clients in the US, UK, EU & GCC. React/Node.js, Next.js, Firebase, OpenAI automation.",
    primaryCTA: {
      text: "Start Your Project",
      link: "/contact"
    },
    secondaryCTA: {
      text: "View Our Work", 
      link: "/portfolio"
    },
    proofPoints: [
      { icon: "star", text: "5.0 rating" },
      { icon: "projects", text: "50+ projects" },
      { icon: "reviews", text: "100% 5-star reviews" },
      { icon: "speed", text: "<30d MVP delivery" }
    ],
    mockups: [
      "/project_images/YOU AS ART.png",
      "/project_images/FIT-GENIUS-FINAL.png", 
      "/project_images/task_manager_portfolio_img.jpg"
    ]
  },

  // Trust Band
  trustBand: {
    title: "Trusted by teams in the US, UK, EU & GCC",
    clients: [
      { name: "Best Business Services", logo: "/client-logos/best-business.png", country: "United States" },
      { name: "WellnessPath", logo: "/client-logos/wellnesspath.png", country: "Canada" },
      { name: "RetailOps Enterprise", logo: "/client-logos/retailops.png", country: "United Kingdom" },
      { name: "TaskFlow", logo: "/client-logos/taskflow.png", country: "Australia" },
      { name: "EduTech Institute", logo: "/client-logos/edutech.png", country: "Singapore" },
      { name: "LogiCorp Solutions", logo: "/client-logos/logicorp.png", country: "UAE" }
    ]
  },

  // Services Preview
  servicesPreview: {
    title: "World-Class Software Development Services",
    subtitle: "From enterprise web applications to AI automation - we deliver solutions that scale globally",
    services: [
      {
        id: "saas-mvp",
        icon: "rocket",
        title: "SaaS MVP Development",
        oneLiner: "Launch your SaaS product in weeks, not months",
        bullets: [
          "React/TypeScript + Node.js architecture",
          "Stripe payments + Firebase authentication", 
          "Real-time features + analytics dashboard"
        ],
        link: "/services/startup-mvp-development"
      },
      {
        id: "ai-automation", 
        icon: "brain",
        title: "AI Automation & Agents",
        oneLiner: "Automate workflows and scale intelligently",
        bullets: [
          "OpenAI integration + custom AI workflows",
          "No-code automation (Zapier, Make.com, n8n)",
          "Business process optimization + chatbots"
        ],
        link: "/services/ai-automation-solutions"
      },
      {
        id: "web-mobile",
        icon: "devices", 
        title: "Web & Mobile Apps",
        oneLiner: "Cross-platform apps that feel native",
        bullets: [
          "React Native + Flutter development",
          "Progressive Web Apps (PWA) support",
          "Enterprise-grade security + performance"
        ],
        link: "/services/enterprise-web-applications"
      }
    ]
  },

  // Signature Method
  signatureMethod: {
    title: "Why Global Enterprises Choose Zumetrix Labs",
    subtitle: "Our proven methodology delivers exceptional results for international clients",
    sections: [
      {
        icon: "problem",
        title: "The Challenge",
        description: "Most agencies deliver generic solutions that don't scale. Startups waste months on MVPs that never launch. Enterprises struggle with legacy systems that can't adapt to modern business needs."
      },
      {
        icon: "approach",
        title: "Our Approach", 
        description: "We combine technical excellence with business strategy. Our founders personally architect every solution using modern tech stacks, ensuring scalable foundations that grow with your business across global markets."
      },
      {
        icon: "results",
        title: "The Results",
        description: "85% of our MVPs secure funding. Enterprise clients see 40-70% operational improvements. 100% client satisfaction with our founder-led approach and world-class delivery standards."
      }
    ],
    cta: {
      text: "See Our Process",
      link: "/about#process"
    }
  },

  // Featured Case Studies
  featuredCaseStudies: {
    title: "Success Stories from Global Clients",
    subtitle: "Real results for real businesses across international markets",
    cta: {
      text: "See All Projects",
      link: "/portfolio"
    }
  },

  // Founders Strip
  foundersStrip: {
    title: "Meet the Expert Founders",
    subtitle: "World-class developers serving international clients",
    founders: [
      {
        name: "Zia Hussain",
        fullName: "Syed Zia Hussain Shah",
        role: "Co-Founder & CEO",
        credibility: "Expert React/Node.js developer with 50+ successful international projects",
        image: "/zia-hussain-founder.png",
        linkedin: "https://www.linkedin.com/in/zia-hussain-404-/",
        calendly: "https://calendly.com/zia-hussain/consultation"
      },
      {
        name: "Syed Omer Shah", 
        fullName: "Syed Omer Shah",
        role: "Co-Founder & CTO",
        credibility: "AI automation expert and scalable architecture specialist",
        image: "/syed-omer-shah-founder.png",
        linkedin: "https://www.linkedin.com/in/omer-gillani/",
        calendly: "https://calendly.com/omer-shah/consultation"
      }
    ]
  },

  // Tech Stack Band
  techStack: {
    title: "Enterprise-Grade Technology Stack",
    subtitle: "Modern, battle-tested technologies for speed, scale, and security",
    technologies: [
      { name: "React", category: "Frontend" },
      { name: "Next.js", category: "Framework" },
      { name: "Node.js", category: "Backend" },
      { name: "TypeScript", category: "Language" },
      { name: "Firebase", category: "Database" },
      { name: "OpenAI", category: "AI" },
      { name: "Stripe", category: "Payments" },
      { name: "Vercel", category: "Hosting" }
    ]
  },

  // Testimonials
  testimonials: [
    {
      id: 1,
      quote: "Zumetrix Labs delivered exactly what we envisioned and more. The AI integration is seamless, the user experience is fantastic, and the code quality is exceptional. Looking forward to Phase 2 expansion!",
      author: "Kelly Andrews",
      role: "Founder",
      company: "Best Business Services",
      country: "United States",
      project: "Ifyify - AI Personal Branding Tool",
      avatar: "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=150",
      rating: 5,
      results: "+300% user engagement"
    },
    {
      id: 2,
      quote: "The team at Zumetrix Labs created an amazing wellness app that our users absolutely love. The AI insights feature is particularly impressive and has become our key differentiator in the market.",
      author: "Sarah Johnson",
      role: "CEO",
      company: "WellnessPath",
      country: "Canada", 
      project: "WellnessTracker Mobile App",
      avatar: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=150",
      rating: 5,
      results: "50K+ downloads in 30 days"
    },
    {
      id: 3,
      quote: "Zumetrix Labs completely transformed our entire operation. The automation platform they built has saved us hundreds of hours monthly and significantly reduced errors while allowing us to scale confidently.",
      author: "James Mitchell",
      role: "Operations Director", 
      company: "RetailOps Enterprise",
      country: "United Kingdom",
      project: "E-commerce Automation Platform",
      avatar: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150",
      rating: 5,
      results: "75% cost reduction"
    },
    {
      id: 4,
      quote: "Zumetrix Labs helped us build and launch our MVP in record time. The quality was exceptional and it directly contributed to our successful $500K funding round. Their expertise was invaluable.",
      author: "Michael Chen",
      role: "Founder",
      company: "TaskFlow",
      country: "Australia",
      project: "Project Management MVP",
      avatar: "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150", 
      rating: 5,
      results: "$500K funding secured"
    },
    {
      id: 5,
      quote: "The EduPlatform has revolutionized our teaching capabilities. Students are more engaged, instructors have better tools, and our operational efficiency has improved dramatically.",
      author: "Dr. Amanda Lee",
      role: "Director of Technology",
      company: "EduTech Institute", 
      country: "Singapore",
      project: "Online Learning Platform",
      avatar: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150",
      rating: 5,
      results: "5K+ active students"
    },
    {
      id: 6,
      quote: "LogiTrack has transformed our delivery operations completely. The route optimization alone has saved us thousands in fuel costs, and our customers love the real-time tracking.",
      author: "Ahmed Al-Rashid",
      role: "Operations Manager",
      company: "LogiCorp Solutions",
      country: "UAE",
      project: "Smart Delivery & Logistics App",
      avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150",
      rating: 5,
      results: "30% delivery time reduction"
    }
  ],

  // Final CTA
  finalCTA: {
    headline: "Ready to Build Something Exceptional?",
    subtitle: "Join 50+ successful clients who've transformed their businesses with Zumetrix Labs",
    primaryCTA: {
      text: "Book Free Consultation",
      link: "https://calendly.com/zumetrix-labs/consultation"
    },
    secondaryCTA: {
      text: "Send Project Brief",
      link: "/contact"
    },
    trustSignals: [
      "No obligation",
      "Expert insights", 
      "24-hour response"
    ]
  },

  // Business Metrics
  metrics: {
    projectsCompleted: import.meta.env.VITE_PROJECTS_COMPLETED || "50+",
    happyClients: import.meta.env.VITE_HAPPY_CLIENTS || "25+", 
    yearsExperience: import.meta.env.VITE_YEARS_EXPERIENCE || "3+",
    successRate: import.meta.env.VITE_SUCCESS_RATE || "100%",
    avgMVPTime: "30 days",
    fundingSuccess: "85%",
    clientSatisfaction: "100%"
  }
};

// API-ready data access functions
export const getSiteData = () => SITE_DATA;
export const getHeroData = () => SITE_DATA.hero;
export const getServicesPreview = () => SITE_DATA.servicesPreview;
export const getTestimonials = () => SITE_DATA.testimonials;
export const getFeaturedTestimonials = () => SITE_DATA.testimonials.slice(0, 3);
export const getFounders = () => SITE_DATA.foundersStrip.founders;
export const getMetrics = () => SITE_DATA.metrics;