/**
 * SITE-MAP GENERATOR ENGINE
 * Copy this into your generate-sitemap.js file.
 * This script builds the XML structure for your virtual city pages.
 */

const BASE_URL = "https://brightlane.github.io/SkyScanner/";

// 1. ADD YOUR 500+ CITIES/STADIUMS HERE
// The script will turn each of these into a unique URL
const targetCities = [
    "London", "Paris", "Tokyo", "Madrid", "Berlin", "Rome", "Lisbon", "Bali", 
    "MetLife Stadium", "SoFi Stadium", "AT&T Stadium", "Wembley", "Old Trafford",
    "Estadio Azteca", "Hard Rock Stadium", "Levi's Stadium", "Allianz Arena",
    "Barcelona", "Milan", "Amsterdam", "Dubai", "Singapore", "Sydney"
    // Tip: You can just copy-paste a list of names here!
];

// 2. CORE STATIC PAGES
const staticPages = [
    "index.html",
    "stadiumstay.html",
    "destinations.html",
    "calculator.html",
    "blog.html",
    "about.html",
    "privacy.html"
];

function generateSitemap() {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    // Add Static Pages
    staticPages.forEach(page => {
        xml += `  <url>\n`;
        xml += `    <loc>${BASE_URL}${page}</loc>\n`;
        xml += `    <priority>${page === 'index.html' ? '1.0' : '0.8'}</priority>\n`;
        xml += `  </url>\n`;
    });

    // Add Virtual Dynamic Pages (The 500-Page Trick)
    targetCities.forEach(city => {
        const encodedCity = encodeURIComponent(city);
        xml += `  <url>\n`;
        xml += `    <loc>${BASE_URL}index.html?q=${encodedCity}</loc>\n`;
        xml += `    <priority>0.7</priority>\n`;
        xml += `  </url>\n`;
    });

    xml += `</urlset>`;
    
    // Output the result to the console
    console.log("--- COPY THE XML BELOW INTO YOUR sitemap.xml FILE ---");
    console.log(xml);
}

// Execute
generateSitemap();
