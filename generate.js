/**
 * GENERATE.JS - THE MASTER ENGINE
 * Centralized Logic for: Favicons, Affiliate IDs, Dynamic Footers, and Data
 */

// 1. GLOBAL CONFIGURATION
const CONFIG = {
    SKYSCANNER_URL: "http://convert.ctypy.com/aff_c?offer_id=29465&aff_id=21885",
    ALIEXPRESS_BASE: "https://www.awin1.com/cread.php?awinmid=6378&awinaffid=1166692&ued=",
    SITE_NAME: "StadiumStay 2026",
    LAST_SYNC: new Date().toLocaleDateString()
};

// 2. THE TRAVEL DATABASE
const travelDatabase = [
    { city: "New York", airport: "EWR", stadium: "MetLife Stadium", price: "$290", desc: "World Cup 2026 Final Host City." },
    { city: "London", airport: "LHR", stadium: "Wembley", price: "$410", desc: "The home of football. Best for solo luxury." },
    { city: "Tokyo", airport: "NRT", stadium: "Japan National", price: "$780", desc: "Sakura season 2026 travel benchmarks." },
    { city: "Lisbon", airport: "LIS", stadium: "Estádio da Luz", price: "$340", desc: "The 2026 Soft Life capital of Europe." },
    { city: "Bali", airport: "DPS", stadium: "Kapten I Wayan Dipta", price: "$620", desc: "Top-tier wellness and digital nomad hub." },
    { city: "Rome", airport: "FCO", stadium: "Stadio Olimpico", price: "$395", desc: "Ancient history meets modern 2026 sports." },
    { city: "Paris", airport: "CDG", stadium: "Stade de France", price: "$440", desc: "Luxury travel benchmarks for European summer." }
];

// 3. AUTO-EXECUTING ENHANCEMENTS
(function() {
    
    // A. FAVICON INJECTION
    const injectFavicon = () => {
        const faviconLink = document.createElement('link');
        faviconLink.rel = 'icon';
        faviconLink.href = 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>✈️</text></svg>';
        document.head.appendChild(faviconLink);
    };

    // B. GLOBAL LINK TREE FOOTER (Internal Linking SEO)
    const injectFooter = () => {
        const footer = document.createElement('footer');
        footer.style.cssText = "background:#0f172a; color:#94a3b8; padding:60px 20px; font-size:0.8rem; margin-top:80px; font-family:sans-serif; border-top: 4px solid #0072b2;";
        
        const categories = {
            "Global Hubs": ["London", "Paris", "Rome", "Tokyo", "New York", "Los-Angeles"],
            "Travel Tech": ["Calculator", "Routes", "Translate", "Radar", "Calendar", "Packing"],
            "Market Silos": ["Solo", "Nomad", "Nocturnal", "Quiet", "Eco", "Essentials"],
            "Legal & Trust": ["Compliance", "Privacy", "About", "FAQ", "Blog", "Sitemap"]
        };

        let footerHTML = `<div style="max-width:1100px; margin:0 auto; display:grid; grid-template-columns:repeat(auto-fit, minmax(160px, 1fr)); gap:40px;">`;
        for (const [name, links] of Object.entries(categories)) {
            footerHTML += `<div><h4 style="color:white; margin-bottom:18px; text-transform:uppercase; letter-spacing:1px; font-size:0.75rem;">${name}</h4>`;
            links.forEach(link => {
                const fileName = link.toLowerCase() + ".html";
                footerHTML += `<a href="${fileName}" style="color:#64748b; text-decoration:none; display:block; margin-bottom:10px; transition:0.2s;" onmouseover="this.style.color='white'" onmouseout="this.style.color='#64748b'">${link} Audit</a>`;
            });
            footerHTML += `</div>`;
        }
        footerHTML += `</div><div style="text-align:center; margin-top:50px; border-top:1px solid #1e293b; padding-top:25px; color:#475569;">
            <p>© 2026 ${CONFIG.SITE_NAME} | Official Skyscanner Partner | Data Synced: ${CONFIG.LAST_SYNC}</p>
        </div>`;
        footer.innerHTML = footerHTML;
        document.body.appendChild(footer);
    };

    // C. AFFILIATE SYNCHRONIZER
    const syncLinks = () => {
        document.querySelectorAll('.sky-link').forEach(link => {
            link.href = CONFIG.SKYSCANNER_URL;
        });
        document.querySelectorAll('.ali-link').forEach(link => {
            const original = link.getAttribute('data-url') || "";
            link.href = CONFIG.ALIEXPRESS_BASE + encodeURIComponent(original);
        });
    };

    // INIT
    window.addEventListener('DOMContentLoaded', () => {
        injectFavicon();
        injectFooter();
        syncLinks();
        console.log(`🚀 ${CONFIG.SITE_NAME} Engine Active.`);
    });

})();
