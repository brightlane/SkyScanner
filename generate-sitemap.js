const cities = ["New-York", "Los-Angeles", "London", "Paris", "Tokyo", "Bali"]; // Add all 500
const baseUrl = "https://brightlane.github.io/SkyScanner/calculator.html?q=";

let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

cities.forEach(city => {
    sitemap += `
    <url>
        <loc>${baseUrl}${city}</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <changefreq>hourly</changefreq>
        <priority>0.8</priority>
    </url>`;
});

sitemap += `\n</urlset>`;
// Save this to sitemap.xml
