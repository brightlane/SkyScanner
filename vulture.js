/**
 * 20K VULTURE ENGINE #11 - CORE DEPLOYMENT
 * Target: https://brightlane.github.io/SkyScanner/
 * Affiliate ID: 21885
 */

const VULTURE_CONFIG = {
    affiliateLink: "https://convert.ctypy.com/aff_c?offer_id=29465&aff_id=21885",
    updateInterval: 3600, // 1 hour in seconds
    urgencyMessages: [
        "🔥 FLASH DEAL: NYC to LONDON price dropped 15%!",
        "⚡ LIVE: 42 people are viewing flights to Tokyo right now.",
        "💎 SECRET RATE: Last-minute deal found for Paris!",
        "⚠️ LIMITED: Only 3 seats left at this price for World Cup 2026."
    ]
};

function initializeVulture() {
    // 1. GLOBAL LINK INTERCEPT (Monetize everything)
    const allLinks = document.querySelectorAll('a');
    allLinks.forEach(link => {
        // If the link is an external booking link or has a specific class
        if (link.hostname !== window.location.hostname || link.classList.contains('affiliate-trigger')) {
            link.href = VULTURE_CONFIG.affiliateLink;
            link.rel = "sponsored noopener noreferrer";
            link.target = "_blank";
        }
    });

    // 2. DYNAMIC CONTENT INJECTION (The "Vulture" Freshness Signal)
    const ticker = document.querySelector('.vulture-ticker');
    if (ticker) {
        const randomMessage = VULTURE_CONFIG.urgencyMessages[Math.floor(Math.random() * VULTURE_CONFIG.urgencyMessages.length)];
        ticker.innerHTML = `<span>${randomMessage}</span>`;
    }

    // 3. AUTO-STAMP (Tricks search bots into seeing constant updates)
    const dateStamp = document.querySelectorAll('.last-updated');
    const now = new Date();
    dateStamp.forEach(el => {
        el.innerText = `Prices Last Verified: ${now.toLocaleDateString()} at ${now.getHours()}:00`;
    });
}

// Run once DOM is ready
document.addEventListener("DOMContentLoaded", initializeVulture);
