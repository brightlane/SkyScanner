const fs = require('fs');
const dbPath = './vulture-db.json';

// Create the file if it doesn't exist to prevent crash
if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify({ destinations: [] }));
}

let db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

const globalTargets = [
    { city: "Toronto", stadium: "BMO Field", airport: "YYZ" },
    { city: "Miami", stadium: "Hard Rock Stadium", airport: "MIA" }
];

globalTargets.forEach(target => {
    const exists = db.destinations.find(d => d.city === target.city);
    if (!exists) {
        db.destinations.push({
            ...target,
            slug: target.city.toLowerCase().replace(/\s+/g, '-'),
            lastModified: new Date().toISOString()
        });
    }
});

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
console.log("Database updated.");
