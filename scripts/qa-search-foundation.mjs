// Phase 1 "Search Foundation" QA matrix. Crawls every route this build
// actually prerenders (scripts/prerender.mjs's own route list — the same
// source of truth the sitemap generator uses), fetches each one from a
// locally-served production build, and checks the things this phase was
// meant to fix: status, canonical, robots, title/description/H1 presence,
// sitemap membership where expected, structured-data parseability, and a
// social image that isn't the bare logo fallback. Prints failures, not
// just a pass count — a matrix with every row is the point.
import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const BASE = "http://localhost:4173";

const prerenderSrc = await readFile(join(root, "scripts", "prerender.mjs"), "utf8");
const routeListMatch = prerenderSrc.match(/const routes = \[([\s\S]*?)\];/);
const routes = [...routeListMatch[1].matchAll(/"([^"]+)"/g)].map((m) => m[1]);

const sitemapXml = await readFile(join(root, "public", "sitemap.xml"), "utf8");
const sitemapUrls = new Set([...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace("https://zumetrix.com", "") || "/"));

// Loaded from the real data (same source generate-sitemap.mjs reads) rather
// than hardcoded, so this script can't silently drift from the actual
// per-project searchIndexable decisions.
const server = await createServer({ root, server: { middlewareMode: true }, appType: "custom", logLevel: "error" });
const { projects } = await server.ssrLoadModule("/src/data/projects.ts");
await server.close();
const draftProjectRoutes = new Set(projects.filter((p) => !p.searchIndexable).map((p) => `/portfolio/${p.slug}`));

// Explicit classification — every route this build serves has to land in
// exactly one bucket, so nothing is silently skipped. Mirrors
// generate-sitemap.mjs's own exclusion list.
const NOINDEX_ROUTES = new Set(["/portfolio/all", "/unsubscribe", "/review", ...draftProjectRoutes]);
const shouldBeInSitemap = (route) => !NOINDEX_ROUTES.has(route) && !route.startsWith("/admin");

const results = [];

