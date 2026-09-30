// /manual-to-system FAQ — secondary questions only. The primary objections
// (Zapier/n8n/ChatGPT comparisons, automating everything, what you
// receive) are answered directly on the page in AnsweredDirectly.tsx, not
// buried here — this list is what's left over (2026-10-01 commercial
// experience pass).
export const manualToSystemFAQs = [
  {
    question: "What counts as \"one bounded workflow\"?",
    answer:
      "One recurring chain of work with a clear trigger and outcome — lead to booking, inquiry to onboarding, order to fulfillment, that kind of thing — even if it touches a few tools or people. If it genuinely spans several departments or workflows that need to be redesigned together, we'll say so before you pay, not after.",
  },
  {
    question: "What if the answer is mostly \"keep doing this manually\"?",
    answer:
      "Then that's what the Plan says. We're not paid more for recommending more automation — the sprint costs the same $750 whether the plan is \"automate most of this\" or \"remove two steps and leave the rest.\"",
  },
  {
    question: "What if I'm not accepted as a standard fit?",
    answer:
      "We'll say so before asking you to pay anything, and tell you why — either a custom scope that fits your actual situation, or point you at Product Rescue or Idea-to-Build if one of those is actually the better fit.",
  },
  {
    question: "When does the 5-business-day clock actually start?",
    answer:
      "Once payment, a short intake form, and a walkthrough of the current workflow are all in place — not the moment you pay. If arranging that takes a few extra days, the clock waits for it.",
  },
  {
    question: "Do I need to document the workflow before applying?",
    answer:
      "No. A working call, a Loom walkthrough, or clear answers to our questions are enough to start. If you already have process documentation, it helps — but it's not a requirement to apply.",
  },
];
