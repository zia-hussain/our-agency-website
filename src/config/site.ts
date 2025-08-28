// Zumetrix Labs - Site Configuration
// All site data driven from environment variables

export const SITE_CONFIG = {
  // Company Information
  company: {
    name: import.meta.env.VITE_COMPANY_NAME || "Zumetrix Labs",
    tagline: import.meta.env.VITE_COMPANY_TAGLINE || "We build world-class software solutions",
    email: import.meta.env.VITE_COMPANY_EMAIL || "hello@zumetrix.com",
    phone: import.meta.env.VITE_COMPANY_PHONE || "+92 XXX XXXXXXX",
    address: import.meta.env.VITE_COMPANY_ADDRESS || "Pakistan",
    website: import.meta.env.VITE_COMPANY_WEBSITE || "https://www.zumetrix.com",
  },

  // Founders Information
  founders: [
    {
      name: import.meta.env.VITE_FOUNDER_1_NAME || "Zia Hussain",
      fullName: import.meta.env.VITE_FOUNDER_1_FULL_NAME || "Syed Zia Hussain Shah",
      role: import.meta.env.VITE_FOUNDER_1_ROLE || "Co-Founder & CEO",
      image: import.meta.env.VITE_FOUNDER_1_IMAGE || "/zia-hussain-founder.png",
      bio: import.meta.env.VITE_FOUNDER_1_BIO || "Zia is the visionary mind behind Zumetrix Labs.",
      social: {
        upwork: import.meta.env.VITE_UPWORK_PROFILE_ZIA,
        fiverr: import.meta.env.VITE_FIVERR_PROFILE_ZIA,
        linkedin: import.meta.env.VITE_LINKEDIN_PROFILE_ZIA,
        github: import.meta.env.VITE_GITHUB_PROFILE_ZIA,
      }
    },
    {
      name: import.meta.env.VITE_FOUNDER_2_NAME || "Syed Omer Shah",
      fullName: import.meta.env.VITE_FOUNDER_2_FULL_NAME || "Syed Omer Shah",
      role: import.meta.env.VITE_FOUNDER_2_ROLE || "Co-Founder & CTO",
      image: import.meta.env.VITE_FOUNDER_2_IMAGE || "/syed-omer-shah-founder.png",
      bio: import.meta.env.VITE_FOUNDER_2_BIO || "Umer is the technical backbone of Zumetrix Labs.",
      social: {
        linkedin: import.meta.env.VITE_LINKEDIN_PROFILE_OMER,
        github: import.meta.env.VITE_GITHUB_PROFILE_OMER,
      }
    }
  ],

  // Social Media Links
  social: {
    x: import.meta.env.VITE_SOCIAL_X || "https://x.com/zumetrix83892",
    linkedin: import.meta.env.VITE_SOCIAL_LINKEDIN || "https://www.linkedin.com/company/zumetrix-labs",
    github: import.meta.env.VITE_SOCIAL_GITHUB || "https://github.com/zumetrix-labs",
    instagram: import.meta.env.VITE_SOCIAL_INSTAGRAM || "https://www.instagram.com/zumetrixlabs",
  },

  // Contact & Integration URLs
  contact: {
    formEndpoint: import.meta.env.VITE_CONTACT_FORM_ENDPOINT,
    googleSheetsWebhook: import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK,
    calendlyUrl: import.meta.env.VITE_CALENDLY_URL || "https://calendly.com/zumetrix-labs/consultation",
  },

  // SEO Configuration
  seo: {
    title: import.meta.env.VITE_META_TITLE || "Zumetrix Labs | #1 Software Development Agency",
    description: import.meta.env.VITE_META_DESCRIPTION || "Pakistan's top software development agency founded by expert developers Zia Hussain and Syed Omer Shah.",
    keywords: import.meta.env.VITE_META_KEYWORDS || "Zumetrix Labs, Zia Hussain, Syed Omer Shah, software development agency Pakistan",
    gaTagId: import.meta.env.VITE_GA_TAG_ID || "G-PRSP59FL20",
    googleVerification: import.meta.env.VITE_GOOGLE_VERIFICATION || "XbgNbYnq2H0qTIfTCwVFlXrYWHnnvw0acGCUjdlI_Cs",
  },

  // Business Metrics
  metrics: {
    projectsCompleted: import.meta.env.VITE_PROJECTS_COMPLETED || "50+",
    happyClients: import.meta.env.VITE_HAPPY_CLIENTS || "25+",
    yearsExperience: import.meta.env.VITE_YEARS_EXPERIENCE || "3+",
    successRate: import.meta.env.VITE_SUCCESS_RATE || "100%",
  }
};