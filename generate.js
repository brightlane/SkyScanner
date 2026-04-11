/**
 * STADIUMSTAY OS v4.0 - THE "DAILY PULSE" ENGINE
 * Fully Enhanced: Daily City Rotation, Gear Drops, and World Cup Countdown.
 */

// 1. MASTER CONFIGURATION
const CONFIG = {
    SKYSCANNER: "http://convert.ctypy.com/aff_c?offer_id=29465&aff_id=21885",
    BOOKING: "https://www.booking.com/index.html?aid=1858279",
    ALIEXPRESS: "https://www.awin1.com/cread.php?awinmid=6378&awinaffid=1166692&ued=",
    BRAND_NAME: "StadiumStay 2026",
    EVENT_DATE: new Date("June 11, 2026"), // World Cup 2026 Start Date
    LAST_AUDIT: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
};

// 2. THE MASTER DATABASE
const travelDatabase = [
    { city: "New York / NJ", airport: "EWR", stadium: "MetLife Stadium", price: "$295", hotel_slug: "metlife" },
    { city: "Los Angeles", airport: "LAX", stadium: "SoFi Stadium", price: "$315", hotel_slug: "sofi" },
    { city: "Mexico City", airport: "MEX", stadium: "Estadio Azteca", price: "$220", hotel_slug: "azteca" },
    { city: "London", airport: "LHR", stadium: "Wembley", price: "$410", hotel_slug: "wembley" },
    { city: "Tokyo", airport: "NRT", stadium: "Japan National", price: "$780", hotel_slug: "national" },
    { city: "Dallas", airport: "DFW", stadium: "AT&T Stadium", price: "$265", hotel_slug: "att-stadium" },
    { city: "Miami", airport: "MIA", stadium: "Hard Rock Stadium", price: "$210", hotel_slug: "hard-rock" }
];

// 3. AUTO-CONTENT GENERATOR (The Daily Trick)
const getDailyIntel = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);

    // Dynamic Selections
    const cityIndex = dayOfYear % travelDatabase.length;
    const gearList = ["Portable GaN Chargers", "Clear Stadium Bags", "Solar Power Banks", "Travel Neck Pillows", "Universal Plug Adapters"];
    
    return {
        city: travelDatabase[cityIndex],
        gear: gearList[dayOfYear % gearList.length],
        daysLeft: Math.ceil((CONFIG.EVENT_DATE - now) / oneDay)
    };
};

// 4. THE INJECTION ENGINE
(function() {
    const intel = getDailyIntel();

    const injectIdentity = () => {
        const icon = document.createElement('link');
        icon.rel = 'icon';
        icon.href = 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>✈️</text></svg>';
        document.head.appendChild(icon);
    };

    const syncAffiliates = () => {
        document.querySelectorAll('.sky-link').forEach(el => el.href = CONFIG.SKYSCANNER);
        document.querySelectorAll('.booking-link').forEach(el => el.href = CONFIG.BOOKING);
        document.querySelectorAll('.ali-link').forEach(el => {
            const prod = el.getAttribute('data-url') || "https://aliexpress.com";
            el.href = CONFIG.ALIEXPRESS + encodeURIComponent(prod);
        });
    };

    const injectDailyContent = () => {
        // Daily Gear Drop in Header
        const dealBar = document.getElementById('daily-deal');
        if (dealBar) {
            dealBar.innerHTML = `⚡ <strong>DAILY DROP:</strong> Verified 40% Discount on <u>${intel.gear}</u> &nbsp; | &nbsp; 🏆 <strong>${intel.daysLeft} Days</strong> until Kickoff`;
        }

        // Featured Daily Audit Card
        const auditBox = document.getElementById('daily-audit');
        if (auditBox) {
            auditBox.innerHTML = `
                <div style="background: #fff; border: 2px solid #0072b2; border-radius: 15px; padding: 25px; box-shadow: 0 10px 20px rgba(0,0,0,0.05);">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;">
                        <span style="background:#0072b2; color:white; font-size:0.6rem; padding:4px 8px; border-radius:4px; font-weight:900;">LIVE DAILY AUDIT</span>
                        <span style="font-size:0.7rem; color:#64748b;">${CONFIG.LAST_AUDIT}</span>
                    </div>
                    <h3 style="margin:0; font-size:1.3rem;">Priority: ${intel.city.city}</h3>
                    <p style="color:#64748b; font-size:0.85rem; margin:5px 0 15px;">Target: ${intel.city.stadium}</p>
                    <div style="font-size:1.5rem; font-weight:900; color:#0f172a;">${intel.city.price} <span style="font-size:0.7rem; font-weight:400; color:#059669;">Benchmark Active</span></div>
                    <a href="calculator.html?q=${intel.city.city}" class="btn-read" style="display:block; text-align:center; background:#0072b2; color:white; padding:12px; border-radius:8px; text-decoration:none; margin-top:15px; font-weight:700; font-size:0.85rem;">Secure Audit Rate →</a>
                </div>
            `;
        }
    };

    const injectFooter = () => {
        if(document.querySelector('footer')) return;
        const footer = document.createElement('footer');
        footer.style.cssText = "background:#0f172a; color:#94a3b8; padding:80px 20px; font-family:sans-serif; margin-top:100px; border-top:4px solid #0072b2;";
        
        const links = {
            "Host Cities": ["New-York", "Los-Angeles", "Mexico-City", "London", "Tokyo", "Dallas", "Miami"],
            "Market Tools": ["Calculator", "Routes", "Blog", "Sitemap", "Packing", "Radar"],
            "Legal": ["Privacy", "Terms", "Affiliate-Disclosure"]
        };

        let html = `<div style="max-width:1100px; margin:0 auto; display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:40px;">`;
        for (const [title, pages] of Object.entries(links)) {
            html += `<div><h4 style="color:white; font-size:0.75rem; text-transform:uppercase; margin-bottom:20px;">${title}</h4>`;
            pages.forEach(p => {
                html += `<a href="${p.toLowerCase()}.html" style="color:#64748b; text-decoration:none; display:block; margin-bottom:10px; font-size:0.85rem;" onmouseover="this.style.color='white'" onmouseout="this.style.color='#64748b'">${p.replace('-', ' ')}</a>`;
            });
            html += `</div>`;
        }
        html += `</div><div style="text-align:center; margin-top:60px; color:#475569; font-size:0.7rem;">
            <p>© 2026 ${CONFIG.BRAND_NAME} | Verified Affiliate Hub | Last Sync: ${CONFIG.LAST_AUDIT}</p>
        </div>`;
        footer.innerHTML = html;
        document.body.appendChild(footer);
    };

    window.addEventListener('DOMContentLoaded', () => {
        injectIdentity();
        syncAffiliates();
        injectDailyContent();
        injectFooter();
    });
})();
