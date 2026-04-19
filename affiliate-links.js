// affiliate-links.js
const fs = require('fs');
const path = require('path');

// Define your affiliate parameters here
const affiliateId = '21885'; // Your affiliate ID
const offerId = '29465'; // Your offer ID

// List of all HTML files you want to modify (can be dynamic based on your needs)
const htmlFiles = [
  'index.html',
  'stadiumstay.html',
  'about.html',
  'blog.html',
  'calculator.html',
  'contact.html',
  'faq.html',
  'privacy.html',
  'destinations.html',
  'collections.html',
  'routes.html',
  'solo.html',
  'surge.html',
  'subscribe.html',
  // Add more HTML pages as needed
];

// Function to add affiliate links to the href attributes
function updateAffiliateLinks() {
  htmlFiles.forEach(fileName => {
    const filePath = path.join(__dirname, fileName);
    
    // Check if the file exists
    if (fs.existsSync(filePath)) {
      // Read the HTML file content
      let fileContent = fs.readFileSync(filePath, 'utf-8');
      
      // Find all anchor tags and update the href with affiliate parameters
      fileContent = fileContent.replace(/href="([^"]*)"/g, (match, url) => {
        // If the link doesn't already have affiliate parameters, append them
        if (!url.includes('aff_c?')) {
          return `href="${url}?offer_id=${offerId}&aff_id=${affiliateId}"`;
        }
        return match; // If it already has affiliate parameters, leave it unchanged
      });
      
      // Save the updated HTML back to the file
      fs.writeFileSync(filePath, fileContent, 'utf-8');
      console.log(`Affiliate links updated in ${fileName}`);
    } else {
      console.log(`File not found: ${fileName}`);
    }
  });
}

// Execute the function
updateAffiliateLinks();
