import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Play, X } from "lucide-react";

// Miniature product scenes for the navigation stage. Nothing here is a
// screenshot of a client's product — every scene is schematic (no names,
// no numbers that could be read as a record), drawn in the site's own
// materials: near-black glass, hairlines, one copper. Each one moves a
// little, forever, so the stage is alive without ever shouting.

export type VignetteKind =
  | "dashboard"
  | "saas"
  | "mobile"
  | "automation"
  | "rescue"
  | "gallery"
  | "decision"
  | "notes"
  | "film"
  | "timeline";

const COPPER = "#C48A64";

const Frame: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <div
    className={`relative h-full w-full overflow-hidden ${className}`}
    style={{
      background:
        "radial-gradient(120% 90% at 12% 0%, rgba(196,138,100,0.16) 0%, rgba(196,138,100,0) 55%), linear-gradient(180deg, #131110 0%, #0B0A09 100%)",
    }}
  >
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-[0.06]"
      style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
        maskImage: "radial-gradient(80% 80% at 50% 40%, #000 30%, transparent 100%)",
      }}
    />
    {/* The kicker chip lives in the bottom 56px of the stage, so the scene
        centres in the band above it and never collides with the label. */}
    <div className="absolute inset-x-0 bottom-14 top-0 flex items-center justify-center px-8 pt-6">{children}</div>
  </div>
);

const Window: React.FC<{ children: React.ReactNode; className?: string; style?: React.CSSProperties }> = ({ children, className = "", style }) => (
  <div
    className={`rounded-xl border border-white/[0.09] bg-[#15120F]/95 shadow-[0_30px_60px_-24px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.05)] ${className}`}
    style={style}
  >
    <div className="flex items-center gap-1.5 border-b border-white/[0.06] px-3 py-2">
      <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
      <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
      <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
      <span className="ml-2 h-1.5 w-16 rounded-full bg-white/[0.07]" />
    </div>
    {children}
  </div>
);

const Line: React.FC<{ w: string; className?: string }> = ({ w, className = "" }) => (
  <span className={`block h-1.5 rounded-full bg-white/[0.08] ${className}`} style={{ width: w }} />
);

/* ---- scenes ---- */

const Dashboard: React.FC<{ still: boolean }> = ({ still }) => (
  <Window className="w-[72%]">
    <div className="grid grid-cols-[52px_1fr] gap-3 p-3">
      <div className="flex flex-col gap-2 pt-1">
        <span className="h-1.5 w-8 rounded-full bg-primary/70" />
        <Line w="80%" /> <Line w="65%" /> <Line w="70%" /> <Line w="55%" />
      </div>
      <div className="flex flex-col gap-2.5">
        <div className="grid grid-cols-3 gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-md border border-white/[0.06] bg-white/[0.02] p-2">
              <Line w="50%" />
              <span className="mt-1.5 block h-2.5 w-10 rounded-sm bg-white/[0.14]" />
            </div>
          ))}
        </div>
        <div className="relative h-[72px] rounded-md border border-white/[0.06] bg-white/[0.02] p-2">
          <svg viewBox="0 0 240 56" className="h-full w-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="nv-area" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor={COPPER} stopOpacity="0.28" />
                <stop offset="1" stopColor={COPPER} stopOpacity="0" />
              </linearGradient>
            </defs>
            <motion.path
              d="M0 44 C 30 40, 45 30, 70 32 S 110 20, 140 22 S 190 12, 240 6 L240 56 L0 56 Z"
              fill="url(#nv-area)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.6 }}
            />
            <motion.path
              d="M0 44 C 30 40, 45 30, 70 32 S 110 20, 140 22 S 190 12, 240 6"
              fill="none"
              stroke={COPPER}
              strokeWidth="1.6"
              strokeLinecap="round"
              initial={{ pathLength: still ? 1 : 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.6, ease: "easeInOut", repeat: still ? 0 : Infinity, repeatDelay: 2.4 }}
            />
          </svg>
        </div>
      </div>
    </div>
  </Window>
);

