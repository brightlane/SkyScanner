import fs from "fs";
import path from "path";

// ----------------------------
// CONFIG (GLOBAL SAFE SCALE)
// ----------------------------
const OUTPUT_DIR = "./pages";

const LANGUAGES = ["en", "es", "fr", "de", "it"];

const DESTINATIONS = [
  "Tokyo","Paris","London","New York","Dubai",
  "Bangkok","Rome","Barcelona","Lisbon","Istanbul"
];

const TOPICS = [
  "cheap flights guide",
  "solo travel guide",
  "budget airline comparison",
  "best time to fly",
  "airport travel tips",
  "hidden travel deals"
];

// LIMITS (prevents chaos)
const MAX_PAGES = 40;

// ----------------------------
// SAFE INIT
// ----------------------------
function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function slug(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

function exists(file) {
  return fs.existsSync(file);
}

// ----------------------------
// CONTENT ENGINE
// ----------------------------
function buildPage(lang, topic, city) {
  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <title>${topic} - ${city}</title>
  <meta name="description" content="Global travel guide: ${topic} in ${city}">
</head>
<body>

<h1>${topic} — ${city}</h1>

<p>
This article explores ${topic} in ${city}, focusing on global flight pricing behavior,
route demand, and travel optimization strategies.
</p>

<h2>🌍 Destination Insight</h2>
<p>
${city} is a major international travel hub with fluctuating airfare influenced by seasonality and demand cycles.
</p>

<h2>✈️ Travel Tips</h2>
<ul>
  <li>Best booking window: 21–60 days</li>
  <li>Mid-week flights are usually cheaper</li>
  <li>Low-cost carriers vary by region</li>
</ul>

<h2>🔗 Related Destinations</h2>
<ul>
${DESTINATIONS.filter(d => d !== city)
  .slice(0, 4)
  .map(d => `<li><a href="/pages/${slug(d)}-${lang}.html">${d}</a></li>`)
  .join("\n")}
</ul>

<p><a href="/blog.html">Back to travel hub</a></p>

</body>
</html>`;
}

// ----------------------------
// GENERATION ENGINE (SAFE)
// ----------------------------
function run() {
  ensureDir(OUTPUT_DIR);

  let count = 0;

  for (const lang of LANGUAGES) {
    for (const topic of TOPICS) {
      for (const city of DESTINATIONS) {

        if (count >= MAX_PAGES) {
          console.log("🚦 LIMIT HIT — SAFE STOP");
          return;
        }

        const fileName = `${slug(city)}-${slug(topic)}-${lang}.html`;
        const filePath = path.join(OUTPUT_DIR, fileName);

        if (exists(filePath)) continue;

        const html = buildPage(lang, topic, city);
        fs.writeFileSync(filePath, html);

        count++;
      }
    }
  }

  console.log(`🌍 PRODUCTION PIPELINE COMPLETE → ${count} pages generated`);
}

run();
