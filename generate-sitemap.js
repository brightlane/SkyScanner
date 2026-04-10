const fs = require("fs");
const path = require("path");

const BASE_URL = "https://yourdomain.com"; // change this

function getPages(dir, pages = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const fullPath = path.join(dir, file);

    if (fs.statSync(fullPath).isDirectory()) {
      getPages(fullPath, pages);
    } else if (file.endsWith(".html")) {
      pages.push(file);
    }
  });

  return pages;
}

const pages = getPages("./");

const urls = pages.map(page => {
  return `
  <url>
    <loc>${BASE_URL}/${page}</loc>
  </url>`;
}).join("\n");

const sitemap =
`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

${urls}

</urlset>`;

fs.writeFileSync("sitemap.xml", sitemap);

console.log("✅ sitemap.xml generated successfully");
