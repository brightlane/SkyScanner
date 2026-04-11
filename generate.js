/**
 * STADIUMSTAY OS v4.5 - THE MULTI-CHANNEL REVENUE ENGINE
 * Purpose: Dynamically route clicks to Skyscanner, Booking, or AliExpress.
 */

// 1. MASTER AFFILIATE CONFIGURATION
const REVENUE_CHANNELS = {
    SKYSCANNER: "http://convert.ctypy.com/aff_c?offer_id=29465&aff_id=21885",
    BOOKING: "https://www.booking.com/index.html?aid=1858279",
    ALIEXPRESS: "https://www.awin1.com/cread.php?awinmid=6378&awinaffid=1166692&ued=",
    BRAND_NAME: "StadiumStay 2026",
    LAST_AUDIT: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) + " UTC"
};

// 2. DAILY CONTENT DATABASE
const travelDatabase = [
    { city: "New York / NJ", stadium: "MetLife Stadium", price: "$295" },
    { city: "Los Angeles", stadium: "SoFi Stadium", price: "$315" },
    { city: "London", stadium: "Wembley Stadium", price: "$410" },
    { city: "Miami", stadium: "Hard Rock Stadium", price: "$210" }
];

// 3. THE INJECTION ENGINE
(function() {
    const now = new Date();
    const dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000);
    const today = travelDatabase[dayOfYear % travelDatabase.length];

    const injectDailyLogic = () => {
        // 1. Header Deal Bar (AliExpress Hack)
        const dealBar = document.getElementById('daily-deal');
        if (dealBar) {
            const gearUrl = REVENUE_CHANNELS.ALIEXPRESS + encodeURIComponent("https://www.aliexpress.com/w/wholesale-stadium-approved-bag.html");
            dealBar.innerHTML = `<a href="${gearUrl}" target="_blank" style="text-decoration:none; color:inherit;">⚡ <strong>TODAY'S DROP:</strong> Verified Stadium Gear Audit Complete. <span style="text-decoration:underline;">Grab 40% Off Here</span></a>`;
        }

        // 2. Daily Audit Card (Skyscanner/Booking Hybrid)
        const auditBox = document.getElementById('daily-audit');
        if (auditBox) {
            auditBox.innerHTML = `
                <div style="background:white; border:2px solid #0072b2; border-radius:15px; padding:25px; box-shadow:0 10px 20px rgba(0,0,0,0.05);">
                    <span style="background:#0072b2; color:white; font-size:0.6rem; padding:4px 8px; border-radius:4px; font-weight:900;">LIVE AUDIT: ${REVENUE_CHANNELS.LAST_AUDIT}</span>
                    <h3 style="margin:10px 0 5px;">${today.city}</h3>
                    <p style="font-size:0.8rem; color:#64748b; margin-bottom:15px;">Targeting: ${today.stadium}</p>
                    <div style="font-size:1.5rem; font-weight:900; color:#0f172a; margin-bottom:15px;">${today.price}</div>
                    <a href="${REVENUE_CHANNELS.SKYSCANNER}" target="_blank" style="display:block; text-align:center; background:#0072b2; color:white; padding:12px; border-radius:8px; text-decoration:none; font-weight:700; margin-bottom:10px;">Audit Flights</a>
                    <a href="${REVENUE_CHANNELS.BOOKING}" target="_blank" style="display:block; text-align:center; border:2px solid #0072b2; color:#0072b2; padding:10px; border-radius:8px; text-decoration:none; font-weight:700; font-size:0.8rem;">Audit Hotels</a>
                </div>
            `;
        }
    };

    const syncGlobalAffiliates = () => {
        // Forces all links with specific classes to your IDs
        document.querySelectorAll('.sky-link').forEach(el => el.href = REVENUE_CHANNELS.SKYSCANNER);
        document.querySelectorAll('.booking-link').forEach(el => el.href = REVENUE_CHANNELS.BOOKING);
        document.querySelectorAll('.ali-link').forEach(el => {
            const dest = el.getAttribute('data-url') || "https://www.aliexpress.com";
            el.href = REVENUE_CHANNELS.ALIEXPRESS + encodeURIComponent(dest);
        });
        
        // Open all in new tab to preserve dwell time
        document.querySelectorAll('a').forEach(link => {
            if(link.href.includes('convert.ctypy') || link.href.includes('booking.com') || link.href.includes('awin1.com')) {
                link.target = "_blank";
                link.rel = "nofollow noopener noreferrer"; // SEO Best Practice for Affiliate Links
            }
        });
    };

    window.addEventListener('DOMContentLoaded', () => {
        injectDailyLogic();
        syncGlobalAffiliates();
    });
})();
