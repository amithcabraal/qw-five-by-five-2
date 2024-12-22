import React from 'react';
import { Play, Pause } from 'lucide-react';
import { WordPreview } from './WordPreview';

interface GameInfoProps {
  theme: string;
  timer: string;
  isPaused: boolean;
  onTogglePause: () => void;
  selectedLetters: string[];
}

export function GameInfo({ 
  theme, 
  timer, 
  isPaused, 
  onTogglePause,
  selectedLetters 
}: GameInfoProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between px-2 mb-4">
        <div className="flex items-center gap-4">
          <p className="text-xl font-mono dark:text-white">{timer}</p>
          <button
            onClick={onTogglePause}
            className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors flex items-center gap-2"
            aria-label={isPaused ? 'Resume' : 'Pause'}
          >
            {isPaused ? (
              <>
                <Play size={18} className="dark:text-white" />
                <span className="text-sm font-medium dark:text-white">Resume</span>
              </>
            ) : (
              <>
                <Pause size={18} className="dark:text-white" />
                <span className="text-sm font-medium dark:text-white">Pause</span>
              </>
            )}
          </button>
        </div>
        <WordPreview selectedLetters={selectedLetters} />
      </div>
      
      <p className="text-gray-600 dark:text-gray-300 text-center">
        Find five 5-letter words about: <b>{theme}</b>
      </p>
    </div>
  );
}