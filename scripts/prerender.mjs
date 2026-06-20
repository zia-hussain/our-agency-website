import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dist = join(root, "dist");
const builtShell = await readFile(join(dist, "index.html"), "utf8");
const stylesheetTag = builtShell.match(
  /<link rel="stylesheet"[^>]*href="([^"]+\.css)"[^>]*>/,
);
let shell = builtShell;

if (stylesheetTag) {
  const stylesheetPath = stylesheetTag[1].replace(/^\//, "");
  const stylesheet = await readFile(join(dist, stylesheetPath), "utf8");
  shell = builtShell.replace(
    stylesheetTag[0],
    `<style data-critical-css>${stylesheet}</style>`,
  );
}
const { render } = await import(pathToFileURL(join(dist, "server", "entry-server.js")).href);

const routes = [
  "/",
  "/about",
  "/founders/zia-hussain",
  "/founders/syed-omer-shah",
  "/services",
  "/services/enterprise-web-applications",
  "/services/saas-mvp-development",
  "/services/startup-mvp-development",
  "/services/ai-automation-solutions",
  "/services/mobile-app-development",
  "/services/digital-strategy-consulting",
  "/portfolio",
  "/portfolio/all",
  "/portfolio/forlag-publishing-sales-inventory-dashboard",
  "/portfolio/floating-stone-ranch-processor-intake-engine",
  "/portfolio/skill-x-swap-mvp",
  "/portfolio/ifyify-ai-personal-branding",
  "/portfolio/wellnesstracker-mobile-app",
  "/portfolio/retailops-automation-platform",
  "/portfolio/taskflow-startup-mvp",
  "/portfolio/eduplatform-online-learning",
  "/portfolio/logitrack-delivery-mobile",
  "/portfolio/tomo-voice-ai-companion",
  "/portfolio/hjelpna-handyman-marketplace",
  "/portfolio/utility-bill-deal-finder",
  "/portfolio/pawspace-pet-services-marketplace",
  "/portfolio/bondfire-event-booking-app",
  "/portfolio/hostel-management-system-mern",
  "/portfolio/stripe-to-airtable-subscription-sync",
  "/portfolio/shopify-to-notion-pnl-automation",
  "/portfolio/twilio-auto-dialer-logic",
  "/portfolio/twilio-conference-call-logic",
  "/portfolio/zumetrix-labs-internal-automation-stack",
  "/contact",
  "/articles",
  "/articles/what-we-learned-building-50-projects",
  "/articles/build-saas-mvp-in-30-days",
  "/articles/saas-mvp-cost-guide",
  "/articles/saas-mvp-feature-checklist",
  "/articles/saas-mvp-timeline-guide",
  "/articles/saas-mvp-tech-stack",
  "/articles/saas-mvp-mistakes-founders-make",
  "/articles/saas-mvp-validation-guide",
  "/articles/ai-automation-business-growth",
  "/articles/react-nodejs-best-practices-2024",
  "/articles/mobile-app-development-flutter-react-native",
  "/articles/firebase-complete-guide-pakistani-developers",
  "/articles/no-code-automation-zapier-make-n8n",
  "/privacy-policy",
  "/terms-of-service",
  "/unsubscribe",
];

for (const route of routes) {
  const { html, head } = await render(route);
  const document = shell
    .replace(
      /<!-- route-meta:start -->[\s\S]*?<!-- route-meta:end -->/,
      `<!-- route-meta:start -->\n    ${head}\n    <!-- route-meta:end -->`,
    )
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`);
  const target = route === "/" ? join(dist, "index.html") : join(dist, route, "index.html");

  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, document);
}

const notFound = await render("/404");
const notFoundDocument = shell
  .replace(
    /<!-- route-meta:start -->[\s\S]*?<!-- route-meta:end -->/,
    `<!-- route-meta:start -->\n    ${notFound.head}\n    <!-- route-meta:end -->`,
  )
  .replace('<div id="root"></div>', `<div id="root">${notFound.html}</div>`);
await writeFile(join(dist, "404.html"), notFoundDocument);

await rm(join(dist, "server"), { recursive: true, force: true });
console.log(`Pre-rendered ${routes.length} public routes plus the noindex 404 page.`);
