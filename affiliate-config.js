/**
 * Global Affiliate Link Configuration
 * brightlane SkyScanner Project
 */

const AFFILIATE_URL = "https://convert.ctypy.com/aff_c?offer_id=29465&aff_id=21885";

document.addEventListener("DOMContentLoaded", function() {
    // 1. Find all links that are meant to go to Skyscanner/Booking
    // This looks for links with specific classes or text
    const flightLinks = document.querySelectorAll('a[href*="skyscanner"], .btn-search, .book-now, .deal-link');

    flightLinks.forEach(link => {
        link.href = AFFILIATE_URL;
        link.setAttribute('rel', 'sponsored noopener noreferrer');
        link.setAttribute('target', '_blank');
    });

    // 2. Optional: Redirect any button clicks that don't have an href
    const searchButtons = document.querySelectorAll('button.search-trigger');
    searchButtons.forEach(button => {
        button.addEventListener('click', function() {
            window.open(AFFILIATE_URL, '_blank');
        });
    });
});
