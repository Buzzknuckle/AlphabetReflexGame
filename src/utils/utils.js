export function generateLetters() {
  const caps = [...Array(26)].map((val, i) => {
    return { letter: String.fromCharCode(i + 65), number: i + 1, status: 'left' };
  });
  return caps;
}

export function generateArray() {
  const array = [];
  for (let i = 1; i <= 26; i++) {
    array.push(i);
  }
  return array;
}

/**
 * Fisher-Yates suffle algorithm
 */
export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export const difficultyValues = [
  {
    name: 'easy',
    value: 5000,
  },
  {
    name: 'medium',
    value: 3500,
  },
  {
    name: 'hard',
    value: 2000,
  },
];
