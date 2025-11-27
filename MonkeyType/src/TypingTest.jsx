import React, { useState, useEffect, useRef } from "react";

const TypingTest = () => {
  const [text, setText] = useState("This is a typing speed test for our MonkeyType clone.");
  const [input, setInput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [mistakes, setMistakes] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);

  const timerRef = useRef(null);

  // Start timer when typing begins
  const startTest = () => {
    setIsRunning(true);
    setStartTime(Date.now());
    setTimeLeft(60);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setIsRunning(false);
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Stop and reset test
  const resetTest = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setInput("");
    setWpm(0);
    setAccuracy(100);
    setMistakes(0);
    setTimeLeft(60);
  };

  // Handle typing input
  const handleInput = (e) => {
    const value = e.target.value;
    if (!isRunning) startTest();
    setInput(value);

    const typed = value.split("");
    const original = text.split("");
    let errors = 0;

    typed.forEach((char, i) => {
      if (char !== original[i]) errors++;
    });

    setMistakes(errors);

    const wordsTyped = value.trim().split(" ").length;
    const minutes = (Date.now() - startTime) / 60000;
    const currentWpm = minutes > 0 ? Math.round(wordsTyped / minutes) : 0;
    setWpm(currentWpm);

    const correctChars = typed.filter((c, i) => c === original[i]).length;
    const currentAccuracy = typed.length
      ? Math.round((correctChars / typed.length) * 100)
      : 100;
    setAccuracy(currentAccuracy);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      <h1 className="text-3xl font-bold mb-6 text-red-500">MonkeyType Clone</h1>

      {/* Stats Display */}
      <div className="flex gap-6 mb-4">
        <p>⏳ Time Left: {timeLeft}s</p>
        <p>⚡ WPM: {wpm}</p>
        <p>🎯 Accuracy: {accuracy}%</p>
        <p>❌ Mistakes: {mistakes}</p>
      </div>

      {/* Text to Type */}
      <div className="bg-gray-800 p-4 rounded-lg w-full max-w-2xl text-lg leading-7">
        {text}
      </div>

      {/* Input Area */}
      <textarea
        className="w-full max-w-2xl mt-4 p-2 text-black rounded"
        rows={4}
        value={input}
        onChange={handleInput}
        placeholder="Start typing here..."
      ></textarea>

      {/* Buttons */}
      <div className="flex gap-4 mt-4">
        <button
          onClick={resetTest}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default TypingTest;
