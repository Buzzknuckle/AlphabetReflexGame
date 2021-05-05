const initialState = {
  numberArrayLeft: [],
  currentNumber: null,
};

const numberReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'UPDATE_NUMBERS_LEFT':
      return { ...state, ...payload };
    case 'UPDATE_CURRENT_NUMBER':
      return { ...state, ...payload };

    default:
      return state;
  }
};

export default numberReducer;
