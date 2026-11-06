// Generates the Zumetrix cover family (portfolio 4:3 and article 16:9) as SVG.
// One lit physical object per cover; copper is the only accent and carries
// the idea. Run: node scripts/covers/build-covers.mjs
// Case-specific covers live in build-case-covers.mjs (same scene helpers).
import { OUT_P, OUT_A, defs, scene, write, PW, PH, AW, AH } from "./scene.mjs";

// ---------------------------------------------------------------- PORTFOLIO

// 1. PRODUCT RESCUE — kintsugi: a dark stone slab, its fractures mended with copper.
{
  const id = "k";
  const seam = "M560 130 C 600 230, 520 310, 580 400 S 700 540, 650 640 C 630 690, 690 740, 760 790";
  const seam2 = "M580 400 C 640 410, 700 360, 790 340 C 850 326, 880 290, 940 270";
  const seam3 = "M650 640 C 600 660, 520 650, 440 700";
  const body = `
    <ellipse cx="640" cy="820" rx="360" ry="34" fill="#000" opacity="0.6" filter="url(#${id}-blur24)"/>
    <g filter="url(#${id}-shadow)">
      <path d="M320 110 L900 90 L960 790 L380 810 Z" fill="url(#${id}-stone)"/>
    </g>
    <!-- the two pieces read slightly differently in tone -->
    <path d="M320 110 L560 130 C 600 230, 520 310, 580 400 S 700 540, 650 640 C 630 690, 690 740, 760 790 L 380 810 Z" fill="#000" opacity="0.16"/>
    <path d="M580 400 C 640 410, 700 360, 790 340 C 850 326, 880 290, 940 270 L 960 790 L 760 790 C 690 740, 630 690, 650 640 S 520 460, 580 400 Z" fill="#F3EDE4" opacity="0.025"/>
    <path d="M320 110 L900 90" stroke="url(#${id}-edge)" stroke-width="3" fill="none"/>
    <path d="M320 110 L380 810" stroke="#F3EDE4" stroke-opacity="0.08" stroke-width="2" fill="none"/>
    <!-- glow behind the seams -->
    ${[seam, seam2, seam3].map(d => `<path d="${d}" stroke="#C48A64" stroke-opacity="0.5" stroke-width="30" fill="none" stroke-linecap="round" filter="url(#${id}-blur24)"/>`).join("")}
    <!-- metal -->
    <path d="${seam}" stroke="url(#${id}-copperV)" stroke-width="13" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="${seam2}" stroke="url(#${id}-copperV)" stroke-width="9" fill="none" stroke-linecap="round"/>
    <path d="${seam3}" stroke="url(#${id}-copperV)" stroke-width="7" fill="none" stroke-linecap="round"/>
    <path d="${seam}" stroke="#F6DDBE" stroke-opacity="0.8" stroke-width="2.5" fill="none" stroke-linecap="round" transform="translate(-3,-3)"/>
    <path d="${seam2}" stroke="#F6DDBE" stroke-opacity="0.65" stroke-width="1.8" fill="none" stroke-linecap="round" transform="translate(-2,-3)"/>
    <path d="${seam3}" stroke="#F6DDBE" stroke-opacity="0.55" stroke-width="1.5" fill="none" stroke-linecap="round" transform="translate(-2,-2)"/>
    <circle cx="582" cy="402" r="9" fill="url(#${id}-sphere)"/>
    <circle cx="651" cy="641" r="7" fill="url(#${id}-sphere)"/>
    <circle cx="536" cy="262" r="4" fill="#E8C49B" opacity="0.9"/>`;
  write(OUT_P, "cover-product-rescue.svg", scene(id, PW, PH, body, { keyX: 35, keyY: 18 }));
}

