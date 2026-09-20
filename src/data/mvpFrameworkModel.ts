// The build article's picture of how a first version gets decided.
//
// QUALITATIVE, like the other two article frameworks: nothing here scores or
// computes anything. It names the three states an idea can be in and the two
// questions that move an idea between them. The claim it carries is a judgment
// about sequencing, not a measured rule.
//
// The states use the same convention as the Decision Room graphic: solid is
// shipped, dashed is planned. Ideas move Later -> Designed -> Built, one gate
// at a time, and only Built costs build time.

export type StateKey = "later" | "designed" | "built";

export interface FrameworkState {
  key: StateKey;
  label: string;
  meaning: string;
  cost: string;
}

export interface FrameworkGate {
  question: string;
  basis: string;
}

export const PRECONDITION = "Before any of this: evidence that the problem is real.";

export const STATES: FrameworkState[] = [
  {
    key: "later",
    label: "Later, not yet justified",
    meaning: "Named so it isn't lost. No design, no code.",
    cost: "A line on a list.",
  },
  {
    key: "designed",
    label: "Designed, not built",
    meaning: "Thought through and written down. Not shipped.",
    cost: "Thinking, not build time.",
  },
  {
    key: "built",
    label: "Built",
    meaning: "In this release, and part of the smallest loop that can show you something.",
    cost: "Build time.",
  },
];

// Gate i sits between STATES[i] and STATES[i + 1].
export const GATES: FrameworkGate[] = [
  { question: "Would being wrong here be expensive to fix later?", basis: "Judgment" },
  { question: "Did something you observed after shipping make this the next thing to build?", basis: "Evidence" },
];

export const LOOP_NOTE = "Ship. Observe. Run the gates again — the evidence you gather decides what moves.";
export const FRAMEWORK_NOTE = "Qualitative, not scored. A way to sort a decision, not a formula.";
