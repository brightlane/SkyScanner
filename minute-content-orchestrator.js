import fs from "fs";
import { execSync } from "child_process";

/**
 * MINUTE CONTENT ORCHESTRATOR
 * Runs generators in sequence safely every cycle
 */

const generators = [
  "node generateSkyscannerArticles.js",
  "node generateSkyscannerArticles2.js",
  "node generateSkyscannerArticles3.js"
];

const BATCH_SIZE = 40; // safe limit

function runAll() {
  console.log("🚀 STARTING CONTENT CYCLE...");

  generators.forEach(cmd => {
    try {
      console.log("▶ Running:", cmd);
      execSync(cmd, { stdio: "inherit" });
    } catch (e) {
      console.log("❌ Error in:", cmd);
    }
  });

  console.log("✅ CYCLE COMPLETE");
}

// Run once
runAll();

// OPTIONAL: simulate "every minute" locally
setInterval(runAll, 60 * 1000);
