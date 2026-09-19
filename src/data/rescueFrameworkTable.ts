import type { OutcomeKey, RescueAnswers } from "./rescueOrRebuildModel";

// The article's picture of the rescue-or-rebuild decision, as data.
//
// Each rule is expressed as structured conditions (not display strings) so it
// can be checked against evaluateRescueOrRebuild() in rescueOrRebuildModel.ts —
// the labels shown on the page are derived from these conditions. The rule
// order is the evaluation order: the first rule that matches is the outcome.
// If the model's rules ever change, this table has to change with them.

export type DecidingKey = "structuralIntegrity" | "operationalControl" | "problemScope";

export interface RuleCondition {
  key: DecidingKey;
  values: string[];
}

export interface FrameworkRule {
  outcome: OutcomeKey;
  title: string;
  why: string;
  /** Every condition must hold. */
  all?: RuleCondition[];
  /** Matches when any of these dimensions is answered "unknown". */
  anyUnknown?: DecidingKey[];
  /** The last rule: matches whatever the rules above did not. */
  fallthrough?: boolean;
}

export interface FrameworkQuestion {
  name: string;
  ask: string;
  states: string;
  role: "decides" | "stakes";
}

// Column order in the table.
export const DECIDING_COLUMNS: { key: DecidingKey; label: string; short: string }[] = [
  { key: "structuralIntegrity", label: "Structural Integrity", short: "Structure" },
  { key: "operationalControl", label: "Operational Control", short: "Control" },
  { key: "problemScope", label: "Scope of the Problem", short: "Scope" },
];

export const FRAMEWORK_QUESTIONS: FrameworkQuestion[] = [
  {
    name: "Structural Integrity",
    ask: "Can the foundation hold more weight, or is it failing now?",
    states: "Solid · Fragile · Broken · Unknown",
    role: "decides",
  },
  {
    name: "Operational Control",
    ask: "Can anyone safely change this system today?",
    states: "Solid · Limited · Absent · Unknown",
    role: "decides",
  },
  {
    name: "Business Reversibility",
    ask: "How much room is there to get this decision wrong?",
    states: "High · Moderate · Low · Unknown",
    role: "stakes",
  },
  {
    name: "Scope of the Problem",
    ask: "One capability, or the whole system?",
    states: "Narrow · Broad · Whole system · Unknown",
    role: "decides",
  },
];

export const FRAMEWORK_RULES: FrameworkRule[] = [
  {
    outcome: "audit-before-deciding",
    title: "Audit before deciding",
    why: "Guessing is worse than admitting you don't know yet. Get an honest technical read first.",
    anyUnknown: ["structuralIntegrity", "operationalControl"],
  },
  {
    outcome: "no-rebuild-signal",
    title: "No rebuild signal",
    why: "A real outcome, not a fallback. Sound foundation, safe to change — at most a targeted fix.",
    all: [
      { key: "structuralIntegrity", values: ["solid"] },
      { key: "operationalControl", values: ["solid"] },
    ],
  },
  {
    outcome: "stabilize-first",
    title: "Stabilize first",
    why: "The foundation holds. What's missing is the ability to change it safely — tests, docs, continuity.",
    all: [
      { key: "structuralIntegrity", values: ["solid"] },
      { key: "operationalControl", values: ["limited", "absent"] },
    ],
  },
  {
    outcome: "partial-rebuild",
    title: "Partial rebuild may be justified",
    why: "Real structural damage, but contained. That piece may earn a rebuild; the product doesn't have to.",
    all: [
      { key: "structuralIntegrity", values: ["broken"] },
      { key: "problemScope", values: ["narrow"] },
    ],
  },
  {
    outcome: "full-rebuild",
    title: "Full rebuild requires strong evidence",
    why: "The costliest outcome. Get an independent second read before committing.",
    all: [
      { key: "structuralIntegrity", values: ["broken"] },
      { key: "operationalControl", values: ["absent"] },
      { key: "problemScope", values: ["whole-system"] },
    ],
  },
  {
    outcome: "rescue-plausible",
    title: "Rescue is plausible",
    why: "Mixed or unclear signals — a fragile foundation, say. Assess first, then decide what needs fixing.",
    fallthrough: true,
  },
];

const VALUE_LABELS: Record<string, string> = {
  solid: "Solid",
  fragile: "Fragile",
  broken: "Broken",
  limited: "Limited",
  absent: "Absent",
  narrow: "Narrow",
  broad: "Broad",
  "whole-system": "Whole system",
  unknown: "Unknown",
};

export const formatValues = (values: string[]): string => {
  const words = values.map((v) => VALUE_LABELS[v] ?? v);
  return words.length > 1 ? [words[0], ...words.slice(1).map((w) => w.toLowerCase())].join(" or ") : words[0];
};

// First-match evaluation over the table itself — used to check the table
// against the model, not by the page.
export const outcomeFromTable = (answers: RescueAnswers): OutcomeKey => {
  for (const rule of FRAMEWORK_RULES) {
    if (rule.fallthrough) return rule.outcome;
    if (rule.anyUnknown?.some((key) => answers[key] === "unknown")) return rule.outcome;
    if (rule.all?.every((c) => c.values.includes(answers[c.key]))) return rule.outcome;
  }
  throw new Error("Framework table has no fallthrough rule");
};
