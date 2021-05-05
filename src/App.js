import { AppBar, Grid, Toolbar, Typography } from '@material-ui/core';
import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.scss';
import Game from './components/Game/Game';
import Options from './components/Options/Options';
import Score from './components/Score/Score';
import { difficultyDisable, difficultyEnable } from './store/actions/difficultyActions';
import { updateCurrentNumber, updateNumbersLeft } from './store/actions/numberActions';
import {
  changeButtonLabel,
  inputDisable,
  inputEnable,
  resetLetters,
  resetPickedLetter,
  updateLetters,
  updatePickedLetter,
} from './store/actions/rootActions';
import {
  decrementLettersLeft,
  incrementLettersHit,
  incrementLettersMissed,
  resetLettersHit,
  resetLettersLeft,
  resetLettersMissed,
} from './store/actions/scoreActions';
import { difficultyValues, generateArray, shuffleArray } from './utils/utils';

function App() {
  const intervalRef = useRef();

  const { letters, pickedLetter } = useSelector((state) => state.root);
  const { difficulty } = useSelector((state) => state.difficulty);
  const { currentNumber, numberArrayLeft } = useSelector((state) => state.gameNumbers);

  const dispatch = useDispatch();

  const getInterval = () => {
    return difficultyValues.find((item) => item.name === difficulty).value;
  };

  const configureStartGame = () => {
    dispatch(changeButtonLabel('Stop'));
    dispatch(difficultyDisable());
    dispatch(inputEnable());
  };

  const resetGame = () => {
    clearInterval(intervalRef.current);
    dispatch(resetPickedLetter());
    dispatch(inputDisable());
    dispatch(updateCurrentNumber(null));
    dispatch(resetLetters());
    dispatch(changeButtonLabel('Start game'));
    dispatch(resetLettersHit());
    dispatch(resetLettersMissed());
    dispatch(resetLettersLeft());
    dispatch(difficultyEnable());
  };

  const startGame = (option) => {
    if (option === 'Stop') {
      resetGame();
    } else {
      configureStartGame();
      const interval = getInterval();
      const numberArray = shuffleArray(generateArray());
      let currNumber;
      console.log(numberArray);

      currNumber = numberArray.pop();
      dispatch(updateCurrentNumber(currNumber));
      dispatch(updateNumbersLeft(numberArray));

      dispatch(decrementLettersLeft());

      intervalRef.current = setInterval(() => {
        console.log(numberArray);
        if (numberArray.length === 0) {
          resetGame();
        } else {
          if (pickedLetter === '') {
            let newLetters = letters;
            const letterIndex = letters.findIndex((item) => item.number === currNumber);
            newLetters[letterIndex].status = 'miss';
            dispatch(updateLetters(newLetters));
            dispatch(incrementLettersMissed());
          }
          currNumber = numberArray.pop();
          dispatch(updateCurrentNumber(currNumber));
          dispatch(updateNumbersLeft(numberArray));

          dispatch(decrementLettersLeft());
        }

        console.log('number array left', numberArrayLeft);
      }, interval);
    }
  };

  const restartInterval = () => {
    clearInterval(intervalRef.current);
    const interval = getInterval();
    let currNumber;

    if (currentNumber === letters.find((item) => item.letter === pickedLetter)?.number) {
      let newLetters = letters;
      const letterIndex = letters.findIndex((item) => item.letter === pickedLetter);
      if (letterIndex >= 0) {
        newLetters[letterIndex].status = 'hit';

        dispatch(updateLetters(newLetters));
        dispatch(incrementLettersHit());
      }
    } else {
      let newLetters = letters;
      const letterIndex = letters.findIndex((item) => item.letter === pickedLetter);
      if (letterIndex >= 0) {
        newLetters[letterIndex].status = 'miss';

        dispatch(updateLetters(newLetters));
        dispatch(incrementLettersMissed());
      }
    }
    dispatch(decrementLettersLeft());
    dispatch(resetPickedLetter());
    console.log(letters);
    const numberArray = numberArrayLeft;
    currNumber = numberArray.pop();

    dispatch(updateCurrentNumber(currNumber));
    dispatch(updateNumbersLeft(numberArray));
    dispatch(decrementLettersLeft());

    intervalRef.current = setInterval(() => {
      if (numberArray.length === 0) {
        resetGame();
      } else {
        console.log('reset', pickedLetter);
        if (pickedLetter === '') {
          let newLetters = letters;
          const letterIndex = letters.findIndex((item) => item.number === currNumber);
          newLetters[letterIndex].status = 'miss';
          dispatch(updateLetters(newLetters));
          dispatch(incrementLettersMissed());
        }

        currNumber = numberArray.pop();
        dispatch(updateCurrentNumber(currNumber));
        dispatch(updateNumbersLeft(numberArray));
        dispatch(decrementLettersLeft());
      }
    }, interval);
  };

  useEffect(() => {
    if (pickedLetter) {
      if (pickedLetter !== '') {
        restartInterval();
      }
    }
  }, [pickedLetter]);

  const handleInputChange = (event) => {
    if (event.key === 'Enter') {
      dispatch(updatePickedLetter(event.target.value.toUpperCase()));
    }
  };

  return (
    <div className="App">
      <AppBar position="static" className="App-header">
        <Toolbar>
          <Typography variant="h6">Alphabet Reflex Game</Typography>
        </Toolbar>
      </AppBar>
      <Grid container spacing={0}>
        <Grid item xs={3}></Grid>
        <Grid item xs={6}>
          <Options handleInputChange={handleInputChange} startGame={startGame} />
        </Grid>
        <Grid item xs={3}>
          <Score />
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <Game letters={letters} />
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
    </div>
  );
}

export default App;
