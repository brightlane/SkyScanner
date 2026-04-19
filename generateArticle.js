const fs = require('fs');
const path = require('path');

// Sample list of destinations
const destinations = [
  "Bali", "Paris", "Tokyo", "New York", "London", "Sydney", "Rome", "Los Angeles", "Bangkok", "Barcelona",
  "Mexico City", "Greece", "Dubai", "Miami", "Amsterdam", "Prague", "Lisbon", "Cairo", "Montreal", "Italy",
  "Rio de Janeiro", "Cape Town", "Berlin", "Melbourne", "Lima", "Athens", "Seoul", "Iceland", "Phuket", "Seychelles",
  "Egypt", "Mexico", "Singapore", "Orlando", "Amsterdam", "Kyoto", "Machu Picchu", "Madrid", "Dubai", "Seychelles"
];

// Sample affiliate URL
const affiliateUrl = "https://your-affiliate-link.com";

// Function to generate article content
const generateArticleContent = (keyword) => {
  return `
  # How to Find the Best Flights to ${keyword}

  If you're looking to book the best flights to ${keyword}, you're in the right place! In this guide, we'll explore how to find affordable and high-quality flights to ${keyword}, with a few tips and tricks to ensure you get the best deal.

  ## Why ${keyword} is a Great Destination for Travelers

  Whether you're planning a vacation, business trip, or looking for new travel experiences, ${keyword} offers a variety of attractions, culture, and opportunities to explore. Here's why this destination should be on your radar.

  ## Best Time to Book Flights to ${keyword}

  When should you book your flights to ${keyword}? It's important to consider factors like seasonal trends, travel demand, and airline deals. The best time to book flights to ${keyword} is typically during the off-season, when prices are lower and availability is higher.

  ## Top Airlines Flying to ${keyword}

  Several airlines offer competitive prices for flights to ${keyword}. Some of the top carriers to consider include:
  
  1. Airline 1 - Known for its affordable prices and frequent flights to ${keyword}.
  2. Airline 2 - A great choice for comfort and luxury during your flight.
  3. Airline 3 - Offers budget-friendly options with decent amenities.

  ## How to Find the Cheapest Flights to ${keyword}

  Searching for flights can be overwhelming, but using the right strategies can save you a lot of money. Here are a few tips to help you find the best flight deals to ${keyword}:
  
  - **Use a Flight Comparison Website**: Websites like [Skyscanner](https://www.skyscanner.com) can help you compare prices from different airlines and booking platforms.
  - **Set Alerts**: Set up alerts for price drops so that you're notified when the price of your desired flight decreases.
  - **Book Early**: Booking your flights well in advance can help you secure lower prices.
  
  ## Top 5 Hotels in ${keyword}

  After you've secured your flight, it's time to book your accommodation. Here are some of the best hotels in ${keyword}:
  
  1. Hotel A - Luxury stay with incredible amenities.
  2. Hotel B - A budget-friendly option without compromising comfort.
  3. Hotel C - Known for its breathtaking views and top-notch service.

  ## Conclusion

  Booking flights to ${keyword} doesn't have to be stressful. By following these tips, you can find affordable flights, stay at top hotels, and enjoy your trip to ${keyword} without breaking the bank. Check out more deals on [Skyscanner](https://www.skyscanner.com) and get your dream vacation started today!

  ---
  *This article contains affiliate links. If you book through these links, we may earn a small commission at no extra cost to you.*
  `;
};

// Function to generate multiple articles
const generateArticles = (numArticles) => {
  const articlesDir = path.join(__dirname, 'generated-articles');
  
  // Create articles folder if it doesn't exist
  if (!fs.existsSync(articlesDir)) {
    fs.mkdirSync(articlesDir);
  }

  // Loop through the number of articles to generate
  for (let i = 0; i < numArticles; i++) {
    const destination = destinations[i % destinations.length];
    const keyword = `Best flights to ${destination}`;
    const articleContent = generateArticleContent(keyword);

    const fileName = `${destination.replace(/ /g, '-').toLowerCase()}.md`;  // Create filename based on the destination
    fs.writeFileSync(path.join(articlesDir, fileName), articleContent);
    console.log(`Generated article for: ${destination}`);
  }
};

// Generate articles based on command line argument (default to 10 articles)
const numArticles = process.argv[2] || 10;
generateArticles(numArticles);
