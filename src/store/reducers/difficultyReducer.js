const initialState = { difficulty: 'medium', difficultyDisabled: false };

const difficultyReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'CHANGE_DIFFICULTY':
      return { ...state, difficulty: payload };
    case 'DIFFICULTY_ENABLE':
      return { ...state, difficultyDisabled: payload };
    case 'DIFFICULTY_DISABLE':
      return { ...state, difficultyDisabled: payload };

    default:
      return state;
  }
};

export default difficultyReducer;
