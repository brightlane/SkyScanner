const axios = require("axios");
const fs = require("fs");

// Example API endpoints (you can replace these with actual APIs or scraping logic)
const googleTrendsApiUrl = "https://api.google.com/trends/keywords"; // Hypothetical API
const semrushApiUrl = "https://api.semrush.com/keywords"; // Hypothetical API

// Function to fetch keywords from Google Trends (replace with actual implementation)
async function fetchGoogleTrendsKeywords() {
  try {
    const response = await axios.get(googleTrendsApiUrl);
    return response.data.keywords; // Assuming the API returns a list of keywords
  } catch (error) {
    console.error('Error fetching Google Trends keywords:', error);
    return [];
  }
}

// Function to fetch keywords from SEMrush (replace with actual implementation)
async function fetchSemrushKeywords() {
  try {
    const response = await axios.get(semrushApiUrl);
    return response.data.keywords; // Assuming the API returns a list of keywords
  } catch (error) {
    console.error('Error fetching SEMrush keywords:', error);
    return [];
  }
}

// Combine keywords from different sources
async function fetchKeywords() {
  const googleKeywords = await fetchGoogleTrendsKeywords();
  const semrushKeywords = await fetchSemrushKeywords();

  const allKeywords = [...googleKeywords, ...semrushKeywords];
  return allKeywords;
}

// Generate long-tail keywords by combining basic travel phrases with destinations and events
function generateLongTailKeywords(baseKeywords) {
  const destinations = [
    "Bali", "Paris", "New York", "Tokyo", "London", "Sydney", "Los Angeles", "Rome", "Mexico City", "Bali", "Berlin", "Lisbon",
    "Barcelona", "Tokyo", "Bangkok", "Dubai", "Istanbul", "Miami", "Cairo", "Rio", "Cape Town"
  ];
  
  const longTailKeywords = [];
  for (let baseKeyword of baseKeywords) {
    for (let destination of destinations) {
      longTailKeywords.push(`${baseKeyword} to ${destination}`);
      longTailKeywords.push(`${baseKeyword} flights to ${destination}`);
      longTailKeywords.push(`cheap ${baseKeyword} to ${destination}`);
      longTailKeywords.push(`${baseKeyword} flight deals to ${destination}`);
      longTailKeywords.push(`best ${baseKeyword} to ${destination} 2026`);
    }
  }

  return longTailKeywords;
}

// Save 1 million keywords to a JSON file
async function saveKeywordsToFile() {
  const baseKeywords = await fetchKeywords();
  console.log(`Fetched ${baseKeywords.length} base keywords`);

  const longTailKeywords = generateLongTailKeywords(baseKeywords);
  console.log(`Generated ${longTailKeywords.length} long-tail keywords`);

  // Make sure we only save 1 million keywords
  const keywordsToSave = longTailKeywords.slice(0, 1000000); // Only save 1 million

  // Save keywords to a file
  fs.writeFileSync("1millionKeywords.json", JSON.stringify(keywordsToSave, null, 2));
  console.log(`Saved 1 million keywords to 1millionKeywords.json`);
}

// Run the keyword generation and saving process
saveKeywordsToFile();
