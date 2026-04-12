const fs = require('fs');
const dbPath = './vulture-db.json';

// Load your current DB
let db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

// Potential expansion list (You can add hundreds of cities here)
const globalTargets = [
    { city: "Toronto", stadium: "BMO Field", airport: "YYZ" },
    { city: "Monterrey", stadium: "Estadio BBVA", airport: "MTY" },
    { city: "Miami", stadium: "Hard Rock Stadium", airport: "MIA" },
    { city: "Guadalajara", stadium: "Estadio Akron", airport: "GDL" },
    { city: "Berlin", stadium: "Olympiastadion", airport: "BER" }
    // Add more objects here to reach your 10k goal
];

// Logic: Check if city is already in DB, if not, add it
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
console.log("Vulture Engine: Database Expanded.");
