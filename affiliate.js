// affiliate-config.js

// Base URL for the affiliate network
const BASE_URL = 'https://convert.ctypy.com/aff_c?offer_id=29465&aff_id=21885'; // Update with your affiliate base URL

// Path to the pages where you want to append the affiliate ID
const PAGES_TO_AFFILIATE = [
  'index.html',
  'stadiumstay.html',
  'about.html',
  'blog.html',
  'calculator.html',
  'faq.html',
  'destinations.html',
  'collections.html',
  'routes.html',
  // Add more pages as necessary
];

// Global settings for affiliate links
const SETTINGS = {
  affiliateID: '21885', // Your affiliate ID
  offerID: '29465', // Your offer ID
  baseURL: BASE_URL,
  trackingEnabled: true, // You can enable/disable tracking here
  defaultUTM: 'utm_source=brightlane&utm_medium=affiliate&utm_campaign=2026', // Default UTM parameters
};

module.exports = {
  BASE_URL,
  PAGES_TO_AFFILIATE,
  SETTINGS,
};
