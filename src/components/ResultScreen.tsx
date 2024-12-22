import React from 'react';
import { Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatTime } from '../utils/timeUtils';

interface ResultScreenProps {
  theme: string;
  solvedWords: string[];
  remainingWords: string[];
  timeTaken: number;
  onPlayAgain: () => void;
  onShare: () => void;
  isDarkMode: boolean;
  isGiveUp: boolean;
}

export function ResultScreen({ 
  theme, 
  solvedWords,
  remainingWords, 
  timeTaken, 
  onPlayAgain, 
  onShare, 
  isDarkMode,
  isGiveUp
}: ResultScreenProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-8 max-w-md w-full"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
          {isGiveUp ? 'Game Over' : 'Congratulations! 🎉'}
        </h2>
        <p className="text-center mb-2 text-gray-700 dark:text-gray-300">
          {isGiveUp 
            ? `You found ${solvedWords.length} out of 5 words in "${theme}"`
            : `You found all words in "${theme}"!`}
        </p>
        <p className="text-center mb-4 text-lg font-semibold text-gray-800 dark:text-gray-200">
          Time: {formatTime(timeTaken)}
        </p>
        
        <div className="space-y-2 mb-4">
          <h3 className="font-semibold text-gray-700 dark:text-gray-300">Solved Words:</h3>
          <AnimatePresence>
            {solvedWords.map((word, index) => (
              <motion.div
                key={word}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-green-100 dark:bg-green-900 p-2 rounded text-center font-medium text-green-800 dark:text-green-200"
              >
                {word}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {isGiveUp && remainingWords.length > 0 && (
          <div className="space-y-2 mb-6">
            <h3 className="font-semibold text-gray-700 dark:text-gray-300">Remaining Words:</h3>
            <AnimatePresence>
              {remainingWords.map((word, index) => (
                <motion.div
                  key={word}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-red-100 dark:bg-red-900 p-2 rounded text-center font-medium text-red-800 dark:text-red-200"
                >
                  {word}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        <div className="flex gap-4">
          <button
            onClick={onPlayAgain}
            className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Play Again
          </button>
          <button
            onClick={onShare}
            className="flex items-center justify-center gap-2 bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            <Share2 size={20} />
            Share
          </button>
        </div>
      </motion.div>
    </div>
  );
}