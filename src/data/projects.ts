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
  // false = kept in data (detail route still resolves) but removed from the
  // public archive, counts and homepage pickers: internal/demo work, unbuilt
  // plans and client-less patterns don't belong in a list of client cases.
  listed?: boolean;
  // One sentence: what this engagement proves about Zumetrix, stated at the
  // level the evidence supports. Rendered as its own short section.
  proves?: string;
  // The public record behind the case — reviews, films, corroborations —
  // each at the level the proof library supports. Rendered as a list.
  evidence?: { label: string; detail?: string; href?: string }[];
  // "collected-directly" = the quote was sent to us by the client, not posted
  // on a review platform; the page says so instead of implying a badge.
  testimonialSource?: "platform" | "collected-directly";
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
    description: "An AI bio and tagline generator for professionals, built as a two-week first phase on React, Supabase and OpenAI.",
    longDescription: "Ifyify turns a few answers about a person into usable bios, taglines and a brand persona. Kelly wanted a first version in front of users in weeks, not a quarter, so the first phase was scoped to exactly that: a guided, multi-step flow, animated style selectors, OpenAI generation logic behind the prompts, authentication, and a Supabase backend shaped so the next phase would not start with a migration. React and Tailwind on the front, Supabase and the OpenAI API behind it.",
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
      "Phase 1 live in two weeks, per the project record",
      "A guided generation flow for bios, taglines and brand personas, running on OpenAI",
      "Authentication and a Supabase schema structured for the next phase, so phase two adds features instead of rebuilding foundations"
    ],
    problem: "Kelly wanted a tool that turns a few answers about a person into usable bios, taglines and a brand persona — and wanted a first version live in weeks, not a quarter.",
    solution: "We scoped phase one to the generation flow itself, not a platform: a guided multi-step experience, animated style selectors, prompt logic written against OpenAI, authentication, and a Supabase backend set up for the features that would come later. Two weeks from brief to live.",
    testimonial: {
      quote: "Zumetrix Labs delivered exactly what we envisioned and more. The AI integration is seamless, the user experience is fantastic, and the code quality is exceptional. Looking forward to Phase 2 expansion!",
      author: "Kelly Andrews",
      role: "Founder, Best Business Services"
    },
    testimonialSource: "collected-directly",
    caseStudy: {
      decisions: [
        { title: "Ship the flow, not the platform", description: "Everything that was not the guided generation flow — team features, billing, analytics — was left out of phase one on purpose. A two-week first version only works when the scope is one job done well." }
      ],
    },
    proves: "That a first version can be small, specific and live in two weeks when the scope is one flow done properly, with a backend that does not have to be thrown away for phase two.",
    evidence: [
      { label: "Client's note, shared with us directly", detail: "Not a platform review; shown without a badge." }
    ],
    liveLink: "",
    stack: ["React", "TypeScript", "TailwindCSS", "Supabase", "OpenAI API", "Vercel"],
    services: ["SaaS Development", "AI Integration", "UI/UX Design", "Database Design", "Authentication"],
    kpis: [
      { label: "Phase 1 duration", value: "2 weeks", description: "From brief to live first version, per the project record" }
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
  description: "A sales and inventory dashboard for a Norwegian publisher, built in two phases: first from spreadsheet exports, then on a real backend that ingests new files on its own.",
  longDescription: "Forlag ran sales and inventory out of spreadsheets and manual calculations, which made month-to-date and year-to-date comparisons, inventory risk and customer behaviour hard to see at once. Phase one shipped a React dashboard that reads the sales and inventory CSV/XLSX exports, normalises dates, computes the KPIs on the fly and keeps processed aggregates in the browser for instant loads — about five weeks of work per the project record. Phase two replaced that foundation with Node.js, PostgreSQL and Supabase and removed the manual upload step entirely: incoming files land on the client's SMTP server, a GitHub Actions workflow picks them up, and the pipeline parses and inserts the data straight into the dashboard. MTD/YTD comparisons with correct same-period logic, a seven-KPI inventory view with dead-stock detection, Nivo charts, and performance that stays smooth past 30,000 order rows.",
  image: "/project_images/forlag.jpg",
  gallery: [
    "/project_images/forlag.jpg"
  ],
  tags: [
    "React", "TypeScript", "TailwindCSS", "Node.js", "PostgreSQL", "Supabase",
    "GitHub Actions", "Nivo Charts", "Data Visualization", "Responsive UI"
  ],
  client: {
    name: "Harald – Forlag (publishing company)",
    country: "Norway",
    industry: "Publishing & Book Sales"
  },
  duration: "Two phases · phase one about five weeks (per the Fiverr record)",
  team: "Zumetrix Labs Team",
  year: "2025",
  featured: true,
  homepageFeatured: true,
  results: [
      "Replaced spreadsheet workflows with one dashboard the business reads every day",
      "Month-to-date and year-to-date comparisons with correct same-period logic across years",
      "A seven-KPI inventory view: stock value, dead stock, category breakdown and year-to-date sold",
      "Phase two: a Node.js + PostgreSQL + Supabase backend replaced the browser-only first version",
      "Phase two: new files are ingested automatically from the client's SMTP server via GitHub Actions — no manual upload step remains",
      "Smooth performance at 30,000+ order rows"
    ],
  problem: "Sales and inventory lived in several spreadsheets and manual calculations. Month-to-date and year-to-date performance, inventory risk and customer behaviour across channels could only be understood by someone willing to rebuild the numbers by hand.",
  solution: "Phase one: a modular React dashboard that ingests the raw CSV/XLSX exports, normalises dates, aggregates per page and keeps processed data in the browser. Phase two: a real backend on Node.js, PostgreSQL and Supabase, plus a GitHub Actions pipeline that watches the client's SMTP server for incoming files and inserts them directly — the manual step is gone.",
  testimonial: {
    quote: "He built a beautiful sales- and inventory dashboard for me over a month, and went out of his way to make it just as I wanted it. He worked around the clock, and we had meetings whenever it was nescessary.",
    author: "Harald",
    role: "Co-owner, Forlag"
  },
  caseStudy: {
    decisions: [
      { title: "Start in the browser, earn the backend", description: "Phase one deliberately had no server: reading the exports client-side got a usable dashboard in front of the business in weeks. Once it was clear the dashboard was being used daily, the backend and automated ingestion were worth building." }
    ],
  },
  proves: "That operational software for a non-technical business can start small and still grow into a system that updates itself — and that we will build the second phase on top of the first rather than rewriting it.",
  evidence: [
    { label: "Harald's Fiverr review", detail: "Rated 4.3 — the one non-five-star review in our record, published here as written." }
  ],
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
      { label: "Rows handled", value: "30,000+", description: "Orders and products, with the dashboard still loading quickly" },
      { label: "Data ingestion", value: "Automatic", description: "GitHub Actions watches the client's SMTP server and inserts incoming files — no upload step" },
      { label: "Inventory visibility", value: "Always current", description: "Dead stock, stock value and year-to-date sold in one view" }
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
  description: "An Airtable and Make.com system for a Canadian beef processor: carcass intake, boxing, lot tracking and shipping documentation in one place, with the status changes automated.",
  longDescription: "Floating Stone Ranch processes beef and needed one system for the whole chain: carcass intake, cutting, boxing, lot tracking and shipping paperwork. We designed an Airtable base as the single source of truth for animals, carcasses, boxes, lots and shipments, then built Make.com scenarios on top to drive status transitions, generate Bill of Lading structures and keep the tables consistent as records move through the plant. The result is a digital process in which every carcass, box and shipment is traceable from intake to delivery. The engagement has run for eight months and is still active per the Fiverr record.",
  image: "/project_images/floating-stone.jpg",
  gallery: [
    "/project_images/floating-stone.jpg"
  ],
  tags: [
    "Airtable", "Make.com", "Database Design", "Process Automation",
    "Logistics", "Bill of Lading", "No-Code", "Enterprise Workflow"
  ],
  client: {
    name: "Floating Stone Ranch",
    country: "Canada",
    industry: "Beef Processing & Logistics"
  },
  duration: "Phase one engine 4–6 weeks · engagement ongoing (8 months per the record)",
  team: "Zumetrix Labs Team",
  year: "2025",
  featured: true,
  homepageFeatured: true,
  results: [
      "Carcass, box, lot and shipment data in one Airtable base instead of paper and spreadsheets",
      "Key status transitions and Bill of Lading structures generated by Make.com scenarios",
      "Every carcass and box traceable from intake to shipment",
      "A structure built to add processors, customers and reporting without redesign",
      "Still an active engagement eight months in, per the Fiverr record"
    ],
  problem: "The processing flow — intake, cutting, boxing, shipping — ran on paper and spreadsheets. Nothing tracked each step reliably, manifests were manual, and there was no base to build reporting on.",
  solution: "We mapped the operation first, then modelled it: a normalised Airtable schema for animals, carcasses, boxes, lots and shipments, with Make.com scenarios handling triggers, status changes and cross-table updates so the records stay consistent and the Bill of Lading data is generated rather than typed.",
  testimonial: {
    quote: "The team understood the complexity of my industry and of the project quickly and were flexible with the scope as we all learned to deal with new solutions on the fly. I will continue to use this team.",
    author: "James",
    role: "Owner, Floating Stone Ranch"
  },
  caseStudy: {
    decisions: [
      { title: "Model the operation before automating it", description: "The temptation with a paper process is to automate the first painful step. We spent the first stretch getting the data model right — what a lot is, what a box belongs to, when a shipment is real — because every scenario built afterwards depends on it." }
    ],
  },
  proves: "That we can take an operation we had never seen before, learn it fast enough to model it correctly, and leave behind a system the business keeps extending with us eight months later.",
  evidence: [
    { label: "James's Fiverr review", detail: "Five stars; repeat client; the record shows an eight-month working relationship." }
  ],
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
      { label: "Source of truth", value: "One base", description: "All carcass, box and shipment records in a single Airtable base" },
      { label: "Automation layer", value: "Make.com", description: "Status transitions and manifests run through scenarios, not people" },
      { label: "Built for", value: "Multiple plants", description: "Schema designed for more processors and customers without redesign" }
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
  description: "A React Native marketplace where people trade skills for credits, built to a launch-ready first version across two engagements.",
  longDescription: "Skill x Swap lets people offer the skills they have and request the skills they want, using a monthly credit allowance plus credits earned by completing swaps. We built the first version in React Native with Firebase behind it: onboarding, Core and Lite Pro tiers, separate lists for skills offered and skills wanted, matching, swap requests and pending-request management, and the credit logic that keeps monthly and earned credits distinct. The architecture was left ready for Stripe subscriptions and an enterprise edition in later phases. Sam's second review on Fiverr says it plainly: the app was ready to launch.",
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
  duration: "Two engagements (10 days and 7 days, per the Fiverr record)",
  team: "Zumetrix Labs Team",
  year: "2025",
  featured: true,
  homepageFeatured: true,
  results: [
      "A complete first version: onboarding, skill lists, matching, swap requests and pending-request management",
      "Monthly credit allowances and persistent earned credits, kept separate in the data model",
      "Dynamic skill lists where users add missing skills to a shared collection",
      "Architecture ready for Stripe subscriptions and an enterprise edition",
      "Launch-ready on delivery of the second engagement — \"My app is now ready for launching\", per Sam"
    ],
  problem: "Sam needed a skill-trading app that could handle user tiers, monthly credit limits and credits earned from completed swaps — and needed it simple enough to ship as a first version rather than a platform.",
  solution: "A React Native app on Firebase with clear onboarding, separate \"skills I offer\" and \"skills I want\" lists, a credit-aware swap request system, and a data model that keeps allowance credits and earned credits apart. Built so Stripe and an enterprise white-label edition can be added without reworking the core.",
  testimonial: {
    quote: "I'd recommend absolutely everyone to work with Omer. From my first outreach with him, he understood my requirements exactly. Even better than I did! He communicates clearly, timely and is genuinely exceptional. I wouldn't have been able to launch my startup without his expertise in app building and development. 100% will use Omer every time I need help. Super great guy through and through!",
    author: "Sam",
    role: "Founder, Skill x Swap"
  },
  caseStudy: {
    decisions: [
      { title: "Keep the credit model honest before making it clever", description: "Monthly allowance and earned credits had to be separate from day one; blending them would have made the launch simpler and the second month a mess." }
    ],
  },
  proves: "That a two-sided mobile marketplace can reach launch as a first version when the credit model is designed properly and the feature list is held to what a first launch needs.",
  evidence: [
    { label: "Sam's first Fiverr review", detail: "\"I wouldn't have been able to launch my startup without his expertise.\" Five stars." },
    { label: "Sam's second Fiverr review", detail: "\"My app is now ready for launching thanks to his expertise. Timely, bug free.\" Five stars." }
  ],
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
      { label: "Core flows in V1", value: "Credits · Matching · Requests", description: "Every marketplace flow a first launch needs" },
      { label: "Delivered in", value: "Two engagements", description: "Both reviewed five stars on Fiverr; the second confirms launch readiness" }
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
  description: "A voice-first AI companion app in React Native: low-latency audio, streaming responses and an interface built to feel calm rather than busy.",
  longDescription: "Tomo is meant to be talked to, not typed at. We built the mobile app in React Native with a voice SDK, keeping request latency low, managing the audio pipeline cleanly, holding conversation state and rendering streaming responses — with a deliberately minimal interface, subtle motion and gradients so the product feels alive without feeling noisy. The codebase is structured for the multi-modal features and agents the team plans next.",
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
      "A stable voice interaction loop with low latency on real devices",
      "A brand-aligned interface: minimal, with motion that signals state instead of decorating it",
      "A codebase structured for multi-modal features and agents in later phases"
    ],
  problem: "The team needed a mobile-first way for people to talk to their AI models: a quality interface, low-latency audio and an architecture that would carry features they had not built yet.",
  solution: "A React Native app integrating a voice SDK and the team's AI backend, with audio streaming and response rendering designed carefully, and an interface that reads as a companion product rather than a chat window.",
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
      { label: "Mode", value: "Voice-first", description: "Core flows designed for speaking, not typing" }
    ],
  proves: "That we build mobile products where the hard part is the audio and state pipeline, not the screens — and ship an interface restrained enough to let that work show.",
  evidence: [
    { label: "No public review is attached to this engagement", detail: "We only quote clients from a review they published or a message they sent us; neither exists for this build yet." }
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
  description: "Architecture and feature design for a Norwegian handyman marketplace on Bubble: job posting, bidding, subscriptions, escrow payments and chat, structured to scale without a rewrite.",
  longDescription: "HjelpNå is a Norwegian marketplace for local handyman work — homeowners post jobs, providers bid, and there is an instant-help path for urgent work — built as a progressive web app on Bubble. Jenny came to us for the thinking, not only the clicking: how to structure the data for jobs, bids, users and subscription tiers, how to design the posting, bidding and matching flows, and how to set up Stripe escrow, chat and geo-targeting so the product could grow without rebuilding its core. Our role was architecture, data design and best-practice setup, with ongoing feature collaboration.",
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
      "A maintainable Bubble data architecture for jobs, bids, users and subscriptions",
      "Job posting, provider bidding and instant-help flows implemented on that structure",
      "Stripe escrow, notifications and PWA behaviour designed for both mobile and desktop"
    ],
  problem: "Jenny wanted to build a full marketplace on Bubble and knew the risk: no-code products that grow without a data model turn into something nobody can change safely.",
  solution: "We shaped the core data models in Bubble, structured the job, bid and matching flows, and advised on Stripe escrow, chat and geo-targeting — so the product could scale without rewriting the core.",
  testimonial: {
    quote: "Your Bubble knowledge and system thinking saved me from so many future problems. The marketplace now feels robust instead of hacked together.",
    author: "Jenny",
    role: "Founder, HjelpNå"
  },
  testimonialSource: "collected-directly",
  caseStudy: {
    decisions: [
      { title: "Design the data model before the screens", description: "On Bubble it is easy to build the first screen in an afternoon and impossible to fix the data model a year later. The first work was the schema." }
    ],
  },
  proves: "That no-code is a platform choice, not a shortcut — and that the architecture judgment matters more on Bubble, not less.",
  evidence: [
    { label: "Jenny's note, shared with us directly", detail: "Not a platform review; shown without a badge." }
  ],
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
      { label: "Platform", value: "PWA on Bubble", description: "One codebase for mobile and desktop" }
    ]
},

