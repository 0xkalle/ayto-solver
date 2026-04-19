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
const doubleMatchWoman: string | string[] | string[][] | null = null;
const doubleMatchMan: string | string[] | string[][] | null = null;

const excludedMen: string[] | null = null;
const excludedWomen: string[] | null = null;

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
