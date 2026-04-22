import fs from "fs";
import path from "path";

/**
 * GLOBAL SEO KNOWLEDGE GRAPH v3
 * Travel intelligence + internal linking engine
 */

const OUTPUT_DIR = "./generated-articles";
const SITE_BASE = "https://brightlane.github.io/SkyScanner";

// -----------------------------
// 🌍 REAL GLOBAL TRAVEL DATA
// -----------------------------
const GRAPH = {
  Europe: {
    hubs: ["cheap flights europe", "europe travel guide", "europe backpacking"],
    cities: ["Paris", "Rome", "Barcelona", "Lisbon", "Berlin"]
  },
  Asia: {
    hubs: ["asia travel guide", "cheap asia flights", "digital nomad asia"],
    cities: ["Tokyo", "Bangkok", "Bali", "Seoul", "Hanoi"]
  },
  Americas: {
    hubs: ["north america travel", "south america backpacking", "cheap flights americas"],
    cities: ["New York", "Los Angeles", "Toronto", "Mexico City", "Rio de Janeiro"]
  }
};

// -----------------------------
// 🧠 INTERNAL LINK GENERATOR
// -----------------------------
function linkTo(city) {
  return `${SITE_BASE}/pages/${city.toLowerCase().replace(/\s/g, "-")}.html`;
}

// -----------------------------
// ✍️ ARTICLE GENERATOR
// -----------------------------
function generateCityArticle(region, city) {
  const relatedCities = GRAPH[region].cities.filter(c => c !== city);

  const links = relatedCities
    .slice(0, 3)
    .map(c => `<a href="${linkTo(c)}">${c} Travel Guide</a>`)
    .join("<br>");

  return `
<!DOCTYPE html>
<html>
<head>
<title>${city} Travel Guide 2026</title>
<meta name="description" content="Complete ${city} travel guide with flights, hotels and itineraries.">
</head>
<body>

<h1>${city} Travel Guide</h1>

<p>
Explore ${city} with real-time travel insights, flight deals, and digital nomad tips.
</p>

<h2>Related Destinations</h2>
${links}

<h2>Travel Intelligence</h2>
<p>
Best time to visit ${city}: Spring & Autumn.
Average flight optimization score: High.
</p>

</body>
</html>
`;
}

// -----------------------------
// 🧭 HUB PAGE GENERATOR
// -----------------------------
function generateHub(region) {
  const cities = GRAPH[region].cities;

  const links = cities
    .map(c => `<li><a href="${linkTo(c)}">${c}</a></li>`)
    .join("\n");

  return `
<!DOCTYPE html>
<html>
<head>
<title>${region} Travel Hub</title>
</head>
<body>

<h1>${region} Travel Intelligence Hub</h1>

<ul>
${links}
</ul>

<p>
Automatically generated global travel cluster for SEO authority building.
</p>

</body>
</html>
`;
}

// -----------------------------
// 🚀 GRAPH EXECUTION ENGINE
// -----------------------------
function runGraph() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  for (const region of Object.keys(GRAPH)) {
    // 1. Create hub page
    const hub = generateHub(region);
    fs.writeFileSync(
      path.join(OUTPUT_DIR, `${region.toLowerCase()}-hub.html`),
      hub
    );

    // 2. Create city pages
    for (const city of GRAPH[region].cities) {
      const article = generateCityArticle(region, city);

      fs.writeFileSync(
        path.join(OUTPUT_DIR, `${city.toLowerCase().replace(/\s/g, "-")}.html`),
        article
      );
    }
  }

  console.log("✅ Global SEO Knowledge Graph v3 generated");
}

runGraph();