// 12. Utility Bill Deal Finder – AI OCR MVP
{
  id: 12,
  slug: "utility-bill-deal-finder",
  primaryService: "saas-mvp-development",
  searchIndexable: false,
  listed: false,
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
  testimonialSource: "collected-directly",
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
  description: "A React Native marketplace for pet services — sitter and walker listings, booking and owner–provider coordination — built around the booking journey first.",
  longDescription: "PawSpace lets pet owners find and book sitters, walkers and other services. We built the React Native app: provider onboarding and profiles, service listings, booking management, and a reusable UI kit for the cards, lists and modal flows both sides use. The interface was designed around trust and clarity — availability and booking states above everything else. This was work the founders did before Zumetrix Labs was formed.",
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
  year: "2024 · pre-Zumetrix",
  featured: false,
  results: [
      "Provider onboarding, profiles and service listings",
      "Booking management for owners and providers, with clear availability states",
      "A reusable UI kit for cards, lists and modal flows"
    ],
  problem: "Booking a pet sitter should feel as simple and as trustworthy as booking a ride or a room. The existing options did not.",
  solution: "A React Native marketplace with clear flows, careful state handling and an interface that puts availability and booking status first, built around the core booking journey before anything else.",
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
  proves: "That we had built two-sided mobile marketplaces before Zumetrix Labs existed, and that the booking journey is where we start.",
  evidence: [
    { label: "No public review is attached to this engagement", detail: "We only quote clients from a review they published or a message they sent us; neither exists for this build yet." },
    { label: "Pre-company work", detail: "Delivered in 2024 as freelance work by the founders; Zumetrix Labs was formed in June 2025." }
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
  description: "A React Native event-booking app that could not get a build out: merge conflicts resolved, navigation bugs fixed, booking flows steadied, TestFlight releases shipping again.",
  longDescription: "Bondfire had a product and a problem: an existing React Native codebase with build failures, merge conflicts and navigation bugs that were stopping releases. We worked inside the codebase alongside the client's developer — cleaning up branches, resolving conflicts, fixing navigation and booking-flow bugs, and getting iOS builds through to TestFlight. No rewrite; a short engagement to get the team shipping again.",
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
      "The issues blocking TestFlight releases resolved",
      "Git branches cleaned up and merge conflicts closed out",
      "Booking flows made reliable through testing",
      "Handed back to the client's developer with releases moving"
    ],
  problem: "An event-booking app with an unstable codebase: build failures, merge conflicts and navigation bugs were slowing the team to a stop.",
  solution: "We stepped into the existing code, fixed the core issues, stabilised the builds and steadied the booking experience — working with the client's developer rather than around them.",
  testimonial: {
    quote: "You jumped into a messy situation and got us back to shipping. That was exactly what we needed.",
    author: "Bharat",
    role: "Developer, Bondfire"
  },
  testimonialSource: "collected-directly",
  caseStudy: {
    decisions: [
      { title: "Stabilise, do not rewrite", description: "The codebase was salvageable. The fastest route to shipping was fixing what blocked releases, not starting again." }
    ],
  },
  proves: "That we can take over someone else's React Native codebase mid-flight, work with the existing developer, and get releases moving without a rebuild.",
  evidence: [
    { label: "Bharat's note, shared with us directly", detail: "Not a platform review; shown without a badge." }
  ],
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
  searchIndexable: false,
  listed: false,
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
  year: "2024 · pre-Zumetrix",
  featured: false,
  results: [
    "Delivered a complete CRUD and dashboard experience for hostel management.",
    "Showcased production-style MERN skills for portfolio and client demos."
  ],
  problem: "There was a need for a structured, real-world style hostel management system that could be used both as a demo and a base for future client work.",
  solution: "We built a clean MERN-based dashboard with clear sections for rooms, bookings, billing, and staff, with a modern UI and scalable backend models.",
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
  searchIndexable: false,
  listed: false,
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
  year: "2024 · pre-Zumetrix",
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
  description: "A Make.com automation that pushes Shopify orders into Notion so a store owner can see profit, loss and inventory without weekly CSV exports.",
  longDescription: "Allayth runs a Shopify store and was tracking P&L and inventory by exporting CSVs and rebuilding the numbers by hand. We built a Make.com flow that takes each new order — line items, fees and the metadata that matters for margin — and writes it into Notion databases structured so his own formulas, filters and views produce a living P&L and inventory picture. Rules, not AI: an exact mapping problem deserves an exact tool. Delivered in twelve days per the Fiverr record, as freelance work before Zumetrix Labs was formed.",
  image: "/project_images/shopify-to-airtable.jpg",
  gallery: [
    "/project_images/shopify-to-airtable.jpg"
  ],
  tags: [
    "Shopify", "Notion", "Make.com", "Zapier", "Automation", "E-commerce"
  ],
  client: {
    name: "Allayth – Shopify store owner",
    country: "United Kingdom",
    industry: "E-commerce"
  },
  duration: "12 days (per the Fiverr record)",
  team: "Omer (automation)",
  year: "2024 · pre-Zumetrix",
  featured: false,
  results: [
      "New Shopify orders land in Notion automatically, with the fields a P&L needs",
      "A living P&L and inventory view in Notion, driven by the owner's own formulas and filters",
      "Weekly CSV exports and manual rebuilds eliminated"
    ],
  problem: "Allayth wanted to see P&L and inventory in Notion without exporting from Shopify every week and rebuilding the numbers by hand.",
  solution: "A Make.com scenario that maps each Shopify order into structured Notion databases — orders, line items, fees — so Notion's own formulas can do the P&L work from then on.",
  testimonial: {
    quote: "Pleasure working with Syed, went above and beyond. Set up my Shopify > Make.com > Notion automation to track PNL and inventory! Quality work",
    author: "Allayth",
    role: "Shopify store owner"
  },
  caseStudy: {
    decisions: [
      { title: "Rules, not AI", description: "The job was an exact mapping from one schema to another. A deterministic scenario is cheaper, auditable and does not drift; a model would have added cost and risk to a problem that has none." }
    ],
  },
  proves: "That a small, bounded automation — one workflow, built right — removes a weekly chore permanently, and that we pick the plain tool when the problem is plain.",
  evidence: [
    { label: "Allayth's Fiverr review", detail: "Five stars; names the exact workflow: \"Shopify > Make.com > Notion automation to track PNL and inventory\"." },
    { label: "Pre-company work", detail: "Delivered in 2024 as freelance work by the founders; Zumetrix Labs was formed in June 2025." }
  ],
  liveLink: "",
  stack: [
    "Shopify", "Notion", "Make.com", "Zapier"
  ],
  services: [
    "Automation & Integration",
    "Data Modeling"
  ],
  kpis: [
      { label: "Update frequency", value: "Automatic", description: "Each new order is synced as it arrives" },
      { label: "Delivered in", value: "12 days", description: "Per the Fiverr record" }
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
  searchIndexable: false,
  listed: false,
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
  description: "Twilio Voice conference logic for a React Native app: a host adds and removes participants from a live call, backed by a clean Node API.",
  longDescription: "The client's app needed multi-party calls where a host can add or remove participants without dropping the call — team calls, support triage, escalation. We implemented Twilio conference rooms and a backend API layer in Node to manage participants, and wired it into the existing React Native call state and UI. The client's own words on the hand-off: a backend mess and vague Twilio goals in, a fully functional, structured API out.",
  image: "/project_images/twilio-auto-dialer.jpg",
  gallery: [
    "/project_images/twilio-auto-dialer.jpg"
  ],
  tags: [
    "Twilio", "React Native", "Voice", "Node.js", "Conference Calls"
  ],
  client: {
    name: "Nathan – Twilio Voice integration",
    country: "United States",
    industry: "Communications & Support"
  },
  duration: "1–2 weeks",
  team: "Backend & Mobile Integrator",
  year: "2025",
  featured: false,
  results: [
      "Conference calls with participants added and removed mid-call, no call resets",
      "A Node API layer that owns call state cleanly, integrated with the existing React Native app",
      "Delivered fast enough that the client's review says he double-checked the delivery time"
    ],
  problem: "A Twilio-backed app needed multi-party calls where the host can add or remove people without resetting the call — and the backend it had to be built on was, in the client's words, a mess.",
  solution: "Twilio conference rooms plus backend endpoints to manage participants, hooked into the React Native call flows, with the API structured so the next feature does not start from the same mess.",
  testimonial: {
    quote: "Zia is the kind of dev who makes you double-check the delivery time because surely no one builds something that good, that fast. But he does. I gave him a backend mess, some vague Twilio goals, and he returned with a fully functional, beautifully structured API.",
    author: "Nathan",
    role: "Twilio integration client"
  },
  proves: "That we are comfortable inheriting an unclear backend and a vague brief, and returning something structured — quickly.",
  evidence: [
    { label: "Nathan's Fiverr reviews", detail: "Four five-star reviews across his Twilio work with Zia; the excerpt above is cut where the platform truncates it, nothing added." }
  ],
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
  searchIndexable: false,
  listed: false,
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
  duration: "Ongoing — started in the founders' freelance years",
  team: "Founder & Systems Architect",
  year: "2025",
  featured: true,
  results: [
      "Deals, proposals and client pipelines tracked in one place",
      "Repetitive reporting and reminders automated",
      "Lets two founders and a small team run like a studio instead of a set of inboxes"
    ],
  problem: "As deal volume and projects grew, it became difficult to track everything with ad-hoc tools and mental notes.",
  solution: "We built a modular internal stack across Airtable, Notion, and Google Sheets, connected via Make.com and Zapier, to serve as a lightweight but powerful agency operating system.",
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
  image: "/project_images/covers/cover-saas-product.svg",
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
      "A no-login, QR-based guest upload flow for private event media",
      "Durable background processing with retry and recovery for large media archives",
      "Gallery loading and caching tuned for real event-day traffic",
      "Expiry and private-access flows hardened to protect guests and hosts",
      "Failure modes tested against before the platform carried live events"
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
    proofNotes: ["The product is named with the client's agreement; the founder's identity is not connected to it publicly. Screenshots are pending privacy review — none are published yet. The reviews quoted are public on Trustpilot, Google and Fiverr."],
    ctaAngle: "Talk to us when the engineering problem is the hard part, not the interface."
  },
  testimonial: {
    quote: "We could not be happier about working with Zumetrix Labs! What has started as an idea has turned into a really great projekt/product, which only evolved into its full potential through the corporation, ideas, experience, professionalism and openness from our developer. Everything was well understood, delivered on time and documented clearly. Thanks again. We can highly appreciate the work performed and couldn't recommend working with Zia and his Team enough!",
    author: "Founder",
    role: "Knipsr"
  },
  proves: "That we can build a consumer-facing SaaS from an idea to a launched product and own the unglamorous half — background jobs, retries, caching, privacy — that decides whether it holds up on the day.",
  evidence: [
    { label: "Founder's Trustpilot review", detail: "Five stars; corroborated on Google and by two Fiverr reviews on the same work.", href: "/client-stories" },
    { label: "Founder's second Fiverr review", detail: "\"Even after completion he is genuinely interested in how everything works out and helps regarding questions, bugs, etc\"." }
  ],
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
  image: "/project_images/covers/cover-saas-product.svg",
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
    proofNotes: ["Client and founder identity are withheld at the client's request. The operational V1 described here was delivered by Zumetrix; public documentation of it — screenshots or a client statement — is pending privacy review, and the only public review for this engagement refers to the landing page. Pricing Engine V2 was designed and planned only; it is described here as planned work, not shipped functionality."],
    ctaAngle: "If you have a bigger vision than your first release can carry, this is the kind of sequencing conversation worth having before you build."
  },
  proves: "That we will argue a founder out of building their favourite part first when the business needs the boring part to work — and write down what was deferred so it is a plan, not a loss.",
  evidence: [
    { label: "Founder's Fiverr review", detail: "Five stars; the public review refers to the landing page work, not the operational V1 described above." },
    { label: "Public documentation pending", detail: "No screenshots or client statement about the operational V1 are published yet. Until they are, treat the build details on this page as Zumetrix's account." }
  ],
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
  longDescription: "The product is a founder-built, AI-assisted learning platform that had grown quickly and needed a technical partner to stabilise it rather than rebuild it. The company and product name are not published here; the founder's two Upwork reviews are. The work covered frontend and backend stabilisation, API cleanup, database logic, routing fixes, completion of unfinished flows and deployment troubleshooting — alongside business-rule clarification the founder needed but had not had time to resolve: Offers pricing changes, community invitation logic, contact ownership rules. A recurring part of the job was separating signal from noise: what was broken, what was unfinished, what was intentional, and what was scope for later. Two engagements on Upwork, $1,900 each, titled \"Scalable SaaS Refactor + DB & Code Optimization\".",
  image: "/project_images/covers/cover-internal-system.svg",
  tags: ["SaaS Stabilization", "API Cleanup", "Cloudflare Workers", "Technical Triage", "Founder Technical Partner"],
  client: {
    name: "Learning Platform SaaS",
    country: "",
    industry: "EdTech / Learning Platform SaaS"
  },
  clientLabel: "Product",
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
    proofNotes: ["The product and company are not named publicly. The founder's two Upwork reviews are public and are quoted here. No product screenshots are used or will be used for this project. Not every issue in the product was fixed during this engagement; scope here reflects only the work described above."],
    ctaAngle: "If your product needs someone to tell you honestly what's actually wrong with it before touching a line of code, this is that kind of engagement."
  },
  testimonial: {
    quote: "Working with Zia was really smooth and pleasant. You can trust him with any task. He treats the project as his own and is responsive to anything you need. This was my second project with him, and we've built a very good connection. I'll definitely reach out to him again whenever I need any help.",
    author: "Alan Ayoubi",
    role: "Founder, Learning Platform SaaS"
  },
  proves: "That we will stabilise a product instead of selling a rewrite, tell a founder which problems are bugs and which are decisions, and be asked back for a second engagement on the same product.",
  evidence: [
    { label: "Two Upwork reviews from the founder", detail: "Both five stars, both on contracts titled \"Scalable SaaS Refactor + DB & Code Optimization\", $1,900 each. \"This is my second time working with Zia.\"" },
    { label: "Stripe billing not claimed", detail: "Subscription billing was scoped as future work during this engagement and was not built. This page does not claim it." }
  ],
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
  image: "/project_images/covers/cover-product-rescue.svg",
  ogImage: "/project_images/fast-track-og.png",
  ogImageAlt: "Fast Track USA: about two years with a previous team trying to get the app launched, then three weeks to launch after Zumetrix took over, per the client. \"No bugs, no issues.\" — Josh Nyce, Owner & Founder.",
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
  proves: "That when a product has been stuck for a long time, the problem is sometimes the team, and a change of hands can end it quickly. One verified story — Josh's — not a typical timeline.",
  evidence: [
    { label: "Josh's own film", detail: "Recorded by the client; every quote on this page is verbatim from the transcript." },
    { label: "Trustpilot review", detail: "Five stars, August 2026; same account corroborated on Google." },
    { label: "Upwork record", detail: "A separate five-star contract with Josh on a related QR redirect setup." }
  ],
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
      href: "/product-rescue",
      label: "Start your own Product Rescue Assessment",
      description: "If this sounds like your situation: a bounded, $750 evidence-based assessment of your product.",
    },
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

