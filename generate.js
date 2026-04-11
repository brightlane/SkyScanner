// generate.js
const SKYSCANNER_URL = "http://convert.ctypy.com/aff_c?offer_id=29465&aff_id=21885";

// Logic to inject this link into any page with a "booking" class
document.querySelectorAll('.sky-link').forEach(link => {
    link.href = SKYSCANNER_URL;
});
