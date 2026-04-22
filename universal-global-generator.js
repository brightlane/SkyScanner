// universal-global-generator.js

const fs = require("fs");
const path = require("path");

// -----------------------------
// CONFIG
// -----------------------------
const OUTPUT_DIR = "./generated-articles";

const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "it", name: "Italian" },
  { code: "pt", name: "Portuguese" }
];

// Global travel topics (SEO clusters)
const topics = [
  "Cheap Flights to Tokyo",
  "Budget Travel in Europe",
  "Solo Travel Safety Guide",
  "Hidden Digital Nomad Cities",
  "Best Flight Routes 2026",
  "Airport Hacks for Cheaper Tickets",
  "Luxury Travel on a Budget",
  "World Cup 2026 Travel Planning"
];

// -----------------------------
// CORE CONTENT ENGINE
// -----------------------------
function generateContent(topic, lang) {
  return `
<!DOCTYPE html>
<html lang="${lang.code}">
<head>
  <meta charset="UTF-8">
  <title>${topic} | Global Travel Intelligence</title>
  <meta name="description" content="${topic} insights, pricing trends, and travel strategies for 2026.">
  <link rel="canonical" href="https://brightlane.github.io/SkyScanner/generated-articles/${slug(topic)}-${lang.code}.html">
</head>

<body>

<h1>${translate(topic, lang.code)}</h1>

<p>
This article explores ${topic.toLowerCase()} with global travel intelligence insights.
We analyze pricing trends, seasonal demand shifts, and optimal booking strategies.
</p>

<h2>🌍 Global Insight</h2>
<p>
Travel patterns vary across regions, but demand clustering and airline hub routing
are the strongest pricing drivers in 2026.
</p>

<h2>✈️ Key Strategies</h2>
<ul>
  <li>Book during mid-week fare drops</li>
  <li>Use flexible destination searches</li>
  <li>Compare multi-hub routing options</li>
</ul>

<h2>📊 Regional Notes</h2>
<p>
Europe: strong budget rail-air competition.<br>
Asia: ultra-low-cost carriers dominate.<br>
Americas: seasonal spikes affect pricing heavily.
</p>

<h2>🔗 Related Articles</h2>
<p>
Explore more global travel insights in this networked system of destinations and routes.
</p>

<footer>
Generated in ${lang.name} | SkyScanner Global Intelligence System
</footer>

</body>
</html>
`;
}

// -----------------------------
// SIMPLE TRANSLATION MOCK (SEO-safe structure)
// -----------------------------
function translate(text, lang) {
  const map = {
    es: "Guía de viajes globales: ",
    fr: "Guide de voyage mondial: ",
    de: "Globaler Reiseführer: ",
    it: "Guida di viaggio globale: ",
    pt: "Guia global de viagens: "
  };

  return (map[lang] || "") + text;
}

// -----------------------------
// SLUGIFIER
// -----------------------------
function slug(text) {
  return text.toLowerCase().replace(/\s+/g, "-");
}

// -----------------------------
// MAIN GENERATOR
// -----------------------------
function run() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }

  topics.forEach(topic => {
    languages.forEach(lang => {
      const fileName = `${slug(topic)}-${lang.code}.html`;
      const filePath = path.join(OUTPUT_DIR, fileName);

      const html = generateContent(topic, lang);

      fs.writeFileSync(filePath, html);
      console.log("Generated:", fileName);
    });
  });

  console.log("✅ UNIVERSAL GLOBAL GENERATION COMPLETE");
}

run();
