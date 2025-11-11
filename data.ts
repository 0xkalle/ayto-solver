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

const menCandidates: string[] = [
  'olli',
  'nico',
  'xander',
  'lennard',
  'calvinb',
  'sidar',
  'jonny',
  'calvinh',
  'rob',
  'kevin',
  'leandro',
  'jimi',
];

const doubleMatchMan: string | string[] | string[][] | null = ['jimi'];
const doubleMatchWoman: string | string[] | string[][] | null = null;

const excludedMen: string[] | null = ['lennard', 'xander'];
const excludedWomen: string[] | null = ['elli', 'sandra'];

const womenCandidates: string[] = [
  'elli',
  'henna',
  'joanna',
  'hati',
  'ariel',
  'beverly',
  'nelly',
  'antonia',
  'vicky',
  'sandra',
];

// Matchbox results: confirmed matches and non-matches
const matchboxResults: MatchboxResult[] = [
  //{ man: 'kevin', woman: 'sandra', isMatch: true }, //verkauft
  { man: 'xander', woman: 'elli', isMatch: true },
  { man: 'calvinb', woman: 'nelly', isMatch: false },
  { man: 'jonny', woman: 'beverly', isMatch: false },
  { man: 'leandro', woman: 'sandra', isMatch: false },
  { man: 'jimi', woman: 'nelly', isMatch: false },
  { man: 'lennard', woman: 'sandra', isMatch: true },
  { man: 'olli', woman: 'antonia', isMatch: false },
  { man: 'jimi', woman: 'hati', isMatch: false },
  { man: 'sidar', woman: 'henna', isMatch: false },
];

