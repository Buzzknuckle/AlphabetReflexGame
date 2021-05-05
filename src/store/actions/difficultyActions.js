export const difficultyEnable = () => {
  return {
    type: 'DIFFICULTY_ENABLE',
    payload: false,
  };
};

export const difficultyDisable = () => {
  return {
    type: 'DIFFICULTY_DISABLE',
    payload: true,
  };
};

export const difficultyChange = (difficulty) => {
  return {
    type: 'CHANGE_DIFFICULTY',
    payload: difficulty,
  };
};
