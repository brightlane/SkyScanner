import fs from "fs";
import path from "path";

// ----------------------------
// CONFIG (GLOBAL SCALE)
// ----------------------------
const OUTPUT_DIR = "./pages";

// Root → Cluster → Leaf structure
const GRAPH = {
  "Global Travel": {
    "Flight Deals": [
      "Cheap Flights Europe",
      "Cheap Flights Asia",
      "Cheap Flights Americas"
    ],
    "Destinations": [
      "Paris Travel Guide",
      "Tokyo Travel Guide",
      "New York Travel Guide",
      "Dubai Travel Guide"
    ],
    "Travel Hacks": [
      "Hidden Airline Pricing Tricks",
      "Best Time to Book Flights",
      "Budget Travel Strategy"
    ]
  }
};

// Depth limit = prevents infinite spider loops
const MAX_DEPTH = 3;

// ----------------------------
// UTIL
// ----------------------------
function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function slug(str) {
  return str.toLowerCase().replace(/\s+/g, "-");
}

// ----------------------------
// ARTICLE BUILDER
// ----------------------------
function buildPage(title, parent = null, children = []) {
  return `
<!DOCTYPE html>
<html>
<head>
  <title>${title}</title>
  <meta name="description" content="Global travel intelligence: ${title}">
</head>
<body>

<h1>${title}</h1>

${parent ? `<p>⬅ Parent: ${parent}</p>` : ""}

<h2>Overview</h2>
<p>
This page is part of a global travel intelligence graph covering destinations,
flight pricing, and travel strategy across international routes.
</p>

<h2>Related Nodes</h2>
<ul>
${children.map(c => `<li><a href="${slug(c)}.html">${c}</a></li>`).join("\n")}
</ul>

<h2>Travel Insight Layer</h2>
<p>
Airfare pricing is influenced by demand clustering, seasonal volatility, and airline competition density.
This node connects into a wider global travel dataset.
</p>

</body>
</html>
`;
}

// ----------------------------
// GRAPH BUILDER (SPIDER WEB LOGIC)
// ----------------------------
function generate() {
  ensureDir(OUTPUT_DIR);

  let pages = 0;

  const root = Object.keys(GRAPH);

  for (const rootNode of root) {
    const level1 = GRAPH[rootNode];

    // ROOT PAGE
    const rootChildren = Object.keys(level1);
    fs.writeFileSync(
      path.join(OUTPUT_DIR, `${slug(rootNode)}.html`),
      buildPage(rootNode, null, rootChildren)
    );
    pages++;

    // LEVEL 2
    for (const cluster of rootChildren) {
      const level2 = level1[cluster];

      fs.writeFileSync(
        path.join(OUTPUT_DIR, `${slug(cluster)}.html`),
        buildPage(cluster, rootNode, level2)
      );
      pages++;

      // LEVEL 3 (LEAF NODES)
      for (const leaf of level2) {
        fs.writeFileSync(
          path.join(OUTPUT_DIR, `${slug(leaf)}.html`),
          buildPage(leaf, cluster, [])
        );
        pages++;

        if (pages > 200) {
          console.log("Safety cap reached");
          return;
        }
      }
    }
  }

  console.log(`🌍 SEO GRAPH COMPLETE → ${pages} structured travel pages generated`);
}

generate();
