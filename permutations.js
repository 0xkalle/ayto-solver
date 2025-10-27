// Utility functions for generating permutations

function generatePermutations(arr) {
  if (arr.length <= 1) return [arr];

  const result = [];
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
function factorial(n) {
  if (n <= 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

// Get the nth permutation of an array (0-indexed)
function getNthPermutation(arr, n) {
  const result = [];
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

// Calculate total number of combinations
function getTotalCombinations(men, women) {
  if (men.length === women.length) {
    return factorial(women.length);
  }

  const smallerLength = Math.min(men.length, women.length);
  const largerLength = Math.max(men.length, women.length);

  // For unequal groups:
  // - Choose which person from smaller group appears twice: smallerLength ways
  // - Choose which 2 positions in larger group get that person: C(largerLength, 2)
  // - Permute remaining (smallerLength-1) people to remaining (largerLength-2) positions: (smallerLength-1)!
  const chooseTwo = (largerLength * (largerLength - 1)) / 2;
  return smallerLength * chooseTwo * factorial(smallerLength - 1);
}

// Get the nth match combination (0-indexed)
function getNthMatchCombination(men, women, n) {
  const largerGroup = men.length > women.length ? men : women;
  const smallerGroup = men.length > women.length ? women : men;
  const isWomenSmaller = women.length < men.length;

  // If groups are equal
  if (men.length === women.length) {
    const womenPerm = getNthPermutation(women, n);
    const combination = [];
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

  const chooseTwo = (largerLength * (largerLength - 1)) / 2;
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
  const combination = [];
  let remainingIdx = 0;

  for (let i = 0; i < largerLength; i++) {
    let partner;
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

function generateMatchCombinations(men, women) {
  const total = getTotalCombinations(men, women);
  const combinations = [];

  for (let i = 0; i < total; i++) {
    combinations.push(getNthMatchCombination(men, women, i));
  }

  return combinations;
}

function combinationToString(combination) {
  return combination
    .map(pair => `${pair.man}-${pair.woman}`)
    .sort()
    .join(', ');
}

function combinationFromPairs(pairs) {
  return pairs.map(pair => ({
    man: pair.man,
    woman: pair.woman
  }));
}

module.exports = {
  generatePermutations,
  generateMatchCombinations,
  combinationToString,
  combinationFromPairs,
  getTotalCombinations,
  getNthMatchCombination,
  factorial
};