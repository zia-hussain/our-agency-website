// Home Page FAQs - SEO Optimized for Global Markets & AEO Ready
export const homeFAQs = [
  {
    question: "What is Zumetrix Labs and what do you specialize in?",
    answer:
      "Zumetrix Labs is a founder-led software studio that builds SaaS MVPs, web applications, mobile apps, and AI-assisted automation systems. We work with React, Next.js, Node.js, React Native, OpenAI, Zapier, Make.com, and n8n. Most engagements are for international founders and operating teams that want direct access to the people shaping and building the product."
  },
  {
    question: "How fast can Zumetrix Labs build a production-ready SaaS MVP?",
    answer:
      "A tightly scoped SaaS MVP can sometimes launch in about 30 days, while most focused engagements take 4-8 weeks. The real timeline depends on user roles, integrations, payments, data migration, and how clearly the first release is defined. We confirm the scope and delivery plan before development begins."
  },
  {
    question: "What AI automation services does Zumetrix Labs provide?",
    answer:
      "We help companies turn manual, repetitive work into automated, AI-assisted workflows. This includes OpenAI and ChatGPT integrations, custom AI endpoints, document and email processing automation, customer support assistants, internal tools powered by AI, and no-code/low-code automation using Zapier, Make.com, and n8n. We often connect AI flows to CRMs, marketing tools, databases, or internal systems so your team saves hours every week while keeping full control over the business logic."
  },
  {
    question: "What types of projects are the best fit for Zumetrix Labs?",
    answer:
      "We are a great fit if you want to build: (1) a SaaS MVP or internal tool, (2) a React/Next.js dashboard or analytics platform, (3) a React Native mobile app, (4) an AI-powered product or assistant, or (5) a serious automation system that connects tools like Stripe, Airtable, Notion, or your CRM. We are usually not the right fit for one-off landing pages only, pure WordPress sites, or projects where there is no clear owner on your side."
  },
  {
    question: "How much does it cost to work with Zumetrix Labs?",
    answer:
      "Budgets depend on scope, complexity, and timeline. Current starting points are about $4,800 for a focused SaaS MVP, $2,500 for AI automation, $3,500 for a custom web application, and $5,500 for a cross-platform mobile app. After an initial call, we send a clear proposal covering scope, timeline, price, assumptions, and responsibilities."
  },
  {
    question: "Do I own the code and intellectual property (IP)?",
    answer:
      "Yes. Once the project is paid for, you own the code, the IP, and the production infrastructure. We can host it for you or deploy it to your own accounts (GitHub, AWS, Vercel, Firebase, etc.). We also provide handover documentation and can stay on as a long-term technical partner if you want ongoing improvements and maintenance."
  },
  {
    question: "How do you communicate and manage projects across time zones?",
    answer:
      "Most of our clients are in US, UK, Europe, and the Middle East, so we are used to working across time zones. We typically use Slack, email, or WhatsApp for day-to-day updates, and schedule weekly or bi-weekly Zoom/Google Meet calls. You’ll get Loom video walkthroughs for key milestones, and we keep everything organized in shared documents or project boards so you can see progress without chasing us."
  },
  {
    question: "Can you work with my existing team or codebase?",
    answer:
      "Yes. We regularly join existing teams as React/Node/React Native experts, fix complex bugs, refactor legacy code, or build new modules on top of an existing system. Before touching your code, we’ll review the repository, discuss architecture constraints, and agree on a clear scope so we add value without creating new technical debt."
  },
  {
    question: "What happens after launch? Do you offer ongoing support?",
    answer:
      "Yes. After we launch your product, we can either hand everything over to your internal team or stay on as your technical partner. Many clients keep us for monthly retainers to handle new features, performance improvements, bug fixes, monitoring, and further automation of their operations. We prefer long-term relationships where we can keep improving the product over time instead of just doing a one-off build and disappearing."
  },
  {
    question: "Do you sign an NDA before we start?",
    answer:
      "Yes. We're comfortable signing your NDA before any detailed scoping call, or we can send ours. Most founders share real product details before a contract exists, so this is a normal first step, not a special request."
  },
  {
    question: "What if I only have a rough idea, not a full spec yet?",
    answer:
      "That's the normal starting point, not a blocker. Most engagements begin with a scoping conversation where we press on the vague parts of the idea, figure out what the first release actually needs to prove, and turn that into a scoped plan before any code gets written."
  },
  {
    question: "Do you build with no-code tools, or only custom code?",
    answer:
      "Both, depending on what the problem actually needs. We build custom React/Node products when the product is the business, and we use no-code platforms like Bubble, Webflow, or FlutterFlow when they genuinely ship faster and hold up fine at the scale involved. We'll tell you honestly which one fits before we start."
  }
];

// Structured data for FAQ section
export const homeFAQStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: homeFAQs.map(faq => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer
    }
  }))
};