,
// 25. First North Peptides — website, AI concierge and SEO foundation
// Everything here is sourced from the client's Clutch review (5.0; quality,
// schedule, cost and willingness to refer all 5.0), corroborated on Trustpilot
// and Google. Public company/project attribution is approved in the proof
// library. Outcomes are the client's reported outcomes, stated as such.
{
  id: 25,
  slug: "first-north-peptides-website-ai-concierge",
  primaryService: "web-application-development",
  searchIndexable: true,
  title: "First North Peptides – Website, AI Concierge and Search Foundation",
  category: "Web Application",
  type: "saas",
  description: "Full development of a Danish research company's website — design implementation, mobile, a custom AI concierge for customer questions, and the technical groundwork for Google — reviewed 5.0 on Clutch.",
  longDescription: "First North Peptides needed a professional website with a long list of specific requirements, and a way to answer customer questions beyond an FAQ. Between June and August 2026 we handled the complete development: design implementation, mobile optimisation, functionality and user experience, a custom AI concierge for immediate customer assistance, Google and SEO groundwork, and the rounds of adjustment and refinement a detail-heavy brief needs. The client's Clutch review describes the result as a fully functional professional website that met the original requirements, a responsive desktop and mobile experience, integrated AI customer support that reduced the need for manual support, improved navigation, and a strong technical foundation for search. Project budget under $10,000. The site is public at firstnorth.bio and the client names it as a reference for our work.",
  // Placeholder until the category cover system lands (covers are selected
  // by category in src/data/covers.ts, not by this path). No client UI is
  // shown without written permission.
  image: "/og/page-portfolio.png",
  tags: ["Web Development", "AI Concierge", "SEO Foundation", "Mobile Optimisation", "UX"],
  client: {
    name: "Andi – First North Peptides",
    country: "Denmark",
    industry: "Research & Life Sciences"
  },
  duration: "June–August 2026 (per the Clutch record)",
  team: "Zia (lead) with the Zumetrix team",
  year: "2026",
  featured: true,
  results: [
    "A fully functional professional website meeting the original requirements, per the client",
    "Responsive desktop and mobile experience, improved navigation and UX",
    "A custom AI concierge answering customer questions beyond the FAQ — the client reports it reduced the need for manual customer support",
    "Google and SEO groundwork: a technical foundation the client describes as strong",
    "Ongoing adjustments, troubleshooting and refinement until the result matched the brief"
  ],
  problem: "A research company with specific, detailed requirements needed a website that would represent it properly, work on every device, answer customer questions without a person on hand, and be built so Google could understand it.",
  solution: "We took the whole build: design implementation, functionality, mobile optimisation and UX, a custom AI concierge for customer assistance, and the technical SEO groundwork — then kept refining through the client's specific requests until the result matched what they had envisioned.",
  testimonial: {
    quote: "Their combination of web development, AI integration, design, UX, and SEO into one solution was impressive.",
    author: "Andi",
    role: "Director, First North Peptides"
  },
  liveLink: "",
  stack: ["Web", "Custom AI Concierge", "SEO"],
  services: ["Web Development", "AI Integration", "UX & Mobile Optimisation", "SEO Foundation"],
  kpis: [
    { label: "Clutch review", value: "5.0", description: "Quality 5.0 · Schedule 5.0 · Cost 5.0 · Willing to refer 5.0" },
    { label: "Delivered", value: "Jun–Aug 2026", description: "Per the Clutch record; budget under $10,000" },
    { label: "Customer support", value: "AI concierge", description: "Client-reported: reduced the need for manual support" }
  ],
  caseStudy: {
    decisions: [
      { title: "One team for the whole surface", description: "Web, design implementation, the AI concierge and the search groundwork were handled together rather than split across vendors — the client's review calls out that combination specifically." },
      { title: "Keep refining until it matches the brief", description: "A detail-heavy brief means many specific requests. The review describes persistence through revisions until the result matched the vision; that was the job." }
    ],
    proofNotes: ["All outcomes on this page are the client's reported outcomes as recorded in the Clutch review. Public company and project attribution is approved by the client."]
  },
  proves: "That we deliver a complete public-facing build — design, development, an AI layer that does real work, and the search foundation — to a client exacting enough to write a long review about the details.",
  evidence: [
    { label: "Clutch review", detail: "5.0 overall; Quality, Schedule, Cost and Willing to Refer all 5.0. Reviewer: Director, First North Peptides, Copenhagen." },
    { label: "Trustpilot and Google reviews", detail: "The same client's account of the project, published on both; names the site as a reference for our work." },
    { label: "Public attribution", detail: "Company and project connection approved in our proof library." }
  ],
  relatedReading: [
    {
      href: "/services/ai-automation-solutions",
      label: "AI that does a job, not a demo",
      description: "The concierge here answers customers; our automation page is about where that kind of work belongs — and where it doesn't.",
    },
  ]
}

];