// 2. SAAS PRODUCT — keystone: a dark arch held by one copper stone.
{
  const id = "s";
  // Arch of voussoirs. Center at (600,560), inner radius 220, outer 330.
  const cx = 600, cy = 540, r1 = 230, r2 = 350;
  const n = 9; // voussoirs
  const a0 = Math.PI, a1 = 0; // from left to right across the top
  const seg = [];
  for (let i = 0; i < n; i++) {
    const t0 = a0 + (a1 - a0) * (i / n), t1 = a0 + (a1 - a0) * ((i + 1) / n);
    const gap = 0.012;
    const s0 = t0 + gap, s1 = t1 - gap;
    const p = (r, t) => `${(cx + r * Math.cos(t)).toFixed(1)} ${(cy - r * Math.sin(t)).toFixed(1)}`;
    const d = `M ${p(r1, s0)} A ${r1} ${r1} 0 0 0 ${p(r1, s1)} L ${p(r2, s1)} A ${r2} ${r2} 0 0 1 ${p(r2, s0)} Z`;
    const isKey = i === Math.floor(n / 2);
    seg.push({ d, isKey });
  }
  const body = `
    <ellipse cx="600" cy="790" rx="420" ry="36" fill="#000" opacity="0.5" filter="url(#${id}-blur24)"/>
    <!-- piers -->
    <g filter="url(#${id}-softshadow)">
      <rect x="250" y="540" width="120" height="250" fill="url(#${id}-stone2)"/>
      <rect x="830" y="540" width="120" height="250" fill="url(#${id}-stone2)"/>
    </g>
    <rect x="250" y="540" width="120" height="2" fill="#F3EDE4" opacity="0.08"/>
    <rect x="830" y="540" width="120" height="2" fill="#F3EDE4" opacity="0.08"/>
    <!-- glow behind keystone -->
    <circle cx="600" cy="240" r="150" fill="url(#${id}-glow)"/>
    <g filter="url(#${id}-softshadow)">
      ${seg.filter(s => !s.isKey).map(s => `<path d="${s.d}" fill="url(#${id}-stone)"/>`).join("\n      ")}
    </g>
    ${seg.filter(s => !s.isKey).map(s => `<path d="${s.d}" fill="none" stroke="url(#${id}-edge)" stroke-width="1.5"/>`).join("\n    ")}
    <!-- keystone, slightly proud of the arch -->
    <g transform="translate(0,-10)" filter="url(#${id}-shadow)">
      ${seg.filter(s => s.isKey).map(s => `<path d="${s.d}" fill="url(#${id}-copper)"/>`).join("")}
    </g>
    ${seg.filter(s => s.isKey).map(s => `<path d="${s.d}" transform="translate(0,-10)" fill="none" stroke="#F6DDBE" stroke-opacity="0.7" stroke-width="2"/>`).join("")}
    <!-- light spill on the stones beside the keystone -->
    <circle cx="600" cy="270" r="90" fill="#E8C49B" opacity="0.10" filter="url(#${id}-blur24)"/>`;
  write(OUT_P, "cover-saas-product.svg", scene(id, PW, PH, body, { keyX: 50, keyY: 10 }));
}

