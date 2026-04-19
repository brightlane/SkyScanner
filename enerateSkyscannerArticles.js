const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Sample Skyscanner affiliate URL
const affiliateUrl = "https://www.skyscanner.com/affiliate-link"; // Replace with your Skyscanner affiliate link

// List of destinations or keywords
const destinations = [
    "Bali", "Paris", "Tokyo", "New York", "London", "Sydney", "Rome", "Los Angeles", "Bangkok", "Barcelona",
    "Mexico City", "Greece", "Dubai", "Miami", "Amsterdam", "Prague", "Lisbon", "Cairo", "Montreal", "Italy",
    "Rio de Janeiro", "Cape Town", "Berlin", "Melbourne", "Lima", "Athens", "Seoul", "Iceland", "Phuket", "Seychelles",
    "Egypt", "Mexico", "Singapore", "Orlando", "Kyoto", "Machu Picchu", "Madrid"
];

// Function to generate article content for each destination
const generateArticleContent = (keyword) => {
    return `
    # How to Find the Best Flights to ${keyword}

    Are you planning a trip to ${keyword}? Whether it's a vacation, business trip, or an adventure, finding the best flights to ${keyword} can be daunting. Luckily, with the help of Skyscanner, you can easily compare flight prices and find the best deals!

    ## Why ${keyword} Should Be Your Next Travel Destination

    ${keyword} is one of the most sought-after travel destinations in the world. From stunning beaches to rich cultural experiences, ${keyword} offers something for every type of traveler. Here’s why ${keyword} should be at the top of your travel list.

    ### Best Time to Book Flights to ${keyword}

    The best time to book flights to ${keyword} depends on several factors, such as the season and demand. Generally, the off-season months are the cheapest, and booking early can save you a lot of money. Here are some tips:

    - **Book 3–6 months in advance** for the best prices.
    - **Avoid peak tourist season** to score cheaper flights.
    
    Skyscanner can help you track prices and set up alerts to notify you when the best deals become available. Check out flights to ${keyword} on Skyscanner [here](https://www.skyscanner.com/affiliate-link).

    ## Top Airlines Flying to ${keyword}

    If you're looking for the best flight experience, consider these top airlines flying to ${keyword}:

    1. **Airline 1** - Known for its affordable prices and excellent service to ${keyword}.
    2. **Airline 2** - Offers comfortable flights with premium amenities.
    3. **Airline 3** - Ideal for budget-conscious travelers flying to ${keyword}.

    ## How to Find the Cheapest Flights to ${keyword}

    Finding the cheapest flights to ${keyword} doesn’t have to be hard. Here are a few strategies to help you save big:

    - **Use Skyscanner’s flight comparison tool**: Skyscanner aggregates flight prices from hundreds of airlines to ensure you get the best deal. [Start comparing flights now](https://www.skyscanner.com/affiliate-link).
    - **Set up price alerts**: Skyscanner will notify you when flight prices drop to your desired range.
    - **Consider nearby airports**: Sometimes flying into a nearby city can save you a lot of money.

    ## Top Hotels in ${keyword}

    After booking your flight, it's time to think about where you'll stay. Here are some of the best hotels in ${keyword}:

    1. **Hotel A** – Luxury with stunning views and impeccable service.
    2. **Hotel B** – A budget-friendly option that doesn't compromise comfort.
    3. **Hotel C** – Known for its proximity to popular tourist attractions.

    ## Conclusion

    Booking flights to ${keyword} is easier than ever with Skyscanner. By comparing flight prices, setting alerts, and booking early, you can find affordable options and travel without breaking the bank. Don't forget to check out our exclusive flight deals on [Skyscanner](https://www.skyscanner.com/affiliate-link) and start planning your trip today!

    ---
    *This article contains affiliate links. If you book through these links, we may earn a small commission at no extra cost to you.*
    `;
};

// Function to generate multiple articles and save them as files
const generateArticles = (numArticles) => {
    const articlesDir = path.join(__dirname, 'articles'); // Directory to store generated articles

    if (!fs.existsSync(articlesDir)) {
        fs.mkdirSync(articlesDir);
    }

    for (let i = 0; i < numArticles; i++) {
        const keyword = destinations[i % destinations.length]; // Cycle through destinations
        const articleContent = generateArticleContent(keyword);

        const fileName = `${keyword.replace(/ /g, '-').toLowerCase()}.md`;  // Convert keyword to a valid filename
        fs.writeFileSync(path.join(articlesDir, fileName), articleContent);
        console.log(`Article for "${keyword}" generated and saved!`);
    }
};

// Run the article generation process (you can specify the number of articles here)
const numArticles = 288;  // Number of articles to generate each day (adjust as needed)
generateArticles(numArticles);
