import fs from "fs";
import { Worker } from "worker_threads";
import path from "path";

/**
 * CONTINUOUS SEO WORKER CLUSTER v3
 * Safe parallel generator + queue system + batch control
 */

const OUTPUT_DIR = "./generated-articles";

// -----------------------------
// 🧠 JOB QUEUE
// -----------------------------
let jobQueue = [];

// -----------------------------
// 🌍 SAMPLE GLOBAL TOPICS
// -----------------------------
const TOPICS = [
  { city: "Tokyo", region: "Asia" },
  { city: "Paris", region: "Europe" },
  { city: "Rome", region: "Europe" },
  { city: "Bangkok", region: "Asia" },
  { city: "New York", region: "Americas" },
  { city: "Lisbon", region: "Europe" },
  { city: "Bali", region: "Asia" },
  { city: "Mexico City", region: "Americas" }
];

// -----------------------------
// ⚙️ CONFIG
// -----------------------------
const CONFIG = {
  maxBatchSize: 40,
  workers: 3, // safe parallel limit
  cycleInterval: 10 * 60 * 1000 // 10 minutes
};

// -----------------------------
// 🧩 LOAD JOBS
// -----------------------------
function loadJobs() {
  jobQueue = TOPICS.map(t => ({
    id: `${t.city}-${Date.now()}`,
    ...t
  }));
}

// -----------------------------
// 👷 WORKER RUNNER
// -----------------------------
function runWorker(job, generator) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(generator, {
      workerData: job
    });

    worker.on("message", resolve);
    worker.on("error", reject);
  });
}

// -----------------------------
// 🔁 GENERATOR LIST (YOUR 3 FILES)
// -----------------------------
const GENERATORS = [
  "./generateSkyscannerArticles.js",
  "./generateSkyscannerArticles2.js",
  "./generateSkyscannerArticles3.js"
];

// -----------------------------
// 📦 PROCESS BATCH
// -----------------------------
async function processBatch(batch) {
  const results = [];

  for (const job of batch) {
    for (const gen of GENERATORS) {
      try {
        const res = await runWorker(job, gen);
        results.push(res);
      } catch (e) {
        console.log("❌ Worker error:", e.message);
      }
    }
  }

  return results;
}

// -----------------------------
// 🚀 ENGINE CYCLE
// -----------------------------
async function runCycle() {
  console.log("🚀 SEO WORKER CLUSTER CYCLE START");

  loadJobs();

  const batches = [];

  for (let i = 0; i < jobQueue.length; i += CONFIG.maxBatchSize) {
    batches.push(jobQueue.slice(i, i + CONFIG.maxBatchSize));
  }

  for (const batch of batches) {
    await processBatch(batch);
  }

  console.log("✅ CYCLE COMPLETE");
}

// -----------------------------
// 🔄 CONTINUOUS LOOP (SAFE)
// -----------------------------
runCycle();

// GitHub-safe scheduler (NOT infinite loop spam)
setInterval(runCycle, CONFIG.cycleInterval);
