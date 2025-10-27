// Sample data structure for AYTO solver
// Replace with actual show data

const menCandidates = [
  'barkin',
  'burim',
  'chris',
  'deniz',
  'ken',
  'kenneth',
  'marwin',
  'pascal',
  'sasa',
  'joel',
  'max'
];

const womenCandidates = [
  'aurelia',
  'caro',
  'steffi',
  'valeria',
  'vanessa',
  'dorna',
  'juliette',
  'carina',
  'larissa',
  'henna'
];

// Matchbox results: confirmed matches and non-matches
const matchboxResults = [
  { man: 'ken', woman: 'caro', isMatch: true },
  { man: 'max', woman: 'caro', isMatch: true },
  { man: 'chris', woman: 'steffi', isMatch: true },
  { man: 'marwin', woman: 'dorna', isMatch: false },
  { man: 'joel', woman: 'aurelia', isMatch: false },
  { man: 'marwin', woman: 'valeria', isMatch: false },
  { man: 'burim', woman: 'dorna', isMatch: false },
  { man: 'kenneth', woman: 'dorna', isMatch: false },
  { man: 'joel', woman: 'juliette', isMatch: false },
  { man: 'burim', woman: 'carina', isMatch: false },
  { man: 'pascal', woman: 'carina', isMatch: false },

  // Add more confirmed results as they become available
];

