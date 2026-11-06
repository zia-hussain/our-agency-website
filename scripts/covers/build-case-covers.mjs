// Case-specific covers: the same family as build-covers.mjs (one lit object,
// warm charcoal field, soft key from upper-left, grain, copper as the only
// accent) but each object belongs to its own case study's story.
// Run: node scripts/covers/build-case-covers.mjs   (then render-covers.mjs)
import { OUT_P, scene, write, PW, PH } from "./scene.mjs";

const d1 = (n) => Number(n.toFixed(1));
const polar = (cx, cy, r, deg) => [d1(cx + r * Math.cos((deg * Math.PI) / 180)), d1(cy + r * Math.sin((deg * Math.PI) / 180))];
const floor = (id, cx, cy, rx, ry = 36, op = 0.55) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#000" opacity="${op}" filter="url(#${id}-blur24)"/>`;

// 1. KNIPSR — a camera iris: eight dark blades closing on the light, one blade copper.
{
  const id = "ap";
  const cx = 600, cy = 450, R = 330, r0 = 112;
  const blade = (i, copper) => {
    const t = i * 45 - 90;
    const [px, py] = polar(cx, cy, r0, t);
    const [qx, qy] = polar(cx, cy, R, t + 64);
    const [sx, sy] = polar(cx, cy, R, t - 16);
    const path = `M${px} ${py} L${qx} ${qy} A${R} ${R} 0 0 0 ${sx} ${sy} Z`;
    const shade = 0.08 + ((i + 2) % 8) * 0.045; // blades on the shadow side sit darker
    return `
    <g filter="url(#${id}-softshadow)">
      <path d="${path}" fill="${copper ? `url(#${id}-copper)` : `url(#${id}-stone)`}"/>
      ${copper ? "" : `<path d="${path}" fill="#000" opacity="${shade.toFixed(3)}"/>`}
    </g>
    <line x1="${px}" y1="${py}" x2="${qx}" y2="${qy}" stroke="${copper ? "#F6DDBE" : "#F3EDE4"}" stroke-opacity="${copper ? 0.85 : 0.16}" stroke-width="${copper ? 3 : 2}"/>`;
  };
  const body = `
    ${floor(id, 600, 820, 380, 30)}
    <!-- barrel -->
    <g filter="url(#${id}-shadow)"><circle cx="${cx}" cy="${cy}" r="${R + 46}" fill="url(#${id}-stone2)"/></g>
    <circle cx="${cx}" cy="${cy}" r="${R + 46}" fill="none" stroke="url(#${id}-edge)" stroke-width="3"/>
    <circle cx="${cx}" cy="${cy}" r="${R + 8}" fill="#0B0A09"/>
    <!-- light coming through the opening -->
    <circle cx="${cx}" cy="${cy}" r="${r0 + 60}" fill="url(#${id}-glow)"/>
    <circle cx="${cx}" cy="${cy}" r="${r0}" fill="#E8C49B" opacity="0.22" filter="url(#${id}-blur24)"/>
    <!-- blades in sequence; the copper one is overlapped by its neighbour like any other -->
    ${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => blade(i, i === 6)).join("")}
    ${blade(7, false)}
    <circle cx="${cx}" cy="${cy}" r="${r0 - 6}" fill="#070605"/>
    <circle cx="${cx}" cy="${cy}" r="${r0 - 6}" fill="url(#${id}-glow)" opacity="0.7"/>
    <circle cx="${cx}" cy="${cy}" r="${r0 - 40}" fill="#E8C49B" opacity="0.35" filter="url(#${id}-blur24)"/>
    <!-- rim highlight on the key side -->
    <path d="M${polar(cx, cy, R + 46, 200).join(" ")} A${R + 46} ${R + 46} 0 0 1 ${polar(cx, cy, R + 46, 290).join(" ")}" stroke="#F3EDE4" stroke-opacity="0.35" stroke-width="4" fill="none" stroke-linecap="round"/>`;
  write(OUT_P, "cover-knipsr-aperture.svg", scene(id, PW, PH, body, { keyX: 28, keyY: 18 }));
}

// 2. FLOATING STONE RANCH — a cold-room crate, one copper tag on a hook.
{
  const id = "cr";
  const x = 300, y = 300, w = 560, h = 400, dd = 110;
  const body = `
    ${floor(id, 640, 790, 420, 40)}
    <!-- cold air pooling at the base -->
    <ellipse cx="620" cy="720" rx="520" ry="70" fill="#DCE6EA" opacity="0.045" filter="url(#${id}-blur24)"/>
    <g filter="url(#${id}-shadow)">
      <path d="M${x} ${y} L${x + w} ${y} L${x + w + dd} ${y - dd * 0.55} L${x + dd} ${y - dd * 0.55} Z" fill="#3A332D"/>
      <path d="M${x + w} ${y} L${x + w + dd} ${y - dd * 0.55} L${x + w + dd} ${y + h - dd * 0.55} L${x + w} ${y + h} Z" fill="#15120F"/>
      <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#${id}-stone)"/>
    </g>
    <!-- plank seams -->
    ${[1, 2, 3].map((i) => `<rect x="${x}" y="${y + i * (h / 4)}" width="${w}" height="2" fill="#000" opacity="0.5"/><rect x="${x}" y="${y + i * (h / 4) + 2}" width="${w}" height="1.5" fill="#F3EDE4" opacity="0.05"/>`).join("")}
    ${[1, 2, 3].map((i) => `<path d="M${x + w} ${y + i * (h / 4)} L${x + w + dd} ${y + i * (h / 4) - dd * 0.55}" stroke="#000" stroke-opacity="0.45" stroke-width="2"/>`).join("")}
    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="url(#${id}-edge)" stroke-width="2"/>
    <path d="M${x} ${y} L${x + dd} ${y - dd * 0.55} L${x + w + dd} ${y - dd * 0.55}" stroke="#F3EDE4" stroke-opacity="0.3" stroke-width="3" fill="none"/>
    <!-- frost on the lid -->
    <path d="M${x + 40} ${y - 8} L${x + dd + 20} ${y - dd * 0.55 + 10} L${x + w + dd - 60} ${y - dd * 0.55 + 10} L${x + w - 80} ${y - 8} Z" fill="#DCE6EA" opacity="0.06" filter="url(#${id}-blur8)"/>
    <!-- hook -->
    <path d="M${x + 110} ${y + 66} q 0 -22 18 -22 q 18 0 18 22 v 30" stroke="#0B0A09" stroke-width="9" fill="none" stroke-linecap="round"/>
    <path d="M${x + 110} ${y + 66} q 0 -22 18 -22 q 18 0 18 22 v 30" stroke="#F3EDE4" stroke-opacity="0.18" stroke-width="3" fill="none" stroke-linecap="round"/>
    <!-- the tag: one copper tag, hanging from the hook, lit -->
    <ellipse cx="${x + 150}" cy="${y + 190}" rx="60" ry="80" fill="#C48A64" opacity="0.28" filter="url(#${id}-blur24)"/>
    <g filter="url(#${id}-shadow)" transform="rotate(-5 ${x + 146} ${y + 96})">
      <path d="M${x + 146} ${y + 96} v 28" stroke="#C48A64" stroke-width="4"/>
      <path d="M${x + 106} ${y + 140} h 80 a 10 10 0 0 1 10 10 v 110 a 10 10 0 0 1 -10 10 h -80 a 10 10 0 0 1 -10 -10 v -110 a 10 10 0 0 1 10 -10 Z" fill="url(#${id}-copper)"/>
      <circle cx="${x + 146}" cy="${y + 160}" r="7" fill="#1A120C"/>
      <rect x="${x + 110}" y="${y + 190}" width="60" height="6" rx="3" fill="#2A1A10" opacity="0.5"/>
      <rect x="${x + 110}" y="${y + 208}" width="40" height="6" rx="3" fill="#2A1A10" opacity="0.4"/>
      <rect x="${x + 110}" y="${y + 226}" width="52" height="6" rx="3" fill="#2A1A10" opacity="0.4"/>
      <path d="M${x + 100} ${y + 146} v 100" stroke="#F6DDBE" stroke-opacity="0.8" stroke-width="2"/>
    </g>`;
  write(OUT_P, "cover-ranch-crate-tag.svg", scene(id, PW, PH, body, { keyX: 24, keyY: 20 }));
}

// 3. FORLAG — a short row of book spines; one copper spine pulled forward.
{
  const id = "bk";
  const books = [
    { x: 300, w: 78, h: 420 }, { x: 384, w: 66, h: 390 }, { x: 456, w: 92, h: 440 },
    { x: 554, w: 72, h: 410, copper: true }, { x: 632, w: 84, h: 430 }, { x: 722, w: 62, h: 380 }, { x: 790, w: 96, h: 450 },
  ];
  const base = 740;
  const spine = (b, i) => {
    if (b.copper) return "";
    const y = base - b.h;
    return `
    <g filter="url(#${id}-softshadow)"><rect x="${b.x}" y="${y}" width="${b.w}" height="${b.h}" rx="4" fill="url(#${id}-stone)"/></g>
    <rect x="${b.x}" y="${y}" width="${b.w}" height="${b.h}" rx="4" fill="#000" opacity="${(0.05 + i * 0.045).toFixed(3)}"/>
    <rect x="${b.x + 3}" y="${y + 2}" width="2" height="${b.h - 4}" fill="#F3EDE4" opacity="0.14"/>
    <rect x="${b.x + 10}" y="${y + 30}" width="${b.w - 20}" height="2" fill="#F3EDE4" opacity="0.07"/>
    <rect x="${b.x + 10}" y="${y + b.h - 40}" width="${b.w - 20}" height="2" fill="#F3EDE4" opacity="0.05"/>
    <rect x="${b.x + 16}" y="${y + 90}" width="${b.w - 32}" height="${Math.min(170, b.h * 0.35)}" rx="3" fill="#F3EDE4" opacity="0.035"/>`;
  };
  const c = books[3];
  const cy = base - c.h + 40, ch = c.h + 10, cw = c.w + 14, cx = c.x - 6;
  const body = `
    ${floor(id, 600, 800, 400, 34)}
    <!-- shelf -->
    <g filter="url(#${id}-shadow)"><rect x="220" y="${base}" width="760" height="38" rx="4" fill="url(#${id}-stone2)"/></g>
    <rect x="220" y="${base}" width="760" height="3" fill="#F3EDE4" opacity="0.18"/>
    <path d="M220 ${base + 38} L260 ${base + 72} L1020 ${base + 72} L980 ${base + 38} Z" fill="#0E0C0A"/>
    ${books.map(spine).join("")}
    <!-- the pulled spine: forward, lower, catching the key light -->
    <rect x="${cx - 10}" y="${cy - 10}" width="${cw + 20}" height="${ch + 20}" rx="10" fill="#C48A64" opacity="0.26" filter="url(#${id}-blur24)"/>
    <g filter="url(#${id}-shadow)"><rect x="${cx}" y="${cy}" width="${cw}" height="${ch}" rx="5" fill="url(#${id}-copperV)"/></g>
    <rect x="${cx + 4}" y="${cy + 3}" width="2" height="${ch - 6}" fill="#F6DDBE" opacity="0.85"/>
    <rect x="${cx + 12}" y="${cy + 36}" width="${cw - 24}" height="3" fill="#2A1A10" opacity="0.45"/>
    <rect x="${cx + 12}" y="${cy + ch - 48}" width="${cw - 24}" height="3" fill="#2A1A10" opacity="0.4"/>
    <rect x="${cx + 18}" y="${cy + 110}" width="${cw - 36}" height="150" rx="3" fill="#2A1A10" opacity="0.3"/>
    <!-- top edge of the pulled book's pages -->
    <path d="M${cx} ${cy} L${cx + 14} ${cy - 16} L${cx + cw + 14} ${cy - 16} L${cx + cw} ${cy} Z" fill="#EADFCF" opacity="0.55"/>`;
  write(OUT_P, "cover-forlag-spines.svg", scene(id, PW, PH, body, { keyX: 30, keyY: 20 }));
}

// 4. SKILL X SWAP — two interlocking rings: one dark, one copper.
{
  const id = "rg";
  const r = 215, sw = 62, ax = 470, ay = 450, bx = 730, by = 450;
  const body = `
    ${floor(id, 600, 790, 400, 34)}
    <ellipse cx="600" cy="450" rx="330" ry="260" fill="url(#${id}-glow)" opacity="0.35"/>
    <defs><clipPath id="${id}-under"><rect x="${(ax + bx) / 2 - 80}" y="${ay}" width="160" height="300"/></clipPath></defs>
    <!-- dark ring -->
    <g filter="url(#${id}-shadow)"><circle cx="${ax}" cy="${ay}" r="${r}" fill="none" stroke="url(#${id}-stone)" stroke-width="${sw}"/></g>
    <circle cx="${ax}" cy="${ay}" r="${r + sw / 2 - 1}" fill="none" stroke="url(#${id}-edge)" stroke-width="2"/>
    <circle cx="${ax}" cy="${ay}" r="${r - sw / 2 + 1}" fill="none" stroke="#000" stroke-opacity="0.5" stroke-width="2"/>
    <!-- copper ring over it -->
    <circle cx="${bx}" cy="${by}" r="${r}" fill="none" stroke="#C48A64" stroke-opacity="0.35" stroke-width="${sw + 50}" filter="url(#${id}-blur24)"/>
    <g filter="url(#${id}-shadow)"><circle cx="${bx}" cy="${by}" r="${r}" fill="none" stroke="url(#${id}-copper)" stroke-width="${sw}"/></g>
    <path d="M${polar(bx, by, r, 150).join(" ")} A${r} ${r} 0 0 1 ${polar(bx, by, r, 250).join(" ")}" stroke="#F6DDBE" stroke-opacity="0.85" stroke-width="4" fill="none" stroke-linecap="round" transform="translate(-6,-6)"/>
    <!-- the dark ring passes back over the copper at the lower crossing: the interlock -->
    <g clip-path="url(#${id}-under)">
      <g filter="url(#${id}-softshadow)"><circle cx="${ax}" cy="${ay}" r="${r}" fill="none" stroke="url(#${id}-stone)" stroke-width="${sw}"/></g>
      <circle cx="${ax}" cy="${ay}" r="${r + sw / 2 - 1}" fill="none" stroke="url(#${id}-edge)" stroke-width="2"/>
    </g>
    <!-- copper reflection on the dark ring's inner edge -->
    <path d="M${polar(ax, ay, r, -20).join(" ")} A${r} ${r} 0 0 1 ${polar(ax, ay, r, 20).join(" ")}" stroke="#C48A64" stroke-opacity="0.3" stroke-width="${sw * 0.6}" fill="none" filter="url(#${id}-blur8)"/>`;
  write(OUT_P, "cover-swap-rings.svg", scene(id, PW, PH, body, { keyX: 30, keyY: 20 }));
}

// 5. FIRST NORTH PEPTIDES — one dark glass vial, copper cap, soft glow within.
{
  const id = "vl";
  const x = 470, w = 260, top = 230, bottom = 760;
  const body = `
    ${floor(id, 600, 800, 230, 30, 0.6)}
    <defs>
      <radialGradient id="${id}-inner" cx="50%" cy="80%" r="60%">
        <stop offset="0" stop-color="#E8C49B" stop-opacity="0.55"/>
        <stop offset="0.5" stop-color="#C48A64" stop-opacity="0.16"/>
        <stop offset="1" stop-color="#C48A64" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <ellipse cx="600" cy="640" rx="260" ry="200" fill="url(#${id}-glow)" opacity="0.45"/>
    <!-- glass body -->
    <g filter="url(#${id}-shadow)">
      <path d="M${x} ${top + 60} v ${bottom - top - 100} a 40 40 0 0 0 40 40 h ${w - 80} a 40 40 0 0 0 40 -40 v -${bottom - top - 100} a 30 30 0 0 0 -30 -30 h -${w - 60} a 30 30 0 0 0 -30 30 Z" fill="url(#${id}-stone)"/>
    </g>
    <!-- liquid, glowing from within -->
    <path d="M${x + 6} ${top + 300} v ${bottom - top - 340} a 36 36 0 0 0 36 36 h ${w - 84} a 36 36 0 0 0 36 -36 v -${bottom - top - 340} Z" fill="url(#${id}-inner)"/>
    <path d="M${x + 6} ${top + 300} v ${bottom - top - 340} a 36 36 0 0 0 36 36 h ${w - 84} a 36 36 0 0 0 36 -36 v -${bottom - top - 340} Z" fill="#E8C49B" opacity="0.08"/>
    <ellipse cx="600" cy="${top + 300}" rx="${w / 2 - 6}" ry="8" fill="#F6DDBE" opacity="0.18"/>
    <!-- glass highlight along the key side, and a soft one on the far side -->
    <rect x="${x + 22}" y="${top + 60}" width="16" height="${bottom - top - 110}" rx="8" fill="#F3EDE4" opacity="0.14" filter="url(#${id}-blur8)"/>
    <rect x="${x + 26}" y="${top + 70}" width="5" height="${bottom - top - 130}" rx="3" fill="#F3EDE4" opacity="0.4"/>
    <rect x="${x + w - 40}" y="${top + 120}" width="8" height="${bottom - top - 220}" rx="4" fill="#F3EDE4" opacity="0.08" filter="url(#${id}-blur8)"/>
    <!-- neck -->
    <rect x="${x + 50}" y="${top + 10}" width="${w - 100}" height="60" fill="#15120F"/>
    <!-- copper cap -->
    <g filter="url(#${id}-softshadow)">
      <rect x="${x + 36}" y="${top - 60}" width="${w - 72}" height="76" rx="12" fill="url(#${id}-copper)"/>
    </g>
    ${[0, 1, 2, 3].map((i) => `<rect x="${x + 36}" y="${top - 46 + i * 16}" width="${w - 72}" height="2" fill="#2A1A10" opacity="0.35"/>`).join("")}
    <rect x="${x + 36}" y="${top - 60}" width="${w - 72}" height="3" rx="1.5" fill="#F6DDBE" opacity="0.85"/>
    <rect x="${x + 36}" y="${top - 60}" width="${w - 72}" height="76" rx="12" fill="#C48A64" opacity="0.25" filter="url(#${id}-blur24)"/>`;
  write(OUT_P, "cover-peptides-vial.svg", scene(id, PW, PH, body, { keyX: 30, keyY: 16 }));
}

// 6. LEARNING PLATFORM — a dark staircase, three-quarter view; one tread faced in copper.
{
  const id = "st";
  const steps = 5, W = 400, rise = 74, dX = 96, dY = -54, x0 = 210, yBase = 770;
  const body = `
    ${floor(id, 640, 800, 460, 40)}
    ${Array.from({ length: steps }).map((_, j) => {
      const i = steps - 1 - j; // back to front
      const x = x0 + i * dX, yBot = yBase + i * dY - i * rise, yTop = yBot - rise, copper = i === 2;
      const side = `M${x + W} ${yTop} L${x + W + dX} ${yTop + dY} L${x + W + dX} ${yBase + (i + 1) * dY} L${x + W} ${yBase + i * dY} Z`;
      const tread = `M${x} ${yTop} L${x + dX} ${yTop + dY} L${x + W + dX} ${yTop + dY} L${x + W} ${yTop} Z`;
      return `
    ${copper ? `<path d="${tread}" fill="#C48A64" opacity="0.4" filter="url(#${id}-blur24)" transform="translate(0,-10)"/>` : ""}
    <g filter="url(#${id}-softshadow)">
      <path d="${side}" fill="#0F0D0B"/>
      <rect x="${x}" y="${yTop}" width="${W}" height="${rise}" fill="url(#${id}-stone)"/>
      <rect x="${x}" y="${yTop}" width="${W}" height="${rise}" fill="#000" opacity="${(0.25 - i * 0.04).toFixed(2)}"/>
      <path d="${tread}" fill="${copper ? `url(#${id}-copper)` : "#2E2823"}"/>
      ${copper ? "" : `<path d="${tread}" fill="url(#${id}-edge)" opacity="0.6"/>`}
    </g>
    <line x1="${x}" y1="${yTop}" x2="${x + W}" y2="${yTop}" stroke="${copper ? "#F6DDBE" : "#F3EDE4"}" stroke-opacity="${copper ? 0.9 : 0.22}" stroke-width="${copper ? 3 : 2}"/>
    <line x1="${x}" y1="${yTop}" x2="${x + dX}" y2="${yTop + dY}" stroke="${copper ? "#F6DDBE" : "#F3EDE4"}" stroke-opacity="${copper ? 0.7 : 0.14}" stroke-width="2"/>
    <line x1="${x + W}" y1="${yTop}" x2="${x + W}" y2="${yBot}" stroke="#000" stroke-opacity="0.5" stroke-width="2"/>
    ${copper ? `<rect x="${x}" y="${yTop}" width="${W}" height="12" fill="url(#${id}-copperV)"/><rect x="${x}" y="${yTop + 12}" width="${W}" height="2" fill="#2A1A10" opacity="0.5"/>` : ""}`;
    }).join("")}
    <!-- hairline cracks on the two lowest risers -->
    <path d="M${x0 + 120} ${yBase - 4} l 18 -26 l -6 -22 l 14 -18" stroke="#050403" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <path d="M${x0 + 300} ${yBase - 6} l -10 -30 l 16 -20" stroke="#050403" stroke-width="2" fill="none" stroke-linecap="round"/>
    <path d="M${x0 + dX + 70} ${yBase + dY - rise - 2} l 24 -28 l 20 -4 l 10 -26" stroke="#050403" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <path d="M${x0 + dX + 250} ${yBase + dY - rise - 4} l 8 -24 l -12 -22" stroke="#050403" stroke-width="2" fill="none" stroke-linecap="round"/>`;
  write(OUT_P, "cover-platform-stair.svg", scene(id, PW, PH, body, { keyX: 26, keyY: 18 }));
}

// 7. LIFTLY — a folded stack of dark cloth, bound by one copper band.
{
  const id = "ln";
  const layers = [
    { y: 640, w: 560, h: 86 }, { y: 560, w: 540, h: 86 }, { y: 480, w: 570, h: 86 }, { y: 400, w: 530, h: 86 },
  ];
  const body = `
    ${floor(id, 600, 790, 400, 36)}
    ${layers.map((l, i) => {
      const x = 600 - l.w / 2;
      return `
    <g filter="url(#${id}-softshadow)">
      <path d="M${x} ${l.y + 18} q 0 -18 18 -18 h ${l.w - 36} q 18 0 18 18 v ${l.h - 36} q 0 18 -18 18 h -${l.w - 36} q -18 0 -18 -18 Z" fill="url(#${id}-stone)"/>
    </g>
    <path d="M${x} ${l.y + 18} q 0 -18 18 -18 h ${l.w - 36} q 18 0 18 18 v ${l.h - 36} q 0 18 -18 18 h -${l.w - 36} q -18 0 -18 -18 Z" fill="#000" opacity="${(0.04 + (3 - i) * 0.07).toFixed(2)}"/>
    <!-- fold line: the top edge catches the key -->
    <path d="M${x + 18} ${l.y + 1} h ${l.w - 36}" stroke="#F3EDE4" stroke-opacity="${(0.28 - i * 0.04).toFixed(2)}" stroke-width="3" stroke-linecap="round"/>
    <path d="M${x + 60} ${l.y + l.h - 22} q ${l.w / 2 - 60} -14 ${l.w - 120} 0" stroke="#000" stroke-opacity="0.35" stroke-width="3" fill="none"/>
    <!-- the fold: a soft rolled edge on the right -->
    <path d="M${x + l.w - 60} ${l.y + 6} q 60 ${l.h / 2 - 6} 0 ${l.h - 12}" stroke="#000" stroke-opacity="0.25" stroke-width="12" fill="none" filter="url(#${id}-blur8)"/>`;
    }).join("")}
    <!-- the copper band around the whole stack -->
    <rect x="520" y="370" width="150" height="380" rx="14" fill="#C48A64" opacity="0.3" filter="url(#${id}-blur24)"/>
    <g filter="url(#${id}-softshadow)">
      <path d="M548 404 h 104 v 320 h -104 Z" fill="url(#${id}-copperV)"/>
      <path d="M548 404 q 52 -30 104 0 v 16 q -52 -24 -104 0 Z" fill="#F0D2AE"/>
    </g>
    <rect x="552" y="420" width="3" height="300" fill="#F6DDBE" opacity="0.8"/>
    <rect x="645" y="420" width="4" height="300" fill="#2A1A10" opacity="0.45"/>
    <!-- the band's small clasp -->
    <rect x="574" y="548" width="52" height="30" rx="6" fill="url(#${id}-copper)"/>
    <rect x="574" y="548" width="52" height="3" fill="#F6DDBE" opacity="0.9"/>`;
  write(OUT_P, "cover-liftly-stack-band.svg", scene(id, PW, PH, body, { keyX: 28, keyY: 18 }));
}

// 8. TOMO — a speaker cone, one copper concentric ring.
{
  const id = "sp";
  const cx = 600, cy = 450, R = 350;
  const body = `
    ${floor(id, 600, 820, 380, 30)}
    <defs>
      <radialGradient id="${id}-cone" cx="50%" cy="50%" r="50%">
        <stop offset="0" stop-color="#0B0A09"/>
        <stop offset="0.3" stop-color="#15120F"/>
        <stop offset="0.75" stop-color="#2A241F"/>
        <stop offset="1" stop-color="#3A332D"/>
      </radialGradient>
      <linearGradient id="${id}-shade" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#F3EDE4" stop-opacity="0.08"/>
        <stop offset="0.5" stop-color="#000" stop-opacity="0"/>
        <stop offset="1" stop-color="#000" stop-opacity="0.45"/>
      </linearGradient>
    </defs>
    <!-- frame -->
    <g filter="url(#${id}-shadow)"><circle cx="${cx}" cy="${cy}" r="${R}" fill="url(#${id}-stone2)"/></g>
    <circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="url(#${id}-edge)" stroke-width="3"/>
    <!-- surround (the soft rubber ring) -->
    <circle cx="${cx}" cy="${cy}" r="${R - 34}" fill="#0E0C0A"/>
    <circle cx="${cx}" cy="${cy}" r="${R - 52}" fill="none" stroke="#2A241F" stroke-width="28"/>
    <circle cx="${cx}" cy="${cy}" r="${R - 52}" fill="none" stroke="url(#${id}-shade)" stroke-width="28"/>
    <!-- cone -->
    <circle cx="${cx}" cy="${cy}" r="${R - 70}" fill="url(#${id}-cone)"/>
    <circle cx="${cx}" cy="${cy}" r="${R - 70}" fill="url(#${id}-shade)"/>
    ${[0.78, 0.62, 0.47].map((k) => `<circle cx="${cx}" cy="${cy}" r="${((R - 70) * k).toFixed(0)}" fill="none" stroke="#000" stroke-opacity="0.35" stroke-width="2"/><circle cx="${cx}" cy="${cy}" r="${((R - 70) * k - 2).toFixed(0)}" fill="none" stroke="#F3EDE4" stroke-opacity="0.05" stroke-width="1.5"/>`).join("")}
    <!-- the copper ring: the one voice -->
    <circle cx="${cx}" cy="${cy}" r="${R - 150}" fill="none" stroke="#C48A64" stroke-opacity="0.4" stroke-width="40" filter="url(#${id}-blur24)"/>
    <circle cx="${cx}" cy="${cy}" r="${R - 150}" fill="none" stroke="url(#${id}-copper)" stroke-width="16"/>
    <path d="M${polar(cx, cy, R - 150, 160).join(" ")} A${R - 150} ${R - 150} 0 0 1 ${polar(cx, cy, R - 150, 250).join(" ")}" stroke="#F6DDBE" stroke-opacity="0.85" stroke-width="3" fill="none" stroke-linecap="round" transform="translate(-3,-3)"/>
    <!-- dust cap -->
    <circle cx="${cx}" cy="${cy}" r="96" fill="url(#${id}-darkSphere)"/>
    <ellipse cx="${cx - 30}" cy="${cy - 36}" rx="26" ry="16" fill="#F3EDE4" opacity="0.14" filter="url(#${id}-blur8)"/>
    <!-- key light grazing the frame's upper-left -->
    <path d="M${polar(cx, cy, R, 195).join(" ")} A${R} ${R} 0 0 1 ${polar(cx, cy, R, 285).join(" ")}" stroke="#F3EDE4" stroke-opacity="0.32" stroke-width="4" fill="none" stroke-linecap="round"/>`;
  write(OUT_P, "cover-tomo-speaker.svg", scene(id, PW, PH, body, { keyX: 28, keyY: 18 }));
}

// 9. HJELPNÅ — a dark hex nut, one copper thread catching the light.
{
  const id = "nt";
  const cx = 600, cy = 450, R = 330, hole = 150;
  const hex = (r, dy = 0) => Array.from({ length: 6 }).map((_, i) => polar(cx, cy + dy, r, i * 60 + 30).join(" ")).join(" L ");
  const body = `
    ${floor(id, 600, 810, 360, 34)}
    <!-- thickness -->
    <path d="M${hex(R, 34)} Z" fill="#0E0C0A" filter="url(#${id}-shadow)"/>
    <!-- top face -->
    <path d="M${hex(R)} Z" fill="url(#${id}-stone)"/>
    <path d="M${hex(R)} Z" fill="none" stroke="url(#${id}-edge)" stroke-width="3"/>
    <!-- chamfer -->
    <path d="M${hex(R - 28)} Z" fill="none" stroke="#000" stroke-opacity="0.35" stroke-width="2"/>
    <path d="M${hex(R - 30)} Z" fill="none" stroke="#F3EDE4" stroke-opacity="0.07" stroke-width="2"/>
    <!-- machined face: a faint circular ring ground around the hole -->
    <circle cx="${cx}" cy="${cy}" r="${hole + 70}" fill="#000" opacity="0.18"/>
    <circle cx="${cx}" cy="${cy}" r="${hole + 70}" fill="none" stroke="#F3EDE4" stroke-opacity="0.06" stroke-width="2"/>
    <!-- the bore -->
    <circle cx="${cx}" cy="${cy}" r="${hole}" fill="#070605"/>
    <circle cx="${cx}" cy="${cy}" r="${hole - 8}" fill="#0B0A09"/>
    <!-- threads inside, dark -->
    ${[0.92, 0.84, 0.76].map((k) => `<path d="M${polar(cx, cy, hole * k, 20).join(" ")} A${hole * k} ${hole * k} 0 0 1 ${polar(cx, cy, hole * k, 160).join(" ")}" stroke="#2A241F" stroke-width="7" fill="none" stroke-linecap="round"/>`).join("")}
    <!-- the one copper thread -->
    <path d="M${polar(cx, cy, hole - 10, 150).join(" ")} A${hole - 10} ${hole - 10} 0 0 1 ${polar(cx, cy, hole - 10, 330).join(" ")}" stroke="#C48A64" stroke-opacity="0.45" stroke-width="36" fill="none" stroke-linecap="round" filter="url(#${id}-blur24)"/>
    <path d="M${polar(cx, cy, hole - 10, 150).join(" ")} A${hole - 10} ${hole - 10} 0 0 1 ${polar(cx, cy, hole - 10, 330).join(" ")}" stroke="url(#${id}-copper)" stroke-width="12" fill="none" stroke-linecap="round"/>
    <path d="M${polar(cx, cy, hole - 14, 190).join(" ")} A${hole - 14} ${hole - 14} 0 0 1 ${polar(cx, cy, hole - 14, 290).join(" ")}" stroke="#F6DDBE" stroke-opacity="0.9" stroke-width="3" fill="none" stroke-linecap="round"/>
    <!-- key light on the two upper-left facets -->
    <path d="M${polar(cx, cy, R, 150).join(" ")} L ${polar(cx, cy, R, 210).join(" ")} L ${polar(cx, cy, R, 270).join(" ")}" stroke="#F3EDE4" stroke-opacity="0.38" stroke-width="5" fill="none" stroke-linejoin="round"/>`;
  write(OUT_P, "cover-hjelpna-hex-nut.svg", scene(id, PW, PH, body, { keyX: 28, keyY: 18 }));
}

// 10. PAWSPACE — a flat dark pet tag lying at a slight angle, copper split ring through its hole.
{
  const id = "pt";
  const cx = 600, cy = 500, rx = 300, ry = 232, tilt = -14, th = 22; // disc, seen from above at an angle
  const hx = cx - 236, hy = cy - 92; // hole near the upper-left edge (after the tilt)
  const rcx = hx - 86, rcy = hy + 50; // ring centre: the hole sits on the ring's far end
  const body = `
    ${floor(id, 600, 760, 380, 46)}
    <defs>
      <linearGradient id="${id}-face" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#3E3730"/>
        <stop offset="0.45" stop-color="#211D19"/>
        <stop offset="1" stop-color="#14110E"/>
      </linearGradient>
      <clipPath id="${id}-face-clip"><ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" transform="rotate(${tilt} ${cx} ${cy})"/></clipPath>
      <clipPath id="${id}-hole"><ellipse cx="${hx}" cy="${hy}" rx="26" ry="20" transform="rotate(${tilt} ${hx} ${hy})"/></clipPath>
      <mask id="${id}-outside"><rect width="1200" height="900" fill="#fff"/><ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#000" transform="rotate(${tilt} ${cx} ${cy})"/><rect x="${cx - rx}" y="${cy}" width="${rx * 2}" height="${th}" fill="#000" transform="rotate(${tilt} ${cx} ${cy})"/><ellipse cx="${cx}" cy="${cy + th}" rx="${rx}" ry="${ry}" fill="#000" transform="rotate(${tilt} ${cx} ${cy + th})"/></mask>
    </defs>
    <ellipse cx="${cx}" cy="${cy - 40}" rx="360" ry="300" fill="url(#${id}-glow)" opacity="0.3"/>
    <ellipse cx="${rcx}" cy="${rcy}" rx="100" ry="64" fill="none" stroke="#7A4E34" stroke-width="20" transform="rotate(-30 ${rcx} ${rcy})"/>
    <!-- thickness of the tag -->
    <g filter="url(#${id}-shadow)">
      <ellipse cx="${cx}" cy="${cy + th}" rx="${rx}" ry="${ry}" fill="#0E0C0A" transform="rotate(${tilt} ${cx} ${cy + th})"/>
      <rect x="${cx - rx}" y="${cy}" width="${rx * 2}" height="${th}" fill="#0E0C0A" transform="rotate(${tilt} ${cx} ${cy})"/>
      <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#${id}-face)" transform="rotate(${tilt} ${cx} ${cy})"/>
    </g>
    <!-- a fine engraved border, the way tags are stamped; nothing written -->
    <ellipse cx="${cx}" cy="${cy}" rx="${rx - 34}" ry="${ry - 30}" fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="2" transform="rotate(${tilt} ${cx} ${cy})"/>
    <ellipse cx="${cx}" cy="${cy}" rx="${rx - 36}" ry="${ry - 32}" fill="none" stroke="#F3EDE4" stroke-opacity="0.07" stroke-width="2" transform="rotate(${tilt} ${cx} ${cy})"/>
    <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="url(#${id}-edge)" stroke-width="3" transform="rotate(${tilt} ${cx} ${cy})"/>
    <!-- key light grazing the face -->
    <g clip-path="url(#${id}-face-clip)">
      <ellipse cx="${cx - 120}" cy="${cy - 110}" rx="220" ry="120" fill="#F3EDE4" opacity="0.07" filter="url(#${id}-blur24)"/>
    </g>
    <!-- the hole at the edge -->
    <ellipse cx="${hx}" cy="${hy}" rx="26" ry="20" fill="#070605" transform="rotate(${tilt} ${hx} ${hy})"/>
    <!-- copper split ring through the hole: drawn under the tag, then again where it shows (outside the tag and through the hole) -->
    <ellipse cx="${rcx}" cy="${rcy}" rx="150" ry="120" fill="url(#${id}-glow)" opacity="0.6"/>
    <g mask="url(#${id}-outside)" filter="url(#${id}-softshadow)">
      <ellipse cx="${rcx}" cy="${rcy}" rx="100" ry="64" fill="none" stroke="url(#${id}-copper)" stroke-width="20" transform="rotate(-30 ${rcx} ${rcy})"/>
      <path d="M${rcx - 92} ${rcy - 16} A100 64 0 0 1 ${rcx - 10} ${rcy - 64}" stroke="#F6DDBE" stroke-opacity="0.85" stroke-width="3" fill="none" stroke-linecap="round" transform="rotate(-30 ${rcx} ${rcy})"/>
    </g>
    <g clip-path="url(#${id}-hole)">
      <ellipse cx="${rcx}" cy="${rcy}" rx="100" ry="64" fill="none" stroke="url(#${id}-copper)" stroke-width="20" transform="rotate(-30 ${rcx} ${rcy})"/>
    </g>
    <!-- shadow of the ring where it rests on the face -->
    <ellipse cx="${hx + 26}" cy="${hy + 20}" rx="44" ry="14" fill="#000" opacity="0.45" filter="url(#${id}-blur8)" transform="rotate(${tilt} ${hx + 26} ${hy + 20})"/>`;
  write(OUT_P, "cover-pawspace-tag.svg", scene(id, PW, PH, body, { keyX: 28, keyY: 18 }));
}

// 11. BONDFIRE — a single copper ember on a dark field, among cold charcoal.
{
  const id = "em";
  const ex = 600, ey = 470, R = 78;
  const lump = (x, y, w, h, rot, op) => `<g transform="rotate(${rot} ${x} ${y})"><path d="M${x - w / 2} ${y} L${x - w / 3} ${y - h / 2} L${x + w / 4} ${y - h / 2.2} L${x + w / 2} ${y - h / 8} L${x + w / 3} ${y + h / 2} L${x - w / 4} ${y + h / 2.1} Z" fill="url(#${id}-stone)"/><path d="M${x - w / 2} ${y} L${x - w / 3} ${y - h / 2} L${x + w / 4} ${y - h / 2.2} L${x + w / 2} ${y - h / 8} L${x + w / 3} ${y + h / 2} L${x - w / 4} ${y + h / 2.1} Z" fill="#000" opacity="${op}"/><path d="M${x - w / 2} ${y} L${x - w / 3} ${y - h / 2} L${x + w / 4} ${y - h / 2.2}" stroke="${x < 600 ? "#C48A64" : "#F3EDE4"}" stroke-opacity="${x < 600 ? 0.45 : 0.14}" stroke-width="2.5" fill="none"/><path d="M${x + w / 4} ${y - h / 2.2} L${x + w / 2} ${y - h / 8}" stroke="${x > 600 ? "#C48A64" : "#F3EDE4"}" stroke-opacity="${x > 600 ? 0.45 : 0.1}" stroke-width="2.5" fill="none"/></g>`;
  const body = `
    ${floor(id, 600, 760, 440, 40, 0.5)}
    <!-- the ember's light on the ground, under the charcoal -->
    <ellipse cx="${ex}" cy="${ey + 110}" rx="340" ry="120" fill="#C48A64" opacity="0.2" filter="url(#${id}-blur24)"/>
    <!-- cold charcoal, scattered and dark; the faces toward the ember catch its light -->
    ${lump(340, 610, 300, 110, -8, 0.45)}
    ${lump(880, 600, 280, 100, 6, 0.5)}
    ${lump(560, 670, 360, 96, 3, 0.35)}
    ${lump(770, 530, 220, 80, -14, 0.55)}
    ${lump(430, 530, 200, 84, 12, 0.55)}
    <ellipse cx="${ex}" cy="${ey + 70}" rx="200" ry="60" fill="#C48A64" opacity="0.22" filter="url(#${id}-blur24)"/>
    <circle cx="${ex}" cy="${ey}" r="300" fill="url(#${id}-glow)" opacity="0.8"/>
    <!-- the ember: lit from inside, charred on the far side -->
    <circle cx="${ex}" cy="${ey}" r="${R + 60}" fill="#E8C49B" opacity="0.3" filter="url(#${id}-blur24)"/>
    <g filter="url(#${id}-softshadow)"><circle cx="${ex}" cy="${ey}" r="${R}" fill="url(#${id}-sphere)"/></g>
    <defs><clipPath id="${id}-ember"><circle cx="${ex}" cy="${ey}" r="${R}"/></clipPath></defs>
    <g clip-path="url(#${id}-ember)"><ellipse cx="${ex + 54}" cy="${ey + 10}" rx="${R * 0.75}" ry="${R * 1.1}" fill="#1A120C" opacity="0.85" filter="url(#${id}-blur8)"/></g>
    <path d="M${ex - 18} ${ey - 52} q -12 30 6 54 q 10 14 4 36" stroke="#4A2A18" stroke-opacity="0.7" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="M${ex - 46} ${ey + 8} q 22 4 36 18" stroke="#4A2A18" stroke-opacity="0.5" stroke-width="3" fill="none" stroke-linecap="round"/>
    <circle cx="${ex - 28}" cy="${ey - 26}" r="16" fill="#FFF4E6" opacity="0.8" filter="url(#${id}-blur8)"/>`;
  write(OUT_P, "cover-bondfire-ember.svg", scene(id, PW, PH, body, { keyX: 30, keyY: 20 }));
}