// 3. AUTOMATION — Newton's cradle, one copper sphere mid-swing.
{
  const id = "n";
  const R = 58, baseY = 560;
  const xs = [430, 546, 662, 778];
  const strings = (x, y) => `<line x1="${x - 2}" y1="150" x2="${x}" y2="${y - R + 4}" stroke="#F3EDE4" stroke-opacity="0.22" stroke-width="1.6"/><line x1="${x + 2}" y1="150" x2="${x}" y2="${y - R + 4}" stroke="#F3EDE4" stroke-opacity="0.12" stroke-width="1.2"/>`;
  // swung sphere: pivot at (894,150), string length 410, angle 38deg
  const L = 410, ang = (38 * Math.PI) / 180, px = 894, py = 150;
  const sx = px + L * Math.sin(ang), sy = py + L * Math.cos(ang);
  const body = `
    <!-- bar -->
    <g filter="url(#${id}-softshadow)">
      <rect x="300" y="128" width="640" height="22" rx="11" fill="url(#${id}-stone2)"/>
    </g>
    <rect x="300" y="128" width="640" height="2" rx="1" fill="#F3EDE4" opacity="0.14"/>
    <!-- resting spheres -->
    ${xs.map(x => strings(x, baseY)).join("")}
    <line x1="${px - 2}" y1="150" x2="${sx.toFixed(1)}" y2="${(sy - R * 0.9).toFixed(1)}" stroke="#F3EDE4" stroke-opacity="0.26" stroke-width="1.6"/>
    <ellipse cx="600" cy="${baseY + R + 90}" rx="300" ry="26" fill="#000" opacity="0.5" filter="url(#${id}-blur24)"/>
    <g filter="url(#${id}-shadow)">
      ${xs.map(x => `<circle cx="${x}" cy="${baseY}" r="${R}" fill="url(#${id}-darkSphere)"/>`).join("")}
    </g>
    ${xs.map(x => `<ellipse cx="${x - 18}" cy="${baseY - 24}" rx="14" ry="9" fill="#F3EDE4" opacity="0.10" filter="url(#${id}-blur8)"/>`).join("")}
    <!-- copper reflection on the nearest dark sphere -->
    <ellipse cx="${xs[3] + 30}" cy="${baseY + 6}" rx="16" ry="30" fill="#C48A64" opacity="0.28" filter="url(#${id}-blur8)"/>
    <!-- the live sphere -->
    <circle cx="${sx.toFixed(1)}" cy="${sy.toFixed(1)}" r="110" fill="url(#${id}-glow)"/>
    <g filter="url(#${id}-shadow)">
      <circle cx="${sx.toFixed(1)}" cy="${sy.toFixed(1)}" r="${R}" fill="url(#${id}-sphere)"/>
    </g>
    <ellipse cx="${(sx - 20).toFixed(1)}" cy="${(sy - 26).toFixed(1)}" rx="16" ry="10" fill="#FFF4E6" opacity="0.7" filter="url(#${id}-blur8)"/>
    <!-- motion: faint ghost of where it was -->
    <circle cx="${(px + L * Math.sin(ang * 0.55)).toFixed(1)}" cy="${(py + L * Math.cos(ang * 0.55)).toFixed(1)}" r="${R}" fill="#C48A64" opacity="0.08"/>`;
  write(OUT_P, "cover-automation.svg", scene(id, PW, PH, body, { keyX: 70, keyY: 25 }));
}

// 4. WEB APPLICATION — a ledger plate: dark slab, rows cut into it, one copper row raised and lit.
{
  const id = "w";
  const rows = [250, 330, 410, 490, 570, 650];
  const body = `
    <ellipse cx="600" cy="800" rx="400" ry="34" fill="#000" opacity="0.5" filter="url(#${id}-blur24)"/>
    <g filter="url(#${id}-shadow)">
      <rect x="260" y="180" width="680" height="560" rx="14" fill="url(#${id}-stone)"/>
    </g>
    <rect x="260" y="180" width="680" height="560" rx="14" fill="none" stroke="url(#${id}-edge)" stroke-width="2"/>
    <!-- grooves -->
    ${rows.filter(y => y !== 410).map(y => `
      <rect x="300" y="${y}" width="600" height="44" rx="6" fill="#0B0A09" opacity="0.75"/>
      <rect x="300" y="${y + 43}" width="600" height="1.5" fill="#F3EDE4" opacity="0.07"/>
      <rect x="318" y="${y + 16}" width="${120 + ((y * 7) % 160)}" height="10" rx="5" fill="#F3EDE4" opacity="0.06"/>
      <rect x="${640 + ((y * 3) % 60)}" y="${y + 16}" width="70" height="10" rx="5" fill="#F3EDE4" opacity="0.05"/>`).join("")}
    <!-- the raised copper row -->
    <rect x="300" y="400" width="600" height="64" rx="8" fill="#C48A64" opacity="0.35" filter="url(#${id}-blur24)"/>
    <g filter="url(#${id}-shadow)">
      <rect x="292" y="396" width="616" height="58" rx="8" fill="url(#${id}-copper)"/>
    </g>
    <rect x="292" y="396" width="616" height="2" rx="1" fill="#F6DDBE" opacity="0.8"/>
    <rect x="316" y="418" width="150" height="12" rx="6" fill="#2A1A10" opacity="0.55"/>
    <rect x="700" y="418" width="60" height="12" rx="6" fill="#2A1A10" opacity="0.45"/>
    <rect x="800" y="418" width="84" height="12" rx="6" fill="#2A1A10" opacity="0.45"/>`;
  write(OUT_P, "cover-web-application.svg", scene(id, PW, PH, body));
}

