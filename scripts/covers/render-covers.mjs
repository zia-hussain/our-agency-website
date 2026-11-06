// Renders raster siblings for the cover family and the share images that use
// them. Run after build-covers.mjs: node scripts/covers/render-covers.mjs
//   public/*/covers/<name>-800.webp, -1600.webp     (srcSet rasters)
//   public/*/covers/<name>-og.png                    (category-level share image)
//   public/og/portfolio-<slug>.png                   (per case study)
//   public/og/articles-<slug>.png                    (per article)
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from "node:fs";
import { dirname, join, basename } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "../..");
const PUB = join(ROOT, "public");
const LOGO = "data:image/png;base64," + readFileSync(join(PUB, "logo/Logo Icon.png")).toString("base64");

const read = (p) => readFileSync(p, "utf8");
const dataUri = (svgPath) => "data:image/svg+xml;base64," + Buffer.from(read(svgPath)).toString("base64");

// --- which cover each page uses (mirrors src/data/covers.ts; kept in sync by hand)
const projectOverrides = {
  "learning-platform-saas-stabilization": "product-rescue", "bondfire-event-booking-app": "product-rescue",
  "floating-stone-ranch-processor-intake-engine": "automation", "zumetrix-labs-internal-automation-stack": "internal-system",
  "forlag-publishing-sales-inventory-dashboard": "web-application", "hostel-management-system-mern": "internal-system",
  "skill-x-swap-mvp": "mobile-application", "hjelpna-handyman-marketplace": "web-application",
  "utility-bill-deal-finder": "saas-product", "ifyify-ai-personal-branding": "saas-product",
};
const articleOverrides = {
  "should-you-rescue-or-rebuild-your-saas": "repair-or-rebuild", "signs-your-saas-needs-stabilization-not-rebuild": "repair-or-rebuild",
  "build-saas-mvp-in-30-days": "what-belongs-in-v1", "decision-room-001-liftly-sequencing": "what-belongs-in-v1",
  "when-is-ai-automation-the-wrong-choice": "reliable-automation", "ai-automation-business-growth": "reliable-automation",
  "no-code-automation-zapier-make-n8n": "reliable-automation", "taking-over-a-saas-from-another-dev-team": "taking-over-code",
  "why-software-projects-get-stuck": "taking-over-code", "what-we-learned-building-50-projects": "field-notes",
  "mobile-app-development-flutter-react-native": "field-notes", "react-nodejs-best-practices-2024": "development-guides",
  "firebase-complete-guide-pakistani-developers": "development-guides",
};
const projectKey = (p) => projectOverrides[p.slug] || (p.type === "rescue" ? "product-rescue" : p.type === "automation" ? "automation" : p.type === "mobile" ? "mobile-application" : p.type === "enterprise" ? "internal-system" : "saas-product");

