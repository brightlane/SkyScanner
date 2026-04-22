const { execSync } = require("child_process");

console.log("🚀 Starting SkyScanner generation pipeline...");

// STEP 1: CLEAN STATE (optional but recommended)
console.log("🧹 Cleaning old output...");
execSync("rm -rf generated-articles/*");

// STEP 2: RUN ALL GENERATORS IN ORDER
console.log("🧠 Running primary generator...");
execSync("node generateSkyscannerArticles.js");

console.log("🧠 Running expansion generator...");
execSync("node generateSkyscannerArticles2.js");

console.log("🧠 Running deep content generator...");
execSync("node generateSkyscannerArticles3.js");

// STEP 3: OPTIONAL PYTHON ENGINE (if still used)
console.log("🐍 Running Python generator...");
try {
    execSync("python master_article_generator.py");
} catch (e) {
    console.log("⚠️ Python generator skipped or failed (non-critical)");
}

// STEP 4: POST PROCESSING
console.log("🔗 Injecting internal links...");
execSync("node generate-internal-links.js");

console.log("🗺️ Updating sitemap...");
execSync("node generate-sitemap.js");

console.log("✅ Pipeline complete.");