// 5. MOBILE — a smooth dark stone that fits a hand, with a copper rim of light.
{
  const id = "m";
  const body = `
    <ellipse cx="600" cy="760" rx="260" ry="40" fill="#000" opacity="0.6" filter="url(#${id}-blur24)"/>
    <ellipse cx="600" cy="470" rx="300" ry="300" fill="url(#${id}-glow)" opacity="0.6"/>
    <g filter="url(#${id}-shadow)">
      <path d="M600 190 C 760 190, 830 330, 810 480 C 792 630, 700 730, 580 730 C 440 730, 370 610, 380 460 C 390 300, 470 190, 600 190 Z" fill="url(#${id}-darkSphere)"/>
    </g>
    <!-- copper rim light along the lower-right edge -->
    <path d="M808 440 C 800 600, 706 724, 582 728" stroke="url(#${id}-copperV)" stroke-width="7" fill="none" stroke-linecap="round" opacity="0.95"/>
    <path d="M808 440 C 800 600, 706 724, 582 728" stroke="#C48A64" stroke-width="26" fill="none" stroke-linecap="round" opacity="0.35" filter="url(#${id}-blur24)"/>
    <!-- key light on the upper-left shoulder -->
    <ellipse cx="500" cy="300" rx="90" ry="60" fill="#F3EDE4" opacity="0.10" filter="url(#${id}-blur24)"/>
    <ellipse cx="520" cy="290" rx="34" ry="20" fill="#F3EDE4" opacity="0.18" filter="url(#${id}-blur8)"/>
    <!-- a single copper dot: the one thing it does -->
    <circle cx="600" cy="470" r="14" fill="url(#${id}-sphere)"/>
    <circle cx="600" cy="470" r="40" fill="#E8C49B" opacity="0.16" filter="url(#${id}-blur24)"/>`;
  write(OUT_P, "cover-mobile-application.svg", scene(id, PW, PH, body, { keyX: 35, keyY: 25 }));
}

// 6. INTERNAL SYSTEM — nested dark boxes, one copper inner edge.
{
  const id = "i";
  const box = (x, y, w, h, d) => `<path d="M${x} ${y} L${x + w} ${y} L${x + w + d} ${y - d * 0.6} L${x + d} ${y - d * 0.6} Z" fill="#F3EDE4" opacity="0.06"/>
     <path d="M${x + w} ${y} L${x + w + d} ${y - d * 0.6} L${x + w + d} ${y + h - d * 0.6} L${x + w} ${y + h} Z" fill="#000" opacity="0.35"/>
     <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#${id}-stone)"/>`;
  const body = `
    <ellipse cx="600" cy="800" rx="380" ry="34" fill="#000" opacity="0.5" filter="url(#${id}-blur24)"/>
    <g filter="url(#${id}-shadow)">${box(260, 260, 560, 460, 70)}</g>
    <rect x="260" y="260" width="560" height="460" fill="none" stroke="url(#${id}-edge)" stroke-width="2"/>
    <!-- opening -->
    <rect x="330" y="330" width="420" height="320" fill="#070605"/>
    <g filter="url(#${id}-softshadow)">${box(360, 380, 340, 240, 40)}</g>
    <rect x="410" y="430" width="240" height="140" fill="#070605"/>
    <!-- the copper inner edge: the one record that matters -->
    <rect x="410" y="430" width="240" height="140" fill="none" stroke="url(#${id}-copper)" stroke-width="6"/>
    <rect x="410" y="430" width="240" height="140" fill="#C48A64" opacity="0.18"/>
    <rect x="400" y="420" width="260" height="160" fill="none" stroke="#C48A64" stroke-opacity="0.5" stroke-width="20" filter="url(#${id}-blur24)"/>
    <rect x="410" y="430" width="240" height="2" fill="#F6DDBE" opacity="0.7"/>`;
  write(OUT_P, "cover-internal-system.svg", scene(id, PW, PH, body));
}

