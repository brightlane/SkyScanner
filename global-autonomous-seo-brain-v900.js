global-autonomous-seo-brain-v900.js/**
 * GLOBAL AUTONOMOUS SEO BRAIN v900
 * (Adaptive Travel SEO Intelligence System)
 */

import fs from "fs";
import path from "path";

/**
 * =========================
 * 1. INPUT DATA (REAL TOPICS)
 * =========================
 * This replaces random generation.
 */

const TOPICS = [
  { city: "Rome", country: "Italy", intent: "high", keywords: ["flights", "cheap flights", "Rome travel"] },
  { city: "Paris", country: "France", intent: "high", keywords: ["romantic travel", "Paris flights", "budget Paris"] },
  { city: "Tokyo", country: "Japan", intent: "high", keywords: ["Tokyo flights", "Japan travel guide", "cheap Japan"] },
  { city: "Bali", country: "Indonesia", intent: "high", keywords: ["Bali retreats", "cheap Bali flights", "digital nomad Bali"] },
  { city: "Dubai", country: "UAE", intent: "medium", keywords: ["Dubai luxury", "Dubai flights"] }
];

/**
 * =========================
 * 2. SEO SCORING ENGINE
 * =========================
 */

function scoreTopic(topic) {
  let score = 0;

  if (topic.intent === "high") score += 50;
  if (topic.keywords.length >= 3) score += 20;
  if (topic.city.length > 3) score += 10;

  return score;
}

/**
 * =========================
 * 3. CONTENT GENERATOR
 * =========================
 */

function generateArticle(topic) {
  return `
<!DOCTYPE html>
<html>
<head>
<title>${topic.city} Travel Guide 2026</title>
<meta name="description" content="Flights, hotels, and travel guide for ${topic.city}">
</head>

<body>

<h1>${topic.city}, ${topic.country} Travel Guide</h1>

<p>AI-structured travel intelligence page for ${topic.city}.</p>

<h2>Top Keywords</h2>
<ul>
${topic.keywords.map(k => `<li>${k}</li>`).join("")}
</ul>

<h2>Travel Layers</h2>
<p>Flights → Hotels → Experiences → Budget → Safety → Local tips</p>

</body>
</html>
`;
}

/**
 * =========================
 * 4. INTERNAL LINK BRAIN
 * =========================
 */

function buildBrainLinks(topics) {
  return topics.map(t => `/travel/${t.city.toLowerCase()}.html`);
}

/**
 * =========================
 * 5. AUTONOMOUS SELECTION ENGINE
 * =========================
 * ONLY generates valuable pages
 */

function selectTopics(topics) {
  return topics
    .map(t => ({ ...t, score: scoreTopic(t) }))
    .filter(t => t.score >= 60);
}

/**
 * =========================
 * 6. WRITE ENGINE
 * =========================
 */

function writePages(selected) {
  const outputDir = "./pages";

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  selected.forEach(topic => {
    const html = generateArticle(topic);

    const filePath = path.join(
      outputDir,
      `${topic.city.toLowerCase()}.html`
    );

    fs.writeFileSync(filePath, html);

    console.log("Generated:", filePath, "Score:", scoreTopic(topic));
  });
}

/**
 * =========================
 * 7. SEO BRAIN EVOLUTION LOOP
 * =========================
 * Instead of infinite generation:
 * → controlled regeneration cycle
 */

function evolveBrain(topics) {
  const selected = selectTopics(topics);

  console.log("Selected high-value nodes:", selected.length);

  writePages(selected);

  const links = buildBrainLinks(selected);

  fs.writeFileSync("./internal-links.json", JSON.stringify(links, null, 2));

  console.log("Internal brain mesh updated.");
}

/**
 * =========================
 * 8. RUN BRAIN
 * =========================
 */

console.log("🧠 Starting Autonomous SEO Brain v900...");
evolveBrain(TOPICS);
console.log("✅ Brain cycle complete.");
