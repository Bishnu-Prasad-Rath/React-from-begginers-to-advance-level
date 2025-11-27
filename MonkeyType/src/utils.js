export function calculateWPM(correctChars, durationSeconds) {
  if (!durationSeconds || durationSeconds <= 0) return 0;
  const words = correctChars / 5; // standard: 5 chars = 1 word
  const minutes = durationSeconds / 60;
  return Math.round(words / minutes);
}
