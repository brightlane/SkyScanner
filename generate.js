const fs = require('fs');
const path = require('path');

// CONFIGURATION
const BASE_URL = 'https://brightlane.github.io/TaxEase/';
const REPO_PATH = './'; // Current directory
const SITEMAP_DEST = './sitemap.xml';

// 1. Get current date in YYYY-MM-DD format for 2026 SEO signals
const today = new Date().toISOString().split('T')[0];

function generateSitemap() {
    console.log("🚀 Starting Sitemap Generation for 2026 Season...");

    // 2. Read all files in the directory
    const files = fs.readdirSync(REPO_PATH);

    // 3. Filter for .html files only
    const htmlFiles = files.filter(file => file.endsWith('.html'));

    // 4. Build the XML structure
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    htmlFiles.forEach(file => {
        // Skip 404 page (Google shouldn't index it)
        if (file === '404.html') return;

        // Determine Priority: Gaming and Blog get 1.0, Cities get 0.8
        let priority = '0.80';
        let freq = 'weekly';

        if (file === 'index.html' || file === 'blog.html' || file === 'warthunder.html') {
            priority = '1.00';
            freq = 'hourly';
        }

        xml += `  <url>\n`;
        xml += `    <loc>${BASE_URL}${file}</loc>\n`;
        xml += `    <lastmod>${today}</lastmod>\n`;
        xml += `    <changefreq>${freq}</changefreq>\n`;
        xml += `    <priority>${priority}</priority>\n`;
        xml += `  </url>\n`;
    });

    xml += '</urlset>';

    // 5. Write to sitemap.xml
    try {
        fs.writeFileSync(SITEMAP_DEST, xml);
        console.log(`✅ Success! sitemap.xml updated with ${htmlFiles.length} pages.`);
        console.log(`📅 SEO Date Set: ${today}`);
    } catch (err) {
        console.error("❌ Error writing sitemap:", err);
    }
}

generateSitemap();
