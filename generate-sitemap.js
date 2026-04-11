// 1. DATA HUBS (Must match your calculator.html hubs exactly)
const hubs = {
    usa: ["New-York", "Los-Angeles", "Miami", "Chicago", "Dallas", "Atlanta", "Seattle", "Houston", "Boston"],
    europe: ["London", "Paris", "Berlin", "Rome", "Madrid", "Amsterdam", "Dublin", "Lisbon"],
    asia: ["Tokyo", "Seoul", "Bangkok", "Singapore", "Bali", "Hoi-An", "Dubai"],
    stadiums: ["MetLife", "SoFi", "Azteca", "Hard-Rock", "Lumen-Field", "Gillette-Stadium", "Levi-Stadium"]
};

const baseUrl = "https://brightlane.github.io/SkyScanner/calculator.html?q=";
const allCities = Object.values(hubs).flat();
const today = new Date().toISOString().split('T')[0];

let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://brightlane.github.io/SkyScanner/index.html</loc>
        <lastmod>${today}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>https://brightlane.github.io/SkyScanner/stadiumstay.html</loc>
        <lastmod>${today}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.9</priority>
    </url>`;

// 2. THE 5,000+ PAGE GENERATOR LOOP
// This creates a URL for every city to every other city (Origin -> Destination)
allCities.forEach(origin => {
    allCities.forEach(dest => {
        if (origin !== dest) {
            const slug = `${origin.toLowerCase()}-${dest.toLowerCase()}`;
            sitemap += `
    <url>
        <loc>${baseUrl}${slug}</loc>
        <lastmod>${today}</lastmod>
        <changefreq>hourly</changefreq>
        <priority>0.8</priority>
    </url>`;
        }
    });
});

sitemap += `\n</urlset>`;

// 3. OUTPUT
console.log(sitemap); 
// Save the console output as sitemap.xml in your root folder.
