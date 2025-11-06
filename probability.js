// Probability calculation functions

function calculateBaseProbability(totalCombinations) {
  return 1 / totalCombinations;
}

function calculateBayesianProbability(combination, matchboxResults, matchingNights) {
  let likelihood = 1.0;

  // Calculate likelihood based on matchbox results
  for (const result of matchboxResults) {
    const pairInCombination = combination.find(
      pair => pair.man === result.man && pair.woman === result.woman
    );

    if (result.isMatch) {
      // If it's a confirmed match, this combination must include it
      likelihood *= pairInCombination ? 1.0 : 0.0;
    } else {
      // If it's a confirmed non-match, this combination must not include it
      likelihood *= pairInCombination ? 0.0 : 1.0;
    }
  }

  // If any hard constraint is violated, probability is 0
  if (likelihood === 0) {
    return 0;
  }

  // Calculate likelihood based on matching nights
  const { groupByNight } = require('./validator');
  const nightsGrouped = groupByNight(matchingNights);

  for (const nightNumber in nightsGrouped) {
    const nightData = nightsGrouped[nightNumber];
    const expectedMatches = nightData[0].matchCount;
    let actualMatches = 0;

    for (const nightPair of nightData) {
      const isMatch = combination.some(
        perfectPair => perfectPair.man === nightPair.man && perfectPair.woman === nightPair.woman
      );
      if (isMatch) {
        actualMatches++;
      }
    }

    // Calculate probability that this exact number of matches would occur
    const totalPairs = nightData.length;
    const matchProbability = binomialProbability(totalPairs, actualMatches, expectedMatches);
    likelihood *= matchProbability;
  }

  return likelihood;
}

function binomialProbability(n, k, expectedK) {
  // Simple approximation - in reality this would need more sophisticated calculation
  // For exact matches, return higher probability
  if (k === expectedK) {
    return 1.0;
  }

  // For close matches, return lower but non-zero probability
  const difference = Math.abs(k - expectedK);
  return Math.max(0.1, 1.0 - (difference / n));
}

function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

function combination(n, k) {
  return factorial(n) / (factorial(k) * factorial(n - k));
}

function calculateProbabilityDistribution(validCombinationsCount, pairFrequencies) {
  // Since all valid combinations are equally likely in AYTO,
  // we don't need to store individual combinations
  // The probability distribution is uniform across all valid combinations
  return {
    validCount: validCombinationsCount,
    pairFrequencies: pairFrequencies
  };
}

function getTopProbabilities(probabilityResults, topN = 10) {
  return probabilityResults.slice(0, topN);
}

function calculateIndividualPairProbabilities(validCombinationsCount, pairFrequencies) {
  // Since all valid combinations are equally likely,
  // pair probability = (# of valid combinations containing the pair) / (total valid combinations)

  const pairProbabilities = [];

  for (const [pairKey, frequency] of pairFrequencies.entries()) {
    const probability = frequency / validCombinationsCount;
    pairProbabilities.push({
      pair: pairKey,
      probability: probability,
      percentage: (probability * 100).toFixed(2),
      frequency: frequency
    });
  }

  // Sort by probability (highest first)
  pairProbabilities.sort((a, b) => b.probability - a.probability);

  return pairProbabilities;
}

function getImpossiblePairs(men, women, pairFrequencies) {
  // Generate all possible pairs
  const allPossiblePairs = new Set();
  for (const man of men) {
    for (const woman of women) {
      allPossiblePairs.add(`${man}-${woman}`);
    }
  }

  // Find impossible pairs (0% probability) - pairs not in pairFrequencies
  const impossiblePairs = [];
  for (const pairKey of allPossiblePairs) {
    if (!pairFrequencies.has(pairKey)) {
      const [man, woman] = pairKey.split('-');
      impossiblePairs.push({ man, woman, pair: pairKey });
    }
  }

  // Sort alphabetically by man's name, then woman's name
  impossiblePairs.sort((a, b) => {
    if (a.man !== b.man) {
      return a.man.localeCompare(b.man);
    }
    return a.woman.localeCompare(b.woman);
  });

  return impossiblePairs;
}

module.exports = {
  calculateBaseProbability,
  calculateBayesianProbability,
  calculateProbabilityDistribution,
  getTopProbabilities,
  calculateIndividualPairProbabilities,
  getImpossiblePairs,
  binomialProbability,
  factorial,
  combination
};