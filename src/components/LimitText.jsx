function splitText(text, wordsPerRow = 5) {
  const words = text.split(" ");
  const result = [];
  for (let i = 0; i < words.length; i += wordsPerRow) {
    result.push(words.slice(i, i + wordsPerRow).join(" "));
  }
  return result;
}
