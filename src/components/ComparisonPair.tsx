import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Anime } from '../types';
import { AnimeCard } from './AnimeCard';
import { theme } from '../styles/theme';

interface ComparisonPairProps {
  leftAnime: Anime;
  rightAnime: Anime;
  onSelect: (animeId: string) => void;
}

export const ComparisonPair: React.FC<ComparisonPairProps> = ({
  leftAnime,
  rightAnime,
  onSelect,
}) => {
  return (
    <View style={styles.container}>
      <AnimeCard anime={leftAnime} onSelect={onSelect} />
      <View style={styles.spacer} />
      <AnimeCard anime={rightAnime} onSelect={onSelect} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: theme.spacing.md,
  },
  spacer: {
    width: theme.spacing.md,
  },
});
