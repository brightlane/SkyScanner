const fs = require('fs');
const DB_FILE = './vulture-db.json';

const newTargets = [
    { city: "London", stadium: "Wembley", airport: "LHR" },
    { city: "Paris", stadium: "Stade de France", airport: "CDG" },
    { city: "Tokyo", stadium: "National Stadium", airport: "HND" },
    { city: "Sydney", stadium: "Stadium Australia", airport: "SYD" }
];

let db = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));

newTargets.forEach(target => {
    const exists = db.destinations.some(d => d.city === target.city);
    if (!exists) {
        db.destinations.push({
            ...target,
            slug: target.city.toLowerCase().replace(/\s+/g, '-')
        });
    }
});

fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
console.log("Vulture Engine: Database Expanded.");
