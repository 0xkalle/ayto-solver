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

  // Find who appears twice (the double match person)
  const doubleMatchedMan = Object.keys(menCounts).find(man => menCounts[man] === 2);
  const doubleMatchedWoman = Object.keys(womenCounts).find(woman => womenCounts[woman] === 2);

  // If doubleMatchMan is specified, verify all specified men are involved in the double match
  if (doubleMatchMan && doubleMatchMan.length > 0) {
    // Either this man appears twice, or this man appears once with a woman who appears twice
    if (doubleMatchedMan) {
      // One man matched to 2 women - check if it's one of the specified men
      if (!doubleMatchMan.includes(doubleMatchedMan)) {
        return false;
      }
    } else if (doubleMatchedWoman) {
      // Two men matched to 1 woman - check if all specified men are matched to the double woman
      const menMatchedToDoubleWoman = combination
        .filter(pair => pair.woman === doubleMatchedWoman)
        .map(pair => pair.man);

      // All specified men must be in the double match
      for (const man of doubleMatchMan) {
        if (!menMatchedToDoubleWoman.includes(man)) {
          return false;
        }
      }
    }
  }

  // If doubleMatchWoman is specified, verify all specified women are involved in the double match
  if (doubleMatchWoman && doubleMatchWoman.length > 0) {
    // Either this woman appears twice, or this woman appears once with a man who appears twice
    if (doubleMatchedWoman) {
      // One woman matched to 2 men - check if it's one of the specified women
      if (!doubleMatchWoman.includes(doubleMatchedWoman)) {
        return false;
      }
    } else if (doubleMatchedMan) {
      // Two women matched to 1 man - check if all specified women are matched to the double man
      const womenMatchedToDoubleMan = combination
        .filter(pair => pair.man === doubleMatchedMan)
        .map(pair => pair.woman);

      // All specified women must be in the double match
      for (const woman of doubleMatchWoman) {
        if (!womenMatchedToDoubleMan.includes(woman)) {
          return false;
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