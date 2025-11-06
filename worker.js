const { parentPort, workerData } = require('worker_threads');
const { getNthMatchCombination } = require('./permutations');
const { isValidCombination } = require('./validator');

// Worker receives a chunk of combinations to process
const {
  startIndex,
  endIndex,
  men,
  women,
  matchboxResults,
  matchingNights,
  doubleMatchMan,
  doubleMatchWoman,
  workerId
} = workerData;

let validCount = 0;
const pairFrequencies = new Map();
const progressInterval = 1000000; // Report progress every 10k combinations

// Process the assigned chunk
for (let i = startIndex; i < endIndex; i++) {
  const combination = getNthMatchCombination(men, women, i);

  if (isValidCombination(combination, matchboxResults, matchingNights, doubleMatchMan, doubleMatchWoman)) {
    validCount++;

    // Track pair frequencies
    for (const pair of combination) {
      const pairKey = `${pair.man}-${pair.woman}`;
      pairFrequencies.set(pairKey, (pairFrequencies.get(pairKey) || 0) + 1);
    }
  }

  // Send progress updates periodically
  if ((i - startIndex + 1) % progressInterval === 0) {
    parentPort.postMessage({
      type: 'progress',
      workerId,
      processed: i - startIndex + 1,
      validCount
    });
  }
}

// Convert Map to plain object for transfer
const pairFreqObject = {};
for (const [key, value] of pairFrequencies.entries()) {
  pairFreqObject[key] = value;
}

// Send final results back to main thread
parentPort.postMessage({
  type: 'complete',
  workerId,
  validCount,
  pairFrequencies: pairFreqObject,
  processed: endIndex - startIndex
});
