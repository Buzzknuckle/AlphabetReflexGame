export const resetLettersHit = () => {
  return {
    type: 'RESET_LETTERS_HIT',
  };
};

export const resetLettersMissed = () => {
  return {
    type: 'RESET_LETTERS_MISSED',
  };
};

export const resetLettersLeft = () => {
  return {
    type: 'RESET_LETTERS_LEFT',
  };
};

export const incrementLettersHit = () => {
  return {
    type: 'INCREMENT_LETTERS_HIT',
  };
};
export const incrementLettersMissed = () => {
  return {
    type: 'INCREMENT_LETTERS_MISSED',
  };
};
export const decrementLettersLeft = () => {
  return {
    type: 'DECREMENT_LETTERS_LEFT',
  };
};
