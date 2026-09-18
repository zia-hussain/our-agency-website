// The Zumetrix Rescue-or-Rebuild decision model.
//
// Rule-based, not scored. Four dimensions, each answered honestly — including
// "I don't know" as a first-class answer — combine through an ordered,
// first-match-wins rule set into one of six named outcomes. Unknown answers
// on either health dimension route to AUDIT BEFORE DECIDING rather than
// guessing; a genuinely healthy system is allowed to conclude no rescue is
// needed at all. See /articles/should-you-rescue-or-rebuild-your-saas for the
// reasoning behind this shape, and /rescue-or-rebuild for the interactive tool
// that runs it.

export type StructuralIntegrity = "solid" | "fragile" | "broken" | "unknown";
export type OperationalControl = "solid" | "limited" | "absent" | "unknown";
export type BusinessReversibility = "high" | "moderate" | "low" | "unknown";
export type ProblemScope = "narrow" | "broad" | "whole-system" | "unknown";

export interface RescueAnswers {
  structuralIntegrity: StructuralIntegrity;
  operationalControl: OperationalControl;
  businessReversibility: BusinessReversibility;
  problemScope: ProblemScope;
}

export type OutcomeKey =
  | "audit-before-deciding"
  | "no-rebuild-signal"
  | "stabilize-first"
  | "partial-rebuild"
  | "full-rebuild"
  | "rescue-plausible";

export interface RescueQuestionOption<T extends string> {
  value: T;
  label: string;
}

export interface RescueQuestion<T extends string> {
  id: keyof RescueAnswers;
  dimension: string;
  prompt: string;
  helper: string;
  options: RescueQuestionOption<T>[];
}

export const RESCUE_QUESTIONS: [
  RescueQuestion<StructuralIntegrity>,
  RescueQuestion<OperationalControl>,
  RescueQuestion<BusinessReversibility>,
  RescueQuestion<ProblemScope>,
] = [
  {
    id: "structuralIntegrity",
    dimension: "Structural Integrity",
    prompt: "When you look at the foundation — architecture, data handling, security — what's the honest state?",
    helper: "Not \"is it perfect,\" but \"is it sound.\" Fragile means it works but touching it feels risky.",
    options: [
      { value: "solid", label: "It's solid. It was built carefully and holds up." },
      { value: "fragile", label: "It's fragile. It mostly works, but changes feel risky." },
      { value: "broken", label: "It's broken. There are real, known structural problems." },
      { value: "unknown", label: "I honestly don't know." },
    ],
  },
  {
    id: "operationalControl",
    dimension: "Operational Control",
    prompt: "Can someone safely change this system today — deploy it, test it, understand what it does?",
    helper: "This is about whether the system can be touched with confidence, not whether it's perfect.",
    options: [
      { value: "solid", label: "Yes. We (or someone) can change it with confidence." },
      { value: "limited", label: "Somewhat. Changes are possible but slow, risky, or under-documented." },
      { value: "absent", label: "No. Nobody can safely touch this right now." },
      { value: "unknown", label: "I honestly don't know." },
    ],
  },
  {
    id: "businessReversibility",
    dimension: "Business Reversibility",
    prompt: "How much room do you have to get this decision wrong?",
    helper: "This shapes urgency, not the underlying diagnosis — a healthy system doesn't become unhealthy because the stakes are high.",
    options: [
      { value: "high", label: "A lot. Early stage, no live users depending on this yet, runway to spare." },
      { value: "moderate", label: "Some. Real usage and real cost, but no immediate pressure." },
      { value: "low", label: "Very little. Live users, revenue, or runway are on the line right now." },
      { value: "unknown", label: "I'm not sure." },
    ],
  },
  {
    id: "problemScope",
    dimension: "Scope of the Problem",
    prompt: "Is the problem contained to one part of the system, or does it run through the whole thing?",
    helper: "\"Rebuild\" only makes sense as an answer if the problem is actually that wide.",
    options: [
      { value: "narrow", label: "One clear part — a specific feature, module, or capability." },
      { value: "broad", label: "Several parts, but not everything." },
      { value: "whole-system", label: "The whole system — it touches almost everything." },
      { value: "unknown", label: "I'm not sure yet." },
    ],
  },
];

