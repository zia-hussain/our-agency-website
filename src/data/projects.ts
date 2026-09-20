// Zumetrix Labs - Projects Data (API-Ready Architecture)
// All project information for portfolio pages - designed for easy API migration

export interface Project {
  id: number;
  slug: string;
  title: string;
  // The one canonical service this case study is the strongest proof for —
  // stored explicitly rather than guessed at render time from freeform
  // `services` labels (that heuristic still resolves the "What We Delivered"
  // tags below, since those are meant to show breadth, not a single owner).
  primaryService: "saas-mvp-development" | "web-application-development" | "mobile-app-development" | "ai-automation-solutions" | "product-rescue-stabilization";
  category: string;
  type: string;
  description: string;
  longDescription: string;
  image: string;
  /** Optional crawler-safe share image (1200x630 PNG/JPEG). Falls back to `image`. */
  ogImage?: string;
  ogImageAlt?: string;
  // "contain" for a hand-authored diagram whose composition would be
  // damaged by the hero frame's default center-crop (see TiltImage). Leave
  // unset for ordinary photography, where cropping to fill the frame is fine.
  heroImageFit?: "cover" | "contain";
  // Same real-alternate-composition mobileSrc pattern as articles.js's
  // heroImageMobile — a case study whose hero is a dense hand-authored
  // diagram (not a photo) needs one too, or its mobile visitors get the
  // desktop composition scaled down to illegible size.
  heroImageMobile?: string;
  gallery?: string[];
  tags: string[];
  client: {
    name: string;
    country: string;
    industry: string;
  };
  // Overrides the "Client" label on the case-study page — e.g. "Product" when
  // the named entity is the product itself, or "Engagement Type" when the
  // client identity is withheld and there's no name to attach a label to.
  clientLabel?: string;
  duration: string;
  team: string;
  year: string;
  featured: boolean;
  homepageFeatured?: boolean;
  visibility?: "private-proof" | "anonymous-public" | "public-seo";
  proofStatus?: "draft" | "client-approved" | "verified";
  // Explicit, per-project editorial decision — deliberately NOT derived from
  // `homepageFeatured` (that flag is about the 3-slot homepage carousel and
  // has nothing to do with whether this page should be crawlable) and NOT a
  // blanket default. Set false for the anonymized/proofStatus:"draft" case
  // studies until their privacy review completes and proofStatus moves to
  // "client-approved" or "verified" — see the Phase 1 delta report for the
  // full per-project reasoning.
  searchIndexable: boolean;
  heroOutcome?: string;
  snapshot?: string;
  proofPoints?: {
    label: string;
    value: string;
    description?: string;
    confidence?: "measured" | "client-confirmed" | "delivered" | "expected";
  }[];
  beforeAfter?: {
    before?: string;
    build?: string;
    after?: string;
  };
  media?: {
    type: "image" | "workflow" | "walkthrough" | "testimonial-video";
    src: string;
    title: string;
    caption?: string;
    privacy?: "public" | "private";
  }[];
  results: string[];
  problem: string;
  solution: string;
  walkthroughVideo?: {
    title: string;
    url: string;
    provider?: "loom" | "youtube" | "vimeo" | "direct";
    description?: string;
  };
  videoTestimonial?: {
    title: string;
    url: string;
    provider?: "loom" | "youtube" | "vimeo" | "direct";
    description?: string;
  };
  screenshots?: {
    src: string;
    alt: string;
    caption?: string;
  }[];
  workflowImages?: {
    src: string;
    alt: string;
    caption?: string;
  }[];
  caseStudy?: {
    situation?: string;
    problem?: string;
    built?: string[];
    workflow?: {
      step: string;
      title: string;
      description: string;
    }[];
    decisions?: {
      title: string;
      description: string;
    }[];
    results?: {
      title: string;
      description: string;
      confidence?: "measured" | "client-confirmed" | "delivered" | "expected";
    }[];
    proofNotes?: string[];
    ctaAngle?: string;
  };
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
  liveLink?: string;
  githubLink?: string;
  // Key into TESTIMONIAL_FILMS (src/data/testimonialFilms.ts) — only set
  // when a real, self-hosted video of this exact client exists. Same source
  // of truth already used by RescueDetailPage/WebDetailPage's embeds, so a
  // case study never has to re-describe video metadata that's already
  // canonical elsewhere.
  testimonialFilmKey?: string;
  // Optional — only for case studies whose real story is a verified
  // before/pivot/after contrast (a stalled effort, a takeover, a fast
  // resolution). Replaces the generic hero image with a native evidence
  // card built from the same frame/border/divider language every other
  // case study's hero visual already uses. Not populated by default; a
  // project with no heroEvidence renders exactly as it did before.
  heroEvidence?: {
    beforeLabel: string;
    beforeValue: string;
    beforeCaption: string;
    pivotLabel: string;
    afterLabel: string;
    afterValue: string;
    afterCaption: string;
  };
  // Overrides "The Situation" section's default "What We Built" label —
  // only for case studies where that phrase would overclaim. A takeover
  // didn't "build" anything from zero; it's honest to say so.
  situationAfterLabel?: string;
  // A one-line bridge rendered above the testimonial quote — connects the
  // "What Changed" list to the video that follows, so the video reads as
  // the story's payoff rather than an unannounced widget.
  testimonialLeadIn?: string;
  // Overrides RelatedReading's default "Continue with Zumetrix" eyebrow —
  // already a supported prop on the shared component, just not previously
  // passed from project data.
  relatedReadingEyebrow?: string;
  // Overrides the shared closing section's default "You've seen what we
  // built" line — imprecise for a takeover story for the same reason
  // situationAfterLabel exists.
  closeHeadline?: { muted: string; foreground: string };
  // Verified, attributed client testimony about the working relationship —
  // for case studies where the technical detail is unknown or not public
  // but the client's own recorded words are real. Every `quote` must appear
  // verbatim in the source (video transcript / written review); nothing here
  // may be paraphrased or upgraded into a Zumetrix claim.
  clientExperience?: {
    eyebrow: string;
    heading: string;
    items: { icon: "response" | "communication"; value: string; quote: string }[];
    advice?: { label: string; quote: string; attribution: string };
  };
  stack: string[];
  services: string[];
  // When true, service tags that match no keyword link to this project's own
  // primaryService page instead of the generic web-application page.
  linkServicesToPrimary?: boolean;
  kpis?: {
    label: string;
    value: string;
    description: string;
  }[];
  // Optional, curated cross-links into the article clusters this case study
  // genuinely relates to. Deliberately not populated on every project — only
  // where a real connection exists, per the same "don't force it" restraint
  // as the rest of the site's internal linking.
  relatedReading?: {
    href: string;
    label: string;
    description: string;
  }[];
}

