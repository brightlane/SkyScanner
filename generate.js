/**
 * SOFTLIFE TRAVEL NETWORK - MASTER GENERATOR
 * Controls Affiliate Links & Daily Content Rotation
 */

// 1. MASTER CONFIGURATION
const SKYSCANNER_URL = "http://convert.ctypy.com/aff_c?offer_id=29465&aff_id=21885";

const travelDatabase = [
    { city: "Lisbon, Portugal", discount: "22%", price: "$340", desc: "The 2026 'Soft Life' capital for wellness." },
    { city: "Tokyo, Japan", discount: "15%", price: "$720", desc: "Experience Sakura season with premium fares." },
    { city: "Hoi An, Vietnam", discount: "40%", price: "$410", desc: "The top-rated digital nomad hub for 2026." },
    { city: "Bali, Indonesia", discount: "30%", price: "$550", desc: "Spiritual retreats and luxury villa deals." },
    { city: "New York, USA", discount: "12%", price: "$290", desc: "Direct routes for the World Cup 2026 corridor." },
    { city: "Paris, France", discount: "18%", price: "$380", desc: "Springtime boutique travel and art tours." }
];

// 2. RUN ON PAGE LOAD
document.addEventListener("DOMContentLoaded", () => {
    injectAffiliateLinks();
    if (document.getElementById('blog-grid')) {
        generateDailyBlog();
    }
});

// 3. AFFILIATE LINK INJECTION
// Automatically finds any tag with class 'sky-link' and adds your URL
function injectAffiliateLinks() {
    const links = document.querySelectorAll('.sky-link');
    links.forEach(link => {
        link.href = SKYSCANNER_URL;
    });
}

// 4. DAILY BLOG ROTATION ENGINE
// This picks 3 different cities every day based on the calendar date
function generateDailyBlog() {
    const grid = document.getElementById('blog-grid');
    const dayOfMonth = new Date().getDate();
    
    // Simple logic to rotate the array based on the day
    // This ensures Google sees "fresh" content order every time they crawl
    const rotated = [...travelDatabase].sort((a, b) => {
        return (dayOfMonth % a.city.length) - (dayOfMonth % b.city.length);
    });

    const selection = rotated.slice(0, 3); // Pick the top 3

    grid.innerHTML = selection.map(deal => `
        <div class="card">
            <span class="price-badge">SAVE ${deal.discount}</span>
            <h3>${deal.city}</h3>
            <p>${deal.desc} Flights starting at ${deal.price} return.</p>
            <div style="margin-top:15px; color:#0072b2; font-weight:bold;">View Audit Report →</div>
        </div>
    `).join('');
}
