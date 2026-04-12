const fs = require('fs');

// 1. Load Data & Template
const db = JSON.parse(fs.readFileSync('./vulture-db.json', 'utf8'));
const template = fs.readFileSync('./master-template.html', 'utf8');

// 2. Clear previous builds (optional but keeps things clean)
console.log(`Building ${db.destinations.length} pages...`);

// 3. The Loop
db.destinations.forEach(dest => {
    let html = template
        .replace(/{{CITY}}/g, dest.city)
        .replace(/{{STADIUM}}/g, dest.stadium)
        .replace(/{{AIRPORT}}/g, dest.airport)
        .replace(/{{SLUG}}/g, dest.slug)
        .replace(/{{DATE}}/g, new Date().toDateString());

    // Write the file to root
    fs.writeFileSync(`./${dest.slug}.html`, html);
});

console.log("Vulture Engine: All Pages Deployed.");
