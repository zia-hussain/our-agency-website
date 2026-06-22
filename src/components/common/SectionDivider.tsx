import React from "react";

const SectionDivider: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none relative z-10 mx-auto h-px w-full max-w-7xl px-4 sm:px-6 lg:px-8"
    >
      <div className="relative h-px w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="absolute left-1/2 top-0 h-px w-40 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/50 to-transparent sm:w-64" />
        <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-primary/35 bg-background shadow-[0_0_14px_rgba(196,138,100,0.18)]" />
      </div>
    </div>
  );
};

export default SectionDivider;
