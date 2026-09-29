import { describe, it } from 'node:test';
import assert from 'node:assert';
import {
  calculateBaseProbability,
  calculateBayesianProbability,
  calculateProbabilityDistribution,
  getTopProbabilities,
  calculateIndividualPairProbabilities,
  getImpossiblePairs,
  binomialProbability,
  factorial,
  combination
} from './probability.ts';
import type { MatchPair, MatchboxResult, MatchingNight } from './types.ts';
import type { PairProbability, ImpossiblePair } from './probability.ts';

describe('probability.ts', () => {
  describe('factorial', () => {
    it('should return 1 for 0', () => {
      assert.strictEqual(factorial(0), 1);
    });

    it('should return 1 for 1', () => {
      assert.strictEqual(factorial(1), 1);
    });

    it('should calculate factorial of 5', () => {
      assert.strictEqual(factorial(5), 120);
    });

    it('should calculate factorial of 10', () => {
      assert.strictEqual(factorial(10), 3628800);
    });
  });

  describe('combination', () => {
    it('should calculate C(5, 2)', () => {
      assert.strictEqual(combination(5, 2), 10);
    });

    it('should calculate C(10, 3)', () => {
      assert.strictEqual(combination(10, 3), 120);
    });

    it('should calculate C(n, 0)', () => {
      assert.strictEqual(combination(5, 0), 1);
    });

    it('should calculate C(n, n)', () => {
      assert.strictEqual(combination(5, 5), 1);
    });
  });

  describe('calculateBaseProbability', () => {
    it('should calculate 1/100 for 100 combinations', () => {
      assert.strictEqual(calculateBaseProbability(100), 0.01);
    });

    it('should calculate 1/1 for 1 combination', () => {
      assert.strictEqual(calculateBaseProbability(1), 1);
    });

    it('should calculate 1/1000 for 1000 combinations', () => {
      assert.strictEqual(calculateBaseProbability(1000), 0.001);
    });
  });

  describe('binomialProbability', () => {
    it('should return 1.0 when k equals expectedK', () => {
      assert.strictEqual(binomialProbability(10, 5, 5), 1.0);
    });

    it('should return lower probability when k differs from expectedK', () => {
      const prob = binomialProbability(10, 3, 5);
      assert.ok(prob < 1.0);
      assert.ok(prob >= 0.1);
    });

    it('should return at least 0.1 for any difference', () => {
      const prob = binomialProbability(10, 0, 10);
      assert.ok(prob >= 0.1);
    });

    it('should decrease as difference increases', () => {
      const prob1 = binomialProbability(10, 4, 5);
      const prob2 = binomialProbability(10, 2, 5);
      assert.ok(prob1 > prob2);
    });
  });

  describe('calculateBayesianProbability', () => {
    it('should return 0 for combination missing required match', () => {
      const combination: MatchPair[] = [
        { man: 'john', woman: 'jane' }
      ];
      const matchboxResults: MatchboxResult[] = [
        { man: 'bob', woman: 'alice', isMatch: true }
      ];
      const result = calculateBayesianProbability(combination, matchboxResults, []);
      assert.strictEqual(result, 0);
    });

    it('should return 0 for combination with forbidden pair', () => {
      const combination: MatchPair[] = [
        { man: 'john', woman: 'jane' }
      ];
      const matchboxResults: MatchboxResult[] = [
        { man: 'john', woman: 'jane', isMatch: false }
      ];
      const result = calculateBayesianProbability(combination, matchboxResults, []);
      assert.strictEqual(result, 0);
    });

    it('should return positive probability for valid combination with required match', () => {
      const combination: MatchPair[] = [
        { man: 'john', woman: 'jane' },
        { man: 'bob', woman: 'alice' }
      ];
      const matchboxResults: MatchboxResult[] = [
        { man: 'john', woman: 'jane', isMatch: true }
      ];
      const result = calculateBayesianProbability(combination, matchboxResults, []);
      assert.strictEqual(result, 1.0);
    });

    it('should return 1.0 when matching night matches perfectly', () => {
      const combination: MatchPair[] = [
        { man: 'john', woman: 'jane' },
        { man: 'bob', woman: 'alice' }
      ];
      const nights: MatchingNight[] = [
        { night: 1, man: 'john', woman: 'jane', matchCount: 2 },
        { night: 1, man: 'bob', woman: 'alice', matchCount: 2 }
      ];
      const result = calculateBayesianProbability(combination, [], nights);
      assert.strictEqual(result, 1.0);
    });

    it('should return lower probability when matching night does not match perfectly', () => {
      const combination: MatchPair[] = [
        { man: 'john', woman: 'jane' },
        { man: 'bob', woman: 'sue' }
      ];
      const nights: MatchingNight[] = [
        { night: 1, man: 'john', woman: 'jane', matchCount: 2 },
        { night: 1, man: 'bob', woman: 'alice', matchCount: 2 }
      ];
      const result = calculateBayesianProbability(combination, [], nights);
      assert.ok(result < 1.0);
      assert.ok(result > 0);
    });

    it('should combine matchbox and night probabilities', () => {
      const combination: MatchPair[] = [
        { man: 'john', woman: 'jane' },
        { man: 'bob', woman: 'alice' }
      ];
      const matchboxResults: MatchboxResult[] = [
        { man: 'john', woman: 'jane', isMatch: true }
      ];
      const nights: MatchingNight[] = [
        { night: 1, man: 'john', woman: 'jane', matchCount: 2 },
        { night: 1, man: 'bob', woman: 'alice', matchCount: 2 }
      ];
      const result = calculateBayesianProbability(combination, matchboxResults, nights);
      assert.strictEqual(result, 1.0);
    });

    it('should handle multiple matching nights', () => {
      const combination: MatchPair[] = [
        { man: 'john', woman: 'jane' },
        { man: 'bob', woman: 'alice' }
      ];
      const nights: MatchingNight[] = [
        { night: 1, man: 'john', woman: 'jane', matchCount: 1 },
        { night: 1, man: 'bob', woman: 'sue', matchCount: 1 },
        { night: 2, man: 'john', woman: 'jane', matchCount: 2 },
        { night: 2, man: 'bob', woman: 'alice', matchCount: 2 }
      ];
      const result = calculateBayesianProbability(combination, [], nights);
      assert.ok(result > 0);
    });
  });

  describe('calculateProbabilityDistribution', () => {
    it('should return distribution with valid count and frequencies', () => {
      const pairFrequencies = new Map<string, number>([
        ['john-jane', 50],
        ['bob-alice', 30]
      ]);
      const result = calculateProbabilityDistribution(100, pairFrequencies);
      assert.strictEqual(result.validCount, 100);
      assert.strictEqual(result.pairFrequencies, pairFrequencies);
    });

    it('should handle empty pair frequencies', () => {
      const pairFrequencies = new Map<string, number>();
      const result = calculateProbabilityDistribution(0, pairFrequencies);
      assert.strictEqual(result.validCount, 0);
      assert.strictEqual(result.pairFrequencies.size, 0);
    });

    it('should handle single pair', () => {
      const pairFrequencies = new Map<string, number>([
        ['john-jane', 1]
      ]);
      const result = calculateProbabilityDistribution(1, pairFrequencies);
      assert.strictEqual(result.validCount, 1);
      assert.strictEqual(result.pairFrequencies.size, 1);
    });
  });

  describe('calculateIndividualPairProbabilities', () => {
    it('should calculate probabilities correctly', () => {
      const pairFrequencies = new Map<string, number>([
        ['john-jane', 50],
        ['bob-alice', 30],
        ['tom-sue', 20]
      ]);
      const result = calculateIndividualPairProbabilities(100, pairFrequencies);

      assert.strictEqual(result.length, 3);
      assert.strictEqual(result[0].pair, 'john-jane');
      assert.strictEqual(result[0].probability, 0.5);
      assert.strictEqual(result[0].percentage, '50.00');
      assert.strictEqual(result[0].frequency, 50);
    });

    it('should sort by probability in descending order', () => {
      const pairFrequencies = new Map<string, number>([
        ['bob-alice', 30],
        ['john-jane', 50],
        ['tom-sue', 10]
      ]);
      const result = calculateIndividualPairProbabilities(100, pairFrequencies);

      assert.strictEqual(result[0].pair, 'john-jane');
      assert.strictEqual(result[1].pair, 'bob-alice');
      assert.strictEqual(result[2].pair, 'tom-sue');
      assert.ok(result[0].probability >= result[1].probability);
      assert.ok(result[1].probability >= result[2].probability);
    });

    it('should handle 100% probability', () => {
      const pairFrequencies = new Map<string, number>([
        ['john-jane', 100]
      ]);
      const result = calculateIndividualPairProbabilities(100, pairFrequencies);

      assert.strictEqual(result[0].probability, 1.0);
      assert.strictEqual(result[0].percentage, '100.00');
    });

    it('should handle empty frequencies', () => {
      const pairFrequencies = new Map<string, number>();
      const result = calculateIndividualPairProbabilities(100, pairFrequencies);

      assert.strictEqual(result.length, 0);
    });

    it('should format percentages correctly', () => {
      const pairFrequencies = new Map<string, number>([
        ['john-jane', 33]
      ]);
      const result = calculateIndividualPairProbabilities(100, pairFrequencies);

      assert.strictEqual(result[0].percentage, '33.00');
    });
  });

  describe('getImpossiblePairs', () => {
    it('should find all impossible pairs', () => {
      const men = ['john', 'bob'];
      const women = ['jane', 'alice'];
      const pairFrequencies = new Map<string, number>([
        ['john-jane', 50],
        ['bob-alice', 50]
      ]);
      const result = getImpossiblePairs(men, women, pairFrequencies);

      assert.strictEqual(result.length, 2);
      const pairs = result.map(p => p.pair).sort();
      assert.deepStrictEqual(pairs, ['bob-jane', 'john-alice']);
    });

    it('should return empty array when all pairs are possible', () => {
      const men = ['john', 'bob'];
      const women = ['jane', 'alice'];
      const pairFrequencies = new Map<string, number>([
        ['john-jane', 25],
        ['john-alice', 25],
        ['bob-jane', 25],
        ['bob-alice', 25]
      ]);
      const result = getImpossiblePairs(men, women, pairFrequencies);

      assert.strictEqual(result.length, 0);
    });

    it('should sort alphabetically by man then woman', () => {
      const men = ['bob', 'alice'];
      const women = ['zoe', 'anna'];
      const pairFrequencies = new Map<string, number>();
      const result = getImpossiblePairs(men, women, pairFrequencies);

      assert.strictEqual(result[0].man, 'alice');
      assert.strictEqual(result[0].woman, 'anna');
      assert.strictEqual(result[1].man, 'alice');
      assert.strictEqual(result[1].woman, 'zoe');
      assert.strictEqual(result[2].man, 'bob');
      assert.strictEqual(result[2].woman, 'anna');
    });

    it('should handle single man and woman', () => {
      const men = ['john'];
      const women = ['jane'];
      const pairFrequencies = new Map<string, number>();
      const result = getImpossiblePairs(men, women, pairFrequencies);

      assert.strictEqual(result.length, 1);
      assert.strictEqual(result[0].pair, 'john-jane');
    });

    it('should parse pair strings correctly', () => {
      const men = ['john'];
      const women = ['jane'];
      const pairFrequencies = new Map<string, number>();
      const result = getImpossiblePairs(men, women, pairFrequencies);

      assert.strictEqual(result[0].man, 'john');
      assert.strictEqual(result[0].woman, 'jane');
      assert.strictEqual(result[0].pair, 'john-jane');
    });
  });

  describe('getTopProbabilities', () => {
    it('should return top N results', () => {
      const results: PairProbability[] = [
        { pair: 'a', probability: 0.9, percentage: '90.00', frequency: 90 },
        { pair: 'b', probability: 0.8, percentage: '80.00', frequency: 80 },
        { pair: 'c', probability: 0.7, percentage: '70.00', frequency: 70 },
        { pair: 'd', probability: 0.6, percentage: '60.00', frequency: 60 }
      ];
      const top2 = getTopProbabilities(results, 2);

      assert.strictEqual(top2.length, 2);
      assert.strictEqual(top2[0].pair, 'a');
      assert.strictEqual(top2[1].pair, 'b');
    });

    it('should default to top 10', () => {
      const results: PairProbability[] = Array.from({ length: 20 }, (_, i) => ({
        pair: `pair${i}`,
        probability: 1 - i * 0.01,
        percentage: `${100 - i}`,
        frequency: 100 - i
      }));
      const top = getTopProbabilities(results);

      assert.strictEqual(top.length, 10);
    });

    it('should return all results if fewer than N', () => {
      const results: PairProbability[] = [
        { pair: 'a', probability: 0.9, percentage: '90.00', frequency: 90 },
        { pair: 'b', probability: 0.8, percentage: '80.00', frequency: 80 }
      ];
      const top5 = getTopProbabilities(results, 5);

      assert.strictEqual(top5.length, 2);
    });

    it('should handle empty array', () => {
      const results: PairProbability[] = [];
      const top = getTopProbabilities(results, 10);

      assert.strictEqual(top.length, 0);
    });

    it('should not modify original array', () => {
      const results: PairProbability[] = [
        { pair: 'a', probability: 0.9, percentage: '90.00', frequency: 90 },
        { pair: 'b', probability: 0.8, percentage: '80.00', frequency: 80 },
        { pair: 'c', probability: 0.7, percentage: '70.00', frequency: 70 }
      ];
      const originalLength = results.length;
      getTopProbabilities(results, 2);

      assert.strictEqual(results.length, originalLength);
    });
  });
});
