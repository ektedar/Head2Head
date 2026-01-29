import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Image } from 'react-native';
import { AnimeCard } from '../AnimeCard';
import { Anime } from '../../types';

const mockAnime: Anime = {
  id: '1',
  title: 'Test Anime',
  imageUrl: 'https://example.com/test.jpg',
  description: 'A test anime',
};

describe('AnimeCard', () => {
  it('should render anime title', () => {
    const onSelect = jest.fn();
    const { getByText } = render(
      <AnimeCard anime={mockAnime} onSelect={onSelect} />
    );

    expect(getByText('Test Anime')).toBeTruthy();
  });

  it('should render image with correct uri', () => {
    const onSelect = jest.fn();
    const { UNSAFE_getByType } = render(
      <AnimeCard anime={mockAnime} onSelect={onSelect} />
    );

    const image = UNSAFE_getByType(Image);
    expect(image.props.source.uri).toBe('https://example.com/test.jpg');
  });

  it('should call onSelect with anime id when pressed', () => {
    const onSelect = jest.fn();
    const { getByText } = render(
      <AnimeCard anime={mockAnime} onSelect={onSelect} />
    );

    fireEvent.press(getByText('Test Anime'));

    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith('1');
  });

  it('should truncate long titles to 2 lines', () => {
    const onSelect = jest.fn();
    const longTitleAnime: Anime = {
      ...mockAnime,
      title: 'This is a very long anime title that should be truncated',
    };

    const { getByText } = render(
      <AnimeCard anime={longTitleAnime} onSelect={onSelect} />
    );

    const titleElement = getByText(longTitleAnime.title);
    expect(titleElement.props.numberOfLines).toBe(2);
  });

  it('should render without description', () => {
    const onSelect = jest.fn();
    const animeWithoutDescription: Anime = {
      id: '2',
      title: 'Anime Without Description',
      imageUrl: 'https://example.com/test2.jpg',
    };

    const { getByText } = render(
      <AnimeCard anime={animeWithoutDescription} onSelect={onSelect} />
    );

    expect(getByText('Anime Without Description')).toBeTruthy();
  });
});
