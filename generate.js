const fs = require('fs');

const dbPath = './vulture-db.json';
const tempPath = './master-template.html';

// Check for files before running
if (!fs.existsSync(dbPath) || !fs.existsSync(tempPath)) {
    console.error("CRITICAL ERROR: Missing vulture-db.json or master-template.html");
    process.exit(1);
}

const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
const template = fs.readFileSync(tempPath, 'utf8');

db.destinations.forEach(dest => {
    let html = template
        .replace(/{{CITY}}/g, dest.city)
        .replace(/{{STADIUM}}/g, dest.stadium)
        .replace(/{{AIRPORT}}/g, dest.airport);
    fs.writeFileSync(`./${dest.slug}.html`, html);
});

console.log(`Generated ${db.destinations.length} pages.`);
