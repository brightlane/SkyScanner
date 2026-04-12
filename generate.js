const fs = require('fs');
const path = require('path');

const DB_FILE = './vulture-db.json';
const TEMP_FILE = './master-template.html';

try {
    // 1. Verify files exist
    if (!fs.existsSync(DB_FILE) || !fs.existsSync(TEMP_FILE)) {
        throw new Error("Missing vulture-db.json or master-template.html");
    }

    // 2. Load Data
    const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
    const template = fs.readFileSync(TEMP_FILE, 'utf8');

    console.log(`Vulture Engine: Processing ${db.destinations.length} destinations...`);

    // 3. Generate Pages
    db.destinations.forEach(dest => {
        let output = template
            .replace(/{{CITY}}/g, dest.city)
            .replace(/{{STADIUM}}/g, dest.stadium)
            .replace(/{{AIRPORT}}/g, dest.airport);

        const fileName = `${dest.slug}.html`;
        fs.writeFileSync(path.join(__dirname, fileName), output);
        console.log(`Built: ${fileName}`);
    });

    console.log("Vulture Engine: 10K Build Complete.");

} catch (error) {
    console.error("FATAL ERROR:", error.message);
    process.exit(1);
}
