/**
 * Autonomous SEO Evolution System v999 (REAL VERSION)
 * - No infinite generation
 * - Self-scoring content graph
 * - Evolution cycles (like training loop)
 */

import fs from "fs";

const OUTPUT = "./generated-articles";

// -----------------------------
// 🌍 INITIAL CONTENT GRAPH
// -----------------------------
let GRAPH = [
  {
    id: "tokyo",
    type: "destination",
    score: 0.6,
    links: ["paris", "bali"],
    keywords: ["tokyo travel", "japan flights", "asia guide"]
  },
  {
    id: "paris",
    type: "destination",
    score: 0.7,
    links: ["tokyo", "new-york"],
    keywords: ["paris travel", "france flights", "europe guide"]
  },
  {
    id: "bali",
    type: "destination",
    score: 0.65,
    links: ["tokyo"],
    keywords: ["bali travel", "cheap flights bali", "digital nomad"]
  },
  {
    id: "new-york",
    type: "destination",
    score: 0.75,
    links: ["paris"],
    keywords: ["new york flights", "usa travel", "city guide"]
  }
];

// -----------------------------
// 🧠 SCORING ENGINE (SEO SIMULATION)
// -----------------------------
function evaluate(node) {
  const linkStrength = node.links.length * 0.1;
  const keywordStrength = node.keywords.length * 0.08;

  const randomness = Math.random() * 0.1;

  return (
    node.score * 0.5 +
    linkStrength +
    keywordStrength +
    randomness
  );
}

// -----------------------------
// 🔁 EVOLUTION STEP
// -----------------------------
function evolve() {
  GRAPH = GRAPH.map(node => {
    let newScore = evaluate(node);

    // Boost high-performing nodes
    if (newScore > 0.8) {
      node.links.push("global-hub");
    }

    return {
      ...node,
      score: parseFloat(newScore.toFixed(3))
    };
  });

  // prune weak nodes
  GRAPH = GRAPH.filter(n => n.score > 0.4);
}

// -----------------------------
// 🧱 HTML GENERATION
// -----------------------------
function buildPages() {
  fs.mkdirSync(OUTPUT, { recursive: true });

  for (const node of GRAPH) {
    const html = `
<!DOCTYPE html>
<html>
<head>
<title>${node.id.toUpperCase()} Travel Intelligence</title>
</head>
<body>

<h1>${node.id.toUpperCase()} NODE</h1>

<p><strong>SEO Score:</strong> ${node.score}</p>

<h2>Keywords</h2>
<p>${node.keywords.join(", ")}</p>

<h2>Internal Links</h2>
${node.links.map(l => `<a href="${l}.html">${l}</a>`).join("<br>")}

</body>
</html>
`;

    fs.writeFileSync(`${OUTPUT}/${node.id}.html`, html);
  }
}

// -----------------------------
// 🚀 EVOLUTION LOOP (CONTROLLED)
// -----------------------------
function runEvolution(cycles = 3) {
  console.log("🌐 Starting v999 SEO evolution system...");

  for (let i = 0; i < cycles; i++) {
    console.log(`Cycle ${i + 1}`);
    evolve();
  }

  buildPages();

  console.log("✅ Evolution complete — stable SEO graph generated");
}

runEvolution();
