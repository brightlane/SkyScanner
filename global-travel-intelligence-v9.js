/**
 * Global Travel Intelligence Network v9
 * SEO Graph Engine (Production Safe + Multilingual Ready)
 * - Controlled expansion (NO infinite loops)
 * - Multi-language structure ready
 * - Internal linking graph (spider-web but bounded)
 */

import fs from "fs";
import path from "path";

const OUTPUT_DIR = "./generated-articles";

// =========================
// 🌐 GLOBAL CONTENT CORE
// =========================
const DATABASE = {
  destinations: [
    {
      name: "Tokyo",
      country: "Japan",
      regions: ["Asia"],
      tags: ["tech", "food", "culture", "solo travel"],
      lang: { en: "Tokyo Travel Guide", es: "Guía de Tokio", fr: "Guide de Tokyo" }
    },
    {
      name: "Bali",
      country: "Indonesia",
      regions: ["Asia"],
      tags: ["wellness", "digital nomad", "beach"],
      lang: { en: "Bali Travel Guide", es: "Guía de Bali", fr: "Guide de Bali" }
    },
    {
      name: "Paris",
      country: "France",
      regions: ["Europe"],
      tags: ["luxury", "art", "romance"],
      lang: { en: "Paris Travel Guide", es: "Guía de París", fr: "Guide de Paris" }
    },
    {
      name: "New York",
      country: "USA",
      regions: ["North America"],
      tags: ["business", "events", "culture"],
      lang: { en: "New York Travel Guide", es: "Guía de Nueva York", fr: "Guide de New York" }
    }
  ],

  flights: [
    { route: "New York → London", price: "$420", trend: "high demand" },
    { route: "Tokyo → Paris", price: "$680", trend: "stable" },
    { route: "Dubai → Bali", price: "$390", trend: "budget surge" },
    { route: "LA → Tokyo", price: "$750", trend: "premium route" }
  ]
};

// =========================
// ⚙️ SAFETY LIMITS (CRITICAL)
// =========================
const MAX_DEPTH = 3;
const MAX_CHILDREN = 4;

const visited = new Set();

// =========================
// 🧠 GRAPH ENGINE
// =========================
function generateNode(node, depth = 0) {
  if (depth > MAX_DEPTH) return null;

  const id = `${node.type}:${node.name || node.route}`;
  if (visited.has(id)) return null;
  visited.add(id);

  const children = expand(node);

  let childHTML = "";
  for (const child of children.slice(0, MAX_CHILDREN)) {
    const result = generateNode(child, depth + 1);
    if (result) childHTML += result.html;
  }

  const html = buildHTML(node, childHTML, depth);

  const file = `${slug(node.name || node.route || "root")}-${depth}.html`;

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(path.join(OUTPUT_DIR, file), html);

  return { html, file };
}

// =========================
// 🌱 EXPANSION LOGIC (GRAPH)
// =========================
function expand(node) {
  const children = [];

  if (node.type === "root") {
    children.push(
      ...DATABASE.destinations.map(d => ({ type: "destination", ...d })),
      ...DATABASE.flights.map(f => ({ type: "flight", ...f }))
    );
  }

  if (node.type === "destination") {
    children.push(
      {
        type: "guide",
        name: `${node.name} Budget Travel Guide`,
        country: node.country
      },
      {
        type: "sub-guide",
        name: `${node.name} Hidden Places`,
        country: node.country
      }
    );
  }

  if (node.type === "flight") {
    children.push({
      type: "flight-analysis",
      name: `${node.route} Price Analysis`,
      price: node.price
    });
  }

  return children;
}

// =========================
// 🌐 HTML GENERATOR (SEO READY)
// =========================
function buildHTML(node, childrenHTML, depth) {
  const title = node.name || node.route || "Global Travel Node";

  const langBlock = node.lang
    ? Object.entries(node.lang)
        .map(([k, v]) => `<li><strong>${k.toUpperCase()}:</strong> ${v}</li>`)
        .join("")
    : "";

  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>${title} | Global Travel Intelligence v9</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<style>
body { font-family: Arial; padding: 40px; background:#f4f7fb; }
h1 { color:#0072b2; }
.card { padding:12px; margin:10px 0; background:white; border-left:4px solid #0072b2; }
.meta { font-size:12px; color:#666; }
</style>
</head>

<body>

<h1>${title}</h1>

<div class="meta">Depth Level: ${depth}</div>

<p>
Global travel intelligence node covering:
<strong>${title}</strong>
</p>

${node.price ? `<p><strong>Price:</strong> ${node.price}</p>` : ""}

${node.tags ? `<p><strong>Tags:</strong> ${node.tags.join(", ")}</p>` : ""}

${langBlock ? `<h3>Multilingual Titles</h3><ul>${langBlock}</ul>` : ""}

<h2>Connected Intelligence Nodes</h2>
${childrenHTML || "<p>No further expansion (depth limit reached)</p>"}

</body>
</html>
`;
}

// =========================
// 🧰 UTIL
// =========================
function slug(str) {
  return (str || "node")
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-]/g, "");
}

// =========================
// 🚀 ENTRY POINT
// =========================
function run() {
  console.log("🌍 GTIN v9 starting...");

  const root = { type: "root", name: "Global Travel Intelligence Network" };

  generateNode(root);

  console.log("✅ GTIN v9 complete — SEO graph generated");
}

run();
