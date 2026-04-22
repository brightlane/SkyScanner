import fs from "fs";

const dirs = ["./pages", "./dist", "./"];

for (const dir of dirs) {
  if (!fs.existsSync(dir)) {
    console.log("Creating missing directory:", dir);
    fs.mkdirSync(dir, { recursive: true });
  }
}

console.log("✅ Output directories verified");
