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

function calculateProbabilityDistribution(validCombinations, matchboxResults, matchingNights) {
  const results = [];
  let totalLikelihood = 0;

  // Calculate raw likelihoods
  for (const combination of validCombinations) {
    const likelihood = calculateBayesianProbability(combination, matchboxResults, matchingNights);
    results.push({
      combination,
      likelihood
    });
    totalLikelihood += likelihood;
  }

  // Normalize to get probabilities
  for (const result of results) {
    result.probability = totalLikelihood > 0 ? result.likelihood / totalLikelihood : 0;
    result.percentage = (result.probability * 100).toFixed(2);
  }

  // Sort by probability (highest first)
  results.sort((a, b) => b.probability - a.probability);

  return results;
}

function getTopProbabilities(probabilityResults, topN = 10) {
  return probabilityResults.slice(0, topN);
}

function calculateIndividualPairProbabilities(probabilityResults) {
  const pairCounts = {};
  let totalWeight = 0;

  // Count weighted occurrences of each pair
  for (const result of probabilityResults) {
    const weight = result.probability;
    totalWeight += weight;

    for (const pair of result.combination) {
      const pairKey = `${pair.man}-${pair.woman}`;
      if (!pairCounts[pairKey]) {
        pairCounts[pairKey] = 0;
      }
      pairCounts[pairKey] += weight;
    }
  }

  // Convert to probabilities
  const pairProbabilities = {};
  for (const pairKey in pairCounts) {
    pairProbabilities[pairKey] = {
      probability: totalWeight > 0 ? pairCounts[pairKey] / totalWeight : 0,
      percentage: totalWeight > 0 ? ((pairCounts[pairKey] / totalWeight) * 100).toFixed(2) : '0.00'
    };
  }

  // Sort by probability
  const sortedPairs = Object.entries(pairProbabilities)
    .map(([pair, data]) => ({
      pair,
      ...data
    }))
    .sort((a, b) => b.probability - a.probability);

  return sortedPairs;
}

module.exports = {
  calculateBaseProbability,
  calculateBayesianProbability,
  calculateProbabilityDistribution,
  getTopProbabilities,
  calculateIndividualPairProbabilities,
  binomialProbability,
  factorial,
  combination
};