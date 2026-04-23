const fs = require("fs");

const AFFILIATE_LINK =
  "https://convert.ctypy.com/aff_c?offer_id=29465&aff_id=21885";

// Sample keyword pools (expand this for thousands of pages)
const cities = [
  "New York", "London", "Paris", "Tokyo", "Dubai",
  "Toronto", "Sydney", "Rome", "Bangkok", "Los Angeles"
];

const destinations = [
  "Bali", "Tokyo", "Paris", "Dubai", "Rome",
  "New York", "London", "Bangkok", "Singapore", "Barcelona"
];

// SEO blog template generator
function createBlog(from, to) {
  const title = `Cheap Flights from ${from} to ${to} (2026 Guide)`;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
<title>${title}</title>
<meta name="description" content="Find cheap flights from ${from} to ${to}. Compare prices instantly and save money using Skyscanner flight search.">
<meta name="keywords" content="cheap flights ${from} to ${to}, flights ${from} ${to}, Skyscanner deals">
</head>

<body style="font-family:Arial; max-width:800px; margin:auto;">

<h1>${title}</h1>

<p>
Finding cheap flights from <b>${from}</b> to <b>${to}</b> can be difficult because airline prices change constantly.
Using flight comparison tools helps you save money instantly.
</p>

<h2>Why use Skyscanner?</h2>

<ul>
<li>Compare hundreds of airlines instantly</li>
<li>Find hidden cheap flight deals</li>
<li>Flexible date pricing</li>
<li>No booking fees</li>
</ul>

<h2>Best way to book flights</h2>

<p>
Always compare flexible dates and nearby airports to reduce costs.
Small changes can save you 20–60%.
</p>

<div style="margin:30px 0; text-align:center;">
  <a href="${AFFILIATE_LINK}" 
     style="background:#ff6b35;color:#fff;padding:14px 22px;text-decoration:none;border-radius:8px;font-weight:bold;">
     Search Cheap Flights Now →
  </a>
</div>

<h2>Final Tip</h2>
<p>
Prices change daily, so always book when you see a good deal.
</p>

<p><a href="${AFFILIATE_LINK}">👉 Compare flights on Skyscanner</a></p>

</body>
</html>
`;
}

// Generate 50 pages
let count = 0;

for (let i = 0; i < cities.length; i++) {
  for (let j = 0; j < destinations.length; j++) {
    if (count >= 50) break;

    const from = cities[i];
    const to = destinations[j];

    const html = createBlog(from, to);

    const filename = `flight-${from.toLowerCase().replace(/ /g, "-")}-to-${to.toLowerCase().replace(/ /g, "-")}.html`;

    fs.writeFileSync(`./output/${filename}`, html);

    console.log("Generated:", filename);

    count++;
  }
}

console.log("Done: 50 SEO flight blogs created.");
