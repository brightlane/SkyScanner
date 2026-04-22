const fs = require("fs");
const path = require("path");

// --------------------------------------------------
// 1. Ensure output folder exists
// --------------------------------------------------
const OUTPUT_DIR = path.join(__dirname, "generated-articles");
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// --------------------------------------------------
// 2. Example article generation loop
// --------------------------------------------------
function generateArticle(title, slug, html) {
  const filePath = path.join(OUTPUT_DIR, `${slug}.html`);

  fs.writeFileSync(filePath, html, "utf8");

  console.log("Generated:", filePath);
}

// --------------------------------------------------
// 3. YOUR EXISTING LOGIC GOES HERE
// --------------------------------------------------
const articles = [
  {
    title: "Sample Travel Article",
    slug: "sample-travel",
    html: "<h1>Hello Travel</h1>"
  }
];

// --------------------------------------------------
// 4. Write all articles into tracked folder
// --------------------------------------------------
articles.forEach(a => {
  generateArticle(a.title, a.slug, a.html);
});
