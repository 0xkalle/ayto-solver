// Validation functions for checking combinations against known constraints

function validateMatchboxConstraints(combination, matchboxResults) {
  for (const result of matchboxResults) {
    const pairInCombination = combination.find(
      pair => pair.man === result.man && pair.woman === result.woman
    );

    if (result.isMatch && !pairInCombination) {
      return false;
    }

    if (!result.isMatch && pairInCombination) {
      return false;
    }
  }
  return true;
}

function validateMatchingNight(combination, matchingNight) {
  const expectedMatches = matchingNight.matchCount;
  let actualMatches = 0;

  const nightPairs = groupByNight(matchingNight);

  for (const nightPair of nightPairs) {
    const isMatch = combination.some(
      perfectPair => perfectPair.man === nightPair.man && perfectPair.woman === nightPair.woman
    );
    if (isMatch) {
      actualMatches++;
    }
  }

  return actualMatches === expectedMatches;
}

function groupByNight(matchingNights) {
  const grouped = {};

  for (const night of matchingNights) {
    if (!grouped[night.night]) {
      grouped[night.night] = [];
    }
    grouped[night.night].push({
      man: night.man,
      woman: night.woman,
      matchCount: night.matchCount
    });
  }

  return grouped;
}

function validateAllMatchingNights(combination, matchingNights) {
  const nightsGrouped = groupByNight(matchingNights);

  for (const nightNumber in nightsGrouped) {
    const nightData = nightsGrouped[nightNumber];
    const expectedMatches = nightData[0].matchCount; // All entries for a night should have same match count
    let actualMatches = 0;

    for (const nightPair of nightData) {
      const isMatch = combination.some(
        perfectPair => perfectPair.man === nightPair.man && perfectPair.woman === nightPair.woman
      );
      if (isMatch) {
        actualMatches++;
      }
    }

    if (actualMatches !== expectedMatches) {
      return false;
    }
  }

  return true;
}

function isValidCombination(combination, matchboxResults, matchingNights) {
  if (!validateMatchboxConstraints(combination, matchboxResults)) {
    return false;
  }

  if (!validateAllMatchingNights(combination, matchingNights)) {
    return false;
  }

  return true;
}

function getValidationScore(combination, matchboxResults, matchingNights) {
  let score = 0;
  let totalChecks = 0;

  // Check matchbox constraints
  for (const result of matchboxResults) {
    totalChecks++;
    const pairInCombination = combination.find(
      pair => pair.man === result.man && pair.woman === result.woman
    );

    if ((result.isMatch && pairInCombination) || (!result.isMatch && !pairInCombination)) {
      score++;
    }
  }

  // Check matching night constraints
  const nightsGrouped = groupByNight(matchingNights);
  for (const nightNumber in nightsGrouped) {
    totalChecks++;
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

    if (actualMatches === expectedMatches) {
      score++;
    }
  }

  return totalChecks > 0 ? score / totalChecks : 0;
}

module.exports = {
  validateMatchboxConstraints,
  validateMatchingNight,
  validateAllMatchingNights,
  isValidCombination,
  getValidationScore,
  groupByNight
};