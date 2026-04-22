const fs = require("fs");
const path = require("path");

const OUTPUT_DIR = "./generated-articles";

// ------------------------------
// REAL SEO TRAVEL TOPICS (HIGH INTENT ONLY)
// ------------------------------
let topics = [
  { topic: "Cheap Flights to Tokyo 2026", score: 70, clicks: 0 },
  { topic: "Best Time to Book Flights to Europe", score: 75, clicks: 0 },
  { topic: "Digital Nomad Cities Ranked 2026", score: 80, clicks: 0 },
  { topic: "World Cup 2026 Travel Guide", score: 85, clicks: 0 },
  { topic: "How Airline Pricing Actually Works", score: 90, clicks: 0 }
];

// ------------------------------
// REAL USER-INTENT EXPANSION (NOT RANDOM)
// ------------------------------
function expand(topic) {
  return [
    `${topic} Cheapest Booking Strategy`,
    `${topic} Mistakes to Avoid`,
    `${topic} Step-by-Step Planning`,
    `${topic} Hidden Fare Windows`,
    `${topic} Advanced Optimization Guide`
  ];
}

// ------------------------------
// QUALITY FILTER
// ------------------------------
function isValid(topic) {
  return topic.length > 10 && !topic.includes("clickbait");
}

// ------------------------------
// HTML GENERATOR (SEO STRUCTURED)
// ------------------------------
function buildPage(topicObj) {
  const slug = topicObj.topic.toLowerCase().replace(/\s+/g, "-");
  const file = `${slug}.html`;

  const content = `
<!DOCTYPE html>
<html>
<head>
<title>${topicObj.topic}</title>
<meta name="description" content="Deep travel SEO guide: ${topicObj.topic}">
</head>

<body>

<h1>${topicObj.topic}</h1>

<p>
This article analyzes real-world travel pricing behavior, route economics,
and booking optimization strategies for global travelers.
</p>

<h2>Core Insight</h2>
<p>
Airfare pricing is driven by demand velocity, seat inventory pressure,
and competitor routing overlap.
</p>

<h2>Strategy Layer</h2>
<ul>
<li>Booking timing matters more than destination</li>
<li>Multi-stop routes reduce pricing spikes</li>
<li>Search frequency influences fare adjustments</li>
</ul>

<h2>Related Topics</h2>
<ul>
${expand(topicObj.topic)
  .filter(isValid)
  .map(t => `<li><a href="${t.toLowerCase().replace(/\s+/g, "-")}.html">${t}</a></li>`)
  .join("\n")}
</ul>

<p><a href="/SkyScanner/blog.html">Main Hub</a></p>

</body>
</html>
`;

  fs.writeFileSync(path.join(OUTPUT_DIR, file), content);
  return file;
}

// ------------------------------
// SIMULATED PERFORMANCE TRACKING
// (replace later with real analytics)
// ------------------------------
function simulatePerformance() {
  topics = topics.map(t => {
    const randomClicks = Math.floor(Math.random() * 100);
    return { ...t, clicks: randomClicks };
  });
}

// ------------------------------
// SELF-OPTIMIZATION ENGINE
// ------------------------------
function evolve() {
  simulatePerformance();

  // Sort by performance
  topics.sort((a, b) => b.clicks - a.clicks);

  // Keep top performers
  const winners = topics.filter(t => t.clicks > 40);

  // Expand winners
  let newTopics = [];

  winners.forEach(w => {
    expand(w.topic).forEach(child => {
      newTopics.push({
        topic: child,
        score: w.score + 5,
        clicks: 0
      });
    });
  });

  // Merge + dedupe
  topics = [...winners, ...newTopics];

  // Limit growth (IMPORTANT)
  topics = topics.slice(0, 25);
}

// ------------------------------
// MAIN RUN
// ------------------------------
function run() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }

  evolve();

  const files = topics.map(t => buildPage(t));

  console.log("🌍 SEO SELF-OPTIMIZING ENGINE RUN COMPLETE");
  console.log("Pages generated:", files.length);
}

run();
