#!/usr/bin/env node

const { Worker } = require('worker_threads');
const os = require('os');
const { menCandidates, womenCandidates, matchboxResults, matchingNights, doubleMatchMan, doubleMatchWoman } = require('./data');
const { generateMatchCombinations, combinationToString, getTotalCombinations, getNthMatchCombination } = require('./permutations');
const { isValidCombination, getValidationScore } = require('./validator');
const {
  calculateProbabilityDistribution,
  getTopProbabilities,
  calculateIndividualPairProbabilities,
  getImpossiblePairs
} = require('./probability');

class AYTOSolver {
  constructor(men, women, matchboxResults, matchingNights, doubleMatchMan, doubleMatchWoman) {
    this.men = men;
    this.women = women;
    this.matchboxResults = matchboxResults;
    this.matchingNights = matchingNights;
    this.doubleMatchMan = doubleMatchMan;
    this.doubleMatchWoman = doubleMatchWoman;
    this.allCombinations = [];
    this.validCombinationsCount = 0;
    this.pairFrequencies = new Map(); // Stores frequency of each pair across valid combinations
    this.probabilityResults = [];
  }

  generateAllCombinations() {
    console.log('Generating all possible match combinations...');
    const total = getTotalCombinations(this.men, this.women);
    console.log(`Total combinations: ${total.toLocaleString()}`);
    this.totalCombinations = total;
    this.allCombinations = []; // Will be populated on-demand
  }

  filterValidCombinations() {
    console.log('Filtering combinations based on known constraints...');
    console.log('Building pair frequency map (multi-threaded mode)...');

    this.validCombinationsCount = 0;
    this.pairFrequencies.clear();

    const total = this.totalCombinations;
    const numWorkers = 8; // Use 4 cores as requested

    // Split work into chunks for each worker
    const chunkSize = Math.ceil(total / numWorkers);
    const workers = [];
    const workerProgress = new Array(numWorkers).fill(0);
    const workerValidCounts = new Array(numWorkers).fill(0);

    console.log(`Spawning ${numWorkers} workers to process ${total.toLocaleString()} combinations...`);

    return new Promise((resolve, reject) => {
      let completedWorkers = 0;

      for (let workerId = 0; workerId < numWorkers; workerId++) {
        const startIndex = workerId * chunkSize;
        const endIndex = Math.min(startIndex + chunkSize, total);

        const worker = new Worker('./worker.js', {
          workerData: {
            startIndex,
            endIndex,
            men: this.men,
            women: this.women,
            matchboxResults: this.matchboxResults,
            matchingNights: this.matchingNights,
            doubleMatchMan: this.doubleMatchMan,
            doubleMatchWoman: this.doubleMatchWoman,
            workerId
          }
        });

        worker.on('message', (message) => {
          if (message.type === 'progress') {
            workerProgress[message.workerId] = message.processed;
            workerValidCounts[message.workerId] = message.validCount;

            // Calculate total progress
            const totalProcessed = workerProgress.reduce((a, b) => a + b, 0);
            const totalValid = workerValidCounts.reduce((a, b) => a + b, 0);
            const progress = (totalProcessed / total * 100).toFixed(1);
            console.log(`  Progress: ${progress}% (${totalProcessed.toLocaleString()}/${total.toLocaleString()}) - ${totalValid.toLocaleString()} valid so far`);
          } else if (message.type === 'complete') {
            // Merge results from this worker
            this.validCombinationsCount += message.validCount;

            for (const [pairKey, frequency] of Object.entries(message.pairFrequencies)) {
              this.pairFrequencies.set(pairKey, (this.pairFrequencies.get(pairKey) || 0) + frequency);
            }

            completedWorkers++;
            console.log(`  Worker ${message.workerId} completed: ${message.validCount.toLocaleString()} valid combinations found`);

            if (completedWorkers === numWorkers) {
              console.log(`${this.validCombinationsCount.toLocaleString()} combinations remain after filtering`);

              if (this.validCombinationsCount === 0) {
                console.log('⚠️  No valid combinations found. Check your constraint data for conflicts.');
                resolve(false);
              } else {
                resolve(true);
              }
            }
          }
        });

        worker.on('error', (error) => {
          console.error(`Worker ${workerId} error:`, error);
          reject(error);
        });

        worker.on('exit', (code) => {
          if (code !== 0) {
            console.error(`Worker ${workerId} stopped with exit code ${code}`);
          }
        });

        workers.push(worker);
      }
    });
  }

  calculateProbabilities() {
    console.log('Calculating probability distribution...');
    // Since all valid combinations are equally likely in AYTO,
    // we only need the pair frequencies we already collected
    this.probabilityResults = calculateProbabilityDistribution(
      this.validCombinationsCount,
      this.pairFrequencies
    );
  }

