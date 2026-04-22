import fs from "fs";
import path from "path";

const OUTPUT = "./pages";
const GRAPH_FILE = "./seo-brain.json";

// -----------------------------
// 🌍 INITIAL SEED (REAL SEO TOPICS)
// -----------------------------
const SEED = [
  { city: "Tokyo", intent: "flights", region: "Asia" },
  { city: "Paris", intent: "flights", region: "Europe" },
  { city: "Bali", intent: "budget", region: "Asia" },
  { city: "New York", intent: "hotels", region: "Americas" },
  { city: "Rome", intent: "guide", region: "Europe" },
  { city: "Lisbon", intent: "flights", region: "Europe" }
];

// -----------------------------
// 🧠 LOAD GRAPH MEMORY
// -----------------------------
let graph = fs.existsSync(GRAPH_FILE)
  ? JSON.parse(fs.readFileSync(GRAPH_FILE, "utf-8"))
  : { nodes: {}, edges: [] };

// -----------------------------
// 🧩 CREATE NODE
// -----------------------------
function id(city, intent) {
  return `${city}-${intent}`;
}

function create(city, intent, region) {
  const nodeId = id(city, intent);

  if (!graph.nodes[nodeId]) {
    graph.nodes[nodeId] = {
      city,
      intent,
      region,
      score: 1,
      links: [],
      visits: Math.floor(Math.random() * 100),
      created: Date.now()
    };
  }

  return graph.nodes[nodeId];
}

// -----------------------------
// 🔗 LINK SYSTEM
// -----------------------------
function link(a, b) {
  const edge = `${a}->${b}`;

  if (!graph.edges.includes(edge)) {
    graph.edges.push(edge);

    if (graph.nodes[a] && !graph.nodes[a].links.includes(b)) {
      graph.nodes[a].links.push(b);
    }
  }
}

// -----------------------------
// 📊 SEO SCORING ENGINE
// -----------------------------
function score(node) {
  const linkScore = node.links.length * 2;
  const trafficScore = node.visits / 5;
  const agePenalty = (Date.now() - node.created) / 10000000;

  node.score = linkScore + trafficScore - agePenalty;

  return node.score;
}

// -----------------------------
// 🧠 RANKING BRAIN
// -----------------------------
function rankNodes() {
  const nodes = Object.keys(graph.nodes);

  nodes.forEach(k => score(graph.nodes[k]));

  return nodes.sort(
    (a, b) => graph.nodes[b].score - graph.nodes[a].score
  );
}

// -----------------------------
// 🌱 EXPANSION LOGIC (SMART, NOT INFINITE)
// -----------------------------
function expand() {
  const ranked = rankNodes();

  for (const item of SEED) {
    const hub = create(item.city, "hub", item.region);
    const main = create(item.city, item.intent, item.region);

    link(id(item.city, "hub"), id(item.city, item.intent));

    const subpages = [
      "cheap-flights",
      "best-time-to-visit",
      "travel-guide"
    ];

    subpages.forEach(type => {
      const child = create(`${item.city}-${type}`, type, item.region);

      link(id(item.city, item.intent), `${item.city}-${type}`);
    });
  }

  // 🔥 boost top performing nodes
  for (let i = 0; i < Math.min(5, ranked.length); i++) {
    const top = graph.nodes[ranked[i]];

    if (top) {
      const random = ranked[Math.floor(Math.random() * ranked.length)];
      link(ranked[i], random);
    }
  }
}

// -----------------------------
// 🧱 HTML GENERATOR (SEO OPTIMIZED)
// -----------------------------
function render(node) {
  const links = node.links
    .map(l => `<a href="./${l}.html">${l}</a>`)
    .join(" • ");

  return `
<!DOCTYPE html>
<html>
<head>
  <title>${node.city} ${node.intent}</title>
  <meta name="description" content="Best ${node.intent} deals for ${node.city}">
</head>
<body>

<h1>${node.city} ${node.intent.toUpperCase()}</h1>

<p><strong>SEO Score:</strong> ${node.score.toFixed(2)}</p>

<h2>Why ${node.city}?</h2>
<ul>
  <li>High demand travel destination</li>
  <li>Price optimization window active</li>
  <li>Best routes currently available</li>
</ul>

<h3>Related pages</h3>
<div>${links}</div>

<a href="/affiliate" style="padding:12px;background:#0072b2;color:white;">
Search Live Flights
</a>

</body>
</html>
`;
}

// -----------------------------
// 📦 WRITE PAGES
// -----------------------------
function write() {
  for (const key in graph.nodes) {
    const node = graph.nodes[key];

    const file = path.join(OUTPUT, `${key}.html`);
    fs.writeFileSync(file, render(node));
  }
}

// -----------------------------
// 💾 SAVE STATE
// -----------------------------
function save() {
  fs.writeFileSync(GRAPH_FILE, JSON.stringify(graph, null, 2));
}

// -----------------------------
// 🚀 AUTONOMOUS CYCLE
// -----------------------------
function run() {
  expand();
  write();
  save();

  console.log("🧠 AUTONOMOUS SEO BRAIN CYCLE COMPLETE");
}

run();
