import fs from "fs";
import path from "path";

const ROOT = "./pages";

const STRUCTURE = {
  hub: "hub",
  city: "cities",
  cluster: "clusters"
};

// -------------------------
// 🧠 CORE TOPICS
// -------------------------
const TOPICS = [
  "Tokyo",
  "Paris",
  "Bali",
  "New York",
  "Rome",
  "Lisbon"
];

// -------------------------
// 📁 ENSURE STRUCTURE
// -------------------------
for (const dir of Object.values(STRUCTURE)) {
  fs.mkdirSync(path.join(ROOT, dir), { recursive: true });
}

// -------------------------
// 📊 GROWTH LOG
// -------------------------
const log = [];

function writeLog(entry) {
  log.push(entry);
}

// -------------------------
// 🧱 PAGE GENERATOR
// -------------------------
function createPage(type, name) {
  const id = `${type}-${name.toLowerCase().replace(/\s+/g, "-")}`;
  const filePath = path.join(ROOT, STRUCTURE[type], `${id}.html`);

  const content = `
<!DOCTYPE html>
<html>
<head>
  <title>${name} - ${type}</title>
</head>
<body>

<h1>${name.toUpperCase()}</h1>
<p>Type: ${type}</p>

<nav>
  <a href="/pages/hub/hub.html">Hub</a>
</nav>

</body>
</html>
`;

  fs.writeFileSync(filePath, content);
  writeLog(`created: ${filePath}`);
}

// -------------------------
// 🔗 STRUCTURED EXPANSION
// -------------------------
function run() {
  // 1. HUBS
  TOPICS.forEach(city => {
    createPage("hub", city);

    // 2. CITY PAGES
    createPage("city", city);

    // 3. CLUSTERS (sub content)
    const clusters = [
      "flights",
      "hotels",
      "guide"
    ];

    clusters.forEach(c => {
      createPage("cluster", `${city} ${c}`);
    });
  });

  // -------------------------
  // 📄 WRITE GROWTH LOG
  // -------------------------
  fs.writeFileSync(
    "./pages/growth-log.json",
    JSON.stringify(log, null, 2)
  );

  console.log("🧠 Structured SEO Growth Complete");
  console.log("Pages created:", log.length);
}

run();
