// simple common words (expand later)
export const COMMON_WORDS = [
  "the","be","to","of","and","a","in","that","have","I","it","for","not","on","with",
  "he","as","you","do","at","this","but","his","by","from","they","we","say","her","she",
  "or","an","will","my","one","all","would","there","their","what","so","up","out","if",
  "about","who","get","which","go","me","when","make","can","like","time","no","just"
];

export function generateWords(count = 200) {
  const arr = new Array(count).fill(0).map(
    () => COMMON_WORDS[Math.floor(Math.random() * COMMON_WORDS.length)]
  );
  return arr;
}
