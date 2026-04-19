const fs = require('fs');
const path = require('path');

// List of destinations to generate articles for
const destinations = [
    "Bali", "Paris", "Tokyo", "New York", "London", "Sydney", "Rome", "Los Angeles", "Bangkok", "Barcelona",
    "Mexico City", "Greece", "Dubai", "Miami", "Amsterdam", "Prague", "Lisbon", "Cairo", "Montreal", "Italy",
    "Rio de Janeiro", "Cape Town", "Berlin", "Melbourne", "Lima", "Athens", "Seoul", "Iceland", "Phuket", "Seychelles",
    "Egypt", "Mexico", "Singapore", "Orlando", "Kyoto", "Machu Picchu", "Madrid", "Dubai", "Seychelles"
];

// Function to generate article content
const generateArticleContent = (destination) => {
    return `
    # Best Flights to ${destination}

    Looking to travel to ${destination}? Here's everything you need to know about booking the best flights to ${destination}, including tips for getting great deals, top airlines, and more!

    ## Why Visit ${destination}?

    ${destination} is known for its incredible attractions, stunning landscapes, and vibrant culture. Whether you're visiting for business or leisure, there’s something for everyone.

    ## Best Airlines for ${destination}

    When booking flights to ${destination}, you'll want to choose the right airlines to ensure a comfortable journey. Here are some of the top airlines that fly to ${destination}:

    1. Airline A
    2. Airline B
    3. Airline C

    ## How to Find the Cheapest Flights to ${destination}

    Finding the best flight deals to ${destination} can be tricky, but here are some tips:
    
    - **Book Early**: The earlier you book, the better the deals you’ll find.
    - **Use Skyscanner**: Skyscanner is a powerful tool to compare prices from various airlines.
    - **Be Flexible**: If possible, try to book flights during off-peak seasons to save on airfare.

    ## Conclusion

    Don't wait any longer! Start planning your trip to ${destination} today with the help of Skyscanner.

    *This article contains affiliate links to Skyscanner. By booking through these links, you help support our website at no extra cost to you.*
    `;
};

// Main function to generate articles
const generateArticles = (numArticles) => {
    const articlesDir = path.join(__dirname, 'generated-articles'); // Directory to save articles

    // Ensure the directory exists or create it
    if (!fs.existsSync(articlesDir)) {
        console.log("Creating generated-articles directory...");
        fs.mkdirSync(articlesDir);
    }

    let filesGenerated = 0;
    // Generate articles for each destination
    for (let i = 0; i < numArticles; i++) {
        const destination = destinations[i % destinations.length];  // Use destination in a loop
        const articleContent = generateArticleContent(destination);

        // Format filename based on the destination
        const fileName = `${destination.replace(/ /g, '-').toLowerCase()}.md`;  // Convert spaces to dashes and lowercase
        const filePath = path.join(articlesDir, fileName);

        // Write the article to a file and handle errors
        try {
            fs.writeFileSync(filePath, articleContent);
            console.log(`Article generated: ${filePath}`);
            filesGenerated++;
        } catch (error) {
            console.error(`Error generating article for ${destination}: ${error}`);
        }
    }

    if (filesGenerated === 0) {
        console.log("No articles generated.");
    } else {
        console.log(`${filesGenerated} articles generated successfully.`);
    }
};

// Get the number of articles to generate from the command line argument (default to 10)
const numArticles = process.argv[2] || 10; // Default to 10 articles if not provided
generateArticles(numArticles); // Run the function to generate articles
