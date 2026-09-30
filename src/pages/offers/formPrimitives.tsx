import { useEffect, useRef } from "react";
import { CheckCircle2, Circle } from "lucide-react";

// Shared low-level application-form building blocks for the BUILD/AUTOMATE
// offers (Idea-to-Build, Manual-to-System) — the exact same techniques
// Product Rescue's ApplyPage.tsx already proved (auto-growing textarea,
// selectable-card choice list), pulled out here so the two new offers don't
// each hand-roll their own copy. Product Rescue's own ApplyPage.tsx keeps
// its local versions of these exactly as they are — it is frozen, and
// nothing about that file changes because this file now exists
// (2026-09-30 BUILD/AUTOMATE expansion).
export const inputBase =
  "w-full bg-transparent border-0 border-b-2 border-primary/20 pb-3 text-foreground text-xl sm:text-2xl font-light placeholder:text-muted-foreground/25 focus:outline-none focus:border-primary/60 transition-colors duration-300 leading-relaxed";
export const textareaBase = `${inputBase} text-lg sm:text-xl resize-none`;

export function AutoTextarea({
  autoFocus,
  value,
  onChange,
  placeholder,
  rows = 4,
}: {
  autoFocus?: boolean;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  rows?: number;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = "auto";
      ref.current.style.height = `${ref.current.scrollHeight}px`;
    }
  }, [value]);
  return (
    <textarea
      ref={ref}
      autoFocus={autoFocus}
      className={textareaBase}
      rows={rows}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{ minHeight: `${rows * 1.8}rem` }}
    />
  );
}

export function ChoiceButtons({
  options,
  value,
  onSelect,
}: {
  options: { value: string; label: string }[];
  value: string;
  onSelect: (v: string) => void;
}) {
  return (
    <div className="space-y-3">
      {options.map((option) => {
        const isSelected = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onSelect(option.value)}
            className={`w-full text-left flex items-start gap-3 rounded-2xl border px-5 py-4 transition-all duration-200 ${
              isSelected ? "border-primary/60 bg-primary/[0.06]" : "border-border/60 bg-card/10 hover:border-primary/30 hover:bg-card/20"
            }`}
          >
            {isSelected ? (
              <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-primary" />
            ) : (
              <Circle size={18} className="mt-0.5 shrink-0 text-muted-foreground/40" />
            )}
            <span className="text-[15px] leading-snug text-foreground">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
