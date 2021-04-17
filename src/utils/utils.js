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

export function shuffleArray(array) {
  for (
    let j, x, i = array.length;
    i;
    j = Math.floor(Math.random() * i), x = array[--i], array[i] = array[j], array[j] = x
  );
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
