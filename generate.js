const fs = require("fs");

// =========================
// CONFIG
// =========================

const OUTPUT_DIR = "./pages";
const PAGE_COUNT = 200; // change this up to 50,000 if you want

// YOUR AFFILIATE LINK (UNCHANGED)
const AFFILIATE =
"http://convert.ctypy.com/aff_c?offer_id=29465&aff_id=21885";

// =========================
// BASE DATA (auto-expanded)
// =========================

const BASE = [
  ["New York", "MetLife Stadium", "EWR", "World Cup 2026"],
  ["Los Angeles", "SoFi Stadium", "LAX", "World Cup 2026"],
  ["Miami", "Hard Rock Stadium", "MIA", "World Cup 2026"],
  ["London", "Wembley Stadium", "LHR", "Champions League"],
  ["Paris", "Stade de France", "CDG", "Olympics 2028"],
  ["Tokyo", "National Stadium", "HND", "Olympics 2028"]
];

// =========================
// TEMPLATE (INLINE)
// =========================

function template(data, affLink) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${data.city} Travel | StadiumStay</title>
  <meta name="description" content="Travel guide for ${data.stadium} in ${data.city}">
</head>

<body style="font-family:Arial;background:#0a0a0a;color:#fff;padding:30px">

  <h1>${data.city} Stadium Travel</h1>

  <p><b>Stadium:</b> ${data.stadium}</p>
  <p><b>Event:</b> ${data.event}</p>
  <p><b>Airport:</b> ${data.airport}</p>

  <a href="${affLink}"
     style="display:inline-block;margin-top:20px;padding:12px 18px;background:#00d46a;color:#fff;text-decoration:none;">
     Search Flights
  </a>

  <hr style="margin:40px 0">

  <p>
    Plan your trip early for ${data.city}. Major demand during ${data.event}.
  </p>

</body>
</html>
`;
}

// =========================
// GENERATOR
// =========================

function makeCity(i) {
  const base = BASE[i % BASE.length];

  return {
    city: base[0],
    stadium: base[1],
    airport: base[2],
    event: base[3],
    slug: base[0].toLowerCase().replace(/ /g, "-") + "-" + i
  };
}

// =========================
// RUNNER
// =========================

function run() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  console.log("🚀 Generating pages...");

  for (let i = 0; i < PAGE_COUNT; i++) {

    const city = makeCity(i);

    const aff = `${AFFILIATE}&aff_sub=${city.airport}`;

    const html = template(city, aff);

    fs.writeFileSync(
      `${OUTPUT_DIR}/${city.slug}.html`,
      html
    );

    if (i % 1000 === 0) {
      console.log(`Generated ${i} pages`);
    }
  }

  console.log(`✅ DONE: ${PAGE_COUNT} pages created`);
}

run();
