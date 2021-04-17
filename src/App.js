import React, { useState, useEffect } from 'react';
import './App.css';
import { Grid } from '@material-ui/core';
import Options from './components/Options/Options';
import Score from './components/Score/Score';
import Game from './components/Game/Game';
import { difficultyValues, generateArray, generateLetters, shuffleArray } from './utils/utils';

function App() {
  const [difficulty, setDifficultyValue] = useState('medium');
  const [pickedLetter, setPickedLetter] = useState();
  const [inputDisabled, setInputDisabled] = useState(true);
  const [difficultyDisabled, setDifficultyDisabled] = useState(false);
  const [currentNumber, setCurrentNumber] = useState(null);
  const [letters, setLetters] = useState(generateLetters());
  const [buttonLabel, setButtonLabel] = useState('Start game');
  const [intervalID, setIntervalID] = useState();
  const [numberArrayLeft, setNumberArrayLeft] = useState();
  const [lettersHit, setLettersHit] = useState(0);
  const [lettersMissed, setLettersMissed] = useState(0);
  const [lettersLeft, setLettersLeft] = useState(26);

  const getInterval = () => {
    return difficultyValues.find((item) => item.name === difficulty).value;
  };

  const startGame = (option) => {
    if (option === 'Stop') {
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
    } else {
      setButtonLabel('Stop');
      setDifficultyDisabled(true);
      setInputDisabled(false);
      const interval = getInterval();
      const numberArray = shuffleArray(generateArray());

      setCurrentNumber(numberArray.pop());
      setNumberArrayLeft(numberArray);

      setLettersLeft(numberArray.length);
      setIntervalID(
        setInterval(() => {
          if (numberArray.length === 0) {
            clearInterval(intervalID);
          }
          setCurrentNumber(numberArray.pop());
          setNumberArrayLeft(numberArray);
          setLettersLeft(numberArray.length);
        }, interval)
      );
    }
  };

  const restartInterval = () => {
    const interval = getInterval();
    const numberArray = numberArrayLeft;
    clearInterval(intervalID);
    if (currentNumber === letters.find((item) => item.letter === pickedLetter)?.number) {
      setLetters((prevValue) => {
        let newValue = prevValue;
        const letterIndex = letters.findIndex((item) => item.letter === pickedLetter);
        newValue[letterIndex].status = 'hit';
        return newValue;
      });
      setLettersHit((prev) => prev + 1);
    } else {
      setLetters((prevValue) => {
        let newValue = prevValue;
        const letterIndex = letters.findIndex((item) => item.letter === pickedLetter);
        newValue[letterIndex].status = 'miss';
        return newValue;
      });
      setLettersMissed((prev) => prev + 1);
    }
    setCurrentNumber(numberArray.pop());
    setNumberArrayLeft(numberArray);
    setLettersLeft(numberArray.length);
    setIntervalID(
      setInterval(() => {
        if (numberArray.length === 0) {
          clearInterval(intervalID);
        }
        setCurrentNumber(numberArray.pop());
        setNumberArrayLeft(numberArray);
        setLettersLeft(numberArray.length);
      }, interval)
    );
  };

  useEffect(() => {
    if (pickedLetter && pickedLetter !== '') {
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
