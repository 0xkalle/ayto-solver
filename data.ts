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
const doubleMatchWoman: string | string[] | string[][] | null = ['dana'];
const doubleMatchMan: string | string[] | string[][] | null = null;

const excludedMen: string[] | null = ['chris'];
const excludedWomen: string[] | null = ['emmy'];

const womenCandidates: string[] = [
  'tara',
  'emmy',
  'asena',
  'laural', // laura blond
  'gabriela',
  'anastasia',
  'nadja',
  'jennifer',
  'linda',
  'lauram',
  'dana',
];

// Matchbox results: confirmed matches and non-matches
const matchboxResults: MatchboxResult[] = [
  { man: 'marcrobin', woman: 'laural', isMatch: false },
  { man: 'chris', woman: 'emmy', isMatch: true },
];

const menCandidates: string[] = [
  'antonino',
  'chris',
  'lukas',
  'alexander',
  'tim',
  'ozan',
  'marcrobin',
  'kaan',
  'niko',
  'lars'
];

// Matching night results
const matchingNights: MatchingNight[] = [

  { night: 2, woman: 'chris', man: 'emmy', matchCount: 3 }, // RICHTIG
  { night: 2, woman: 'lauram', man: 'lukas', matchCount: 3 }, // 2
  { night: 2, woman: 'jennifer', man: 'alexander', matchCount: 3 }, // 2
  { night: 2, woman: 'laural', man: 'ozan', matchCount: 3 }, // 2
  { night: 2, woman: 'linda', man: 'tim', matchCount: 3 }, // 1 2
  { night: 2, woman: 'dana', man: 'antonino', matchCount: 3 }, // 2
  { night: 2, woman: 'anastasia', man: 'lars', matchCount: 3 }, // 2
  { night: 2, woman: 'asena', man: 'marcrobin', matchCount: 3 }, // 2
  { night: 2, woman: 'tara', man: 'niko', matchCount: 3 }, // 1 2
  { night: 2, woman: 'nadja', man: 'kaan', matchCount: 3 }, // 2

  { night: 1, woman: 'lauram', man: 'antonino', matchCount: 2 },
  { night: 1, woman: 'emmy', man: 'chris', matchCount: 2 },
  { night: 1, woman: 'jennifer', man: 'lukas', matchCount: 2 },
  { night: 1, woman: 'laural', man: 'alexander', matchCount: 2 },
  { night: 1, woman: 'linda', man: 'tim', matchCount: 2 },
  { night: 1, woman: 'gabriela', man: 'ozan', matchCount: 2 },
  { night: 1, woman: 'anastasia', man: 'marcrobin', matchCount: 2 },
  { night: 1, woman: 'asena', man: 'kaan', matchCount: 2 },
  { night: 1, woman: 'tara', man: 'niko', matchCount: 2 },
  { night: 1, woman: 'nadja', man: 'lars', matchCount: 2 },
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
