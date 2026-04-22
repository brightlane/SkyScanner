import fs from "fs";
import path from "path";

const OUTPUT_DIR = "./generated";
const GRAPH_FILE = "./seo-graph.json";

// -----------------------------
// 🌐 INITIAL GRAPH STATE
// -----------------------------
let graph = fs.existsSync(GRAPH_FILE)
  ? JSON.parse(fs.readFileSync(GRAPH_FILE, "utf-8"))
  : {
      nodes: {},
      edges: []
    };

// -----------------------------
// 🌍 BASE TOPICS (SEEDS)
// -----------------------------
const SEED_TOPICS = [
  { city: "Tokyo", type: "hub" },
  { city: "Paris", type: "hub" },
  { city: "New York", type: "hub" },
  { city: "Bali", type: "hub" }
];

// -----------------------------
// 🧠 NODE CREATION
// -----------------------------
function createNode(city, category = "guide") {
  const id = `${city}-${category}`;

  if (!graph.nodes[id]) {
    graph.nodes[id] = {
      city,
      category,
      score: 1,
      links: [],
      created: Date.now()
    };
  }

  return graph.nodes[id];
}

// -----------------------------
// 🔗 EDGE CREATION (LINKING)
// -----------------------------
function linkNodes(from, to) {
  const edge = `${from}-${to}`;

  if (!graph.edges.includes(edge)) {
    graph.edges.push(edge);
    graph.nodes[from]?.links.push(to);
  }
}

// -----------------------------
// 📄 ARTICLE GENERATION
// -----------------------------
function generateArticle(node) {
  const links = node.links
    .map(l => `<a href="./${l}.html">${l}</a>`)
    .join(" • ");

  return `
<!DOCTYPE html>
<html>
<head>
  <title>${node.city} Travel Guide</title>
</head>
<body>

<h1>${node.city} Travel Intelligence</h1>

<p>Autonomous SEO Graph Node: ${node.category}</p>

<h3>Related destinations</h3>
<div>${links}</div>

</body>
</html>
  `;
}

// -----------------------------
// 🌱 EXPANSION ENGINE
// -----------------------------
function expandGraph() {
  const newNodes = [];

  for (const seed of SEED_TOPICS) {
    const hub = createNode(seed.city, "hub");

    const subTopics = ["flights", "hotels", "budget", "safety"];

    subTopics.forEach(type => {
      const child = createNode(seed.city + "-" + type, type);

      linkNodes(hub.city + "-hub", child.city + "-" + type);

      newNodes.push(child);
    });
  }

  return newNodes;
}

// -----------------------------
// 📦 WRITE PAGES
// -----------------------------
function writePages() {
  for (const key in graph.nodes) {
    const node = graph.nodes[key];

    const html = generateArticle(node);

    const file = path.join(
      OUTPUT_DIR,
      `${node.city}-${node.category}.html`
    );

    fs.writeFileSync(file, html);
  }
}

// -----------------------------
// 💾 SAVE GRAPH
// -----------------------------
function saveGraph() {
  fs.writeFileSync(GRAPH_FILE, JSON.stringify(graph, null, 2));
}

// -----------------------------
// 🚀 RUN ENGINE
// -----------------------------
function run() {
  expandGraph();
  writePages();
  saveGraph();

  console.log("SEO GRAPH v5 UPDATED");
}

run();
