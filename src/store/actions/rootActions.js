import { generateLetters } from '../../utils/utils';

export const inputEnable = () => {
  return {
    type: 'INPUT_ENABLE',
    payload: false,
  };
};

export const inputDisable = () => {
  return {
    type: 'INPUT_DISABLE',
    payload: true,
  };
};

export const changeButtonLabel = (newLabel) => {
  return {
    type: 'CHANGE_BUTTON_LABEL',
    payload: newLabel,
  };
};

export const updateLetters = (newLetters) => {
  return {
    type: 'UPDATE_LETTERS',
    payload: newLetters,
  };
};

export const resetLetters = () => {
  return {
    type: 'RESET_LETTERS',
    payload: generateLetters(),
  };
};

export const resetPickedLetter = () => {
  return {
    type: 'RESET_PICKED_LETTER',
  };
};

export const updatePickedLetter = (newLetter) => {
  return {
    type: 'UPDATE_PICKED_LETTER',
    payload: newLetter,
  };
};