// Matching night results
const matchingNights: MatchingNight[] = [
  // confirmed
  { night: 7, woman: 'elli', man: 'xander', matchCount: 5 },
  { night: 7, woman: 'sandra', man: 'lennard', matchCount: 5 },
  // new
  { night: 7, woman: 'hati', man: 'jonny', matchCount: 5 }, // new
  { night: 7, woman: 'beverly', man: 'nico', matchCount: 5 }, // new
  { night: 7, woman: 'vicky', man: 'kevin', matchCount: 5 }, // new
  { night: 7, woman: 'ariel', man: 'leandro', matchCount: 5 }, // new
  { night: 7, woman: 'joanna', man: 'sidar', matchCount: 5 }, // same
  { night: 7, woman: 'nelly', man: 'rob', matchCount: 5 }, // new
  { night: 7, woman: 'antonia', man: 'calvinb', matchCount: 5 }, // same
  { night: 7, woman: 'henna', man: 'olli', matchCount: 5 }, // same

  // confirmed
  { night: 6, woman: 'elli', man: 'xander', matchCount: 4 },
  { night: 6, woman: 'sandra', man: 'lennard', matchCount: 4 },
  // new
  { night: 6, woman: 'vicky', man: 'jonny', matchCount: 4 }, //
  { night: 6, woman: 'hati', man: 'jimi', matchCount: 4 }, //
  { night: 6, woman: 'ariel', man: 'kevin', matchCount: 4 }, //
  { night: 6, woman: 'beverly', man: 'leandro', matchCount: 4 }, //
  { night: 6, woman: 'joanna', man: 'sidar', matchCount: 4 }, //
  { night: 6, woman: 'nelly', man: 'calvinh', matchCount: 4 }, //
  { night: 6, woman: 'antonia', man: 'calvinb', matchCount: 4 }, //
  { night: 6, woman: 'henna', man: 'olli', matchCount: 4 }, //
  // confirmed
  { night: 5, woman: 'elli', man: 'xander', matchCount: 4 },
  // new
  { night: 5, woman: 'vicky', man: 'kevin', matchCount: 4 }, //
  { night: 5, woman: 'hati', man: 'rob', matchCount: 4 },//
  { night: 5, woman: 'ariel', man: 'nico', matchCount: 4 }, //
  { night: 5, woman: 'beverly', man: 'sidar', matchCount: 4 }, //
  { night: 5, woman: 'joanna', man: 'calvinb', matchCount: 4 }, //
  { night: 5, woman: 'nelly', man: 'calvinh', matchCount: 4 }, //
  { night: 5, woman: 'antonia', man: 'olli', matchCount: 4 }, //
  { night: 5, woman: 'henna', man: 'jimi', matchCount: 4 }, //
  { night: 5, woman: 'sandra', man: 'lennard', matchCount: 4 }, //

  // confirmed
  { night: 4, woman: 'elli', man: 'xander', matchCount: 3 },
  // new
  { night: 4, woman: 'vicky', man: 'kevin', matchCount: 3 }, // changed
  { night: 4, woman: 'hati', man: 'rob', matchCount: 3 }, // same
  { night: 4, woman: 'ariel', man: 'nico', matchCount: 3 }, // changed
  { night: 4, woman: 'beverly', man: 'sidar', matchCount: 3 }, // changed
  { night: 4, woman: 'joanna', man: 'calvinb', matchCount: 3 }, // same
  { night: 4, woman: 'nelly', man: 'calvinh', matchCount: 3 }, // changed
  { night: 4, woman: 'antonia', man: 'olli', matchCount: 3 }, // same
  { night: 4, woman: 'henna', man: 'lennard', matchCount: 3 }, // changed
  { night: 4, woman: 'sandra', man: 'leandro', matchCount: 3 }, // changed

  // confirmed
  { night: 3, woman: 'elli', man: 'xander', matchCount: 2 },
  // new
  { night: 3, woman: 'vicky', man: 'jonny', matchCount: 2 }, // changed
  { night: 3, woman: 'hati', man: 'rob', matchCount: 2 }, // changed
  { night: 3, woman: 'ariel', man: 'calvinh', matchCount: 2 }, // changed
  { night: 3, woman: 'beverly', man: 'nico', matchCount: 2 }, // changed
  { night: 3, woman: 'joanna', man: 'calvinb', matchCount: 2 }, // same
  { night: 3, woman: 'nelly', man: 'lennard', matchCount: 2 }, // changed
  { night: 3, woman: 'antonia', man: 'olli', matchCount: 2 }, // changed
  { night: 3, woman: 'henna', man: 'leandro', matchCount: 2 }, // changed
  { night: 3, woman: 'sandra', man: 'kevin', matchCount: 2 }, // same

  // confirmed
  { night: 2, woman: 'elli', man: 'xander', matchCount: 2 },
  // new
  { night: 2, woman: 'henna', man: 'olli', matchCount: 2 }, // changed
  { night: 2, woman: 'joanna', man: 'calvinb', matchCount: 2 }, // changed
  { night: 2, woman: 'hati', man: 'calvinh', matchCount: 2 }, // same
  { night: 2, woman: 'ariel', man: 'nico', matchCount: 2 }, // same
  { night: 2, woman: 'beverly', man: 'sidar', matchCount: 2 }, // same
  { night: 2, woman: 'nelly', man: 'rob', matchCount: 2 }, // changed
  { night: 2, woman: 'antonia', man: 'jonny', matchCount: 2 }, // changed
  { night: 2, woman: 'vicky', man: 'leandro', matchCount: 2 }, // same
  { night: 2, woman: 'sandra', man: 'kevin', matchCount: 2 }, // same

  { night: 1, woman: 'elli', man: 'xander', matchCount: 2 },
  { night: 1, woman: 'henna', man: 'jonny', matchCount: 2 },
  { night: 1, woman: 'joanna', man: 'rob', matchCount: 2 },
  { night: 1, woman: 'hati', man: 'calvinh', matchCount: 2 },
  { night: 1, woman: 'ariel', man: 'nico', matchCount: 2 },
  { night: 1, woman: 'beverly', man: 'calvinb', matchCount: 2 },
  { night: 1, woman: 'nelly', man: 'sidar', matchCount: 2 },
  { night: 1, woman: 'antonia', man: 'lennard', matchCount: 2 },
  { night: 1, woman: 'vicky', man: 'leandro', matchCount: 2 },
  { night: 1, woman: 'sandra', man: 'kevin', matchCount: 2 },
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
