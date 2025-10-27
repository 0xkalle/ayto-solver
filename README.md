# AYTO Solver

A Node.js application that solves the "Are You The One?" game show using brute force probability analysis.

## Features

- **Brute Force Analysis**: Generates all possible perfect match combinations and filters them based on known constraints
- **Probability Calculation**: Uses Bayesian probability to rank the most likely perfect match combinations
- **Constraint Validation**: Validates combinations against:
  - Matchbox ceremony results (confirmed matches/non-matches)
  - Matching night outcomes (number of correct matches)
- **Individual Pair Analysis**: Shows probability for each potential man-woman pairing
- **Command Line Interface**: Easy to use with customizable output options

## Installation

1. Clone or download this repository
2. Navigate to the project directory
3. Install dependencies (if any are added later):
   ```bash
   npm install
   ```

## Usage

### Basic Usage
```bash
npm start
```
or
```bash
node ayto-solver.js
```

### Show Top N Results
```bash
node ayto-solver.js --top 5
```

## Configuration

Edit the `data.js` file to input your show's actual data:

### 1. Contestants
```javascript
const menCandidates = ['john', 'mike', 'alex', ...];
const womenCandidates = ['sarah', 'jessica', 'emma', ...];
```

### 2. Matchbox Results
```javascript
const matchboxResults = [
  { man: 'john', woman: 'sarah', isMatch: true },
  { man: 'mike', woman: 'emma', isMatch: false },
  // ... more results
];
```

### 3. Matching Night Results
```javascript
const matchingNights = [
  { night: 1, man: 'john', woman: 'jessica', matchCount: 3 },
  { night: 1, man: 'mike', woman: 'sarah', matchCount: 3 },
  // ... all pairings for night 1

  { night: 2, man: 'john', woman: 'sarah', matchCount: 2 },
  // ... all pairings for night 2
];
```

## File Structure

- `ayto-solver.js` - Main application and CLI interface
- `data.js` - Configuration file for contestants and results
- `permutations.js` - Utility functions for generating combinations
- `validator.js` - Constraint validation logic
- `probability.js` - Probability calculation engine

## How It Works

1. **Generate Combinations**: Creates all possible perfect match permutations (n!)
2. **Apply Constraints**: Filters combinations using matchbox and matching night constraints
3. **Calculate Probabilities**: Uses Bayesian probability to rank remaining combinations
4. **Display Results**: Shows most likely combinations and individual pair probabilities

## Algorithm Details

The solver uses:
- **Constraint Satisfaction**: Hard constraints from matchbox results eliminate impossible combinations
- **Bayesian Updates**: Soft constraints from matching nights update probability distributions
- **Brute Force Search**: Exhaustive enumeration ensures no valid combination is missed

## Example Output

```
🎯 AYTO SOLVER RESULTS
================================================================================

📊 SUMMARY:
   Total possible combinations: 40320
   Valid combinations: 7
   Elimination rate: 100.0%

🏆 TOP 5 MOST LIKELY PERFECT MATCH COMBINATIONS:
1. PROBABILITY: 14.29%
   Matches:
   • john ↔ sarah
   • mike ↔ jessica
   ...

💝 INDIVIDUAL PAIR PROBABILITIES:
1. john ↔ sarah: 100.00%
2. alex ↔ emma: 100.00%
...
```

## Notes

- All names should be lowercase in the data file
- The application requires exact match counts for matching nights
- More constraint data leads to better probability estimates
- Results update automatically when new data is added