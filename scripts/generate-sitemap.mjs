// Regenerates public/sitemap.xml from the site's actual data (articles.js,
// projects.ts) instead of a hand-maintained file that drifts from reality —
// confirmed via audit that the old static file was missing 16 of 18 real
// case-study pages. Runs before `vite build` so the fresh file is what
// Vite's static-asset copy picks up into dist/.
//
// Loaded through Vite's ssrLoadModule (not a plain Node import) because
// articles.js pulls in `*.md?raw` files — a Vite-only import form a bare
// `node script.mjs` process can't resolve on its own.
import { createServer } from "vite";
import { writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const SITE = "https://zumetrix.com";

const server = await createServer({
  root,
  server: { middlewareMode: true },
  appType: "custom",
  logLevel: "error",
});

const { articles } = await server.ssrLoadModule("/src/data/articles.js");
const { projects } = await server.ssrLoadModule("/src/data/projects.ts");
await server.close();

// Every route this build prerenders, classified. Only INDEX routes reach the
// sitemap. NOINDEX/UTILITY/REDIRECT/ADMIN routes are listed explicitly here
// (not just omitted silently) so the classification itself stays reviewable
// — see the Phase 1 deliverable's sitemap inventory for the full matrix.
const STATIC_INDEX_ROUTES = [
  { loc: "/", changefreq: "weekly", priority: "1.0", image: { loc: `${SITE}/logo/Logo%20Icon.png`, title: "Zumetrix Labs" } },
  { loc: "/about", changefreq: "monthly", priority: "0.9" },
  {
    loc: "/founders/zia-hussain",
    changefreq: "monthly",
    priority: "0.9",
    image: { loc: `${SITE}/profile_images/zia-hussain-founder-optimized.jpg`, title: "Zia Hussain, Co-Founder and CEO of Zumetrix Labs" },
  },
  {
    loc: "/founders/omer-gillani",
    changefreq: "monthly",
    priority: "0.9",
    image: { loc: `${SITE}/profile_images/syed-omer-shah-founder-optimized.jpg`, title: "Omer Gillani, Co-Founder and CTO of Zumetrix Labs" },
  },
  { loc: "/services", changefreq: "monthly", priority: "0.9" },
  { loc: "/services/saas-mvp-development", changefreq: "monthly", priority: "0.8" },
  { loc: "/services/web-application-development", changefreq: "monthly", priority: "0.8" },
  { loc: "/services/mobile-app-development", changefreq: "monthly", priority: "0.8" },
  { loc: "/services/ai-automation-solutions", changefreq: "monthly", priority: "0.8" },
  { loc: "/services/product-rescue-stabilization", changefreq: "monthly", priority: "0.8" },
  { loc: "/portfolio", changefreq: "monthly", priority: "0.8" },
  { loc: "/client-stories", changefreq: "monthly", priority: "0.7" },
  { loc: "/contact", changefreq: "monthly", priority: "0.8" },
  { loc: "/articles", changefreq: "weekly", priority: "0.7" },
  { loc: "/rescue-or-rebuild", changefreq: "monthly", priority: "0.7" },
  { loc: "/privacy-policy", changefreq: "yearly", priority: "0.3" },
  { loc: "/terms-of-service", changefreq: "yearly", priority: "0.3" },
];

// Explicitly excluded, and why — kept here as documentation, not dead code:
//   /portfolio/all   — noIndex is set on AllProjectsPage.tsx; a crawlable
//                       archive but intentionally not a canonical destination
//   /unsubscribe     — X-Robots-Tag: noindex via vercel.json
//   /review          — X-Robots-Tag: noindex via vercel.json
//   /admin/*         — Disallow'd in robots.txt, ProtectedRoute-gated
//   old service/founder slugs — 308 redirects at the edge (vercel.json),
//                       never resolve to real content of their own

// searchIndexable is a per-project editorial decision (see projects.ts) —
// false for the anonymized/proofStatus:"draft" case studies until their
// privacy review completes. Not derived from homepageFeatured or any
// blanket default.
const projectUrls = projects.filter((project) => project.searchIndexable).map((project) => ({
  loc: `/portfolio/${project.slug}`,
  changefreq: "monthly",
  priority: "0.8",
  image: project.image
    ? { loc: project.image.startsWith("http") ? project.image : `${SITE}${project.image}`, title: project.title }
    : undefined,
}));

const articleUrls = articles.map((article) => ({
  loc: `/articles/${article.slug}`,
  changefreq: "monthly",
  priority: "0.7",
  lastmod: article.publishedAt || undefined,
}));

const allUrls = [...STATIC_INDEX_ROUTES, ...projectUrls, ...articleUrls];

const xmlEscape = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const urlXml = allUrls
  .map((u) => {
    const parts = [`    <loc>${SITE}${u.loc}</loc>`];
    // lastmod is only ever emitted when we have a real per-item date field
    // (currently: article publishedAt). Static pages and case studies have
    // no tracked modification date, so they get none — a missing lastmod
    // is honest; a fabricated "today" on every deploy is not.
    if (u.lastmod) parts.push(`    <lastmod>${u.lastmod}</lastmod>`);
    parts.push(`    <changefreq>${u.changefreq}</changefreq>`);
    parts.push(`    <priority>${u.priority}</priority>`);
    if (u.image) {
      parts.push(`    <image:image>`);
      parts.push(`      <image:loc>${xmlEscape(u.image.loc)}</image:loc>`);
      parts.push(`      <image:title>${xmlEscape(u.image.title)}</image:title>`);
      parts.push(`    </image:image>`);
    }
    return `  <url>\n${parts.join("\n")}\n  </url>`;
  })
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urlXml}
</urlset>
`;

await writeFile(join(root, "public", "sitemap.xml"), xml, "utf8");
console.log(`Generated sitemap.xml with ${allUrls.length} URLs (${STATIC_INDEX_ROUTES.length} static, ${projectUrls.length} case studies, ${articleUrls.length} articles).`);