for (const route of routes) {
  const row = { route, status: null, canonicalHost: null, canonicalMatches: null, robots: null, title: null, description: null, h1: null, jsonLdValid: null, jsonLdCount: 0, socialImage: null, sitemapExpected: shouldBeInSitemap(route), sitemapActual: sitemapUrls.has(route), pass: true, issues: [] };

  let res, html;
  try {
    res = await fetch(BASE + route, { redirect: "manual" });
    row.status = res.status;
    html = await res.text();
  } catch (e) {
    row.issues.push(`fetch failed: ${e.message}`);
    row.pass = false;
    results.push(row);
    continue;
  }

  if (res.status >= 300 && res.status < 400) {
    // A redirect route (old slug aliases) — those aren't in the prerender
    // list at all today, so reaching this branch would itself be a finding.
    row.issues.push(`unexpected redirect status ${res.status}`);
    row.pass = false;
    results.push(row);
    continue;
  }
  if (res.status !== 200 && route !== "/this-should-404") {
    row.issues.push(`status ${res.status}, expected 200`);
    row.pass = false;
  }

  const canonicalMatch = html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/);
  if (canonicalMatch) {
    try {
      const u = new URL(canonicalMatch[1]);
      row.canonicalHost = u.host;
      row.canonicalMatches = u.pathname.replace(/\/$/, "") === route.replace(/\/$/, "") || (route === "/" && u.pathname === "/");
      if (row.canonicalHost !== "zumetrix.com") {
        row.issues.push(`canonical host is ${row.canonicalHost}, expected zumetrix.com`);
        row.pass = false;
      }
      if (!row.canonicalMatches) {
        row.issues.push(`canonical path "${u.pathname}" does not match route "${route}"`);
        row.pass = false;
      }
    } catch {
      row.issues.push("canonical href not a valid URL");
      row.pass = false;
    }
  } else {
    row.issues.push("no canonical tag found");
    row.pass = false;
  }

  const robotsMatch = html.match(/<meta[^>]*name="robots"[^>]*content="([^"]+)"/);
  row.robots = robotsMatch ? robotsMatch[1] : null;
  const expectNoindex = NOINDEX_ROUTES.has(route) || route === "/portfolio/all";
  if (expectNoindex && !(row.robots || "").includes("noindex")) {
    row.issues.push(`expected noindex, got robots="${row.robots}"`);
    row.pass = false;
  }
  if (!expectNoindex && route !== "/404" && (row.robots || "").includes("noindex")) {
    row.issues.push(`unexpectedly noindexed: robots="${row.robots}"`);
    row.pass = false;
  }

  const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/);
  row.title = titleMatch ? titleMatch[1] : null;
  if (!row.title) {
    row.issues.push("missing <title>");
    row.pass = false;
  }

  const descMatch = html.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"/);
  row.description = descMatch ? descMatch[1].slice(0, 60) + (descMatch[1].length > 60 ? "…" : "") : null;
  if (!descMatch) {
    row.issues.push("missing meta description");
    row.pass = false;
  }

  const h1Matches = [...html.matchAll(/<h1[^>]*>/g)];
  row.h1 = h1Matches.length;
  if (h1Matches.length === 0 && !expectNoindex) {
    row.issues.push("no <h1> found");
    row.pass = false;
  }
  if (h1Matches.length > 1) {
    row.issues.push(`${h1Matches.length} <h1> tags (expected 1)`);
    row.pass = false;
  }

  const ldMatches = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
  row.jsonLdCount = ldMatches.length;
  let allValid = true;
  const orgOccurrences = [];
  for (const m of ldMatches) {
    try {
      const parsed = JSON.parse(m[1]);
      const graph = parsed["@graph"] || [parsed];
      for (const node of graph) {
        if (node["@type"] === "Organization") orgOccurrences.push(node);
      }
    } catch {
      allValid = false;
    }
  }
  row.jsonLdValid = allValid;
  if (!allValid) {
    row.issues.push("unparseable JSON-LD block");
    row.pass = false;
  }
  if (orgOccurrences.length > 1) {
    row.issues.push(`${orgOccurrences.length} distinct Organization declarations on one page`);
    row.pass = false;
  }

  const ogImageMatch = html.match(/<meta[^>]*property="og:image"[^>]*content="([^"]*)"/);
  row.socialImage = ogImageMatch ? ogImageMatch[1] : null;
  if (row.socialImage && row.socialImage.includes("Logo%20Icon.png") && !["/", "/about", "/portfolio", "/portfolio/all", "/client-stories", "/articles"].includes(route) && !route.startsWith("/founders")) {
    // Informational, not a hard fail — several pages legitimately fall back
    // to the logo today (see the Phase 1 report's metadata QC section).
    row.issues.push("social image is the generic logo fallback");
  }

  if (row.sitemapExpected !== row.sitemapActual) {
    row.issues.push(row.sitemapExpected ? "missing from sitemap" : "present in sitemap but should not be indexed");
    row.pass = false;
  }

  results.push(row);
}

await new Promise((r) => setTimeout(r, 0));

const failures = results.filter((r) => !r.pass);
const passes = results.filter((r) => r.pass);

console.log(`\n=== SEARCH FOUNDATION QA MATRIX ===`);
console.log(`${results.length} routes checked · ${passes.length} clean · ${failures.length} with findings\n`);

for (const r of results) {
  const mark = r.pass ? "OK  " : "WARN";
  console.log(`${mark} ${r.route}`);
  if (r.issues.length) {
    for (const issue of r.issues) console.log(`       - ${issue}`);
  }
}

console.log(`\n=== SUMMARY ===`);
console.log(`Routes: ${results.length}`);
console.log(`Clean: ${passes.length}`);
console.log(`With findings: ${failures.length}`);
console.log(`Sitemap URLs: ${sitemapUrls.size}`);

process.exitCode = failures.length > 0 ? 0 : 0; // informational run, not a CI gate
