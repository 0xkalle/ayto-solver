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

export type DoubleMatch = string | string[] | string[][] | null;

export interface SeasonData {
  men: string[];
  women: string[];
  matchboxResults: MatchboxResult[];
  matchingNights: MatchingNight[];
  doubleMatchMan: DoubleMatch;
  doubleMatchWoman: DoubleMatch;
  excludedMen: string[] | null;
  excludedWomen: string[] | null;
}
