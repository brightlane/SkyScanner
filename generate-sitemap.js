// generate-sitemap.js
const fs = require('fs');
const path = require('path');

// List of all the HTML files in your project (update this if your pages are in different directories)
const pages = [
  'index.html',
  'stadiumstay.html',
  'about.html',
  'blog.html',
  'calculator.html',
  'contact.html',
  'faq.html',
  'privacy.html',
  'terms.html',
  'destinations.html',
  'collections.html',
  'routes.html',
  'solo.html',
  'surge.html',
  'subscribe.html',
  // Add more HTML pages as needed
];

// Function to generate the sitemap
function generateSitemap() {
  const urlSet = pages.map(page => {
    const lastModified = new Date().toISOString(); // Set this dynamically if you have last-modified information
    return `
      <url>
        <loc>https://brightlane.github.io/SkyScanner/${page}</loc>
        <lastmod>${lastModified}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
      </url>
    `;
  }).join('\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urlSet}
  </urlset>`;

  // Save the sitemap.xml to the root directory
  fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), sitemap);
  console.log('Sitemap generated successfully!');
}

// Execute the function
generateSitemap();
