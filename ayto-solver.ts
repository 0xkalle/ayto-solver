#!/usr/bin/env node

import { Worker } from 'worker_threads';
import { availableParallelism } from 'os';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import type { SeasonData } from './types.ts';
import { getTotalCombinations } from './permutations.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));

export interface PairResult {
  man: string;
  woman: string;
  count: number;
  probability: number;
}

export interface Result {
  totalCombinations: number;
  validCombinations: number;
  pairs: PairResult[];
}

type WorkerMessage =
  | { type: 'progress'; workerId: number; processed: number; validCount: number }
  | { type: 'complete'; workerId: number; validCount: number; pairFrequencies: Record<string, number>; processed: number };

export function solve(data: SeasonData, onProgress?: (fraction: number) => void): Promise<Result> {
  const total = getTotalCombinations(data.men, data.women);
  const numWorkers = availableParallelism();
  const chunkSize = Math.ceil(total / numWorkers);
  const workerProgress = new Array(numWorkers).fill(0);
  const pairFrequencies = new Map<string, number>();
  let validCombinations = 0;

  return new Promise((resolve, reject) => {
    let completedWorkers = 0;
    const workers: Worker[] = [];

    for (let workerId = 0; workerId < numWorkers; workerId++) {
      const startIndex = workerId * chunkSize;
      const endIndex = Math.min(startIndex + chunkSize, total);

      const worker = new Worker(join(__dirname, 'worker.ts'), {
        workerData: { ...data, startIndex, endIndex, workerId }
      });
      workers.push(worker);

      worker.on('message', (message: WorkerMessage) => {
        workerProgress[message.workerId] = message.processed;
        onProgress?.(Math.min(1, workerProgress.reduce((a, b) => a + b, 0) / total));
        if (message.type !== 'complete') return;

        validCombinations += message.validCount;
        for (const [pairKey, frequency] of Object.entries(message.pairFrequencies)) {
          pairFrequencies.set(pairKey, (pairFrequencies.get(pairKey) || 0) + frequency);
        }

        if (++completedWorkers === numWorkers) {
          const pairs = data.men.flatMap(man => data.women.map(woman => {
            const count = pairFrequencies.get(`${man}-${woman}`) || 0;
            return { man, woman, count, probability: validCombinations ? count / validCombinations : 0 };
          }));
          pairs.sort((a, b) => b.probability - a.probability);
          resolve({ totalCombinations: total, validCombinations, pairs });
        }
      });

      worker.on('error', (error) => {
        workers.forEach(w => w.terminate());
        reject(error);
      });
    }
  });
}

async function main(): Promise<void> {
  const file = process.argv[2] || join(__dirname, 'seasons/current.json');
  const data: SeasonData = JSON.parse(readFileSync(file, 'utf8'));

  console.log(`🔍 Solving ${file}...`);
  let lastPct = -1;
  const result = await solve(data, fraction => {
    const pct = Math.floor(fraction * 10) * 10;
    if (pct > lastPct) console.log(`  Progress: ${(lastPct = pct)}%`);
  });

  console.log(`\n📊 SUMMARY:`);
  console.log(`   Total possible combinations: ${result.totalCombinations.toLocaleString()}`);
  console.log(`   Valid combinations: ${result.validCombinations.toLocaleString()}`);

  if (result.validCombinations === 0) {
    console.log('⚠️  No valid combinations found. Check your constraint data for conflicts.');
    return;
  }

  const possible = result.pairs.filter(p => p.count > 0);
  const impossible = result.pairs.filter(p => p.count === 0);

  console.log('\n💝 INDIVIDUAL PAIR PROBABILITIES:');
  possible.forEach((p, i) => {
    console.log(`${(i + 1).toString().padStart(2)}. ${p.man} ↔ ${p.woman}: ${(p.probability * 100).toFixed(2)}%`);
  });

  console.log(`\n❌ IMPOSSIBLE PAIRS (${impossible.length}):`);
  impossible.forEach(p => console.log(`   ${p.man} ↔ ${p.woman}`));
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
