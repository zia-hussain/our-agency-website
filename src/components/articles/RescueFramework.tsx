import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedSection from "../common/AnimatedSection";
import SectionEyebrow from "../common/SectionEyebrow";
import {
  DECIDING_COLUMNS,
  FRAMEWORK_QUESTIONS,
  FRAMEWORK_RULES,
  formatValues,
  type FrameworkRule,
} from "../../data/rescueFrameworkTable";

// One decision instrument: inputs -> ordered rules -> first match -> outcome.
//
// The three questions that select an outcome are the table's columns, so they
// are named once, as column headers. The fourth, Business Reversibility, never
// selects a row — it sets the stakes (see buildProfessionalReview in
// src/data/rescueOrRebuildModel.ts) — so it stands apart, beside the title.
// Rows come from src/data/rescueFrameworkTable.ts, which is checked against
// evaluateRescueOrRebuild() so the page cannot drift from the tool.

type Column = 0 | 1 | 2;

interface Cell {
  col: Column;
  span: 1 | 2 | 3;
  label: string;
  value: string;
}

const columnOf = (key: string): Column => DECIDING_COLUMNS.findIndex((c) => c.key === key) as Column;
const labelOf = (key: string) => DECIDING_COLUMNS.find((c) => c.key === key)?.short ?? key;

const cellsFor = (rule: FrameworkRule): Cell[] => {
  if (rule.fallthrough) return [{ col: 0, span: 3, label: "Otherwise", value: "Nothing above matches" }];
  if (rule.anyUnknown) {
    const cols = rule.anyUnknown.map(columnOf).sort();
    return [
      {
        col: cols[0],
        span: (cols[cols.length - 1] - cols[0] + 1) as 1 | 2 | 3,
        label: rule.anyUnknown.map(labelOf).join(" or "),
        value: rule.anyUnknown.length === 2 ? "Either is unknown" : "Any is unknown",
      },
    ];
  }
  return (rule.all ?? []).map((c) => ({ col: columnOf(c.key), span: 1, label: labelOf(c.key), value: formatValues(c.values) }));
};

// Literal class names so Tailwind can see them.
const COL_START: Record<Column, string> = { 0: "md:col-start-2", 1: "md:col-start-3", 2: "md:col-start-4" };
const COL_SPAN: Record<1 | 2 | 3, string> = { 1: "md:col-span-1", 2: "md:col-span-2", 3: "md:col-span-3" };
const DESKTOP_GRID = "md:grid-cols-[2rem_repeat(3,minmax(0,8.75rem))_1.25rem_minmax(0,1fr)] md:gap-x-4 md:px-6";

// Below md each condition is a self-describing chip under an "If"; from md up the
// same cells align under the column headers.
const renderCells = (rule: FrameworkRule) => {
  const conditions = cellsFor(rule);
  const cells: React.ReactNode[] = [];
  let col = 0;
  while (col < 3) {
    const condition = conditions.find((c) => c.col === col);
    if (condition) {
      const span = condition.span;
      cells.push(
        <span
          key={`${condition.label}-${col}`}
          className={`inline-flex flex-wrap items-baseline gap-x-1.5 rounded-lg border border-border/50 bg-card/30 px-2.5 py-1 text-xs leading-snug md:text-[13px] ${
            span > 1
              ? "md:justify-center md:border-border/40 md:bg-card/25 md:text-center"
              : "md:rounded-none md:border-0 md:bg-transparent md:p-0"
          } ${COL_START[condition.col]} ${COL_SPAN[span]}`}
        >
          <span className="text-muted-foreground md:sr-only">{condition.label}</span>
          <span className="font-medium text-foreground">{condition.value}</span>
        </span>,
      );
      col += span;
    } else {
      cells.push(
        <span
          key={`empty-${col}`}
          aria-hidden="true"
          className={`hidden text-muted-foreground/30 md:block ${COL_START[col as Column]}`}
        >
          —
        </span>,
      );
      col += 1;
    }
  }
  return cells;
};

const stakes = FRAMEWORK_QUESTIONS.find((q) => q.role === "stakes")!;
const inputs = FRAMEWORK_QUESTIONS.filter((q) => q.role === "decides");

