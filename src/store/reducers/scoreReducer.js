const initialState = {
  lettersHit: 0,
  lettersMissed: 0,
  lettersLeft: 26,
};

const scoreReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'INCREMENT_LETTERS_HIT':
      return { ...state, lettersHit: state.lettersHit + 1 };
    case 'INCREMENT_LETTERS_MISSED':
      return { ...state, lettersMissed: state.lettersMissed + 1 };
    case 'DECREMENT_LETTERS_LEFT':
      return { ...state, lettersLeft: state.lettersLeft - 1 };
    case 'RESET_LETTERS_HIT':
      return { ...state, lettersHit: 0 };
    case 'RESET_LETTERS_MISSED':
      return { ...state, lettersMissed: 0 };
    case 'RESET_LETTERS_LEFT':
      return { ...state, lettersLeft: 26 };

    default:
      return state;
  }
};

export default scoreReducer;
