// Curated, manually-verified proof library.
// Source of truth: internal/proof-library/Zumetrix_Written_Proof_Master.xlsx (not committed — see .gitignore).
// Every quote below is copied verbatim from a real Fiverr, Upwork, Google, Trustpilot, or Clutch review.
// Nothing here is rewritten, merged, or invented. Partial excerpts are cut only at clean sentence
// boundaries from reviews the source platform itself truncated — never reconstructed.
//
// Attribution rules applied:
// - Real first names are used only where public attribution is confirmed.
// - Some products below are named publicly while the reviewer's personal identity is deliberately not
//   connected to them — that restriction is intentional, not an oversight. Do not "fix" it by adding a name.
// - One source record tied to a confidential case study was excluded outright rather than anonymized.
// - Anonymized Upwork clients (no name in the source export) use a clean role/context label instead of
//   a username or an invented name.

export type ProofCategory =
  | "build"
  | "rescue"
  | "automation"
  | "technical"
  | "longterm";

/** A single big fact, rendered large in the UI — e.g. { stat: "2 YEARS", label: "stalled with the previous team" }.
 * Always a factual editorial statement written by us, never a paraphrase of the client's own words. */
export interface EvidenceStat {
  stat: string;
  label: string;
  /** Small header above the stat identifying whose side of the story it is — required on before/after
   * pairs so the transformation reads unambiguously (who struggled vs. what Zumetrix delivered). */
  who?: string;
}

export interface TestimonialEntry {
  id: string;
  quote: string;
  /** True when the source review was truncated by the platform ("See more"). The excerpt below is cut
   * at the last complete clause of the available text — nothing after the cut is invented. */
  isPartial?: boolean;
  author: string;
  role: string;
  project?: string;
  projectSlug?: string;
  category: ProofCategory[];
  platform: "Fiverr" | "Upwork" | "Google" | "Trustpilot" | "Clutch";
  /** Only set when the source explicitly carries a star rating (nearly every record in the source library
   * is a verified 5). Omitted for the one record that's an attestation, not a rated review. */
  rating?: number;
  /** Other platforms carrying the same underlying review, for cross-platform corroboration — not counted
   * as separate proof. */
  corroboratedOn?: string[];
  repeatClient?: boolean;
  featured?: boolean;
  /** The large editorial fact that carries the visual weight for a featured story — a before/after pair
   * for transformation stories, or a single fact for everything else. Written by us; never inside quotes. */
  evidence?: {
    before?: EvidenceStat;
    after?: EvidenceStat;
    fact?: EvidenceStat;
  };
}

