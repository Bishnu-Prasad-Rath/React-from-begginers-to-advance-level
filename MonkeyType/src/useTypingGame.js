import { useState, useRef, useCallback } from "react";
import { calculateWPM } from "./utils";

/**
 * wordsArray: array of words to type
 * onFinish: optional callback when finished
 */
export function useTypingGame(wordsArray = [], onFinish = () => {}) {
  const [words] = useState(wordsArray);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [input, setInput] = useState("");
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);

  // refs for mutable counters (avoid re-renders on every char)
  const totalTypedRef = useRef(0);      // total non-space chars typed (submitted)
  const correctCharsRef = useRef(0);    // matched chars
  const mistakesRef = useRef(0);        // incorrect chars
  const correctWordsRef = useRef(0);
  const startTimeRef = useRef(null);
  const endTimeRef = useRef(null);

  const start = useCallback(() => {
    setStarted(true);
    startTimeRef.current = Date.now();
    setFinished(false);
    // reset counters
    totalTypedRef.current = 0;
    correctCharsRef.current = 0;
    mistakesRef.current = 0;
    correctWordsRef.current = 0;
    setCurrentIndex(0);
    setInput("");
  }, []);

  const finish = useCallback(() => {
    endTimeRef.current = Date.now();
    setFinished(true);
    setStarted(false);
    onFinish();
  }, [onFinish]);

  // input change (keeps local input)
  const handleInputChange = useCallback((value) => {
    setInput(value);
  }, []);

  // on space pressed — submit current word
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === " ") {
        e.preventDefault();
        const typed = input.trim();
        const expected = words[currentIndex] || "";

        // compare per-char up to min length
        const minLen = Math.min(typed.length, expected.length);
        let matches = 0;
        for (let i = 0; i < minLen; i++) {
          if (typed[i] === expected[i]) matches++;
          else mistakesRef.current++;
        }
        // extra typed chars beyond expected -> mistakes
        if (typed.length > expected.length) {
          mistakesRef.current += typed.length - expected.length;
        }
        // note: missing chars in typed (expected longer) are not counted as typed mistakes
        totalTypedRef.current += typed.length;
        correctCharsRef.current += matches;

        if (typed === expected) correctWordsRef.current++;

        // move to next word
        setCurrentIndex((idx) => idx + 1);
        setInput("");
      }
    },
    [input, words, currentIndex]
  );

  const getResults = useCallback(() => {
    const end = endTimeRef.current || Date.now();
    const start = startTimeRef.current || end;
    const durationSec = Math.max((end - start) / 1000, 1); // avoid zero
    const correctChars = correctCharsRef.current;
    const totalTyped = totalTypedRef.current;
    const mistakes = mistakesRef.current;
    const correctWords = correctWordsRef.current;
    const wpm = calculateWPM(correctChars, durationSec);
    const accuracy = totalTyped === 0 ? 0 : Math.round((correctChars / totalTyped) * 100);
    return { wpm, accuracy, correctWords, mistakes, correctChars, totalTyped, durationSec };
  }, []);

  return {
    words,
    currentIndex,
    input,
    started,
    finished,
    start,
    finish,
    handleInputChange,
    handleKeyDown,
    getResults,
  };
}
