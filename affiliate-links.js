// affiliate-links.js
(function() {
    // Define your affiliate base URL and affiliate ID
    const affiliateBaseURL = "https://convert.ctypy.com/aff_c?offer_id=29465&aff_id=";
    const affiliateID = "21885";  // Replace this with your actual affiliate ID

    // Function to generate dynamic query parameters based on target audience or location
    function generateAffiliateURL(query) {
        return `${affiliateBaseURL}${affiliateID}&query=${encodeURIComponent(query)}`;
    }

    // List of IDs for elements on your pages where affiliate links will go
    const affiliateElements = [
        'affiliate-link-1', // ID of the first link element
        'affiliate-link-2', // ID of the second link element
        'affiliate-link-3', // and so on...
        // Add more IDs as necessary
    ];

    // Function to update the href attributes of elements with the affiliate link
    function updateAffiliateLinks() {
        const urlParams = new URLSearchParams(window.location.search);
        const query = urlParams.get('q');  // Get the query parameter from the URL (e.g. MetLife, Bali, etc.)

        const affiliateURL = query ? generateAffiliateURL(query) : generateAffiliateURL('default');

        affiliateElements.forEach(function(elementId) {
            const element = document.getElementById(elementId);
            if (element) {
                element.setAttribute('href', affiliateURL);
            }
        });
    }

    // Ensure the links are updated when the page loads
    window.addEventListener('DOMContentLoaded', updateAffiliateLinks);
})();