// ------------------------------------------------------------------ ARTICLES

// A. REPAIR OR REBUILD — one bowl, half mended in copper, half still fractured.
{
  const id = "rr";
  const body = `
    <ellipse cx="800" cy="790" rx="430" ry="42" fill="#000" opacity="0.6" filter="url(#${id}-blur24)"/>
    <ellipse cx="820" cy="520" rx="420" ry="360" fill="url(#${id}-glow)" opacity="0.55"/>
    <g filter="url(#${id}-shadow)">
      <path d="M370 250 C 380 560, 560 760, 800 760 C 1040 760, 1220 560, 1230 250 Z" fill="url(#${id}-stone)"/>
      <ellipse cx="800" cy="250" rx="430" ry="72" fill="#221D19"/>
    </g>
    <!-- rim: lit on the key side -->
    <ellipse cx="800" cy="250" rx="430" ry="72" fill="none" stroke="#F3EDE4" stroke-opacity="0.34" stroke-width="4"/>
    <path d="M372 250 C 420 190, 620 178, 800 178" stroke="#F3EDE4" stroke-opacity="0.45" stroke-width="5" fill="none" stroke-linecap="round"/>
    <ellipse cx="800" cy="250" rx="392" ry="54" fill="#090807"/>
    <path d="M800 304 C 1000 304, 1160 280, 1190 250" stroke="#F3EDE4" stroke-opacity="0.08" stroke-width="3" fill="none"/>
    <!-- open fractures on the shadow side -->
    <path d="M590 316 C 616 430, 560 530, 606 720" stroke="#050403" stroke-width="7" fill="none" stroke-linecap="round"/>
    <path d="M672 322 C 650 420, 714 520, 690 738" stroke="#050403" stroke-width="5" fill="none" stroke-linecap="round"/>
    <path d="M606 720 C 640 700, 660 712, 690 738" stroke="#050403" stroke-width="4" fill="none"/>
    <!-- mended fractures on the lit side: the brightest thing in the frame -->
    <path d="M980 318 C 950 430, 1030 520, 990 730" stroke="#C48A64" stroke-width="34" fill="none" stroke-linecap="round" opacity="0.5" filter="url(#${id}-blur24)"/>
    <path d="M980 318 C 950 430, 1030 520, 990 730" stroke="url(#${id}-copperV)" stroke-width="11" fill="none" stroke-linecap="round"/>
    <path d="M1070 306 C 1100 400, 1040 480, 1090 600" stroke="url(#${id}-copperV)" stroke-width="7" fill="none" stroke-linecap="round"/>
    <path d="M1030 470 C 1050 476, 1066 468, 1076 450" stroke="url(#${id}-copperV)" stroke-width="5" fill="none" stroke-linecap="round"/>
    <path d="M980 318 C 950 430, 1030 520, 990 730" stroke="#FFF1DF" stroke-opacity="0.9" stroke-width="3" fill="none" stroke-linecap="round" transform="translate(-3,-2)"/>
    <path d="M1070 306 C 1100 400, 1040 480, 1090 600" stroke="#FFF1DF" stroke-opacity="0.7" stroke-width="2" fill="none" transform="translate(-2,-2)"/>
    <circle cx="1032" cy="472" r="7" fill="url(#${id}-sphere)"/>`;
  write(OUT_A, "cover-repair-or-rebuild.svg", scene(id, AW, AH, body, { keyX: 62, keyY: 18 }));
}

