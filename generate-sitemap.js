const fs = require("fs");
const path = require("path");

const BASE_URL = "https://brightlane.github.io/SkyScanner";

// files/folders to ignore
const EXCLUDE_FILES = [
  "404.html",
  "sitemap.html",
  "sitemap.xml",
  "generate-sitemap.js"
];

const SKIP_DIRS = [
  "node_modules",
  ".git"
];

// SEO priority rules
function getPriority(file) {
  if (file === "index.html") return "1.0";
  if (file === "blog.html") return "0.95";

  if (
    file.includes("paris") ||
    file.includes("tokyo") ||
    file.includes("new-york") ||
    file.includes("london") ||
    file.includes("rome") ||
    file.includes("losangeles")
  ) return "0.9";

  if (file === "about.html" || file === "faq.html") return "0.7";

  return "0.8";
}

// crawl all html files safely
function getPages(dir, list = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const fullPath = path.join(dir, file);

    if (fs.statSync(fullPath).isDirectory()) {
      if (!SKIP_DIRS.includes(file)) {
        getPages(fullPath, list);
      }
    } else if (file.endsWith(".html") && !EXCLUDE_FILES.includes(file)) {
      list.push(file);
    }
  });

  return list;
}

const pages = getPages("./");

// build sitemap URLs
const urls = pages.map(page => {
  const loc =
    page === "index.html"
      ? `${BASE_URL}/`
      : `${BASE_URL}/${page}`;

  const priority = getPriority(page);

  return `
  <url>
    <loc>${loc}</loc>
    <priority>${priority}</priority>
  </url>`;
}).join("\n");

// final sitemap XML
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

${urls}

</urlset>`;

// write file
fs.writeFileSync("sitemap.xml", sitemap.trim());

console.log("✅ Sitemap generated for SkyScanner successfully");
