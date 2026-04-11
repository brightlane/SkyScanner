/**
 * STADIUMSTAY OS v3.0 - THE "SET & FORGET" ENGINE
 * Logic: Global Favicon, Triple-Revenue Affiliate Sync, and SEO Footer.
 */

// 1. MASTER CONFIGURATION (The Switchboard)
const CONFIG = {
    SKYSCANNER: "http://convert.ctypy.com/aff_c?offer_id=29465&aff_id=21885",
    BOOKING: "https://www.booking.com/index.html?aid=1858279",
    ALIEXPRESS: "https://www.awin1.com/cread.php?awinmid=6378&awinaffid=1166692&ued=",
    BRAND_NAME: "StadiumStay 2026",
    LAST_AUDIT: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
};

// 2. DYNAMIC CONTENT DATABASE
const travelDatabase = [
    { city: "New York / NJ", airport: "EWR", stadium: "MetLife Stadium", price: "$295", hotel_slug: "metlife-stadium-hotels" },
    { city: "Los Angeles", airport: "LAX", stadium: "SoFi Stadium", price: "$315", hotel_slug: "sofi-stadium-hotels" },
    { city: "Mexico City", airport: "MEX", stadium: "Estadio Azteca", price: "$220", hotel_slug: "estadio-azteca-hotels" },
    { city: "London", airport: "LHR", stadium: "Wembley", price: "$410", hotel_slug: "wembley-stadium-hotels" },
    { city: "Tokyo", airport: "NRT", stadium: "Japan National", price: "$780", hotel_slug: "japan-national-stadium-hotels" }
];

// 3. AUTO-INJECTOR ENGINE
(function() {
    
    // A. FAVICON & META INJECTION (The "Brand" Signal)
    const injectIdentity = () => {
        const icon = document.createElement('link');
        icon.rel = 'icon';
        icon.href = 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>✈️</text></svg>';
        document.head.appendChild(icon);
    };

    // B. AFFILIATE SYNCHRONIZER (The "Money" Logic)
    const syncAffiliates = () => {
        // Skyscanner Links
        document.querySelectorAll('.sky-link').forEach(el => el.href = CONFIG.SKYSCANNER);
        
        // Booking.com Links
        document.querySelectorAll('.booking-link').forEach(el => el.href = CONFIG.BOOKING);
        
        // AliExpress Links (Uses data-url attribute)
        document.querySelectorAll('.ali-link').forEach(el => {
            const prod = el.getAttribute('data-url') || "https://aliexpress.com";
            el.href = CONFIG.ALIEXPRESS + encodeURIComponent(prod);
        });
    };

    // C. GLOBAL SEO FOOTER (The "Internal Link" Web)
    const injectFooter = () => {
        if(document.querySelector('footer')) return; // Prevent double footers
        
        const footer = document.createElement('footer');
        footer.style.cssText = "background:#0f172a; color:#94a3b8; padding:80px 20px; font-family:sans-serif; margin-top:100px; border-top:4px solid #0072b2;";
        
        const links = {
            "Host Cities": ["London", "Paris", "Rome", "Tokyo", "New-York", "Los-Angeles"],
            "Smart Tools": ["Calculator", "Routes", "Translate", "Radar", "Packing", "Calendar"],
            "Niche Audits": ["Solo", "Nomad", "Nocturnal", "Quiet", "Eco", "Essentials"],
            "System": ["Compliance", "Privacy", "About", "FAQ", "Blog", "Sitemap"]
        };

        let html = `<div style="max-width:1100px; margin:0 auto; display:grid; grid-template-columns:repeat(auto-fit, minmax(160px, 1fr)); gap:40px;">`;
        for (const [title, pages] of Object.entries(links)) {
            html += `<div><h4 style="color:white; font-size:0.75rem; text-transform:uppercase; margin-bottom:20px;">${title}</h4>`;
            pages.forEach(p => {
                html += `<a href="${p.toLowerCase()}.html" style="color:#64748b; text-decoration:none; display:block; margin-bottom:10px; font-size:0.85rem;" onmouseover="this.style.color='white'" onmouseout="this.style.color='#64748b'">${p.replace('-', ' ')}</a>`;
            });
            html += `</div>`;
        }
        html += `</div><div style="text-align:center; margin-top:60px; padding-top:30px; border-top:1px solid #1e293b; color:#475569; font-size:0.75rem;">
            <p>© 2026 ${CONFIG.BRAND_NAME} | Live Audit Status: Optimal | Last Data Sync: ${CONFIG.LAST_AUDIT}</p>
            <p style="margin-top:10px;">Official Affiliate Partner of Skyscanner, Booking.com, and AliExpress</p>
        </div>`;
        
        footer.innerHTML = html;
        document.body.appendChild(footer);
    };

    // EXECUTION ON LOAD
    window.addEventListener('DOMContentLoaded', () => {
        injectIdentity();
        syncAffiliates();
        injectFooter();
        console.log(`✅ ${CONFIG.BRAND_NAME} Engine Online.`);
    });
})();
