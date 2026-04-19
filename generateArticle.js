const { Configuration, OpenAIApi } = require("openai");
const fs = require("fs");
const axios = require("axios");
const cheerio = require("cheerio");

// Initialize OpenAI API
const configuration = new Configuration({
  apiKey: "YOUR_OPENAI_API_KEY", // Replace with your OpenAI API key
});
const openai = new OpenAIApi(configuration);

// Skyscanner Affiliate Link Generator Function
function generateAffiliateLink(keyword) {
  return `https://www.skyscanner.net/?q=${encodeURIComponent(keyword)}`;
}

// Function to generate article content using GPT-3
async function generateArticleContent(keyword) {
  const prompt = `
  Write a 5,000-word article on the topic of "${keyword}" with the following sections:
  1. Introduction
  2. Best places to visit for ${keyword}
  3. How to find the best flight deals for ${keyword}
  4. Tips for booking flights and saving money
  5. Conclusion
  
  Make sure to include a call to action that encourages readers to visit Skyscanner for flight deals and to use Skyscanner's tools for the best prices.
  Ensure the content is SEO-optimized and includes relevant keywords throughout.

  Don't forget to include internal links such as Skyscanner's main page and offer insights or travel hacks to make the article more engaging.
  `;
  
  const response = await openai.createCompletion({
    model: "text-davinci-003", // You can use GPT-3.5 or GPT-4 here
    prompt: prompt,
    max_tokens: 3500, // Adjust the token size for longer content generation
    temperature: 0.7, // Adjust for creativity
  });

  return response.data.choices[0].text.trim();
}

// Function to insert Skyscanner affiliate links into content
function insertAffiliateLinks(content, keyword) {
  const affiliateLink = generateAffiliateLink(keyword);
  
  // Use Cheerio to parse and inject links within relevant parts of the article
  const $ = cheerio.load(content);

  // Find relevant sections to add the link (e.g., in tips, flight deals, etc.)
  $("p, h2").each((i, el) => {
    if ($(el).text().includes("flight deals")) {
      $(el).append(` <a href="${affiliateLink}" target="_blank">Check flight deals on Skyscanner</a>`);
    }
  });

  return $.html();
}

// Function to generate a single article and save it to file
async function generateAndSaveArticle(keyword) {
  const content = await generateArticleContent(keyword);

  // Insert affiliate links in the content
  const articleWithLinks = insertAffiliateLinks(content, keyword);

  // Create the file path based on the keyword
  const fileName = keyword.toLowerCase().replace(/\s+/g, "-") + ".html";

  // Write the HTML content to a file
  fs.writeFileSync(fileName, articleWithLinks);

  console.log(`Article for "${keyword}" saved as ${fileName}`);
}

// Function to generate articles for multiple keywords
async function generateArticlesForKeywords(keywords) {
  for (let keyword of keywords) {
    await generateAndSaveArticle(keyword);
  }
}

// Example list of daily keywords (can be generated dynamically or fetched from a source)
const dailyKeywords = [
  "Cheap flights to Bali",
  "Travel deals to Tokyo",
  "Best flight offers for Paris",
  "Affordable tickets to New York",
  "Flights to London 2026",
  // Add more keywords or generate them dynamically
];

// Call the function to start generating the articles
generateArticlesForKeywords(dailyKeywords);
