// Sample data structure for AYTO solver
// Replace with actual show data

const menCandidates = [
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
];

const doubleMatchMan = null;
const doubleMatchWoman = null;

const womenCandidates = [
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
const matchboxResults = [
  //{ man: 'kevin', woman: 'sandra', isMatch: true }, //verkauft
  { man: 'xander', woman: 'elli', isMatch: true },
  { man: 'calvinb', woman: 'nelly', isMatch: false },
  { man: 'jonny', woman: 'beverly', isMatch: false },
];

// Matching night results
const matchingNights = [
  // confirmed
  { night: 4, woman: 'elli', man: 'xander', matchCount: 2 },
  // new
  { night: 4, woman: 'vicky', man: 'jonny', matchCount: 2 },
  { night: 4, woman: 'hati', man: 'rob', matchCount: 2 },
  { night: 4, woman: 'ariel', man: 'calvinh', matchCount: 2 },
  { night: 4, woman: 'beverly', man: 'nico', matchCount: 2 },
  { night: 4, woman: 'joanna', man: 'calvinb', matchCount: 2 },
  { night: 4, woman: 'nelly', man: 'lennard', matchCount: 2 },
  { night: 3, woman: 'antonia', man: 'olli', matchCount: 2 },
  { night: 4, woman: 'henna', man: 'leandro', matchCount: 2 },
  { night: 4, woman: 'sandra', man: 'kevin', matchCount: 2 },

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

module.exports = {
  menCandidates,
  womenCandidates,
  matchboxResults,
  matchingNights,
  doubleMatchMan,
  doubleMatchWoman
};