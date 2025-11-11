import { describe, it } from 'node:test';
import assert from 'node:assert';
import {
  validateMatchboxConstraints,
  validateMatchingNight,
  validateAllMatchingNights,
  isValidCombination,
  getValidationScore,
  groupByNight,
  doubleMatchConstrain
} from './validator.ts';
import type { MatchPair, MatchboxResult, MatchingNight } from './data.ts';

describe('validator.ts', () => {
  // Test data
  const testCombination: MatchPair[] = [
    { man: 'xander', woman: 'elli' },
    { man: 'lennard', woman: 'sandra' },
    { man: 'olli', woman: 'henna' },
    { man: 'nico', woman: 'ariel' },
    { man: 'calvinb', woman: 'joanna' }
  ];

  const testMatchboxResults: MatchboxResult[] = [
    { man: 'xander', woman: 'elli', isMatch: true },
    { man: 'calvinb', woman: 'nelly', isMatch: false },
    { man: 'jonny', woman: 'beverly', isMatch: false }
  ];

  const testMatchingNights: MatchingNight[] = [
    { night: 1, woman: 'elli', man: 'xander', matchCount: 2 },
    { night: 1, woman: 'henna', man: 'olli', matchCount: 2 },
    { night: 1, woman: 'sandra', man: 'lennard', matchCount: 2 },
    { night: 1, woman: 'ariel', man: 'nico', matchCount: 2 },
    { night: 1, woman: 'joanna', man: 'calvinb', matchCount: 2 }
  ];

  describe('validateMatchboxConstraints', () => {
    it('should return true for valid combination with all constraints satisfied', () => {
      const result = validateMatchboxConstraints(testCombination, testMatchboxResults);
      assert.strictEqual(result, true);
    });

    it('should return false when missing a required match', () => {
      const invalidCombination: MatchPair[] = [
        { man: 'lennard', woman: 'sandra' },
        { man: 'olli', woman: 'henna' }
      ];
      const matchboxResults: MatchboxResult[] = [
        { man: 'xander', woman: 'elli', isMatch: true }
      ];
      const result = validateMatchboxConstraints(invalidCombination, matchboxResults);
      assert.strictEqual(result, false);
    });

    it('should return false when including a forbidden pair', () => {
      const invalidCombination: MatchPair[] = [
        { man: 'xander', woman: 'elli' },
        { man: 'calvinb', woman: 'nelly' }
      ];
      const matchboxResults: MatchboxResult[] = [
        { man: 'xander', woman: 'elli', isMatch: true },
        { man: 'calvinb', woman: 'nelly', isMatch: false }
      ];
      const result = validateMatchboxConstraints(invalidCombination, matchboxResults);
      assert.strictEqual(result, false);
    });

    it('should return true for empty constraints', () => {
      const result = validateMatchboxConstraints(testCombination, []);
      assert.strictEqual(result, true);
    });
  });

  describe('validateMatchingNight', () => {
    it('should return true when match count equals expected', () => {
      const night: MatchingNight[] = [
        { night: 1, woman: 'elli', man: 'xander', matchCount: 2 },
        { night: 1, woman: 'henna', man: 'olli', matchCount: 2 },
        { night: 1, woman: 'sandra', man: 'wrong', matchCount: 2 }
      ];
      const result = validateMatchingNight(testCombination, night);
      assert.strictEqual(result, true);
    });

    it('should return false when match count is less than expected', () => {
      const night: MatchingNight[] = [
        { night: 1, woman: 'elli', man: 'xander', matchCount: 5 },
        { night: 1, woman: 'henna', man: 'olli', matchCount: 5 },
        { night: 1, woman: 'sandra', man: 'lennard', matchCount: 5 }
      ];
      const result = validateMatchingNight(testCombination, night);
      assert.strictEqual(result, false);
    });

    it('should return false when match count is more than expected', () => {
      const night: MatchingNight[] = [
        { night: 1, woman: 'elli', man: 'xander', matchCount: 1 },
        { night: 1, woman: 'henna', man: 'olli', matchCount: 1 }
      ];
      const result = validateMatchingNight(testCombination, night);
      assert.strictEqual(result, false);
    });

    it('should handle empty night data', () => {
      const result = validateMatchingNight(testCombination, []);
      assert.strictEqual(result, true);
    });
  });

  describe('groupByNight', () => {
    it('should group multiple nights correctly', () => {
      const nights: MatchingNight[] = [
        { night: 1, woman: 'elli', man: 'xander', matchCount: 2 },
        { night: 1, woman: 'henna', man: 'olli', matchCount: 2 },
        { night: 2, woman: 'elli', man: 'xander', matchCount: 3 },
        { night: 2, woman: 'sandra', man: 'lennard', matchCount: 3 }
      ];
      const result = groupByNight(nights);
      assert.strictEqual(Object.keys(result).length, 2);
      assert.strictEqual(result[1].length, 2);
      assert.strictEqual(result[2].length, 2);
    });

    it('should handle single night', () => {
      const nights: MatchingNight[] = [
        { night: 1, woman: 'elli', man: 'xander', matchCount: 2 }
      ];
      const result = groupByNight(nights);
      assert.strictEqual(Object.keys(result).length, 1);
      assert.strictEqual(result[1].length, 1);
    });

    it('should handle empty array', () => {
      const result = groupByNight([]);
      assert.deepStrictEqual(result, {});
    });
  });

  describe('validateAllMatchingNights', () => {
    it('should return true when all nights are valid', () => {
      // testMatchingNights has 5 pairs with matchCount: 2, so only 2 should match
      const validNights: MatchingNight[] = [
        { night: 1, woman: 'elli', man: 'xander', matchCount: 2 },
        { night: 1, woman: 'sandra', man: 'lennard', matchCount: 2 }
      ];
      const result = validateAllMatchingNights(testCombination, validNights);
      assert.strictEqual(result, true);
    });

    it('should return false when one night fails', () => {
      const nights: MatchingNight[] = [
        { night: 1, woman: 'elli', man: 'xander', matchCount: 2 },
        { night: 1, woman: 'henna', man: 'olli', matchCount: 2 },
        { night: 2, woman: 'elli', man: 'xander', matchCount: 5 },
        { night: 2, woman: 'sandra', man: 'lennard', matchCount: 5 }
      ];
      const result = validateAllMatchingNights(testCombination, nights);
      assert.strictEqual(result, false);
    });

    it('should handle empty nights array', () => {
      const result = validateAllMatchingNights(testCombination, []);
      assert.strictEqual(result, true);
    });

    it('should validate multiple different nights correctly', () => {
      const combination: MatchPair[] = [
        { man: 'xander', woman: 'elli' },
        { man: 'lennard', woman: 'sandra' },
        { man: 'olli', woman: 'henna' }
      ];
      const nights: MatchingNight[] = [
        { night: 1, woman: 'elli', man: 'xander', matchCount: 1 },
        { night: 1, woman: 'sandra', man: 'wrong', matchCount: 1 },
        { night: 2, woman: 'elli', man: 'xander', matchCount: 2 },
        { night: 2, woman: 'sandra', man: 'lennard', matchCount: 2 },
        { night: 2, woman: 'henna', man: 'wrong', matchCount: 2 }
      ];
      const result = validateAllMatchingNights(combination, nights);
      assert.strictEqual(result, true);
    });
  });

  describe('doubleMatchConstrain', () => {
    it('should return true when no constraints are specified', () => {
      const result = doubleMatchConstrain(testCombination, null, null);
      assert.strictEqual(result, true);
    });

    it('should validate single string constraint for men', () => {
      const combination: MatchPair[] = [
        { man: 'xander', woman: 'elli' },
        { man: 'xander', woman: 'henna' },
        { man: 'olli', woman: 'sandra' }
      ];
      const result = doubleMatchConstrain(combination, 'xander', null);
      assert.strictEqual(result, true);
    });

    it('should reject when required man is not double matched', () => {
      const combination: MatchPair[] = [
        { man: 'xander', woman: 'elli' },
        { man: 'olli', woman: 'henna' },
        { man: 'lennard', woman: 'sandra' }
      ];
      const result = doubleMatchConstrain(combination, 'xander', null);
      assert.strictEqual(result, false);
    });

    it('should validate array constraint for men', () => {
      const combination: MatchPair[] = [
        { man: 'xander', woman: 'elli' },
        { man: 'xander', woman: 'henna' },
        { man: 'olli', woman: 'sandra' }
      ];
      const result = doubleMatchConstrain(combination, ['xander'], null);
      assert.strictEqual(result, true);
    });

    it('should validate single string constraint for women', () => {
      const combination: MatchPair[] = [
        { man: 'xander', woman: 'elli' },
        { man: 'olli', woman: 'elli' },
        { man: 'lennard', woman: 'sandra' }
      ];
      const result = doubleMatchConstrain(combination, null, 'elli');
      assert.strictEqual(result, true);
    });

    it('should reject when required woman is not double matched', () => {
      const combination: MatchPair[] = [
        { man: 'xander', woman: 'elli' },
        { man: 'olli', woman: 'henna' },
        { man: 'lennard', woman: 'sandra' }
      ];
      const result = doubleMatchConstrain(combination, null, 'elli');
      assert.strictEqual(result, false);
    });

    it('should validate array of arrays constraint for men', () => {
      const combination: MatchPair[] = [
        { man: 'xander', woman: 'elli' },
        { man: 'xander', woman: 'henna' },
        { man: 'olli', woman: 'sandra' }
      ];
      const result = doubleMatchConstrain(combination, [['xander']], null);
      assert.strictEqual(result, true);
    });

    it('should validate multiple men in array of arrays', () => {
      const combination: MatchPair[] = [
        { man: 'xander', woman: 'elli' },
        { man: 'xander', woman: 'henna' },
        { man: 'olli', woman: 'sandra' },
        { man: 'olli', woman: 'ariel' }
      ];
      const result = doubleMatchConstrain(combination, [['xander', 'olli']], null);
      assert.strictEqual(result, true);
    });

    it('should validate multiple men in array of arraysshould handle two double match with one in arrays', () => {
      const combination: MatchPair[] = [
        { man: 'xander', woman: 'elli' },
        { man: 'xander', woman: 'henna' },
        { man: 'olli', woman: 'sandra' },
        { man: 'olli', woman: 'ariel' }
      ];
      const result = doubleMatchConstrain(combination, [['xander']], null);
      assert.strictEqual(result, true);
    });

    it('should handle reverse double match (women matched to 2 men each with man constraint)', () => {
      const combination: MatchPair[] = [
        { man: 'xander', woman: 'elli' },
        { man: 'olli', woman: 'elli' },
        { man: 'lennard', woman: 'sandra' }
      ];
      const result = doubleMatchConstrain(combination, ['xander', 'olli'], null);
      assert.strictEqual(result, true);
    });

    it('should handle reverse double match (men matched to 2 women each with woman constraint)', () => {
      const combination: MatchPair[] = [
        { man: 'xander', woman: 'elli' },
        { man: 'xander', woman: 'henna' },
        { man: 'olli', woman: 'sandra' }
      ];
      const result = doubleMatchConstrain(combination, null, ['elli', 'henna']);
      assert.strictEqual(result, true);
    });

    it('should validate both men and women constraints simultaneously', () => {
      const combination: MatchPair[] = [
        { man: 'xander', woman: 'elli' },
        { man: 'xander', woman: 'henna' },
        { man: 'olli', woman: 'sandra' },
        { man: 'olli', woman: 'ariel' }
      ];
      const result = doubleMatchConstrain(combination, ['xander', 'olli'], ['elli', 'henna', 'sandra', 'ariel']);
      assert.strictEqual(result, true);
    });

    it('should handle combination with no double matches', () => {
      const combination: MatchPair[] = [
        { man: 'xander', woman: 'elli' },
        { man: 'olli', woman: 'henna' },
        { man: 'lennard', woman: 'sandra' }
      ];
      const result = doubleMatchConstrain(combination, null, null);
      assert.strictEqual(result, true);
    });
  });

  describe('isValidCombination', () => {
    it('should return true for completely valid combination', () => {
      const validNights: MatchingNight[] = [
        { night: 1, woman: 'elli', man: 'xander', matchCount: 2 },
        { night: 1, woman: 'sandra', man: 'lennard', matchCount: 2 }
      ];
      const result = isValidCombination(testCombination, testMatchboxResults, validNights, null, null);
      assert.strictEqual(result, true);
    });

    it('should return false when matchbox constraints fail', () => {
      const invalidCombination: MatchPair[] = [
        { man: 'calvinb', woman: 'nelly' },
        { man: 'olli', woman: 'henna' }
      ];
      const matchboxResults: MatchboxResult[] = [
        { man: 'calvinb', woman: 'nelly', isMatch: false }
      ];
      const result = isValidCombination(invalidCombination, matchboxResults, [], null, null);
      assert.strictEqual(result, false);
    });

    it('should return false when matching night constraints fail', () => {
      const combination: MatchPair[] = [
        { man: 'xander', woman: 'elli' }
      ];
      const nights: MatchingNight[] = [
        { night: 1, woman: 'elli', man: 'xander', matchCount: 5 },
        { night: 1, woman: 'henna', man: 'olli', matchCount: 5 }
      ];
      const result = isValidCombination(combination, [], nights, null, null);
      assert.strictEqual(result, false);
    });

    it('should return false when double match constraints fail', () => {
      const combination: MatchPair[] = [
        { man: 'xander', woman: 'elli' },
        { man: 'olli', woman: 'henna' }
      ];
      const result = isValidCombination(combination, [], [], 'xander', null);
      assert.strictEqual(result, false);
    });

    it('should validate with all constraint types at once', () => {
      // Test all validation together: matchbox + matching night
      // This is the same data from "should return true for completely valid combination" test above
      const validNights: MatchingNight[] = [
        { night: 1, woman: 'elli', man: 'xander', matchCount: 2 },
        { night: 1, woman: 'sandra', man: 'lennard', matchCount: 2 }
      ];
      // testCombination has 5 pairs, testMatchboxResults has xander+elli confirmed, validNights expects 2 matches
      const result = isValidCombination(testCombination, testMatchboxResults, validNights, null, null);
      assert.strictEqual(result, true);
    });
  });

  describe('getValidationScore', () => {
    it('should return 1.0 for perfectly valid combination', () => {
      const matchboxResults: MatchboxResult[] = [
        { man: 'xander', woman: 'elli', isMatch: true },
        { man: 'calvinb', woman: 'nelly', isMatch: false }
      ];
      const nights: MatchingNight[] = [
        { night: 1, woman: 'elli', man: 'xander', matchCount: 2 },
        { night: 1, woman: 'sandra', man: 'lennard', matchCount: 2 }
      ];
      // 2 matchbox checks + 1 night check = 3 total, all pass = 3/3 = 1.0
      const result = getValidationScore(testCombination, matchboxResults, nights);
      assert.strictEqual(result, 1.0);
    });

    it('should return partial score for partially valid combination', () => {
      const combination: MatchPair[] = [
        { man: 'xander', woman: 'elli' },
        { man: 'calvinb', woman: 'nelly' }
      ];
      const matchboxResults: MatchboxResult[] = [
        { man: 'xander', woman: 'elli', isMatch: true },
        { man: 'calvinb', woman: 'nelly', isMatch: false }
      ];
      const nights: MatchingNight[] = [
        { night: 1, woman: 'elli', man: 'xander', matchCount: 1 },
        { night: 1, woman: 'nelly', man: 'calvinb', matchCount: 1 }
      ];
      // 2 matchbox (1 pass, 1 fail) + 1 night (fail) = 3 total, 1 pass = 1/3
      const result = getValidationScore(combination, matchboxResults, nights);
      assert.strictEqual(result, 1 / 3);
    });

    it('should return 0 for completely invalid combination', () => {
      const combination: MatchPair[] = [
        { man: 'wrong', woman: 'wrong' }
      ];
      const matchboxResults: MatchboxResult[] = [
        { man: 'xander', woman: 'elli', isMatch: true }
      ];
      const nights: MatchingNight[] = [
        { night: 1, woman: 'elli', man: 'xander', matchCount: 1 },
        { night: 1, woman: 'henna', man: 'olli', matchCount: 1 }
      ];
      const result = getValidationScore(combination, matchboxResults, nights);
      assert.strictEqual(result, 0);
    });

    it('should handle empty constraints', () => {
      const result = getValidationScore(testCombination, [], []);
      assert.strictEqual(result, 0);
    });

    it('should calculate score correctly with multiple nights', () => {
      const combination: MatchPair[] = [
        { man: 'xander', woman: 'elli' },
        { man: 'olli', woman: 'henna' }
      ];
      const matchboxResults: MatchboxResult[] = [
        { man: 'xander', woman: 'elli', isMatch: true }
      ];
      const nights: MatchingNight[] = [
        { night: 1, woman: 'elli', man: 'xander', matchCount: 2 },
        { night: 1, woman: 'henna', man: 'olli', matchCount: 2 },
        { night: 2, woman: 'elli', man: 'xander', matchCount: 5 },
        { night: 2, woman: 'henna', man: 'olli', matchCount: 5 }
      ];
      // 1 matchbox (pass) + 2 nights (1 pass, 1 fail) = 3 total, 2 pass = 2/3
      const result = getValidationScore(combination, matchboxResults, nights);
      assert.strictEqual(result, 2 / 3);
    });
  });
});
