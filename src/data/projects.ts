// Zumetrix Labs - Projects Data
// All project information for portfolio pages

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
}

export const projects: Project[] = [
  {
    id: 1,
    slug: "ifyify-ai-personal-branding",
    title: "Ifyify - AI-Powered Personal Branding Tool",
    category: "Web Application",
    type: "saas",
    description: "A sleek and scalable React-based AI platform that helps users craft professional bios, taglines, and brand personas using custom-built prompt flows and style selectors.",
    longDescription: "Ifyify is a cutting-edge AI-driven personal branding tool designed to help users instantly generate bios, taglines, and tailored branding content. Built from scratch with React, TailwindCSS, Supabase, and OpenAI, the platform features a beautifully animated style selector system, prompt-based generation flows, and multi-step user onboarding.",
    image: "/project_images/YOU AS ART.png",
    gallery: [
      "/project_images/YOU AS ART.png",
    ],
    tags: ["React", "TailwindCSS", "Supabase", "OpenAI", "JavaScript", "Responsive UI"],
    client: {
      name: "Kelly Andrews – Best Business Services",
      country: "United States",
      industry: "Business Services"
    },
    duration: "2 weeks (Phase 1)",
    team: "Solo Developer",
    year: "2025",
    featured: true,
    results: [
      "Successful launch of MVP within 2 weeks",
      "Integrated AI with prompt flow system using OpenAI",
      "Clean, responsive UI with animated style selector",
      "Client praised work ethic and plans long-term collaboration"
    ],
    problem: "The client needed a sophisticated AI-powered personal branding tool that could generate professional bios and taglines with custom style selectors and smooth user experience.",
    solution: "We built a complete React-based platform with OpenAI integration, custom prompt flows, animated style selectors, and Supabase backend for user management and data storage.",
    testimonial: {
      quote: "Zumetrix Labs delivered exactly what we envisioned. The AI integration is seamless and the user experience is fantastic. Looking forward to Phase 2!",
      author: "Kelly Andrews",
      role: "Founder, Best Business Services"
    },
    liveLink: "https://www.ifyify.art",
    stack: ["React", "TypeScript", "TailwindCSS", "Supabase", "OpenAI API"],
    services: ["SaaS Development", "AI Integration", "UI/UX Design", "Database Design"]
  },
  {
    id: 2,
    slug: "wellnesstracker-mobile-app",
    title: "WellnessTracker Mobile",
    category: "Mobile Application",
    type: "mobile",
    description: "An intuitive health and wellness tracking application with personalized insights, goal management, and social features for motivation.",
    longDescription: "WellnessTracker Mobile empowers users to take control of their health journey. The app features comprehensive health tracking, AI-powered insights, social challenges, and integration with popular fitness devices. Built with React Native for seamless cross-platform experience.",
    image: "/project_images/task_manager_portfolio_img.jpg",
    tags: ["React Native", "Firebase", "Machine Learning", "Redux", "GraphQL"],
    client: {
      name: "WellnessPath Startup",
      country: "Canada",
      industry: "Healthcare Technology"
    },
    duration: "6 months",
    team: "4 developers",
    year: "2024",
    featured: false,
    results: [
      "50,000+ downloads in first month",
      "4.8/5 app store rating",
      "85% user retention rate",
      "Featured in App Store"
    ],
    problem: "The client needed a comprehensive wellness tracking app that could integrate with multiple fitness devices and provide personalized insights to users.",
    solution: "We developed a React Native application with Firebase backend, machine learning algorithms for personalized recommendations, and seamless device integrations.",
    testimonial: {
      quote: "The team at Zumetrix Labs created an amazing wellness app that our users absolutely love. The AI insights feature is particularly impressive.",
      author: "Sarah Johnson",
      role: "CEO, WellnessPath"
    },
    stack: ["React Native", "Firebase", "Node.js", "Python", "TensorFlow"],
    services: ["Mobile App Development", "AI/ML Integration", "Backend Development", "API Integration"]
  },
  {
    id: 3,
    slug: "retailops-automation-platform",
    title: "RetailOps Automation",
    category: "Enterprise Solution",
    type: "enterprise",
    description: "End-to-end inventory management and order processing automation for a growing e-commerce business with multiple sales channels.",
    longDescription: "RetailOps Automation streamlines complex e-commerce operations across multiple channels. The system automates inventory management, order processing, supplier communications, and financial reporting. Built with Python and AWS, it processes thousands of orders daily.",
    image: "/project_images/FIT-GENIUS-FINAL.png",
    tags: ["Python", "AWS", "PostgreSQL", "REST API", "Docker", "Redis"],
    client: {
      name: "RetailOps Enterprise",
      country: "United Kingdom",
      industry: "E-commerce"
    },
    duration: "8 months",
    team: "5 developers",
    year: "2023",
    featured: false,
    results: [
      "75% reduction in processing time",
      "99.5% order accuracy",
      "50% cost savings in operations",
      "Handles 10,000+ orders daily"
    ],
    problem: "The client was struggling with manual order processing across multiple sales channels, leading to errors, delays, and high operational costs.",
    solution: "We built a comprehensive automation platform using Python and AWS that integrates with all major e-commerce platforms and automates the entire order fulfillment process.",
    testimonial: {
      quote: "Zumetrix Labs transformed our entire operation. The automation platform they built has saved us hundreds of hours and significantly reduced errors.",
      author: "James Mitchell",
      role: "Operations Director, RetailOps"
    },
    stack: ["Python", "Django", "AWS", "PostgreSQL", "Redis", "Docker"],
    services: ["Enterprise Software", "Process Automation", "Cloud Architecture", "API Development"]
  },
  {
    id: 4,
    slug: "taskflow-startup-mvp",
    title: "TaskFlow MVP",
    category: "Startup MVP",
    type: "mvp",
    description: "A rapid prototype for a project management startup, built to validate market demand and secure seed funding.",
    longDescription: "TaskFlow MVP was developed in just 6 weeks to help a startup validate their project management concept. The platform features team collaboration, task management, time tracking, and basic reporting. The MVP successfully helped secure $500K in seed funding.",
    image: "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800",
    tags: ["React", "Node.js", "Firebase", "Stripe", "Vercel"],
    client: {
      name: "TaskFlow Startup",
      country: "Australia",
      industry: "Productivity Software"
    },
    duration: "6 weeks",
    team: "2 developers",
    year: "2024",
    featured: false,
    results: [
      "Secured $500K seed funding",
      "1,000+ beta users",
      "Validated product-market fit",
      "95% user satisfaction"
    ],
    problem: "The startup needed to quickly validate their project management concept and secure funding with a functional MVP.",
    solution: "We rapidly developed a feature-complete MVP using React and Firebase, focusing on core functionality and user experience to demonstrate market viability.",
    testimonial: {
      quote: "Zumetrix Labs helped us build and launch our MVP in record time. The quality was exceptional and it directly contributed to our successful funding round.",
      author: "Michael Chen",
      role: "Founder, TaskFlow"
    },
    stack: ["React", "Node.js", "Firebase", "Stripe", "Material-UI"],
    services: ["MVP Development", "Rapid Prototyping", "Payment Integration", "User Authentication"]
  }
];

// Project filters and categories
export const projectCategories = [
  { id: "all", label: "All Projects" },
  { id: "saas", label: "SaaS Applications" },
  { id: "mobile", label: "Mobile Apps" },
  { id: "enterprise", label: "Enterprise Solutions" },
  { id: "mvp", label: "MVP Development" }
];

export const projectTechnologies = [
  "React", "Node.js", "Python", "React Native", "Firebase", "AWS", 
  "TypeScript", "PostgreSQL", "MongoDB", "Docker", "Kubernetes"
];

export const projectRegions = [
  { id: "all", label: "All Regions" },
  { id: "north-america", label: "North America" },
  { id: "europe", label: "Europe" },
  { id: "asia-pacific", label: "Asia Pacific" },
  { id: "middle-east", label: "Middle East" }
];