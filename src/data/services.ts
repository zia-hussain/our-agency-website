import {
  Monitor,
  Smartphone,
  Database,
  Cog,
  LifeBuoy,
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
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
}

// The four priced, core commercial services. Product Rescue & Stabilization
// (see `rescueService` below) is deliberately NOT part of this array — it is
// a buyer-state route with a different engagement shape (assessment first,
// no fixed price), not a fifth equal card in this grid. Keep it that way
// until the Services hub gets its dedicated creative treatment.
export const services: Service[] = [
  {
    id: "web-application-development",
    slug: "web-application-development",
    icon: Monitor,
    title: "Web Application Development",
    subtitle: "Scalable, high-performance digital solutions for global markets",
    description: "Transform your ambitious business vision into powerful, enterprise-grade web applications built for scale, clarity, and long-term maintainability. We build custom platforms using React, Next.js, and TypeScript with cloud-ready architecture designed for serious business workflows.",
    longDescription: "Our web application development services combine technical excellence with strategic business insight to create digital solutions that transform how your organization operates and serves customers globally. We specialize in building scalable, high-performance web applications using modern React.js, Next.js, TypeScript, and Node.js technologies designed for demanding user loads, speed, and reliability. Our applications are designed with international markets in mind, featuring multi-language support, global CDN optimization, advanced security protocols, and enterprise-grade infrastructure that scales as your business grows across different regions and time zones.",
    features: [
      "React & TypeScript Development with Modern Architecture",
      "Progressive Web App (PWA) Support for Mobile-First Experience",
      "Optimized Cloud Architecture & Global CDN Deployment",
      "Technical SEO, Lighthouse Review & Performance Optimization",
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
    image: "/services_images/Website.webp",
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
    relatedProjects: ["forlag-publishing-sales-inventory-dashboard"],
    seo: {
      title: "Web Application Development | Zumetrix Labs",
      description: "Build custom, scalable web applications with React, Next.js, TypeScript, Node.js, and maintainable cloud-ready architecture.",
      keywords: "custom web application development, web application development company, React development services, Next.js development, TypeScript development, Node.js backend development, scalable web applications, custom web development"
    }
  },
  {
    id: "saas-product-development",
    slug: "saas-mvp-development",
    icon: Database,
    title: "SaaS Product Development",
    subtitle: "Launch your SaaS product in weeks, not months",
    description: "Accelerate your startup journey with a focused SaaS product development process built around validation, launch speed, and long-term product clarity. We transform ambitious business ideas into market-ready products using React, Node.js, and modern cloud technologies.",
    longDescription: "Our SaaS product development service is built for ambitious founders who need to validate a real business idea without creating a bloated first release. We shape the first version around the core user journey, then build production-ready SaaS foundations in 4-8 weeks with authentication, payments, dashboards, real-time features, and cloud infrastructure where they are actually needed. The goal is not to build everything at once. The goal is to launch a focused, working product — not a disposable MVP — that can earn feedback, support early users, and grow without forcing a painful rebuild after the first serious traction.",
    features: [
      "Rapid Product Development (4-8 weeks from concept to launch)",
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
    image: "/services_images/mvp.webp",
    methodology: [
      "Business Model Validation & Market Research",
      "Feature Prioritization & Scope Definition",
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
    relatedProjects: ["liftly-operational-mvp-v1"],
    seo: {
      title: "SaaS Product Development | From Idea to Working Product | Zumetrix Labs",
      description: "Build a focused SaaS product in 4-8 weeks — the real first version, not a disposable MVP. Includes strategy, UX, React, Node.js, payments, analytics, and scalable cloud foundations.",
      keywords: "SaaS product development, SaaS MVP development, startup MVP development, React SaaS development, MVP development services, startup development agency, SaaS development company"
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
    image: "/services_images/APP.webp",
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
    relatedProjects: ["skill-x-swap-mvp"],
    seo: {
      title: "Mobile App Development Services | Zumetrix Labs",
      description: "Build polished iOS and Android apps with React Native, Expo, Flutter, or native tools, from product flow through store deployment.",
      keywords: "mobile app development, React Native development, iOS app development, Android app development, cross-platform app development, mobile app development services, app development company"
    }
  },
  {
    id: "automation",
    slug: "ai-automation-solutions",
    icon: Cog,
    title: "AI Automation & Workflows",
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
    image: "/services_images/ai-automation.webp",
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
    relatedProjects: ["floating-stone-ranch-processor-intake-engine"],
    seo: {
      title: "AI Automation & Workflows | Zumetrix Labs",
      description: "Automate repeatable business workflows with OpenAI, n8n, Make.com, Zapier, Airtable, APIs, and custom software built around your operations.",
      keywords: "AI automation services, AI automation and workflows, business process automation, OpenAI integration, workflow automation, Zapier automation, Make.com automation, no-code automation, business automation solutions"
    }
  }
];

// Product Rescue & Stabilization — a buyer-state route for founders whose
// product already exists but is stuck, fragile, or inherited. Structurally
// distinct on purpose: no fixed "From $X" price (every engagement starts
// with an assessment before anything is scoped), and it is not part of the
// `services` array above so it never renders as a fifth equal card in the
// existing hub grid before that page gets its own creative treatment.
//
// Content below is real and honest, not a placeholder — but it is written
// to make the route/data valid, not as the final creative treatment for
// this page. That treatment is planned for a later phase.
export const rescueService: Service = {
  id: "product-rescue-stabilization",
  slug: "product-rescue-stabilization",
  icon: LifeBuoy,
  title: "Product Rescue & Stabilization",
  subtitle: "For products that already exist — stuck, fragile, or inherited",
  description: "For founders and businesses with an existing product that's stuck, fragile, or inherited from another team. We start with a technical assessment, then propose a scoped stabilization plan based on what we actually find — not a guess.",
  longDescription: "Product Rescue & Stabilization is for teams that already paid for development and ended up with something that doesn't work the way it should — a stalled build, a fragile codebase, or a product inherited from a previous team or developer. Every engagement starts with a technical and product assessment before any fix is scoped, because pricing a rescue before we've looked at the code would be a guess, not a plan. Once we understand what's actually wrong, we propose a stabilization plan built around what the product needs — not a generic package.",
  features: [
    "Technical & Product Assessment Before Any Work Is Scoped",
    "Codebase Health Review (Architecture, Security, Dependencies)",
    "Clear Findings Report — What's Broken, What's Fragile, What's Fine",
    "Scoped Stabilization Plan Based on Actual Findings",
    "Bug Fixes & Critical Issue Resolution",
    "Performance & Reliability Improvements",
    "Incremental Stabilization Without a Full Rebuild, When Possible",
    "Team & Documentation Handover Review",
    "Honest Repair-vs-Rebuild Recommendation",
    "Ongoing Support Option After Stabilization"
  ],
  technologies: ["React", "Next.js", "Node.js", "TypeScript", "Firebase", "Supabase", "PostgreSQL", "MongoDB", "REST APIs", "Code Audits"],
  price: "Scoped after assessment",
  popular: false,
  image: "/services_images/SaaS.webp",
  methodology: [
    "Technical & Product Assessment",
    "Findings Review & Honest Recommendation",
    "Scoped Stabilization Plan",
    "Fix & Stabilize in Reviewable Milestones",
    "Testing & Reliability Verification",
    "Handover & Ongoing Support Option"
  ],
  problems: [
    "A product that was already built but never worked reliably",
    "A previous developer or agency disappeared or stopped responding",
    "A codebase too fragile to safely add new features to",
    "No documentation and no clear understanding of what's already built",
    "Uncertainty about whether to fix the existing product or start over",
    "Mounting technical debt slowing down every new change"
  ],
  results: [
    "A clear, honest picture of what's actually wrong before any commitment",
    "A scoped plan based on real findings, not guesswork",
    "Stabilized core flows your team and users can rely on",
    "A straight answer on repair vs. rebuild, backed by evidence",
    "Reduced technical debt in the areas that matter most",
    "A product your team can safely keep building on"
  ],
  relatedProjects: ["knipsr-event-media-saas", "learning-platform-saas-stabilization"],
  seo: {
    title: "Product Rescue & Stabilization | Zumetrix Labs",
    description: "For existing products that are stuck, fragile, or inherited. We start with a technical assessment, then propose a scoped stabilization plan based on what we find.",
    keywords: "product rescue, SaaS stabilization, fix broken MVP, inherited codebase, technical debt cleanup, product stabilization services"
  }
};

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
export const getServiceBySlug = (slug: string) =>
  services.find(s => s.slug === slug) || (rescueService.slug === slug ? rescueService : undefined);
export const getFeaturedServices = () => services.filter(s => s.popular);
export const getServicesByCategory = (category: string) => {
  void category;
  return services;
}; // Can be expanded later
