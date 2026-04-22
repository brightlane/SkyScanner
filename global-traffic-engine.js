const fs = require("fs");
const path = require("path");

const OUTPUT_DIR = "./generated-articles";

// ------------------------------
// GLOBAL CONTENT TOPICS
// ------------------------------
const topics = [
  "Cheap Flights to Tokyo",
  "Europe Budget Travel Guide",
  "Solo Travel Safety 2026",
  "Digital Nomad Cities Ranking",
  "Hidden Flight Deals Strategy",
  "World Cup 2026 Travel Planning",
  "Luxury Travel on Budget",
  "Airport Price Hack System"
];

// ------------------------------
// SOCIAL MEDIA FEEDERS
// ------------------------------
function generateSocial(topic, url) {
  return {
    twitter: `✈️ New travel intelligence: ${topic} → Save money on flights in 2026. Full guide: ${url}`,
    facebook: `🔥 Travel update: ${topic}. Discover pricing strategies and hidden flight routes → ${url}`,
    reddit: `I just published a deep dive on ${topic}. It breaks down real airline pricing behavior and booking strategy.`,
    linkedin: `Global travel insight published: ${topic}. Data-driven breakdown of flight pricing trends and optimization.`
  };
}

// ------------------------------
// HTML GENERATOR
// ------------------------------
function buildPage(topic) {
  const slug = topic.toLowerCase().replace(/\s+/g, "-");
  const url = `https://brightlane.github.io/SkyScanner/generated-articles/${slug}.html`;

  const social = generateSocial(topic, url);

  return `
<!DOCTYPE html>
<html>
<head>
  <title>${topic} | Global Travel Intelligence</title>
  <meta name="description" content="${topic} analysis for global travelers 2026">
</head>
<body>

<h1>${topic}</h1>

<p>
This global travel intelligence report analyzes ${topic.toLowerCase()} with pricing behavior,
route optimization, and seasonal demand modeling.
</p>

<h2>Core Insights</h2>
<ul>
  <li>Airline pricing shifts based on demand clusters</li>
  <li>Mid-week booking windows reduce costs</li>
  <li>Multi-hub routing improves fare efficiency</li>
</ul>

<h2>Travel Intelligence Layer</h2>
<p>
This system maps global airfare patterns and identifies cost inefficiencies across regions.
</p>

<h2>Related Strategy Pages</h2>
<a href="/SkyScanner/blog.html">Back to Travel Hub</a>

<hr>

<h3>Share This Insight</h3>
<pre>
Twitter: ${social.twitter}

Facebook: ${social.facebook}

Reddit: ${social.reddit}

LinkedIn: ${social.linkedin}
</pre>

</body>
</html>
`;
}

// ------------------------------
// INTERNAL LINK ENGINE (BASIC)
// ------------------------------
function injectInternalLinks(files) {
  files.forEach(file => {
    let content = fs.readFileSync(path.join(OUTPUT_DIR, file), "utf8");

    files.forEach(target => {
      if (target !== file) {
        const keyword = target.replace(".html", "").replace(/-/g, " ");
        const link = `<a href="/SkyScanner/generated-articles/${target}">${keyword}</a>`;
        content = content.replace(new RegExp(keyword, "gi"), link);
      }
    });

    fs.writeFileSync(path.join(OUTPUT_DIR, file), content);
  });
}

// ------------------------------
// RSS FEED GENERATOR (SEO BOOST)
// ------------------------------
function buildRSS(files) {
  let items = "";

  files.forEach(file => {
    const url = `https://brightlane.github.io/SkyScanner/generated-articles/${file}`;
    items += `
<item>
  <title>${file}</title>
  <link>${url}</link>
</item>`;
  });

  const rss = `
<rss version="2.0">
<channel>
<title>SkyScanner Global Travel Feed</title>
${items}
</channel>
</rss>`;

  fs.writeFileSync("./feed.xml", rss);
}

// ------------------------------
// MAIN ENGINE
// ------------------------------
function run() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }

  const files = [];

  // GENERATE PAGES
  topics.forEach(topic => {
    const file = topic.toLowerCase().replace(/\s+/g, "-") + ".html";
    const html = buildPage(topic);

    fs.writeFileSync(path.join(OUTPUT_DIR, file), html);
    files.push(file);
  });

  // INTERNAL LINKS
  injectInternalLinks(files);

  // RSS FEED
  buildRSS(files);

  console.log("🚀 GLOBAL TRAFFIC ENGINE COMPLETE");
}

run();
