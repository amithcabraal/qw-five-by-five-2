import React from 'react';

interface WordPreviewProps {
  selectedLetters: string[];
}

export function WordPreview({ selectedLetters }: WordPreviewProps) {
  return (
    <div className="flex gap-1 h-8 mb-2">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="w-8 h-8 border-2 border-gray-300 dark:border-gray-600 rounded flex items-center justify-center font-bold text-lg"
        >
          {selectedLetters[index] || ''}
        </div>
      ))}
    </div>
  );
}