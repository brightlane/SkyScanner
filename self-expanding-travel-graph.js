const fs = require("fs");
const path = require("path");

const OUTPUT_DIR = "./generated-articles";

// ------------------------------
// SEED KNOWLEDGE NODES
// ------------------------------
const seedTopics = [
  "Cheap Flights to Tokyo",
  "Europe Budget Travel Strategy",
  "Digital Nomad Cities 2026",
  "World Cup 2026 Travel Planning",
  "Airline Pricing System Explained"
];

// ------------------------------
// EXPANSION RULES (THIS IS THE "SPIDER WEB")
// ------------------------------
function expandTopic(topic) {
  return [
    `${topic} Best Booking Time`,
    `${topic} Hidden Strategies`,
    `${topic} Mistakes Travelers Make`,
    `${topic} Advanced Fare Optimization`,
    `${topic} Route Comparison Guide`
  ];
}

// ------------------------------
// QUALITY FILTER (prevents spam expansion)
// ------------------------------
function isHighValue(topic) {
  const bad = ["clickbait", "free", "cheap tricks"];
  return !bad.some(b => topic.toLowerCase().includes(b));
}

// ------------------------------
// CORE ARTICLE GENERATOR
// ------------------------------
function buildArticle(topic, depth = 1) {
  return `
<!DOCTYPE html>
<html>
<head>
  <title>${topic} | Global Travel Intelligence</title>
  <meta name="description" content="Deep travel analysis: ${topic}">
</head>
<body>

<h1>${topic}</h1>

<p>
This article is part of a global travel intelligence network analyzing airfare behavior,
route economics, and booking optimization patterns.
</p>

<h2>Core Insight</h2>
<p>
Airline pricing systems adjust dynamically based on demand velocity, seasonal compression,
and competitor routing pressure.
</p>

<h2>Strategic Layer</h2>
<ul>
  <li>Timing affects fare volatility more than destination</li>
  <li>Indirect routes often bypass pricing spikes</li>
  <li>Search repetition influences dynamic pricing models</li>
</ul>

<h2>Network Expansion Depth: ${depth}</h2>

<h2>Related Intelligence Nodes</h2>
<div>
  ${expandTopic(topic)
    .map(t => `<a href="${slugify(t)}.html">${t}</a>`)
    .join("<br>")}
</div>

<hr>
<a href="/SkyScanner/blog.html">Main Hub</a>

</body>
</html>
`;
}

// ------------------------------
// SLUG FUNCTION
// ------------------------------
function slugify(text) {
  return text.toLowerCase().replace(/\s+/g, "-");
}

// ------------------------------
// SPIDER EXPANSION ENGINE
// ------------------------------
function generateNode(topic, depth, maxDepth, created = new Set()) {
  if (depth > maxDepth || created.has(topic)) return [];

  created.add(topic);

  const file = `${slugify(topic)}.html`;
  const filePath = path.join(OUTPUT_DIR, file);

  fs.writeFileSync(filePath, buildArticle(topic, depth));

  let all = [file];

  // expand children (spider web effect)
  const children = expandTopic(topic);

  children.forEach(child => {
    if (isHighValue(child)) {
      const result = generateNode(child, depth + 1, maxDepth, created);
      all = all.concat(result);
    }
  });

  return all;
}

// ------------------------------
// MAIN ENGINE
// ------------------------------
function run() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }

  let allFiles = [];
  const visited = new Set();

  seedTopics.forEach(seed => {
    const generated = generateNode(seed, 1, 2, visited);
    allFiles = allFiles.concat(generated);
  });

  console.log("🌍 SELF-EXPANDING TRAVEL GRAPH COMPLETE");
  console.log(`Nodes generated: ${allFiles.length}`);
}

run();
