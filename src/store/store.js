import rootReducer from './reducers/rootReducer';
import { createStore, combineReducers } from 'redux';
import numberReducer from './reducers/numberReducer';
import difficultyReducer from './reducers/difficultyReducer';
import scoreReducer from './reducers/scoreReducer';

const allReducers = combineReducers({
  root: rootReducer,
  gameNumbers: numberReducer,
  difficulty: difficultyReducer,
  score: scoreReducer,
});

const store = createStore(allReducers);

export default store;
