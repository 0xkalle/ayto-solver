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
  // { man: 'alexander', woman: 'anastasia', isMatch: false }, verkauft
  { man: 'marcrobin', woman: 'asena', isMatch: false },
  // { man: 'niko', woman: 'lauram', isMatch: false }, verkauft
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

  { night: 5, woman: 'emmy', man: 'chris', matchCount: 5 }, // RICHTIG
  { night: 5, woman: 'jennifer', man: 'lukas', matchCount: 5 }, // 1 5
  { night: 5, woman: 'laural', man: 'niko', matchCount: 5 }, // 3 5
  { night: 5, woman: 'dana', man: 'ozan', matchCount: 5 }, // 5
  { night: 5, woman: 'tara', man: 'kaan', matchCount: 5 }, // 5
  { night: 5, woman: 'asena', man: 'antonino', matchCount: 5 }, // 5
  { night: 5, woman: 'nadja', man: 'lars', matchCount: 5 }, // 1 5
  { night: 5, woman: 'anastasia', man: 'marcrobin', matchCount: 5 }, // 1 5
  { night: 5, woman: 'linda', man: 'tim', matchCount: 5 }, // 1 2 5
  { night: 5, woman: 'gabriela', man: 'alexander', matchCount: 5 }, // 5

  { night: 4, woman: 'emmy', man: 'chris', matchCount: 1 }, // RICHTIG
  { night: 4, woman: 'gabriela', man: 'lukas', matchCount: 1 }, // 4
  { night: 4, woman: 'anastasia', man: 'niko', matchCount: 1 }, // 4
  { night: 4, woman: 'lauram', man: 'ozan', matchCount: 1 }, // 3 4
  { night: 4, woman: 'asena', man: 'kaan', matchCount: 1 }, // 4
  { night: 4, woman: 'nadja', man: 'antonino', matchCount: 1 }, // 3 4
  { night: 4, woman: 'tara', man: 'lars', matchCount: 1 }, // 4
  { night: 4, woman: 'linda', man: 'marcrobin', matchCount: 1 }, // 4
  { night: 4, woman: 'laural', man: 'tim', matchCount: 1 }, // 4
  { night: 4, woman: 'jennifer', man: 'alexander', matchCount: 1 }, // 2 4

  { night: 3, woman: 'emmy', man: 'chris', matchCount: 3 }, // RICHTIG
  { night: 3, woman: 'linda', man: 'lukas', matchCount: 3 }, // 3
  { night: 3, woman: 'anastasia', man: 'alexander', matchCount: 3 }, // 3
  { night: 3, woman: 'lauram', man: 'ozan', matchCount: 3 }, // 3
  { night: 3, woman: 'dana', man: 'tim', matchCount: 3 }, // 3
  { night: 3, woman: 'nadja', man: 'antonino', matchCount: 3 }, // 3
  { night: 3, woman: 'gabriela', man: 'lars', matchCount: 3 }, // 3
  { night: 3, woman: 'asena', man: 'marcrobin', matchCount: 3 }, // 2 3
  { night: 3, woman: 'laural', man: 'niko', matchCount: 3 }, // 3
  { night: 3, woman: 'jennifer', man: 'kaan', matchCount: 3 }, // 3

  { night: 2, woman: 'emmy', man: 'chris', matchCount: 3 }, // RICHTIG
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
