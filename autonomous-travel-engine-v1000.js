/**
 * AUTONOMOUS TRAVEL ENGINE v1000
 * Safe continuous content generation system
 */

import fs from "fs";
import path from "path";

const OUTPUT_DIR = "./pages";

/**
 * =========================
 * 1. GLOBAL TOPIC STREAM
 * =========================
 */

const STREAM = [
  { city: "Rome", country: "Italy", intent: "high" },
  { city: "Paris", country: "France", intent: "high" },
  { city: "Tokyo", country: "Japan", intent: "high" },
  { city: "Bali", country: "Indonesia", intent: "high" },
  { city: "New York", country: "USA", intent: "high" },
  { city: "Dubai", country: "UAE", intent: "medium" }
];

/**
 * =========================
 * 2. SAFE FILE CHECK (NO DUPLICATES)
 * =========================
 */

function exists(city) {
  const file = path.join(OUTPUT_DIR, `${city.toLowerCase().replace(/\s/g, "-")}.html`);
  return fs.existsSync(file);
}

/**
 * =========================
 * 3. CONTENT GENERATOR
 * =========================
 */

function generatePage(topic) {
  const title = `${topic.city} Travel Guide 2026`;

  return `
<!DOCTYPE html>
<html>
<head>
<title>${title}</title>
<meta name="description" content="Flights, hotels, and travel guide for ${topic.city}">
</head>

<body>

<h1>${title}</h1>

<p>Autonomous travel intelligence node.</p>

<h2>Explore</h2>
<ul>
<li>Flights to ${topic.city}</li>
<li>Best hotels in ${topic.city}</li>
<li>Budget travel tips</li>
<li>Local experiences</li>
</ul>

<h2>Related Nodes</h2>
<div id="links"></div>

<script>
document.getElementById("links").innerHTML = `
  <a href="/pages/${topic.city.toLowerCase()}.html">Self</a>
`;
</script>

</body>
</html>
`;
}

/**
 * =========================
 * 4. WRITE ENGINE
 * =========================
 */

function write(topic) {
  if (exists(topic.city)) {
    console.log("Skipping (already exists):", topic.city);
    return;
  }

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const file = path.join(
    OUTPUT_DIR,
    `${topic.city.toLowerCase().replace(/\s/g, "-")}.html`
  );

  fs.writeFileSync(file, generatePage(topic));

  console.log("Generated:", file);
}

/**
 * =========================
 * 5. INTERLINKING SYSTEM
 * =========================
 */

function rebuildLinks() {
  const files = fs.readdirSync(OUTPUT_DIR);

  const links = files.map(f => `/pages/${f}`);

  const indexPage = `
<h1>Global Travel Network</h1>
<ul>
${links.map(l => `<li><a href="${l}">${l}</a></li>`).join("")}
</ul>
`;

  fs.writeFileSync("./pages/index.html", indexPage);

  console.log("Interlink graph rebuilt");
}

/**
 * =========================
 * 6. MAIN LOOP (SAFE)
 * =========================
 */

function run() {
  console.log("🌍 Autonomous Engine Cycle Starting...");

  STREAM.forEach(topic => write(topic));

  rebuildLinks();

  console.log("✅ Cycle complete");
}

run();
