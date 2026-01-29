import React, { useReducer, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Comparison, ComparisonResult } from '../types';
import { ComparisonPair } from '../components/ComparisonPair';
import { ANIME_LIST } from '../data/animeData';
import {
  generateAllPairs,
  getNextComparison,
  recordChoice,
  calculateResults,
  areAllComparisonsComplete,
  getProgress,
} from '../utils/comparisonEngine';
import { theme } from '../styles/theme';

interface ComparisonScreenProps {
  onComplete: (results: ComparisonResult[]) => void;
}

interface ComparisonState {
  comparisons: Comparison[];
  currentComparison: Comparison | null;
}

type ComparisonAction =
  | { type: 'INITIALIZE'; comparisons: Comparison[] }
  | { type: 'RECORD_CHOICE'; winnerId: string };

const comparisonReducer = (
  state: ComparisonState,
  action: ComparisonAction
): ComparisonState => {
  switch (action.type) {
    case 'INITIALIZE':
      return {
        comparisons: action.comparisons,
        currentComparison: getNextComparison(action.comparisons),
      };

    case 'RECORD_CHOICE': {
      if (!state.currentComparison) return state;

      const updatedComparisons = recordChoice(
        state.comparisons,
        state.currentComparison.id,
        action.winnerId
      );

      return {
        comparisons: updatedComparisons,
        currentComparison: getNextComparison(updatedComparisons),
      };
    }

    default:
      return state;
  }
};

export const ComparisonScreen: React.FC<ComparisonScreenProps> = ({ onComplete }) => {
  const [state, dispatch] = useReducer(comparisonReducer, {
    comparisons: [],
    currentComparison: null,
  });

  useEffect(() => {
    const comparisons = generateAllPairs(ANIME_LIST);
    dispatch({ type: 'INITIALIZE', comparisons });
  }, []);

  useEffect(() => {
    if (areAllComparisonsComplete(state.comparisons) && state.comparisons.length > 0) {
      const results = calculateResults(state.comparisons, ANIME_LIST);
      onComplete(results);
    }
  }, [state.comparisons, onComplete]);

  const handleSelect = (animeId: string) => {
    dispatch({ type: 'RECORD_CHOICE', winnerId: animeId });
  };

  if (!state.currentComparison) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const progress = getProgress(state.comparisons);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.topic}>Which Anime is Better?</Text>
        <Text style={styles.progress}>
          {progress.completed + 1} of {progress.total}
        </Text>
      </View>

      <View style={styles.comparisonContainer}>
        <ComparisonPair
          leftAnime={state.currentComparison.leftAnime}
          rightAnime={state.currentComparison.rightAnime}
          onSelect={handleSelect}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.md,
    alignItems: 'center',
  },
  topic: {
    ...theme.typography.title,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  progress: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
  },
  comparisonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
  },
});
