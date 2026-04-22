import fs from "fs";
import path from "path";

const OUTPUT_DIR = "./pages";

/**
 * GLOBAL TOPIC STREAM
 */

const STREAM = [
  { city: "Rome", country: "Italy" },
  { city: "Paris", country: "France" },
  { city: "Tokyo", country: "Japan" },
  { city: "Bali", country: "Indonesia" }
];

/**
 * SAFE FILE NAME
 */
function slug(city) {
  return city.toLowerCase().replace(/\s/g, "-");
}

/**
 * CHECK EXISTING FILE
 */
function exists(city) {
  return fs.existsSync(
    path.join(OUTPUT_DIR, `${slug(city)}.html`)
  );
}

/**
 * GENERATE HTML (FIXED SAFE VERSION)
 */
function generatePage(topic) {
  const title = `${topic.city} Travel Guide`;

  const links = STREAM.map(t =>
    `<li><a href="/pages/${slug(t.city)}.html">${t.city}</a></li>`
  ).join("");

  return `
<!DOCTYPE html>
<html>
<head>
<title>${title}</title>
<meta name="description" content="Travel guide for ${topic.city}">
</head>

<body>

<h1>${title}</h1>

<p>Autonomous travel node for ${topic.city}</p>

<h2>Explore destinations</h2>
<ul>
${links}
</ul>

</body>
</html>
`;
}

/**
 * WRITE FILE
 */
function write(topic) {
  if (exists(topic.city)) {
    console.log("Skip:", topic.city);
    return;
  }

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const file = path.join(OUTPUT_DIR, `${slug(topic.city)}.html`);

  fs.writeFileSync(file, generatePage(topic));

  console.log("Generated:", file);
}

/**
 * RUN ENGINE
 */
function run() {
  console.log("🌍 Running fixed autonomous engine v1001");

  STREAM.forEach(write);

  console.log("✅ Done");
}

run();
