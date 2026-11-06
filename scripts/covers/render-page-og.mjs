// Share images for pages that have no cover of their own (today: /start).
// node scripts/covers/render-page-og.mjs
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
const ROOT = join(dirname(fileURLToPath(import.meta.url)), "../..");
const PUB = join(ROOT, "public");
const b64 = (p, mime) => `data:${mime};base64,` + readFileSync(join(PUB, p)).toString("base64");
const LOGO = b64("logo/Logo Icon.png", "image/png");
const pages = [
  { file: "page-start.png", eyebrow: "Start here", title: "Three ways in.", sub: "A product that's stuck · Nothing built yet · A workflow run by hand", foot: "zumetrix.com/start", art: b64("project_images/covers/cover-saas-product.svg", "image/svg+xml") },
];
const html = (p) => `<!doctype html><html><head><meta charset="utf-8"><style>
html,body{margin:0;width:1200px;height:630px;background:#0C0C0C;font-family:Inter,ui-sans-serif,system-ui,sans-serif;-webkit-font-smoothing:antialiased;overflow:hidden}
.art{position:absolute;right:-60px;top:0;width:620px;height:630px;background:url("${p.art}") center/cover no-repeat;opacity:.9}
.fade{position:absolute;inset:0;background:linear-gradient(90deg,#0C0C0C 0%,#0C0C0C 46%,rgba(12,12,12,.8) 58%,rgba(12,12,12,0) 80%)}
.wrap{position:absolute;inset:0;padding:56px 64px;display:flex;flex-direction:column;justify-content:space-between}
.brand{display:flex;align-items:center;gap:12px;color:#EDEDED;font-weight:600;font-size:22px;letter-spacing:-.02em}.brand img{width:30px;height:30px}.brand span{color:#C48A64;font-weight:500}
.eyebrow{color:#C48A64;font-size:15px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;margin-bottom:18px}
h1{margin:0;color:#F3EDE4;font-size:72px;line-height:1.02;letter-spacing:-.03em;font-weight:700;max-width:640px}
.sub{color:#B6B6B6;font-size:22px;margin-top:18px;max-width:600px;line-height:1.35}.rule{width:72px;height:3px;background:#C48A64;border-radius:2px;margin:26px 0 0}
.foot{color:#8B847B;font-size:17px}
</style></head><body><div class="art"></div><div class="fade"></div>
<div class="wrap"><div class="brand"><img src="${LOGO}"> Zumetrix <span>Labs</span></div>
<div><div class="eyebrow">${p.eyebrow}</div><h1>${p.title}</h1><div class="sub">${p.sub}</div><div class="rule"></div></div>
<div class="foot">${p.foot}</div></div></body></html>`;
const browser = await chromium.launch(); const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
for (const p of pages) { await page.setContent(html(p)); await page.waitForTimeout(200); await page.screenshot({ path: join(PUB, "og", p.file) }); console.log("og", p.file); }
await browser.close();
