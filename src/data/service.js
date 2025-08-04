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
        "title": "Web Applications",
        "subtitle": "Modern, scalable web solutions",
        "description": "Custom-built, high-performance web platforms using modern JavaScript frameworks and cloud-native infrastructure. Perfect for startups and enterprises who care about speed, UX, and growth.",
        "features": [
            "React & TypeScript Development",
            "Progressive Web App (PWA) Support",
            "Optimized Cloud Architecture & Deployment",
            "SEO & Lighthouse Optimization",
            "Real-time Interactions with WebSockets",
            "REST & GraphQL API Integration",
            "Responsive, Accessible UI"
        ],
        "technologies": [
            "React",
            "Next.js",
            "TypeScript",
            "Node.js",
            "PostgreSQL",
            "AWS"
        ],
        "price": "Starting at $5,000",
        "popular": false,
        "image": "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
        "id": "saas-dashboards",
        "icon": Database,
        "title": "SaaS Dashboards",
        "subtitle": "Data dashboards that drive decisions",
        "description": "Transform raw data into clear, actionable insights with custom SaaS dashboards. We design intuitive, responsive dashboards using React, D3.js, and modern data visualization libraries that help you track KPIs, monitor performance, and scale your SaaS product confidently.",
        "features": [
            "Real-time Analytics & Metrics",
            "Interactive Charting & Filtering",
            "Role-based Access Control",
            "Multi-tenant Architecture",
            "Export & Reporting Tools",
            "Responsive, Mobile-friendly UI"
        ],
        "technologies": [
            "React",
            "D3.js",
            "Chart.js",
            "Node.js",
            "PostgreSQL",
            "Redis"
        ],
        "price": "Starting at $8,000",
        "popular": true,
        "image": "https://images.pexels.com/photos/7688880/pexels-photo-7688880.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
        "id": "mobile-apps",
        "icon": Smartphone,
        "title": "Mobile Applications",
        "subtitle": "Cross-platform apps that feel native",
        "description": "We create powerful, cross-platform mobile applications using React Native, Expo, and native development tools. Our mobile apps run smoothly across both iOS and Android with fast deployment, native-like performance, and seamless user experiences.",
        "features": [
            "React Native & Expo Development",
            "Offline Mode & Push Notifications",
            "App Store & Play Store Deployment",
            "Device Feature Integrations (Camera, Location, etc.)",
            "Performance & Crash Monitoring",
            "Clean & Responsive UI/UX Design"
        ],
        "technologies": [
            "React Native",
            "Expo",
            "Firebase",
            "Redux",
            "Swift",
            "Kotlin"
        ],
        "price": "Starting at $12,000",
        "popular": false,
        "image": "https://images.pexels.com/photos/4386370/pexels-photo-4386370.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
        "id": "mvp-development",
        "icon": Rocket,
        "title": "MVP Development",
        "subtitle": "Validate your idea, fast",
        "description": "From idea to product in weeks—not months. We help startups and entrepreneurs launch lean SaaS MVPs with just the right features to test the market, raise funding, or onboard users. Our MVP development process includes rapid prototyping, user authentication, payment integration, and deployment.",
        "features": [
            "Rapid UI/UX Prototyping",
            "MVP-First Architecture",
            "Integrated AI Workflows (OpenAI, LangChain)",
            "Stripe Payments & Firebase Auth",
            "Real-time Feature Support",
            "Analytics & Early User Feedback"
        ],
        "technologies": [
            "React",
            "Node.js",
            "Firebase",
            "Vercel",
            "Stripe",
            "OpenAI"
        ],
        "price": "Starting at $4,000",
        "popular": true,
        "image": "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
        "id": "automation",
        "icon": Cog,
        "title": "Automation Solutions",
        "subtitle": "Automate the boring stuff",
        "description": "We design and build intelligent workflow automations and AI-powered solutions that save time, reduce manual errors, and help you scale. Our automation services include no-code solutions (Zapier, Make.com), custom Python bots, and AI integrations that streamline your business processes.",
        "features": [
            "No-Code & Low-Code Automation (Zapier, Make)",
            "Custom Bots with Python",
            "Email Parsing & Auto-Replies",
            "Report Scheduling & Data Cleanup",
            "CRM & Google Sheet Integrations",
            "Slack/Discord Bot Setup"
        ],
        "technologies": [
            "Python",
            "Zapier",
            "Make.com",
            "AWS Lambda",
            "n8n",
            "Celery"
        ],
        "price": "Starting at $2,500",
        "popular": false,
        "image": "https://images.pexels.com/photos/7688880/pexels-photo-7688880.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
        "id": "digital-strategy",
        "icon": Palette,
        "title": "Digital Strategy & Consulting",
        "subtitle": "Plan smarter, build better",
        "description": "We offer expert 1-on-1 consulting, technical architecture planning, and growth-focused audits to help you make the right product decisions before writing a single line of code. Our digital strategy services include technology roadmaps, competitive analysis, and scalability planning.",
        "features": [
            "Technical Discovery & Roadmapping",
            "Growth Planning & Monetization Strategy",
            "Architecture Review & Optimization",
            "Tool & Stack Selection",
            "Security & Performance Audits",
            "Team Training & Knowledge Transfer"
        ],
        "technologies": [
            "Consulting",
            "Roadmaps",
            "Technical Docs",
            "Strategy",
            "Workshops",
            "Audits"
        ],
        "price": "Starting at $1,500",
        "popular": false,
        "image": "https://images.pexels.com/photos/4386370/pexels-photo-4386370.jpeg?auto=compress&cs=tinysrgb&w=800"
    }
];

export const process = [
    {
        step: "01",
        title: "Discovery",
        description:
            "We start by understanding your business, goals, and challenges through detailed consultation.",
    },
    {
        step: "02",
        title: "Strategy",
        description:
            "We develop a comprehensive strategy and technical roadmap tailored to your specific needs.",
    },
    {
        step: "03",
        title: "Design",
        description:
            "Our team creates intuitive designs and prototypes that align with your brand and user expectations.",
    },
    {
        step: "04",
        title: "Development",
        description:
            "We build your solution using best practices, clean code, and rigorous testing procedures.",
    },
    {
        step: "05",
        title: "Launch",
        description:
            "We deploy your solution and provide ongoing support to ensure optimal performance.",
    },
];
