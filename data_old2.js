// Sample data structure for AYTO solver
// Replace with actual show data

const menCandidates = [
  'alex',
  'danilo',
  'diogo',
  'eugen',
  'jamie',
  'josua',
  'manuel',
  'salvatore',
  'tommy',
  'francesco',
];

const womenCandidates = [
  'aurelia',
  'jules',
  'finnja',
  'jacky',
  'jill',
  'kathleen',
  'melina',
  'sarah',
  'steffi',
  'walentina',
  'vanessa',
];

// Matchbox results: confirmed matches and non-matches
const matchboxResults = [
  { man: 'danilo', woman: 'finnja', isMatch: false },
  { man: 'francesco', woman: 'jules', isMatch: true },
  { man: 'tommy', woman: 'walentina', isMatch: false },
  //{ man: 'diogo', woman: 'aurelia', isMatch:  },
  { man: 'tommy', woman: 'melina', isMatch: false },
  { man: 'salvatore', woman: 'finnja', isMatch: false },
  { man: 'eugen', woman: 'finnja', isMatch: false },
  { man: 'eugen', woman: 'steffi', isMatch: false },
  { man: 'josua', woman: 'sarah', isMatch: false },
  { man: 'josua', woman: 'aurelia', isMatch: true },


  // Add more confirmed results as they become available
];

