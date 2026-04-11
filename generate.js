/**
 * STADIUMSTAY OS v4.1 - THE "REVENUE FIRST" ENGINE
 * Purpose: Redirect all commercial intent to Skyscanner Affiliate ID 21885
 */

// 1. MASTER CONFIGURATION
const CONFIG = {
    // YOUR PRIMARY REVENUE LINK
    AFFILIATE_BASE: "http://convert.ctypy.com/aff_c?offer_id=29465&aff_id=21885",
    
    BRAND_NAME: "StadiumStay 2026",
    EVENT_DATE: new Date("June 11, 2026"),
    LAST_AUDIT: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) + " UTC"
};

// 2. THE MASTER DATABASE
const travelDatabase = [
    { city: "New York / NJ", airport: "EWR", stadium: "MetLife Stadium", price: "$295" },
    { city: "Los Angeles", airport: "LAX", stadium: "SoFi Stadium", price: "$315" },
    { city: "Mexico City", airport: "MEX", stadium: "Estadio Azteca", price: "$220" },
    { city: "London", airport: "LHR", stadium: "Wembley", price: "$410" }
];

// 3. THE REVENUE ENGINE
(function() {
    const now = new Date();
    const dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000);
    const todayCity = travelDatabase[dayOfYear % travelDatabase.length];

    const injectDailyContent = () => {
        // Force the Daily Audit Card to use the Affiliate Link
        const auditBox = document.getElementById('daily-audit');
        if (auditBox) {
            auditBox.innerHTML = `
                <div style="background:white; border:2px solid #0072b2; border-radius:15px; padding:25px; box-shadow:0 10px 20px rgba(0,0,0,0.05);">
                    <span style="background:#0072b2; color:white; font-size:0.6rem; padding:4px 8px; border-radius:4px; font-weight:900;">LIVE DAILY AUDIT</span>
                    <h3 style="margin:10px 0 5px;">${todayCity.city}</h3>
                    <div style="font-size:1.5rem; font-weight:900; color:#0f172a; margin-bottom:15px;">${todayCity.price}</div>
                    <a href="${CONFIG.AFFILIATE_BASE}" target="_blank" style="display:block; text-align:center; background:#0072b2; color:white; padding:12px; border-radius:8px; text-decoration:none; font-weight:700;">Secure This Rate →</a>
                </div>
            `;
        }

        const dealBar = document.getElementById('daily-deal');
        if (dealBar) {
            dealBar.innerHTML = `<a href="${CONFIG.AFFILIATE_BASE}" target="_blank" style="text-decoration:none; color:inherit;">⚡ <strong>DEAL ALERT:</strong> 2026 Flight Benchmarks for ${todayCity.city} are LIVE. <span style="text-decoration:underline;">Click to Audit</span></a>`;
        }
    };

    const syncAllClicks = () => {
        // GLOBAL INTERCEPTOR: Every link with class "sky-link" or "booking-link" 
        // will now go to your Skyscanner Affiliate URL.
        document.querySelectorAll('a').forEach(link => {
            if (link.classList.contains('sky-link') || link.classList.contains('booking-link') || link.innerText.includes('Audit')) {
                link.href = CONFIG.AFFILIATE_BASE;
                link.target = "_blank"; // Opens in new tab so they keep your site open too
            }
        });
    };

    window.addEventListener('DOMContentLoaded', () => {
        injectDailyContent();
        syncAllClicks();
        
        // Final Footer Injection with Affiliate Disclosure (SEO Requirement)
        const footer = document.createElement('footer');
        footer.style.cssText = "background:#0f172a; color:#94a3b8; padding:40px 20px; text-align:center; margin-top:50px;";
        footer.innerHTML = `<p style="font-size:0.7rem;">© 2026 ${CONFIG.BRAND_NAME} | <a href="${CONFIG.AFFILIATE_BASE}" style="color:#64748b;">Affiliate Disclosure</a>: Clicks may result in commissions to support this audit hub.</p>`;
        document.body.appendChild(footer);
    });
})();
