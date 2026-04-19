const fs = require('fs');
const path = require('path');

// Sample destination list
const destinations = ["Bali", "Paris", "Tokyo", ...];

const generateArticleContent = (destination) => {
  return `# Best Flights to ${destination}`;
};

const generateArticles = (numArticles) => {
  const articlesDir = path.join(__dirname, 'generated-articles');
  
  if (!fs.existsSync(articlesDir)) {
    fs.mkdirSync(articlesDir);
  }

  for (let i = 0; i < numArticles; i++) {
    const destination = destinations[i % destinations.length];
    const articleContent = generateArticleContent(destination);
    const fileName = `${destination.replace(/ /g, '-').toLowerCase()}.md`;
    const filePath = path.join(articlesDir, fileName);

    fs.writeFileSync(filePath, articleContent);
    console.log(`Generated article: ${filePath}`);
  }
};

const numArticles = process.argv[2] || 10;
generateArticles(numArticles);
