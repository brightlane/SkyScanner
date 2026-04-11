/**
 * GENERATE.JS - MASTER ENGINE
 * Responsibility: Centralized Affiliate IDs, Favicons, and Dynamic Data
 */

// 1. GLOBAL SETTINGS
const SKYSCANNER_URL = "http://convert.ctypy.com/aff_c?offer_id=29465&aff_id=21885";

// 2. TRAVEL DATABASE (Used by Blog and Search)
const travelDatabase = [
    { city: "New York", airport: "EWR", stadium: "MetLife Stadium", price: "$290", desc: "World Cup 2026 Final Host City." },
    { city: "London", airport: "LHR", stadium: "Wembley", price: "$410", desc: "The home of football. Best for solo luxury." },
    { city: "Tokyo", airport: "NRT", stadium: "Japan National", price: "$780", desc: "Sakura season 2026 travel benchmarks." },
    { city: "Lisbon", airport: "LIS", stadium: "Estádio da Luz", price: "$340", desc: "The 2026 Soft Life capital of Europe." },
    { city: "Bali", airport: "DPS", stadium: "Kapten I Wayan Dipta", price: "$620", desc: "Top-tier wellness and digital nomad hub." }
];

// 3. GLOBAL FAVICON INJECTION
(function injectFavicon() {
    const faviconLink = document.createElement('link');
    faviconLink.rel = 'icon';
    faviconLink.href = 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>✈️</text></svg>';
    document.head.appendChild(faviconLink);
    console.log("✈️ Favicon injected.");
})();

// 4. AUTO-AFFILIATE LINK FIXER
// This makes every 'sky-link' class point to your URL automatically
document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll('.sky-link');
    links.forEach(link => {
        // Only update if the href is empty or a placeholder
        if (link.getAttribute('href') === '#' || !link.getAttribute('href')) {
            link.href = SKYSCANNER_URL;
        }
    });
    console.log("🔗 Affiliate links synchronized.");
});
