import fs from "fs";

const LOCK_FILE = "./seo.lock";

export function acquireLock() {
  if (fs.existsSync(LOCK_FILE)) {
    console.log("⛔ Run skipped (already running)");
    process.exit(0);
  }
  fs.writeFileSync(LOCK_FILE, Date.now().toString());
}

export function releaseLock() {
  if (fs.existsSync(LOCK_FILE)) {
    fs.unlinkSync(LOCK_FILE);
  }
}
