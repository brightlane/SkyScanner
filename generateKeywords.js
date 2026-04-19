const fs = require('fs');

// Sample list of destinations
const destinations = [
    "Bali", "Paris", "Tokyo", "New York", "London", "Sydney", "Rome", "Los Angeles", "Bangkok", "Barcelona",
    "Mexico City", "Greece", "Dubai", "Miami", "Amsterdam", "Prague", "Lisbon", "Cairo", "Montreal", "Italy",
    "Rio de Janeiro", "Cape Town", "Berlin", "Melbourne", "Lima", "Athens", "Seoul", "Iceland", "Phuket", "Seychelles",
    "Egypt", "Mexico", "Singapore", "Orlando", "Amsterdam", "Kyoto", "Machu Picchu", "Madrid", "Dubai", "Seychelles"
];

// Function to generate travel-related keywords
const generateKeywords = (numKeywords) => {
    const keywords = [];
    for (let i = 0; i < numKeywords; i++) {
        const destination = destinations[i % destinations.length]; // Loop through destinations
        const keyword = `Best flights to ${destination}`;
        keywords.push(keyword);
    }
    return keywords;
};

// Generate 10,000,000 keywords (expand as necessary)
const keywords = generateKeywords(10000000);  // Generate 10 million keywords

// Save to a file
const jsonContent = JSON.stringify({ keywords }, null, 2);
fs.writeFileSync('trending-keywords-expanded.json', jsonContent);
console.log("Generated trending-keywords-expanded.json with 10 million entries.");
