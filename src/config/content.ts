import { FACTS } from "./facts";
/**
 * ZUMETRIX LABS - CENTRALIZED BRAND CONTENT
 *
 * This is the single source of truth for all brand-defining content.
 * Update this file to change positioning, messaging, and CTAs across the entire site.
 *
 * DO NOT hardcode brand content in components. Pull from this file instead.
 *
 * CONTENT SEGMENT TYPES:
 * - "normal": Regular body text (text-muted-foreground)
 * - "emphasis": Bold, standout text (font-medium text-foreground)
 * - "accent": Primary color highlight (text-primary font-medium)
 * - "break": Line break
 */

export type ContentSegment = {
  text: string;
  type: "normal" | "emphasis" | "accent";
} | {
  type: "break";
};

export const BRAND_CONTENT = {
  /**
   * CORE BRAND POSITIONING
   * These define who we are and what we stand for
   */
  brand: {
    name: "Zumetrix Labs",
    tagline: "Forge Clear Ideas Into Shipped Software.",
    positioningStatement: "We build the software your business actually needs — and tell you when it doesn't.",

    shortDescription: "Zumetrix Labs is a founder-led software studio. Zia Hussain and Omer Gillani, with a small specialist team, work out what should happen to a product before anyone writes code — then build it: SaaS, web and mobile products, product rescue, and operational automation.",

    longDescription: FACTS.counts.projectsShipped + " projects built. Some raised funding. Some didn't. In our experience the difference was how clear the problem was before we started building. We push back on unclear ideas. We challenge assumptions. We say no when it makes sense. That's uncomfortable. It's also how we try to keep our projects on track to launch.",
  },

  /**
   * HERO SECTION
   * Primary landing content that sets expectations
   */
  hero: {
    badge: "Founder-led software studio",

    headline: {
      line1: "We build the software",
      line2: "your business actually needs —",
      line3: "and tell you when it doesn't."
    },

    subheadline: [
      { text: "A new SaaS product, a product that's stuck, or an operation still run by hand: ", type: "normal" },
      { text: "we work out what should happen next, then build it.", type: "emphasis" },
      { text: " Founder-led, with the record to show for it.", type: "normal" }
    ] as ContentSegment[],

    proofLine: `${FACTS.counts.projectsShipped} projects shipped · ${FACTS.counts.writtenReviews} written client reviews`,

    primaryCTA: {
      text: "Tell us where you are",
      link: "/contact"
    },

    secondaryCTA: {
      text: "See the work",
      link: "#portfolio"
    }
  },

  /**
   * SIGNATURE METHOD (Why Us)
   * The PAS framework section explaining differentiation
   */
  signatureMethod: {
    title: "Why founders choose us (and why some don't)",
    subtitle: "Three things we do that cost us some deals and keep the rest.",

    sections: [
      {
        icon: "problem",
        title: "We'll tell you not to build it.",
        description: [
          { text: "Every rescue assessment can end with \"keep what you have\" — it costs the same either way. Every new build starts by writing down what the first version won't include. ", type: "normal" },
          { text: "Founders who want a yes to everything leave; the ones who stay get software that was decided, not accumulated.", type: "emphasis" }
        ] as ContentSegment[],
        stat: "Decided before it's built"
      },
      {
        icon: "approach",
        title: "The people who scoped it build it.",
        description: [
          { text: "Zia and Omer are on the first call, write the scope, and are still answering the thread after launch — with a small specialist team across design, development, QA and automation working beside them. ", type: "normal" },
          { text: "No handoff to a team you've never met.", type: "accent" }
        ] as ContentSegment[],
        stat: "Founders close, delivery deep"
      },
      {
        icon: "results",
        title: "We'd rather be checkable than impressive.",
        description: [
          { text: FACTS.counts.writtenReviews + " written reviews sit on Fiverr, Upwork, Trustpilot, Clutch and Google — platforms we can't edit. ", type: "normal" },
          { text: "Every number on this site traces to a record, every case study separates what the client reported from what we measured, and every price is published before the call.", type: "emphasis" }
        ] as ContentSegment[],
        stat: "Prices before the call"
      }
    ]
  },

  /**
   * FINAL CTA
   * Bottom of page conversion content
   */
  finalCTA: {
    badge: "What happens next",

    headline: {
      line1: "Tell us where you are.",
      line2: "We'll tell you what fits."
    },

    subtitle: [
      { text: "A 30-minute call with Zia or Omer. If one of our services fits, we'll say which and what it would cost to start. ", type: "normal" },
      { text: "If none does, we'll say that too.", type: "emphasis" }
    ] as ContentSegment[],

    primaryCTA: {
      text: "Book a call",
      link: "https://calendly.com/zumetrix-labs/consultation"
    },

    secondaryCTA: {
      text: "Write to us instead",
      link: "/contact"
    },

    trustSignals: [
      "A reply within two business days",
      "Prices stated before the call",
      "No obligation"
    ]
  },

  /**
   * FOOTER
   * Brand description for footer section
   */
  footer: {
    description: "Founded by Zia Hussain and Omer Gillani. The software studio that decides before it builds — SaaS, web and mobile products, product rescue and operational automation.",

    copyright: "Crafted by Zia Hussain and Omer Gillani"
  },

  /**
   * TRUST CREDENTIALS
   * Verifiable proof points used across the site
   */
  trust: {
    upwork: {
      badge: "Top Rated on Upwork",
      score: "Zia Hussain · 100% Job Success Score",
      link: "https://www.upwork.com/freelancers/ziahussain1"
    },

    metrics: {
      projects: FACTS.counts.projectsShipped,
      projectsDescription: "Projects Delivered",
      timeline: FACTS.counts.writtenReviews,
      timelineDescription: "Written client reviews",
      experience: "Founder-led",
      experienceDescription: "Every engagement"
    }
  },

  /**
   * DEFAULT META CONTENT
   * SEO descriptions for pages (can be overridden)
   */
  meta: {
    home: {
      title: "Zumetrix Labs — SaaS products, product rescue and automation, founder-led",
      description: "Founder-led software studio for founders and operating companies: SaaS, web and mobile products, product rescue and stabilization, and workflow automation. Prices stated on every service page."
    },

    about: {
      title: "About Zumetrix Labs | Zia Hussain & Omer Gillani, Founders",
      description: "Zia Hussain (CEO) and Omer Gillani (CTO) founded Zumetrix Labs in June 2025 after years of shipping software for other people's businesses. How the studio decides, builds and stays accountable — with a small specialist team behind the founders."
    },

    services: {
      title: "Software Development Services | SaaS MVP, React, AI Automation | Zumetrix Labs",
      description: "Software development services by Zumetrix Labs. SaaS MVP development, React/Node.js applications, mobile apps, AI automation, Firebase integration. Founded by Zia Hussain & Omer Gillani."
    }
  }
} as const;

/**
 * USAGE EXAMPLES:
 *
 * Simple strings:
 * <h1>{BRAND_CONTENT.hero.headline.line1}</h1>
 *
 * Content with semantic emphasis:
 * import { renderContentSegments } from '@/utils/contentRenderer';
 * <p>{renderContentSegments(BRAND_CONTENT.hero.subheadline)}</p>
 *
 * Links:
 * <a href={BRAND_CONTENT.trust.upwork.link}>{BRAND_CONTENT.trust.upwork.badge}</a>
 */