// B. WHAT BELONGS IN V1 — a block of dark stone; everything carved away except one precise copper form.
{
  const id = "v1";
  const body = `
    <ellipse cx="800" cy="770" rx="440" ry="36" fill="#000" opacity="0.5" filter="url(#${id}-blur24)"/>
    <g filter="url(#${id}-shadow)">
      <rect x="380" y="200" width="840" height="540" rx="10" fill="url(#${id}-stone)"/>
    </g>
    <rect x="380" y="200" width="840" height="540" rx="10" fill="none" stroke="url(#${id}-edge)" stroke-width="2"/>
    <!-- the carved field: a large shallow recess with tool texture -->
    <rect x="430" y="250" width="740" height="440" rx="8" fill="#000" opacity="0.28"/>
    ${Array.from({length: 11}).map((_, i) => `<rect x="${450 + i * 66}" y="262" width="34" height="416" rx="4" fill="#F3EDE4" opacity="${i % 2 ? 0.018 : 0.035}"/>`).join("")}
    <!-- the cavity around the kept form -->
    <rect x="660" y="360" width="280" height="220" rx="10" fill="#060504"/>
    <rect x="660" y="578" width="280" height="2" fill="#F3EDE4" opacity="0.08"/>
    <!-- the one shape that remains -->
    <rect x="696" y="396" width="208" height="150" rx="8" fill="#C48A64" opacity="0.4" filter="url(#${id}-blur24)"/>
    <g filter="url(#${id}-shadow)"><rect x="700" y="400" width="200" height="142" rx="8" fill="url(#${id}-copper)"/></g>
    <rect x="700" y="400" width="200" height="3" rx="1" fill="#F6DDBE" opacity="0.85"/>
    <rect x="700" y="400" width="3" height="142" rx="1" fill="#F6DDBE" opacity="0.4"/>`;
  write(OUT_A, "cover-what-belongs-in-v1.svg", scene(id, AW, AH, body));
}

// C. RELIABLE AUTOMATION / WHEN AUTOMATION IS WRONG — a copper plumb bob, perfectly still, over a dark floor.
{
  const id = "pb";
  const body = `
    <line x1="800" y1="0" x2="800" y2="330" stroke="#F3EDE4" stroke-opacity="0.22" stroke-width="2"/>
    <ellipse cx="800" cy="760" rx="150" ry="20" fill="#000" opacity="0.6" filter="url(#${id}-blur24)"/>
    <circle cx="800" cy="480" r="200" fill="url(#${id}-glow)" opacity="0.7"/>
    <g filter="url(#${id}-shadow)">
      <path d="M800 330 L 760 390 L 760 470 C 760 560, 800 650, 800 690 C 800 650, 840 560, 840 470 L 840 390 Z" fill="url(#${id}-copperV)"/>
      <circle cx="800" cy="360" r="20" fill="url(#${id}-sphere)"/>
    </g>
    <path d="M778 400 L 778 470 C 778 540, 796 620, 800 660" stroke="#F6DDBE" stroke-opacity="0.55" stroke-width="3" fill="none" stroke-linecap="round"/>
    <!-- the floor line it points to -->
    <line x1="520" y1="740" x2="1080" y2="740" stroke="#F3EDE4" stroke-opacity="0.14" stroke-width="2"/>
    <circle cx="800" cy="740" r="6" fill="#E8C49B" opacity="0.9"/>
    <circle cx="800" cy="740" r="22" fill="#E8C49B" opacity="0.2" filter="url(#${id}-blur8)"/>`;
  write(OUT_A, "cover-reliable-automation.svg", scene(id, AW, AH, body, { keyX: 40, keyY: 15 }));
}

