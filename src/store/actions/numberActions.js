export const updateNumbersLeft = (newArray) => {
  return {
    type: 'UPDATE_NUMBERS_LEFT',
    payload: { numberArrayLeft: newArray },
  };
};

export const updateCurrentNumber = (newNumber) => {
  return {
    type: 'UPDATE_CURRENT_NUMBER',
    payload: { currentNumber: newNumber },
  };
};