const RescueFramework: React.FC = () => (
  <div className="mx-auto my-14 max-w-[960px] sm:my-16">
    <AnimatedSection className="grid gap-7 md:grid-cols-[minmax(0,1fr)_21rem] md:items-start md:gap-10">
      <div>
        <SectionEyebrow className="mb-5">Zumetrix rescue-or-rebuild framework</SectionEyebrow>
        <h2 className="text-3xl font-bold leading-tight tracking-tight text-foreground">
          Four questions. Six possible outcomes.
        </h2>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          Answer honestly — <span className="text-foreground">Unknown</span> means &ldquo;I don&rsquo;t know,&rdquo; and it&rsquo;s a valid answer.
        </p>
      </div>

      <aside className="rounded-xl border border-border/50 bg-card/10 p-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">Sets the stakes</p>
        <p className="mt-1.5 text-base font-semibold tracking-tight text-foreground">{stakes.name}</p>
        <p className="mt-0.5 text-sm leading-snug text-muted-foreground">
          {stakes.ask} <span className="text-muted-foreground/60">{stakes.states}</span>
        </p>
        <p className="mt-2.5 border-t border-border/40 pt-2.5 text-[13px] leading-snug text-muted-foreground">
          <span className="font-semibold text-foreground">Never selects a row.</span> Sets how urgently to act, and whether a
          second opinion is worth having.
        </p>
      </aside>
    </AnimatedSection>

    <AnimatedSection delay={0.06} className="mt-8">
      <div className="overflow-hidden rounded-2xl border border-border/50 bg-card/10">
        <p className="flex flex-wrap items-center gap-x-2.5 gap-y-1 border-b border-border/40 bg-card/[0.12] px-5 py-3 text-xs font-medium text-foreground md:px-6 md:text-[13px]">
          <span className="inline-flex items-center gap-2.5 whitespace-nowrap">
            Answer the questions
            <ArrowRight size={13} aria-hidden="true" className="text-primary/70" />
          </span>
          <span className="inline-flex items-center gap-2.5 whitespace-nowrap">
            Rules run top to bottom
            <ArrowRight size={13} aria-hidden="true" className="text-primary/70" />
          </span>
          <span>The first match is your outcome</span>
        </p>

        <div className={`flex flex-col gap-3 border-b border-border/40 px-5 py-4 md:grid md:items-start md:gap-y-0 md:py-3 ${DESKTOP_GRID}`}>
          <span aria-hidden="true" className="hidden md:block" />
          {inputs.map((q) => (
            <div key={q.name} className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 md:block">
              <p className="text-[13px] font-semibold leading-snug text-foreground">{q.name}</p>
              <p className="text-xs leading-snug text-muted-foreground/70 md:mt-1">{q.states}</p>
            </div>
          ))}
          <span aria-hidden="true" className="hidden md:block" />
          <p className="hidden text-[13px] font-semibold leading-snug text-foreground md:block">Outcome</p>
        </div>

        <ol className="divide-y divide-border/40">
          {FRAMEWORK_RULES.map((rule, index) => (
            <li
              key={rule.outcome}
              className={`relative grid grid-cols-[2.25rem_minmax(0,1fr)] gap-x-4 gap-y-2 px-5 py-4 transition-colors duration-150 hover:bg-card/20 md:items-center md:py-3 ${DESKTOP_GRID} ${
                rule.fallthrough ? "bg-card/[0.12]" : ""
              }`}
            >
              {index > 0 && (
                <span aria-hidden="true" className="absolute left-[2.375rem] top-0 h-4 w-px bg-border/60 md:left-10 md:h-[calc(50%-1rem)]" />
              )}
              {index < FRAMEWORK_RULES.length - 1 && (
                <span aria-hidden="true" className="absolute bottom-0 left-[2.375rem] top-[3.25rem] w-px bg-border/60 md:left-10 md:top-auto md:h-[calc(50%-1rem)]" />
              )}

              <span
                className={`relative flex h-9 w-9 items-center justify-center self-start rounded-xl border bg-background text-sm font-semibold tabular-nums text-primary md:h-8 md:w-8 md:self-center ${
                  rule.fallthrough ? "border-dashed border-border/70" : "border-border/60"
                }`}
              >
                {index + 1}
              </span>

              <div className="col-start-2 flex flex-wrap items-center gap-1.5 md:contents">
                <span className="mr-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/70 md:hidden">
                  If
                </span>
                {renderCells(rule)}
              </div>

              <ArrowRight size={15} aria-hidden="true" className="hidden text-muted-foreground/40 md:col-start-5 md:block" />

              <div className="col-start-2 min-w-0 md:col-start-6">
                <p className="flex items-center gap-2 text-base font-semibold tracking-tight text-foreground">
                  <ArrowRight size={14} aria-hidden="true" className="flex-shrink-0 text-primary/70 md:hidden" />
                  {rule.title}
                </p>
                <p className="mt-0.5 text-sm leading-snug text-muted-foreground">{rule.why}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="flex flex-col gap-1.5 border-t border-border/40 bg-card/[0.15] px-5 py-3 text-[13px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between md:px-6">
          <p>Rule-based, not scored — no weights, no blended percentage.</p>
          <Link
            to="/rescue-or-rebuild"
            className="shrink-0 text-xs font-medium tracking-wide text-muted-foreground/70 transition-colors duration-150 hover:text-primary"
          >
            zumetrix.com/rescue-or-rebuild
          </Link>
        </div>
      </div>
    </AnimatedSection>
  </div>
);

export default RescueFramework;
