// affiliate-config.js

// Base URL for the affiliate program
const AFFILIATE_BASE_URL = "https://convert.ctypy.com/aff_c?offer_id=29465&aff_id=";

// Your unique Affiliate ID (replace this with your actual affiliate ID)
const AFFILIATE_ID = "21885";

// Generate a dynamic affiliate URL
function generateAffiliateURL(query) {
    return `${AFFILIATE_BASE_URL}${AFFILIATE_ID}&query=${encodeURIComponent(query)}`;
}

// Default affiliate URL (can be used if query is not found)
function getDefaultAffiliateURL() {
    return `${AFFILIATE_BASE_URL}${AFFILIATE_ID}&query=default`;
}

export { generateAffiliateURL, getDefaultAffiliateURL };
