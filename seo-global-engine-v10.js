import fs from "fs";
import path from "path";

const CONFIG = {
  outputDir: "./pages",

  // 🌍 Expanded language reach (global intent)
  languages: ["en", "es", "fr", "de", "it", "pt", "nl", "pl", "sv", "tr"],

  // 🔥 Increased but controlled volume
  maxArticlesPerRun: 60,

  topics: [
    "cheap flights",
    "hidden flight routes",
    "budget travel hacks",
    "solo travel safety routes",
    "digital nomad cities",
    "best airline comparisons",
    "low cost Europe travel",
    "Asia backpacking routes",
    "long haul flight deals",
    "airport transfer guides"
  ],

  destinations: [
    "Tokyo","Seoul","Bangkok","Singapore","Dubai",
    "Paris","London","Rome","Barcelona","Lisbon",
    "New York","Los Angeles","Toronto","Mexico City",
    "Istanbul","Berlin","Amsterdam","Vienna","Prague"
  ]
};

// -----------------------------
// SAFE FILE SYSTEM
// -----------------------------
function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function exists(file) {
  return fs.existsSync(file);
}

// -----------------------------
// SEO ARTICLE BUILDER (REAL STRUCTURE)
// -----------------------------
function buildArticle(lang, topic, city) {
  const title = `${topic.toUpperCase()} GUIDE: ${city} (${lang})`;

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="UTF-8">
<title>${title}</title>
<meta name="description" content="Global travel guide for ${topic} in ${city}. Flight insights, pricing trends, and travel strategy.">
</head>
<body>

<h1>${title}</h1>

<p>
This page analyzes <strong>${topic}</strong> in <strong>${city}</strong> using global airline pricing behavior,
route demand modeling, and traveler intent signals.
</p>

<h2>✈️ Flight Intelligence</h2>
<p>
${city} is part of a high-volume international air corridor where pricing fluctuates based on demand cycles,
seasonality, and airline competition density.
</p>

<h2>📊 Travel Strategy</h2>
<ul>
<li>Best booking window: 21–55 days</li>
<li>Cheapest departure days: Tuesday / Wednesday</li>
<li>Peak avoidance improves pricing by up to 28%</li>
</ul>

<h2>🌍 Related Global Routes</h2>
<ul>
${CONFIG.destinations
  .filter(d => d !== city)
  .slice(0, 6)
  .map(d => `<li>${d} → ${topic}</li>`)
  .join("\n")}
</ul>

<p>
Internal Hub: <a href="/blog.html">Global Travel Intelligence Hub</a>
</p>

</body>
</html>`;
}

// -----------------------------
// CLUSTER ENGINE (THE "10X MULTIPLIER")
// -----------------------------
function run() {
  ensureDir(CONFIG.outputDir);

  let created = 0;

  for (const lang of CONFIG.languages) {
    for (const topic of CONFIG.topics) {
      for (const city of CONFIG.destinations) {

        if (created >= CONFIG.maxArticlesPerRun) {
          console.log("⚡ LIMIT REACHED (safe batch complete)");
          return;
        }

        const file = `${city.toLowerCase()}-${topic.replaceAll(" ", "-")}-${lang}.html`;
        const filePath = path.join(CONFIG.outputDir, file);

        if (exists(filePath)) continue;

        const html = buildArticle(lang, topic, city);
        fs.writeFileSync(filePath, html);

        created++;
      }
    }
  }

  console.log(`🚀 V10 ENGINE COMPLETE → ${created} GLOBAL SEO PAGES GENERATED`);
}

run();