const STRUCTURAL_SIGNAL: Record<StructuralIntegrity, string> = {
  solid: "You said the foundation — architecture, data handling, security — is solid.",
  fragile: "You said the foundation is fragile: it mostly works, but changes feel risky.",
  broken: "You said the foundation has real, known structural problems.",
  unknown: "You said you don't actually know the state of the foundation yet.",
};

const OPERATIONAL_SIGNAL: Record<OperationalControl, string> = {
  solid: "You said the system can be changed, deployed, and understood with confidence today.",
  limited: "You said changes are possible, but slow, risky, or under-documented.",
  absent: "You said nobody can currently make a safe change to this system.",
  unknown: "You said you don't actually know whether this system can be safely changed.",
};

const REVERSIBILITY_SIGNAL: Record<BusinessReversibility, string> = {
  high: "You said there's real room to get this wrong — early stage, no live dependency yet.",
  moderate: "You said there's real usage and cost riding on this, but no immediate pressure.",
  low: "You said live users, revenue, or runway are on the line right now.",
  unknown: "You said you're not sure how much room there is to get this wrong.",
};

const SCOPE_SIGNAL: Record<ProblemScope, string> = {
  narrow: "You said the problem is contained to one clear part of the system.",
  broad: "You said the problem touches several parts, but not everything.",
  "whole-system": "You said the problem runs through almost the entire system.",
  unknown: "You said it isn't clear yet how far the problem actually spreads.",
};

export interface ProfessionalReview {
  warranted: boolean;
  explanation: string;
}

export interface RescueResult {
  outcome: OutcomeKey;
  headline: string;
  yourRead: string;
  why: string;
  signalsThatMattered: string[];
  whatToCheckNext: string[];
  whatCouldChangeThis: string[];
  professionalReview: ProfessionalReview;
}

interface OutcomeCopy {
  headline: string;
  yourRead: string;
  why: string;
  whatToCheckNext: string[];
  whatCouldChangeThis: string[];
}