// Matching night results
const matchingNights = [
  { night: 1, man: 'barkin', woman: 'caro', matchCount: 3 },
  { night: 2, man: 'barkin', woman: 'juliette', matchCount: 3 },
  { night: 3, man: 'barkin', woman: 'juliette', matchCount: 1 },
  { night: 5, man: 'barkin', woman: 'juliette', matchCount: 2 },
  { night: 6, man: 'barkin', woman: 'juliette', matchCount: 1 },
  { night: 7, man: 'barkin', woman: 'dorna', matchCount: 0 },

  { night: 1, man: 'burim', woman: 'juliette', matchCount: 3 },
  { night: 2, man: 'burim', woman: 'aurelia', matchCount: 3 },
  { night: 6, man: 'burim', woman: 'aurelia', matchCount: 1 },
  { night: 4, man: 'burim', woman: 'dorna', matchCount: 2 },
  { night: 5, man: 'burim', woman: 'dorna', matchCount: 2 },
  { night: 7, man: 'burim', woman: 'henna', matchCount: 0 },

  { night: 1, man: 'chris', woman: 'steffi', matchCount: 3 },
  { night: 2, man: 'chris', woman: 'steffi', matchCount: 3 },


  { night: 1, man: 'deniz', woman: 'aurelia', matchCount: 3 },
  { night: 7, man: 'deniz', woman: 'vanessa', matchCount: 0 },
  { night: 3, man: 'deniz', woman: 'dorna', matchCount: 1 },
  { night: 6, man: 'deniz', woman: 'dorna', matchCount: 1 },
  { night: 4, man: 'deniz', woman: 'larissa', matchCount: 2 },
  { night: 5, man: 'deniz', woman: 'larissa', matchCount: 2 },

  { night: 1, man: 'ken', woman: 'carina', matchCount: 3 },
  { night: 2, man: 'ken', woman: 'carina', matchCount: 3 },
  { night: 3, man: 'ken', woman: 'henna', matchCount: 1 },
  { night: 4, man: 'ken', woman: 'henna', matchCount: 2 },

  { night: 1, man: 'kenneth', woman: 'henna', matchCount: 3 },
  { night: 2, man: 'kenneth', woman: 'henna', matchCount: 3 },
  { night: 3, man: 'kenneth', woman: 'aurelia', matchCount: 1 },
  { night: 5, man: 'kenneth', woman: 'henna', matchCount: 2 },
  { night: 6, man: 'kenneth', woman: 'henna', matchCount: 1 },
  { night: 4, man: 'kenneth', woman: 'juliette', matchCount: 2 },
  { night: 7, man: 'kenneth', woman: 'juliette', matchCount: 0 },

  { night: 1, man: 'marwin', woman: 'dorna', matchCount: 3 },
  { night: 2, man: 'marwin', woman: 'dorna', matchCount: 3 },
  { night: 3, man: 'marwin', woman: 'vanessa', matchCount: 1 },
  { night: 4, man: 'marwin', woman: 'aurelia', matchCount: 2 },
  { night: 5, man: 'marwin', woman: 'aurelia', matchCount: 2 },
  { night: 6, man: 'marwin', woman: 'larissa', matchCount: 1 },
  { night: 7, man: 'marwin', woman: 'carina', matchCount: 0 },

  { night: 1, man: 'max', woman: 'valeria', matchCount: 3 },
  { night: 2, man: 'max', woman: 'caro', matchCount: 3 },
  { night: 3, man: 'max', woman: 'valeria', matchCount: 1 },
  { night: 4, man: 'max', woman: 'caro', matchCount: 2 },

  { night: 2, man: 'pascal', woman: 'valeria', matchCount: 3 }, 
  { night: 3, man: 'pascal', woman: 'caro', matchCount: 1 },
  { night: 4, man: 'pascal', woman: 'carina', matchCount: 2 },
  { night: 5, man: 'pascal', woman: 'carina', matchCount: 2 },
  { night: 6, man: 'pascal', woman: 'valeria', matchCount: 1 },
  { night: 7, man: 'pascal', woman: 'valeria', matchCount: 0 },

  { night: 1, man: 'sasa', woman: 'vanessa', matchCount: 3 },
  { night: 2, man: 'sasa', woman: 'vanessa', matchCount: 3 },
  { night: 3, man: 'sasa', woman: 'carina', matchCount: 1 },
  { night: 4, man: 'sasa', woman: 'vanessa', matchCount: 2 },
  { night: 5, man: 'sasa', woman: 'vanessa', matchCount: 2 },
  { night: 6, man: 'sasa', woman: 'carina', matchCount: 1 },
  { night: 7, man: 'sasa', woman: 'larissa', matchCount: 0 },

  { night: 1, man: 'joel', woman: 'larissa', matchCount: 3 },
  { night: 2, man: 'joel', woman: 'larissa', matchCount: 3 }, // ERR
  { night: 3, man: 'joel', woman: 'larissa', matchCount: 1 },
  { night: 4, man: 'joel', woman: 'valeria', matchCount: 2 }, 
  { night: 5, man: 'joel', woman: 'valeria', matchCount: 2 }, 
  { night: 6, man: 'joel', woman: 'vanessa', matchCount: 1 }, 
  { night: 7, man: 'joel', woman: 'aurelia', matchCount: 0 }, 

  { night: 8, woman: 'aurelia', men: 'marwin', matchCount: 0 },
  { night: 8, woman: 'valeria', men: 'burim', matchCount: 0 },
  { night: 8, woman: 'vanessa', men: 'sasa', matchCount: 0 },
  { night: 8, woman: 'dorna', men: 'joel', matchCount: 0 },
  { night: 8, woman: 'juliette', men: 'barkin', matchCount: 0 },
  { night: 8, woman: 'carina', men: 'kenneth', matchCount: 0 },
  { night: 8, woman: 'larissa', men: 'pascal', matchCount: 0 },
  { night: 8, woman: 'henna', men: 'deniz', matchCount: 0 },

  { night: 9, woman: 'aurelia', men: 'pascal', matchCount: 0 },
  { night: 9, woman: 'valeria', men: 'joel', matchCount: 0 },
  { night: 9, woman: 'vanessa', men: 'marwin', matchCount: 0 },
  { night: 9, woman: 'dorna', men: 'sasa', matchCount: 0 },
  { night: 9, woman: 'juliette', men: 'burim', matchCount: 0 },
  { night: 9, woman: 'carina', men: 'deniz', matchCount: 0 },
  { night: 9, woman: 'larissa', men: 'barkin', matchCount: 0 },
  { night: 9, woman: 'henna', men: 'kenneth', matchCount: 0 },
  
  // Add more nights as they occur
];

module.exports = {
  menCandidates,
  womenCandidates,
  matchboxResults,
  matchingNights
};