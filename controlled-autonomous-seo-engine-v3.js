import fs from "fs";
import path from "path";

/**
 * CONTROLLED AUTONOMOUS SEO ENGINE v3
 * Graph + scoring + safe expansion + internal linking system
 */

const OUTPUT_DIR = "./generated-articles";
const SITE = "https://brightlane.github.io/SkyScanner";

// -----------------------------
// 🌍 BASE GLOBAL GRAPH
// -----------------------------
let GRAPH = [
  { region: "Europe", city: "Paris", country: "France", score: 50 },
  { region: "Europe", city: "Rome", country: "Italy", score: 48 },
  { region: "Europe", city: "Barcelona", country: "Spain", score: 47 },

  { region: "Asia", city: "Tokyo", country: "Japan", score: 55 },
  { region: "Asia", city: "Bangkok", country: "Thailand", score: 49 },
  { region: "Asia", city: "Bali", country: "Indonesia", score: 52 },

  { region: "Americas", city: "New York", country: "USA", score: 60 },
  { region: "Americas", city: "Mexico City", country: "Mexico", score: 46 },
  { region: "Americas", city: "Rio de Janeiro", country: "Brazil", score: 45 }
];

// -----------------------------
// 🧠 SEO SCORING SYSTEM
// -----------------------------
function updateScores() {
  GRAPH = GRAPH.map(page => {
    const regionalBoost = GRAPH.filter(p => p.region === page.region).length;
    const scoreBoost = regionalBoost * 2;

    return {
      ...page,
      score: page.score + scoreBoost
    };
  });
}

// -----------------------------
// 🔗 SMART LINK SELECTOR
// -----------------------------
function getTopLinks(current) {
  return GRAPH
    .filter(p => p.region === current.region && p.city !== current.city)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

// -----------------------------
// 🧭 URL BUILDER
// -----------------------------
function url(city) {
  return `${SITE}/pages/${city.toLowerCase().replace(/\s/g, "-")}.html`;
}

// -----------------------------
// ✍️ ARTICLE ENGINE (SEO-AWARE)
// -----------------------------
function buildPage(page) {
  const links = getTopLinks(page);

  const linkHTML = links.map(l =>
    `<li><a href="${url(l.city)}">${l.city} Travel Guide</a> (SEO Score: ${l.score})</li>`
  ).join("\n");

  return `
<!DOCTYPE html>
<html>
<head>
<title>${page.city} Travel Guide 2026</title>
<meta name="description" content="AI structured travel guide for ${page.city}, ${page.country}">
</head>
<body>

<h1>${page.city}, ${page.country}</h1>

<p>
Autonomous travel intelligence report for ${page.city}.
Regional SEO score: ${page.score}
</p>

<h2>Top Connected Destinations</h2>
<ul>
${linkHTML}
</ul>

<h2>Travel Intelligence Layer</h2>
<ul>
  <li>Region: ${page.region}</li>
  <li>Demand Score: ${page.score}</li>
  <li>Flight Cluster: Active</li>
</ul>

<p>
Global Hub: <a href="${SITE}">SkyScanner Network</a>
</p>

</body>
</html>
`;
}

// -----------------------------
// 📦 SAFE BATCH ENGINE
// -----------------------------
function runBatch() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const batchSize = 40; // safe limit (30–50 recommended)

  updateScores();

  let batch = [];

  GRAPH.forEach((page, i) => {
    batch.push(page);

    if (batch.length === batchSize || i === GRAPH.length - 1) {
      writeBatch(batch);
      batch = [];
    }
  });

  generateSitemap();

  console.log("✅ SEO ENGINE v3 COMPLETE");
}

// -----------------------------
// 📄 WRITER
// -----------------------------
function writeBatch(batch) {
  batch.forEach(page => {
    const html = buildPage(page);

    const file = `${page.city.toLowerCase().replace(/\s/g, "-")}.html`;

    fs.writeFileSync(
      path.join(OUTPUT_DIR, file),
      html
    );

    console.log("📄 Generated:", file);
  });
}

// -----------------------------
// 🗺️ SITEMAP AUTO BUILDER
// -----------------------------
function generateSitemap() {
  const urls = GRAPH.map(p =>
    `<url><loc>${url(p.city)}</loc></url>`
  ).join("\n");

  const xml = `
<?xml version="1.0" encoding="UTF-8"?>
<urlset>
${urls}
</urlset>
`;

  fs.writeFileSync("./sitemap.xml", xml);

  console.log("🗺️ Sitemap updated");
}

// -----------------------------
// START ENGINE
// -----------------------------
runBatch();
