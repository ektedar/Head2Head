import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Pressable,
} from 'react-native';
import { ComparisonResult } from '../types';
import { theme } from '../styles/theme';

interface ResultsScreenProps {
  results: ComparisonResult[];
  onRestart: () => void;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({
  results,
  onRestart,
}) => {
  const renderItem = ({ item, index }: { item: ComparisonResult; index: number }) => {
    const rank = index + 1;
    const winPercentage = Math.round(item.winRate * 100);

    return (
      <View style={styles.resultItem}>
        <View style={styles.rankContainer}>
          <Text style={styles.rank}>#{rank}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.stats}>
            {item.wins}W - {item.losses}L ({winPercentage}%)
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Final Rankings</Text>
        <Text style={styles.headerSubtitle}>
          Based on your {results.length > 0 ? results[0].wins + results[0].losses : 0} comparisons
        </Text>
      </View>

      <FlatList
        data={results}
        renderItem={renderItem}
        keyExtractor={(item) => item.animeId}
        contentContainerStyle={styles.listContent}
      />

      <View style={styles.footer}>
        <Pressable
          onPress={onRestart}
          style={({ pressed }) => [
            styles.restartButton,
            pressed && styles.restartButtonPressed,
          ]}
        >
          <Text style={styles.restartButtonText}>Start Over</Text>
        </Pressable>
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
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  headerTitle: {
    ...theme.typography.title,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  headerSubtitle: {
    ...theme.typography.small,
    color: theme.colors.textSecondary,
  },
  listContent: {
    padding: theme.spacing.md,
  },
  resultItem: {
    flexDirection: 'row',
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    ...theme.shadows.card,
  },
  rankContainer: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  rank: {
    ...theme.typography.heading,
    color: theme.colors.primary,
    fontWeight: '700',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    ...theme.typography.heading,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  stats: {
    ...theme.typography.small,
    color: theme.colors.textSecondary,
  },
  footer: {
    padding: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  restartButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
  },
  restartButtonPressed: {
    opacity: 0.8,
  },
  restartButtonText: {
    ...theme.typography.heading,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
