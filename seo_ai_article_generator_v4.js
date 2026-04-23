const fs = require("fs");
const axios = require("axios");

const API_KEY = process.env.OPENAI_API_KEY;

const AFFILIATE_LINK =
  "https://convert.ctypy.com/aff_c?offer_id=29465&aff_id=21885";

const OUTPUT_DIR = "./articles_v4";

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR);
}

const keywords = [
  "cheap flights from New York to London",
  "cheap flights to Tokyo from USA",
  "best time to book flights 2026",
  "how to find cheap international flights",
  "Skyscanner flight deals guide",
  "cheap flights to Europe from USA",
  "budget travel flight hacks",
  "cheap flights from London to Dubai",
  "flight comparison websites explained",
  "how to save money on airline tickets"
];

// 🔥 REAL AI CALL
async function generateArticle(keyword) {
  const prompt = `
Write a 1200–1800 word SEO travel article about: "${keyword}"

Requirements:
- Use natural human writing style
- Include H2 and H3 headings
- Include travel tips and pricing insights
- Mention flight comparison tools like Skyscanner naturally
- Include money-saving strategies
- Add FAQ section
- Make it Google SEO optimized
- Do NOT mention AI or prompts
`;

  const res = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a professional SEO travel writer." },
        { role: "user", content: prompt }
      ],
      temperature: 0.8
    },
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      }
    }
  );

  return res.data.choices[0].message.content;
}

// 🧱 HTML WRAPPER
function wrapHTML(title, content) {
  return `
<!DOCTYPE html>
<html>
<head>
<title>${title} | Cheap Flight Guide 2026</title>
<meta name="description" content="Learn how to find ${title} and save money using smart flight comparison tools like Skyscanner.">
<meta name="keywords" content="${title}, cheap flights, Skyscanner, travel deals">
</head>

<body style="font-family:Arial; max-width:850px; margin:auto; line-height:1.7;">

<h1>${title}</h1>

${content}

<hr>

<div style="text-align:center;margin:30px 0;">
  <a href="${AFFILIATE_LINK}"
     style="background:#ff6b35;color:#fff;padding:14px 24px;text-decoration:none;border-radius:8px;font-weight:bold;">
     Search Cheap Flights →
  </a>
</div>

<p>
👉 Compare live prices: 
<a href="${AFFILIATE_LINK}">Skyscanner Deals</a>
</p>

</body>
</html>
`;
}

// 🚀 RUNNER
async function run() {
  for (let i = 0; i < 50; i++) {
    const keyword = keywords[i % keywords.length];

    console.log("Generating:", keyword);

    try {
      const article = await generateArticle(keyword);

      const html = wrapHTML(keyword, article);

      const filename = `ai-${i + 1}-${keyword
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^a-z0-9-]/g, "")}.html`;

      fs.writeFileSync(`${OUTPUT_DIR}/${filename}`, html);

      console.log("Saved:", filename);
    } catch (err) {
      console.log("Error generating:", keyword, err.message);
    }
  }

  console.log("DONE: 50 AI SEO articles generated");
}

run();
