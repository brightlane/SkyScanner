// generate-sitemap.js
const fs = require('fs');
const path = require('path');

// List all your HTML files (you can manually add or automate this based on your directory structure)
const htmlFiles = [
  'index.html',
  'stadiumstay.html',
  'about.html',
  'blog.html',
  'calculator.html',
  'contact.html',
  'faq.html',
  'privacy.html',
  'destinations.html',
  'collections.html',
  'routes.html',
  'solo.html',
  'surge.html',
  'subscribe.html',
  // Add more HTML files as necessary
];

// Define the base URL for your site
const baseURL = 'https://brightlane.github.io/SkyScanner'; // Update with your website's domain

// Start the XML sitemap structure
let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

// Loop through each HTML file and add it to the sitemap
htmlFiles.forEach(file => {
  // Create a valid URL for each HTML page
  const url = `${baseURL}/${file}`;

  // Add URL entry to the sitemap
  sitemap += '  <url>\n';
  sitemap += `    <loc>${url}</loc>\n`;
  sitemap += '    <lastmod>' + new Date().toISOString() + '</lastmod>\n';
  sitemap += '    <changefreq>daily</changefreq>\n'; // You can adjust the frequency as needed
  sitemap += '    <priority>0.8</priority>\n'; // Adjust priority (default is 0.5 to 1.0)
  sitemap += '  </url>\n';
});

// Close the XML sitemap
sitemap += '</urlset>\n';

// Write the sitemap to an XML file
const outputPath = path.join(__dirname, 'sitemap.xml');
fs.writeFileSync(outputPath, sitemap, 'utf-8');
console.log('Sitemap generated successfully: sitemap.xml');
