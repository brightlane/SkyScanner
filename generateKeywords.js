const axios = require('axios');
const fs = require('fs');

// API URL for your chosen keyword tool (e.g., Ubersuggest, SEMrush, or another)
const API_URL = 'https://api.neilpatel.com/v1/keywords';  // Replace with your API URL
const API_KEY = 'YOUR_API_KEY';  // Replace with your API key

// Seed keywords related to Skyscanner and travel
const seedKeywords = [
    'cheap flights', 'flights to', 'book flights', 'last minute flights',
    'vacation packages', 'holiday deals', 'cheap hotels', 'best flight deals',
    'flights from', 'flights to New York', 'flights to Paris', 'best hotels in',
    'car rental', 'affordable vacation packages', 'best travel destinations', 
    // Add more seed keywords here as needed
];

// Function to fetch keywords using an API
const fetchKeywords = async (keyword) => {
    try {
        const response = await axios.get(API_URL, {
            params: {
                keyword: keyword,
                api_key: API_KEY,
            }
        });
        return response.data.keywords;  // Assuming the response contains a 'keywords' array
    } catch (error) {
        console.error('Error fetching keywords:', error);
        return [];
    }
};

// Function to generate a large number of unique keywords
const generateKeywords = async () => {
    let allKeywords = new Set();  // Using Set to avoid duplicate keywords
    let keywordCount = 0;

    for (let i = 0; i < seedKeywords.length; i++) {
        const seed = seedKeywords[i];
        console.log(`Fetching keywords for: ${seed}`);
        
        // Fetching keywords for the seed keyword
        const keywords = await fetchKeywords(seed);
        
        // Adding keywords to Set to ensure uniqueness
        keywords.forEach((kw) => allKeywords.add(kw));
        
        keywordCount += keywords.length;

        console.log(`Fetched ${keywords.length} keywords for: ${seed}`);
        
        // Stop if we've reached the desired number of keywords
        if (allKeywords.size >= 5000000) {
            break;
        }
    }

    console.log(`Total unique keywords fetched: ${allKeywords.size}`);

    // Write the keywords to a file
    fs.writeFileSync('keywords.txt', Array.from(allKeywords).join('\n'), 'utf8');
    console.log('Keywords saved to keywords.txt');
};

// Run the script
generateKeywords();
