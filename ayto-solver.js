#!/usr/bin/env node

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
    this.validCombinations = [];
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
    this.validCombinations = [];

    const total = this.totalCombinations;
    let validCount = 0;

    // Process in batches to show progress
    const batchSize = 100000;
    for (let i = 0; i < total; i++) {
      const combination = getNthMatchCombination(this.men, this.women, i);

      if (isValidCombination(combination, this.matchboxResults, this.matchingNights, this.doubleMatchMan, this.doubleMatchWoman)) {
        this.validCombinations.push(combination);
        validCount++;
      }

      // Show progress every batch
      if ((i + 1) % batchSize === 0 || i === total - 1) {
        const progress = ((i + 1) / total * 100).toFixed(1);
        console.log(`  Progress: ${progress}% (${(i + 1).toLocaleString()}/${total.toLocaleString()}) - ${validCount.toLocaleString()} valid so far`);
      }
    }

    console.log(`${this.validCombinations.length} combinations remain after filtering`);

    if (this.validCombinations.length === 0) {
      console.log('⚠️  No valid combinations found. Check your constraint data for conflicts.');
      return false;
    }
    return true;
  }

  calculateProbabilities() {
    console.log('Calculating probability distribution...');
    this.probabilityResults = calculateProbabilityDistribution(
      this.validCombinations,
      this.matchboxResults,
      this.matchingNights
    );
  }

  displayResults(topN = 20) {
    console.log('\n' + '='.repeat(80));
    console.log('🎯 AYTO SOLVER RESULTS');
    console.log('='.repeat(80));

    if (this.validCombinations.length === 0) {
      console.log('❌ No valid combinations found.');
      return;
    }

    console.log(`\n📊 SUMMARY:`);
    console.log(`   Total possible combinations: ${this.totalCombinations.toLocaleString()}`);
    console.log(`   Valid combinations: ${this.validCombinations.length}`);
    console.log(`   Elimination rate: ${((1 - this.validCombinations.length / this.totalCombinations) * 100).toFixed(1)}%`);

    const topResults = getTopProbabilities(this.probabilityResults, topN);

    console.log(`\n🏆 ALL VALID PERFECT MATCH COMBINATIONS (showing up to ${topN}):`);
    console.log('-'.repeat(80));

    topResults.forEach((result, index) => {
      console.log(`\n${index + 1}. PROBABILITY: ${result.percentage}%`);
      console.log('   Matches:');
      result.combination.forEach(pair => {
        console.log(`   • ${pair.man} ↔ ${pair.woman}`);
      });
    });

    // Display individual pair probabilities
    console.log('\n💝 INDIVIDUAL PAIR PROBABILITIES:');
    console.log('-'.repeat(80));
    const pairProbabilities = calculateIndividualPairProbabilities(this.probabilityResults);

    pairProbabilities.slice(0, 20).forEach((pair, index) => {
      const [man, woman] = pair.pair.split('-');
      console.log(`${(index + 1).toString().padStart(2)}. ${man} ↔ ${woman}: ${pair.percentage}%`);
    });

    // Display impossible pairs (0% probability)
    const impossiblePairs = getImpossiblePairs(this.men, this.women, this.probabilityResults);

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

  solve(options = {}) {
    const { displayTop = 20, showIndividualPairs = true } = options;

    console.log('🔍 Starting AYTO Solver...\n');

    this.generateAllCombinations();

    if (!this.filterValidCombinations()) {
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
function main() {
  const solver = new AYTOSolver(menCandidates, womenCandidates, matchboxResults, matchingNights, doubleMatchMan, doubleMatchWoman);

  // Check for command line arguments
  const args = process.argv.slice(2);
  const topN = args.includes('--top') ? parseInt(args[args.indexOf('--top') + 1]) || 20 : 20;

  solver.solve({ displayTop: topN });
}

// Export for potential use as a module
module.exports = AYTOSolver;

// Run if called directly
if (require.main === module) {
  main();
}