import {
  generateAllPairs,
  getNextComparison,
  recordChoice,
  calculateResults,
  areAllComparisonsComplete,
  getProgress,
} from '../comparisonEngine';
import { Anime, Comparison } from '../../types';

// Mock data for testing
const mockAnimeList: Anime[] = [
  {
    id: '1',
    title: 'Anime One',
    imageUrl: 'https://example.com/1.jpg',
    description: 'First anime',
  },
  {
    id: '2',
    title: 'Anime Two',
    imageUrl: 'https://example.com/2.jpg',
    description: 'Second anime',
  },
  {
    id: '3',
    title: 'Anime Three',
    imageUrl: 'https://example.com/3.jpg',
    description: 'Third anime',
  },
];

describe('generateAllPairs', () => {
  it('should generate correct number of pairs for n items', () => {
    const pairs = generateAllPairs(mockAnimeList);
    // For 3 items: n*(n-1)/2 = 3*2/2 = 3 pairs
    expect(pairs).toHaveLength(3);
  });

  it('should generate all unique pairs', () => {
    const pairs = generateAllPairs(mockAnimeList);
    const pairIds = pairs.map(p => p.id);

    expect(pairIds).toContain('1-vs-2');
    expect(pairIds).toContain('1-vs-3');
    expect(pairIds).toContain('2-vs-3');
  });

  it('should initialize all pairs as incomplete', () => {
    const pairs = generateAllPairs(mockAnimeList);
    expect(pairs.every(p => !p.completed)).toBe(true);
  });

  it('should return empty array for empty list', () => {
    const pairs = generateAllPairs([]);
    expect(pairs).toHaveLength(0);
  });

  it('should return empty array for single item', () => {
    const pairs = generateAllPairs([mockAnimeList[0]]);
    expect(pairs).toHaveLength(0);
  });

  it('should generate 10 pairs for 5 items', () => {
    const fiveItems = [
      ...mockAnimeList,
      { id: '4', title: 'Four', imageUrl: '', description: '' },
      { id: '5', title: 'Five', imageUrl: '', description: '' },
    ];
    const pairs = generateAllPairs(fiveItems);
    expect(pairs).toHaveLength(10); // 5*4/2 = 10
  });
});

describe('getNextComparison', () => {
  it('should return first incomplete comparison', () => {
    const comparisons: Comparison[] = [
      {
        id: '1-vs-2',
        leftAnime: mockAnimeList[0],
        rightAnime: mockAnimeList[1],
        completed: true,
        winnerId: '1',
      },
      {
        id: '1-vs-3',
        leftAnime: mockAnimeList[0],
        rightAnime: mockAnimeList[2],
        completed: false,
      },
      {
        id: '2-vs-3',
        leftAnime: mockAnimeList[1],
        rightAnime: mockAnimeList[2],
        completed: false,
      },
    ];

    const next = getNextComparison(comparisons);
    expect(next?.id).toBe('1-vs-3');
  });

  it('should return null when all comparisons are complete', () => {
    const comparisons: Comparison[] = [
      {
        id: '1-vs-2',
        leftAnime: mockAnimeList[0],
        rightAnime: mockAnimeList[1],
        completed: true,
        winnerId: '1',
      },
    ];

    const next = getNextComparison(comparisons);
    expect(next).toBeNull();
  });

  it('should return null for empty comparisons array', () => {
    const next = getNextComparison([]);
    expect(next).toBeNull();
  });
});

