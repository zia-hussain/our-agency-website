// Home Page FAQs - SEO Optimized for Global Markets & AEO Ready
export const homeFAQs = [
  {
    question: "What is Zumetrix Labs and what do you specialize in?",
    answer:
      "Zumetrix Labs is a founder-led software studio that builds SaaS MVPs, web applications, mobile apps, and AI-assisted automation systems. We work with React, Next.js, Node.js, React Native, OpenAI, Zapier, Make.com, and n8n. Most engagements are for international founders and operating teams that want direct access to the people shaping and building the product."
  },
  {
    question: "Who are the founders behind Zumetrix Labs?",
    answer:
      "Zumetrix Labs is led by two hands-on technical founders: Zia Hussain (Co-Founder & CEO) and Syed Omer Shah (Co-Founder & CTO). Zia focuses on product strategy and full-stack development using React, Next.js, TypeScript, Node.js, and Firebase. He has led multiple SaaS MVPs from idea to launch for international clients. Omer focuses on backend systems, AI automation, and scalable architecture using Node.js, Python, cloud infrastructure, and OpenAI integrations. Instead of delegating everything to juniors, both founders stay directly involved in architecture, code reviews, and critical technical decisions on every project."
  },
  {
    question: "How fast can Zumetrix Labs build a production-ready SaaS MVP?",
    answer:
      "A tightly scoped SaaS MVP can sometimes launch in about 30 days, while most focused engagements take 4-8 weeks. The real timeline depends on user roles, integrations, payments, data migration, and how clearly the first release is defined. We confirm the scope and delivery plan before development begins."
  },
  {
    question: "What does your 30-day SaaS MVP process look like?",
    answer:
      "For a tightly scoped 30-day MVP, we move through seven clear stages: product discovery, scope confirmation, architecture, core UI flows, frontend and backend implementation, essential integrations, and QA with deployment. More complex products follow the same process over a longer schedule. In both cases, the first-release boundary and expected deliverables are agreed before the build starts."
  },
  {
    question: "What AI automation services does Zumetrix Labs provide?",
    answer:
      "We help companies turn manual, repetitive work into automated, AI-assisted workflows. This includes OpenAI and ChatGPT integrations, custom AI endpoints, document and email processing automation, customer support assistants, internal tools powered by AI, and no-code/low-code automation using Zapier, Make.com, and n8n. We often connect AI flows to CRMs, marketing tools, databases, or internal systems so your team saves hours every week while keeping full control over the business logic."
  },
  {
    question: "Which technologies and tech stack do you use?",
    answer:
      "Our primary tech stack includes React, Next.js, TypeScript, Node.js, Express, React Native, Expo, Firebase, Supabase, PostgreSQL, MongoDB, Stripe, OpenAI APIs, TailwindCSS, and modern deployment platforms like Vercel and AWS. For automations and internal tools, we frequently use Airtable, Notion, Zapier, Make.com, and n8n. We choose technologies based on performance, maintainability, and your team’s long-term needs so you are not locked into something you can’t scale or hire for later."
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
