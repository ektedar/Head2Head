import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { Anime } from '../types';
import { theme } from '../styles/theme';

interface AnimeCardProps {
  anime: Anime;
  onSelect: (animeId: string) => void;
}

export const AnimeCard: React.FC<AnimeCardProps> = ({ anime, onSelect }) => {
  return (
    <Pressable
      onPress={() => onSelect(anime.id)}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
      ]}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: anime.imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {anime.title}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    ...theme.shadows.card,
  },
  cardPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 3 / 4,
    backgroundColor: theme.colors.border,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  titleContainer: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.cardBackground,
  },
  title: {
    ...theme.typography.heading,
    color: theme.colors.text,
    textAlign: 'center',
  },
});
