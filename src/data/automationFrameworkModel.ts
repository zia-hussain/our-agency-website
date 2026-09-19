// The article's picture of how to reason about the system a workflow needs.
//
// This is a QUALITATIVE framework, not an algorithm and not a score. Nothing
// here weighs, ranks or computes. It says which question is asked at which part
// of a workflow's shape; the answers come from people who know the workflow.
//
// The three questions come straight from the article's own checklist:
//   - can anyone say what "correct" looks like        -> readiness (a gate)
//   - can the right output be written as a rule       -> the engine
//   - what does a wrong output cost, would anyone see -> the checkpoint
// Readiness is upstream of everything: when it fails, the conclusion is "not
// yet" (map the workflow first) — a readiness state, not a fourth engine. Human
// review is a checkpoint that can follow EITHER engine (rules or AI); it is not
// a third kind of engine. That is why this is three questions, not a four-cell
// matrix.

export type Engine = "rules" | "ai";
export type Checkpoint = "none" | "person";

export interface FrameworkAnswers {
  /** Can anyone say what a correct result looks like? */
  settled: boolean;
  engine: Engine;
  checkpoint: Checkpoint;
}

export type StepKey = "rules" | "ai" | "person" | "action";
export type SystemShapeKey = "rules" | "rules-checked" | "ai" | "ai-checked";
/** A system shape, or the readiness conclusion (which is not a system at all). */
export type ShapeKey = SystemShapeKey | "not-yet";

export interface SystemShape {
  key: SystemShapeKey;
  name: string;
  steps: StepKey[];
}

// The four systems the engine and checkpoint answers can produce.
export const SHAPES: SystemShape[] = [
  { key: "rules", name: "Deterministic automation", steps: ["rules", "action"] },
  { key: "rules-checked", name: "Rules, then a person confirms", steps: ["rules", "person", "action"] },
  { key: "ai", name: "AI-assisted workflow", steps: ["ai", "action"] },
  { key: "ai-checked", name: "AI prepares, a person decides", steps: ["ai", "person", "action"] },
];

export const GATE = {
  label: "Readiness",
  question: "Can anyone say what a correct result looks like?",
  no: {
    title: "No — not yet",
    body: "Map the workflow first. An engine can only be checked against a definition of “right” that exists.",
  },
  yes: { title: "Yes — then the system" },
};

export interface SlotFill {
  key: string;
  title: string;
  body: string;
}

export interface Slot {
  label: string;
  /** The term the article and the site already use for this slot. */
  aka?: string;
  question: string;
  fills: [SlotFill, SlotFill];
}

export const ENGINE_SLOT: Slot = {
  label: "Engine",
  question: "Can the right output be written as a rule over the inputs you’ll really get?",
  fills: [
    { key: "rules", title: "Yes → rules", body: "Same input, same output. A webhook, script or no-code flow can do it, and you can test it against the rule." },
    { key: "ai", title: "No → AI", body: "The input is unstructured or the task takes interpretation — summarizing, classifying, drafting — and someone can still tell a good output from a bad one." },
  ],
};

export const CHECKPOINT_SLOT: Slot = {
  label: "Checkpoint",
  aka: "human-in-the-loop",
  question: "What does a wrong output cost — and would anyone notice?",
  fills: [
    { key: "none", title: "Low stakes → no checkpoint", body: "A wrong output is cheap, easy to undo and easy to notice." },
    { key: "person", title: "High stakes → a person confirms", body: "A wrong output is costly, hard to undo, or could pass unnoticed — money moving, an account changing, a message sent in your name." },
  ],
};

export const FRAMEWORK_NOTE =
  "Qualitative, not scored. It doesn’t weigh build cost, volume or data constraints — those can change the answer on their own.";

// Composition of the three answers into a conclusion. Used to check that every
// combination of answers lands on exactly one conclusion; the page does not run it.
export const shapeFor = (a: FrameworkAnswers): ShapeKey => {
  if (!a.settled) return "not-yet";
  if (a.engine === "rules") return a.checkpoint === "person" ? "rules-checked" : "rules";
  return a.checkpoint === "person" ? "ai-checked" : "ai";
};