describe('recordChoice', () => {
  it('should mark comparison as completed with winner', () => {
    const comparisons: Comparison[] = [
      {
        id: '1-vs-2',
        leftAnime: mockAnimeList[0],
        rightAnime: mockAnimeList[1],
        completed: false,
      },
    ];

    const updated = recordChoice(comparisons, '1-vs-2', '1');

    expect(updated[0].completed).toBe(true);
    expect(updated[0].winnerId).toBe('1');
  });

  it('should only update the specified comparison', () => {
    const comparisons: Comparison[] = [
      {
        id: '1-vs-2',
        leftAnime: mockAnimeList[0],
        rightAnime: mockAnimeList[1],
        completed: false,
      },
      {
        id: '1-vs-3',
        leftAnime: mockAnimeList[0],
        rightAnime: mockAnimeList[2],
        completed: false,
      },
    ];

    const updated = recordChoice(comparisons, '1-vs-2', '1');

    expect(updated[0].completed).toBe(true);
    expect(updated[1].completed).toBe(false);
  });

  it('should not mutate original array', () => {
    const comparisons: Comparison[] = [
      {
        id: '1-vs-2',
        leftAnime: mockAnimeList[0],
        rightAnime: mockAnimeList[1],
        completed: false,
      },
    ];

    const updated = recordChoice(comparisons, '1-vs-2', '1');

    expect(comparisons[0].completed).toBe(false);
    expect(updated[0].completed).toBe(true);
  });
});

describe('calculateResults', () => {
  it('should correctly count wins and losses', () => {
    const comparisons: Comparison[] = [
      {
        id: '1-vs-2',
        leftAnime: mockAnimeList[0],
        rightAnime: mockAnimeList[1],
        completed: true,
        winnerId: '1',
      },
      {
        id: '1-vs-3',
        leftAnime: mockAnimeList[0],
        rightAnime: mockAnimeList[2],
        completed: true,
        winnerId: '1',
      },
      {
        id: '2-vs-3',
        leftAnime: mockAnimeList[1],
        rightAnime: mockAnimeList[2],
        completed: true,
        winnerId: '2',
      },
    ];

    const results = calculateResults(comparisons, mockAnimeList);

    const anime1Result = results.find(r => r.animeId === '1');
    const anime2Result = results.find(r => r.animeId === '2');
    const anime3Result = results.find(r => r.animeId === '3');

    expect(anime1Result?.wins).toBe(2);
    expect(anime1Result?.losses).toBe(0);
    expect(anime2Result?.wins).toBe(1);
    expect(anime2Result?.losses).toBe(1);
    expect(anime3Result?.wins).toBe(0);
    expect(anime3Result?.losses).toBe(2);
  });

  it('should calculate correct win rates', () => {
    const comparisons: Comparison[] = [
      {
        id: '1-vs-2',
        leftAnime: mockAnimeList[0],
        rightAnime: mockAnimeList[1],
        completed: true,
        winnerId: '1',
      },
      {
        id: '1-vs-3',
        leftAnime: mockAnimeList[0],
        rightAnime: mockAnimeList[2],
        completed: true,
        winnerId: '3',
      },
    ];

    const results = calculateResults(comparisons, mockAnimeList);

    const anime1Result = results.find(r => r.animeId === '1');
    expect(anime1Result?.winRate).toBe(0.5); // 1 win, 1 loss = 50%
  });

  it('should sort results by win rate descending', () => {
    const comparisons: Comparison[] = [
      {
        id: '1-vs-2',
        leftAnime: mockAnimeList[0],
        rightAnime: mockAnimeList[1],
        completed: true,
        winnerId: '1',
      },
      {
        id: '1-vs-3',
        leftAnime: mockAnimeList[0],
        rightAnime: mockAnimeList[2],
        completed: true,
        winnerId: '1',
      },
      {
        id: '2-vs-3',
        leftAnime: mockAnimeList[1],
        rightAnime: mockAnimeList[2],
        completed: true,
        winnerId: '2',
      },
    ];

    const results = calculateResults(comparisons, mockAnimeList);

    expect(results[0].animeId).toBe('1'); // 100% win rate
    expect(results[1].animeId).toBe('2'); // 50% win rate
    expect(results[2].animeId).toBe('3'); // 0% win rate
  });

  it('should handle incomplete comparisons', () => {
    const comparisons: Comparison[] = [
      {
        id: '1-vs-2',
        leftAnime: mockAnimeList[0],
        rightAnime: mockAnimeList[1],
        completed: true,
        winnerId: '1',
      },
      {
        id: '1-vs-3',
        leftAnime: mockAnimeList[0],
        rightAnime: mockAnimeList[2],
        completed: false,
      },
    ];

    const results = calculateResults(comparisons, mockAnimeList);

    expect(results).toHaveLength(3);
    expect(results.find(r => r.animeId === '1')?.wins).toBe(1);
  });

  it('should return zero win rate for items with no comparisons', () => {
    const comparisons: Comparison[] = [];
    const results = calculateResults(comparisons, mockAnimeList);

    expect(results.every(r => r.winRate === 0)).toBe(true);
  });
});

