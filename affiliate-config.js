// affiliate-config.js
const affiliateId = '21885'; // Your affiliate ID
const offerId = '29465'; // Your offer ID

// Affiliate base URL (adjust this URL to your actual affiliate network URL format)
const affiliateBaseUrl = 'https://convert.ctypy.com/aff_c';

// Function to generate dynamic affiliate URL with parameters
function generateAffiliateUrl(query) {
  const encodedQuery = encodeURIComponent(query);
  return `${affiliateBaseUrl}?offer_id=${offerId}&aff_id=${affiliateId}&q=${encodedQuery}`;
}

// Function to inject affiliate URL dynamically in all links
function updateAffiliateLinks() {
  const links = document.querySelectorAll('a.affiliate-link');  // You can customize this selector based on your needs

  links.forEach(link => {
    const query = link.getAttribute('data-query'); // Ensure that your HTML links have data-query attributes set
    if (query) {
      link.href = generateAffiliateUrl(query); // Update the href with the dynamic affiliate URL
    }
  });
}

// Call this function on page load
window.onload = updateAffiliateLinks;
