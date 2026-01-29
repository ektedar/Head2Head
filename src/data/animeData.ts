import { Anime } from '../types';

// Using real anime cover images from MyAnimeList CDN (via Jikan API)
export const ANIME_LIST: Anime[] = [
  {
    id: '1',
    title: 'Attack on Titan',
    imageUrl: 'https://cdn.myanimelist.net/images/anime/10/47347.jpg',
    description: 'Humanity fights for survival against giant Titans',
  },
  {
    id: '2',
    title: 'Demon Slayer',
    imageUrl: 'https://cdn.myanimelist.net/images/anime/1286/99889.jpg',
    description: 'A boy becomes a demon slayer to save his sister',
  },
  {
    id: '3',
    title: 'My Hero Academia',
    imageUrl: 'https://cdn.myanimelist.net/images/anime/10/78745.jpg',
    description: 'Heroes with superpowers protect the world',
  },
  {
    id: '4',
    title: 'One Piece',
    imageUrl: 'https://cdn.myanimelist.net/images/anime/6/73245.jpg',
    description: 'Pirates search for the ultimate treasure',
  },
  {
    id: '5',
    title: 'Naruto',
    imageUrl: 'https://cdn.myanimelist.net/images/anime/13/17405.jpg',
    description: 'A ninja dreams of becoming the Hokage',
  },
];