// Project filters and categories (API-ready structure)
// The public archive: client work only. Internal/demo builds, unbuilt plans
// and client-less patterns stay in `projects` (their detail routes still
// resolve) but are excluded from listings, counts and pickers.
export const isListed = (p: Project) => p.listed !== false;
export const listedProjects = projects.filter(isListed);

export const projectCategories = [
  { id: "all", label: "All Projects", count: listedProjects.length },
  { id: "saas", label: "SaaS Applications", count: listedProjects.filter(p => p.type === "saas").length },
  { id: "mobile", label: "Mobile Apps", count: listedProjects.filter(p => p.type === "mobile").length },
  { id: "enterprise", label: "Enterprise Solutions", count: listedProjects.filter(p => p.type === "enterprise").length },
  { id: "mvp", label: "MVP Development", count: listedProjects.filter(p => p.type === "mvp").length },
  { id: "automation", label: "Automation Systems", count: listedProjects.filter(p => p.type === "automation").length },
  { id: "rescue", label: "Product Rescue", count: listedProjects.filter(p => p.type === "rescue").length }
].filter(c => c.count > 0);

export const projectTechnologies = [
  "React", "Node.js", "Python", "React Native", "Firebase", "AWS", 
  "TypeScript", "PostgreSQL", "MongoDB", "Docker", "Kubernetes", "AI/ML"
];

// API-ready data access functions (ready for backend migration)
export const getProjects = () => listedProjects;
export const getFeaturedProjects = () => listedProjects.filter(p => p.featured);
export const getHomepageFeaturedProjects = () => listedProjects.filter(p => p.homepageFeatured);
export const getProjectBySlug = (slug: string) => projects.find(p => p.slug === slug);
export const getProjectsByCategory = (category: string) =>
  category === "all" ? listedProjects : listedProjects.filter(p => p.type === category);
export const getProjectCategories = () => projectCategories;
