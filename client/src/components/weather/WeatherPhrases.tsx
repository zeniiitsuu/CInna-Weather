import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { weatherPhrases } from '@shared/schema';

interface WeatherPhrasesProps {
  weather: keyof typeof weatherPhrases;
}

export default function WeatherPhrases({ weather }: WeatherPhrasesProps) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const phrases = weatherPhrases[weather] || weatherPhrases.clear;

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((current) => (current + 1) % phrases.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [phrases]);

  return (
    <motion.div
      key={phraseIndex}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center p-4 bg-primary/10 rounded-lg"
    >
      <p className="text-lg font-medium text-primary-foreground">
        {phrases[phraseIndex]}
      </p>
    </motion.div>
  );
}
