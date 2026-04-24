// Sample data structure for AYTO solver
// Replace with actual show data

export interface MatchPair {
  man: string;
  woman: string;
}

export interface MatchboxResult {
  man: string;
  woman: string;
  isMatch: boolean;
}

export interface MatchingNight {
  night: number;
  man: string;
  woman: string;
  matchCount: number;
}


// const doubleMatchMan: string | string[] | string[][] | null = ['jimi'];
const doubleMatchWoman: string | string[] | string[][] | null = ['alicia'];
const doubleMatchMan: string | string[] | string[][] | null = null;

const excludedMen: string[] | null = ['julianm', 'noel'];
const excludedWomen: string[] | null = ['marla', 'toni'];

const womenCandidates: string[] = [
  'alicia',
  'laura',
  'michelle',
  'tiziana',
  'toni',
  'adriana',
  'aurora',
  'elena',
  'marla',
  'ella',
  'linda'
];

// Matchbox results: confirmed matches and non-matches
const matchboxResults: MatchboxResult[] = [
  { man: 'evi', woman: 'tiziana', isMatch: false },
  //{ man: 'evi', woman: 'laura', isMatch: false }, verkauft
  { man: 'julians', woman: 'linda', isMatch: false },
  { man: 'julianm', woman: 'marla', isMatch: true },
  { man: 'chris', woman: 'aurora', isMatch: false },
  { man: 'noel', woman: 'toni', isMatch: true },
  { man: 'ema', woman: 'michelle', isMatch: false },


];

const menCandidates: string[] = [
  'noel',
  'julians',
  'chris',
  'julianm',
  'evi', //eddi
  'jeronymo',
  'jerry',
  'ema',
  'luke',
  'meji'
];

