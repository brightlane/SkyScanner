import fs from "fs";

const OUTPUT_DIR = "./pages";

// ⚡ SPEED SETTINGS (FAST MODE)
const CONFIG = {
  batchSize: 12,          // number of pages per run
  linksPerPage: 6,
  maxClusters: 20
};

// 🌍 REAL CLUSTERS (GLOBAL TRAVEL STRUCTURE)
const clusters = [
  {
    name: "europe",
    topics: [
      { city: "Paris", country: "France" },
      { city: "Rome", country: "Italy" },
      { city: "Berlin", country: "Germany" }
    ]
  },
  {
    name: "asia",
    topics: [
      { city: "Tokyo", country: "Japan" },
      { city: "Bangkok", country: "Thailand" },
      { city: "Seoul", country: "South Korea" }
    ]
  },
  {
    name: "americas",
    topics: [
      { city: "New York", country: "USA" },
      { city: "Los Angeles", country: "USA" },
      { city: "Toronto", country: "Canada" }
    ]
  }
];

// 🧠 BUILD ARTICLE
function buildArticle(topic, cluster) {
  const slug = topic.city.toLowerCase().replace(/\s+/g, "-");

  const links = cluster.topics
    .filter(t => t.city !== topic.city)
    .slice(0, CONFIG.linksPerPage)
    .map(t => {
      const s = t.city.toLowerCase().replace(/\s+/g, "-");
      return `<a href="/pages/${s}.html">${t.city} travel guide</a>`;
    })
    .join("<br>");

  return `
<!DOCTYPE html>
<html>
<head>
  <title>${topic.city} Travel Guide</title>
</head>

<body>

<h1>${topic.city}, ${topic.country}</h1>

<p>
High-intent global travel guide for ${topic.city}. Flights, hotels, routes and travel insights.
</p>

<h2>Related Destinations</h2>
${links}

</body>
</html>
`;
}

// ⚡ ENGINE RUNNER (FAST BATCH MODE)
function run() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }

  let count = 0;

  for (const cluster of clusters) {
    for (const topic of cluster.topics) {
      if (count >= CONFIG.batchSize) break;

      const slug = topic.city.toLowerCase().replace(/\s+/g, "-");
      const filePath = `${OUTPUT_DIR}/${slug}.html`;

      fs.writeFileSync(filePath, buildArticle(topic, cluster));
      console.log("Generated:", filePath);

      count++;
    }
  }

  console.log("Batch complete:", count, "pages generated");
}

run();
