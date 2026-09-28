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
const doubleMatchWoman: string | string[] | string[][] | null = ['desire'];
const doubleMatchMan: string | string[] | string[][] | null = null;

const excludedMen: string[] | null = null;
const excludedWomen: string[] | null = null;

// Matchbox results: confirmed matches and non-matches
const matchboxResults: MatchboxResult[] = [
  { man: 'mike', woman: 'jessica', isMatch: false },
  { man: 'leon', woman: 'monamie', isMatch: false },
  { man: 'andre', woman: 'raphaela', isMatch: false },
  // { man: 'william', woman: 'dana', isMatch: false }, verkauft
  { man: 'antonino', woman: 'monamie', isMatch: false },
  { man: 'max', woman: 'jessica', isMatch: false },
  { man: 'marius', woman: 'zaira', isMatch: true },
  { man: 'antonino', woman: 'dana', isMatch: true },
];

const womenCandidates: string[] = [
  'marie',
  'dana',
  'raphaela',
  'zaira',
  'jessica',
  'monamie',
  'kerstin',
  'isabelle',
  'estelle',
  'joelina',
  'desire',
];

const menCandidates: string[] = [
  'antonino',
  'marius', // marie
  'andre',
  'jordi',
  'mike',
  'william',
  'tim',
  'max',
  'leon',
  'dustin',
];

// Matching night results
const matchingNights: MatchingNight[] = [

  { night: 1, woman: 'jessica', man: 'leon', matchCount: 3 },
  { night: 1, woman: 'joelina', man: 'mike', matchCount: 3 },
  { night: 1, woman: 'kerstin', man: 'max', matchCount: 3 },
  { night: 1, woman: 'monamie', man: 'antonino', matchCount: 3 },
  { night: 1, woman: 'marie', man: 'tim', matchCount: 3 },
  { night: 1, woman: 'zaira', man: 'dustin', matchCount: 3 },
  { night: 1, woman: 'dana', man: 'william', matchCount: 3 },
  { night: 1, woman: 'isabelle', man: 'marius', matchCount: 3 },
  { night: 1, woman: 'raphaela', man: 'andre', matchCount: 3 },
  { night: 1, woman: 'estelle', man: 'jordi', matchCount: 3 },

  { night: 2, woman: 'estelle', man: 'leon', matchCount: 2 },
  { night: 2, woman: 'joelina', man: 'mike', matchCount: 2 }, // 2
  { night: 2, woman: 'kerstin', man: 'max', matchCount: 2 }, // 2
  { night: 2, woman: 'monamie', man: 'antonino', matchCount: 2 }, // 2
  { night: 2, woman: 'jessica', man: 'tim', matchCount: 2 },
  { night: 2, woman: 'isabelle', man: 'dustin', matchCount: 2 },
  { night: 2, woman: 'raphaela', man: 'william', matchCount: 2 },
  { night: 2, woman: 'marie', man: 'marius', matchCount: 2 },
  { night: 2, woman: 'dana', man: 'andre', matchCount: 2 },
  { night: 2, woman: 'zaira', man: 'jordi', matchCount: 2 },

  { night: 3, woman: 'jessica', man: 'jordi', matchCount: 2 },
  { night: 3, woman: 'joelina', man: 'mike', matchCount: 2 }, // 2
  { night: 3, woman: 'kerstin', man: 'antonino', matchCount: 2 }, // 2
  { night: 3, woman: 'monamie', man: 'max', matchCount: 2 }, // 2
  { night: 3, woman: 'marie', man: 'tim', matchCount: 2 },
  { night: 3, woman: 'zaira', man: 'dustin', matchCount: 2 },
  { night: 3, woman: 'dana', man: 'william', matchCount: 2 },
  { night: 3, woman: 'isabelle', man: 'marius', matchCount: 2 },
  { night: 3, woman: 'raphaela', man: 'andre', matchCount: 2 },
  { night: 3, woman: 'estelle', man: 'leon', matchCount: 2 },

  { night: 4, woman: 'raphaela', man: 'jordi', matchCount: 3 },//
  { night: 4, woman: 'joelina', man: 'mike', matchCount: 3 }, //
  { night: 4, woman: 'monamie', man: 'antonino', matchCount: 3 }, //
  { night: 4, woman: 'marie', man: 'max', matchCount: 3 }, //
  { night: 4, woman: 'kerstin', man: 'tim', matchCount: 3 }, //
  { night: 4, woman: 'zaira', man: 'dustin', matchCount: 3 },//
  { night: 4, woman: 'dana', man: 'william', matchCount: 3 }, //
  { night: 4, woman: 'jessica', man: 'marius', matchCount: 3 }, //
  { night: 4, woman: 'isabelle', man: 'andre', matchCount: 3 }, //
  { night: 4, woman: 'estelle', man: 'leon', matchCount: 3 }, //

  { night: 5, woman: 'raphaela', man: 'marius', matchCount: 2 }, //
  { night: 5, woman: 'joelina', man: 'andre', matchCount: 2 }, //
  { night: 5, woman: 'monamie', man: 'max', matchCount: 2 }, //
  { night: 5, woman: 'kerstin', man: 'antonino', matchCount: 2 }, //
  { night: 5, woman: 'desire', man: 'tim', matchCount: 2 }, //
  { night: 5, woman: 'zaira', man: 'jordi', matchCount: 2 }, //
  { night: 5, woman: 'dana', man: 'william', matchCount: 2 }, //
  { night: 5, woman: 'jessica', man: 'leon', matchCount: 2 }, //
  { night: 5, woman: 'isabelle', man: 'dustin', matchCount: 2 }, //
  { night: 5, woman: 'estelle', man: 'mike', matchCount: 2 }, //

  { night: 6, woman: 'zaira', man: 'marius', matchCount: 4 }, //
  { night: 6, woman: 'marie', man: 'andre', matchCount: 4 }, //
  { night: 6, woman: 'kerstin', man: 'max', matchCount: 4 }, //
  { night: 6, woman: 'dana', man: 'antonino', matchCount: 4 }, //
  { night: 6, woman: 'joelina', man: 'tim', matchCount: 4 }, //
  { night: 6, woman: 'desire', man: 'jordi', matchCount: 4 }, //
  { night: 6, woman: 'raphaela', man: 'william', matchCount: 4 }, //
  { night: 6, woman: 'jessica', man: 'leon', matchCount: 4 }, //
  { night: 6, woman: 'isabelle', man: 'dustin', matchCount: 4 }, // X
  { night: 6, woman: 'estelle', man: 'mike', matchCount: 4 }, //
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