  displayResults(topN = 20) {
    console.log('\n' + '='.repeat(80));
    console.log('🎯 AYTO SOLVER RESULTS');
    console.log('='.repeat(80));

    if (this.validCombinationsCount === 0) {
      console.log('❌ No valid combinations found.');
      return;
    }

    console.log(`\n📊 SUMMARY:`);
    console.log(`   Total possible combinations: ${this.totalCombinations.toLocaleString()}`);
    console.log(`   Valid combinations: ${this.validCombinationsCount.toLocaleString()}`);
    console.log(`   Elimination rate: ${((1 - this.validCombinationsCount / this.totalCombinations) * 100).toFixed(1)}%`);

    // Note: With equal probability for all valid combinations,
    // showing specific combinations is less useful than showing pair probabilities
    console.log(`\n💡 NOTE: All ${this.validCombinationsCount.toLocaleString()} valid combinations are equally likely.`);
    console.log(`   Each has a probability of ${(100 / this.validCombinationsCount).toFixed(4)}%`);

    // Display individual pair probabilities
    console.log('\n💝 INDIVIDUAL PAIR PROBABILITIES:');
    console.log('-'.repeat(80));
    const pairProbabilities = calculateIndividualPairProbabilities(this.validCombinationsCount, this.pairFrequencies);

    pairProbabilities.forEach((pair, index) => {
      const [man, woman] = pair.pair.split('-');
      console.log(`${(index + 1).toString().padStart(2)}. ${man} ↔ ${woman}: ${pair.percentage}%`);
    });

    // Display impossible pairs (0% probability)
    const impossiblePairs = getImpossiblePairs(this.men, this.women, this.pairFrequencies);

    if (impossiblePairs.length > 0) {
      console.log('\n❌ IMPOSSIBLE PAIRS (0% PROBABILITY):');
      console.log('-'.repeat(80));
      console.log(`Found ${impossiblePairs.length} impossible pairs that can be ruled out:\n`);

      impossiblePairs.forEach((pair, index) => {
        console.log(`${(index + 1).toString().padStart(2)}. ${pair.man} ↔ ${pair.woman}`);
      });
    }

    // Show constraints used
    console.log('\n📋 CONSTRAINTS APPLIED:');
    console.log('-'.repeat(80));
    console.log(`Matchbox Results: ${this.matchboxResults.length} confirmed outcomes`);
    this.matchboxResults.forEach(result => {
      const status = result.isMatch ? '✅ MATCH' : '❌ NO MATCH';
      console.log(`   • ${result.man} + ${result.woman}: ${status}`);
    });

    const nightNumbers = [...new Set(this.matchingNights.map(n => n.night))];
    console.log(`\nMatching Nights: ${nightNumbers.length} nights of data`);
    nightNumbers.forEach(night => {
      const nightData = this.matchingNights.filter(n => n.night === night);
      const matchCount = nightData[0]?.matchCount || 0;
      console.log(`   • Night ${night}: ${matchCount} matches`);
    });
  }

  async solve(options = {}) {
    const { displayTop = 20, showIndividualPairs = true } = options;

    console.log('🔍 Starting AYTO Solver...\n');

    this.generateAllCombinations();

    const hasValidCombinations = await this.filterValidCombinations();
    if (!hasValidCombinations) {
      return;
    }

    this.calculateProbabilities();
    this.displayResults(displayTop);

    console.log('\n✨ Analysis complete!');
  }

  // Method to add new constraint data
  addMatchboxResult(man, woman, isMatch) {
    this.matchboxResults.push({ man, woman, isMatch });
    console.log(`Added matchbox result: ${man} + ${woman} = ${isMatch ? 'MATCH' : 'NO MATCH'}`);
  }

  addMatchingNight(night, pairs, matchCount) {
    pairs.forEach(pair => {
      this.matchingNights.push({
        night,
        man: pair.man,
        woman: pair.woman,
        matchCount
      });
    });
    console.log(`Added matching night ${night} with ${matchCount} matches`);
  }
}

// Main execution
async function main() {
  const solver = new AYTOSolver(menCandidates, womenCandidates, matchboxResults, matchingNights, doubleMatchMan, doubleMatchWoman);

  // Check for command line arguments
  const args = process.argv.slice(2);
  const topN = args.includes('--top') ? parseInt(args[args.indexOf('--top') + 1]) || 20 : 20;

  await solver.solve({ displayTop: topN });
}

// Export for potential use as a module
module.exports = AYTOSolver;

// Run if called directly
if (require.main === module) {
  main();
}