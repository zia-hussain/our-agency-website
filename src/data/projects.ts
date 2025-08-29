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