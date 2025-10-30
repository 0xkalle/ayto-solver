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
  'max',
];

const doubleMatchMan = ['max', 'peter'];
const doubleMatchWoman = null;

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
  { man: 'mike', woman: 'kim', isMatch: false },
  { man: 'danilo', woman: 'daria', isMatch: true },
  { man: 'teezy', woman: 'alicia', isMatch: false },


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

  { night: 3, woman: 'paulina', man: 'mike', matchCount: 2 },
  { night: 3, woman: 'kim', man: 'teezy', matchCount: 2 },
  { night: 3, woman: 'daria', man: 'danilo', matchCount: 2 },
  { night: 3, woman: 'alicia', man: 'steffen', matchCount: 2 },
  { night: 3, woman: 'marie', man: 'elia', matchCount: 2 },
  { night: 3, woman: 'stefanie', man: 'marvin', matchCount: 2 },
  { night: 3, woman: 'sandra', man: 'paco', matchCount: 2 },
  { night: 3, woman: 'jenny', man: 'emanuell', matchCount: 2 },
  { night: 3, woman: 'sabrina', man: 'peter', matchCount: 2 },
  { night: 3, woman: 'shakira', man: 'fabio', matchCount: 2 },

  { night: 4, woman: 'paulina', man: 'max', matchCount: 4 },
  { night: 4, woman: 'kim', man: 'peter', matchCount: 4 },
  { night: 4, woman: 'daria', man: 'danilo', matchCount: 4 },
  { night: 4, woman: 'sandra', man: 'steffen', matchCount: 4 },
  { night: 4, woman: 'marie', man: 'elia', matchCount: 4 },
  { night: 4, woman: 'jenny', man: 'marvin', matchCount: 4 },
  { night: 4, woman: 'alicia', man: 'teezy', matchCount: 4 },
  { night: 4, woman: 'stefanie', man: 'emanuell', matchCount: 4 },
  { night: 4, woman: 'sabrina', man: 'paco', matchCount: 4 },
  { night: 4, woman: 'shakira', man: 'fabio', matchCount: 4 },

  // matched
  { night: 5, woman: 'daria', man: 'danilo', matchCount: 3 },
  // unsure
  { night: 5, woman: 'paulina', man: 'mike', matchCount: 3 }, //
  { night: 5, woman: 'kim', man: 'teezy', matchCount: 3 }, //
  { night: 5, woman: 'sandra', man: 'max', matchCount: 3 }, //
  { night: 5, woman: 'marie', man: 'fabio', matchCount: 3 }, //
  { night: 5, woman: 'jenny', man: 'marvin', matchCount: 3 }, //
  { night: 5, woman: 'alicia', man: 'steffen', matchCount: 3 }, //
  { night: 5, woman: 'stefanie', man: 'elia', matchCount: 3 }, //
  { night: 5, woman: 'sabrina', man: 'emanuell', matchCount: 3 }, //
  { night: 5, woman: 'shakira', man: 'paco', matchCount: 3 }, //

  // matched
  { night: 6, woman: 'daria', man: 'danilo', matchCount: 4 },
  // unsure 1
  { night: 6, woman: 'paulina', man: 'mike', matchCount: 4 },
  { night: 6, woman: 'kim', man: 'teezy', matchCount: 4 },
  { night: 6, woman: 'stefanie', man: 'emanuell', matchCount: 4 },
  { night: 6, woman: 'shakira', man: 'fabio', matchCount: 4 },
  { night: 6, woman: 'jenny', man: 'marvin', matchCount: 4 },
  { night: 6, woman: 'sandra', man: 'steffen', matchCount: 4 },
  { night: 6, woman: 'marie', man: 'elia', matchCount: 4 },
  { night: 6, woman: 'sabrina', man: 'peter', matchCount: 4 },
  { night: 6, woman: 'alicia', man: 'paco', matchCount: 4 },


];

module.exports = {
  menCandidates,
  womenCandidates,
  matchboxResults,
  matchingNights,
  doubleMatchMan,
  doubleMatchWoman
};