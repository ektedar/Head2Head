import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ComparisonScreen } from './src/screens/ComparisonScreen';
import { ResultsScreen } from './src/components/ResultsScreen';
import { ComparisonResult } from './src/types';

export default function App() {
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<ComparisonResult[]>([]);

  const handleComplete = (comparisonResults: ComparisonResult[]) => {
    setResults(comparisonResults);
    setShowResults(true);
  };

  const handleRestart = () => {
    setShowResults(false);
    setResults([]);
  };

  return (
    <>
      <StatusBar style="auto" />
      {showResults ? (
        <ResultsScreen results={results} onRestart={handleRestart} />
      ) : (
        <ComparisonScreen onComplete={handleComplete} />
      )}
    </>
  );
}
