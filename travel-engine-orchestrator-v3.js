import fs from "fs";
import path from "path";
import os from "os";
import { Worker } from "worker_threads";

/**
 * GLOBAL TRAVEL ENGINE ORCHESTRATOR v3
 * Safe parallel batch generation system
 */

const CONFIG = {
  maxBatchSize: 50,        // sweet spot (recommended 30–50)
  maxWorkers: 4,           // parallel threads
  outputDir: "./generated-articles",
  generators: [
    "./generateSkyscannerArticles.js",
    "./generateSkyscannerArticles2.js",
    "./generateSkyscannerArticles3.js"
  ]
};

// Ensure output directory exists
if (!fs.existsSync(CONFIG.outputDir)) {
  fs.mkdirSync(CONFIG.outputDir, { recursive: true });
}

// Job queue (shared across generators)
let jobQueue = [];

// Generate fake “topics pool” from travel database or keywords
function loadTopics() {
  const countries = [
    "Japan","Italy","Spain","Thailand","Portugal",
    "Brazil","USA","Canada","Morocco","Greece",
    "Vietnam","Indonesia","France","Turkey","Mexico"
  ];

  const cities = [
    "Tokyo","Rome","Barcelona","Bangkok","Lisbon",
    "Rio de Janeiro","New York","Toronto","Marrakech","Athens",
    "Hanoi","Bali","Paris","Istanbul","Cancun"
  ];

  const topics = [];

  for (let i = 0; i < CONFIG.maxBatchSize; i++) {
    topics.push({
      id: `topic-${Date.now()}-${i}`,
      city: cities[i % cities.length],
      country: countries[i % countries.length],
      keyword: `${cities[i % cities.length]} travel guide`
    });
  }

  return topics;
}

// Worker runner (isolated execution)
function runWorker(generatorFile, topic) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(generatorFile, {
      workerData: topic
    });

    worker.on("message", (msg) => resolve(msg));
    worker.on("error", reject);
    worker.on("exit", (code) => {
      if (code !== 0) reject(new Error(`Worker stopped with ${code}`));
    });
  });
}

// Batch processor
async function processBatch(generatorFile, topics) {
  const results = [];

  for (const topic of topics) {
    try {
      const result = await runWorker(generatorFile, topic);
      results.push(result);
    } catch (err) {
      console.error(`❌ Error in ${generatorFile}:`, err.message);
    }
  }

  return results;
}

// Parallel execution controller
async function runEngine() {
  console.log("🚀 GLOBAL TRAVEL ENGINE v3 STARTING...");

  const topics = loadTopics();

  // Split into chunks for safe batching
  const chunks = [];
  for (let i = 0; i < topics.length; i += CONFIG.maxBatchSize) {
    chunks.push(topics.slice(i, i + CONFIG.maxBatchSize));
  }

  console.log(`📦 Total batches: ${chunks.length}`);

  const allPromises = [];

  for (const generator of CONFIG.generators) {
    for (const chunk of chunks) {
      allPromises.push(processBatch(generator, chunk));
    }
  }

  const results = await Promise.allSettled(allPromises);

  console.log("✅ ALL GENERATORS FINISHED");

  // Save index map (important for SEO linking)
  const indexMap = results.map((r, i) => ({
    batch: i,
    status: r.status
  }));

  fs.writeFileSync(
    path.join(CONFIG.outputDir, "index-map.json"),
    JSON.stringify(indexMap, null, 2)
  );

  console.log("📁 Index map created");
}

runEngine();
