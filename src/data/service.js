import {
    Monitor,
    Smartphone,
    Database,
    Cog,
    Rocket,
    Palette,
} from "lucide-react";

export const services = [
    {
        "id": "web-apps",
        "icon": Monitor,
        "title": "Enterprise Web Applications",
        "subtitle": "Scalable, high-performance digital solutions",
        "description": "Transform your business vision into powerful, enterprise-grade web applications that scale globally. We build custom platforms using cutting-edge React, Next.js, and TypeScript technologies with cloud-native architecture designed for international markets. Perfect for ambitious startups and established enterprises who demand world-class performance, exceptional user experiences, and measurable business growth.",
        "features": [
            "React & TypeScript Development with Modern Architecture",
            "Progressive Web App (PWA) Support for Mobile-First Experience",
            "Optimized Cloud Architecture & Global CDN Deployment",
            "Advanced SEO & Lighthouse Performance Optimization (90+ scores)",
            "Real-time Interactions with WebSockets & Live Updates",
            "REST & GraphQL API Integration with Third-party Services",
            "Responsive, Accessible UI with International Design Standards"
        ],
        "technologies": [
            "React",
            "Next.js",
            "TypeScript",
            "Node.js",
            "PostgreSQL",
            "AWS"
        ],
        "price": "Starting at $8,000",
        "popular": false,
        "image": "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
        "id": "saas-dashboards",
        "icon": Database,
        "title": "SaaS MVP Development",
        "subtitle": "Launch your SaaS product in weeks, not months",
        "description": "Accelerate your startup journey with our proven SaaS MVP development process. We transform ambitious business ideas into market-ready products using React, Node.js, and modern cloud technologies. Our streamlined approach helps entrepreneurs validate concepts, secure funding, and scale globally with enterprise-grade architecture from day one.",
        "features": [
            "Rapid MVP Development (4-8 weeks from concept to launch)",
            "Real-time Analytics & Business Intelligence Dashboards",
            "Interactive Data Visualization with D3.js & Chart.js",
            "Multi-tenant Architecture with Role-based Access Control",
            "Automated Reporting & Export Tools for Business Insights",
            "Responsive, Mobile-friendly UI with Dark/Light Theme Support",
            "Stripe Payment Integration & Subscription Management"
        ],
        "technologies": [
            "React",
            "D3.js",
            "Chart.js",
            "Node.js",
            "PostgreSQL",
            "Redis"
        ],
        "price": "Starting at $12,000",
        "popular": true,
        "image": "https://images.pexels.com/photos/7688880/pexels-photo-7688880.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
        "id": "mobile-apps",
        "icon": Smartphone,
        "title": "Mobile Applications",
        "subtitle": "Cross-platform apps that feel native and perform flawlessly",
        "description": "Create powerful, cross-platform mobile applications that deliver exceptional user experiences across iOS and Android. Using React Native, Expo, and native development tools, we build apps that feel native, perform flawlessly, and scale to millions of users. Perfect for startups launching their first mobile product or enterprises expanding their digital presence.",
        "features": [
            "React Native & Expo Development for Cross-platform Efficiency",
            "Offline Mode & Push Notifications for Enhanced User Engagement",
            "App Store & Play Store Deployment with Optimization",
            "Device Feature Integrations (Camera, Location, Biometrics)",
            "Performance Monitoring & Crash Analytics with Real-time Alerts",
            "Clean & Responsive UI/UX Design with Platform-specific Guidelines",
            "Backend Integration with Firebase, AWS, or Custom APIs"
        ],
        "technologies": [
            "React Native",
            "Expo",
            "Firebase",
            "Redux",
            "Swift",
            "Kotlin"
        ],
        "price": "Starting at $15,000",
        "popular": false,
        "image": "https://images.pexels.com/photos/4386370/pexels-photo-4386370.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
        "id": "mvp-development",
        "icon": Rocket,
        "title": "Startup MVP Development",
        "subtitle": "Validate your business idea and secure funding fast",
        "description": "Transform your startup vision into a market-ready MVP in just 4-8 weeks. Our proven methodology helps entrepreneurs validate business concepts, attract early users, secure funding, and build scalable foundations for long-term growth. We focus on essential features that solve real problems while maintaining enterprise-grade quality and performance standards.",
        "features": [
            "Rapid UI/UX Prototyping with User-Centered Design",
            "MVP-First Architecture with Scalability Planning",
            "Integrated AI Workflows (OpenAI, LangChain) for Competitive Edge",
            "Stripe Payments & Firebase Authentication for Quick Launch",
            "Real-time Feature Support with WebSocket Integration",
            "Analytics & Early User Feedback Systems for Data-Driven Decisions",
            "Investor-Ready Demos with Professional Presentation Materials"
        ],
        "technologies": [
            "React",
            "Node.js",
            "Firebase",
            "Vercel",
            "Stripe",
            "OpenAI"
        ],
        "price": "Starting at $6,000",
        "popular": true,
        "image": "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
        "id": "automation",
        "icon": Cog,
        "title": "AI Automation Solutions",
        "subtitle": "Automate workflows and scale your business intelligently",
        "description": "Revolutionize your business operations with intelligent AI automation solutions that eliminate manual work, reduce errors, and accelerate growth. We design and implement custom automation workflows using OpenAI, no-code platforms, and custom development to streamline your processes and give you a competitive advantage in your market.",
        "features": [
            "No-Code & Low-Code Automation (Zapier, Make.com, n8n)",
            "Custom AI Bots with Python & OpenAI Integration",
            "Email Parsing & Automated Response Systems",
            "Report Scheduling & Data Processing Automation",
            "CRM & Google Sheets Integration for Seamless Workflows",
            "Slack/Discord Bot Setup for Team Communication",
            "Business Process Optimization & Workflow Design"
        ],
        "technologies": [
            "Python",
            "Zapier",
            "Make.com",
            "AWS Lambda",
            "n8n",
            "OpenAI"
        ],
        "price": "Starting at $4,000",
        "popular": false,
        "image": "https://images.pexels.com/photos/7688880/pexels-photo-7688880.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
        "id": "digital-strategy",
        "icon": Palette,
        "title": "Digital Strategy & Technical Consulting",
        "subtitle": "Strategic guidance from expert technical founders",
        "description": "Get expert guidance from our technical founders to make the right product decisions before investing in development. Our digital strategy services include comprehensive technical audits, growth-focused roadmaps, architecture planning, and hands-on consulting to help you build scalable, profitable digital products that dominate your market.",
        "features": [
            "Technical Discovery & Strategic Roadmapping",
            "Growth Planning & Monetization Strategy Development",
            "Architecture Review & Performance Optimization",
            "Technology Stack Selection & Implementation Planning",
            "Security & Performance Audits with Actionable Recommendations",
            "Team Training & Knowledge Transfer Sessions",
            "Competitive Analysis & Market Positioning Strategy"
        ],
        "technologies": [
            "Consulting",
            "Roadmaps",
            "Technical Docs",
            "Strategy",
            "Workshops",
            "Audits"
        ],
        "price": "Starting at $2,500",
        "popular": false,
        "image": "https://images.pexels.com/photos/4386370/pexels-photo-4386370.jpeg?auto=compress&cs=tinysrgb&w=800"
    }
];

export const process = [
    {
        step: "01",
        title: "Discovery & Strategy",
        description:
            "We start by understanding your business goals, target market, and technical requirements through comprehensive consultation and strategic planning sessions.",
    },
    {
        step: "02",
        title: "Architecture & Planning",
        description:
            "Our expert team develops a detailed technical roadmap, system architecture, and project timeline tailored to your specific business objectives and growth plans.",
    },
    {
        step: "03",
        title: "Design & Prototyping",
        description:
            "We create intuitive user interfaces, interactive prototypes, and comprehensive design systems that align with your brand identity and user expectations.",
    },
    {
        step: "04",
        title: "Development & Testing",
        description:
            "Our developers build your solution using industry best practices, clean code standards, and rigorous testing procedures to ensure exceptional quality and performance.",
    },
    {
        step: "05",
        title: "Launch & Scale",
        description:
            "We deploy your solution with optimized performance, provide comprehensive training, and offer ongoing support to ensure continued success and growth.",
    },
];