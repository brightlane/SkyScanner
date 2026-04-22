const fs = require("fs");
const path = require("path");

console.log("🔥 Generator started");

// --------------------------------------------------
// 1. OUTPUT FOLDER (IMPORTANT)
// --------------------------------------------------
const OUTPUT_DIR = path.join(__dirname, "generated-articles");
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// --------------------------------------------------
// 2. SAMPLE DATA (replace with your real logic)
// --------------------------------------------------
const articles = [
  {
    title: "Cheap Flights to Tokyo 2026",
    slug: "cheap-flights-tokyo-2026",
    content: "<h1>Tokyo Travel Guide</h1><p>Best deals for 2026...</p>"
  },
  {
    title: "Bali Budget Travel Guide",
    slug: "bali-budget-travel",
    content: "<h1>Bali on a Budget</h1><p>Save money while traveling...</p>"
  }
];

// --------------------------------------------------
// 3. WRITE FILES (THIS IS THE CRITICAL PART)
// --------------------------------------------------
for (const article of articles) {
  const filePath = path.join(OUTPUT_DIR, `${article.slug}.html`);

  fs.writeFileSync(filePath, article.content, "utf8");

  console.log("✅ Generated:", filePath);
}

// --------------------------------------------------
// 4. SAFETY CHECK (forces visibility in CI logs)
// --------------------------------------------------
const files = fs.readdirSync(OUTPUT_DIR);
console.log("📦 Files created:", files);
