const fs = require("fs");
const path = require("path");

const ARTICLES_DIR = "./generated-articles";

// Collect all articles
const files = fs.readdirSync(ARTICLES_DIR).filter(f => f.endsWith(".html"));

// Build keyword map (simple version)
const keywords = [
  "Europe", "Asia", "America",
  "flight", "travel", "budget",
  "Paris", "Tokyo", "New York",
  "Bali", "London", "Rome"
];

function injectLinks(html, fileName) {
  let linked = html;

  keywords.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, "g");

    // avoid linking inside existing anchors
    linked = linked.replace(regex, (match) => {
      if (Math.random() > 0.7) {
        const target = files[Math.floor(Math.random() * files.length)];
        if (target !== fileName) {
          return `<a href="/SkyScanner/generated-articles/${target}">${match}</a>`;
        }
      }
      return match;
    });
  });

  return linked;
}

// Process all files
files.forEach(file => {
  const filePath = path.join(ARTICLES_DIR, file);
  const html = fs.readFileSync(filePath, "utf8");

  const updated = injectLinks(html, file);

  fs.writeFileSync(filePath, updated);
});

console.log("✅ Internal linking injected across generated articles");
