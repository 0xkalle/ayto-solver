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

### Phone UI (server)
```bash
npm start
```
Then open `http://<your-mac>.local:3000` on your phone (same Wi-Fi). The LAN URLs are printed on startup.
Env vars: `PORT` (default 3000), `SEASON` (default `seasons/current.json`), e.g. `SEASON=seasons/aytonormal.json npm start`.

API: `GET/PUT /api/data`, `GET /api/result`, `POST /api/what-if` (`{ "assumptions": [{ "man", "woman", "isMatch" }] }`).

### CLI
```bash
npm run cli                                # seasons/current.json
npm run cli -- seasons/reality_s4.json
```

## Data

Each season is a JSON file in `seasons/` (shape: `SeasonData` in `types.ts`):
`men`, `women`, `matchboxResults` (`{man, woman, isMatch}`), `matchingNights` (`{night, man, woman, matchCount}`, one entry per couple),
`doubleMatchMan`/`doubleMatchWoman`, `excludedMen`/`excludedWomen` (or `null`).

## File Structure

- `server.ts` - HTTP server + API for the phone UI (`public/`)
- `ayto-solver.ts` - `solve()` (multi-threaded) and CLI
- `worker.ts` - worker thread that checks a chunk of combinations
- `types.ts` - shared types
- `permutations.ts`, `validator.ts`, `probability.ts` - combination, constraint and probability helpers

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

## Notes

- All names should be lowercase in the data file
- The application requires exact match counts for matching nights
- More constraint data leads to better probability estimates
- Results update automatically when new data is added