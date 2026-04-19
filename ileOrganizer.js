const fs = require('fs');
const path = require('path');

// Function to organize articles into subfolders based on the keyword
function organizeArticles() {
  const articleFolder = './articles';  // Folder where articles are stored
  
  const articles = fs.readdirSync(articleFolder);  // Get all files in the folder

  articles.forEach((articleFile) => {
    if (articleFile.endsWith('.html')) {
      const articlePath = path.join(articleFolder, articleFile);
      const keyword = articleFile.replace('.html', '').replace(/-/g, ' ');  // Extract keyword from file name

      // Create a folder for the keyword if it doesn't already exist
      const keywordFolder = path.join(articleFolder, keyword);
      if (!fs.existsSync(keywordFolder)) {
        fs.mkdirSync(keywordFolder);
      }

      // Move the article into the respective folder
      const newArticlePath = path.join(keywordFolder, articleFile);
      fs.renameSync(articlePath, newArticlePath);
      console.log(`Moved "${articleFile}" to folder "${keyword}"`);
    }
  });

  console.log('Articles have been organized into keyword-specific folders.');
}

// Run the file organization
organizeArticles();