// --- read titles from the data files without importing TS
const projectsSrc = read(join(ROOT, "src/data/projects.ts"));
const projects = [...projectsSrc.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => {
  const seg = projectsSrc.slice(m.index, m.index + 3000);
  const title = (seg.match(/\btitle:\s*"([^"]+)"/) || [])[1] || m[1];
  const type = (seg.match(/\btype:\s*"([^"]+)"/) || [])[1];
  const cat = (seg.match(/\bcategory:\s*"([^"]+)"/) || [])[1] || "";
  const client = (seg.match(/client:\s*\{\s*name:\s*"([^"]+)"/) || [])[1] || "";
  return { slug: m[1], title, type, cat, client };
}).filter((p) => p.slug !== "fast-track-usa-app-rescue"); // keeps its hand-authored OG
const articlesSrc = read(join(ROOT, "src/data/articles.js"));
const articles = [...articlesSrc.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => {
  const seg = articlesSrc.slice(m.index, m.index + 2500);
  const title = (seg.match(/\btitle:\s*"([^"]+)"/) || [])[1] || m[1];
  const cat = (seg.match(/\bcategory:\s*"([^"]+)"/) || [])[1] || "";
  return { slug: m[1], title, cat };
});

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

const ogHtml = ({ art, eyebrow, title, footer }) => `<!doctype html><html><head><meta charset="utf-8"><style>
  html,body{margin:0;width:1200px;height:630px;background:#0C0C0C;font-family:Inter,ui-sans-serif,system-ui,sans-serif;-webkit-font-smoothing:antialiased;overflow:hidden}
  .art{position:absolute;right:-60px;top:-40px;width:760px;height:710px;background:url("${art}") center/cover no-repeat;}
  .fade{position:absolute;inset:0;background:linear-gradient(90deg,#0C0C0C 0%,#0C0C0C 38%,rgba(12,12,12,0.86) 52%,rgba(12,12,12,0.0) 78%)}
  .vig{position:absolute;inset:0;background:radial-gradient(ellipse 90% 80% at 50% 30%,transparent 55%,rgba(0,0,0,.45) 100%)}
  .wrap{position:absolute;inset:0;padding:56px 64px;display:flex;flex-direction:column;justify-content:space-between}
  .brand{display:flex;align-items:center;gap:12px;color:#EDEDED;font-weight:600;font-size:22px;letter-spacing:-.02em}
  .brand img{width:30px;height:30px}
  .brand span{color:#C48A64;font-weight:500}
  .eyebrow{color:#C48A64;font-size:15px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;margin-bottom:18px}
  h1{margin:0;color:#F3EDE4;font-size:${title.length > 60 ? 48 : title.length > 40 ? 54 : 62}px;line-height:1.06;letter-spacing:-.03em;font-weight:700;max-width:640px}
  .rule{width:72px;height:3px;background:#C48A64;border-radius:2px;margin:26px 0 0}
  .foot{color:#8B847B;font-size:17px}
</style></head><body>
  <div class="art"></div><div class="fade"></div><div class="vig"></div>
  <div class="wrap">
    <div class="brand"><img src="${LOGO}"> Zumetrix <span>Labs</span></div>
    <div><div class="eyebrow">${esc(eyebrow)}</div><h1>${esc(title)}</h1><div class="rule"></div></div>
    <div class="foot">${esc(footer)}</div>
  </div>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });

async function rasterise(svgPath, outBase) {
  for (const w of [800, 1600]) {
    const svg = read(svgPath);
    const [, vbW, vbH] = svg.match(/viewBox="0 0 (\d+) (\d+)"/);
    const h = Math.round((w * vbH) / vbW);
    const p = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
    await p.setContent(`<html><body style="margin:0;background:#0C0C0C"><img src="${dataUri(svgPath)}" width="${w}" height="${h}" style="display:block"></body></html>`);
    await p.waitForTimeout(150);
    // PNG here; scripts/covers/to-webp.py converts to WebP and removes the PNG.
    await p.screenshot({ path: `${outBase}-${w}.png` });
    await p.close();
  }
}

async function og(outPath, opts) {
  await page.setContent(ogHtml(opts));
  await page.waitForTimeout(200);
  await page.screenshot({ path: outPath, type: "png" });
  console.log("og", basename(outPath));
}

mkdirSync(join(PUB, "og"), { recursive: true });
const families = [
  { dir: join(PUB, "project_images/covers"), eyebrowFor: (k) => ({ "product-rescue": "Product rescue", "saas-product": "SaaS product", automation: "Automation", "web-application": "Web application", "mobile-application": "Mobile application", "internal-system": "Internal system" }[k]) },
  { dir: join(PUB, "article_images/covers"), eyebrowFor: () => "Field notes" },
];
const coverArt = {};
for (const fam of families) {
  for (const f of readdirSync(fam.dir).filter((n) => n.endsWith(".svg"))) {
    const key = f.replace(/^cover-/, "").replace(/\.svg$/, "");
    const svgPath = join(fam.dir, f);
    coverArt[key] = dataUri(svgPath);
    await rasterise(svgPath, join(fam.dir, `cover-${key}`));
    await og(join(fam.dir, `cover-${key}-og.png`), { art: coverArt[key], eyebrow: fam.eyebrowFor(key), title: "Zumetrix Labs", footer: "zumetrix.com" });
    console.log("raster", key);
  }
}
for (const p of projects) {
  const k = projectKey(p);
  await og(join(PUB, "og", `portfolio-${p.slug}.png`), { art: coverArt[k], eyebrow: `Case study · ${p.cat}`, title: p.title.replace(/\s[–—-]\s.*$/, ""), footer: p.client ? `${p.client} · zumetrix.com/portfolio` : "zumetrix.com/portfolio" });
}
for (const a of articles) {
  const k = articleOverrides[a.slug] || "field-notes";
  await og(join(PUB, "og", `articles-${a.slug}.png`), { art: coverArt[k], eyebrow: a.cat || "Article", title: a.title, footer: "Zia Hussain & Omer Gillani · zumetrix.com/articles" });
}
await browser.close();
console.log("done");
