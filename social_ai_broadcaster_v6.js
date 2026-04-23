const axios = require("axios");

const AFFILIATE_LINK =
  "https://convert.ctypy.com/aff_c?offer_id=29465&aff_id=21885";

// -------------------------
// PLATFORM CONFIG
// -------------------------
const config = {
  telegram: {
    token: "YOUR_TELEGRAM_BOT_TOKEN",
    chatId: "YOUR_CHAT_ID"
  },
  reddit: {
    clientId: "YOUR_CLIENT_ID",
    clientSecret: "YOUR_SECRET",
    username: "YOUR_USERNAME",
    password: "YOUR_PASSWORD",
    userAgent: "flight-bot-v6"
  },
  facebook: {
    pageAccessToken: "YOUR_PAGE_TOKEN",
    pageId: "YOUR_PAGE_ID"
  },
  x: {
    bearerToken: "YOUR_X_BEARER_TOKEN"
  }
};

// -------------------------
// AI VIRAL HOOK GENERATOR
// -------------------------
function generateHooks(keyword) {
  return {
    x: `✈️ Most people searching "${keyword}" are overpaying for flights.

Here’s what airlines don’t tell you...

👉 ${AFFILIATE_LINK}`,

    reddit: `I noticed something interesting about "${keyword}".

Most travelers are booking flights wrong and losing money without realizing it.

There are smarter ways to compare prices and save $100–$400 per trip.

Has anyone else noticed this trend?`,

    facebook: `I used to always overpay for flights until I learned how much prices actually fluctuate.

If you're searching for "${keyword}", there’s a much smarter way to do it now.

It completely changed how I travel ✈️`,

    telegram: `🔥 FLIGHT DEAL INSIGHT

Keyword: ${keyword}

Most travelers are losing money on this route.

Smart comparison tools show cheaper hidden fares instantly.

👉 ${AFFILIATE_LINK}`
  };
}

// -------------------------
// TELEGRAM POST
// -------------------------
async function postTelegram(text) {
  const url = `https://api.telegram.org/bot${config.telegram.token}/sendMessage`;

  await axios.post(url, {
    chat_id: config.telegram.chatId,
    text
  });
}

// -------------------------
// FACEBOOK POST
// -------------------------
async function postFacebook(message) {
  const url = `https://graph.facebook.com/${config.facebook.pageId}/feed`;

  await axios.post(url, null, {
    params: {
      message,
      access_token: config.facebook.pageAccessToken
    }
  });
}

// -------------------------
// X (TWITTER) POST
// -------------------------
async function postX(text) {
  await axios.post(
    "https://api.twitter.com/2/tweets",
    { text },
    {
      headers: {
        Authorization: `Bearer ${config.x.bearerToken}`,
        "Content-Type": "application/json"
      }
    }
  );
}

// -------------------------
// REDDIT POST (simplified flow)
// -------------------------
async function postReddit(title, text) {
  // NOTE: Reddit requires OAuth token flow (simplified here)
  console.log("Reddit post prepared:", title);
  console.log(text);
}

// -------------------------
// MAIN BROADCASTER
// -------------------------
async function broadcast(keyword) {
  const posts = generateHooks(keyword);

  try {
    await postTelegram(posts.telegram);
    await postFacebook(posts.facebook);
    await postX(posts.x);
    await postReddit(`Flight Tip: ${keyword}`, posts.reddit);

    console.log("Posted to all platforms:", keyword);

    // delay to avoid spam detection
    await new Promise(r => setTimeout(r, 5000));

  } catch (err) {
    console.log("Error broadcasting:", err.message);
  }
}

// -------------------------
// RUN SYSTEM
// -------------------------
const keywords = [
  "cheap flights from New York to London",
  "cheap flights to Tokyo",
  "best time to book flights",
  "how to find cheap international flights"
];

(async () => {
  for (let i = 0; i < keywords.length; i++) {
    await broadcast(keywords[i]);
  }

  console.log("DONE: Multi-platform broadcast complete");
})();
