const fs = require('fs');
const path = require('path');

// Check if the keywords file exists
const keywordsFilePath = path.join(__dirname, 'keywords.txt'); // Use __dirname to ensure the path is relative to the script's location

if (!fs.existsSync(keywordsFilePath)) {
  console.error('Error: keywords.txt file not found. Please make sure it exists in the repository.');
  process.exit(1);  // Exit the script with an error code
}

// This function generates article content based on the given keyword
function generateArticleContent(keyword) {
  const title = `Explore the Best Destinations for ${keyword}`;
  const intro = `Planning a trip? If you're interested in ${keyword}, this guide will help you find the best destinations, tips, and resources to make your journey amazing.`;
  const body = `
    <h2>Why Choose ${keyword}?</h2>
    <p>${keyword} offers a variety of experiences that cater to all types of travelers. Whether you're looking for adventure, culture, relaxation, or a mix of everything, ${keyword} has something for everyone. Here are some top destinations you should consider:</p>

    <h3>Top Destinations for ${keyword}</h3>
    <ul>
      <li><strong>Location 1</strong> - Description of the location and why it's great for ${keyword}.</li>
      <li><strong>Location 2</strong> - A description of the second location and how it fits the ${keyword} theme.</li>
      <li><strong>Location 3</strong> - Information about another key location for ${keyword} enthusiasts.</li>
    </ul>

    <h3>Best Tips for ${keyword} Travelers</h3>
    <p>Here are a few tips to get the most out of your ${keyword} journey:</p>
    <ol>
      <li>Tip 1: Brief tip.</li>
      <li>Tip 2: Another helpful tip.</li>
      <li>Tip 3: One more important suggestion for ${keyword} travelers.</li>
    </ol>

    <h3>Conclusion</h3>
    <p>Whether you're looking for relaxation, culture, or adventure, ${keyword} offers diverse experiences that make it an ideal travel destination.</p>
  `;
  
  // Combine the title, intro, and body into one complete article
  const content = `
    <html>
    <head>
      <title>${title}</title>
    </head>
    <body>
      <h1>${title}</h1>
      <p>${intro}</p>
      ${body}
    </body>
    </html>
  `;

  return content;
}

// Main function to generate articles for all keywords in the keywords.txt file
function generateArticles() {
  const keywords = fs.readFileSync(keywordsFilePath, 'utf-8').split('\n'); // Read keywords from the file

  const articlesDir = './articles';  // Directory where articles will be saved

  // Ensure articles directory exists
  if (!fs.existsSync(articlesDir)) {
    fs.mkdirSync(articlesDir);
  }

  // Loop through keywords, generate an article for each, and save as an HTML file
  keywords.forEach((keyword) => {
    if (keyword.trim()) {
      const articleContent = generateArticleContent(keyword);
      const articlePath = path.join(articlesDir, `${keyword.replace(/ /g, '-')}.html`);
      
      // Write the article to a file
      fs.writeFileSync(articlePath, articleContent);
      console.log(`Article generated for: ${keyword}`);
    }
  });
}

// Run the article generation process
generateArticles();
