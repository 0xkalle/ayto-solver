import { describe, it } from 'node:test';
import assert from 'node:assert';
import {
  generatePermutations,
  generateMatchCombinations,
  combinationToString,
  combinationFromPairs,
  getTotalCombinations,
  getNthMatchCombination,
  factorial,
  binomial
} from './permutations.ts';
import type { MatchPair } from './data.ts';

describe('permutations.ts', () => {
  describe('factorial', () => {
    it('should return 1 for 0', () => {
      assert.strictEqual(factorial(0), 1);
    });

    it('should return 1 for 1', () => {
      assert.strictEqual(factorial(1), 1);
    });

    it('should calculate factorial for small numbers', () => {
      assert.strictEqual(factorial(2), 2);
      assert.strictEqual(factorial(3), 6);
      assert.strictEqual(factorial(4), 24);
      assert.strictEqual(factorial(5), 120);
    });

    it('should calculate factorial for larger numbers', () => {
      assert.strictEqual(factorial(6), 720);
      assert.strictEqual(factorial(7), 5040);
      assert.strictEqual(factorial(10), 3628800);
    });
  });

  describe('binomial', () => {
    it('should return 0 when k > n', () => {
      assert.strictEqual(binomial(3, 5), 0);
    });

    it('should return 1 when k = 0', () => {
      assert.strictEqual(binomial(5, 0), 1);
      assert.strictEqual(binomial(10, 0), 1);
    });

    it('should return 1 when k = n', () => {
      assert.strictEqual(binomial(5, 5), 1);
      assert.strictEqual(binomial(10, 10), 1);
    });

    it('should calculate C(n, 1) = n', () => {
      assert.strictEqual(binomial(5, 1), 5);
      assert.strictEqual(binomial(10, 1), 10);
    });

    it('should calculate C(n, 2) correctly', () => {
      assert.strictEqual(binomial(4, 2), 6);
      assert.strictEqual(binomial(5, 2), 10);
      assert.strictEqual(binomial(10, 2), 45);
    });

    it('should calculate standard binomial coefficients', () => {
      assert.strictEqual(binomial(6, 3), 20);
      assert.strictEqual(binomial(8, 3), 56);
      assert.strictEqual(binomial(10, 5), 252);
    });
  });

  describe('generatePermutations', () => {
    it('should return single permutation for empty array', () => {
      const result = generatePermutations([]);
      assert.strictEqual(result.length, 1);
      assert.deepStrictEqual(result[0], []);
    });

    it('should return single permutation for single element', () => {
      const result = generatePermutations(['a']);
      assert.strictEqual(result.length, 1);
      assert.deepStrictEqual(result[0], ['a']);
    });

    it('should generate all permutations for 2 elements', () => {
      const result = generatePermutations(['a', 'b']);
      assert.strictEqual(result.length, 2);
      assert.deepStrictEqual(result, [
        ['a', 'b'],
        ['b', 'a']
      ]);
    });

    it('should generate all permutations for 3 elements', () => {
      const result = generatePermutations(['a', 'b', 'c']);
      assert.strictEqual(result.length, 6);
      // Check that all elements are unique
      const stringified = result.map(p => JSON.stringify(p));
      const unique = new Set(stringified);
      assert.strictEqual(unique.size, 6);
    });

    it('should generate correct number of permutations', () => {
      const arr4 = ['a', 'b', 'c', 'd'];
      const result4 = generatePermutations(arr4);
      assert.strictEqual(result4.length, 24); // 4!

      const arr5 = ['a', 'b', 'c', 'd', 'e'];
      const result5 = generatePermutations(arr5);
      assert.strictEqual(result5.length, 120); // 5!
    });
  });

  describe('getTotalCombinations', () => {
    it('should return n! for equal-sized groups', () => {
      const men = ['m1', 'm2', 'm3'];
      const women = ['w1', 'w2', 'w3'];
      assert.strictEqual(getTotalCombinations(men, women), 6); // 3!
    });

    it('should return correct count for larger equal groups', () => {
      const men = ['m1', 'm2', 'm3', 'm4'];
      const women = ['w1', 'w2', 'w3', 'w4'];
      assert.strictEqual(getTotalCombinations(men, women), 24); // 4!
    });

    it('should handle single double match (difference = 1)', () => {
      const men = ['m1', 'm2', 'm3'];
      const women = ['w1', 'w2'];
      // Formula: smallerLength × C(largerLength, 2) × (smallerLength - 1)!
      // = 2 × C(3, 2) × 1!
      // = 2 × 3 × 1 = 6
      assert.strictEqual(getTotalCombinations(men, women), 6);
    });

    it('should handle single double match with larger groups', () => {
      const men = ['m1', 'm2', 'm3', 'm4'];
      const women = ['w1', 'w2', 'w3'];
      // = 3 × C(4, 2) × 2!
      // = 3 × 6 × 2 = 36
      assert.strictEqual(getTotalCombinations(men, women), 36);
    });

    it('should handle multiple double matches (difference = 2)', () => {
      const men = ['m1', 'm2', 'm3', 'm4'];
      const women = ['w1', 'w2'];
      // C(2, 2) × C(4, 2) × C(2, 2) × 0!
      // = 1 × 6 × 1 × 1 = 6
      assert.strictEqual(getTotalCombinations(men, women), 6);
    });

    it('should handle multiple double matches with larger difference', () => {
      const men = ['m1', 'm2', 'm3', 'm4', 'm5', 'm6'];
      const women = ['w1', 'w2', 'w3'];
      // difference = 3, need 3 double matches
      // C(3, 3) × [C(6,2) × C(4,2) × C(2,2)] × 0!
      // = 1 × [15 × 6 × 1] × 1 = 90
      assert.strictEqual(getTotalCombinations(men, women), 90);
    });

    it('should be symmetric (men vs women can be swapped)', () => {
      const men = ['m1', 'm2', 'm3', 'm4'];
      const women = ['w1', 'w2', 'w3'];
      const result1 = getTotalCombinations(men, women);
      const result2 = getTotalCombinations(women, men);
      assert.strictEqual(result1, result2);
    });
  });

  describe('getNthMatchCombination - equal groups', () => {
    it('should generate first combination', () => {
      const men = ['m1', 'm2'];
      const women = ['w1', 'w2'];
      const result = getNthMatchCombination(men, women, 0);
      assert.deepStrictEqual(result, [
        { man: 'm1', woman: 'w1' },
        { man: 'm2', woman: 'w2' }
      ]);
    });

    it('should generate last combination', () => {
      const men = ['m1', 'm2'];
      const women = ['w1', 'w2'];
      const result = getNthMatchCombination(men, women, 1);
      assert.deepStrictEqual(result, [
        { man: 'm1', woman: 'w2' },
        { man: 'm2', woman: 'w1' }
      ]);
    });

    it('should generate all unique combinations for 3x3', () => {
      const men = ['m1', 'm2', 'm3'];
      const women = ['w1', 'w2', 'w3'];
      const combinations: string[] = [];

      for (let i = 0; i < 6; i++) {
        const combo = getNthMatchCombination(men, women, i);
        const str = combinationToString(combo);
        combinations.push(str);
      }

      const unique = new Set(combinations);
      assert.strictEqual(unique.size, 6);
    });

    it('should generate correct length for each combination', () => {
      const men = ['m1', 'm2', 'm3'];
      const women = ['w1', 'w2', 'w3'];

      for (let i = 0; i < 6; i++) {
        const combo = getNthMatchCombination(men, women, i);
        assert.strictEqual(combo.length, 3);
      }
    });
  });

  describe('getNthMatchCombination - single double match', () => {
    it('should generate valid combinations with one person appearing twice', () => {
      const men = ['m1', 'm2', 'm3'];
      const women = ['w1', 'w2'];
      const total = getTotalCombinations(men, women);

      for (let i = 0; i < total; i++) {
        const combo = getNthMatchCombination(men, women, i);
        assert.strictEqual(combo.length, 3); // 3 pairs total

        // Count occurrences of each woman
        const womenCounts = new Map<string, number>();
        combo.forEach(pair => {
          womenCounts.set(pair.woman, (womenCounts.get(pair.woman) || 0) + 1);
        });

        // One woman should appear twice, one should appear once
        const counts = Array.from(womenCounts.values()).sort();
        assert.deepStrictEqual(counts, [1, 2]);
      }
    });

    it('should generate all unique combinations for single double match', () => {
      const men = ['m1', 'm2', 'm3'];
      const women = ['w1', 'w2'];
      const total = getTotalCombinations(men, women);
      const combinations: string[] = [];

      for (let i = 0; i < total; i++) {
        const combo = getNthMatchCombination(men, women, i);
        const str = combinationToString(combo);
        combinations.push(str);
      }

      const unique = new Set(combinations);
      assert.strictEqual(unique.size, total);
    });

    it('should work with women being the larger group', () => {
      const men = ['m1', 'm2'];
      const women = ['w1', 'w2', 'w3'];
      const total = getTotalCombinations(men, women);

      for (let i = 0; i < total; i++) {
        const combo = getNthMatchCombination(men, women, i);
        assert.strictEqual(combo.length, 3); // 3 pairs total

        // Count occurrences of each man
        const menCounts = new Map<string, number>();
        combo.forEach(pair => {
          menCounts.set(pair.man, (menCounts.get(pair.man) || 0) + 1);
        });

        // One man should appear twice, one should appear once
        const counts = Array.from(menCounts.values()).sort();
        assert.deepStrictEqual(counts, [1, 2]);
      }
    });
  });

  describe('getNthMatchCombination - multiple double matches', () => {
    it('should generate valid combinations with multiple people appearing twice', () => {
      const men = ['m1', 'm2', 'm3', 'm4'];
      const women = ['w1', 'w2'];
      const total = getTotalCombinations(men, women);

      for (let i = 0; i < total; i++) {
        const combo = getNthMatchCombination(men, women, i);
        assert.strictEqual(combo.length, 4); // 4 pairs total

        // Count occurrences of each woman
        const womenCounts = new Map<string, number>();
        combo.forEach(pair => {
          womenCounts.set(pair.woman, (womenCounts.get(pair.woman) || 0) + 1);
        });

        // Each woman should appear exactly twice (difference = 2)
        const counts = Array.from(womenCounts.values()).sort();
        assert.deepStrictEqual(counts, [2, 2]);
      }
    });

    it('should generate all unique combinations for multiple double matches', () => {
      const men = ['m1', 'm2', 'm3', 'm4'];
      const women = ['w1', 'w2'];
      const total = getTotalCombinations(men, women);
      const combinations: string[] = [];

      for (let i = 0; i < total; i++) {
        const combo = getNthMatchCombination(men, women, i);
        const str = combinationToString(combo);
        combinations.push(str);
      }

      const unique = new Set(combinations);
      assert.strictEqual(unique.size, total);
    });

    it('should handle larger difference (3 double matches)', () => {
      const men = ['m1', 'm2', 'm3', 'm4', 'm5', 'm6'];
      const women = ['w1', 'w2', 'w3'];
      const total = getTotalCombinations(men, women);

      for (let i = 0; i < total; i++) {
        const combo = getNthMatchCombination(men, women, i);
        assert.strictEqual(combo.length, 6); // 6 pairs total

        // Count occurrences of each woman
        const womenCounts = new Map<string, number>();
        combo.forEach(pair => {
          womenCounts.set(pair.woman, (womenCounts.get(pair.woman) || 0) + 1);
        });

        // Each woman should appear exactly twice
        const counts = Array.from(womenCounts.values()).sort();
        assert.deepStrictEqual(counts, [2, 2, 2]);
      }
    });
  });

  describe('generateMatchCombinations', () => {
    it('should generate all combinations for small equal groups', () => {
      const men = ['m1', 'm2'];
      const women = ['w1', 'w2'];
      const result = generateMatchCombinations(men, women);

      assert.strictEqual(result.length, 2);
      const strings = result.map(combinationToString);
      const unique = new Set(strings);
      assert.strictEqual(unique.size, 2);
    });

    it('should generate all combinations for single double match', () => {
      const men = ['m1', 'm2', 'm3'];
      const women = ['w1', 'w2'];
      const result = generateMatchCombinations(men, women);

      const expected = getTotalCombinations(men, women);
      assert.strictEqual(result.length, expected);

      // Verify uniqueness
      const strings = result.map(combinationToString);
      const unique = new Set(strings);
      assert.strictEqual(unique.size, expected);
    });

    it('should generate all combinations that match getNthMatchCombination', () => {
      const men = ['m1', 'm2', 'm3'];
      const women = ['w1', 'w2', 'w3'];
      const fromGenerate = generateMatchCombinations(men, women);
      const fromNth: MatchPair[][] = [];

      for (let i = 0; i < 6; i++) {
        fromNth.push(getNthMatchCombination(men, women, i));
      }

      // Compare as strings to ignore order
      const stringsGenerate = fromGenerate.map(combinationToString).sort();
      const stringsNth = fromNth.map(combinationToString).sort();

      assert.deepStrictEqual(stringsGenerate, stringsNth);
    });
  });

  describe('combinationToString', () => {
    it('should format combination as sorted string', () => {
      const combo: MatchPair[] = [
        { man: 'm2', woman: 'w2' },
        { man: 'm1', woman: 'w1' }
      ];
      const result = combinationToString(combo);
      assert.strictEqual(result, 'm1-w1, m2-w2');
    });

    it('should handle single pair', () => {
      const combo: MatchPair[] = [
        { man: 'm1', woman: 'w1' }
      ];
      const result = combinationToString(combo);
      assert.strictEqual(result, 'm1-w1');
    });

    it('should handle empty combination', () => {
      const combo: MatchPair[] = [];
      const result = combinationToString(combo);
      assert.strictEqual(result, '');
    });

    it('should sort pairs alphabetically', () => {
      const combo: MatchPair[] = [
        { man: 'zebra', woman: 'alice' },
        { man: 'bob', woman: 'zara' },
        { man: 'alice', woman: 'bob' }
      ];
      const result = combinationToString(combo);
      assert.strictEqual(result, 'alice-bob, bob-zara, zebra-alice');
    });
  });

  describe('combinationFromPairs', () => {
    it('should create combination from pairs', () => {
      const pairs: MatchPair[] = [
        { man: 'm1', woman: 'w1' },
        { man: 'm2', woman: 'w2' }
      ];
      const result = combinationFromPairs(pairs);
      assert.deepStrictEqual(result, pairs);
    });

    it('should create deep copy', () => {
      const pairs: MatchPair[] = [
        { man: 'm1', woman: 'w1' }
      ];
      const result = combinationFromPairs(pairs);
      result[0].man = 'modified';
      assert.strictEqual(pairs[0].man, 'm1'); // Original should be unchanged
    });

    it('should handle empty array', () => {
      const result = combinationFromPairs([]);
      assert.deepStrictEqual(result, []);
    });
  });

  describe('Integration tests', () => {
    it('should generate all unique combinations and verify uniqueness', () => {
      const men = ['m1', 'm2', 'm3', 'm4'];
      const women = ['w1', 'w2', 'w3', 'w4'];
      const total = getTotalCombinations(men, women);
      const combinations: string[] = [];

      for (let i = 0; i < total; i++) {
        const combo = getNthMatchCombination(men, women, i);
        const str = combinationToString(combo);
        combinations.push(str);
      }

      const unique = new Set(combinations);
      assert.strictEqual(unique.size, total, 'All combinations should be unique');
    });

    it('should handle real-world scenario (12 men, 10 women)', () => {
      // Simplified version with smaller numbers to avoid long test times
      const men = ['m1', 'm2', 'm3', 'm4', 'm5', 'm6'];
      const women = ['w1', 'w2', 'w3', 'w4'];
      const total = getTotalCombinations(men, women);

      // Just verify we can generate first, middle, and last combinations
      const first = getNthMatchCombination(men, women, 0);
      const middle = getNthMatchCombination(men, women, Math.floor(total / 2));
      const last = getNthMatchCombination(men, women, total - 1);

      assert.strictEqual(first.length, 6);
      assert.strictEqual(middle.length, 6);
      assert.strictEqual(last.length, 6);

      // Verify they're different
      const firstStr = combinationToString(first);
      const middleStr = combinationToString(middle);
      const lastStr = combinationToString(last);

      assert.notStrictEqual(firstStr, middleStr);
      assert.notStrictEqual(middleStr, lastStr);
      assert.notStrictEqual(firstStr, lastStr);
    });

    it('should ensure every man appears in each combination', () => {
      const men = ['m1', 'm2', 'm3'];
      const women = ['w1', 'w2', 'w3'];
      const total = getTotalCombinations(men, women);

      for (let i = 0; i < total; i++) {
        const combo = getNthMatchCombination(men, women, i);
        const menInCombo = new Set(combo.map(pair => pair.man));
        assert.strictEqual(menInCombo.size, 3);
        men.forEach(man => {
          assert.strictEqual(menInCombo.has(man), true, `${man} should appear in combination ${i}`);
        });
      }
    });

    it('should verify all women are used across combinations (unequal groups)', () => {
      const men = ['m1', 'm2', 'm3', 'm4'];
      const women = ['w1', 'w2'];
      const total = getTotalCombinations(men, women);

      for (let i = 0; i < total; i++) {
        const combo = getNthMatchCombination(men, women, i);
        const womenInCombo = new Set(combo.map(pair => pair.woman));
        // With difference=2, both women should appear (each twice)
        assert.strictEqual(womenInCombo.size, 2);
        women.forEach(woman => {
          assert.strictEqual(womenInCombo.has(woman), true, `${woman} should appear in combination ${i}`);
        });
      }
    });
  });
});
