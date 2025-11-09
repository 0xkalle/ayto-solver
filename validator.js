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

function doubleMatchConstrain(combination, doubleMatchMan, doubleMatchWoman) {
  // Count how many times each person appears in the combination
  const menCounts = {};
  const womenCounts = {};

  for (const pair of combination) {
    menCounts[pair.man] = (menCounts[pair.man] || 0) + 1;
    womenCounts[pair.woman] = (womenCounts[pair.woman] || 0) + 1;
  }

  // Find all people who appear twice (double match people)
  const doubleMatchedMen = Object.keys(menCounts).filter(man => menCounts[man] === 2);
  const doubleMatchedWomen = Object.keys(womenCounts).filter(woman => womenCounts[woman] === 2);

  // If doubleMatchMan is specified
  if (doubleMatchMan) {
    // Handle both array and single value
    const requiredMen = Array.isArray(doubleMatchMan) ? doubleMatchMan : [doubleMatchMan];

    if (requiredMen.length > 0 && requiredMen[0] !== null) {
      if (doubleMatchedMen.length > 0) {
        // One or more men matched to 2 women each
        // Check if all specified men are in the double match
        for (const man of requiredMen) {
          if (!doubleMatchedMen.includes(man)) {
            return false;
          }
        }
      } else if (doubleMatchedWomen.length > 0) {
        // One or more women matched to 2 men each
        // Check if all specified men are matched to double match women
        const menInDoubleMatches = new Set();
        for (const woman of doubleMatchedWomen) {
          const matchedMen = combination
            .filter(pair => pair.woman === woman)
            .map(pair => pair.man);
          matchedMen.forEach(man => menInDoubleMatches.add(man));
        }

        for (const man of requiredMen) {
          if (!menInDoubleMatches.has(man)) {
            return false;
          }
        }
      }
    }
  }

  // If doubleMatchWoman is specified
  if (doubleMatchWoman) {
    // Handle both array and single value
    const requiredWomen = Array.isArray(doubleMatchWoman) ? doubleMatchWoman : [doubleMatchWoman];

    if (requiredWomen.length > 0 && requiredWomen[0] !== null) {
      if (doubleMatchedWomen.length > 0) {
        // One or more women matched to 2 men each
        // Check if all specified women are in the double match
        for (const woman of requiredWomen) {
          if (!doubleMatchedWomen.includes(woman)) {
            return false;
          }
        }
      } else if (doubleMatchedMen.length > 0) {
        // One or more men matched to 2 women each
        // Check if all specified women are matched to double match men
        const womenInDoubleMatches = new Set();
        for (const man of doubleMatchedMen) {
          const matchedWomen = combination
            .filter(pair => pair.man === man)
            .map(pair => pair.woman);
          matchedWomen.forEach(woman => womenInDoubleMatches.add(woman));
        }

        for (const woman of requiredWomen) {
          if (!womenInDoubleMatches.has(woman)) {
            return false;
          }
        }
      }
    }
  }

  return true;
}

function isValidCombination(combination, matchboxResults, matchingNights, doubleMatchMan, doubleMatchWoman) {
  if (!validateMatchboxConstraints(combination, matchboxResults)) {
    return false;
  }

  if (!validateAllMatchingNights(combination, matchingNights)) {
    return false;
  }

  if (!doubleMatchConstrain(combination, doubleMatchMan, doubleMatchWoman)) {
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
  groupByNight,
  doubleMatchConstrain
};