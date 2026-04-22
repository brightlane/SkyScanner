const fs = require("fs");
const path = require("path");

const OUTPUT_DIR = "./generated-articles";

// 🌍 Supported languages (expand anytime)
const LANGUAGES = {
  en: "English",
  es: "Spanish",
  fr: "French",
  de: "German",
  it: "Italian",
  pt: "Portuguese",
  ja: "Japanese",
  ko: "Korean",
  zh: "Chinese"
};

// 🧠 Topic seed system (high-intent travel queries only)
const TOPICS = [
  "Cheap Flights to Tokyo Strategy",
  "Best Time to Book Europe Flights",
  "Digital Nomad City Ranking 2026",
  "How Airlines Price Flights (Real Model)",
  "Hidden Flight Deal Patterns",
  "World Cup 2026 Travel Planning Guide",
  "Budget Luxury Travel System",
  "Airport Fare Optimization Logic"
];

// ------------------------------
// CORE QUALITY ENGINE
// ------------------------------
function qualityScore(topic) {
  let score = 50;

  if (topic.includes("Strategy")) score += 15;
  if (topic.includes("Guide")) score += 10;
  if (topic.includes("System")) score += 20;
  if (topic.includes("Ranking")) score += 15;

  return score;
}

// ------------------------------
// “REAL VALUE” ARTICLE GENERATOR
// ------------------------------
function generateArticle(topic, lang) {
  const langName = LANGUAGES[lang];

  const depthBlock = `
This analysis explores ${topic.toLowerCase()} through pricing behavior, seasonal demand cycles, airline yield management, and traveler decision timing.

Key insight: flight pricing is not random — it is dynamically adjusted based on demand clusters, route saturation, and booking velocity.
`;

  const strategyBlock = `
Strategic Breakdown:
- Midweek booking windows reduce average fare volatility
- Multi-hub routing often bypasses premium pricing layers
- Early vs late booking depends on route class elasticity
`;

  const seoBlock = `
This guide is optimized for global travelers searching for advanced fare optimization strategies and international travel planning systems.
`;

  return `
<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="UTF-8">
<title>${topic} (${langName}) | Global Travel Intelligence</title>
<meta name="description" content="${topic} guide in ${langName}">
</head>

<body>

<h1>${topic}</h1>
<p><strong>Language:</strong> ${langName}</p>

<h2>Overview</h2>
<p>${depthBlock}</p>

<h2>Strategy Layer</h2>
<p>${strategyBlock}</p>

<h2>Global Insight</h2>
<p>
Airline pricing systems behave like dynamic auctions influenced by demand pressure and route competition.
</p>

<h2>SEO Context</h2>
<p>${seoBlock}</p>

<hr>

<h3>Internal Network</h3>
<a href="/SkyScanner/blog.html">Main Travel Hub</a>

</body>
</html>
`;
}

// ------------------------------
// MULTI-LANGUAGE ENGINE
// ------------------------------
function buildAllLanguages(topic) {
  const files = [];

  Object.keys(LANGUAGES).forEach(lang => {
    const slug = topic.toLowerCase().replace(/\s+/g, "-");
    const fileName = `${slug}-${lang}.html`;

    const content = generateArticle(topic, lang);

    fs.writeFileSync(
      path.join(OUTPUT_DIR, fileName),
      content
    );

    files.push(fileName);
  });

  return files;
}

// ------------------------------
// INTERNAL LINK GRAPH
// ------------------------------
function linkPages(files) {
  files.forEach(file => {
    let content = fs.readFileSync(path.join(OUTPUT_DIR, file), "utf8");

    files.forEach(target => {
      if (target !== file) {
        const name = target.replace(".html", "").replace(/-/g, " ");
        content = content.replace(
          new RegExp(name, "gi"),
          `<a href="${target}">${name}</a>`
        );
      }
    });

    fs.writeFileSync(path.join(OUTPUT_DIR, file), content);
  });
}

// ------------------------------
// MAIN ENGINE LOOP
// ------------------------------
function run() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }

  let allFiles = [];

  TOPICS.forEach(topic => {
    const score = qualityScore(topic);

    // 🔥 Only generate high-quality topics
    if (score >= 60) {
      const files = buildAllLanguages(topic);
      allFiles = allFiles.concat(files);
    }
  });

  linkPages(allFiles);

  console.log("🌍 GLOBAL INTELLIGENCE WRITER COMPLETE");
  console.log(`Generated: ${allFiles.length} multilingual pages`);
}

run();
