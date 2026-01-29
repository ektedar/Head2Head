export interface Anime {
  id: string;
  title: string;
  imageUrl: string;
  description?: string;
}

export interface Comparison {
  id: string;
  leftAnime: Anime;
  rightAnime: Anime;
  completed: boolean;
  winnerId?: string;
}

export interface ComparisonResult {
  animeId: string;
  title: string;
  wins: number;
  losses: number;
  winRate: number;
}
