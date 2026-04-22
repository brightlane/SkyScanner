export const BATCH_CONFIG = {
  minBatchSize: 30,
  maxBatchSize: 100,
  defaultBatchSize: 40, // sweet spot

  // optional safety toggle
  enforceLimits: true
};

// clamps any requested batch size into safe range
export function getSafeBatchSize(requestedSize) {
  if (!BATCH_CONFIG.enforceLimits) return requestedSize;

  if (requestedSize < BATCH_CONFIG.minBatchSize) {
    return BATCH_CONFIG.minBatchSize;
  }

  if (requestedSize > BATCH_CONFIG.maxBatchSize) {
    return BATCH_CONFIG.maxBatchSize;
  }

  return requestedSize;
}
