import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dist = join(root, "dist");
const shell = await readFile(join(dist, "index.html"), "utf8");
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
  "/contact",
  "/articles",
  "/articles/what-we-learned-building-50-projects",
  "/articles/build-saas-mvp-in-30-days",
  "/articles/ai-automation-business-growth",
  "/articles/react-nodejs-best-practices-2024",
  "/articles/mobile-app-development-flutter-react-native",
  "/articles/firebase-complete-guide-pakistani-developers",
  "/articles/no-code-automation-zapier-make-n8n",
  "/privacy-policy",
  "/terms-of-service",
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

await rm(join(dist, "server"), { recursive: true, force: true });
console.log(`Pre-rendered ${routes.length} public routes with their existing page metadata.`);