// D. TAKING OVER CODE / WHY PROJECTS GET STUCK — a heavy dark rope tied in one overhand knot; beyond it the rope runs on in copper.
{
  const id = "kn";
  const W = 58;
  // Overhand knot, drawn as three segments with explicit over/under:
  //   lead  -> comes in from the left, dives under the loop
  //   loop  -> circles up and over, back down through the eye
  //   exit  -> emerges on the right and becomes copper
  const lead = "M60 470 C 280 464, 470 440, 620 470 C 690 485, 740 520, 780 540";
  const loopA = "M780 540 C 850 580, 930 540, 920 460 C 912 395, 840 370, 790 405";          // rises, goes over
  const loopB = "M790 405 C 740 440, 760 520, 840 520";                                        // passes under lead… (drawn beneath)
  const exit  = "M840 520 C 900 520, 960 480, 1040 470 C 1200 450, 1380 470, 1560 440";
  const stroke = (d, w, col, extra = "") => `<path d="${d}" stroke="${col}" stroke-width="${w}" fill="none" stroke-linecap="round" stroke-linejoin="round" ${extra}/>`;
  const hi = (d, dx, dy, op, w = 7) => stroke(d, w, "#F3EDE4", `stroke-opacity="${op}" transform="translate(${dx},${dy})"`);
  const body = `
    <ellipse cx="820" cy="640" rx="640" ry="40" fill="#000" opacity="0.5" filter="url(#${id}-blur24)"/>
    <!-- copper glow, under everything so it reads as light the exit strand gives off -->
    ${stroke(exit, W + 70, "#C48A64", 'opacity="0.22" filter="url(#' + id + '-blur24)"')}
    <!-- UNDER layer: loopB passes beneath the lead -->
    <g filter="url(#${id}-softshadow)">${stroke(loopB, W, "#1F1A17")}</g>
    ${hi(loopB, -6, -14, 0.06, 5)}
    <!-- lead strand -->
    ${stroke(lead, W + 14, "#0B0A09")}
    <g filter="url(#${id}-shadow)">${stroke(lead, W, "#2A241F")}</g>
    ${hi(lead, 0, -17, 0.13)}
    <!-- OVER layer: loopA crosses over the lead -->
    ${stroke(loopA, W + 14, "#0B0A09")}
    <g filter="url(#${id}-shadow)">${stroke(loopA, W, "#2E2823")}</g>
    ${hi(loopA, -8, -15, 0.15)}
    <!-- exit strand in copper, on top where it leaves the eye -->
    ${stroke(exit, W + 14, "#0B0A09")}
    <g filter="url(#${id}-shadow)">${stroke(exit, W, "url(#" + id + "-copperV)")}</g>
    ${stroke(exit, 9, "#F6DDBE", 'stroke-opacity="0.7" transform="translate(0,-17)"')}`;
  write(OUT_A, "cover-taking-over-code.svg", scene(id, AW, AH, body, { keyX: 55, keyY: 20 }));
}

// E. FIELD NOTES — a closed dark notebook, pages lit at the edge, one copper ribbon marking the place.
{
  const id = "fn";
  const body = `
    <ellipse cx="800" cy="720" rx="420" ry="40" fill="#000" opacity="0.55" filter="url(#${id}-blur24)"/>
    <!-- page block -->
    <g filter="url(#${id}-shadow)">
      <path d="M520 300 L1100 300 L1100 650 L520 650 Z" fill="#1A1613"/>
    </g>
    ${Array.from({length: 18}).map((_, i) => `<rect x="1100" y="${304 + i * 19}" width="${14 - (i % 3) * 3}" height="1.6" fill="#F3EDE4" opacity="${0.22 - (i % 4) * 0.03}"/>`).join("")}
    <rect x="520" y="650" width="580" height="6" fill="#F3EDE4" opacity="0.07"/>
    <!-- cover, slightly larger than the pages -->
    <g filter="url(#${id}-softshadow)">
      <path d="M500 280 L1090 280 L1090 640 L500 640 Z" fill="url(#${id}-stone)"/>
    </g>
    <path d="M500 280 L1090 280" stroke="url(#${id}-edge)" stroke-width="3"/>
    <rect x="500" y="280" width="36" height="360" fill="#000" opacity="0.28"/>
    <rect x="536" y="280" width="2" height="360" fill="#F3EDE4" opacity="0.06"/>
    <!-- copper ribbon slipping out of the pages -->
    <path d="M980 640 C 985 700, 1010 760, 1060 790" stroke="#C48A64" stroke-width="40" fill="none" stroke-linecap="round" opacity="0.3" filter="url(#${id}-blur24)"/>
    <g filter="url(#${id}-shadow)">
      <path d="M970 300 L 1000 300 L 1000 650 C 1000 700, 1030 750, 1070 780 L 1046 792 C 1000 756, 968 706, 970 650 Z" fill="url(#${id}-copperV)"/>
    </g>
    <path d="M972 302 L 972 650" stroke="#F6DDBE" stroke-opacity="0.6" stroke-width="2"/>`;
  write(OUT_A, "cover-field-notes.svg", scene(id, AW, AH, body, { keyX: 35, keyY: 20 }));
}