const OUTCOME_COPY: Record<OutcomeKey, OutcomeCopy> = {
  "audit-before-deciding": {
    headline: "Audit before deciding",
    yourRead:
      "You don't yet know enough about the foundation or your own ability to safely change it to make this call responsibly — and that's a completely normal place to be. Rescue and rebuild are both expensive words. Neither one should be chosen on a guess.",
    why:
      "The two dimensions that actually determine whether a system is fixable — structural integrity and operational control — are the ones a decision can't skip past. When either is genuinely unknown, every other answer becomes noise: a \"broken\" scope reading means something different on a solid foundation than a fragile one, and there's no way to tell which you're in without looking.",
    whatToCheckNext: [
      "Get a short, structured technical review — not a sales pitch, an honest read of what's actually there.",
      "Ask specifically: can this be safely changed today, and what would break if it were?",
      "Bring whatever documentation, access, or history exists, even if it's incomplete — partial information is still useful to a reviewer.",
    ],
    whatCouldChangeThis: [
      "A real audit turning up a solid foundation would likely move this toward \"no rebuild signal\" or \"stabilize first.\"",
      "A real audit turning up structural problems would move this toward \"rescue is plausible\" or further, depending on scope.",
    ],
  },
  "no-rebuild-signal": {
    headline: "No rebuild signal",
    yourRead:
      "Based on what you've described, this system doesn't show the signals that justify a rescue or rebuild engagement. That's a real answer, not a hedge — a solid foundation with the ability to safely change it is exactly what a healthy system looks like.",
    why:
      "Structural integrity and operational control are the two questions that actually predict whether a system needs intervention. When both come back healthy, there's no honest case for a rescue engagement — recommending one anyway would be solving a problem you don't have.",
    whatToCheckNext: [
      "If something still feels off, name the specific symptom rather than reaching for \"rebuild\" as the answer — a narrow, well-defined problem usually has a narrow, well-defined fix.",
      "Keep an eye on operational control specifically — teams change, documentation drifts, and \"solid\" today doesn't self-maintain.",
    ],
    whatCouldChangeThis: [
      "A specific, reproducible technical problem that isn't reflected in these answers would change the read — this tool is only as accurate as what went into it.",
      "A change in team, ownership, or access that weakens operational control would be worth re-checking against.",
    ],
  },
  "stabilize-first": {
    headline: "Stabilize first",
    yourRead:
      "The foundation itself sounds sound — this isn't a structural problem. What's missing is the ability to work on it safely: tests, documentation, or continuity that would let changes happen with confidence instead of risk.",
    why:
      "A solid foundation with limited or absent operational control is a process problem wearing the costume of a technical one. Rebuilding doesn't fix that — it just produces a second system with the same gap, on a longer timeline and a bigger bill.",
    whatToCheckNext: [
      "Prioritize the specific operational gaps: missing tests, missing documentation, or a single point of failure on who understands the system.",
      "Stabilize before adding new scope — new features on an under-documented system widen the same gap.",
      "Revisit this assessment after stabilization work closes the operational gap, not before.",
    ],
    whatCouldChangeThis: [
      "If stabilization work turns up structural problems that weren't visible from the outside, this would move toward \"rescue is plausible.\"",
      "If the operational gap turns out to be unrecoverable without significant rework, the picture would shift.",
    ],
  },
  "partial-rebuild": {
    headline: "Partial rebuild may be justified",
    yourRead:
      "The structural problems you described are real, but they're contained to one identifiable part of the system rather than running through all of it. That combination — genuine structural damage with a narrow blast radius — is usually where a targeted rebuild earns its cost, rather than a full one.",
    why:
      "A full rebuild is justified by how far a problem spreads, not just by how serious it is. When the damage is structural but scoped to a specific capability, rebuilding that one part while keeping the rest intact is normally the more defensible use of time and budget.",
    whatToCheckNext: [
      "Confirm the boundary — get specific about what's inside the broken part and what depends on it from outside.",
      "Check that the rest of the system doesn't share the same root cause under a different name.",
      "Scope the rebuild to that boundary deliberately, rather than letting it expand once work starts.",
    ],
    whatCouldChangeThis: [
      "If the \"contained\" problem turns out to touch shared infrastructure the rest of the system depends on, this could shift toward a fuller rebuild.",
      "If operational control is also absent, a partial rebuild is still likely the right shape, but it should be paired with the stabilization work from \"stabilize first.\"",
    ],
  },
  "full-rebuild": {
    headline: "Full rebuild requires strong evidence",
    yourRead:
      "What you've described — real structural problems, no safe way to change the system, and a problem that runs through nearly all of it — is the specific combination where a full rebuild is a defensible answer. It should still be treated as the expensive, high-conviction decision it is, not a default.",
    why:
      "A full rebuild is rarely the right first answer, because it's rarely necessary — most systems that feel broken are actually narrower or more operationally-fixable than they look from the inside. This outcome only appears when structural damage, lost operational control, and whole-system scope are all present together.",
    whatToCheckNext: [
      "Get an independent technical opinion before committing — this is the highest-cost decision in the model, and it deserves a second read.",
      "Ask explicitly whether any part of the current system is salvageable, even under a rebuild — full rarely means from zero.",
      "Have a clear answer for what happens to current users or data during the transition before starting.",
    ],
    whatCouldChangeThis: [
      "If an independent review finds the problem is actually narrower than it appears from inside the business, this could move toward a partial rebuild instead.",
      "If operational control can be restored faster than expected, stabilizing first may still be viable even with structural damage present.",
    ],
  },
  "rescue-plausible": {
    headline: "Rescue is plausible",
    yourRead:
      "What you've described doesn't cleanly match \"you're fine,\" \"stabilize what's there,\" or \"this needs a full rebuild\" — it sits in the middle ground where a rescue engagement (assess, then fix what's actually wrong) is the more honest starting point than committing to either extreme.",
    why:
      "This is the default read when the signals are mixed — a foundation that's fragile rather than clearly solid or clearly broken, a scope that isn't fully pinned down, or a combination that doesn't match one of the more specific outcomes. Mixed signals call for an assessment before a decision, not a decision before an assessment.",
    whatToCheckNext: [
      "Start with a structured technical assessment rather than committing to a rebuild budget up front.",
      "Ask the assessment to produce a specific finding: which parts are structurally sound, which aren't, and how far the damage actually spreads.",
      "Let that finding — not the original impression — determine whether the next step is stabilization, a partial rebuild, or something narrower still.",
    ],
    whatCouldChangeThis: [
      "A clearer picture of scope (narrow vs. whole-system) would likely move this toward a more specific outcome.",
      "A clearer picture of structural integrity (solid vs. broken, rather than fragile) would do the same.",
    ],
  },
};

