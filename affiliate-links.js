// affiliate-links.js

import { generateAffiliateURL, getDefaultAffiliateURL } from './affiliate-config.js'; // Importing functions

(function() {
    // Select all anchor tags with the class "affiliate-link" for link insertion
    const affiliateLinks = document.querySelectorAll('a.affiliate-link');
    
    // Function to update affiliate links
    function updateAffiliateLinks() {
        const urlParams = new URLSearchParams(window.location.search);
        const query = urlParams.get('q'); // Get the 'q' parameter from the URL

        const affiliateURL = query ? generateAffiliateURL(query) : getDefaultAffiliateURL(); // Choose the URL based on the query parameter

        // Update each link with the generated affiliate URL
        affiliateLinks.forEach(link => {
            link.href = affiliateURL;
        });
    }

    // Run the update when the page is loaded
    document.addEventListener('DOMContentLoaded', updateAffiliateLinks);
})();
