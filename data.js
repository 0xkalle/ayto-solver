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
  //{ man: 'kevin', woman: 'sandra', isMatch: false }, //verkauft
];

// Matching night results
const matchingNights = [
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