// Matching night results
const matchingNights: MatchingNight[] = [

  { night: 7, woman: 'marla', man: 'julianm', matchCount: 5 }, // DONE
  { night: 7, woman: 'toni', man: 'noel', matchCount: 5 }, // DONE
  { night: 7, woman: 'aurora', man: 'ema', matchCount: 5 }, // 27%
  { night: 7, woman: 'laura', man: 'luke', matchCount: 5 }, // 0%
  { night: 7, woman: 'ella', man: 'meji', matchCount: 5 }, // 0%
  { night: 7, woman: 'adriana', man: 'julians', matchCount: 5 }, // 81%
  { night: 7, woman: 'elena', man: 'jerry', matchCount: 5 }, // 100%
  { night: 7, woman: 'linda', man: 'chris', matchCount: 5 }, // 9%
  { night: 7, woman: 'tiziana', man: 'jeronymo', matchCount: 5 }, // 90%
  { night: 7, woman: 'michelle', man: 'evi', matchCount: 5 }, // 45%

  { night: 6, woman: 'marla', man: 'julianm', matchCount: 4 }, // DONE
  { night: 6, woman: 'toni', man: 'noel', matchCount: 4 }, // DONE
  { night: 6, woman: 'aurora', man: 'evi', matchCount: 4 }, // 18%
  { night: 6, woman: 'elena', man: 'luke', matchCount: 4 }, // 0 %
  { night: 6, woman: 'ella', man: 'meji', matchCount: 4 }, // 0%
  { night: 6, woman: 'adriana', man: 'julians', matchCount: 4 }, // 81%
  { night: 6, woman: 'laura', man: 'jerry', matchCount: 4 }, // 0%
  { night: 6, woman: 'linda', man: 'chris', matchCount: 4 }, // 9%
  { night: 6, woman: 'tiziana', man: 'jeronymo', matchCount: 4 }, // 90%
  { night: 6, woman: 'michelle', man: 'ema', matchCount: 4 }, // 0 %

  { night: 5, woman: 'marla', man: 'julianm', matchCount: 4 },  // 1 //
  { night: 5, woman: 'linda', man: 'evi', matchCount: 4 }, // 5 //
  { night: 5, woman: 'toni', man: 'noel', matchCount: 4 }, // 1 3 4 5 //
  { night: 5, woman: 'adriana', man: 'luke', matchCount: 4 }, // 5 //
  { night: 5, woman: 'aurora', man: 'meji', matchCount: 4 }, // 5 // 
  { night: 5, woman: 'tiziana', man: 'julians', matchCount: 4 }, // 5 //
  { night: 5, woman: 'elena', man: 'jerry', matchCount: 4 }, // 1 4 5 //
  { night: 5, woman: 'ella', man: 'chris', matchCount: 4 }, // 5 // 
  { night: 5, woman: 'laura', man: 'jeronymo', matchCount: 4 }, // 5 //
  { night: 5, woman: 'michelle', man: 'ema', matchCount: 4 }, // 1 3 4 5 //

  { night: 4, woman: 'marla', man: 'julianm', matchCount: 5 },  // 1 //
  { night: 4, woman: 'linda', man: 'chris', matchCount: 5 }, // 1 3 4 //
  { night: 4, woman: 'toni', man: 'noel', matchCount: 5 }, // 1 3 4 //
  { night: 4, woman: 'adriana', man: 'julians', matchCount: 5 }, // 4 //
  { night: 4, woman: 'aurora', man: 'evi', matchCount: 5 }, // 4 // 
  { night: 4, woman: 'tiziana', man: 'jeronymo', matchCount: 5 }, // 1 2 3 4 //
  { night: 4, woman: 'elena', man: 'jerry', matchCount: 5 }, // 1 4 //
  { night: 4, woman: 'ella', man: 'meji', matchCount: 5 }, // 1 4 // 
  { night: 4, woman: 'laura', man: 'luke', matchCount: 5 }, // 4 //
  { night: 4, woman: 'michelle', man: 'ema', matchCount: 5 }, // 1 3 4 //

  // VERKAUFT
  // { night: 4, woman: 'marla', man: 'julianm', matchCount: 1 },  // match
  // { night: 4, woman: 'aurora', man: 'chris', matchCount: 1 }, // neu
  // { night: 4, woman: 'ella', man: 'evi', matchCount: 1 }, // neu
  // { night: 4, woman: 'alicia', man: 'julians', matchCount: 1 }, // 3
  // { night: 4, woman: 'laura', man: 'meji', matchCount: 1 }, // neu
  // { night: 4, woman: 'adriana', man: 'noel', matchCount: 1 }, // 
  // { night: 4, woman: 'linda', man: 'jeronymo', matchCount: 1 }, // 
  // { night: 4, woman: 'elena', man: 'jerry', matchCount: 1 }, // 1
  // { night: 4, woman: 'toni', man: 'luke', matchCount: 1 }, // neu
  // { night: 4, woman: 'michelle', man: 'ema', matchCount: 1 }, // 1 3

  { night: 3, woman: 'adriana', man: 'julianm', matchCount: 2 },  // 1
  { night: 3, woman: 'linda', man: 'chris', matchCount: 2 }, // 1
  { night: 3, woman: 'toni', man: 'noel', matchCount: 2 }, // 1
  { night: 3, woman: 'alicia', man: 'julians', matchCount: 2 }, // neu
  { night: 3, woman: 'laura', man: 'evi', matchCount: 2 }, // 1 2
  { night: 3, woman: 'tiziana', man: 'jeronymo', matchCount: 2 }, // 1 2
  { night: 3, woman: 'aurora', man: 'jerry', matchCount: 2 }, // neu
  { night: 3, woman: 'elena', man: 'meji', matchCount: 2 }, // 2
  { night: 3, woman: 'marla', man: 'luke', matchCount: 2 }, // 1 2
  { night: 3, woman: 'michelle', man: 'ema', matchCount: 2 }, // 1

  { night: 2, woman: 'alicia', man: 'julianm', matchCount: 2 }, // neu
  { night: 2, woman: 'toni', man: 'chris', matchCount: 2 }, // neu
  { night: 2, woman: 'linda', man: 'noel', matchCount: 2 }, // neu
  { night: 2, woman: 'adriana', man: 'julians', matchCount: 2 }, // neu
  { night: 2, woman: 'laura', man: 'evi', matchCount: 2 }, //
  { night: 2, woman: 'tiziana', man: 'jeronymo', matchCount: 2 }, //
  { night: 2, woman: 'michelle', man: 'jerry', matchCount: 2 }, // neu
  { night: 2, woman: 'elena', man: 'meji', matchCount: 2 }, // neu
  { night: 2, woman: 'marla', man: 'luke', matchCount: 2 }, // 
  { night: 2, woman: 'ella', man: 'ema', matchCount: 2 }, // neu

  { night: 1, woman: 'toni', man: 'noel', matchCount: 3 },
  { night: 1, woman: 'aurora', man: 'julians', matchCount: 3 },
  { night: 1, woman: 'linda', man: 'chris', matchCount: 3 },
  { night: 1, woman: 'adriana', man: 'julianm', matchCount: 3 },
  { night: 1, woman: 'laura', man: 'evi', matchCount: 3 },
  { night: 1, woman: 'tiziana', man: 'jeronymo', matchCount: 3 },
  { night: 1, woman: 'elena', man: 'jerry', matchCount: 3 },
  { night: 1, woman: 'michelle', man: 'ema', matchCount: 3 },
  { night: 1, woman: 'marla', man: 'luke', matchCount: 3 },
  { night: 1, woman: 'ella', man: 'meji', matchCount: 3 },
];

export {
  menCandidates,
  womenCandidates,
  matchboxResults,
  matchingNights,
  doubleMatchMan,
  doubleMatchWoman,
  excludedMen,
  excludedWomen
};