describe('areAllComparisonsComplete', () => {
  it('should return true when all comparisons are complete', () => {
    const comparisons: Comparison[] = [
      {
        id: '1-vs-2',
        leftAnime: mockAnimeList[0],
        rightAnime: mockAnimeList[1],
        completed: true,
        winnerId: '1',
      },
      {
        id: '1-vs-3',
        leftAnime: mockAnimeList[0],
        rightAnime: mockAnimeList[2],
        completed: true,
        winnerId: '1',
      },
    ];

    expect(areAllComparisonsComplete(comparisons)).toBe(true);
  });

  it('should return false when some comparisons are incomplete', () => {
    const comparisons: Comparison[] = [
      {
        id: '1-vs-2',
        leftAnime: mockAnimeList[0],
        rightAnime: mockAnimeList[1],
        completed: true,
        winnerId: '1',
      },
      {
        id: '1-vs-3',
        leftAnime: mockAnimeList[0],
        rightAnime: mockAnimeList[2],
        completed: false,
      },
    ];

    expect(areAllComparisonsComplete(comparisons)).toBe(false);
  });

  it('should return true for empty array', () => {
    expect(areAllComparisonsComplete([])).toBe(true);
  });
});

describe('getProgress', () => {
  it('should calculate correct progress', () => {
    const comparisons: Comparison[] = [
      {
        id: '1-vs-2',
        leftAnime: mockAnimeList[0],
        rightAnime: mockAnimeList[1],
        completed: true,
        winnerId: '1',
      },
      {
        id: '1-vs-3',
        leftAnime: mockAnimeList[0],
        rightAnime: mockAnimeList[2],
        completed: false,
      },
      {
        id: '2-vs-3',
        leftAnime: mockAnimeList[1],
        rightAnime: mockAnimeList[2],
        completed: false,
      },
    ];

    const progress = getProgress(comparisons);

    expect(progress.completed).toBe(1);
    expect(progress.total).toBe(3);
    expect(progress.percentage).toBeCloseTo(33.33, 1);
  });

  it('should return 100% when all complete', () => {
    const comparisons: Comparison[] = [
      {
        id: '1-vs-2',
        leftAnime: mockAnimeList[0],
        rightAnime: mockAnimeList[1],
        completed: true,
        winnerId: '1',
      },
    ];

    const progress = getProgress(comparisons);

    expect(progress.completed).toBe(1);
    expect(progress.total).toBe(1);
    expect(progress.percentage).toBe(100);
  });

  it('should return 0% for empty array', () => {
    const progress = getProgress([]);

    expect(progress.completed).toBe(0);
    expect(progress.total).toBe(0);
    expect(progress.percentage).toBe(0);
  });

  it('should return 0% when no comparisons complete', () => {
    const comparisons: Comparison[] = [
      {
        id: '1-vs-2',
        leftAnime: mockAnimeList[0],
        rightAnime: mockAnimeList[1],
        completed: false,
      },
    ];

    const progress = getProgress(comparisons);

    expect(progress.completed).toBe(0);
    expect(progress.total).toBe(1);
    expect(progress.percentage).toBe(0);
  });
});