export const projects: Project[] = [
  {
    id: 1,
    slug: "ifyify-ai-personal-branding",
    primaryService: "saas-mvp-development",
    searchIndexable: true,
    title: "Ifyify - AI-Powered Personal Branding Tool",
    category: "Web Application",
    type: "saas",
    description: "A sophisticated React-based AI platform that helps users craft professional bios, taglines, and brand personas using custom-built prompt flows and style selectors.",
    longDescription: "Ifyify is an AI-powered personal branding platform built with React, TailwindCSS, Supabase, and OpenAI integration. It helps professionals generate bios, taglines, and brand personas through a guided, prompt-based flow. The build included animated style-selector interfaces, a multi-step onboarding experience, OpenAI-driven generation logic, authentication, and a Supabase backend structured for future feature expansion.",
    image: "/project_images/Ifyify.jpg",
    gallery: [
      "/project_images/Ifyify.jpg",
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
      "Platform structured for future feature expansion"
    ],
    problem: "The client needed a sophisticated AI-powered personal branding tool that could generate professional bios and taglines with custom style selectors, smooth user experience, and scalable architecture for rapid growth.",
    solution: "We built a complete React-based platform with OpenAI integration, custom prompt engineering flows, beautifully animated style selectors, and robust Supabase backend for user management, authentication, and data storage with real-time capabilities.",
    testimonial: {
      quote: "Zumetrix Labs delivered exactly what we envisioned and more. The AI integration is seamless, the user experience is fantastic, and the code quality is exceptional. Looking forward to Phase 2 expansion!",
      author: "Kelly Andrews",
      role: "Founder, Best Business Services"
    },
    liveLink: "",
    stack: ["React", "TypeScript", "TailwindCSS", "Supabase", "OpenAI API", "Vercel"],
    services: ["SaaS Development", "AI Integration", "UI/UX Design", "Database Design", "Authentication"],
    kpis: [
      { label: "Phase 1 Duration", value: "2 weeks", description: "From concept to live MVP, per the project record" },
      { label: "Client Feedback", value: "Positive", description: "Client-reported: \"delivered exactly what we envisioned and more\"" }
    ],
    relatedReading: [
      {
        href: "/articles/build-saas-mvp-in-30-days",
        label: "Can you build a SaaS MVP in 30 days?",
        description: "How to decide what a first version has to prove, and what evidence earns the next phase.",
      },
    ]
  },
  // 7. Forlag – Publishing Sales & Inventory Dashboard
{
  id: 7,
  slug: "forlag-publishing-sales-inventory-dashboard",
  primaryService: "web-application-development",
  searchIndexable: true,
  title: "Forlag – Publishing Sales & Inventory Analytics Dashboard",
  category: "Web Application",
  type: "saas",
  description: "An end-to-end analytics dashboard for a Norwegian publishing company, turning raw CSV files into live sales, inventory, and customer insights.",
  longDescription: "Forlag is a data-driven analytics platform built specifically for a Norwegian publishing company that needed clarity across sales, inventory, and customer performance. Phase 1 shipped as a fully frontend-powered dashboard that reads Sales and Inventory CSV/XLSX files, computes KPIs on the fly, and stores structured aggregates in localStorage for instant load times. Phase 2 replaced that with a real backend — Node.js, PostgreSQL, and Supabase — and added a fully automated ingestion pipeline: incoming files land on the client's SMTP server, a GitHub Actions workflow picks them up, and the pipeline parses and inserts the data straight into the dashboard with no manual upload step at all. The UI features a modern glass-style layout, responsive grid-based KPIs, Nivo-powered charts, and carefully tuned performance to handle thousands of records. From MTD/YTD comparisons to inventory valuation and dead-stock detection, Forlag gives executives a clear, reliable, and beautiful way to understand their business at a glance — now updating itself.",
  image: "/project_images/forlag.jpg",
  gallery: [
    "/project_images/forlag.jpg"
  ],
  tags: [
    "React", "TypeScript", "TailwindCSS", "Node.js", "PostgreSQL", "Supabase",
    "GitHub Actions", "Nivo Charts", "Data Visualization", "Responsive UI"
  ],
  client: {
    name: "Harald & Eivind – Forlag (Publishing Company)",
    country: "Norway",
    industry: "Publishing & Book Sales"
  },
  duration: "6–8 weeks (Phased)",
  team: "Zumetrix Labs Team",
  year: "2025",
  featured: true,
  homepageFeatured: true,
  results: [
    "Replaced fragile Excel workflows with a visual, always-up-to-date dashboard.",
    "Implemented MTD/YTD comparisons with correct same-period logic across years.",
    "Designed a 7-KPI inventory overview including stock value, dead stock, and category breakdown.",
    "Phase 2: rebuilt on a real Node.js + PostgreSQL + Supabase backend, replacing the original localStorage-only architecture.",
    "Phase 2: fully automated data ingestion — a GitHub Actions workflow watches the client's SMTP server and inserts incoming files straight into the dashboard with zero manual upload.",
    "Achieved fast performance even with 30,000+ order rows."
  ],
  problem: "The client managed sales and inventory through multiple spreadsheets and manual calculations, making it difficult to understand MTD/YTD performance, inventory risk, and customer behavior across different channels and time periods.",
  solution: "Phase 1 was a modular React dashboard that ingested raw CSV/XLSX files, normalized dates, aggregated metrics per page, and stored processed data in localStorage. Phase 2 replaced that foundation with a real backend — Node.js, PostgreSQL, and Supabase — and added a GitHub Actions pipeline that watches the client's SMTP server for incoming files and inserts them directly into the dashboard, end to end, with no manual step left in the workflow.",
  testimonial: {
    quote: "He built a beautiful sales- and inventory dashboard for me over a month, and went out of his way to make it just as I wanted it. He worked around the clock, and we had meetings whenever it was nescessary.",
    author: "Harald",
    role: "Co-owner, Forlag"
  },
  liveLink: "",
  stack: [
    "React", "TypeScript", "TailwindCSS", "Nivo", "Vite",
    "Node.js", "PostgreSQL", "Supabase", "GitHub Actions"
  ],
  services: [
    "Dashboard Development",
    "Data Modeling & Aggregation",
    "UI/UX Design",
    "Backend Architecture",
    "Workflow Automation",
    "CSV/XLSX Processing"
  ],
  kpis: [
    {
      label: "Rows Handled",
      value: "30,000+",
      description: "Smooth performance with thousands of orders and products"
    },
    {
      label: "Manual Reporting Time",
      value: "-80%",
      description: "Reduction in manual Excel calculations and analysis"
    },
    {
      label: "Data Ingestion",
      value: "Fully Automated",
      description: "GitHub Actions watches the client's SMTP server and inserts incoming files straight into the dashboard — no manual upload step"
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
  primaryService: "ai-automation-solutions",
  searchIndexable: true,
  title: "Floating Stone Ranch – Processor Intake & Logistics Automation",
  category: "Enterprise Solution",
  type: "enterprise",
  description: "An Airtable + Make.com powered intake and logistics engine for a beef processor, handling carcass tracking, boxing, and shipping flows.",
  longDescription: "Floating Stone Ranch needed a robust system to manage beef processing logistics—from carcass intake to boxing, lot tracking, and shipping documentation. We designed an Airtable base that acts as the single source of truth for all cattle, carcasses, boxes, and shipments. On top of that, we built Make.com scenarios that automate status changes, generate Bill of Lading structures, and connect different tables via stable relationships. The system transforms manual, error-prone workflows into a streamlined digital process where each carcass, box, and shipment is traceable with clear data relationships and reporting capabilities.",
  image: "/project_images/floating-stone.jpg",
  gallery: [
    "/project_images/floating-stone.jpg"
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
  team: "Zumetrix Labs Team",
  year: "2025",
  featured: true,
  homepageFeatured: true,
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
    quote: "The team understood the complexity of my industry and of the project quickly and were flexible with the scope as we all learned to deal with new solutions on the fly. I will continue to use this team.",
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
      label: "Automation Layer",
      value: "Make.com",
      description: "Key status transitions run through Make.com scenarios"
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
  primaryService: "mobile-app-development",
  searchIndexable: true,
  title: "Skill x Swap – Credit-Based Skill Trading Marketplace (MVP)",
  category: "Mobile Application",
  type: "mvp",
  description: "A React Native MVP that lets users trade skills using a monthly credit system and earned swap credits, powered by Firebase and Stripe-ready architecture.",
  longDescription: "Skill x Swap is a modern skill trading marketplace where users can offer their skills and request others' skills using a credit-based system. We built the MVP using React Native and Firebase, with a clean onboarding flow, Core vs Lite Pro user tiers, and a monthly credit allowance system. The platform also supports earned credits that accumulate as users successfully complete swaps. The app includes skills you offer and skills you want, a matchmaking flow, sending swap requests, and managing pending requests. The architecture is designed to plug in Stripe for subscription-based Pro accounts and an enterprise edition in future phases.",
  image: "/project_images/skillxswap.jpg",
  gallery: [
    "/project_images/skillxswap.jpg"
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
  team: "Zumetrix Labs Team",
  year: "2025",
  featured: true,
  homepageFeatured: true,
  results: [
    "Completed a full-featured MVP including onboarding, skill management, and swap flows.",
    "Implemented monthly credit allowances and persistent earned credits logic.",
    "Designed dynamic skill lists where users can add missing skills to a global collection.",
    "Prepared architecture for Stripe subscriptions and enterprise org accounts in future phases."
  ],
  problem: "The founder needed a clean, intuitive skill trading app that could handle different user tiers, monthly credit limits, and earned credits from completed swaps, while staying simple enough for a first MVP.",
  solution: "We implemented a React Native app backed by Firebase, with clear user onboarding, separated \"Skills I Offer\" and \"Skills I Want\" lists, a credit-aware swap request system, and proper differentiation between monthly allowance credits and earned credits. The system was architected for future Stripe integration and an enterprise white-label edition.",
  testimonial: {
    quote: "I'd recommend absolutely everyone to work with Omer. From my first outreach with him, he understood my requirements exactly. Even better than I did! He communicates clearly, timely and is genuinely exceptional. I wouldn't have been able to launch my startup without his expertise in app building and development. 100% will use Omer every time I need help. Super great guy through and through!",
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
  ],
  relatedReading: [
    {
      href: "/articles/mobile-app-development-flutter-react-native",
      label: "Flutter vs React Native: which is right for you?",
      description: "The framework decision behind this build, and two others like it.",
    },
  ]
},

// 10. Tomo – Voice AI Companion App
{
  id: 10,
  slug: "tomo-voice-ai-companion",
  primaryService: "mobile-app-development",
  searchIndexable: true,
  title: "Tomo – Voice-First AI Companion App",
  category: "Mobile Application",
  type: "mobile",
  description: "A voice-first AI companion built with React Native and voice SDKs, delivering smooth, real-time conversations in a premium UI.",
  longDescription: "Tomo is a voice-first AI companion designed to feel like a friendly assistant you can just talk to. We built the mobile app using React Native and a voice SDK, focusing on low-latency request handling, clean audio pipeline management, and a beautifully minimal UI that fits the brand. The app maintains conversation state, handles streaming responses, and gives users a natural voice experience with subtle animations and gradients to keep the interface feeling alive.",
  image: "/project_images/tomo.jpg",
  gallery: [
    "/project_images/tomo.jpg"
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
  ],
  relatedReading: [
    {
      href: "/articles/mobile-app-development-flutter-react-native",
      label: "Flutter vs React Native: which is right for you?",
      description: "Five real questions to decide the framework, including how this build made the call.",
    },
  ]
},

// 11. HjelpNå – Handyman Marketplace PWA (Bubble.io)
{
  id: 11,
  slug: "hjelpna-handyman-marketplace",
  primaryService: "web-application-development",
  searchIndexable: true,
  title: "HjelpNå – Handyman Marketplace PWA",
  category: "Web Application",
  type: "mvp",
  description: "A Bubble.io-based PWA marketplace for local handyman services in Norway, including job posting, bidding, subscriptions, and chat.",
  longDescription: "HjelpNå is a Norwegian handyman marketplace similar to local service platforms like Minsmåjobb and TaskRabbit, built using Bubble.io as a Progressive Web App. The platform allows homeowners to post jobs, receive bids from service providers, and choose between standard and instant-help flows. It includes provider subscription tiers, Stripe-based escrow payments, real-time chat between clients and providers, and geo-targeting filters for relevant matches. We supported architecture recommendations, data structure design, and best-practice setup for scaling the PWA.",
  image: "/project_images/helpna.jpg",
  gallery: [
    "/project_images/helpna.jpg"
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
  primaryService: "saas-mvp-development",
  searchIndexable: true,
  title: "Utility Bill Deal Finder – AI-Powered Bill Analysis MVP",
  category: "Web Application",
  type: "mvp",
  description: "An MVP concept for analyzing uploaded utility bills using OCR and AI to recommend cheaper plans and deals.",
  longDescription: "The Utility Bill Deal Finder is an MVP planned with Imane to help users reduce monthly utility costs by analyzing their bills. The concept includes a React/Next.js web app where users upload bills, an OCR layer using Tesseract or Google Vision, and an AI-backed rules engine that compares usage patterns against better available deals. The roadmap includes alerts when better deals are detected, a recommendation dashboard, and integration with payment providers and CRMs.",
  image: "/project_images/utility-bill-finder.jpg",
  gallery: [
    "/project_images/utility-bill-finder.jpg"
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
  problem: "Users can overpay for utilities without understanding their real usage patterns or market options. The client needed a system to make sense of uploaded bills and surface better deals automatically.",
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
  primaryService: "mobile-app-development",
  searchIndexable: true,
  title: "PawSpace – Pet Services Marketplace App",
  category: "Mobile Application",
  type: "mobile",
  description: "A React Native marketplace for pet services, including sitter listings, booking flows, and owner-provider coordination.",
  longDescription: "PawSpace is a pet services marketplace app built with React Native, providing a clean way for pet owners to find and book sitters, walkers, and other services. The app features provider onboarding, profile creation, service listings, booking management, and a streamlined experience for both owners and providers. The UI focuses on trust, simplicity, and clarity, particularly around availability and booking flows.",
  image: "/project_images/pawspace.jpg",
  gallery: [
    "/project_images/pawspace.jpg"
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
  ],
  relatedReading: [
    {
      href: "/articles/mobile-app-development-flutter-react-native",
      label: "Flutter vs React Native: which is right for you?",
      description: "Why a two-sided marketplace app like this one is a natural React Native fit.",
    },
  ]
},

// 14. Bondfire – Event Booking App (Bug Fix & Feature Delivery)
{
  id: 14,
  slug: "bondfire-event-booking-app",
  primaryService: "mobile-app-development",
  searchIndexable: true,
  title: "Bondfire – Event Booking App Stabilization & Feature Enhancements",
  category: "Mobile Application",
  type: "mobile",
  description: "React Native app stabilization for an event booking product, including bug fixes, feature updates, and TestFlight deployments.",
  longDescription: "Bondfire is an event-focused app that needed stability, bug fixes, and feature completion. We worked inside an existing React Native codebase to resolve merge conflicts, fix navigation bugs, improve booking flows, and prepare builds for TestFlight distribution. The project included collaborating with another developer, cleaning up branches, and ensuring successful iOS builds.",
  image: "/project_images/bondfire.jpg",
  gallery: [
    "/project_images/bondfire.jpg"
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
  ],
  relatedReading: [
    {
      href: "/articles/taking-over-a-saas-from-another-dev-team",
      label: "Taking over a SaaS: what to check first",
      description: "The order that protects you when inheriting someone else's codebase.",
    },
    {
      href: "/articles/signs-your-saas-needs-stabilization-not-rebuild",
      label: "Signs your codebase needs stabilization, not a rebuild",
      description: "How to tell a process gap apart from a genuine structural problem.",
    },
  ]
},

// 15. Hostel Management System – MERN Admin Panel
{
  id: 15,
  slug: "hostel-management-system-mern",
  primaryService: "web-application-development",
  searchIndexable: true,
  title: "Hostel Management System – MERN Stack Admin Panel",
  category: "Web Application",
  type: "saas",
  description: "A MERN-based hostel management system with dashboards for rooms, bookings, billing, and staff.",
  longDescription: "The Hostel Management System is a full-stack MERN application built as a portfolio-grade project and a real-world style solution for managing hostels. It includes role-based access, room and bed management, booking records, payment tracking, and staff overviews. The UI is dashboard-driven, making it easy for admins to see occupancy, upcoming check-ins, and revenue at a glance.",
  image: "/project_images/Hostel-Management.jpg",
  gallery: [
    "/project_images/Hostel-Management.jpg"
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
  primaryService: "ai-automation-solutions",
  searchIndexable: true,
  title: "Stripe to Airtable – Subscription Sync Automation",
  category: "Automation System",
  type: "automation",
  description: "Make.com/Zapier automations that sync Stripe subscription events into Airtable for reporting, support, and internal operations.",
  longDescription: "This automation bridges Stripe and Airtable to keep subscription data in sync for internal teams. Whenever a subscription is created, updated, or canceled in Stripe, the automation updates Airtable records with customer details, plan info, billing cycles, and status. This eliminates manual data copying and gives customer support and finance teams a real-time view of subscriptions in a familiar Airtable interface.",
  image: "/project_images/stripe-to-airtable.jpg",
  gallery: [
    "/project_images/stripe-to-airtable.jpg"
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
    "Stripe subscription events (created, updated, canceled) update Airtable records automatically.",
    "Gave ops teams a real-time subscription overview in Airtable.",
    "Standardized subscription fields for easier reporting."
  ],
  problem: "Clients using Stripe for subscriptions can lack a clean, non-technical view of active and canceled subscriptions inside their internal tools.",
  solution: "We set up webhook-driven automations using Make.com or Zapier that listen to Stripe events and map them into structured Airtable records, including customer, plan, and billing information.",
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
      label: "Sync Method",
      value: "Webhook-driven",
      description: "Stripe subscription events update Airtable automatically"
    }
  ],
  relatedReading: [
    {
      href: "/articles/when-is-ai-automation-the-wrong-choice",
      label: "When is AI automation the wrong choice?",
      description: "This automation runs on exact, deterministic rules — no AI in the loop, because none was needed.",
    },
  ]
},

// 17. Shopify → Notion P&L Automation
{
  id: 17,
  slug: "shopify-to-notion-pnl-automation",
  primaryService: "ai-automation-solutions",
  searchIndexable: true,
  title: "Shopify to Notion – Automated P&L Reporting",
  category: "Automation System",
  type: "automation",
  description: "An automation flow that pushes Shopify order data into Notion to generate near real-time profit and loss views.",
  longDescription: "For e-commerce clients running on Shopify, we created an automation flow that exports order and revenue data into Notion databases, enabling a living P&L report. The system pulls order details, fees, and key metadata, and maps them into Notion properties where the client can apply formulas, filters, and dashboards. This gives founders a quick, visual handle on performance without having to export CSVs every week.",
  image: "/project_images/shopify-to-airtable.jpg",
  gallery: [
    "/project_images/shopify-to-airtable.jpg"
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
    "Replaced manual CSV exports with an automatic sync of new orders."
  ],
  problem: "Founders wanted a simple way to see P&L-like views in Notion instead of running complex exports from Shopify every week.",
  solution: "We connected Shopify to Notion via Make.com/Zapier, mapping relevant order data into carefully structured Notion databases that support formula-driven P&L views.",
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
  ],
  relatedReading: [
    {
      href: "/articles/when-is-ai-automation-the-wrong-choice",
      label: "When is AI automation the wrong choice?",
      description: "Another deterministic, rules-based automation — the right tool for an exact mapping problem.",
    },
  ]
},

// 18. Twilio Auto Dialer – Call Sequencing Logic
{
  id: 18,
  slug: "twilio-auto-dialer-logic",
  primaryService: "ai-automation-solutions",
  searchIndexable: true,
  title: "Twilio Auto Dialer – Sequential Call Logic",
  category: "Automation System",
  type: "automation",
  description: "A Twilio-powered auto dialer that calls through a list of contacts, detects call completion, and moves to the next lead.",
  longDescription: "The Twilio Auto Dialer is a backend + Twilio integration that automatically calls through a JSON list of contacts. It detects when a call ends, logs the status, and moves on to the next contact, giving sales or support teams a semi-automatic calling experience. The system is designed for integration with CRMs and flexible campaign logic.",
  image: "/project_images/twilio-call.jpg",
  gallery: [
    "/project_images/twilio-call.jpg"
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
    "Tracks completion and advances through the contact list automatically.",
    "Prepared for deeper CRM integration in future versions."
  ],
  problem: "Teams needed a way to move through outbound call lists without manually dialing each number and tracking completion.",
  solution: "We built Twilio-backed logic that dials, tracks, and advances through a contact list, with hooks ready for CRM logging and reporting.",
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
  primaryService: "ai-automation-solutions",
  searchIndexable: true,
  title: "Twilio Conference Call – Dynamic Participant Management",
  category: "Automation System",
  type: "automation",
  description: "A Twilio-based conference calling solution that supports adding and removing participants dynamically from React Native apps.",
  longDescription: "We implemented Twilio conference call logic that allows a call host to add or remove participants from a running call, powered by Twilio Voice and backed by a clean backend API layer. This supports use cases like team calls, support triage, or escalation, especially in mobile apps where call flows need to be managed with minimal friction.",
  image: "/project_images/twilio-auto-dialer.jpg",
  gallery: [
    "/project_images/twilio-auto-dialer.jpg"
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
  primaryService: "ai-automation-solutions",
  searchIndexable: true,
  title: "Zumetrix Labs – Internal Automation & CRM Stack",
  category: "Enterprise Solution",
  type: "enterprise",
  description: "A collection of internal tools, trackers, and automations that power Zumetrix Labs operations, deals, tasks, and client pipelines.",
  longDescription: "Over time, Zumetrix Labs has developed its own internal ecosystem of tools: deal trackers, task boards, income and expense sheets, lead trackers, and notification flows. These systems, built using Airtable, Google Sheets, Notion, and automation tools like Make.com and Zapier, act as the operational backbone of the agency. Together, they track project pipelines, finances, recurring tasks, and growth experiments, letting the team focus on closing deals and delivering work instead of managing chaos.",
  image: "/project_images/zumetrix.jpg",
  gallery: [
    "/project_images/zumetrix.jpg"
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
  ],
  relatedReading: [
    {
      href: "/articles/when-is-ai-automation-the-wrong-choice",
      label: "When is AI automation the wrong choice?",
      description: "Why this stack is rules rather than AI: syncing and reminders, with no AI in its project record.",
    },
  ]
},

// 21. Knipsr – Private Event Media-Sharing SaaS
{
  id: 21,
  slug: "knipsr-event-media-saas",
  primaryService: "saas-mvp-development",
  searchIndexable: false,
  title: "Knipsr – From Product Build to Launch-Ready SaaS",
  category: "Web Application",
  type: "saas",
  description: "A private, QR-based event media platform where guests upload photos and videos into a shared gallery with no app and no account — built to hold up under real event-day load.",
  longDescription: "Knipsr lets event hosts create a private media space guests join by scanning a QR code, then upload photos and videos directly from their phone with no app install and no account required. Behind that simple guest experience sits the harder problem: durable handling of large, growing media archives, background processing that has to survive retries and partial failures, gallery performance that stays fast as an event's archive grows, and expiry and access flows that keep private events private. Zumetrix worked on the engineering behind that reliability, not only the interface in front of it.",
  image: "/project_images/knipsr-cover.svg",
  gallery: ["/project_images/knipsr-cover.svg"],
  tags: ["React", "TypeScript", "Vite", "Supabase", "PostgreSQL", "Edge Functions", "Cloudflare Stream", "Production SaaS"],
  client: {
    name: "Knipsr",
    country: "",
    industry: "Event Technology & Media SaaS"
  },
  clientLabel: "Product",
  duration: "",
  team: "",
  year: "",
  featured: true,
  visibility: "anonymous-public",
  proofStatus: "draft",
  results: [
    "Built a no-login, QR-based guest upload flow for private event media",
    "Implemented durable background processing with retry and recovery for large media archives",
    "Tuned gallery loading and caching for real event-day traffic patterns",
    "Hardened expiry and private-access flows to protect guest and host privacy",
    "Stress-tested the platform against real-world failure modes before production use"
  ],
  problem: "A private event media product needs to feel effortless for a guest tapping a QR code — but every part of that simplicity depends on infrastructure that has to survive spotty mobile connections, large photo and video files, traffic that spikes hard during an event and disappears after, and edge cases a demo never surfaces. The risk isn't writing the upload form. It's what happens when an upload fails halfway, when storage has to hold years of event archives, or when a gallery has to stay fast at scale.",
  solution: "We worked on the production engineering layer beneath Knipsr's guest and host experience: durable background job processing with retries and recovery for media uploads, storage and delivery architecture across Supabase, Postgres, Edge Functions, and Cloudflare Stream, caching and performance work on gallery loading, and access and expiry logic to keep private events private. Deployment ran across Vercel and Railway, with real-world QA and failure-mode testing before the platform carried live event traffic.",
  stack: ["React", "TypeScript", "Vite", "Supabase", "PostgreSQL", "Edge Functions", "Supabase Storage", "Cloudflare Stream", "Vercel", "Railway"],
  services: ["SaaS Product Engineering", "Production Systems & Reliability", "Media Infrastructure Architecture"],
  caseStudy: {
    situation: "Knipsr is a private, QR-first event media-sharing SaaS: guests scan a code, then upload photos and videos into a shared event gallery with no app and no account needed.",
    problem: "The guest-facing experience had to stay effortless while the platform underneath handled real event conditions — large and growing media archives, unreliable mobile uploads, traffic that spikes around live events, and privacy requirements around who can see what.",
    built: [
      "QR-based, no-login guest upload and gallery experience",
      "Durable background processing for media with retry and recovery behavior",
      "Storage and delivery architecture across Supabase, Postgres, Edge Functions, and Cloudflare Stream",
      "Caching and performance tuning for gallery load under real usage",
      "Private access and expiry flows for event and guest privacy",
      "Deployment across Vercel and Railway with production QA and failure-mode testing"
    ],
    decisions: [
      { title: "Treat reliability as the product, not a feature", description: "For a media platform, the failure states — a stalled upload, a slow gallery, a link that shouldn't have expired yet — are what guests and hosts actually notice. Retry, recovery, and caching work were prioritized ahead of visual polish." },
      { title: "Keep the guest flow app-free on purpose", description: "No login, no install. That constraint pushed more complexity into the backend — session-less access, secure upload handling — so the guest side could stay a single tap." }
    ],
    results: [
      { title: "Production-grade reliability for real events", description: "Background jobs, retries, and recovery built to hold up under real event-day conditions, not only a demo.", confidence: "delivered" },
      { title: "Performance tuned for growing archives", description: "Gallery loading and caching addressed as event media archives grow, not only at small scale.", confidence: "delivered" }
    ],
    proofNotes: ["Client and founder identity are withheld. Screenshots are pending privacy review — none are published yet."],
    ctaAngle: "Talk to us when the engineering problem is the hard part, not the interface."
  },
  testimonial: {
    quote: "We could not be happier about working with Zumetrix Labs! What has started as an idea has turned into a really great projekt/product, which only evolved into its full potential through the corporation, ideas, experience, professionalism and openness from our developer. Everything was well understood, delivered on time and documented clearly. Thanks again. We can highly appreciate the work performed and couldn't recommend working with Zia and his Team enough!",
    author: "Founder",
    role: "Knipsr"
  },
  relatedReading: [
    {
      href: "/articles/build-saas-mvp-in-30-days",
      label: "How to build a SaaS MVP in 30 days",
      description: "The framework this build followed, from validation through launch.",
    },
  ]
},

// 22. Liftly – Operational Booking Platform (V1 Foundation)
{
  id: 22,
  slug: "liftly-operational-mvp-v1",
  primaryService: "saas-mvp-development",
  searchIndexable: false,
  title: "Liftly – Building the Version the Business Needed First",
  category: "Startup MVP",
  type: "mvp",
  description: "A logistics and service booking platform where the founder's broader marketplace vision was deliberately sequenced: ship the operational foundation first, design the sophisticated pricing engine for a defined V2.",
  longDescription: "Liftly's founder had a broader logistics marketplace vision, but the first release needed to prove the operational core before it could carry that vision. Zumetrix worked on scoping and building V1 around what the business actually needed to run: customer booking, pickup and dropoff, serviceability and distance-based eligibility, item and job details, deposits and payment, and the internal admin controls to run bookings day to day. A more sophisticated Pricing Engine — covering service minimums, distance bands, labor, stairs, urgency, specialty items, and margin protection — was designed and planned for a defined V2, not built prematurely into the first release.",
  image: "/project_images/liftly-cover.svg",
  gallery: ["/project_images/liftly-cover.svg"],
  tags: ["Product Sequencing", "Booking Systems", "Operational Software", "Logistics", "MVP Scope Strategy"],
  client: {
    name: "Liftly",
    country: "",
    industry: "Logistics & Service Booking"
  },
  clientLabel: "Product",
  duration: "",
  team: "",
  year: "",
  featured: true,
  visibility: "anonymous-public",
  proofStatus: "draft",
  results: [
    "Shipped a working operational V1: booking, pickup/dropoff, serviceability, and payment",
    "Built internal admin and booking controls for day-to-day operations",
    "Designed a distance- and eligibility-based serviceability model for job intake",
    "Scoped a more sophisticated Pricing Engine (service minimums, distance bands, labor, urgency, specialty items) as a defined V2 — not built prematurely into V1",
    "Kept the broader marketplace vision intact while sequencing what had to ship first"
  ],
  problem: "The founder's real vision was a broader logistics marketplace with sophisticated, variable pricing. Building that pricing complexity first would have delayed launching a platform that first needed to prove the basic operational loop: can a customer book a job, can the business see and manage it, can payment happen reliably.",
  solution: "We separated the vision from the first release. V1 shipped the operational foundation — booking, pickup/dropoff, serviceability and distance eligibility, job and customer details, deposit and payment, and admin controls — as a complete, usable system on its own. The Pricing Engine V2 (service minimums, distance bands, labor and movers, stairs, urgency, specialty and heavy items, junk-removal load estimation, disposal estimates, admin overrides, customer approval flows, and margin protection) was designed and documented for a later phase, to follow the operational core. Pricing Engine V2 was planned and designed, not built — it has not shipped.",
  stack: [],
  services: ["Startup MVP Development", "Product Sequencing & Scope Strategy", "Operational Systems Architecture"],
  caseStudy: {
    situation: "Liftly's founder had a broader logistics marketplace vision, with a sophisticated variable-pricing engine as a core differentiator.",
    problem: "Building the full pricing vision first would have delayed proving the thing the business actually needed first: a reliable, bookable operational loop.",
    built: [
      "Customer booking, pickup/dropoff, and job/item detail capture",
      "Serviceability and distance-based eligibility logic",
      "Booking deposit and payment handling",
      "Internal admin and booking operations controls"
    ],
    workflow: [
      { step: "01", title: "Separate the vision from the first release", description: "Mapped the full marketplace and pricing vision, then identified the smallest operational core that could ship and run on its own." },
      { step: "02", title: "Build the V1 operational foundation", description: "Booking, serviceability, payment, and admin controls — the parts the business needed to actually take and fulfill jobs." },
      { step: "03", title: "Design, don't build, the V2 complexity", description: "Documented the Pricing Engine concepts — distance bands, labor, urgency, specialty items, margin protection, admin overrides — as a defined next phase, not part of this release." }
    ],
    decisions: [
      { title: "Ship the operational loop before the pricing sophistication", description: "The business needed proof that bookings, serviceability, and payment worked end to end before a variable pricing engine had anything real to price." },
      { title: "Design V2 deliberately instead of bolting it on later", description: "Pricing Engine V2 concepts were scoped and documented during V1, so the next phase has a clear foundation instead of starting from a blank page." }
    ],
    proofNotes: ["Client and founder identity are withheld. Pricing Engine V2 was designed and planned only — it is described here as planned work, not as shipped functionality. Screenshots are pending privacy review — none are published yet."],
    ctaAngle: "If you have a bigger vision than your first release can carry, this is the kind of sequencing conversation worth having before you build."
  },
  relatedReading: [
    {
      href: "/articles/decision-room-001-liftly-sequencing",
      label: "Decision Room #001: the full reasoning behind this sequencing",
      description: "Why the operational core shipped first, with what was built kept visibly separate from what was only designed.",
    },
  ]
},

// 23. Learning Platform SaaS – Stabilization & Technical Clarity (anonymized)
{
  id: 23,
  slug: "learning-platform-saas-stabilization",
  primaryService: "product-rescue-stabilization",
  searchIndexable: false,
  title: "Learning Platform SaaS – Stabilizing a Founder-Built Product for Its Next Stage",
  category: "Enterprise Solution",
  type: "saas",
  description: "A founder-built, AI-assisted SaaS that needed stabilization across frontend, backend, and routing — and a clear line between what was broken, what was unfinished, and what was future scope.",
  longDescription: "This engagement is kept anonymized by request. The product was a founder-built, AI-assisted SaaS that had grown quickly and needed a technical partner to stabilize it rather than rebuild it. The work covered frontend and backend stabilization, API cleanup, database logic, routing fixes, completion of unfinished flows, and deployment troubleshooting — alongside business-rule clarification the founder needed but hadn't had time to resolve, such as Offers pricing changes, community invitation logic, and contact ownership rules. A recurring part of the work was simply separating signal from noise: what was actually broken, what was unfinished, what was intentional, and what was scope for later.",
  image: "/project_images/learning-platform-saas-cover.svg",
  gallery: ["/project_images/learning-platform-saas-cover.svg"],
  tags: ["SaaS Stabilization", "API Cleanup", "Cloudflare Workers", "Technical Triage", "Founder Technical Partner"],
  client: {
    name: "Product Stabilization & Technical Clarity",
    country: "",
    industry: "EdTech / Learning Platform SaaS"
  },
  clientLabel: "Engagement Type",
  duration: "",
  team: "",
  year: "",
  featured: true,
  visibility: "anonymous-public",
  proofStatus: "draft",
  results: [
    "Stabilized frontend and backend behavior across core flows",
    "Cleaned up API and database logic causing inconsistent behavior",
    "Fixed and rebuilt the _worker.js routes powering transactional send-email and scheduled-messages",
    "Completed unfinished flows the founder had left mid-build",
    "Clarified Offers pricing update/delete behavior and community invitation logic",
    "Resolved contact-ownership and related business-rule ambiguity",
    "Separated bugs from unfinished work from intentional future scope, with a categorized handoff"
  ],
  problem: "The founder had built a fast-moving, AI-assisted SaaS solo and reached a point where it was no longer clear which parts of the product were broken, which were unfinished, which were intentional, and which were simply future scope that had never been prioritized. Marketing, email, and automation flows had drifted out of sync with the product, and some backend routes were failing silently.",
  solution: "We stabilized the systems that mattered most first — API behavior, database logic, and routing — including diagnosing and rebuilding the _worker.js routes behind transactional send-email and scheduled-messages. We completed flows the founder had left unfinished, cleared up business-rule ambiguity around Offers pricing and community invitations, and clarified contact-ownership rules. Throughout, the priority was triage: telling the founder plainly what was a bug, what was unfinished, what was intentional, and what belonged in a later phase, with testing and handoff notes to match. Stripe subscription billing was identified and scoped as future work during this engagement — it was not implemented as part of it, and no product rewrite took place.",
  stack: ["Cloudflare Workers / Pages Functions"],
  services: ["SaaS Platform Stabilization", "Technical Triage & Scope Clarification", "Founder Technical Partnership"],
  caseStudy: {
    situation: "A founder-built, AI-assisted SaaS had grown quickly on its own and reached the point where the founder could no longer tell what was actually wrong with it.",
    problem: "Bugs, unfinished flows, intentional decisions, and unbuilt future scope had all blurred together, alongside backend routes failing silently and marketing/automation flows drifting out of sync with the product.",
    built: [
      "Frontend and backend stabilization across core product flows",
      "API and database logic cleanup",
      "Rebuilt _worker.js routes for transactional send-email and scheduled-messages",
      "Completion of flows left unfinished by the original build",
      "Clarified Offers pricing update/delete and community invitation logic",
      "Resolved contact-ownership and related business-rule ambiguity",
      "Categorized scope for testing and handoff: bug vs. unfinished vs. intentional vs. future"
    ],
    decisions: [
      { title: "Stabilize before rebuilding", description: "The instinct with a struggling SaaS is often to rewrite it. We stabilized what was already working and fixed what was actually broken instead of starting over — no product rewrite took place." },
      { title: "Triage before touching code", description: "Before fixing anything, we categorized what was in front of us — bug, unfinished feature, intentional behavior, or future scope — so the founder could make informed calls instead of guessing." },
      { title: "Scope Stripe subscriptions as future work, not this engagement", description: "Subscription billing was discussed and scoped for a later phase. It was not implemented here, and this case study does not claim otherwise." }
    ],
    proofNotes: ["Client, product, and founder identity are withheld — this case study is deliberately anonymized. No product screenshots are used or will be used for this project. Not every issue in the product was fixed during this engagement; scope here reflects only the work described above."],
    ctaAngle: "If your product needs someone to tell you honestly what's actually wrong with it before touching a line of code, this is that kind of engagement."
  },
  relatedReading: [
    {
      href: "/articles/signs-your-saas-needs-stabilization-not-rebuild",
      label: "Signs your codebase needs stabilization, not a rebuild",
      description: "The distinction this engagement was built around: fixing what's broken without rewriting what already works.",
    },
    {
      href: "/rescue-or-rebuild",
      label: "Get a private read on your situation",
      description: "Four questions, an honest result — no email required.",
    },
  ]
},

// 24. Fast Track USA — Recovery, not a build
// This case study is deliberately short. Everything in it is sourced from
// Josh Nyce's own recorded testimonial (video, public/videos/Josh.mp4) and
// his written Trustpilot review (src/data/testimonials.ts, id:
// "josh-fast-track", corroborated on Google). No technical detail — stack,
// architecture, platform, feature scope — is claimed anywhere here, because
// none is verified. What's known is the recovery story itself: a client who
// says a previous team couldn't ship in two years, and that this one did in
// three weeks. That's the entire evidentiary basis, stated as exactly that.
{
  id: 24,
  slug: "fast-track-usa-app-rescue",
  primaryService: "product-rescue-stabilization",
  searchIndexable: true,
  title: "Fast Track USA — Two Years Stuck, Three Weeks to Launch",
  category: "Product Rescue",
  type: "rescue",
  description: "A previous development team spent roughly two years without a reliable launch. Zumetrix took over an existing, in-progress app and shipped it in three weeks.",
  longDescription: "This is a recovery story, not a technical case study — we're not going to describe an architecture or a stack we can't verify. What's verified: Josh Nyce, owner and founder of Fast Track USA, says his app sat in development for about two years with a previous team without reaching a reliable launch. Zumetrix took the project over and shipped it in three weeks, which Josh has described — on video and in a separately-worded, verified Trustpilot review corroborated on Google — as launching in flawless, bug-free condition.",
  image: "/project_images/fast-track-recovery-timeline.svg",
  ogImage: "/project_images/fast-track-og.png",
  ogImageAlt: "Fast Track USA: about two years with a previous team trying to get the app launched, then three weeks to launch after Zumetrix took over, per the client. \"No bugs, no issues.\" — Josh Nyce, Owner & Founder.",
  heroImageFit: "contain",
  heroImageMobile: "/project_images/fast-track-recovery-timeline-mobile.svg",
  gallery: ["/project_images/fast-track-recovery-timeline.svg"],
  tags: ["Product Rescue", "Recovery", "Takeover"],
  client: {
    name: "Josh Nyce — Fast Track USA",
    country: "",
    industry: "Not disclosed"
  },
  clientLabel: "Founder",
  duration: "3 weeks (post-takeover)",
  team: "",
  year: "",
  featured: true,
  results: [
    "Took over an existing, in-progress app — per Josh, after roughly two years without a reliable launch",
    "Shipped within three weeks of taking over",
    "Client-reported launch condition: no bugs, no issues",
    "Independently corroborated: 5-star Trustpilot review, corroborated on Google"
  ],
  kpis: [
    { label: "Time stuck with previous team", value: "~2 years", description: "Per Josh Nyce's testimonial — before Zumetrix took over" },
    { label: "Time to launch after takeover", value: "3 weeks", description: "Client-reported, corroborated across two independent review sources" }
  ],
  problem: "Fast Track USA's app had been in development for around two years with a previous team, without reaching a working, reliable launch. The specific technical causes aren't part of the public record — Josh's account describes the outcome (no launch after two years), not the underlying implementation.",
  solution: "Zumetrix took over the existing, in-progress project and carried it to launch in three weeks. We're not claiming a specific technical method here because none is verified beyond the client's own account — this case exists to document the outcome truthfully, not to reverse-engineer a technical narrative we don't have evidence for.",
  testimonial: {
    quote: "They took over and within three weeks my app was launched and it was perfect. I'm talking about no bugs, no issues, no nothing, it was perfect.",
    author: "Josh Nyce",
    role: "Owner & Founder, Fast Track USA"
  },
  testimonialFilmKey: "josh",
  // The hero's evidence card replaces the KPI grid this data used to feed —
  // showing the same ~2 years / 3 weeks contrast twice in one scroll (once
  // as the hero's actual argument, once again as a KPI card two sections
  // later) was repetition, not reinforcement.
  heroEvidence: {
    beforeLabel: "Previous development team",
    beforeValue: "~2 years",
    beforeCaption: "no reliable launch",
    pivotLabel: "Zumetrix takes over",
    afterLabel: "Post-takeover",
    afterValue: "3 weeks",
    afterCaption: "shipped — \"no bugs, no issues\"",
  },
  // "What We Built" is the template's default label, correct when a case
  // study is a from-zero build. This one is a takeover — Zumetrix didn't
  // build the app, they took over an existing one, so the section says
  // exactly that instead.
  situationAfterLabel: "The Takeover",
  testimonialLeadIn: "That's the record. Here's how Josh describes it.",
  relatedReadingEyebrow: "If this sounds like your situation",
  closeHeadline: { muted: "You've seen the record.", foreground: "Let's talk about what you need." },
  // Source: public/captions/josh-nyce-testimonial.vtt (Josh's own video).
  // Quotes checked verbatim against the transcript.
  clientExperience: {
    eyebrow: "Working Together",
    heading: "How Josh describes working with us.",
    items: [
      { icon: "response", value: "Within minutes", quote: "They respond quickly, any issues I have, they respond within minutes." },
      { icon: "communication", value: "Excellent", quote: "Communication is excellent." },
    ],
    advice: {
      label: "His advice to founders in the same spot",
      quote: "Even if you're like me already in the project and not getting anywhere, they'll take over and they'll get you there to the finish line.",
      attribution: "Josh Nyce, Owner & Founder, Fast Track USA — from his video",
    },
  },
  stack: [],
  services: [
    "Product Takeover",
    "Rescue & Stabilization",
    "App Development",
    "App Launch",
    "3-Week Delivery",
    "Clear Communication",
    "Rapid Issue Response",
  ],
  linkServicesToPrimary: true,
  relatedReading: [
    {
      href: "/articles/should-you-rescue-or-rebuild-your-saas",
      label: "Should you rescue or rebuild your SaaS?",
      description: "The decision framework behind engagements like this one.",
    },
    {
      href: "/rescue-or-rebuild",
      label: "Get a private read on your situation",
      description: "Four questions, an honest result — no email required.",
    },
  ]
}

];

// Project filters and categories (API-ready structure)
export const projectCategories = [
  { id: "all", label: "All Projects", count: projects.length },
  { id: "saas", label: "SaaS Applications", count: projects.filter(p => p.type === "saas").length },
  { id: "mobile", label: "Mobile Apps", count: projects.filter(p => p.type === "mobile").length },
  { id: "enterprise", label: "Enterprise Solutions", count: projects.filter(p => p.type === "enterprise").length },
  { id: "mvp", label: "MVP Development", count: projects.filter(p => p.type === "mvp").length },
  { id: "rescue", label: "Product Rescue", count: projects.filter(p => p.type === "rescue").length }
];

export const projectTechnologies = [
  "React", "Node.js", "Python", "React Native", "Firebase", "AWS", 
  "TypeScript", "PostgreSQL", "MongoDB", "Docker", "Kubernetes", "AI/ML"
];

// API-ready data access functions (ready for backend migration)
export const getProjects = () => projects;
export const getFeaturedProjects = () => projects.filter(p => p.featured);
export const getHomepageFeaturedProjects = () => projects.filter(p => p.homepageFeatured);
export const getProjectBySlug = (slug: string) => projects.find(p => p.slug === slug);
export const getProjectsByCategory = (category: string) => 
  category === "all" ? projects : projects.filter(p => p.type === category);
export const getProjectCategories = () => projectCategories;
