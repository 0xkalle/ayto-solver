// Validation functions for checking combinations against known constraints

import type { MatchPair, MatchboxResult, MatchingNight } from './data.ts';

interface NightGroup {
  man: string;
  woman: string;
  matchCount: number;
}

function validateMatchboxConstraints(combination: MatchPair[], matchboxResults: MatchboxResult[]): boolean {
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

function validateMatchingNight(combination: MatchPair[], matchingNight: MatchingNight[]): boolean {
  const expectedMatches = matchingNight[0]?.matchCount || 0;
  let actualMatches = 0;

  for (const nightPair of matchingNight) {
    const isMatch = combination.some(
      perfectPair => perfectPair.man === nightPair.man && perfectPair.woman === nightPair.woman
    );
    if (isMatch) {
      actualMatches++;
    }
  }

  return actualMatches === expectedMatches;
}

function groupByNight(matchingNights: MatchingNight[]): Record<number, NightGroup[]> {
  const grouped: Record<number, NightGroup[]> = {};

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

function validateAllMatchingNights(combination: MatchPair[], matchingNights: MatchingNight[]): boolean {
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

function doubleMatchConstrain(
  combination: MatchPair[],
  doubleMatchMan: string | string[] | string[][] | null,
  doubleMatchWoman: string | string[] | string[][] | null
): boolean {
  // Count how many times each person appears in the combination
  const menCounts: Record<string, number> = {};
  const womenCounts: Record<string, number> = {};

  for (const pair of combination) {
    menCounts[pair.man] = (menCounts[pair.man] || 0) + 1;
    womenCounts[pair.woman] = (womenCounts[pair.woman] || 0) + 1;
  }

  // Find all people who appear twice (double match people)
  const doubleMatchedMen = Object.keys(menCounts).filter(man => menCounts[man] === 2);
  const doubleMatchedWomen = Object.keys(womenCounts).filter(woman => womenCounts[woman] === 2);

  // Helper function to check if input is array of arrays
  const isArrayOfArrays = (input: any): input is string[][] => {
    return Array.isArray(input) && input.length > 0 && Array.isArray(input[0]);
  };

  // Helper function to validate a specific double match configuration
  const validateConfiguration = (requiredPeople: string[], actualDoubleMatched: string[], isMan: boolean): boolean => {
    if (isMan) {
      // Checking men
      if (doubleMatchedMen.length > 0) {
        // Men matched to 2 women each - check if required men are in double match
        return requiredPeople.every(man => doubleMatchedMen.includes(man));
      } else if (doubleMatchedWomen.length > 0) {
        // Women matched to 2 men each - check if required men are paired with double match women
        const menInDoubleMatches = new Set<string>();
        for (const woman of doubleMatchedWomen) {
          const matchedMen = combination
            .filter(pair => pair.woman === woman)
            .map(pair => pair.man);
          matchedMen.forEach(man => menInDoubleMatches.add(man));
        }
        return requiredPeople.every(man => menInDoubleMatches.has(man));
      }
    } else {
      // Checking women
      if (doubleMatchedWomen.length > 0) {
        // Women matched to 2 men each - check if required women are in double match
        return requiredPeople.every(woman => doubleMatchedWomen.includes(woman));
      } else if (doubleMatchedMen.length > 0) {
        // Men matched to 2 women each - check if required women are paired with double match men
        const womenInDoubleMatches = new Set<string>();
        for (const man of doubleMatchedMen) {
          const matchedWomen = combination
            .filter(pair => pair.man === man)
            .map(pair => pair.woman);
          matchedWomen.forEach(woman => womenInDoubleMatches.add(woman));
        }
        return requiredPeople.every(woman => womenInDoubleMatches.has(woman));
      }
    }
    return false;
  };

  // Process doubleMatchMan constraint
  if (doubleMatchMan) {
    if (isArrayOfArrays(doubleMatchMan)) {
      // Array of arrays: multiple possible double match configurations
      const configurations = doubleMatchMan.filter(config => config && config.length > 0 && config[0] !== null);

      if (configurations.length > 0) {
        // Check if at least one configuration matches for each specified double match
        let matchedConfigs = 0;

        for (const config of configurations) {
          if (validateConfiguration(config, doubleMatchedMen, true)) {
            matchedConfigs++;
          }
        }

        // If we have only one configuration, at least one double match must fit it
        // If we have multiple configurations, all must be satisfied
        if (configurations.length === 1) {
          // Single configuration: at least one of the actual double matches must fit
          if (matchedConfigs === 0) {
            return false;
          }
        } else {
          // Multiple configurations: all must be satisfied
          if (matchedConfigs !== configurations.length) {
            return false;
          }
        }
      }
    } else {
      // Single value or simple array (backward compatibility)
      const requiredMen = Array.isArray(doubleMatchMan) ? doubleMatchMan : [doubleMatchMan];

      if (requiredMen.length > 0 && requiredMen[0] !== null) {
        if (!validateConfiguration(requiredMen, doubleMatchedMen, true)) {
          return false;
        }
      }
    }
  }

  // Process doubleMatchWoman constraint
  if (doubleMatchWoman) {
    if (isArrayOfArrays(doubleMatchWoman)) {
      // Array of arrays: multiple possible double match configurations
      const configurations = doubleMatchWoman.filter(config => config && config.length > 0 && config[0] !== null);

      if (configurations.length > 0) {
        // Check if at least one configuration matches for each specified double match
        let matchedConfigs = 0;

        for (const config of configurations) {
          if (validateConfiguration(config, doubleMatchedWomen, false)) {
            matchedConfigs++;
          }
        }

        // If we have only one configuration, at least one double match must fit it
        // If we have multiple configurations, all must be satisfied
        if (configurations.length === 1) {
          // Single configuration: at least one of the actual double matches must fit
          if (matchedConfigs === 0) {
            return false;
          }
        } else {
          // Multiple configurations: all must be satisfied
          if (matchedConfigs !== configurations.length) {
            return false;
          }
        }
      }
    } else {
      // Single value or simple array (backward compatibility)
      const requiredWomen = Array.isArray(doubleMatchWoman) ? doubleMatchWoman : [doubleMatchWoman];

      if (requiredWomen.length > 0 && requiredWomen[0] !== null) {
        if (!validateConfiguration(requiredWomen, doubleMatchedWomen, false)) {
          return false;
        }
      }
    }
  }

  return true;
}

function isValidCombination(
  combination: MatchPair[],
  matchboxResults: MatchboxResult[],
  matchingNights: MatchingNight[],
  doubleMatchMan: string | string[] | string[][] | null,
  doubleMatchWoman: string | string[] | string[][] | null
): boolean {
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

function getValidationScore(
  combination: MatchPair[],
  matchboxResults: MatchboxResult[],
  matchingNights: MatchingNight[]
): number {
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

export {
  validateMatchboxConstraints,
  validateMatchingNight,
  validateAllMatchingNights,
  isValidCombination,
  getValidationScore,
  groupByNight,
  doubleMatchConstrain
};
