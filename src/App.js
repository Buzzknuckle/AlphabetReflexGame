import React, { useState, useEffect } from 'react';
import './App.scss';
import { AppBar, Grid, Toolbar, Typography } from '@material-ui/core';
import Options from './components/Options/Options';
import Score from './components/Score/Score';
import Game from './components/Game/Game';
import { difficultyValues, generateArray, generateLetters, shuffleArray } from './utils/utils';

let intervalID;

function App() {
  const [difficulty, setDifficultyValue] = useState('medium');
  const [pickedLetter, setPickedLetter] = useState('');
  const [inputDisabled, setInputDisabled] = useState(true);
  const [difficultyDisabled, setDifficultyDisabled] = useState(false);
  const [currentNumber, setCurrentNumber] = useState(null);
  const [letters, setLetters] = useState(generateLetters());
  const [buttonLabel, setButtonLabel] = useState('Start game');
  // const [intervalID, setIntervalID] = useState();
  const [numberArrayLeft, setNumberArrayLeft] = useState();
  const [lettersHit, setLettersHit] = useState(0);
  const [lettersMissed, setLettersMissed] = useState(0);
  const [lettersLeft, setLettersLeft] = useState(26);

  const getInterval = () => {
    return difficultyValues.find((item) => item.name === difficulty).value;
  };

  const resetGame = () => {
    clearInterval(intervalID);
    setPickedLetter();
    setInputDisabled(true);
    setCurrentNumber(null);
    setLetters(generateLetters());
    setButtonLabel('Start game');
    setLettersHit(0);
    setLettersMissed(0);
    setLettersLeft(26);
    setDifficultyDisabled(false);
  };

  const startGame = (option) => {
    if (option === 'Stop') {
      resetGame();
    } else {
      setButtonLabel('Stop');
      setDifficultyDisabled(true);
      setInputDisabled(false);
      const interval = getInterval();
      const numberArray = shuffleArray(generateArray());
      let currNumber;
      console.log(numberArray);

      currNumber = numberArray.pop();
      setCurrentNumber(currNumber);
      setNumberArrayLeft(numberArray);
      setLettersLeft(numberArray.length);
      intervalID = setInterval(() => {
        if (numberArray.length === 0) {
          clearInterval(intervalID);
          resetGame();
        } else {
          if (pickedLetter === '') {
            setLetters((prevValue) => {
              let newValue = prevValue;
              const letterIndex = letters.findIndex((item) => item.number === currNumber);
              newValue[letterIndex].status = 'miss';
              return newValue;
            });
            setLettersMissed((prev) => prev + 1);
          }
          currNumber = numberArray.pop();
          setCurrentNumber(currNumber);
          setNumberArrayLeft(numberArray);
          setLettersLeft(numberArray.length);
        }
      }, interval);
    }
  };

  const restartInterval = () => {
    clearInterval(intervalID);
    const interval = getInterval();
    const numberArray = numberArrayLeft;
    if (currentNumber === letters.find((item) => item.letter === pickedLetter)?.number) {
      setLetters((prevValue) => {
        let newValue = prevValue;
        const letterIndex = letters.findIndex((item) => item.letter === pickedLetter);
        if (letterIndex >= 0) {
          newValue[letterIndex].status = 'hit';
        }
        return newValue;
      });
      setLettersHit((prev) => prev + 1);
    } else {
      setLetters((prevValue) => {
        let newValue = prevValue;
        const letterIndex = letters.findIndex((item) => item.letter === pickedLetter);
        if (letterIndex >= 0) {
          newValue[letterIndex].status = 'miss';
        }
        return newValue;
      });
      setLettersMissed((prev) => prev + 1);
    }
    setCurrentNumber(numberArray.pop());
    setNumberArrayLeft(numberArray);
    setLettersLeft(numberArray.length);
    intervalID = setInterval(() => {
      if (numberArray.length === 0) {
        clearInterval(intervalID);
        resetGame();
      } else {
        if (pickedLetter === '') {
          setLetters((prevValue) => {
            let newValue = prevValue;
            const letterIndex = letters.findIndex((item) => item.number === currentNumber);
            newValue[letterIndex].status = 'miss';
            return newValue;
          });
          setLettersMissed((prev) => prev + 1);
        }
        setCurrentNumber(numberArray.pop());
        setNumberArrayLeft(numberArray);
        setLettersLeft(numberArray.length);
      }
    }, interval);
  };

  useEffect(() => {
    if (pickedLetter !== '') {
      restartInterval();
    }
  }, [pickedLetter]);

  const handleInputChange = (event) => {
    if (event.key === 'Enter') {
      setPickedLetter(event.target.value.toUpperCase());
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
          <Options
            difficulty={difficulty}
            setDifficulty={setDifficultyValue}
            handleInputChange={handleInputChange}
            currentNumber={currentNumber}
            startGame={startGame}
            inputDisabled={inputDisabled}
            buttonLabel={buttonLabel}
            difficultyDisabled={difficultyDisabled}
          />
        </Grid>
        <Grid item xs={3}>
          <Score lettersLeft={lettersLeft} lettersHit={lettersHit} lettersMissed={lettersMissed} />
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
