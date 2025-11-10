// Utility functions for generating permutations

import type { MatchPair } from './data.ts';

function generatePermutations<T>(arr: T[]): T[][] {
  if (arr.length <= 1) return [arr];

  const result: T[][] = [];
  for (let i = 0; i < arr.length; i++) {
    const current = arr[i];
    const remaining = arr.slice(0, i).concat(arr.slice(i + 1));
    const perms = generatePermutations(remaining);

    for (const perm of perms) {
      result.push([current].concat(perm));
    }
  }
  return result;
}

// Get factorial of n
function factorial(n: number): number {
  if (n <= 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

// Get the nth permutation of an array (0-indexed)
function getNthPermutation<T>(arr: T[], n: number): T[] {
  const result: T[] = [];
  const available = [...arr];
  let remaining = n;

  for (let i = arr.length - 1; i >= 0; i--) {
    const fact = factorial(i);
    const index = Math.floor(remaining / fact);
    result.push(available[index]);
    available.splice(index, 1);
    remaining = remaining % fact;
  }

  return result;
}

// Calculate binomial coefficient C(n, k)
function binomial(n: number, k: number): number {
  if (k > n) return 0;
  if (k === 0 || k === n) return 1;

  let result = 1;
  for (let i = 0; i < k; i++) {
    result *= (n - i);
    result /= (i + 1);
  }
  return result;
}

// Calculate total number of combinations
function getTotalCombinations(men: string[], women: string[]): number {
  if (men.length === women.length) {
    return factorial(women.length);
  }

  const smallerLength = Math.min(men.length, women.length);
  const largerLength = Math.max(men.length, women.length);
  const difference = largerLength - smallerLength;

  // For unequal groups with multiple double matches:
  // - Number of double matches needed: difference
  // - Choose which 'difference' people from smaller group get double matched: C(smallerLength, difference)
  // - For each double match person, choose 2 from larger group: [C(largerLength, 2) × C(largerLength-2, 2) × ...]
  // - Permute remaining (smallerLength - difference) to remaining (largerLength - 2*difference): (smallerLength - difference)!

  if (difference === 1) {
    // Single double match (original logic)
    const chooseTwo = binomial(largerLength, 2);
    return smallerLength * chooseTwo * factorial(smallerLength - 1);
  }

  // Multiple double matches
  // Choose which people from smaller group get double matched
  let total = binomial(smallerLength, difference);

  // For each arrangement of double matches, calculate combinations
  // This is: (largerLength choose 2) × (largerLength-2 choose 2) × ... difference times
  // Which equals: largerLength! / (2!^difference × (largerLength - 2×difference)!)
  let pairsProduct = 1;
  let remaining = largerLength;
  for (let i = 0; i < difference; i++) {
    pairsProduct *= binomial(remaining, 2);
    remaining -= 2;
  }

  total *= pairsProduct;

  // Permute the remaining single-matched people
  total *= factorial(smallerLength - difference);

  return total;
}

// Get the nth combination of k items from array (0-indexed)
function getNthCombination<T>(arr: T[], k: number, n: number): T[] {
  const result: T[] = [];
  let remaining = n;
  let start = 0;

  for (let i = 0; i < k; i++) {
    for (let j = start; j < arr.length; j++) {
      const combsWithThisElement = binomial(arr.length - j - 1, k - i - 1);
      if (remaining < combsWithThisElement) {
        result.push(arr[j]);
        start = j + 1;
        break;
      }
      remaining -= combsWithThisElement;
    }
  }

  return result;
}

// Get the nth match combination (0-indexed)
function getNthMatchCombination(men: string[], women: string[], n: number): MatchPair[] {
  const largerGroup = men.length > women.length ? men : women;
  const smallerGroup = men.length > women.length ? women : men;
  const isWomenSmaller = women.length < men.length;

  // If groups are equal
  if (men.length === women.length) {
    const womenPerm = getNthPermutation(women, n);
    const combination: MatchPair[] = [];
    for (let i = 0; i < men.length; i++) {
      combination.push({
        man: men[i],
        woman: womenPerm[i]
      });
    }
    return combination;
  }

  // Handle unequal groups
  const smallerLength = smallerGroup.length;
  const largerLength = largerGroup.length;
  const difference = largerLength - smallerLength;

  if (difference === 1) {
    // Single double match (original logic)
    const chooseTwo = binomial(largerLength, 2);
    const permsPerPair = factorial(smallerLength - 1);
    const permsPerDouble = chooseTwo * permsPerPair;

    // Determine which person from smaller group appears twice
    const doublePersonIdx = Math.floor(n / permsPerDouble);
    const doublePerson = smallerGroup[doublePersonIdx];
    const remainingSmaller = smallerGroup.filter((_, idx) => idx !== doublePersonIdx);

    // Determine which pair of positions get the doubled person
    const withinDouble = n % permsPerDouble;
    const pairIdx = Math.floor(withinDouble / permsPerPair);

    // Convert pairIdx to (pos1, pos2) where pos1 < pos2
    let pos1 = 0, pos2 = 1, currentPairIdx = 0;
    outer: for (pos1 = 0; pos1 < largerLength; pos1++) {
      for (pos2 = pos1 + 1; pos2 < largerLength; pos2++) {
        if (currentPairIdx === pairIdx) break outer;
        currentPairIdx++;
      }
    }

    // Get permutation of remaining smaller group for remaining positions
    const permIdx = withinDouble % permsPerPair;
    const remainingPerm = getNthPermutation(remainingSmaller, permIdx);

    // Build the combination
    const combination: MatchPair[] = [];
    let remainingIdx = 0;

    for (let i = 0; i < largerLength; i++) {
      let partner: string;
      if (i === pos1 || i === pos2) {
        partner = doublePerson;
      } else {
        partner = remainingPerm[remainingIdx];
        remainingIdx++;
      }

      if (isWomenSmaller) {
        combination.push({ man: largerGroup[i], woman: partner });
      } else {
        combination.push({ man: partner, woman: largerGroup[i] });
      }
    }

    return combination;
  }

  // Multiple double matches
  // Calculate how combinations are distributed
  const combs = binomial(smallerLength, difference); // ways to choose who gets double matched
  const permsOfRemaining = factorial(smallerLength - difference);

  // Calculate pair assignments for each double match
  let pairsProduct = 1;
  let rem = largerLength;
  for (let i = 0; i < difference; i++) {
    pairsProduct *= binomial(rem, 2);
    rem -= 2;
  }

  const permsPerCombSet = pairsProduct * permsOfRemaining;

  // Determine which people from smaller group get double matched
  const combIdx = Math.floor(n / permsPerCombSet);
  const doubleMatchIndices = getNthCombination([...Array(smallerLength).keys()], difference, combIdx);
  const doubleMatchPeople = doubleMatchIndices.map(idx => smallerGroup[idx]);

  const withinCombSet = n % permsPerCombSet;

  // Determine which pairs from larger group each double match person gets
  const pairAssignments: number[][] = [];
  let currentN = withinCombSet;
  let availableLargerIndices = [...Array(largerLength).keys()];

  for (let i = 0; i < difference; i++) {
    const remainingPairProduct = Math.floor(pairsProduct / binomial(availableLargerIndices.length, 2));
    pairsProduct = remainingPairProduct;

    const pairIdx = Math.floor(currentN / (remainingPairProduct * permsOfRemaining));
    currentN = currentN % (remainingPairProduct * permsOfRemaining);

    // Get the nth combination of 2 from available indices
    const chosenPair = getNthCombination(availableLargerIndices, 2, pairIdx);
    pairAssignments.push(chosenPair);

    // Remove these indices from available
    availableLargerIndices = availableLargerIndices.filter(idx => !chosenPair.includes(idx));
  }

  // Get permutation for remaining smaller group people
  const remainingSmallerIndices = [...Array(smallerLength).keys()].filter(idx => !doubleMatchIndices.includes(idx));
  const remainingSmaller = remainingSmallerIndices.map(idx => smallerGroup[idx]);
  const permIdx = currentN;
  const remainingPerm = getNthPermutation(remainingSmaller, permIdx);

  // Build the combination
  const combination: MatchPair[] = [];
  const assigned = new Set<number>();

  // Assign double matches
  for (let i = 0; i < difference; i++) {
    const person = doubleMatchPeople[i];
    const [idx1, idx2] = pairAssignments[i];

    if (isWomenSmaller) {
      combination.push({ man: largerGroup[idx1], woman: person });
      combination.push({ man: largerGroup[idx2], woman: person });
    } else {
      combination.push({ man: person, woman: largerGroup[idx1] });
      combination.push({ man: person, woman: largerGroup[idx2] });
    }

    assigned.add(idx1);
    assigned.add(idx2);
  }

  // Assign remaining single matches
  let remainingPermIdx = 0;
  for (let i = 0; i < largerLength; i++) {
    if (!assigned.has(i)) {
      const partner = remainingPerm[remainingPermIdx];
      remainingPermIdx++;

      if (isWomenSmaller) {
        combination.push({ man: largerGroup[i], woman: partner });
      } else {
        combination.push({ man: partner, woman: largerGroup[i] });
      }
    }
  }

  return combination;
}

function generateMatchCombinations(men: string[], women: string[]): MatchPair[][] {
  const total = getTotalCombinations(men, women);
  const combinations: MatchPair[][] = [];

  for (let i = 0; i < total; i++) {
    combinations.push(getNthMatchCombination(men, women, i));
  }

  return combinations;
}

function combinationToString(combination: MatchPair[]): string {
  return combination
    .map(pair => `${pair.man}-${pair.woman}`)
    .sort()
    .join(', ');
}

function combinationFromPairs(pairs: MatchPair[]): MatchPair[] {
  return pairs.map(pair => ({
    man: pair.man,
    woman: pair.woman
  }));
}

export {
  generatePermutations,
  generateMatchCombinations,
  combinationToString,
  combinationFromPairs,
  getTotalCombinations,
  getNthMatchCombination,
  factorial,
  binomial
};