export const TESTIMONIALS: TestimonialEntry[] = [
  // ---- Featured (homepage + top of client-stories) ----
  {
    id: "josh-fast-track",
    quote:
      "Zia and his team at Zumetrix Labs are the ultimate professionals! They are masters in the art of app development. I had a Dev team before them and for two years struggle to get my app up and running. Within 3 weeks of Zia taking over it was up and running in Flawless condition. I highly recommend them for all your app development needs. I promise they will take care of you and you will be 100% satisfied.",
    author: "Josh Nyce",
    role: "Fast Track",
    project: "Fast Track",
    category: ["rescue"],
    platform: "Trustpilot",
    rating: 5,
    corroboratedOn: ["Google"],
    featured: true,
    evidence: {
      before: { who: "Previous Dev Team", stat: "2 YEARS", label: "the app never worked reliably" },
      after: { who: "Zumetrix", stat: "3 WEEKS", label: "shipped, flawless condition" },
    },
  },
  {
    id: "founder-knipsr",
    quote:
      "We could not be happier about working with Zumetrix Labs! What has started as an idea has turned into a really great projekt/product, which only evolved into its full potential through the corporation, ideas, experience, professionalism and openness from our developer.",
    isPartial: true,
    author: "Founder",
    role: "Knipsr",
    project: "Knipsr",
    projectSlug: "knipsr-event-media-saas",
    category: ["build"],
    platform: "Trustpilot",
    rating: 5,
    corroboratedOn: ["Google", "Fiverr"],
    featured: true,
    evidence: {
      before: { who: "Day One", stat: "AN IDEA", label: "no product yet" },
      after: { who: "Zumetrix", stat: "SHIPPED", label: "documented, delivered on time" },
    },
  },
  {
    id: "nathan-api-rescue",
    quote:
      "Zia is the kind of dev who makes you double-check the delivery time because surely no one builds something that good, that fast. But he does. I gave him a backend mess, some vague Twilio goals, and he returned with a fully functional, beautifully structured API.",
    isPartial: true,
    author: "Nathan",
    role: "Backend/API client",
    category: ["rescue", "technical"],
    platform: "Fiverr",
    rating: 5,
    featured: true,
    evidence: {
      before: { who: "The Ask", stat: "A MESS", label: "vague Twilio goals, no structure" },
      after: { who: "Zumetrix", stat: "CLEAN API", label: "fully functional, delivered fast" },
    },
  },
  {
    id: "andi-first-north",
    quote:
      "Their combination of web development, AI integration, design, UX, and SEO into one solution was impressive.",
    author: "Andi",
    role: "First North Peptides",
    project: "First North Peptides",
    category: ["build", "technical"],
    platform: "Clutch",
    rating: 5,
    corroboratedOn: ["Trustpilot", "Google"],
    featured: true,
    evidence: {
      fact: { stat: "WEB · AI · UX · SEO", label: "one engagement, 5.0 verified on Clutch" },
    },
  },
  {
    id: "james-floating-stone-ranch",
    quote:
      "The team understood the complexity of my industry and of the project quickly and were flexible with the scope as we all learned to deal with new solutions on the fly. I will continue to use this team.",
    author: "James",
    role: "Floating Stone Ranch",
    project: "Floating Stone Ranch",
    projectSlug: "floating-stone-ranch-processor-intake-engine",
    category: ["automation", "longterm"],
    platform: "Fiverr",
    rating: 5,
    repeatClient: true,
    featured: true,
    evidence: {
      fact: { stat: "8 MONTHS", label: "working together — still an active client" },
    },
  },
  {
    id: "alan-learning-platform",
    quote:
      "Working with Zia was really smooth and pleasant. You can trust him with any task. He treats the project as his own and is responsive to anything you need. This was my second project with him, and we've built a very good connection. I'll definitely reach out to him again whenever I need any help.",
    author: "Alan Ayoubi",
    role: "Learning Platform SaaS",
    project: "Learning Platform SaaS",
    projectSlug: "learning-platform-saas-stabilization",
    category: ["rescue", "longterm"],
    platform: "Upwork",
    rating: 5,
    repeatClient: true,
    featured: true,
    evidence: {
      fact: { stat: "2ND PROJECT", label: "same client, back for a second engagement" },
    },
  },
  {
    id: "reema",
    quote:
      "The best team I have worked with in over a decade. Their knowledge, client care, technical know how and ability to bring your vision to reality is unmatched. Do not look anywhere else they are the best!",
    author: "Reema",
    role: "Repeat client, multiple projects",
    category: ["longterm", "technical"],
    platform: "Fiverr",
    rating: 5,
    repeatClient: true,
    featured: true,
    evidence: {
      fact: { stat: "MULTIPLE PROJECTS", label: "and, in her own words, a \"lifetime client\"" },
    },
  },

  // ---- Review library ----
  {
    id: "dinah-mobile",
    quote:
      "Syed has been a completely rockstar on our team, transforming our project to quick, seamless and perfect work every time. He is always responding to my questions any time of day and has provided an experience I can rave about. He is has been the saving grace for my project. Must hire!",
    author: "Dinah",
    role: "Multiple mobile app projects",
    category: ["rescue", "longterm"],
    platform: "Fiverr",
    rating: 5,
    repeatClient: true,
  },
  {
    id: "kevin-automation",
    quote:
      "Working with Omer has been an outstanding experience. He quickly understood the vision for my project and translated it into a clean, scalable system that integrates Twilio, Make, Airtable, and Softr seamlessly. His attention to detail was impressive.",
    isPartial: true,
    author: "Kevin",
    role: "Automation client",
    category: ["automation", "technical"],
    platform: "Fiverr",
    rating: 5,
  },
  {
    id: "mounir-automation",
    quote:
      "Omer did an amazing job. He understood exactly what I needed, delivered the automation flawlessly, and even optimized parts I didn't think about. Communication was smooth and professional from start to finish. I highly recommend him if you want clean, efficient automation work done right.",
    author: "Mounir",
    role: "Automation client",
    category: ["automation"],
    platform: "Fiverr",
    rating: 5,
  },
  {
    id: "fateh-repeat",
    quote:
      "My new go to guy. I finally found him. I will use him for all my future projects. Very professional and polit, and delievered on time and went beyond my requirements. Updated me on every step and good communicator. He knows zapier, webflow and many other stuff like a swiss knife",
    author: "Fateh",
    role: "Repeat client",
    category: ["longterm", "automation"],
    platform: "Fiverr",
    rating: 5,
    repeatClient: true,
  },
  {
    id: "sarah-saas",
    quote:
      "We had some back and forward to get the details right but Omer was patient, professional and attentive the whole way through. Worked methodically through testing together and will still answer my annoying questions when after finished! thanks omer",
    author: "Sarah",
    role: "SaaS client",
    category: ["technical", "longterm"],
    platform: "Fiverr",
    rating: 5,
    repeatClient: true,
  },
  {
    id: "kelly-longterm",
    quote:
      "One of THE BEST Freelancers I have worked with in the over 10 years I have been using Upwork. Knowledgable, hard working, great communication. Could not ask for more.",
    isPartial: true,
    author: "Kelly",
    role: "Full-stack client",
    category: ["longterm", "technical"],
    platform: "Upwork",
    rating: 5,
  },
  {
    id: "allayth-shopify-automation",
    quote:
      "Pleasure working with Syed, went above and beyond. Set up my Shopify > Make.com > Notion automation to track PNL and inventory! Quality work",
    author: "Allayth",
    role: "Automation client",
    category: ["automation"],
    platform: "Fiverr",
    rating: 5,
  },
  {
    id: "donald-custom-automation",
    quote:
      "I had a custom built app script developed for my business. The app script works very well and did indeed exceed my expectations. Will definitely use again and I highly recommend using them for your GHL, Zapier, Google Sheet, and custom app script application.",
    author: "Donald",
    role: "Automation client",
    category: ["automation"],
    platform: "Fiverr",
    rating: 5,
  },
  {
    id: "sheeza-mobile-delivery",
    quote:
      "Omer was amazing to work with, fast, skilled, and incredibly helpful. He handled everything from TestFlight to Firebase setup perfectly and even gave a clear guide for future updates. Super reliable and easy to communicate with. Highly recommended!",
    author: "Sheeza",
    role: "Mobile app client",
    category: ["technical"],
    platform: "Fiverr",
    rating: 5,
  },
  {
    id: "sufiyan-reliability",
    quote:
      "Omer is reliable, professional, and very easy to work with. He communicates clearly, understands requirements quickly, and delivers solutions efficiently. I appreciate his structured approach and responsiveness throughout the project.",
    author: "Sufiyan",
    role: "Automation client",
    category: ["automation", "technical"],
    platform: "Fiverr",
    rating: 5,
  },
  {
    id: "muhammad-raheem-ecommerce",
    quote:
      "Zia H. is a highly skilled and dedicated professional. He played a crucial role in improving our e-commerce platform with his expertise and problem-solving approach. Working with him was a great experience, and I highly recommend him!",
    author: "Muhammad Raheem",
    role: "E-commerce client",
    category: ["technical"],
    platform: "Upwork",
  },
  {
    id: "vercel-rescue",
    quote:
      "Working with Zia was incredibly smooth. He went above and beyond to fix the issue, resolving it in a very short time. His communication was both professional and pleasant throughout.",
    isPartial: true,
    author: "Web Platform Client",
    role: "Vercel deployment fix",
    category: ["rescue", "technical"],
    platform: "Upwork",
    rating: 5,
  },
  {
    id: "react-repeat-client",
    quote:
      "Another project completed by Zia. It was a great pleasure to work with Zia once more. He is always eager to help, and provides great insight that contributes to the",
    isPartial: true,
    author: "React Web App Client",
    role: "Repeat client",
    category: ["technical", "longterm"],
    platform: "Upwork",
    rating: 5,
    repeatClient: true,
  },
  {
    id: "founder-liftly",
    quote:
      "Working with this Fiverr team has been an absolute game-changer for our business. From the very beginning, they understood our vision and brought it to life with a beautifully designed, high-performing landing page that exceeded our expectations.",
    isPartial: true,
    author: "Founder",
    role: "Liftly",
    project: "Liftly",
    projectSlug: "liftly-operational-mvp-v1",
    category: ["build"],
    platform: "Fiverr",
    rating: 5,
  },
  {
    id: "rashad-automation-troubleshooting",
    quote:
      "Syed was fantastic to work with. He quickly understood the vision and helped bring complex automation workflows to life inside Softr and Airtable. He was responsive, knowledgeable, and extremely patient throughout the process. What stood out most was his ability to troubleshoot issues quickly.",
    isPartial: true,
    author: "Rashad",
    role: "Automation client",
    category: ["automation", "technical"],
    platform: "Fiverr",
    rating: 5,
  },
  {
    id: "biraj-detail",
    quote:
      "Very good to work with, attention to details, very cooperative, very skillful and professional.",
    author: "Biraj",
    role: "Bubble client",
    category: ["technical"],
    platform: "Fiverr",
    rating: 5,
  },
  {
    id: "carmen-repeat",
    quote: "As always his expertise helped me a lot. I will come back again.",
    author: "Carmen",
    role: "Repeat client",
    category: ["longterm"],
    platform: "Fiverr",
    rating: 5,
    repeatClient: true,
  },
  {
    id: "jay-lancaster",
    quote: "Excellent. I may steal him from the platform altogether.",
    author: "Jay Lancaster",
    role: "Automation client",
    category: ["longterm", "automation"],
    platform: "Fiverr",
    rating: 5,
  },
  {
    id: "suday-proactive",
    quote: "He's proactive, I will definitely hire Him for another project",
    author: "Suday",
    role: "Cross-platform dev client",
    category: ["longterm", "technical"],
    platform: "Fiverr",
    rating: 5,
  },
  {
    id: "oliver-automation-workflow",
    quote:
      "I had the pleasure of working with this incredibly skilled freelancer on an automation project, and I couldn't be happier with the results. From the very beginning, they demonstrated a deep understanding of the requirements and offered smart, efficient solutions that significantly improved my workflow.",
    isPartial: true,
    author: "Oliver",
    role: "Automation client",
    category: ["automation"],
    platform: "Fiverr",
    rating: 5,
  },
  {
    id: "bubble-client-uk",
    quote:
      "Highly skilled and very proactive communication, I'm really glad I found your gig and really appreciate all the expertise and patience.",
    author: "Bubble Client — UK",
    role: "Bubble client",
    category: ["technical", "build"],
    platform: "Fiverr",
    rating: 5,
  },
  {
    id: "nyte-team-repeat",
    quote: "Excellent work as always !!! Thanks so much for your pro activity Can only recomand :)",
    author: "NYTE Team",
    role: "Repeat client, automation",
    category: ["longterm", "automation"],
    platform: "Fiverr",
    rating: 5,
    repeatClient: true,
  },

  // ---- Project-linked testimonials (collected directly, not from the marketplace proof library) ----
  {
    id: "kelly-andrews-ifyify",
    quote:
      "Zumetrix Labs delivered exactly what we envisioned and more. The AI integration is seamless, the user experience is fantastic, and the code quality is exceptional. Looking forward to Phase 2 expansion!",
    author: "Kelly Andrews",
    role: "Founder, Best Business Services",
    project: "Ifyify — AI-Powered Personal Branding Tool",
    projectSlug: "ifyify-ai-personal-branding",
    category: ["build", "technical"],
    platform: "Fiverr",
    rating: 5,
  },
  {
    id: "jenny-hjelpna",
    quote:
      "Your Bubble knowledge and system thinking saved me from so many future problems. The marketplace now feels robust instead of hacked together.",
    author: "Jenny",
    role: "Founder, HjelpNå",
    project: "Handyman Marketplace PWA",
    projectSlug: "hjelpna-handyman-marketplace",
    category: ["build", "technical"],
    platform: "Fiverr",
    rating: 5,
  },
  {
    id: "imane-utility-bill",
    quote:
      "The system design covered everything I needed and more. It gave me clarity on the technical path ahead.",
    author: "Imane",
    role: "Co-founder, Utility Bill Deal Finder",
    project: "AI-Powered Bill Analysis MVP",
    projectSlug: "utility-bill-deal-finder",
    category: ["build"],
    platform: "Fiverr",
    rating: 5,
  },
  {
    id: "bharat-bondfire",
    quote:
      "You jumped into a messy situation and got us back to shipping. That was exactly what we needed.",
    author: "Bharat",
    role: "Developer, Bondfire",
    project: "Event Booking App Stabilization",
    projectSlug: "bondfire-event-booking-app",
    category: ["rescue"],
    platform: "Fiverr",
    rating: 5,
  },
];

export const getFeaturedTestimonials = () =>
  TESTIMONIALS.filter((t) => t.featured);

export const getTestimonialLibrary = () =>
  TESTIMONIALS.filter((t) => !t.featured);

export const getAllTestimonials = () => TESTIMONIALS;

export const CATEGORY_LABELS: Record<ProofCategory, string> = {
  build: "Build",
  rescue: "Rescue",
  automation: "Automation",
  technical: "Technical Delivery",
  longterm: "Long-Term Partnership",
};
