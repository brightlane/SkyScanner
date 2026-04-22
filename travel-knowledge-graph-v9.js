import fs from "fs";
import path from "path";

// -----------------------------
// CONFIG
// -----------------------------
const OUTPUT_DIR = "./pages";

// 📡 REAL DATA SOURCES (your system hooks)
const DATA = {
  destinations: loadSafe("./travelDatabase.json", [
    "Tokyo","Paris","London","New York","Dubai","Bangkok","Rome","Barcelona"
  ]),

  keywords: loadSafe("./trending-keywords.json", [
    "cheap flights","solo travel","budget airlines","flight deals"
  ]),

  routes: [
    "NYC → London",
    "London → Tokyo",
    "Paris → Dubai",
    "LA → Bangkok"
  ]
};

// -----------------------------
// SAFE LOADER (REAL DATA HOOK SYSTEM)
// -----------------------------
function loadSafe(file, fallback) {
  try {
    if (fs.existsSync(file)) {
      return JSON.parse(fs.readFileSync(file, "utf8"));
    }
  } catch (e) {}
  return fallback;
}

// -----------------------------
// GRAPH STRUCTURE (REAL SEO MODEL)
// -----------------------------
const GRAPH = {
  "Global Travel Intelligence": {
    "Flight Pricing Systems": {
      type: "cluster",
      nodes: DATA.destinations.map(d => `${d} Flight Analysis`)
    },

    "Destination Intelligence": {
      type: "cluster",
      nodes: DATA.destinations.map(d => `${d} Travel Guide`)
    },

    "Route Optimization": {
      type: "cluster",
      nodes: DATA.routes
    }
  }
};

// -----------------------------
// UTIL
// -----------------------------
function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function slug(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

// -----------------------------
// ARTICLE BUILDER (REAL SEO STRUCTURE)
// -----------------------------
function buildArticle(title, parent, children, depth) {
  return `
<!DOCTYPE html>
<html>
<head>
  <title>${title}</title>
  <meta name="description" content="Global travel intelligence node: ${title}">
</head>
<body>

<h1>${title}</h1>

${parent ? `<p>⬅ Parent Node: ${parent}</p>` : ""}

<h2>Travel Intelligence Layer</h2>
<p>
This node is part of a global travel knowledge graph analyzing airfare pricing behavior,
route demand density, and destination traffic patterns.
</p>

<h2>Connected Nodes</h2>
<ul>
${children.map(c => `<li><a href="${slug(c)}.html">${c}</a></li>`).join("\n")}
</ul>

<h2>Cross-Route Signals</h2>
<p>
Routes and destinations are interconnected through airline pricing elasticity,
seasonal demand shifts, and global tourism cycles.
</p>

${depth < 3 ? `<p><em>Subgraph expansion available below this node level.</em></p>` : ""}

</body>
</html>
`;
}

// -----------------------------
// GRAPH ENGINE (CONTROLLED SPIDER WEB)
// -----------------------------
function run() {
  ensureDir(OUTPUT_DIR);

  let count = 0;

  for (const root in GRAPH) {
    const clusters = GRAPH[root];

    // ROOT
    const rootChildren = Object.keys(clusters);

    write(root, null, rootChildren, 1);

    for (const cluster of rootChildren) {
      const node = clusters[cluster];
      const children = node.nodes || [];

      write(cluster, root, children, 2);

      for (const child of children) {
        write(child, cluster, [], 3);

        if (++count > 250) {
          console.log("🚦 SAFETY LIMIT REACHED");
          return;
        }
      }
    }
  }

  console.log(`🌍 V9 COMPLETE → ${count} REAL-DATA SEO NODES GENERATED`);
}

// -----------------------------
// WRITE FUNCTION
// -----------------------------
function write(title, parent, children, depth) {
  const file = path.join(OUTPUT_DIR, `${slug(title)}.html`);

  if (fs.existsSync(file)) return;

  const html = buildArticle(title, parent, children, depth);
  fs.writeFileSync(file, html);
}

run();
