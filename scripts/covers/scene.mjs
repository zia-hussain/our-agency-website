// Shared scene for every cover: warm charcoal field, one soft key light from
// upper-left, vignette, fine grain, and the gradient/filter vocabulary every
// object is drawn with. Used by build-covers.mjs (category family) and
// build-case-covers.mjs (case-specific objects) so both stay one family.
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
export const ROOT = join(__dirname, "../..");
export const OUT_P = join(ROOT, "public/project_images/covers");
export const OUT_A = join(ROOT, "public/article_images/covers");
mkdirSync(OUT_P, { recursive: true });
mkdirSync(OUT_A, { recursive: true });

// Shared scene: warm charcoal field, one soft key light from upper-left,
// vignette, fine grain. Everything sits on this.
export const defs = (id, W, H) => `
  <defs>
    <radialGradient id="${id}-key" cx="30%" cy="22%" r="75%">
      <stop offset="0" stop-color="#2A241F"/>
      <stop offset="0.45" stop-color="#171412"/>
      <stop offset="1" stop-color="#0B0A09"/>
    </radialGradient>
    <radialGradient id="${id}-warm" cx="38%" cy="40%" r="55%">
      <stop offset="0" stop-color="#C48A64" stop-opacity="0.16"/>
      <stop offset="1" stop-color="#C48A64" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="${id}-stone" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#3A332D"/>
      <stop offset="0.5" stop-color="#211D19"/>
      <stop offset="1" stop-color="#120F0D"/>
    </linearGradient>
    <linearGradient id="${id}-stone2" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#2E2823"/>
      <stop offset="1" stop-color="#15120F"/>
    </linearGradient>
    <linearGradient id="${id}-edge" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#F3EDE4" stop-opacity="0.28"/>
      <stop offset="0.5" stop-color="#F3EDE4" stop-opacity="0.04"/>
      <stop offset="1" stop-color="#F3EDE4" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="${id}-copper" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#F0D2AE"/>
      <stop offset="0.35" stop-color="#C48A64"/>
      <stop offset="0.75" stop-color="#9A6442"/>
      <stop offset="1" stop-color="#6E4630"/>
    </linearGradient>
    <linearGradient id="${id}-copperV" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#F0D2AE"/>
      <stop offset="0.4" stop-color="#C48A64"/>
      <stop offset="1" stop-color="#7A4E34"/>
    </linearGradient>
    <radialGradient id="${id}-sphere" cx="35%" cy="30%" r="70%">
      <stop offset="0" stop-color="#F6DDBE"/>
      <stop offset="0.3" stop-color="#D59C72"/>
      <stop offset="0.7" stop-color="#9A6442"/>
      <stop offset="1" stop-color="#5B3A27"/>
    </radialGradient>
    <radialGradient id="${id}-darkSphere" cx="35%" cy="30%" r="70%">
      <stop offset="0" stop-color="#4A423B"/>
      <stop offset="0.4" stop-color="#26211D"/>
      <stop offset="1" stop-color="#0E0C0A"/>
    </radialGradient>
    <radialGradient id="${id}-glow" cx="50%" cy="50%" r="50%">
      <stop offset="0" stop-color="#E8C49B" stop-opacity="0.55"/>
      <stop offset="0.4" stop-color="#C48A64" stop-opacity="0.18"/>
      <stop offset="1" stop-color="#C48A64" stop-opacity="0"/>
    </radialGradient>
    <filter id="${id}-shadow" x="-30%" y="-30%" width="160%" height="180%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="18"/>
      <feOffset dx="8" dy="26" result="s"/>
      <feComponentTransfer><feFuncA type="linear" slope="0.75"/></feComponentTransfer>
      <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="${id}-softshadow" x="-30%" y="-30%" width="160%" height="180%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="10"/>
      <feOffset dx="4" dy="12" result="s"/>
      <feComponentTransfer><feFuncA type="linear" slope="0.6"/></feComponentTransfer>
      <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="${id}-blur8"><feGaussianBlur stdDeviation="8"/></filter>
    <filter id="${id}-blur24"><feGaussianBlur stdDeviation="24"/></filter>
    <filter id="${id}-grain" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" result="n"/>
      <feColorMatrix type="saturate" values="0"/>
      <feComponentTransfer><feFuncA type="linear" slope="0.07"/></feComponentTransfer>
    </filter>
    <clipPath id="${id}-clip"><rect width="${W}" height="${H}"/></clipPath>
  </defs>`;

export const scene = (id, W, H, body, { keyX = 30, keyY = 22 } = {}) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
${defs(id, W, H).replace(`cx="30%" cy="22%"`, `cx="${keyX}%" cy="${keyY}%"`)}
  <g clip-path="url(#${id}-clip)">
    <rect width="${W}" height="${H}" fill="url(#${id}-key)"/>
    <rect width="${W}" height="${H}" fill="url(#${id}-warm)"/>
${body}
    <rect width="${W}" height="${H}" filter="url(#${id}-grain)" opacity="0.9"/>
  </g>
</svg>`;

export const write = (dir, name, svg) => { writeFileSync(join(dir, name), svg.trim() + "\n"); console.log("wrote", name); };
export const PW = 1200, PH = 900;
export const AW = 1600, AH = 900;