// F. DEVELOPMENT GUIDES — a maker's try-square on a dark bench: copper blade, dark steel stock.
{
  const id = "dg";
  const body = `
    <!-- bench -->
    <ellipse cx="800" cy="800" rx="520" ry="40" fill="#000" opacity="0.55" filter="url(#${id}-blur24)"/>
    <g filter="url(#${id}-shadow)">
      <path d="M300 470 L1300 470 L1250 760 L350 760 Z" fill="url(#${id}-stone)"/>
    </g>
    <path d="M300 470 L1300 470" stroke="url(#${id}-edge)" stroke-width="3"/>
    <!-- soft shadow the square throws on the bench -->
    <path d="M520 300 L 520 470 L 1330 470 L 1330 500 L 490 500 Z" fill="#000" opacity="0.5" filter="url(#${id}-blur24)" transform="translate(26,34)"/>
    <!-- copper glow -->
    <path d="M560 250 L 560 460 L 1320 460" stroke="#C48A64" stroke-width="70" fill="none" opacity="0.22" filter="url(#${id}-blur24)"/>
    <!-- dark steel stock (the thick handle) -->
    <g filter="url(#${id}-shadow)">
      <rect x="482" y="200" width="82" height="300" rx="8" fill="url(#${id}-darkSphere)"/>
    </g>
    <rect x="482" y="200" width="82" height="300" rx="8" fill="none" stroke="url(#${id}-edge)" stroke-width="2"/>
    <rect x="496" y="214" width="6" height="272" rx="3" fill="#F3EDE4" opacity="0.10"/>
    <circle cx="523" cy="246" r="9" fill="#0A0908"/><circle cx="523" cy="246" r="4" fill="url(#${id}-copper)"/>
    <circle cx="523" cy="454" r="9" fill="#0A0908"/><circle cx="523" cy="454" r="4" fill="url(#${id}-copper)"/>
    <!-- copper blade -->
    <g filter="url(#${id}-shadow)">
      <rect x="560" y="428" width="760" height="44" rx="4" fill="url(#${id}-copper)"/>
    </g>
    <rect x="560" y="428" width="760" height="4" rx="2" fill="#F6DDBE" opacity="0.85"/>
    <rect x="560" y="468" width="760" height="3" fill="#5A3A26" opacity="0.7"/>
    ${Array.from({length: 19}).map((_, i) => `<rect x="${600 + i * 38}" y="${432}" width="2.5" height="${i % 2 ? 10 : 18}" fill="#3A2416" opacity="0.8"/>`).join("")}
    <!-- the blade's reflection on the bench edge -->
    <rect x="560" y="474" width="760" height="10" fill="#C48A64" opacity="0.12" filter="url(#${id}-blur8)"/>`;
  write(OUT_A, "cover-development-guides.svg", scene(id, AW, AH, body, { keyX: 35, keyY: 18 }));
}