function buildProfessionalReview(outcome: OutcomeKey, reversibility: BusinessReversibility): ProfessionalReview {
  switch (outcome) {
    case "no-rebuild-signal":
      return reversibility === "low"
        ? {
            warranted: false,
            explanation:
              "Not warranted based on what you've described. Given how much is riding on this system right now, a lightweight second opinion could still be reassuring — but the signals here don't call for a rescue or rebuild engagement.",
          }
        : {
            warranted: false,
            explanation:
              "Not warranted. A rescue or rebuild engagement isn't indicated by what you've described, and we'd tell you that directly rather than manufacture a reason to engage.",
          };
    case "audit-before-deciding":
      return {
        warranted: true,
        explanation:
          "Warranted, specifically as a diagnostic step. The goal isn't to sell a rescue — it's to replace \"I don't know\" with an actual answer before any money moves.",
      };
    case "stabilize-first":
      return reversibility === "low"
        ? {
            warranted: true,
            explanation:
              "Warranted soon. The foundation sounds fine, but with live stakes riding on a system nobody can safely change, closing that operational gap deserves outside eyes rather than being handled informally.",
          }
        : {
            warranted: false,
            explanation:
              "Not urgent. This is an internal process gap more than a technical emergency — a lightweight review is worth having before you scale the team or the system further, but there's no immediate pressure.",
          };
    case "partial-rebuild":
    case "full-rebuild":
    case "rescue-plausible":
      return {
        warranted: true,
        explanation:
          "Warranted. The signals here point to real, specific work — the right next step is an assessment that turns this general read into a concrete plan.",
      };
  }
}

export function evaluateRescueOrRebuild(answers: RescueAnswers): RescueResult {
  const { structuralIntegrity, operationalControl, businessReversibility, problemScope } = answers;

  let outcome: OutcomeKey;

  if (structuralIntegrity === "unknown" || operationalControl === "unknown") {
    outcome = "audit-before-deciding";
  } else if (structuralIntegrity === "solid" && operationalControl === "solid") {
    outcome = "no-rebuild-signal";
  } else if (structuralIntegrity === "solid" && (operationalControl === "limited" || operationalControl === "absent")) {
    outcome = "stabilize-first";
  } else if (structuralIntegrity === "broken" && problemScope === "narrow") {
    outcome = "partial-rebuild";
  } else if (structuralIntegrity === "broken" && operationalControl === "absent" && problemScope === "whole-system") {
    outcome = "full-rebuild";
  } else {
    outcome = "rescue-plausible";
  }

  const copy = OUTCOME_COPY[outcome];

  const allSignals = [
    STRUCTURAL_SIGNAL[structuralIntegrity],
    OPERATIONAL_SIGNAL[operationalControl],
    SCOPE_SIGNAL[problemScope],
    REVERSIBILITY_SIGNAL[businessReversibility],
  ];

  // Lead with the dimensions each rule actually keyed off, so "signals that
  // mattered" reflects the real decision path rather than a fixed order.
  const primaryByOutcome: Record<OutcomeKey, number[]> = {
    "audit-before-deciding": [0, 1],
    "no-rebuild-signal": [0, 1],
    "stabilize-first": [0, 1],
    "partial-rebuild": [0, 2],
    "full-rebuild": [0, 1, 2],
    "rescue-plausible": [0, 2],
  };
  const primaryIdx = primaryByOutcome[outcome];
  const signalsThatMattered = [
    ...primaryIdx.map((i) => allSignals[i]),
    ...allSignals.filter((_, i) => !primaryIdx.includes(i)),
  ];

  return {
    outcome,
    headline: copy.headline,
    yourRead: copy.yourRead,
    why: copy.why,
    signalsThatMattered,
    whatToCheckNext: copy.whatToCheckNext,
    whatCouldChangeThis: copy.whatCouldChangeThis,
    professionalReview: buildProfessionalReview(outcome, businessReversibility),
  };
}
