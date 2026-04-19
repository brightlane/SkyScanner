// affiliate-config.js

// Base URL for your affiliate program (replace with your actual base URL)
const AFFILIATE_BASE_URL = "https://convert.ctypy.com/aff_c?offer_id=29465&aff_id=";

// Your affiliate ID (replace with your actual affiliate ID)
const AFFILIATE_ID = "21885";

// A function to generate a dynamic affiliate link based on the query
function generateAffiliateURL(query) {
    return `${AFFILIATE_BASE_URL}${AFFILIATE_ID}&query=${encodeURIComponent(query)}`;
}

// You can also create other utility functions here if needed, like:
function getDefaultAffiliateURL() {
    return generateAffiliateURL('default');
}

export { generateAffiliateURL, getDefaultAffiliateURL };
