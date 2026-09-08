// Services Page FAQs — audited down from 10 to the 7 that resolve a real
// objection a serious founder would actually have at this point in the page.
// Cut: process walkthrough (duplicates How We Build above), automation-for-
// existing-businesses (duplicates the Automation chapter), "best fit"
// (duplicates the five chapters), and generic quality reassurance (duplicates
// The Record's independently verified proof). Added: what happens after
// contact, since that's the one real question the final CTA leaves open.
export const servicesFAQs = [
  {
    question: "How long does a typical project take?",
    answer:
      "It depends on the project, not just which service it falls under. A tightly scoped MVP can launch in about 30 days; most focused builds take 4-8 weeks. A rescue starts with an assessment before we commit to a timeline — promising a date before we've seen the code would be a guess. Whatever the project, you get a real timeline before work starts, not after."
  },
  {
    question: "How does pricing work?",
    answer:
      "Fixed-scope milestone pricing for clearly defined projects. Starting points: $3,500 for a web application, $4,800 for a SaaS MVP, $5,500 for a mobile app, $2,500 for automation. Rescue work is scoped after we've actually looked at the code — pricing it before that would be a guess, not a plan. Every proposal spells out scope, timeline, and what would change the number."
  },
  {
    question: "What technologies do you actually build with?",
    answer:
      "React, Next.js, TypeScript, Node.js, React Native, and Expo for the product itself; Firebase, Supabase, PostgreSQL, or MongoDB depending on the data; Stripe for payments. For automation work, usually Make.com, n8n, Airtable, or Notion, tied together with OpenAI where AI actually helps. We pick the stack for the problem, not for what's trendy, and build it so it can be handed over or grown without a rewrite."
  },
  {
    question: "Can you join an existing codebase or team?",
    answer:
      "Yes — refactoring, new modules, complex integrations, performance issues. We review your architecture and repos first, agree on scope, then work alongside your team with normal code review practices. The goal is to leave things simpler than we found them, not add another layer your developers have to work around."
  },
  {
    question: "What happens after launch?",
    answer:
      "Either we hand everything over to your team, or we stay on. Ongoing work usually covers bug fixes, small improvements, new features, and production incidents — billed as a monthly retainer or a block of hours, depending on how fast you expect to iterate. We'll recommend which one fits before you have to guess."
  },
  {
    question: "I'm not technical. Can you still help?",
    answer:
      "Yes. Most of our clients aren't developers — they're operators and domain experts. Our job is turning your business logic into product decisions, in plain language, so you always know what's being built and why. You bring the idea; we handle the engineering."
  },
  {
    question: "What happens after I reach out?",
    answer:
      "We reply within 24 hours — with real questions about your situation, and the clearest next step, not a canned response."
  }
];
