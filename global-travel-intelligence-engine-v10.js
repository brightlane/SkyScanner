import fs from "fs";
import path from "path";

const OUTPUT_DIR = "./pages";

// GLOBAL DATA (replace with API later if needed)
const travelGraph = [
  {
    city: "Tokyo",
    country: "Japan",
    keywords: ["flights to Tokyo", "cheap Tokyo travel", "Japan guide"],
    links: ["Seoul", "Bangkok", "Singapore"]
  },
  {
    city: "Paris",
    country: "France",
    keywords: ["flights to Paris", "Paris budget travel", "France guide"],
    links: ["London", "Rome", "Berlin"]
  },
  {
    city: "New York",
    country: "USA",
    keywords: ["NYC flights", "cheap flights New York", "USA travel"],
    links: ["Los Angeles", "Toronto", "London"]
  }
];

// CREATE OUTPUT FOLDER
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR);
}

// SEO TEXT GENERATOR (real content style)
function generateArticle(city, country, keywords) {
  return `
<!DOCTYPE html>
<html>
<head>
<title>${city} Travel Guide | Global Flight Intelligence</title>
<meta name="description" content="Ultimate travel guide for ${city}, ${country}. Flights, hotels, and insider travel insights.">
</head>

<body>
<h1>${city}, ${country} Travel Intelligence Guide</h1>

<p>
${city} is one of the most searched global destinations for travelers looking for flights, culture, and affordability.
</p>

<h2>Top Search Trends</h2>
<ul>
${keywords.map(k => `<li>${k}</li>`).join("")}
</ul>

<h2>Connected Travel Routes</h2>
<ul>
${travelGraph
  .find(t => t.city === city)
  .links.map(link => {
    const slug = link.toLowerCase().replace(/\s/g, "-");
    return `<li><a href="/pages/${slug}.html">${link} Travel Route</a></li>`;
  })
  .join("")}
</ul>

<h2>AI Travel Insight</h2>
<p>
Travel demand for ${city} is increasing globally due to tourism trends, flight optimization, and digital nomad migration.
</p>

</body>
</html>
`;
}

// GENERATE ALL PAGES
function buildEngine() {
  travelGraph.forEach(topic => {
    const filePath = path.join(
      OUTPUT_DIR,
      topic.city.toLowerCase().replace(/\s/g, "-") + ".html"
    );

    const html = generateArticle(
      topic.city,
      topic.country,
      topic.keywords
    );

    fs.writeFileSync(filePath, html);
    console.log("Generated:", filePath);
  });
}

buildEngine();
