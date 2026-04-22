export const ENGINE_CONFIG = {
  outputDir: "./pages",

  // prevents infinite spider expansion
  maxDepth: 3,
  maxLinksPerPage: 6,

  // prevents duplicate generation loops
  dedupeByCity: true,

  // safe generation mode (IMPORTANT for GitHub Actions)
  safeMode: true
};
