import fs from "fs";

const topics = [
  { city: "Tokyo", country: "Japan" },
  { city: "Paris", country: "France" },
  { city: "New York", country: "USA" }
];

function buildPage(topic) {
  const slug = topic.city.toLowerCase().replace(/\s+/g, "-");

  // ✅ ALL HTML MUST BE INSIDE STRING
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${topic.city} Travel Guide</title>
</head>

<body>

  <h1>${topic.city}, ${topic.country}</h1>

  <p>Global travel intelligence page for ${topic.city}.</p>

  <!-- FIXED LINK (NO RAW HTML OUTSIDE STRING) -->
  <a href="/pages/${slug}.html">Self</a>

</body>
</html>
`;
}

function runEngine() {
  if (!fs.existsSync("./pages")) {
    fs.mkdirSync("./pages");
  }

  topics.forEach((topic) => {
    const slug = topic.city.toLowerCase().replace(/\s+/g, "-");
    const filePath = `./pages/${slug}.html`;

    fs.writeFileSync(filePath, buildPage(topic));
    console.log("Generated:", filePath);
  });
}

runEngine();
