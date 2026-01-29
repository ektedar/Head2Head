# Head2Head

A mobile comparison app built with React Native and Expo that lets users rank their preferences through head-to-head comparisons.

## Overview

ContentSwiper presents users with pairs of items (currently anime) and tracks their choices to generate a final ranking based on win rates. The app uses a round-robin tournament system where every item is compared against every other item exactly once.

## Features

- **Head-to-Head Comparisons**: Choose between two items at a time
- **Round-Robin Algorithm**: Fair comparison system (all pairs compared once)
- **Progress Tracking**: Visual feedback showing comparison progress
- **Automatic Rankings**: Results calculated based on win rates
- **Restart Capability**: Start fresh comparisons anytime
- **Clean UI**: Simple, intuitive card-based interface
- **TypeScript**: Full type safety throughout the app

## Tech Stack

- **React Native** - Mobile app framework
- **Expo** - Development platform and tooling
- **TypeScript** - Type-safe JavaScript
- **React Hooks** - State management (useState, useReducer, useEffect)
- **StyleSheet API** - Native styling

## Prerequisites

- Node.js 18+
- npm or yarn
- Expo Go app (for testing on physical device)
- Android Studio (for Android emulator) or Xcode (for iOS simulator)

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd Head2Head
```

2. Install dependencies:
```bash
npm install
```

## Running the App

Start the Expo development server:
```bash
npm start
```

Then choose your platform:
- Press `a` - Run on Android emulator/device
- Press `i` - Run on iOS simulator (Mac only)
- Press `w` - Run in web browser
- Scan QR code with Expo Go app on your phone

## Project Structure

```
Head2Head/
├── src/
│   ├── components/
│   │   ├── AnimeCard.tsx          # Individual card component
│   │   ├── ComparisonPair.tsx     # Two cards side-by-side
│   │   └── ResultsScreen.tsx      # Final rankings display
│   ├── screens/
│   │   └── ComparisonScreen.tsx   # Main comparison logic
│   ├── types/
│   │   └── index.ts               # TypeScript interfaces
│   ├── data/
│   │   └── animeData.ts           # Content data (anime list)
│   ├── utils/
│   │   └── comparisonEngine.ts    # Comparison algorithm
│   └── styles/
│       └── theme.ts               # Design tokens
├── App.tsx                         # Root component
├── package.json
└── tsconfig.json
```

## How It Works

### Comparison Algorithm

The app uses an **all-pairs round-robin** comparison system:

1. **Pair Generation**: For `n` items, generates `n×(n-1)/2` unique pairs
   - Example: 5 anime = 10 comparisons

2. **User Selection**: User taps on their preferred item in each pair

3. **Progress Tracking**: Automatically advances to next comparison

4. **Results Calculation**:
   - Counts wins and losses for each item
   - Calculates win rate: `wins / (wins + losses)`
   - Sorts by win rate (highest to lowest)

### State Management

- **ComparisonScreen**: Uses `useReducer` for complex comparison state
- **App**: Uses `useState` for simple navigation state
- **No external libraries**: Pure React hooks implementation

## Customization

### Adding New Content

Edit `src/data/animeData.ts`:

```typescript
export const ANIME_LIST: Anime[] = [
  {
    id: '6',
    title: 'Your Anime',
    imageUrl: 'https://your-image-url.jpg',
    description: 'Description here',
  },
  // ... more items
];
```

### Changing the Topic

1. Update the header in `ComparisonScreen.tsx`:
```typescript
<Text style={styles.topic}>Which Movie is Better?</Text>
```

2. Rename types in `src/types/index.ts` (optional):
```typescript
export interface Item {  // instead of Anime
  id: string;
  title: string;
  imageUrl: string;
  description?: string;
}
```

3. Update data file to match your new content type

### Styling

Modify design tokens in `src/styles/theme.ts`:

```typescript
export const theme = {
  colors: {
    primary: '#6C63FF',  // Change primary color
    // ... other colors
  },
  // ... spacing, typography, etc.
};
```

## Future Enhancements

- [ ] Swipe gestures for selection
- [ ] Persistence (save progress with AsyncStorage)
- [ ] Multiple topic categories
- [ ] Share results feature
- [ ] Custom image uploads
- [ ] API integration for dynamic content
- [ ] Dark mode support
- [ ] Animation transitions
- [ ] Undo last choice
- [ ] Detailed statistics view

## Development

### Testing

Run the test suite:
```bash
npm test              # Run all tests
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Run tests with coverage report
```

The project includes comprehensive unit tests:
- **Comparison Engine**: 28 tests covering all comparison logic
- **Components**: Tests for UI components and user interactions
- **100% coverage** on core comparison algorithm

Tests run automatically on every push via GitHub Actions CI/CD pipeline.

### Type Checking

Run TypeScript type checker:
```bash
npx tsc --noEmit
```

### Code Structure Guidelines

- All components use functional components with hooks
- TypeScript strict mode enabled
- Styling uses built-in StyleSheet API
- No external state management libraries

## License

MIT

## Contributing

Contributions welcome! Please feel free to submit a Pull Request.

---

Built with React Native, Expo, and TypeScript
