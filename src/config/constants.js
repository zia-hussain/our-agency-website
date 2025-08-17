// Zumetrix Labs - Configuration Constants
export const COMPANY = {
  name: import.meta.env.VITE_COMPANY_NAME || "Zumetrix Labs",
  email: import.meta.env.VITE_COMPANY_EMAIL || "hello@zumetrix.com",
  phone: import.meta.env.VITE_COMPANY_PHONE || "+92 (317) 259-6525",
  address: import.meta.env.VITE_COMPANY_ADDRESS || "Pakistan",
  website: import.meta.env.VITE_COMPANY_WEBSITE || "https://www.zumetrix.com",
};

export const FOUNDERS = [
  {
    name: import.meta.env.VITE_FOUNDER_1_NAME || "Zia Hussain",
    fullName: import.meta.env.VITE_FOUNDER_1_FULL_NAME || "Syed Zia Hussain Shah",
    role: import.meta.env.VITE_FOUNDER_1_ROLE || "Co-Founder & CEO",
    image: "/zia-hussain-founder.png",
    bio: "Zia is the visionary mind behind Zumetrix Labs. As the bridge between strategy, clients, and execution, he leads product direction, client success, and growth. With a strong background in full-stack development and a sharp instinct for business, Zia ensures every solution isn't just built well — it solves the right problem, beautifully.",
    skills: ["Strategy", "Client Acquisition", "React", "Node.js", "Growth Systems"],
    social: {
      upwork: "https://www.upwork.com/freelancers/ziahussain1",
      fiverr: "https://www.fiverr.com/syedziashahgill",
      linkedin: "https://www.linkedin.com/in/zia-hussain-404-/",
      github: "https://github.com/zia-hussain",
    }
  },
  {
    name: import.meta.env.VITE_FOUNDER_2_NAME || "Syed Omer Shah",
    fullName: import.meta.env.VITE_FOUNDER_2_NAME || "Syed Omer Shah",
    role: import.meta.env.VITE_FOUNDER_2_ROLE || "Co-Founder & CTO",
    image: "/syed-omer-shah-founder.png",
    bio: "Umer is the technical backbone of Zumetrix Labs. A focused engineering leader with deep expertise in scalable architecture, modern web stacks, and emerging AI automation, he turns complex ideas into fast, clean, production-ready systems. Currently diving deeper into intelligent automation and AI workflows to help clients stay ahead of the curve.",
    skills: ["Next.js", "TypeScript", "Firebase", "Python", "AI Automation"],
    social: {
      upwork: "https://www.upwork.com/freelancers/019551f0a911e24660",
      fiverr: "https://www.fiverr.com/omershahgillani",
      linkedin: "https://www.linkedin.com/in/omer-gillani/",
      github: "https://github.com/UmerGillani36",
    }
  }
];

export const SOCIAL_LINKS = {
  instagram: import.meta.env.VITE_INSTAGRAM_URL || "https://www.instagram.com/zumetrixlabs",
  linkedin: import.meta.env.VITE_LINKEDIN_URL || "https://www.linkedin.com/company/zumetrix-labs",
  github: import.meta.env.VITE_GITHUB_URL || "https://github.com/zumetrix-labs",
  twitter: import.meta.env.VITE_TWITTER_URL || "https://x.com/zumetrix83892",
};

export const SEO_CONFIG = {
  title: import.meta.env.VITE_META_TITLE || "Zumetrix Labs | #1 Software Development Agency Pakistan",
  description: import.meta.env.VITE_META_DESCRIPTION || "Pakistan's top software development agency founded by expert developers Zia Hussain and Syed Omer Shah.",
  keywords: import.meta.env.VITE_META_KEYWORDS || "Zumetrix Labs, Zia Hussain, Syed Omer Shah, software development agency Pakistan",
  gaTagId: import.meta.env.VITE_GA_TAG_ID || "G-PRSP59FL20",
  googleVerification: import.meta.env.VITE_GOOGLE_VERIFICATION || "XbgNbYnq2H0qTIfTCwVFlXrYWHnnvw0acGCUjdlI_Cs",
};

export const LOCATIONS = [
  "Karachi",
  "Lahore",
  "Islamabad",
  "Pakistan",
  "Worldwide"
];

export const MAIN_SERVICES = [
  "SaaS MVP Development",
  "React/Node.js Development",
  "Mobile App Development",
  "AI Automation Services",
  "Firebase Integration",
  "No-Code Automation",
  "Full-Stack Development",
  "UI/UX Design",
  "E-commerce Solutions",
  "API Development",
  "Cloud Migration",
  "DevOps Services",
  "Cybersecurity Solutions",
  "Performance Optimization",
  "Maintenance & Support",
  "Consulting & Strategy"

];