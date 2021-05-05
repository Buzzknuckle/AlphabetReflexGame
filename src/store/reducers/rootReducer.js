import { generateLetters } from '../../utils/utils';

const initialState = {
  buttonLabel: 'Start game',
  inputDisabled: true,
  letters: generateLetters(),
  pickedLetter: '',
};

function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    case 'INPUT_ENABLE':
      return { ...state, inputDisabled: payload };
    case 'INPUT_DISABLE':
      return { ...state, inputDisabled: payload };
    case 'CHANGE_BUTTON_LABEL':
      return { ...state, buttonLabel: payload };
    case 'RESET_LETTERS':
      return { ...state, letters: payload };
    case 'UPDATE_LETTERS':
      return { ...state, letters: payload };
    case 'RESET_PICKED_LETTER':
      return { ...state, pickedLetter: 0 };
    case 'UPDATE_PICKED_LETTER':
      return { ...state, pickedLetter: payload };

    default:
      return state;
  }
}

export default rootReducer;
