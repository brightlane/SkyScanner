const fs = require('fs');
const path = require('path');

// CONFIGURATION
const BASE_URL = 'https://brightlane.github.io/SkyScanner/';
const SITEMAP_PATH = path.join(process.cwd(), 'sitemap.xml');

// 1. Get all HTML files in the root directory
const files = fs.readdirSync(process.cwd());
const htmlFiles = files.filter(file => file.endsWith('.html') && file !== '404.html');

// 2. Build the XML structure
let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

htmlFiles.forEach(file => {
    const lastMod = new Date().toISOString().split('T')[0]; // Current date YYYY-MM-DD
    const url = `${BASE_URL}${file}`;
    
    xml += `
    <url>
        <loc>${url}</loc>
        <lastmod>${lastMod}</lastmod>
        <changefreq>hourly</changefreq>
        <priority>${file === 'index.html' ? '1.0' : '0.8'}</priority>
    </url>`;
});

xml += `
</urlset>`;

// 3. Write the file
try {
    fs.writeFileSync(SITEMAP_PATH, xml);
    console.log(`Vulture Sitemap: Successfully indexed ${htmlFiles.length} pages.`);
} catch (err) {
    console.error("Sitemap Error:", err.message);
}
