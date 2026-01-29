import { Anime, Comparison, ComparisonResult } from '../types';

/**
 * Generate all possible unique pairs from the anime list
 * For n anime, this creates n*(n-1)/2 comparisons
 */
export const generateAllPairs = (animeList: Anime[]): Comparison[] => {
  const pairs: Comparison[] = [];

  for (let i = 0; i < animeList.length; i++) {
    for (let j = i + 1; j < animeList.length; j++) {
      pairs.push({
        id: `${animeList[i].id}-vs-${animeList[j].id}`,
        leftAnime: animeList[i],
        rightAnime: animeList[j],
        completed: false,
      });
    }
  }

  return pairs;
};

/**
 * Get the next incomplete comparison
 * Returns null if all comparisons are complete
 */
export const getNextComparison = (comparisons: Comparison[]): Comparison | null => {
  const nextComparison = comparisons.find(c => !c.completed);
  return nextComparison || null;
};

/**
 * Record a user's choice for a comparison
 * Returns updated comparisons array
 */
export const recordChoice = (
  comparisons: Comparison[],
  comparisonId: string,
  winnerId: string
): Comparison[] => {
  return comparisons.map(comparison => {
    if (comparison.id === comparisonId) {
      return {
        ...comparison,
        completed: true,
        winnerId,
      };
    }
    return comparison;
  });
};

/**
 * Calculate final results from all comparisons
 * Returns sorted array with winners at the top
 */
export const calculateResults = (
  comparisons: Comparison[],
  animeList: Anime[]
): ComparisonResult[] => {
  // Initialize results for each anime
  const resultsMap = new Map<string, ComparisonResult>();

  animeList.forEach(anime => {
    resultsMap.set(anime.id, {
      animeId: anime.id,
      title: anime.title,
      wins: 0,
      losses: 0,
      winRate: 0,
    });
  });

  // Count wins and losses
  comparisons.forEach(comparison => {
    if (comparison.completed && comparison.winnerId) {
      const winner = resultsMap.get(comparison.winnerId);
      const loserId = comparison.winnerId === comparison.leftAnime.id
        ? comparison.rightAnime.id
        : comparison.leftAnime.id;
      const loser = resultsMap.get(loserId);

      if (winner) {
        winner.wins++;
      }
      if (loser) {
        loser.losses++;
      }
    }
  });

  // Calculate win rates and convert to array
  const results = Array.from(resultsMap.values()).map(result => {
    const totalGames = result.wins + result.losses;
    return {
      ...result,
      winRate: totalGames > 0 ? result.wins / totalGames : 0,
    };
  });

  // Sort by win rate (descending), then by wins
  return results.sort((a, b) => {
    if (b.winRate !== a.winRate) {
      return b.winRate - a.winRate;
    }
    return b.wins - a.wins;
  });
};

/**
 * Check if all comparisons are complete
 */
export const areAllComparisonsComplete = (comparisons: Comparison[]): boolean => {
  return comparisons.every(c => c.completed);
};

/**
 * Get progress information
 */
export const getProgress = (comparisons: Comparison[]): {
  completed: number;
  total: number;
  percentage: number;
} => {
  const completed = comparisons.filter(c => c.completed).length;
  const total = comparisons.length;
  const percentage = total > 0 ? (completed / total) * 100 : 0;

  return { completed, total, percentage };
};
