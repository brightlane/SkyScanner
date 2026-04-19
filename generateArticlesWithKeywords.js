const { Configuration, OpenAIApi } = require("openai");
const fs = require("fs");
const cheerio = require("cheerio");
const axios = require("axios");

// OpenAI API setup
const configuration = new Configuration({
  apiKey: "YOUR_OPENAI_API_KEY", // Replace with your OpenAI API key
});
const openai = new OpenAIApi(configuration);

// Skyscanner Affiliate Link Generator
function generateAffiliateLink(keyword) {
  return `https://www.skyscanner.net/?q=${encodeURIComponent(keyword)}`;
}

// SEO Optimization: Adds meta tags for SEO purposes
function optimizeForSEO(content, keyword) {
  const $ = cheerio.load(content);
  
  // Adding meta description
  $("head").prepend(`<meta name="description" content="Find the best flight deals for ${keyword} on Skyscanner. Book now!">`);

  // Adding title for SEO
  $("head").prepend(`<title>Cheap Flights to ${keyword} - Find Deals on Skyscanner</title>`);

  // Adding internal link (Skyscanner)
  $("body").append(`
    <p>Looking for the best deals for flights to ${keyword}? Check out <a href="${generateAffiliateLink(keyword)}" target="_blank">Skyscanner's flight deals here</a>.</p>
  `);
  
  return $.html();
}

// Generate article content using GPT-3
async function generateArticleContent(keyword) {
  const prompt = `
  Write a detailed 5,000-word article on the topic of "${keyword}" with the following sections:
  1. Introduction
  2. Top destinations for ${keyword}
  3. How to find the best flight deals for ${keyword}
  4. Tips for booking affordable flights
  5. Conclusion with call to action to visit Skyscanner
  
  Make sure the content is SEO optimized with keyword placement, and includes a call-to-action at the end encouraging users to check Skyscanner for flight deals.
  `;
  
  const response = await openai.createCompletion({
    model: "text-davinci-003", // Or GPT-4 if available
    prompt: prompt,
    max_tokens: 3500,
    temperature: 0.7,
  });

  return response.data.choices[0].text.trim();
}

// Insert affiliate links and SEO content into the article
function insertAffiliateLinks(content, keyword) {
  const affiliateLink = generateAffiliateLink(keyword);
  const $ = cheerio.load(content);

  // Add affiliate link inside paragraphs or headers with relevant flight content
  $("p, h2").each((i, el) => {
    if ($(el).text().includes("flight deals") || $(el).text().includes("book")) {
      $(el).append(` <a href="${affiliateLink}" target="_blank">Check flight deals on Skyscanner</a>`);
    }
  });

  return $.html();
}

// Read the keywords from a file (or database)
function readKeywordsFromFile() {
  const data = fs.readFileSync("1millionKeywords.json");
  return JSON.parse(data);
}

// Save the generated article to an HTML file
async function saveArticleToFile(keyword, content) {
  const articleWithLinks = insertAffiliateLinks(content, keyword);
  const articleWithSEO = optimizeForSEO(articleWithLinks, keyword);
  
  const fileName = keyword.toLowerCase().replace(/\s+/g, "-") + ".html";
  fs.writeFileSync(`./articles/${fileName}`, articleWithSEO);
  
  console.log(`Article for "${keyword}" saved as ${fileName}`);
}

// Main function to generate and save articles for each keyword
async function generateArticlesForKeywords() {
  const keywords = readKeywordsFromFile();
  
  for (let i = 0; i < keywords.length; i++) {
    const keyword = keywords[i];
    console.log(`Generating article for "${keyword}"...`);
    
    try {
      const content = await generateArticleContent(keyword);
      await saveArticleToFile(keyword, content);
    } catch (error) {
      console.error(`Failed to generate article for "${keyword}":`, error);
    }
  }

  console.log("Article generation completed for all keywords.");
}

// Start the article generation process
generateArticlesForKeywords();
