const fs = require("fs");
const path = require("path");

console.log("🌍 SkyScanner GLOBAL Intelligence Engine Starting...");

// --------------------------------------------------
// OUTPUT (KEEP YOUR EXISTING SYSTEM)
// --------------------------------------------------
const OUTPUT_DIR = path.join(__dirname, "generated-articles");
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// --------------------------------------------------
// GLOBAL TRAVEL DATA (REAL INTENT CLUSTERS)
// --------------------------------------------------
const globalClusters = [
  {
    region: "Europe",
    intent: "cheap intercity travel + flights",
    hubs: ["London", "Paris", "Rome", "Barcelona"],
    insights: [
      "Best deals often appear 6–10 weeks before departure",
      "Budget airlines dominate short-haul routes",
      "Train + flight combos reduce total cost in Europe"
    ]
  },
  {
    region: "Asia",
    intent: "budget long-haul + backpacking routes",
    hubs: ["Bangkok", "Tokyo", "Bali", "Singapore"],
    insights: [
      "Asia offers the lowest cost-per-day travel globally",
      "Regional flights are often under $80 USD",
      "Seasonal monsoons affect pricing heavily"
    ]
  },
  {
    region: "North America",
    intent: "domestic + international flight optimization",
    hubs: ["New York", "Los Angeles", "Toronto", "Mexico City"],
    insights: [
      "Midweek flights are consistently cheaper",
      "Hub-to-hub routes offer the best pricing competition",
      "Cross-border flights (US–Mexico–Canada) fluctuate heavily"
    ]
  },
  {
    region: "Global Long-Haul",
    intent: "international optimization strategy",
    hubs: ["Dubai", "Doha", "Istanbul", "Frankfurt"],
    insights: [
      "Middle East hubs reduce global long-haul costs",
      "Layover optimization can save 20–40%",
      "Booking flexibility matters more than timing on long-haul routes"
    ]
  }
];

// --------------------------------------------------
// SLUG BUILDER
// --------------------------------------------------
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// --------------------------------------------------
// GLOBAL SEO ARTICLE BUILDER
// --------------------------------------------------
function buildArticle(cluster) {
  const title = `Global Travel Guide: ${cluster.region} Flight & Travel Strategy 2026`;
  const slug = slugify(title);

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${title} | SkyScanner Global Travel Intelligence</title>

  <meta name="description" content="Global travel strategy for ${cluster.region}. Learn flight pricing patterns, travel hubs, and booking insights for 2026.">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <link rel="canonical" href="https://brightlane.github.io/SkyScanner/${slug}.html">
</head>

<body>

<header>
  <h1>${title}</h1>
  <p>Global Travel Intelligence System</p>
</header>

<main>

<section>
  <h2>Overview: ${cluster.region}</h2>
  <p>
    This guide breaks down global travel behavior across <strong>${cluster.region}</strong>,
    focusing on pricing trends, airline competition, and optimal booking strategies.
  </p>
</section>

<section>
  <h2>Key Travel Hubs</h2>
  <ul>
    ${cluster.hubs.map(h => `<li>${h}</li>`).join("")}
  </ul>
</section>

<section>
  <h2>Global Travel Insights</h2>
  <ul>
    ${cluster.insights.map(i => `<li>${i}</li>`).join("")}
  </ul>
</section>

<section>
  <h2>Strategic Booking Intelligence</h2>
  <p>
    Travelers targeting <strong>${cluster.region}</strong> should prioritize flexibility,
    compare multi-airport routes, and monitor fare fluctuations across global hubs.
  </p>
</section>

<section>
  <h2>Related SkyScanner Intelligence</h2>
  <p>
    Explore:
    <a href="/SkyScanner/destinations.html">Destinations</a> |
    <a href="/SkyScanner/deals.html">Flight Deals</a> |
    <a href="/SkyScanner/blog.html">Travel Blog</a> |
    <a href="/SkyScanner/world.html">Global Index</a>
  </p>
</section>

</main>

<footer>
  <p>© SkyScanner Global Intelligence Engine 2026</p>
</footer>

</body>
</html>`;

  return { slug, html };
}

// --------------------------------------------------
// GENERATION LOOP
// --------------------------------------------------
for (const cluster of globalClusters) {
  const article = buildArticle(cluster);

  const filePath = path.join(OUTPUT_DIR, `${article.slug}.html`);

  fs.writeFileSync(filePath, article.html, "utf8");

  console.log("🌍 Generated:", filePath);
}

console.log("📦 GLOBAL ENGINE COMPLETE");
