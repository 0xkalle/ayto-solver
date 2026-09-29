import { parentPort, workerData } from 'worker_threads';
import { getNthMatchCombination } from './permutations.ts';
import { isValidCombination } from './validator.ts';
import type { MatchingNight, MatchboxResult } from './types.ts';

interface WorkerData {
  startIndex: number;
  endIndex: number;
  men: string[];
  women: string[];
  matchboxResults: MatchboxResult[];
  matchingNights: MatchingNight[];
  doubleMatchMan: string | string[] | string[][] | null;
  doubleMatchWoman: string | string[] | string[][] | null;
  excludedMen: string[] | null;
  excludedWomen: string[] | null;
  workerId: number;
}

interface ProgressMessage {
  type: 'progress';
  workerId: number;
  processed: number;
  validCount: number;
}

interface CompleteMessage {
  type: 'complete';
  workerId: number;
  validCount: number;
  pairFrequencies: Record<string, number>;
  processed: number;
}

type WorkerMessage = ProgressMessage | CompleteMessage;

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
  excludedMen,
  excludedWomen,
  workerId
} = workerData as WorkerData;

let validCount = 0;
const pairFrequencies = new Map<string, number>();
const progressInterval = 1000000; // Report progress every 1M combinations

// Process the assigned chunk
for (let i = startIndex; i < endIndex; i++) {
  const combination = getNthMatchCombination(men, women, i);

  if (isValidCombination(combination, matchboxResults, matchingNights, doubleMatchMan, doubleMatchWoman, excludedMen, excludedWomen)) {
    validCount++;

    // Track pair frequencies
    for (const pair of combination) {
      const pairKey = `${pair.man}-${pair.woman}`;
      pairFrequencies.set(pairKey, (pairFrequencies.get(pairKey) || 0) + 1);
    }
  }

  // Send progress updates periodically
  if ((i - startIndex + 1) % progressInterval === 0) {
    parentPort?.postMessage({
      type: 'progress',
      workerId,
      processed: i - startIndex + 1,
      validCount
    } as ProgressMessage);
  }
}

// Convert Map to plain object for transfer
const pairFreqObject: Record<string, number> = {};
for (const [key, value] of pairFrequencies.entries()) {
  pairFreqObject[key] = value;
}

// Send final results back to main thread
parentPort?.postMessage({
  type: 'complete',
  workerId,
  validCount,
  pairFrequencies: pairFreqObject,
  processed: endIndex - startIndex
} as CompleteMessage);
