import {
  Monitor,
  Smartphone,
  Database,
  Cog,
  Rocket,
  Palette,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Service {
  id: string;
  slug: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  features: string[];
  technologies: string[];
  price: string;
  popular: boolean;
  image: string;
  methodology: string[];
  problems: string[];
  results: string[];
  relatedProjects?: string[]; // Project IDs
  testimonials?: {
    quote: string;
    author: string;
    role: string;
    company: string;
  }[];
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
}

export const services: Service[] = [
  {
    id: "web-apps",
    slug: "enterprise-web-applications",
    icon: Monitor,
    title: "Enterprise Web Applications",
    subtitle: "Scalable, high-performance digital solutions for global markets",
    description: "Transform your ambitious business vision into powerful, enterprise-grade web applications built for scale, clarity, and long-term maintainability. We build custom platforms using React, Next.js, and TypeScript with cloud-ready architecture designed for serious business workflows.",
    longDescription: "Our enterprise web application development services combine technical excellence with strategic business insight to create digital solutions that transform how your organization operates and serves customers globally. We specialize in building scalable, high-performance web applications using modern React.js, Next.js, TypeScript, and Node.js technologies designed for demanding user loads, speed, and reliability. Our applications are designed with international markets in mind, featuring multi-language support, global CDN optimization, advanced security protocols, and enterprise-grade infrastructure that scales as your business grows across different regions and time zones.",
    features: [
      "React & TypeScript Development with Modern Architecture",
      "Progressive Web App (PWA) Support for Mobile-First Experience", 
      "Optimized Cloud Architecture & Global CDN Deployment",
      "Advanced SEO & Lighthouse Performance Optimization (90+ scores)",
      "Real-time Interactions with WebSockets & Live Updates",
      "REST & GraphQL API Integration with Third-party Services",
      "Responsive, Accessible UI with International Design Standards",
      "Security-minded architecture, access control, and data handling",
      "Multi-language Support & Internationalization (i18n)",
      "Advanced Analytics & Business Intelligence Integration"
    ],
    technologies: ["React", "Next.js", "TypeScript", "Node.js", "Express", "PostgreSQL", "MongoDB", "Prisma", "GraphQL", "REST APIs", "AWS", "Vercel", "Docker", "Redis", "WebSockets", "CI/CD"],
    price: "From $3,500",
    popular: false,
    image: "/services_images/Website.jpg",
    methodology: [
      "Strategic Discovery & Requirements Analysis",
      "System Architecture & Technical Planning", 
      "Agile Development with Weekly Milestones",
      "Comprehensive Testing & Quality Assurance",
      "Performance Optimization & Security Hardening",
      "Deployment & Post-Launch Support"
    ],
    problems: [
      "Legacy systems that can't scale with business growth",
      "Poor user experience leading to customer churn",
      "Manual processes that waste time and resources",
      "Lack of real-time data and business insights",
      "Security vulnerabilities and compliance issues",
      "High maintenance costs and technical debt"
    ],
    results: [
      "Faster application performance through modern front-end architecture",
      "Lower operational friction through cleaner software workflows",
      "Improved user experience across desktop and mobile screens",
      "Faster feature iteration with maintainable code foundations",
      "More reliable deployment patterns for production environments",
      "Security-conscious architecture aligned with business requirements"
    ],
    relatedProjects: ["ifyify-ai-personal-branding", "eduplatform-online-learning"],
    testimonials: [
      {
        quote: "Zumetrix Labs transformed our entire digital infrastructure. The web application they built handles our global operations flawlessly and has become the backbone of our business growth.",
        author: "Michael Chen",
        role: "CTO",
        company: "TechCorp International"
      }
    ],
    seo: {
      title: "Enterprise Web Application Development Services | React, Node.js, TypeScript | Zumetrix Labs",
      description: "Build scalable enterprise web applications with React, Next.js, TypeScript, and Node.js. Expert development services for global businesses seeking high-performance digital solutions.",
      keywords: "enterprise web application development, React development services, Next.js development, TypeScript development, Node.js backend development, scalable web applications, custom web development, enterprise software development"
    }
  },
  {
    id: "saas-mvp-development", 
    slug: "saas-mvp-development",
    icon: Database,
    title: "SaaS MVP Development",
    subtitle: "Launch your SaaS product in weeks, not months",
    description: "Accelerate your startup journey with a focused SaaS MVP development process built around validation, launch speed, and long-term product clarity. We transform ambitious business ideas into market-ready products using React, Node.js, and modern cloud technologies.",
    longDescription: "Our SaaS MVP development service is built for ambitious founders who need to validate a real business idea without creating a bloated first release. We shape the first version around the core user journey, then build production-ready SaaS foundations in 4-8 weeks with authentication, payments, dashboards, real-time features, and cloud infrastructure where they are actually needed. The goal is not to build everything at once. The goal is to launch a focused product that can earn feedback, support early users, and grow without forcing a painful rebuild after the first serious traction.",
    features: [
      "Rapid MVP Development (4-8 weeks from concept to launch)",
      "Real-time Analytics & Business Intelligence Dashboards",
      "Interactive Data Visualization with D3.js & Chart.js", 
      "Multi-tenant Architecture with Role-based Access Control",
      "Automated Reporting & Export Tools for Business Insights",
      "Responsive, Mobile-friendly UI with Dark/Light Theme Support",
      "Stripe Payment Integration & Subscription Management",
      "User Onboarding & Feature Tour Implementation",
      "A/B Testing Framework for Growth Optimization",
      "Comprehensive Admin Panel for Business Management"
    ],
    technologies: ["React", "Next.js", "TypeScript", "Node.js", "Express", "PostgreSQL", "Supabase", "Firebase", "Stripe", "Clerk", "Prisma", "REST APIs", "Vercel", "TailwindCSS", "Analytics", "Admin Dashboards"],
    price: "From $4,800",
    popular: true,
    image: "/services_images/mvp.jpg",
    methodology: [
      "Business Model Validation & Market Research",
      "Feature Prioritization & MVP Scope Definition",
      "Rapid Prototyping & User Experience Design",
      "Agile Development with 1-Week Sprints",
      "User Testing & Feedback Integration",
      "Launch Preparation & Growth Strategy"
    ],
    problems: [
      "Ideas that never get validated due to long development cycles",
      "Running out of funding before reaching market",
      "Building too many features without user validation",
      "Technical debt from rushed development approaches",
      "Inability to scale when users start growing",
      "Lack of proper analytics and business insights"
    ],
    results: [
      "Average 6-week timeline from concept to live product",
      "Focused launch scope designed for fast validation",
      "Cleaner onboarding flows for early user learning",
      "Founder-led product thinking throughout delivery",
      "Strong technical foundation designed for future scaling",
      "Practical delivery model that avoids unnecessary build waste"
    ],
    relatedProjects: ["taskflow-startup-mvp", "ifyify-ai-personal-branding"],
    testimonials: [
      {
        quote: "Zumetrix Labs helped us turn a rough product idea into a launch-ready MVP with the right core features, clean execution, and a foundation we could keep building on.",
        author: "Michael Chen", 
        role: "Founder",
        company: "TaskFlow"
      }
    ],
    seo: {
      title: "SaaS MVP Development Services | React, Node.js, Firebase | Launch in 4-8 Weeks | Zumetrix Labs",
      description: "Build production-ready SaaS MVPs in 4-8 weeks with React, Node.js, and Firebase. Expert MVP development services helping startups validate ideas and launch focused products.",
      keywords: "SaaS MVP development, startup MVP development, React SaaS development, MVP development services, SaaS product development, startup development agency, MVP builder, SaaS development company"
    }
  },
  {
    id: "mobile-apps",
    slug: "mobile-app-development", 
    icon: Smartphone,
    title: "Mobile App Development",
    subtitle: "Cross-platform apps that feel native and perform flawlessly",
    description: "Create focused, cross-platform mobile applications that feel polished across iOS and Android. Using React Native, Expo, and native tooling where needed, we build apps with clear flows, reliable performance, and a foundation that can grow as real users start depending on the product.",
    longDescription: "Our mobile app development expertise spans the complete mobile ecosystem, from initial concept and user experience design to App Store deployment and ongoing maintenance. We specialize in React Native and Flutter development for cross-platform efficiency, but also provide native iOS and Android development when platform-specific features are required. Our mobile applications are built with performance, security, and scalability in mind, incorporating offline functionality, push notifications, real-time synchronization, and seamless integration with backend services and third-party APIs.",
    features: [
      "React Native & Expo Development for Cross-platform Efficiency",
      "Native iOS (Swift) & Android (Kotlin) Development When Needed",
      "Offline Mode & Push Notifications for Enhanced User Engagement", 
      "App Store & Play Store Deployment with Optimization",
      "Device Feature Integrations (Camera, Location, Biometrics)",
      "Performance Monitoring & Crash Analytics with Real-time Alerts",
      "Clean & Responsive UI/UX Design with Platform-specific Guidelines",
      "Backend Integration with Firebase, AWS, or Custom APIs",
      "In-App Purchases & Subscription Management",
      "Social Features & User-Generated Content Systems"
    ],
    technologies: ["React Native", "Expo", "Flutter", "FlutterFlow", "Swift", "Kotlin", "Firebase", "Supabase", "TypeScript", "Node.js", "Redux Toolkit", "Zustand", "REST APIs", "GraphQL", "Push Notifications", "App Store", "Google Play", "Stripe"],
    price: "From $5,500",
    popular: false,
    image: "/services_images/APP.jpg",
    methodology: [
      "Mobile Strategy & Platform Selection",
      "User Experience Design & Prototyping",
      "Cross-platform Development & Testing",
      "App Store Optimization & Submission",
      "Performance Monitoring & Analytics Setup",
      "Post-Launch Support & Feature Updates"
    ],
    problems: [
      "Need to reach both iOS and Android users efficiently",
      "High development costs for separate native apps",
      "Inconsistent user experience across platforms",
      "Complex app store submission and approval processes",
      "Performance issues with hybrid app solutions",
      "Difficulty maintaining and updating multiple codebases"
    ],
    results: [
      "Efficient delivery compared to separate native builds",
      "Shared product foundation between iOS and Android platforms",
      "Native-feeling experiences across iOS and Android",
      "Faster delivery timelines than separate native builds for many business apps",
      "Crash-aware architecture with proper monitoring foundations",
      "Launch-ready app flows designed for real user adoption"
    ],
    relatedProjects: ["wellnesstracker-mobile-app", "logitrack-delivery-mobile"],
    testimonials: [
      {
        quote: "The mobile app Zumetrix Labs built for us exceeded all expectations. It's fast, beautiful, and our users love it. The cross-platform approach saved us months of development time.",
        author: "Sarah Johnson",
        role: "CEO", 
        company: "WellnessPath"
      }
    ],
    seo: {
      title: "Mobile App Development Services | React Native, iOS, Android | Cross-Platform Apps | Zumetrix Labs",
      description: "Expert mobile app development services using React Native, Swift, and Kotlin. Build cross-platform mobile apps that feel native and perform flawlessly on iOS and Android.",
      keywords: "mobile app development, React Native development, iOS app development, Android app development, cross-platform app development, mobile app development services, app development company"
    }
  },
  {
    id: "mvp-development",
    slug: "startup-mvp-development",
    icon: Rocket,
    title: "Startup MVP Development", 
    subtitle: "Validate your business idea with a focused first release",
    description: "Transform your startup vision into a market-ready MVP in 4-8 weeks using a practical methodology that helps entrepreneurs validate business concepts, attract early users, and build scalable foundations for long-term growth.",
    longDescription: "Our startup MVP development service is specifically crafted for ambitious entrepreneurs who need to move fast without compromising on quality. We understand the unique challenges startups face - limited budgets, tight timelines, and the need to validate concepts quickly. Our methodology focuses on building lean but powerful MVPs that solve real problems, attract early adopters, and demonstrate clear value. Every MVP we build is designed with scalability in mind, using architecture and best practices that can support future product growth.",
    features: [
      "Rapid UI/UX Prototyping with User-Centered Design",
      "MVP-First Architecture with Scalability Planning",
      "Integrated AI Workflows (OpenAI, LangChain) for Competitive Edge",
      "Stripe Payments & Firebase Authentication for Quick Launch", 
      "Real-time Feature Support with WebSocket Integration",
      "Analytics & Early User Feedback Systems for Data-Driven Decisions",
      "Demo-Ready Product Flows with Professional Presentation Materials",
      "Growth Hacking Tools & User Acquisition Features",
      "A/B Testing Framework for Feature Validation",
      "Comprehensive Documentation & Handover Process"
    ],
    technologies: ["React", "Next.js", "Node.js", "Firebase", "Supabase", "Vercel", "Stripe", "OpenAI", "TypeScript", "TailwindCSS", "Framer Motion", "Airtable", "Make.com", "Analytics", "Admin Panels", "MVP Architecture"],
    price: "From $4,500",
    popular: true,
    image: "/services_images/SaaS.jpg",
    methodology: [
      "Idea Validation & Market Research",
      "Feature Prioritization & Scope Definition", 
      "Rapid Prototyping & User Testing",
      "Agile Development with Weekly Demos",
      "User Feedback Integration & Iteration",
      "Launch Strategy & Growth Planning"
    ],
    problems: [
      "Great ideas that never get built due to complexity",
      "Running out of funding before reaching market validation",
      "Building too many features without user feedback",
      "Technical challenges that slow down development",
      "Inability to attract early users or clearly communicate product value",
      "Lack of proper foundation for future scaling"
    ],
    results: [
      "Average 6-week timeline from concept to live MVP",
      "Focused MVP scope aligned with business validation",
      "Clearer delivery quality through weekly demos and feedback",
      "Launch-ready flows for early user testing",
      "Scalable foundation designed for long-term product growth",
      "Cleaner onboarding paths for faster user understanding"
    ],
    relatedProjects: ["taskflow-startup-mvp", "ifyify-ai-personal-branding"],
    testimonials: [
      {
        quote: "Zumetrix Labs helped us validate our concept and build an MVP that gave our team a clear product foundation to present, test, and improve.",
        author: "Michael Chen",
        role: "Founder",
        company: "TaskFlow"
      }
    ],
    seo: {
      title: "Startup MVP Development Services | Validate Ideas & Launch Faster | React, Firebase | Zumetrix Labs",
      description: "Build market-ready startup MVPs in 4-8 weeks. Expert MVP development services helping entrepreneurs validate ideas, attract users, and launch focused products with React and Firebase.",
      keywords: "startup MVP development, MVP development services, startup development agency, validate business idea, rapid prototyping, lean startup development, MVP builder"
    }
  },
  {
    id: "automation",
    slug: "ai-automation-solutions",
    icon: Cog,
    title: "AI Automation Solutions",
    subtitle: "Automate workflows and scale your business intelligently", 
    description: "Improve your business operations with intelligent AI automation solutions that reduce manual work, clean up handoffs, and make repeated processes easier to manage. We design and implement custom automation workflows using OpenAI, no-code platforms, and custom development.",
    longDescription: "Our AI automation services transform how businesses operate by implementing intelligent workflows that handle repetitive tasks, process data automatically, and make smart decisions without human intervention. We specialize in creating custom automation solutions using cutting-edge AI technologies like OpenAI's GPT models, combined with powerful no-code platforms like Make.com, Zapier, and n8n. Our automation solutions integrate seamlessly with your existing business tools and processes, creating efficient workflows that save time, reduce costs, and eliminate human errors while providing valuable insights for business optimization.",
    features: [
      "No-Code & Low-Code Automation (Zapier, Make.com, n8n)",
      "Custom AI Bots with Python & OpenAI Integration",
      "Email Parsing & Automated Response Systems",
      "Report Scheduling & Data Processing Automation", 
      "CRM & Google Sheets Integration for Seamless Workflows",
      "Slack/Discord Bot Setup for Team Communication",
      "Business Process Optimization & Workflow Design",
      "Document Processing & Data Extraction Automation",
      "Social Media & Marketing Automation Workflows",
      "Customer Support Chatbots with AI Intelligence"
    ],
    technologies: ["OpenAI", "ChatGPT API", "Python", "Node.js", "LangChain", "Zapier", "Make.com", "n8n", "Airtable", "Google Sheets", "HubSpot", "Slack", "Webhook APIs", "AWS Lambda", "Supabase", "MongoDB", "Vector Search", "Document AI"],
    price: "From $2,500",
    popular: true,
    image: "/services_images/Ai.jpg",
    methodology: [
      "Process Analysis & Automation Opportunity Assessment",
      "Workflow Design & Automation Architecture Planning",
      "Tool Selection & Integration Strategy Development",
      "Custom Development & No-Code Implementation",
      "Testing & Optimization for Maximum Efficiency",
      "Training & Documentation for Team Adoption"
    ],
    problems: [
      "Manual, repetitive tasks consuming valuable time",
      "Human errors in data processing and workflows",
      "Inconsistent processes across team members",
      "Difficulty scaling operations with current resources",
      "Lack of real-time insights and business intelligence",
      "High operational costs due to manual labor"
    ],
    results: [
      "Reduced manual work in repetitive operational workflows",
      "Fewer avoidable errors through structured automation",
      "Lower operational friction across connected tools",
      "More consistent process execution and handoffs",
      "Clearer business insights through automated reporting",
      "Reliable background workflows for recurring tasks"
    ],
    relatedProjects: ["retailops-automation-platform"],
    testimonials: [
      {
        quote: "The automation solutions from Zumetrix Labs made our operations cleaner, easier to track, and much less dependent on repetitive manual work.",
        author: "James Mitchell",
        role: "Operations Director",
        company: "RetailOps Enterprise"
      }
    ],
    seo: {
      title: "AI Automation Services | Business Process Automation | OpenAI Integration | Zapier, Make.com | Zumetrix Labs",
      description: "Transform your business with AI automation services. Expert OpenAI integration, workflow automation, and business process optimization using Zapier, Make.com, and custom solutions.",
      keywords: "AI automation services, business process automation, OpenAI integration, workflow automation, Zapier automation, Make.com automation, no-code automation, business automation solutions"
    }
  },
  {
    id: "digital-strategy",
    slug: "digital-strategy-consulting",
    icon: Palette,
    title: "Digital Strategy & Technical Consulting",
    subtitle: "Strategic guidance from expert technical founders",
    description: "Get expert guidance from our technical founders to make the right product decisions before investing in development. Our digital strategy services include comprehensive technical audits, growth-focused roadmaps, architecture planning, and hands-on consulting to help you build scalable, profitable digital products.",
    longDescription: "Our digital strategy and technical consulting services provide the strategic foundation your business needs to succeed in today's competitive digital landscape. Led by our expert founders Zia Hussain and Syed Omer Shah, we offer comprehensive guidance on technology decisions, product strategy, growth planning, and technical architecture. Whether you're a startup looking to build your first product or an enterprise seeking to modernize your technology stack, our consulting services help you make informed decisions that drive long-term success and competitive advantage.",
    features: [
      "Technical Discovery & Strategic Roadmapping",
      "Growth Planning & Monetization Strategy Development",
      "Architecture Review & Performance Optimization",
      "Technology Stack Selection & Implementation Planning",
      "Security & Performance Audits with Actionable Recommendations", 
      "Team Training & Knowledge Transfer Sessions",
      "Competitive Analysis & Market Positioning Strategy",
      "Digital Transformation Planning & Execution",
      "Product-Market Fit Analysis & Optimization",
      "Investor Pitch Deck Technical Review & Enhancement"
    ],
    technologies: ["Product Strategy", "Technical Audits", "Architecture Design", "UX Review", "SEO Review", "Performance Analysis", "Security Review", "Growth Strategy", "Roadmapping", "MVP Scoping", "Analytics Planning", "System Design"],
    price: "From $1,500",
    popular: false,
    image: "/services_images/Strategy.jpg",
    methodology: [
      "Business & Technical Assessment",
      "Strategic Planning & Roadmap Development",
      "Technology Audit & Recommendations",
      "Implementation Planning & Resource Allocation",
      "Progress Monitoring & Strategy Optimization",
      "Knowledge Transfer & Team Empowerment"
    ],
    problems: [
      "Unclear technology strategy and roadmap",
      "Poor technology decisions leading to technical debt",
      "Lack of scalable architecture planning",
      "Inefficient development processes and workflows",
      "Security vulnerabilities and compliance gaps",
      "Difficulty attracting and retaining technical talent"
    ],
    results: [
      "Clear, actionable technology roadmap and strategy",
      "50% improvement in development efficiency and speed",
      "Significant reduction in technical debt and maintenance costs",
      "Enhanced security posture and compliance readiness",
      "Better technology decisions leading to faster growth",
      "Improved team productivity and technical capabilities"
    ],
    relatedProjects: [],
    testimonials: [
      {
        quote: "The strategic guidance from Zumetrix Labs was invaluable. They helped us avoid costly mistakes and build a technology foundation that scales with our business.",
        author: "David Wilson",
        role: "CEO",
        company: "GrowthTech Solutions"
      }
    ],
    seo: {
      title: "Digital Strategy & Technical Consulting Services | CTO Advisory | Technology Roadmap | Zumetrix Labs",
      description: "Expert digital strategy and technical consulting services. Get strategic guidance on technology decisions, architecture planning, and growth strategy from experienced technical founders.",
      keywords: "digital strategy consulting, technical consulting services, CTO advisory, technology roadmap, digital transformation consulting, startup technical advisor, enterprise technology strategy"
    }
  }
];

export const process = [
  {
    step: "01",
    title: "Discovery & Strategy",
    description: "We start by understanding your business goals, target market, and technical requirements through comprehensive consultation and strategic planning sessions.",
  },
  {
    step: "02", 
    title: "Architecture & Planning",
    description: "Our expert team develops a detailed technical roadmap, system architecture, and project timeline tailored to your specific business objectives and growth plans.",
  },
  {
    step: "03",
    title: "Design & Prototyping", 
    description: "We create intuitive user interfaces, interactive prototypes, and comprehensive design systems that align with your brand identity and user expectations.",
  },
  {
    step: "04",
    title: "Development & Testing",
    description: "Our developers build your solution using industry best practices, clean code standards, and rigorous testing procedures to ensure exceptional quality and performance.",
  },
  {
    step: "05",
    title: "Launch & Scale",
    description: "We deploy your solution with optimized performance, provide comprehensive training, and offer ongoing support to ensure continued success and growth.",
  },
];

// API-ready data access functions
export const getServices = () => services;
export const getServiceBySlug = (slug: string) => services.find(s => s.slug === slug);
export const getFeaturedServices = () => services.filter(s => s.popular);
export const getServicesByCategory = (category: string) => {
  void category;
  return services;
}; // Can be expanded later
