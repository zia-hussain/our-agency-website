// Zumetrix Labs - Projects Data (API-Ready Architecture)
// All project information for portfolio pages - designed for easy API migration

export interface Project {
  id: number;
  slug: string;
  title: string;
  category: string;
  type: string;
  description: string;
  longDescription: string;
  image: string;
  gallery?: string[];
  tags: string[];
  client: {
    name: string;
    country: string;
    industry: string;
  };
  duration: string;
  team: string;
  year: string;
  featured: boolean;
  results: string[];
  problem: string;
  solution: string;
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
  liveLink?: string;
  githubLink?: string;
  stack: string[];
  services: string[];
  kpis?: {
    label: string;
    value: string;
    description: string;
  }[];
}

export const projects: Project[] = [
  {
    id: 1,
    slug: "ifyify-ai-personal-branding",
    title: "Ifyify - AI-Powered Personal Branding Tool",
    category: "Web Application",
    type: "saas",
    description: "A sophisticated React-based AI platform that helps users craft professional bios, taglines, and brand personas using custom-built prompt flows and style selectors.",
    longDescription: "Ifyify represents the cutting edge of AI-driven personal branding technology. Built from the ground up with React, TailwindCSS, Supabase, and OpenAI integration, this platform revolutionizes how professionals create their personal brand content. The system features beautifully animated style selector interfaces, intelligent prompt-based generation flows, and comprehensive multi-step user onboarding experiences. Our development team implemented advanced AI workflow automation, secure authentication systems, and scalable cloud architecture to support rapid user growth and feature expansion.",
    image: "/project_images/YOU AS ART.png",
    gallery: [
      "/project_images/YOU AS ART.png",
    ],
    tags: ["React", "TailwindCSS", "Supabase", "OpenAI", "JavaScript", "Responsive UI", "AI Integration"],
    client: {
      name: "Kelly Andrews – Best Business Services",
      country: "United States",
      industry: "Business Services & AI Tools"
    },
    duration: "2 weeks (Phase 1)",
    team: "Solo Developer",
    year: "2025",
    featured: true,
    results: [
      "Successful MVP launch within 2 weeks timeline",
      "Seamless AI integration with custom prompt flow system using OpenAI",
      "Clean, responsive UI with animated style selector components",
      "Client praised exceptional work ethic and committed to long-term collaboration",
      "Platform ready for scaling to thousands of users"
    ],
    problem: "The client needed a sophisticated AI-powered personal branding tool that could generate professional bios and taglines with custom style selectors, smooth user experience, and scalable architecture for rapid growth.",
    solution: "We built a complete React-based platform with OpenAI integration, custom prompt engineering flows, beautifully animated style selectors, and robust Supabase backend for user management, authentication, and data storage with real-time capabilities.",
    testimonial: {
      quote: "Zumetrix Labs delivered exactly what we envisioned and more. The AI integration is seamless, the user experience is fantastic, and the code quality is exceptional. Looking forward to Phase 2 expansion!",
      author: "Kelly Andrews",
      role: "Founder, Best Business Services"
    },
    liveLink: "https://www.ifyify.art",
    stack: ["React", "TypeScript", "TailwindCSS", "Supabase", "OpenAI API", "Vercel"],
    services: ["SaaS Development", "AI Integration", "UI/UX Design", "Database Design", "Authentication"],
    kpis: [
      { label: "Development Time", value: "2 weeks", description: "From concept to live MVP" },
      { label: "AI Response Time", value: "<2s", description: "Average generation speed" },
      { label: "User Satisfaction", value: "100%", description: "Client approval rating" },
      { label: "Code Quality", value: "A+", description: "Clean, maintainable architecture" }
    ]
  },
  {
    id: 2,
    slug: "wellnesstracker-mobile-app",
    title: "WellnessTracker - Comprehensive Health & Fitness Mobile App",
    category: "Mobile Application",
    type: "mobile",
    description: "An intuitive health and wellness tracking application with personalized AI insights, goal management, social features, and seamless device integrations for motivation and progress tracking.",
    longDescription: "WellnessTracker Mobile represents the future of personal health management technology. This comprehensive React Native application empowers users to take complete control of their wellness journey through advanced health tracking capabilities, AI-powered personalized insights, engaging social challenges, and seamless integration with popular fitness devices and wearables. Built with scalable architecture to support millions of users, the app features real-time data synchronization, offline capabilities, push notifications, and sophisticated analytics dashboards for both users and healthcare providers.",
    image: "/project_images/task_manager_portfolio_img.jpg",
    gallery: [
      "/project_images/task_manager_portfolio_img.jpg",
    ],
    tags: ["React Native", "Firebase", "Machine Learning", "Redux", "GraphQL", "Health Tech"],
    client: {
      name: "WellnessPath Startup",
      country: "Canada",
      industry: "Healthcare Technology & Digital Wellness"
    },
    duration: "6 months",
    team: "4 developers",
    year: "2024",
    featured: true,
    results: [
      "50,000+ downloads achieved within first month of launch",
      "Outstanding 4.8/5 app store rating from satisfied users",
      "Impressive 85% user retention rate after 30 days",
      "Featured prominently in App Store health category",
      "Successfully integrated with 15+ fitness device brands"
    ],
    problem: "The client needed a comprehensive wellness tracking application that could integrate with multiple fitness devices, provide personalized AI-driven insights, and create an engaging social experience to motivate users in their health journey.",
    solution: "We developed a sophisticated React Native application with Firebase backend, implemented machine learning algorithms for personalized health recommendations, created seamless device integrations, and built engaging social features with real-time data synchronization.",
    testimonial: {
      quote: "The team at Zumetrix Labs created an amazing wellness app that our users absolutely love. The AI insights feature is particularly impressive and has become our key differentiator in the market.",
      author: "Sarah Johnson",
      role: "CEO, WellnessPath"
    },
    stack: ["React Native", "Firebase", "Node.js", "Python", "TensorFlow", "GraphQL"],
    services: ["Mobile App Development", "AI/ML Integration", "Backend Development", "API Integration", "DevOps"],
    kpis: [
      { label: "Downloads", value: "50K+", description: "First month downloads" },
      { label: "App Rating", value: "4.8/5", description: "User satisfaction score" },
      { label: "Retention", value: "85%", description: "30-day user retention" },
      { label: "Device Integrations", value: "15+", description: "Fitness device compatibility" }
    ]
  },
  {
    id: 3,
    slug: "retailops-automation-platform",
    title: "RetailOps - Enterprise E-commerce Automation Platform",
    category: "Enterprise Solution",
    type: "enterprise",
    description: "End-to-end inventory management and order processing automation platform for growing e-commerce businesses with multiple sales channels and complex logistics requirements.",
    longDescription: "RetailOps Automation represents a revolutionary approach to e-commerce operations management. This comprehensive enterprise platform streamlines complex multi-channel e-commerce operations through intelligent automation of inventory management, order processing, supplier communications, and financial reporting systems. Built with Python and AWS cloud infrastructure, the system processes thousands of orders daily while maintaining 99.5% accuracy rates. The platform integrates seamlessly with existing e-commerce systems, ERP solutions, and third-party logistics providers to create a unified operational ecosystem.",
    image: "/project_images/FIT-GENIUS-FINAL.png",
    gallery: [
      "/project_images/FIT-GENIUS-FINAL.png",
    ],
    tags: ["Python", "AWS", "PostgreSQL", "REST API", "Docker", "Redis", "Enterprise"],
    client: {
      name: "RetailOps Enterprise",
      country: "United Kingdom",
      industry: "E-commerce & Retail Technology"
    },
    duration: "8 months",
    team: "5 developers",
    year: "2023",
    featured: true,
    results: [
      "Achieved 75% reduction in order processing time",
      "Maintained 99.5% order accuracy across all channels",
      "Generated 50% cost savings in operational expenses",
      "Successfully handles 10,000+ orders daily at peak",
      "Reduced manual errors by 95% through automation"
    ],
    problem: "The client was struggling with manual order processing across multiple sales channels, leading to frequent errors, significant delays, high operational costs, and inability to scale during peak seasons.",
    solution: "We built a comprehensive automation platform using Python and AWS that integrates with all major e-commerce platforms, automates the entire order fulfillment process, provides real-time inventory tracking, and includes intelligent routing for optimal efficiency.",
    testimonial: {
      quote: "Zumetrix Labs completely transformed our entire operation. The automation platform they built has saved us hundreds of hours monthly and significantly reduced errors while allowing us to scale confidently.",
      author: "James Mitchell",
      role: "Operations Director, RetailOps"
    },
    stack: ["Python", "Django", "AWS", "PostgreSQL", "Redis", "Docker", "Kubernetes"],
    services: ["Enterprise Software", "Process Automation", "Cloud Architecture", "API Development", "DevOps"],
    kpis: [
      { label: "Processing Time", value: "-75%", description: "Reduction in order processing" },
      { label: "Order Accuracy", value: "99.5%", description: "Error-free processing rate" },
      { label: "Cost Savings", value: "50%", description: "Operational expense reduction" },
      { label: "Daily Orders", value: "10K+", description: "Peak processing capacity" }
    ]
  },
  {
    id: 4,
    slug: "taskflow-startup-mvp",
    title: "TaskFlow - Project Management Startup MVP",
    category: "Startup MVP",
    type: "mvp",
    description: "A rapid prototype project management platform built to validate market demand, secure seed funding, and onboard early users with essential collaboration features.",
    longDescription: "TaskFlow MVP was strategically developed in just 6 weeks to help an ambitious startup validate their innovative project management concept and secure crucial seed funding. The platform features comprehensive team collaboration tools, intelligent task management systems, accurate time tracking capabilities, and insightful reporting dashboards. Built with modern React and Firebase technologies, the MVP successfully demonstrated product-market fit and user engagement metrics that directly contributed to securing $500K in seed funding from prominent venture capital firms.",
    image: "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800",
    gallery: [
      "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    tags: ["React", "Node.js", "Firebase", "Stripe", "Vercel", "MVP"],
    client: {
      name: "TaskFlow Startup",
      country: "Australia",
      industry: "Productivity Software & SaaS"
    },
    duration: "6 weeks",
    team: "2 developers",
    year: "2024",
    featured: false,
    results: [
      "Successfully secured $500K seed funding round",
      "Onboarded 1,000+ beta users within launch month",
      "Validated strong product-market fit with user feedback",
      "Achieved 95% user satisfaction in beta testing",
      "Built scalable foundation for Series A growth"
    ],
    problem: "The startup needed to quickly validate their project management concept with a functional MVP that could demonstrate market viability, attract early users, and convince investors of the product's potential for success.",
    solution: "We rapidly developed a feature-complete MVP using React and Firebase, focusing on core functionality, exceptional user experience, and scalable architecture to demonstrate market viability and support future growth phases.",
    testimonial: {
      quote: "Zumetrix Labs helped us build and launch our MVP in record time. The quality was exceptional and it directly contributed to our successful funding round. Their expertise was invaluable.",
      author: "Michael Chen",
      role: "Founder, TaskFlow"
    },
    stack: ["React", "Node.js", "Firebase", "Stripe", "Material-UI", "Vercel"],
    services: ["MVP Development", "Rapid Prototyping", "Payment Integration", "User Authentication", "Cloud Deployment"],
    kpis: [
      { label: "Funding Secured", value: "$500K", description: "Seed round achievement" },
      { label: "Beta Users", value: "1,000+", description: "Early adopter signups" },
      { label: "User Satisfaction", value: "95%", description: "Beta feedback score" },
      { label: "Development Speed", value: "6 weeks", description: "Concept to launch" }
    ]
  },
  {
    id: 5,
    slug: "eduplatform-online-learning",
    title: "EduPlatform - Comprehensive Online Learning System",
    category: "Educational Platform",
    type: "saas",
    description: "A comprehensive online learning platform with video streaming, interactive quizzes, progress tracking, and instructor tools for educational institutions and corporate training.",
    longDescription: "EduPlatform Web transforms traditional education delivery through cutting-edge technology and user-centered design. This comprehensive learning management system supports high-quality video lectures, interactive educational content, detailed student progress tracking, and powerful instructor management tools. Built to scale seamlessly for thousands of concurrent users with optimized video delivery, real-time collaboration features, and advanced analytics dashboards for educational insights and performance monitoring.",
    image: "https://images.pexels.com/photos/4386370/pexels-photo-4386370.jpeg?auto=compress&cs=tinysrgb&w=800",
    gallery: [
      "https://images.pexels.com/photos/4386370/pexels-photo-4386370.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    tags: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "AWS S3", "Stripe", "Education"],
    client: {
      name: "EduTech Institute",
      country: "Singapore",
      industry: "Education Technology & Online Learning"
    },
    duration: "5 months",
    team: "4 developers",
    year: "2023",
    featured: false,
    results: [
      "Successfully onboarded 5,000+ active students",
      "Achieved 99% video streaming uptime reliability",
      "Improved student engagement by 40% over traditional methods",
      "Reduced infrastructure costs by 30% through optimization",
      "Expanded to serve 50+ educational institutions"
    ],
    problem: "The educational institute needed a scalable online learning platform that could handle thousands of concurrent users, deliver high-quality video content reliably, and provide comprehensive tracking and analytics for student progress.",
    solution: "We developed a robust Next.js application with PostgreSQL database, implemented AWS S3 for optimized video delivery, created interactive learning modules, and built comprehensive analytics dashboards for educators and administrators.",
    testimonial: {
      quote: "The EduPlatform has revolutionized our teaching capabilities. Students are more engaged, instructors have better tools, and our operational efficiency has improved dramatically.",
      author: "Dr. Amanda Lee",
      role: "Director of Technology, EduTech Institute"
    },
    stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "AWS S3", "Stripe", "Redis"],
    services: ["Web Application Development", "Video Streaming", "Database Design", "Payment Integration", "Cloud Architecture"],
    kpis: [
      { label: "Active Students", value: "5,000+", description: "Platform user base" },
      { label: "Video Uptime", value: "99%", description: "Streaming reliability" },
      { label: "Engagement Boost", value: "+40%", description: "vs traditional methods" },
      { label: "Cost Reduction", value: "30%", description: "Infrastructure savings" }
    ]
  },
  {
    id: 6,
    slug: "logitrack-delivery-mobile",
    title: "LogiTrack - Smart Delivery & Logistics Mobile App",
    category: "Logistics App",
    type: "mobile",
    description: "A comprehensive logistics tracking application for delivery companies with real-time GPS tracking, intelligent route optimization, and automated customer notifications.",
    longDescription: "LogiTrack Mobile revolutionizes delivery operations through intelligent automation and real-time tracking capabilities. This sophisticated logistics application provides comprehensive GPS tracking, AI-powered route optimization, automated customer communication systems, and detailed analytics for fleet management. The system integrates seamlessly with existing logistics infrastructure while providing actionable insights for operational efficiency, cost reduction, and customer satisfaction improvement.",
    image: "https://images.pexels.com/photos/7688880/pexels-photo-7688880.jpeg?auto=compress&cs=tinysrgb&w=800",
    gallery: [
      "https://images.pexels.com/photos/7688880/pexels-photo-7688880.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    tags: ["React Native", "Google Maps API", "Node.js", "MongoDB", "Socket.io", "Logistics"],
    client: {
      name: "LogiCorp Solutions",
      country: "United Arab Emirates",
      industry: "Logistics & Supply Chain Technology"
    },
    duration: "7 months",
    team: "3 developers",
    year: "2023",
    featured: false,
    results: [
      "Achieved 30% reduction in average delivery time",
      "Maintained 95% customer satisfaction rating",
      "Generated 25% fuel cost savings through route optimization",
      "Successfully tracks 1,000+ deliveries daily",
      "Reduced customer service calls by 60%"
    ],
    problem: "The logistics company was struggling with inefficient route planning, poor customer communication, high fuel costs, and lack of real-time visibility into delivery operations across their growing fleet.",
    solution: "We built a comprehensive React Native application with Google Maps integration, implemented intelligent route optimization algorithms, created automated customer notification systems, and developed real-time tracking dashboards for complete operational visibility.",
    testimonial: {
      quote: "LogiTrack has transformed our delivery operations completely. The route optimization alone has saved us thousands in fuel costs, and our customers love the real-time tracking.",
      author: "Ahmed Al-Rashid",
      role: "Operations Manager, LogiCorp Solutions"
    },
    stack: ["React Native", "Node.js", "MongoDB", "Google Maps API", "Socket.io", "AWS"],
    services: ["Mobile App Development", "Real-time Systems", "API Integration", "Route Optimization", "Fleet Management"],
    kpis: [
      { label: "Delivery Time", value: "-30%", description: "Average time reduction" },
      { label: "Customer Satisfaction", value: "95%", description: "User rating score" },
      { label: "Fuel Savings", value: "25%", description: "Cost optimization" },
      { label: "Daily Tracking", value: "1,000+", description: "Deliveries monitored" }
    ]
  },
  // 7. Forlag – Publishing Sales & Inventory Dashboard
{
  id: 7,
  slug: "forlag-publishing-sales-inventory-dashboard",
  title: "Forlag – Publishing Sales & Inventory Analytics Dashboard",
  category: "Web Application",
  type: "saas",
  description: "An end-to-end analytics dashboard for a Norwegian publishing company, turning raw CSV files into live sales, inventory, and customer insights.",
  longDescription: "Forlag is a data-driven analytics platform built specifically for a Norwegian publishing company that needed clarity across sales, inventory, and customer performance. The system is designed as a fully frontend-powered dashboard that reads Sales and Inventory CSV/XLSX files, computes KPIs on the fly, and stores structured aggregates in localStorage for instant load times. Each page—Dashboard, Orders, Inventory, Customers, and Upload CSV—has been engineered to work 100% from uploaded files without a backend database. The UI features a modern glass-style layout, responsive grid-based KPIs, Nivo-powered charts, and carefully tuned performance to handle thousands of records. From MTD/YTD comparisons to inventory valuation and dead-stock detection, Forlag gives executives a clear, reliable, and beautiful way to understand their business at a glance.",
  image: "/project_images/forlag-dashboard.png",
  gallery: [
    "/project_images/forlag-dashboard.png",
    "/project_images/forlag-inventory.png",
    "/project_images/forlag-orders.png"
  ],
  tags: [
    "React", "TypeScript", "TailwindCSS", "CSV Parsing", "Frontend Architecture",
    "Nivo Charts", "LocalStorage", "Data Visualization", "Responsive UI"
  ],
  client: {
    name: "Harald & Eivind – Forlag (Publishing Company)",
    country: "Norway",
    industry: "Publishing & Book Sales"
  },
  duration: "6–8 weeks (Phased)",
  team: "Lead Frontend Developer & Architect",
  year: "2025",
  featured: true,
  results: [
    "Replaced fragile Excel workflows with a visual, always-up-to-date dashboard.",
    "Implemented MTD/YTD comparisons with correct same-period logic across years.",
    "Designed a 7-KPI inventory overview including stock value, dead stock, and category breakdown.",
    "Built a CSV upload flow that supports both initial full imports and incremental updates by ISBN/SKU.",
    "Achieved fast performance even with 7,000+ order rows using pre-computed localStorage structures."
  ],
  problem: "The client managed sales and inventory through multiple spreadsheets and manual calculations, making it difficult to understand MTD/YTD performance, inventory risk, and customer behavior across different channels and time periods.",
  solution: "We designed and built a modular React dashboard that ingests raw CSV/XLSX files, normalizes dates, aggregates metrics per page, and stores processed data in localStorage. The dashboard exposes clear KPI cards, charts, and tables for sales, customers, orders, and inventory, all with a pixel-perfect UI. An advanced upload system differentiates between initial full imports and incremental updates, ensuring inventory data stays accurate without manual reconciliation.",
  testimonial: {
    quote: "The new dashboard finally gives us a clear, real-time picture of our sales and inventory. It feels tailored for our business, not like a generic off-the-shelf tool.",
    author: "Harald",
    role: "Co-owner, Forlag"
  },
  liveLink: "",
  stack: [
    "React", "TypeScript", "TailwindCSS", "Nivo", "Vite", "LocalStorage APIs"
  ],
  services: [
    "Dashboard Development",
    "Data Modeling & Aggregation",
    "UI/UX Design",
    "Frontend Architecture",
    "CSV/XLSX Processing"
  ],
  kpis: [
    {
      label: "Rows Handled",
      value: "7,000+",
      description: "Smooth performance with thousands of orders and products"
    },
    {
      label: "Manual Reporting Time",
      value: "-80%",
      description: "Reduction in manual Excel calculations and analysis"
    },
    {
      label: "Tech Stack",
      value: "Frontend-only",
      description: "No backend; powered fully by CSV uploads & localStorage"
    },
    {
      label: "Inventory Visibility",
      value: "Real-time",
      description: "Dead stock, stock value, and YTD sold always visible"
    }
  ]
},

// 8. Floating Stone Ranch – Processor Intake & Logistics Engine
{
  id: 8,
  slug: "floating-stone-ranch-processor-intake-engine",
  title: "Floating Stone Ranch – Processor Intake & Logistics Automation",
  category: "Enterprise Solution",
  type: "enterprise",
  description: "An Airtable + Make.com powered intake and logistics engine for a beef processor, handling carcass tracking, boxing, and shipping flows.",
  longDescription: "Floating Stone Ranch needed a robust system to manage beef processing logistics—from carcass intake to boxing, lot tracking, and shipping documentation. We designed an Airtable base that acts as the single source of truth for all cattle, carcasses, boxes, and shipments. On top of that, we built Make.com scenarios that automate status changes, generate Bill of Lading structures, and connect different tables via stable relationships. The system transforms manual, error-prone workflows into a streamlined digital process where each carcass, box, and shipment is traceable with clear data relationships and reporting capabilities.",
  image: "/project_images/floating-stone-intake.png",
  gallery: [
    "/project_images/floating-stone-intake.png"
  ],
  tags: [
    "Airtable", "Make.com", "Database Design", "Process Automation",
    "Logistics", "Bill of Lading", "No-Code", "Enterprise Workflow"
  ],
  client: {
    name: "Floating Stone Ranch / Highland Beef Systems",
    country: "Canada",
    industry: "Beef Processing & Logistics"
  },
  duration: "4–6 weeks (Phase 1 Engine)",
  team: "Lead Systems Designer & Automation Engineer",
  year: "2025",
  featured: true,
  results: [
    "Centralized carcass, box, and shipment data into a single Airtable base.",
    "Replaced manual spreadsheets and papers with structured digital records.",
    "Automated key status transitions via Make.com scenarios.",
    "Prepared a scalable structure for advanced reporting and future modules.",
    "Created a strong foundation for future processor, customer, and box-level analytics."
  ],
  problem: "The client had complex beef processing flows involving carcass intake, cutting, boxing, and shipping, but no centralized digital system that could reliably track each step, generate manifests, and support future analytics.",
  solution: "We designed a normalized Airtable schema covering animals, carcasses, boxes, lots, and shipments, and layered Make.com automation scenarios on top to drive the workflow. These scenarios handle triggers, status changes, and cross-table updates, ensuring every carcass and box remains traceable from intake to final shipment, with Bill of Lading data generated automatically.",
  testimonial: {
    quote: "You translated a messy, real-world processing operation into a system that actually makes sense. This will save us time and headaches as we grow.",
    author: "James",
    role: "Owner, Floating Stone Ranch"
  },
  liveLink: "",
  stack: [
    "Airtable", "Make.com", "Webhook Triggers", "REST APIs"
  ],
  services: [
    "Airtable Base Design",
    "Workflow Automation",
    "Process Mapping",
    "Data Modeling"
  ],
  kpis: [
    {
      label: "Data Centralization",
      value: "100%",
      description: "All carcass, box, and shipment data stored in one base"
    },
    {
      label: "Manual Steps Reduced",
      value: "-60%",
      description: "Replaced manual updates with Make.com automation"
    },
    {
      label: "Scalability",
      value: "Multi-processor",
      description: "Structure ready for multiple plants and customers"
    }
  ]
},

// 9. Skill x Swap – Skill Trading Marketplace MVP
{
  id: 9,
  slug: "skill-x-swap-mvp",
  title: "Skill x Swap – Credit-Based Skill Trading Marketplace (MVP)",
  category: "Mobile Application",
  type: "mvp",
  description: "A React Native MVP that lets users trade skills using a monthly credit system and earned swap credits, powered by Firebase and Stripe-ready architecture.",
  longDescription: "Skill x Swap is a modern skill trading marketplace where users can offer their skills and request others' skills using a credit-based system. We built the MVP using React Native and Firebase, with a clean onboarding flow, Core vs Lite Pro user tiers, and a monthly credit allowance system. The platform also supports earned credits that accumulate as users successfully complete swaps. The app includes skills you offer and skills you want, a matchmaking flow, sending swap requests, and managing pending requests. The architecture is designed to plug in Stripe for subscription-based Pro accounts and an enterprise edition in future phases.",
  image: "/project_images/skill-x-swap.png",
  gallery: [
    "/project_images/skill-x-swap.png"
  ],
  tags: [
    "React Native", "Expo", "Firebase", "TypeScript",
    "Marketplace", "Credits System", "Mobile MVP"
  ],
  client: {
    name: "Sam (Founder of Skill x Swap)",
    country: "United Kingdom",
    industry: "EdTech & Skill Sharing"
  },
  duration: "6 weeks (MVP Phase 1)",
  team: "Lead Mobile Developer & Product Architect",
  year: "2025",
  featured: true,
  results: [
    "Completed a full-featured MVP including onboarding, skill management, and swap flows.",
    "Implemented monthly credit allowances and persistent earned credits logic.",
    "Designed dynamic skill lists where users can add missing skills to a global collection.",
    "Prepared architecture for Stripe subscriptions and enterprise org accounts in future phases."
  ],
  problem: "The founder needed a clean, intuitive skill trading app that could handle different user tiers, monthly credit limits, and earned credits from completed swaps, while staying simple enough for a first MVP.",
  solution: "We implemented a React Native app backed by Firebase, with clear user onboarding, separated \"Skills I Offer\" and \"Skills I Want\" lists, a credit-aware swap request system, and proper differentiation between monthly allowance credits and earned credits. The system was architected for future Stripe integration and an enterprise white-label edition.",
  testimonial: {
    quote: "The MVP feels aligned with the exact vision I had in my head. The credits logic and flows are thoughtfully built for future scaling.",
    author: "Sam",
    role: "Founder, Skill x Swap"
  },
  liveLink: "",
  stack: [
    "React Native", "Expo", "Firebase Auth", "Cloud Firestore"
  ],
  services: [
    "MVP Design & Development",
    "Mobile Development",
    "Product Architecture",
    "Database Design"
  ],
  kpis: [
    {
      label: "MVP Timeline",
      value: "6 weeks",
      description: "From requirements clarification to testable build"
    },
    {
      label: "Core Features",
      value: "Credits, Matching, Requests",
      description: "All core marketplace flows in V1"
    }
  ]
},

// 10. Tomo – Voice AI Companion App
{
  id: 10,
  slug: "tomo-voice-ai-companion",
  title: "Tomo – Voice-First AI Companion App",
  category: "Mobile Application",
  type: "mobile",
  description: "A voice-first AI companion built with React Native and voice SDKs, delivering smooth, real-time conversations in a premium UI.",
  longDescription: "Tomo is a voice-first AI companion designed to feel like a friendly assistant you can just talk to. We built the mobile app using React Native and a voice SDK, focusing on low-latency request handling, clean audio pipeline management, and a beautifully minimal UI that fits the brand. The app maintains conversation state, handles streaming responses, and gives users a natural voice experience with subtle animations and gradients to keep the interface feeling alive.",
  image: "/project_images/tomo-voice-ai.png",
  gallery: [
    "/project_images/tomo-voice-ai.png"
  ],
  tags: [
    "React Native", "Voice SDK", "AI Integration", "Real-time UX",
    "Mobile", "Audio Streaming"
  ],
  client: {
    name: "Yojimbo (Tomo AI Team)",
    country: "United States",
    industry: "AI & Productivity"
  },
  duration: "Ongoing collaboration",
  team: "Lead React Native Developer",
  year: "2025",
  featured: true,
  results: [
    "Established a stable voice interaction loop with minimal latency.",
    "Created a premium, brand-aligned interface with gradients and motion.",
    "Structured the codebase for future multi-modal features and agents."
  ],
  problem: "The client needed a mobile-first experience for voice interactions with their AI models, including a high-quality UI, low-latency pipelines, and scalable architecture for future features.",
  solution: "We built a React Native app integrating a voice SDK and AI backend APIs, architected audio streaming and response rendering carefully, and designed a UI that feels like a premium AI companion product rather than a simple chat app.",
  testimonial: {
    quote: "The mobile experience feels polished and on-brand. The voice flow is smooth, and the app feels like something we can confidently show users.",
    author: "Product Team",
    role: "Tomo"
  },
  liveLink: "",
  stack: [
    "React Native", "Expo", "Voice SDK", "AI APIs"
  ],
  services: [
    "Mobile Development",
    "AI Integration",
    "UI Implementation"
  ],
  kpis: [
    {
      label: "Mode",
      value: "Voice-first",
      description: "Core flows optimized for speaking, not just typing"
    }
  ]
},

// 11. HjelpNå – Handyman Marketplace PWA (Bubble.io)
{
  id: 11,
  slug: "hjelpna-handyman-marketplace",
  title: "HjelpNå – Handyman Marketplace PWA",
  category: "Web Application",
  type: "mvp",
  description: "A Bubble.io-based PWA marketplace for local handyman services in Norway, including job posting, bidding, subscriptions, and chat.",
  longDescription: "HjelpNå is a Norwegian handyman marketplace similar to local service platforms like Minsmåjobb and TaskRabbit, built using Bubble.io as a Progressive Web App. The platform allows homeowners to post jobs, receive bids from service providers, and choose between standard and instant-help flows. It includes provider subscription tiers, Stripe-based escrow payments, real-time chat between clients and providers, and geo-targeting filters for relevant matches. We supported architecture recommendations, data structure design, and best-practice setup for scaling the PWA.",
  image: "/project_images/hjelpna-marketplace.png",
  gallery: [
    "/project_images/hjelpna-marketplace.png"
  ],
  tags: [
    "Bubble.io", "Stripe", "PWA", "Marketplace", "Chat", "Geo-location"
  ],
  client: {
    name: "Jenny",
    country: "Norway",
    industry: "Home Services Marketplace"
  },
  duration: "Ongoing feature collaboration",
  team: "Bubble Consultant & System Architect",
  year: "2025",
  featured: false,
  results: [
    "Defined a maintainable Bubble data architecture for jobs, bids, users, and subscriptions.",
    "Implemented flows for job posting, provider bidding, and instant help.",
    "Advised on Stripe escrow, notifications, and PWA behavior for mobile and desktop."
  ],
  problem: "The founder wanted to build a full handyman marketplace on Bubble but needed strong guidance on data structure, feature design, and clean UX to avoid typical no-code chaos.",
  solution: "We helped shape the core data models in Bubble, structured the job posting, bidding, and matching flows, and advised on Stripe integration, chat, and geo-targeting so the product can scale without rewriting the core.",
  testimonial: {
    quote: "Your Bubble knowledge and system thinking saved me from so many future problems. The marketplace now feels robust instead of hacked together.",
    author: "Jenny",
    role: "Founder, HjelpNå"
  },
  liveLink: "",
  stack: [
    "Bubble.io", "Stripe", "PWA", "Responsive Design"
  ],
  services: [
    "No-Code Architecture",
    "Product Consultation",
    "Workflow Design"
  ],
  kpis: [
    {
      label: "Platform Type",
      value: "PWA",
      description: "Single codebase for mobile and desktop"
    }
  ]
},

// 12. Utility Bill Deal Finder – AI OCR MVP
{
  id: 12,
  slug: "utility-bill-deal-finder",
  title: "Utility Bill Deal Finder – AI-Powered Bill Analysis MVP",
  category: "Web Application",
  type: "mvp",
  description: "An MVP concept for analyzing uploaded utility bills using OCR and AI to recommend cheaper plans and deals.",
  longDescription: "The Utility Bill Deal Finder is an MVP planned with Imane to help users reduce monthly utility costs by analyzing their bills. The concept includes a React/Next.js web app where users upload bills, an OCR layer using Tesseract or Google Vision, and an AI-backed rules engine that compares usage patterns against better available deals. The roadmap includes alerts when better deals are detected, a recommendation dashboard, and integration with payment providers and CRMs.",
  image: "/project_images/utility-bill-deal-finder.png",
  gallery: [
    "/project_images/utility-bill-deal-finder.png"
  ],
  tags: [
    "React", "Next.js", "OCR", "AI Analysis", "Node.js", "Stripe"
  ],
  client: {
    name: "Imane",
    country: "Europe",
    industry: "FinTech & Utilities"
  },
  duration: "Architecture & MVP Planning",
  team: "Technical Architect & Future Implementer",
  year: "2025",
  featured: false,
  results: [
    "Designed a full-stack architecture for OCR + AI-based bill comparison.",
    "Outlined user flows, data models, and future mobile app integration.",
    "Prepared a clear technical roadmap for MVP and later scaling."
  ],
  problem: "Users often overpay for utilities without understanding their real usage patterns or market options. The client needed a system to make sense of uploaded bills and surface better deals automatically.",
  solution: "We drafted a robust system combining OCR pipelines, AI-driven comparison logic, and a clean dashboard for insights, giving the client a realistic blueprint to move from idea to working MVP.",
  testimonial: {
    quote: "The system design covered everything I needed and more. It gave me clarity on the technical path ahead.",
    author: "Imane",
    role: "Co-founder"
  },
  liveLink: "",
  stack: [
    "React", "Next.js", "Node.js", "OCR APIs", "AI APIs"
  ],
  services: [
    "System Architecture",
    "MVP Planning",
    "AI & OCR Consultation"
  ],
  kpis: [
    {
      label: "Goal",
      value: "Cost Reduction",
      description: "Help users automatically find cheaper utility options"
    }
  ]
},

// 13. PawSpace – Pet Services Marketplace App
{
  id: 13,
  slug: "pawspace-pet-services-marketplace",
  title: "PawSpace – Pet Services Marketplace App",
  category: "Mobile Application",
  type: "mobile",
  description: "A React Native marketplace for pet services, including sitter listings, booking flows, and owner-provider coordination.",
  longDescription: "PawSpace is a pet services marketplace app built with React Native, providing a clean way for pet owners to find and book sitters, walkers, and other services. The app features provider onboarding, profile creation, service listings, booking management, and a streamlined experience for both owners and providers. The UI focuses on trust, simplicity, and clarity, particularly around availability and booking flows.",
  image: "/project_images/pawspace.png",
  gallery: [
    "/project_images/pawspace.png"
  ],
  tags: [
    "React Native", "Expo", "Firebase", "Marketplace", "Mobile UI"
  ],
  client: {
    name: "PawSpace Team",
    country: "International",
    industry: "Pet Services & Marketplace"
  },
  duration: "Several weeks",
  team: "Lead Mobile Developer",
  year: "2024",
  featured: false,
  results: [
    "Delivered a polished mobile experience for pet owners and providers.",
    "Implemented provider onboarding and booking logic.",
    "Created a reusable UI kit for cards, lists, and modal flows."
  ],
  problem: "The client needed a mobile app that could make booking pet services as simple and trustworthy as booking a ride or a room.",
  solution: "We built a React Native marketplace app with clear flows, robust state handling, and a UI that conveys trust and reliability, focusing on the core booking journey first.",
  testimonial: {
    quote: "The app feels intuitive and friendly—it matches exactly how we imagined PawSpace should look and behave.",
    author: "Product Team",
    role: "PawSpace"
  },
  liveLink: "",
  stack: [
    "React Native", "Expo", "Firebase"
  ],
  services: [
    "Mobile App Development",
    "UI Implementation"
  ],
  kpis: [
    {
      label: "Platform",
      value: "iOS & Android",
      description: "Single codebase via React Native"
    }
  ]
},

// 14. Bondfire – Event Booking App (Bug Fix & Feature Delivery)
{
  id: 14,
  slug: "bondfire-event-booking-app",
  title: "Bondfire – Event Booking App Stabilization & Feature Enhancements",
  category: "Mobile Application",
  type: "mobile",
  description: "React Native app stabilization for an event booking product, including bug fixes, feature updates, and TestFlight deployments.",
  longDescription: "Bondfire is an event-focused app that needed stability, bug fixes, and feature completion. We worked inside an existing React Native codebase to resolve merge conflicts, fix navigation bugs, improve booking flows, and prepare builds for TestFlight distribution. The project included collaborating with another developer, cleaning up branches, and ensuring successful iOS builds.",
  image: "/project_images/bondfire.png",
  gallery: [
    "/project_images/bondfire.png"
  ],
  tags: [
    "React Native", "Expo", "iOS Build", "Git", "Bug Fixing"
  ],
  client: {
    name: "Bondfire Team",
    country: "India / International",
    industry: "Events & Bookings"
  },
  duration: "Short-term engagement",
  team: "React Native Problem Solver",
  year: "2025",
  featured: false,
  results: [
    "Resolved critical issues blocking TestFlight releases.",
    "Cleaned up Git branches and merge conflicts.",
    "Improved reliability of booking flows during testing."
  ],
  problem: "The client had an event booking app with an unstable codebase, build issues, and merge conflicts that were slowing down progress.",
  solution: "We stepped into the existing codebase, fixed core issues, stabilized builds, and improved the booking experience, acting as a technical closer to push the project forward.",
  testimonial: {
    quote: "You jumped into a messy situation and got us back to shipping. That was exactly what we needed.",
    author: "Bharat",
    role: "Developer, Bondfire"
  },
  liveLink: "",
  stack: [
    "React Native", "Expo", "Xcode", "Git"
  ],
  services: [
    "Codebase Stabilization",
    "Bug Fixing",
    "Build & Release Support"
  ],
  kpis: [
    {
      label: "Build Status",
      value: "Stable",
      description: "TestFlight releases successfully delivered"
    }
  ]
},

// 15. Hostel Management System – MERN Admin Panel
{
  id: 15,
  slug: "hostel-management-system-mern",
  title: "Hostel Management System – MERN Stack Admin Panel",
  category: "Web Application",
  type: "saas",
  description: "A MERN-based hostel management system with dashboards for rooms, bookings, billing, and staff.",
  longDescription: "The Hostel Management System is a full-stack MERN application built as a portfolio-grade project and a real-world style solution for managing hostels. It includes role-based access, room and bed management, booking records, payment tracking, and staff overviews. The UI is dashboard-driven, making it easy for admins to see occupancy, upcoming check-ins, and revenue at a glance.",
  image: "/project_images/hostel-management.png",
  gallery: [
    "/project_images/hostel-management.png"
  ],
  tags: [
    "React", "Node.js", "MongoDB", "Express", "Dashboard", "Admin Panel"
  ],
  client: {
    name: "Internal / Portfolio",
    country: "Pakistan",
    industry: "Hospitality & Accommodation"
  },
  duration: "2–3 weeks",
  team: "Solo Full Stack Developer",
  year: "2024",
  featured: false,
  results: [
    "Delivered a complete CRUD and dashboard experience for hostel management.",
    "Showcased production-style MERN skills for portfolio and client demos."
  ],
  problem: "There was a need for a structured, real-world style hostel management system that could be used both as a demo and a base for future client work.",
  solution: "We built a clean MERN-based dashboard with clear sections for rooms, bookings, billing, and staff, with a modern UI and scalable backend models.",
  testimonial: {
    quote: "This project shows real production thinking—exactly what clients want to see in a dev portfolio.",
    author: "Internal Review",
    role: "Zumetrix Labs"
  },
  liveLink: "",
  stack: [
    "React", "Node.js", "Express", "MongoDB", "TailwindCSS"
  ],
  services: [
    "Full Stack Development",
    "Dashboard Design"
  ],
  kpis: [
    {
      label: "Stack",
      value: "MERN",
      description: "Full-stack JS from DB to UI"
    }
  ]
},

// 16. Stripe → Airtable Subscription Sync Automation
{
  id: 16,
  slug: "stripe-to-airtable-subscription-sync",
  title: "Stripe to Airtable – Subscription Sync Automation",
  category: "Automation System",
  type: "automation",
  description: "Make.com/Zapier automations that sync Stripe subscription events into Airtable for reporting, support, and internal operations.",
  longDescription: "This automation bridges Stripe and Airtable to keep subscription data in sync for internal teams. Whenever a subscription is created, updated, or canceled in Stripe, the automation updates Airtable records with customer details, plan info, billing cycles, and status. This eliminates manual data copying and gives customer support and finance teams a real-time view of subscriptions in a familiar Airtable interface.",
  image: "/project_images/stripe-airtable-sync.png",
  gallery: [
    "/project_images/stripe-airtable-sync.png"
  ],
  tags: [
    "Stripe", "Airtable", "Make.com", "Zapier", "Webhooks", "Automation"
  ],
  client: {
    name: "Various SaaS Clients",
    country: "Global",
    industry: "SaaS & Membership"
  },
  duration: "Few days (per client)",
  team: "Automation Specialist",
  year: "2024",
  featured: false,
  results: [
    "Reduced manual data entry and errors in subscription tracking.",
    "Gave ops teams a real-time subscription overview in Airtable.",
    "Standardized subscription fields for easier reporting."
  ],
  problem: "Clients using Stripe for subscriptions often lacked a clean, non-technical view of active and canceled subscriptions inside their internal tools.",
  solution: "We set up webhook-driven automations using Make.com or Zapier that listen to Stripe events and map them into structured Airtable records, including customer, plan, and billing information.",
  testimonial: {
    quote: "Now our Stripe data just appears in Airtable without anyone touching it. Huge time saver.",
    author: "Client Feedback",
    role: "SaaS Founder"
  },
  liveLink: "",
  stack: [
    "Stripe", "Airtable", "Make.com", "Zapier"
  ],
  services: [
    "Automation Design",
    "Integration Engineering"
  ],
  kpis: [
    {
      label: "Manual Work",
      value: "-90%",
      description: "Most subscription updates fully automated"
    }
  ]
},

// 17. Shopify → Notion P&L Automation
{
  id: 17,
  slug: "shopify-to-notion-pnl-automation",
  title: "Shopify to Notion – Automated P&L Reporting",
  category: "Automation System",
  type: "automation",
  description: "An automation flow that pushes Shopify order data into Notion to generate near real-time profit and loss views.",
  longDescription: "For e-commerce clients running on Shopify, we created an automation flow that exports order and revenue data into Notion databases, enabling a living P&L report. The system pulls order details, fees, and key metadata, and maps them into Notion properties where the client can apply formulas, filters, and dashboards. This gives founders a quick, visual handle on performance without having to export CSVs every week.",
  image: "/project_images/shopify-notion-automation.png",
  gallery: [
    "/project_images/shopify-notion-automation.png"
  ],
  tags: [
    "Shopify", "Notion", "Make.com", "Zapier", "Automation", "E-commerce"
  ],
  client: {
    name: "DTC Brands",
    country: "Global",
    industry: "E-commerce"
  },
  duration: "Few days",
  team: "Automation Specialist",
  year: "2024",
  featured: false,
  results: [
    "Turned static CSV exports into a live Notion-based P&L.",
    "Enabled founders to monitor sales trends with minimal maintenance.",
    "Reduced time spent on manual financial reporting."
  ],
  problem: "Founders wanted a simple way to see P&L-like views in Notion instead of running complex exports from Shopify every week.",
  solution: "We connected Shopify to Notion via Make.com/Zapier, mapping relevant order data into carefully structured Notion databases that support formula-driven P&L views.",
  testimonial: {
    quote: "Now our Notion workspace doubles as a financial cockpit. It just updates itself.",
    author: "Brand Owner",
    role: "Founder, DTC Brand"
  },
  liveLink: "",
  stack: [
    "Shopify", "Notion", "Make.com", "Zapier"
  ],
  services: [
    "Automation & Integration",
    "Data Modeling"
  ],
  kpis: [
    {
      label: "Update Frequency",
      value: "Automatic",
      description: "New orders synced as they come in"
    }
  ]
},

// 18. Twilio Auto Dialer – Call Sequencing Logic
{
  id: 18,
  slug: "twilio-auto-dialer-logic",
  title: "Twilio Auto Dialer – Sequential Call Logic",
  category: "Automation System",
  type: "automation",
  description: "A Twilio-powered auto dialer that calls through a list of contacts, detects call completion, and moves to the next lead.",
  longDescription: "The Twilio Auto Dialer is a backend + Twilio integration that automatically calls through a JSON list of contacts. It detects when a call ends, logs the status, and moves on to the next contact, giving sales or support teams a semi-automatic calling experience. The system is designed for integration with CRMs and flexible campaign logic.",
  image: "/project_images/twilio-auto-dialer.png",
  gallery: [
    "/project_images/twilio-auto-dialer.png"
  ],
  tags: [
    "Twilio", "Node.js", "Call Automation", "Backend"
  ],
  client: {
    name: "Internal & Client Use",
    country: "Global",
    industry: "Sales & Outreach"
  },
  duration: "Few days",
  team: "Backend & Twilio Integrator",
  year: "2025",
  featured: false,
  results: [
    "Automated sequential dialing from structured contact lists.",
    "Reduced manual effort for outreach teams.",
    "Prepared for deeper CRM integration in future versions."
  ],
  problem: "Teams needed a way to move through outbound call lists without manually dialing each number and tracking completion.",
  solution: "We built Twilio-backed logic that dials, tracks, and advances through a contact list, with hooks ready for CRM logging and reporting.",
  testimonial: {
    quote: "The auto dialer saves time and keeps our team focused on talking, not dialing.",
    author: "Client Feedback",
    role: "Operations Lead"
  },
  liveLink: "",
  stack: [
    "Node.js", "Twilio", "Express"
  ],
  services: [
    "API Integration",
    "Automation"
  ],
  kpis: [
    {
      label: "Dialing Process",
      value: "Automated",
      description: "System handles call progression"
    }
  ]
},

// 19. Twilio Conference Call – Add/Remove Participants
{
  id: 19,
  slug: "twilio-conference-call-logic",
  title: "Twilio Conference Call – Dynamic Participant Management",
  category: "Automation System",
  type: "automation",
  description: "A Twilio-based conference calling solution that supports adding and removing participants dynamically from React Native apps.",
  longDescription: "We implemented Twilio conference call logic that allows a call host to add or remove participants from a running call, powered by Twilio Voice and backed by a clean backend API layer. This supports use cases like team calls, support triage, or escalation, especially in mobile apps where call flows need to be managed with minimal friction.",
  image: "/project_images/twilio-conference.png",
  gallery: [
    "/project_images/twilio-conference.png"
  ],
  tags: [
    "Twilio", "React Native", "Voice", "Node.js", "Conference Calls"
  ],
  client: {
    name: "Client Using Twilio Voice",
    country: "Global",
    industry: "Communications & Support"
  },
  duration: "1–2 weeks",
  team: "Backend & Mobile Integrator",
  year: "2025",
  featured: false,
  results: [
    "Enabled conference-style calls with flexible participant control.",
    "Integrated with an existing React Native app handling call state and UI.",
    "Improved collaboration options for the client’s call workflows."
  ],
  problem: "The client needed to handle multi-party calls in their Twilio-backed app, with the ability to add or remove participants without call resets.",
  solution: "We implemented Twilio conference rooms and backend endpoints to manage participants, and hooked them into React Native UI flows for a smooth experience.",
  testimonial: {
    quote: "The conference calling experience feels smooth and reliable, exactly what we needed for our team.",
    author: "Client Feedback",
    role: "Product Owner"
  },
  liveLink: "",
  stack: [
    "Twilio Voice", "Node.js", "React Native"
  ],
  services: [
    "Telephony Integration",
    "Backend Development",
    "Mobile Integration"
  ],
  kpis: [
    {
      label: "Participants",
      value: "Multi-party",
      description: "Conference calls with flexible participant control"
    }
  ]
},

// 20. Zumetrix Labs – Internal Automation & CRM Stack
{
  id: 20,
  slug: "zumetrix-labs-internal-automation-stack",
  title: "Zumetrix Labs – Internal Automation & CRM Stack",
  category: "Enterprise Solution",
  type: "enterprise",
  description: "A collection of internal tools, trackers, and automations that power Zumetrix Labs operations, deals, tasks, and client pipelines.",
  longDescription: "Over time, Zumetrix Labs has developed its own internal ecosystem of tools: deal trackers, task boards, income and expense sheets, lead trackers, and notification flows. These systems, built using Airtable, Google Sheets, Notion, and automation tools like Make.com and Zapier, act as the operational backbone of the agency. Together, they track project pipelines, finances, recurring tasks, and growth experiments, letting the team focus on closing deals and delivering work instead of managing chaos.",
  image: "/project_images/zumetrix-internal-tools.png",
  gallery: [
    "/project_images/zumetrix-internal-tools.png"
  ],
  tags: [
    "Airtable", "Notion", "Make.com", "Zapier", "Google Sheets", "Automation"
  ],
  client: {
    name: "Zumetrix Labs (Internal)",
    country: "Pakistan",
    industry: "Software & Automation Agency"
  },
  duration: "Ongoing (2023–2025)",
  team: "Founder & Systems Architect",
  year: "2025",
  featured: true,
  results: [
    "Centralized tracking of deals, proposals, and client pipelines.",
    "Automated repetitive reporting and reminders.",
    "Allowed the founder to operate like a small agency instead of a solo freelancer."
  ],
  problem: "As deal volume and projects grew, it became difficult to track everything with ad-hoc tools and mental notes.",
  solution: "We built a modular internal stack across Airtable, Notion, and Google Sheets, connected via Make.com and Zapier, to serve as a lightweight but powerful agency operating system.",
  testimonial: {
    quote: "These tools are why Zumetrix Labs can juggle so many high-impact projects without dropping the ball.",
    author: "Zia Hussain",
    role: "Founder, Zumetrix Labs"
  },
  liveLink: "",
  stack: [
    "Airtable", "Notion", "Google Sheets", "Make.com", "Zapier"
  ],
  services: [
    "Internal Tooling",
    "Process Design",
    "Automation"
  ],
  kpis: [
    {
      label: "Pipeline Visibility",
      value: "High",
      description: "Clear tracking of leads and active projects"
    }
  ]
}

];

// Project filters and categories (API-ready structure)
export const projectCategories = [
  { id: "all", label: "All Projects", count: projects.length },
  { id: "saas", label: "SaaS Applications", count: projects.filter(p => p.type === "saas").length },
  { id: "mobile", label: "Mobile Apps", count: projects.filter(p => p.type === "mobile").length },
  { id: "enterprise", label: "Enterprise Solutions", count: projects.filter(p => p.type === "enterprise").length },
  { id: "mvp", label: "MVP Development", count: projects.filter(p => p.type === "mvp").length }
];

export const projectTechnologies = [
  "React", "Node.js", "Python", "React Native", "Firebase", "AWS", 
  "TypeScript", "PostgreSQL", "MongoDB", "Docker", "Kubernetes", "AI/ML"
];

// API-ready data access functions (ready for backend migration)
export const getProjects = () => projects;
export const getFeaturedProjects = () => projects.filter(p => p.featured);
export const getProjectBySlug = (slug: string) => projects.find(p => p.slug === slug);
export const getProjectsByCategory = (category: string) => 
  category === "all" ? projects : projects.filter(p => p.type === category);
export const getProjectCategories = () => projectCategories;