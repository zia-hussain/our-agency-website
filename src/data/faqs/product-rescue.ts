// /product-rescue FAQ — questions specific to the paid assessment product
// (price, boundary, what happens if it's not a fit). Deliberately different
// questions from rescueDetailFAQs on the broader service page: that page
// answers "what does a rescue/stabilization engagement involve," this one
// answers "what am I actually buying for $750." Different search intent,
// different content — see audit Section 15/19.
export const productRescueFAQs = [
  {
    question: "How is this different from the free Rescue-or-Rebuild tool?",
    answer:
      "The free tool is a directional self-assessment — four questions about your situation, answered by you, with no access to the actual product. This is a real investigation: we look at the product and the evidence itself and produce a bounded decision brief. Already used the free tool? This goes further — real evidence, not just directional answers.",
  },
  {
    question: "What if the assessment says my product is actually fine?",
    answer:
      "Then that's what the brief says. Rebuilding is the conclusion we might reach, not the pitch we start with — if the evidence says most of what you have should stay, we say that plainly, and you've still gotten a clear answer for $750 instead of guessing.",
  },
  {
    question: "What if you conclude it actually needs replacing?",
    answer:
      "Then we name that plainly too, with the specific evidence behind it — and it's still your decision what happens next. We don't win anything extra by recommending more work: the Rescue Brief costs the same $750 whether the answer is \"mostly keep it\" or \"this piece needs to go.\" We're not scoring incentives either way.",
  },
  {
    question: "What counts as \"one bounded product\"?",
    answer:
      "One software product with one primary decision behind it — even if it has a frontend, a backend, and a few integrations. If your situation genuinely spans multiple independent products or a much larger surface than that, we'll tell you it needs a custom scope before you pay anything, not after.",
  },
  {
    question: "Do I have to hire Zumetrix to implement the findings?",
    answer:
      "No. The Rescue Brief is yours. Use your existing team, bring in another company, or ask us — all three are normal outcomes, and the assessment is priced and built to be useful on its own regardless of which one you pick.",
  },
  {
    question: "What if I'm not accepted as a standard fit?",
    answer:
      "We'll say so before asking you to pay anything, and tell you why — either a custom scope that fits your actual situation, or a more useful next step if a bounded assessment genuinely isn't the right tool yet.",
  },
  {
    question: "When does the 5-business-day clock actually start?",
    answer:
      "Once payment, a short intake form, and access to the product (or the evidence needed to assess it) are all in place — not the moment you pay. If access takes a few extra days to arrange, the clock waits for it.",
  },
  {
    question: "What if I can't provide direct access to the product?",
    answer:
      "Tell us what's available before you pay. Read-only access is ideal, but a serious assessment can sometimes work from documentation, recordings, and direct answers to specific questions — we'll tell you honestly if what's available isn't enough to responsibly assess the decision.",
  },
];
