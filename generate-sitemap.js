const fs = require('fs');
const path = require('path');
const { generateAffiliateLink } = require('./generateArticlesWithKeywords');

// Function to generate sitemap.xml for the website
function generateSitemap() {
  const articleFolder = './articles';  // Path where the articles are stored
  const articles = fs.readdirSync(articleFolder);  // List all files in the folder
  const baseUrl = 'https://brightlane.github.io/SkyScanner';  // Replace with your actual domain

  // Begin XML structure
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // Adding the homepage to the sitemap
  sitemap += `  <url>\n    <loc>${baseUrl}/index.html</loc>\n  </url>\n`;

  // Loop through articles and add each one to the sitemap
  articles.forEach((articleFile) => {
    if (articleFile.endsWith('.html')) {
      const articleUrl = `${baseUrl}/articles/${articleFile}`;
      sitemap += `  <url>\n    <loc>${articleUrl}</loc>\n  </url>\n`;
    }
  });

  // Add any other key pages to the sitemap
  const additionalPages = [
    '/about.html',
    '/contact.html',
    '/privacy.html',
    '/blog.html',
    '/subscribe.html',
    '/faq.html',
    '/terms-of-service.html'
  ];

  additionalPages.forEach((page) => {
    sitemap += `  <url>\n    <loc>${baseUrl}${page}</loc>\n  </url>\n`;
  });

  // End XML structure
  sitemap += `</urlset>\n`;

  // Write sitemap.xml to disk
  fs.writeFileSync('./sitemap.xml', sitemap);
  console.log('Sitemap generated and saved to sitemap.xml');
}

// Run the sitemap generation
generateSitemap();