// Matching night results
const matchingNights = [
  { night: 1, woman: 'aurelia', man: 'diogo', matchCount: 3 },
  { night: 1, woman: 'jules', man: 'alex', matchCount: 3 },
  { night: 1, woman: 'finnja', man: 'francesco', matchCount: 3 },
  { night: 1, woman: 'jacky', man: 'salvatore', matchCount: 3 },
  { night: 1, woman: 'jill', man: 'jamie', matchCount: 3 },
  { night: 1, woman: 'kathleen', man: 'manuel', matchCount: 3 },
  { night: 1, woman: 'melina', man: 'tommy', matchCount: 3 },
  { night: 1, woman: 'sarah', man: 'josua', matchCount: 3 },
  { night: 1, woman: 'steffi', man: 'danilo', matchCount: 3 },
  { night: 1, woman: 'walentina', man: 'eugen', matchCount: 3 },

  // MATCH
  { night: 2, woman: 'jules', man: 'francesco', matchCount: 3 },
  // to check
  { night: 2, woman: 'aurelia', man: 'diogo', matchCount: 3 },
  { night: 2, woman: 'finnja', man: 'alex', matchCount: 3 },
  { night: 2, woman: 'jacky', man: 'salvatore', matchCount: 3 },
  { night: 2, woman: 'jill', man: 'jamie', matchCount: 3 },
  { night: 2, woman: 'kathleen', man: 'manuel', matchCount: 3 },
  { night: 2, woman: 'melina', man: 'tommy', matchCount: 3 },
  { night: 2, woman: 'sarah', man: 'danilo', matchCount: 3 },
  { night: 2, woman: 'steffi', man: 'eugen', matchCount: 3 },
  { night: 2, woman: 'walentina', man: 'josua', matchCount: 3 },
  
  
  // MATCH
  { night: 3, woman: 'jules', man: 'francesco', matchCount: 4 },
  // to check
  { night: 3, woman: 'aurelia', man: 'diogo', matchCount: 4 },
  { night: 3, woman: 'steffi', man: 'alex', matchCount: 4 },
  { night: 3, woman: 'walentina', man: 'salvatore', matchCount: 4 },
  { night: 3, woman: 'vanessa', man: 'jamie', matchCount: 4 },
  { night: 3, woman: 'kathleen', man: 'manuel', matchCount: 4 },
  { night: 3, woman: 'jill', man: 'tommy', matchCount: 4 },
  { night: 3, woman: 'melina', man: 'danilo', matchCount: 4 },
  { night: 3, woman: 'finnja', man: 'eugen', matchCount: 4 },
  { night: 3, woman: 'sarah', man: 'josua', matchCount: 4 },

  // MATCH
  { night: 4, woman: 'jules', man: 'francesco', matchCount: 3 },
  // to check
  { night: 4, woman: 'aurelia', man: 'danilo', matchCount: 3 },
  { night: 4, woman: 'steffi', man: 'jamie', matchCount: 3 },
  { night: 4, woman: 'walentina', man: 'josua', matchCount: 3 },
  { night: 4, woman: 'vanessa', man: 'diogo', matchCount: 3 },
  { night: 4, woman: 'kathleen', man: 'salvatore', matchCount: 3 },
  { night: 4, woman: 'jill', man: 'manuel', matchCount: 3 },
  { night: 4, woman: 'melina', man: 'tommy', matchCount: 3 },
  { night: 4, woman: 'finnja', man: 'eugen', matchCount: 3 },
  { night: 4, woman: 'sarah', man: 'alex', matchCount: 3 },

  // 5
  // MATCH
  { night: 5, woman: 'jules', man: 'francesco', matchCount: 3 },
  // to check
  { night: 5, woman: 'jill', man: 'danilo', matchCount: 3 },
  { night: 5, woman: 'sarah', man: 'jamie', matchCount: 3 },
  { night: 5, woman: 'walentina', man: 'josua', matchCount: 3 },
  { night: 5, woman: 'aurelia', man: 'diogo', matchCount: 3 },
  { night: 5, woman: 'jacky', man: 'salvatore', matchCount: 3 },
  { night: 5, woman: 'kathleen', man: 'manuel', matchCount: 3 },
  { night: 5, woman: 'melina', man: 'tommy', matchCount: 3 },
  { night: 5, woman: 'finnja', man: 'eugen', matchCount: 3 },
  { night: 5, woman: 'steffi', man: 'alex', matchCount: 3 },

  // 6
  { night: 6, woman: 'jules', man: 'francesco', matchCount: 2 },
  // to check
  { night: 6, woman: 'jill', man: 'eugen', matchCount: 2 },
  { night: 6, woman: 'sarah', man: 'josua', matchCount: 2 },
  { night: 6, woman: 'walentina', man: 'salvatore', matchCount: 2 },
  { night: 6, woman: 'aurelia', man: 'danilo', matchCount: 2 },
  { night: 6, woman: 'jacky', man: 'alex', matchCount: 2 },
  { night: 6, woman: 'kathleen', man: 'manuel', matchCount: 2 },
  { night: 6, woman: 'finnja', man: 'jamie', matchCount: 2 },
  { night: 6, woman: 'vanessa', man: 'diogo', matchCount: 2 },
  { night: 6, woman: 'melina', man: 'tommy', matchCount: 2 },

  // 7
  { night: 7, woman: 'jules', man: 'francesco', matchCount: 1 },
  // to check
  { night: 7, woman: 'jacky', man: 'eugen', matchCount: 1 },
  { night: 7, woman: 'walentina', man: 'josua', matchCount: 1 },
  { night: 7, woman: 'jill', man: 'salvatore', matchCount: 1 },
  { night: 7, woman: 'aurelia', man: 'danilo', matchCount: 1 },
  { night: 7, woman: 'melina', man: 'alex', matchCount: 1 },
  { night: 7, woman: 'finnja', man: 'manuel', matchCount: 1 },
  { night: 7, woman: 'sarah', man: 'jamie', matchCount: 1 },
  { night: 7, woman: 'vanessa', man: 'diogo', matchCount: 1 },
  { night: 7, woman: 'steffi', man: 'tommy', matchCount: 1 },

  // 8
  { night: 8, woman: 'jules', man: 'francesco', matchCount: 4 },
  // to check
  { night: 8, woman: 'walentina', man: 'salvatore', matchCount: 4 },
  { night: 8, woman: 'vanessa', man: 'josua', matchCount: 4 },
  { night: 8, woman: 'jill', man: 'danilo', matchCount: 4 },
  { night: 8, woman: 'aurelia', man: 'diogo', matchCount: 4 },
  { night: 8, woman: 'melina', man: 'eugen', matchCount: 4 },
  { night: 8, woman: 'kathleen', man: 'manuel', matchCount: 4 },
  { night: 8, woman: 'sarah', man: 'alex', matchCount: 4 },
  { night: 8, woman: 'finnja', man: 'tommy', matchCount: 4 },
  { night: 8, woman: 'steffi', man: 'jamie', matchCount: 4 },
];

module.exports = {
  menCandidates,
  womenCandidates,
  matchboxResults,
  matchingNights
};