// Sample data structure for AYTO solver
// Replace with actual show data

const menCandidates = [
  'mike',
  'danilo',
  'paco',
  'marvin',
  'fabio',
  'emanuell',
  'steffen',
  'teezy',
  'elia',
  'peter',
];

const womenCandidates = [
  'sabrina',
  'paulina',
  'marie',
  'shakira',
  'jenny',
  'stefanie',
  'kim',
  'sandra',
  'daria',
  'alicia',
];

// Matchbox results: confirmed matches and non-matches
const matchboxResults = [
  { man: 'danilo', woman: 'jenny', isMatch: false },
  { man: 'elia', woman: 'jenny', isMatch: false },
  { man: 'elia', woman: 'daria', isMatch: false },


  // Add more confirmed results as they become available
];

// Matching night results
const matchingNights = [
  { night: 1, woman: 'daria', man: 'danilo', matchCount: 3 },
  { night: 1, woman: 'sandra', man: 'paco', matchCount: 3 },
  { night: 1, woman: 'sabrina', man: 'emanuell', matchCount: 3 },
  { night: 1, woman: 'paulina', man: 'steffen', matchCount: 3 },
  { night: 1, woman: 'marie', man: 'fabio', matchCount: 3 },
  { night: 1, woman: 'shakira', man: 'marvin', matchCount: 3 },
  { night: 1, woman: 'jenny', man: 'elia', matchCount: 3 },
  { night: 1, woman: 'stefanie', man: 'teezy', matchCount: 3 },
  { night: 1, woman: 'kim', man: 'mike', matchCount: 3 },
  { night: 1, woman: 'alicia', man: 'peter', matchCount: 3 },

  { night: 2, woman: 'paulina', man: 'danilo', matchCount: 2 },
  { night: 2, woman: 'kim', man: 'paco', matchCount: 2 },
  { night: 2, woman: 'daria', man: 'emanuell', matchCount: 2 },
  { night: 2, woman: 'alicia', man: 'steffen', matchCount: 2 },
  { night: 2, woman: 'marie', man: 'fabio', matchCount: 2 },
  { night: 2, woman: 'stefanie', man: 'teezy', matchCount: 2 },
  { night: 2, woman: 'sandra', man: 'elia', matchCount: 2 },
  { night: 2, woman: 'jenny', man: 'marvin', matchCount: 2 },
  { night: 2, woman: 'sabrina', man: 'mike', matchCount: 2 },
  { night: 2, woman: 'shakira', man: 'peter', matchCount: 2 },
];

module.exports = {
  menCandidates,
  womenCandidates,
  matchboxResults,
  matchingNights
};