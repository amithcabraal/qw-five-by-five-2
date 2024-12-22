import { useState, useEffect } from 'react';
import { wordSets } from '../data/wordSets';
import { rearrangeGrid, shuffleUnsolvedLetters } from '../utils/gridUtils';

export function useGameState() {
  const [currentSetIndex, setCurrentSetIndex] = useState(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const setId = urlParams.get('set');
    if (setId) {
      const index = wordSets.findIndex(set => set.id === setId);
      return index !== -1 ? index : Math.floor(Math.random() * wordSets.length);
    }
    return Math.floor(Math.random() * wordSets.length);
  });

  const [letters, setLetters] = useState<string[]>([]);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [solvedIndices, setSolvedIndices] = useState<number[]>([]);
  const [solvedWords, setSolvedWords] = useState<string[]>([]);
  const [isError, setIsError] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [hintIndex, setHintIndex] = useState<number | null>(null);
  const [isGiveUp, setIsGiveUp] = useState(false);

  const currentSet = wordSets[currentSetIndex];

  useEffect(() => {
    if (window.location.search) {
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  useEffect(() => {
    const allLetters = currentSet.words.join('').split('');
    for (let i = allLetters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allLetters[i], allLetters[j]] = [allLetters[j], allLetters[i]];
    }
    setLetters(allLetters);
    setSelectedIndices([]);
    setSolvedIndices([]);
    setSolvedWords([]);
    setShowResult(false);
    setHintIndex(null);
  }, [currentSetIndex]);

  const getRemainingWords = () => {
    return currentSet.words.filter(word => !solvedWords.includes(word));
  };

  const handleLetterClick = (index: number) => {
    if (solvedIndices.includes(index)) return;
    
    setIsError(false);
    setHintIndex(null);
    
    if (selectedIndices.includes(index)) {
      setSelectedIndices(selectedIndices.filter(i => i !== index));
      return;
    }

    if (selectedIndices.length < 5) {
      const newSelected = [...selectedIndices, index];
      setSelectedIndices(newSelected);

      if (newSelected.length === 5) {
        const word = newSelected.map(i => letters[i]).join('');
        if (currentSet.words.includes(word) && !solvedWords.includes(word)) {
          const newLetters = rearrangeGrid(letters, solvedWords, word);
          setLetters(newLetters);
          
          const newSolvedIndices = Array.from(
            { length: (solvedWords.length + 1) * 5 },
            (_, i) => i
          );
          
          setSolvedIndices(newSolvedIndices);
          setSolvedWords([...solvedWords, word]);
          setSelectedIndices([]);

          if (solvedWords.length + 1 === currentSet.words.length) {
            setShowResult(true);
          }
        } else {
          setIsError(true);
          setTimeout(() => {
            setSelectedIndices([]);
            setIsError(false);
          }, 1000);
        }
      }
    }
  };

  const handleHint = () => {
    const remainingWords = getRemainingWords();
    if (remainingWords.length > 0) {
      const randomWord = remainingWords[Math.floor(Math.random() * remainingWords.length)];
      const firstLetter = randomWord[0];
      const index = letters.findIndex((letter, idx) => 
        letter === firstLetter && !solvedIndices.includes(idx)
      );
      setHintIndex(index);
      setTimeout(() => setHintIndex(null), 2000);
    }
  };

  const handleSolve = () => {
    const remainingWords = getRemainingWords();
    if (remainingWords.length > 0) {
      const wordToSolve = remainingWords[Math.floor(Math.random() * remainingWords.length)];
      const newLetters = rearrangeGrid(letters, solvedWords, wordToSolve);
      setLetters(newLetters);
      
      const newSolvedIndices = Array.from(
        { length: (solvedWords.length + 1) * 5 },
        (_, i) => i
      );
      
      setSolvedIndices(newSolvedIndices);
      setSolvedWords([...solvedWords, wordToSolve]);
      setSelectedIndices([]);

      if (solvedWords.length + 1 === currentSet.words.length) {
        setShowResult(true);
      }
    }
  };

  const handleShuffle = () => {
    const newLetters = shuffleUnsolvedLetters(letters, solvedIndices);
    setLetters(newLetters);
    setSelectedIndices([]);
  };

  const handlePlayAgain = () => {
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * wordSets.length);
    } while (nextIndex === currentSetIndex);
    setCurrentSetIndex(nextIndex);
    setIsGiveUp(false);
  };

  const handleShare = () => {
    const url = `${window.location.origin}${window.location.pathname}?set=${currentSet.id}`;
    const message = `I ${isGiveUp ? `found ${solvedWords.length}/5 words` : 'completed'} "${currentSet.theme}" on QuizWordz 5x5!\n\nCan you beat my score? Try it here: ${url}`;
    navigator.clipboard.writeText(message);
    alert('Results copied to clipboard!');
  };

  const handleGiveUp = () => {
    setIsGiveUp(true);
    setShowResult(true);
  };

  return {
    letters,
    selectedIndices,
    solvedIndices,
    solvedWords,
    currentSet,
    currentSetIndex,
    showResult,
    hintIndex,
    isError,
    isGiveUp,
    remainingWords: getRemainingWords(),
    handleLetterClick,
    handleHint,
    handleSolve,
    handleShuffle,
    handlePlayAgain,
    handleShare,
    handleGiveUp,
  };
}