const Saas: React.FC<{ still: boolean }> = ({ still }) => (
  <div className="relative h-[70%] w-[62%]">
    <motion.div
      animate={still ? undefined : { y: [0, -4, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      className="absolute left-0 top-2 w-[78%] rounded-xl border border-white/[0.08] bg-[#15120F]/90 p-3 shadow-[0_30px_60px_-24px_rgba(0,0,0,0.8)]"
    >
      <div className="flex items-center justify-between">
        <Line w="34%" />
        <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-[0.12em] text-emerald-300">Paid</span>
      </div>
      <div className="mt-3 flex items-center gap-2">
        <span className="h-5 w-8 rounded-sm bg-white/[0.12]" />
        <span className="font-mono text-[9px] tracking-[0.2em] text-white/40">•••• •••• •••• 4242</span>
      </div>
      <Line w="55%" className="mt-3" />
    </motion.div>
    <motion.div
      animate={still ? undefined : { y: [0, 4, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
      className="absolute bottom-0 right-0 w-[70%] rounded-xl border border-primary/25 bg-[#17130F] p-3.5 shadow-[0_30px_60px_-20px_rgba(196,138,100,0.35)]"
    >
      <span className="block h-2 w-14 rounded-sm bg-white/[0.16]" />
      <span className="mt-3 block h-6 rounded-md border border-white/[0.08] bg-white/[0.03]" />
      <span className="mt-2 block h-6 rounded-md border border-white/[0.08] bg-white/[0.03]" />
      <span className="mt-3 block h-6 rounded-md bg-primary" />
    </motion.div>
  </div>
);

const Mobile: React.FC<{ still: boolean }> = ({ still }) => (
  <div className="relative flex h-full w-full items-center justify-center">
    <div className="relative w-[21%] rounded-[20px] border border-white/[0.12] bg-[#0E0C0B] p-1.5 shadow-[0_40px_70px_-20px_rgba(0,0,0,0.9)]">
      <div className="absolute left-1/2 top-2.5 h-1.5 w-10 -translate-x-1/2 rounded-full bg-black" />
      <div className="aspect-[9/15] overflow-hidden rounded-[15px] bg-gradient-to-b from-[#1A1612] to-[#0F0D0B] p-2.5 pt-6">
        <span className="block h-2 w-12 rounded-sm bg-white/[0.16]" />
        <div className="mt-3 flex flex-col gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={still ? undefined : { opacity: [0.35, 1, 0.35] }}
              transition={{ duration: 3.2, repeat: Infinity, delay: i * 0.35, ease: "easeInOut" }}
              className="flex items-center gap-1.5 rounded-md border border-white/[0.06] bg-white/[0.03] p-1.5"
            >
              <span className="h-3 w-3 rounded-sm bg-primary/60" />
              <Line w="60%" />
            </motion.div>
          ))}
        </div>
        <span className="mt-3 block h-5 rounded-md bg-primary" />
      </div>
    </div>
    <motion.span
      animate={still ? undefined : { y: [0, -3, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className="absolute left-[13%] top-[22%] inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-[#15120F] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-white/80 shadow-[0_20px_40px_-16px_rgba(0,0,0,0.8)]"
    >
      <Check size={9} strokeWidth={3} className="text-emerald-300" /> iOS · Android
    </motion.span>
    <motion.span
      animate={still ? undefined : { y: [0, 3, 0] }}
      transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
      className="absolute right-[12%] top-[46%] inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-[#15120F] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-primary shadow-[0_20px_40px_-16px_rgba(0,0,0,0.8)]"
    >
      One codebase
    </motion.span>
  </div>
);

const Automation: React.FC<{ still: boolean }> = ({ still }) => {
  const nodes = ["Trigger", "Transform", "Deliver"];
  return (
    <div className="relative w-[86%]">
      <svg viewBox="0 0 300 40" className="absolute left-0 right-0 top-1/2 h-10 w-full -translate-y-1/2" aria-hidden="true">
        <path d="M50 20 H250" stroke="rgba(255,255,255,0.14)" strokeWidth="1" strokeDasharray="3 4" />
        {!still && (
          <motion.circle r="3" cy="20" fill={COPPER} animate={{ cx: [50, 250], opacity: [0, 1, 1, 0] }} transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.6 }} />
        )}
      </svg>
      <div className="relative grid grid-cols-3 gap-6">
        {nodes.map((n, i) => (
          <motion.div
            key={n}
            animate={still ? undefined : { borderColor: ["rgba(255,255,255,0.08)", "rgba(196,138,100,0.6)", "rgba(255,255,255,0.08)"] }}
            transition={{ duration: 2.6, repeat: Infinity, delay: 0.1 + i * 0.95, repeatDelay: 0.6 }}
            className="rounded-2xl border border-white/[0.08] bg-[#15120F] p-4 shadow-[0_30px_60px_-24px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.05)]"
          >
            <div className="flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full ${i === 1 ? "bg-primary" : "bg-white/30"}`} />
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/80">{n}</span>
            </div>
            <span className="mt-3 block h-7 rounded-md border border-white/[0.07] bg-white/[0.03]" />
            <Line w="78%" className="mt-2.5" />
            <Line w="52%" className="mt-1.5" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const Rescue: React.FC<{ still: boolean }> = ({ still }) => {
  const rows = [
    { label: "Broken", from: "rgba(209,102,92,0.9)", delay: 0 },
    { label: "Fragile", from: "rgba(217,164,65,0.9)", delay: 0.5 },
    { label: "Fine", from: "rgba(127,179,122,0.9)", delay: 1 },
  ];
  return (
    <Window className="w-[64%]">
      <div className="p-3">
        <div className="mb-2.5 flex items-center justify-between">
          <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/60">Findings</span>
          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-primary">Day 5</span>
        </div>
        <div className="flex flex-col gap-1.5">
          {rows.map((r, i) => (
            <div key={r.label} className="flex items-center gap-3 rounded-md border border-white/[0.06] bg-white/[0.02] px-2.5 py-2">
              <motion.span
                animate={still ? undefined : { backgroundColor: ["rgba(255,255,255,0.12)", r.from, r.from, "rgba(255,255,255,0.12)"] }}
                transition={{ duration: 4.2, repeat: Infinity, delay: r.delay, times: [0, 0.2, 0.85, 1] }}
                className="h-2 w-2 flex-shrink-0 rounded-full"
                style={still ? { backgroundColor: r.from } : undefined}
              />
              <span className="w-12 text-[10px] font-semibold text-white/75">{r.label}</span>
              <Line w={`${70 - i * 18}%`} />
            </div>
          ))}
        </div>
        <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/[0.06]">
          <motion.span
            className="block h-full rounded-full bg-primary"
            initial={{ width: still ? "100%" : "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 3.6, ease: "easeInOut", repeat: still ? 0 : Infinity, repeatDelay: 1 }}
          />
        </div>
      </div>
    </Window>
  );
};

const Gallery: React.FC<{ still: boolean }> = ({ still }) => (
  <Window className="w-[62%]">
    <div className="grid grid-cols-4 gap-1.5 p-3">
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.span
          key={i}
          animate={still ? undefined : { opacity: [0.25, 1, 1, 0.25] }}
          transition={{ duration: 5, repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
          className="aspect-square rounded-md border border-white/[0.06]"
          style={{ background: i % 3 === 0 ? "linear-gradient(135deg, rgba(196,138,100,0.55), rgba(196,138,100,0.15))" : "rgba(255,255,255,0.06)" }}
        />
      ))}
    </div>
    <div className="flex items-center justify-between border-t border-white/[0.06] px-3 py-2">
      <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-white/55">Uploading</span>
      <span className="h-1 w-20 overflow-hidden rounded-full bg-white/[0.08]">
        <motion.span className="block h-full bg-primary" initial={{ width: still ? "100%" : "0%" }} animate={{ width: "100%" }} transition={{ duration: 2.8, repeat: still ? 0 : Infinity, repeatDelay: 1.2, ease: "easeInOut" }} />
      </span>
    </div>
  </Window>
);

const Decision: React.FC<{ still: boolean }> = ({ still }) => {
  const rows: [string, boolean][] = [
    ["Core flow", true],
    ["Accounts & payments", true],
    ["Admin view", true],
    ["Advanced automation", false],
    ["Marketplace", false],
  ];
  return (
    <Window className="w-[60%]">
      <div className="p-3">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/60">V1 decision</span>
          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-primary">In writing</span>
        </div>
        <div className="flex flex-col gap-1">
          {rows.map(([label, yes], i) => (
            <motion.div
              key={label}
              initial={{ opacity: still ? 1 : 0.3 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.25, repeat: still ? 0 : Infinity, repeatDelay: 4 }}
              className="flex items-center justify-between rounded-md px-2 py-1.5 hover:bg-white/[0.03]"
            >
              <span className={`text-[10.5px] ${yes ? "text-white/85" : "text-white/35 line-through decoration-white/30"}`}>{label}</span>
              <span className={`inline-flex items-center gap-1 text-[8.5px] font-semibold uppercase tracking-[0.14em] ${yes ? "text-primary" : "text-white/35"}`}>
                {yes ? <Check size={9} strokeWidth={3} /> : <X size={9} strokeWidth={3} />}
                {yes ? "V1" : "Not yet"}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </Window>
  );
};

const Notes: React.FC<{ still: boolean }> = ({ still }) => (
  <div className="relative w-[58%] rounded-xl border border-white/[0.08] bg-[#15120F]/95 p-5 shadow-[0_30px_60px_-24px_rgba(0,0,0,0.8)]">
    <span className="block h-2.5 w-[60%] rounded-sm bg-white/[0.18]" />
    <span className="mt-1.5 block h-2.5 w-[42%] rounded-sm bg-white/[0.18]" />
    <div className="mt-4 flex flex-col gap-1.5">
      <Line w="100%" /> <Line w="92%" /> <Line w="96%" />
    </div>
    <div className="mt-3 flex gap-2.5 border-l-2 border-primary pl-3">
      <div className="flex w-full flex-col gap-1.5">
        <motion.span animate={still ? undefined : { width: ["30%", "88%", "88%", "30%"] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", times: [0, 0.3, 0.8, 1] }} className="block h-1.5 rounded-full bg-primary/70" />
        <Line w="70%" />
      </div>
    </div>
    <div className="mt-3 flex flex-col gap-1.5">
      <Line w="100%" /> <Line w="84%" />
    </div>
  </div>
);

const Film: React.FC<{ poster: string }> = ({ poster }) => (
  <div className="relative h-full w-full">
    <img src={poster} alt="" width="1080" height="608" loading="lazy" decoding="async" className="h-full w-full object-cover" />
    <span className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#0B0A09] to-transparent" />
    <span className="absolute left-1/2 top-[44%] flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_12px_30px_-8px_rgba(196,138,100,0.7)]">
      <Play size={17} strokeWidth={2.5} className="ml-0.5" fill="currentColor" />
    </span>
  </div>
);

const Timeline: React.FC<{ src: string }> = ({ src }) => (
  <div className="relative h-full w-full bg-[#0B0A09]">
    <img src={src} alt="" width="1200" height="900" loading="lazy" decoding="async" className="h-full w-full object-contain" />
  </div>
);

/* ---- entry ---- */

const NavVignette: React.FC<{ kind: VignetteKind; src?: string }> = ({ kind, src }) => {
  const still = !!useReducedMotion();
  if (kind === "film" && src) return <Film poster={src} />;
  if (kind === "timeline" && src) return <Timeline src={src} />;
  return (
    <Frame>
      {kind === "dashboard" && <Dashboard still={still} />}
      {kind === "saas" && <Saas still={still} />}
      {kind === "mobile" && <Mobile still={still} />}
      {kind === "automation" && <Automation still={still} />}
      {kind === "rescue" && <Rescue still={still} />}
      {kind === "gallery" && <Gallery still={still} />}
      {kind === "decision" && <Decision still={still} />}
      {kind === "notes" && <Notes still={still} />}
    </Frame>
  );
};

export default NavVignette;
