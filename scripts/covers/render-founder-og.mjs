// Share images for the two founder profile pages: portrait on the right third,
// name and role as rendered text. node scripts/covers/render-founder-og.mjs
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
const ROOT = join(dirname(fileURLToPath(import.meta.url)), "../..");
const PUB = join(ROOT, "public");
const b64 = (p, mime) => `data:${mime};base64,` + readFileSync(join(PUB, p)).toString("base64");
const LOGO = b64("logo/Logo Icon.png", "image/png");
const founders = [
  { slug: "zia-hussain", name: "Zia Hussain", role: "Co-Founder & CEO", img: b64("profile_images/zia-hussain-portrait-4x5.webp", "image/webp") },
  { slug: "omer-gillani", name: "Omer Gillani", role: "Co-Founder & CTO", img: b64("profile_images/omer-gillani-portrait-4x5.webp", "image/webp") },
];
const html = (f) => `<!doctype html><html><head><meta charset="utf-8"><style>
html,body{margin:0;width:1200px;height:630px;background:#0C0C0C;font-family:Inter,ui-sans-serif,system-ui,sans-serif;-webkit-font-smoothing:antialiased;overflow:hidden}
.photo{position:absolute;right:0;top:0;width:470px;height:630px;background:url("${f.img}") center top/cover no-repeat}
.fade{position:absolute;inset:0;background:linear-gradient(90deg,#0C0C0C 0%,#0C0C0C 56%,rgba(12,12,12,.75) 64%,rgba(12,12,12,0) 78%)}
.bottom{position:absolute;inset:0;background:linear-gradient(0deg,rgba(12,12,12,.7) 0%,rgba(12,12,12,0) 35%)}
.wrap{position:absolute;inset:0;padding:56px 64px;display:flex;flex-direction:column;justify-content:space-between}
.brand{display:flex;align-items:center;gap:12px;color:#EDEDED;font-weight:600;font-size:22px;letter-spacing:-.02em}.brand img{width:30px;height:30px}.brand span{color:#C48A64;font-weight:500}
.eyebrow{color:#C48A64;font-size:15px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;margin-bottom:18px}
h1{margin:0;color:#F3EDE4;font-size:66px;line-height:1.04;letter-spacing:-.03em;font-weight:700}
.role{color:#B6B6B6;font-size:24px;margin-top:14px}.rule{width:72px;height:3px;background:#C48A64;border-radius:2px;margin:26px 0 0}
.foot{color:#8B847B;font-size:17px}
</style></head><body><div class="photo"></div><div class="fade"></div><div class="bottom"></div>
<div class="wrap"><div class="brand"><img src="${LOGO}"> Zumetrix <span>Labs</span></div>
<div><div class="eyebrow">Founder profile</div><h1>${f.name}</h1><div class="role">${f.role} · Zumetrix Labs</div><div class="rule"></div></div>
<div class="foot">zumetrix.com/founders/${f.slug}</div></div></body></html>`;
const browser = await chromium.launch(); const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
for (const f of founders) { await page.setContent(html(f)); await page.waitForTimeout(200); await page.screenshot({ path: join(PUB, "og", `founder-${f.slug}.png`) }); console.log("og founder", f.slug); }
await browser.close();
