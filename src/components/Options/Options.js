import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@material-ui/core';
import './Options.scss';
import { difficultyChange } from '../../store/actions/difficultyActions';

function Options(props) {
  const { buttonLabel, inputDisabled } = useSelector((state) => state.root);
  const { difficulty, difficultyDisabled } = useSelector((state) => state.difficulty);
  const { currentNumber } = useSelector((state) => state.gameNumbers);

  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState('');

  const handleDifficultyChange = (event) => {
    dispatch(difficultyChange(event.target.value));
  };

  const handleInputChange = (event) => {
    let value = event.target.value;
    value = value.replace(/[0-9]/, '');
    value = value.replace(/[-!$%@#^&*()_+|~=`{}\[\]:";'<>?,.\/]/, '');
    setInputValue(value);
  };

  return (
    <div className="OptionsContainer">
      <div className="OptionsContainer__radio">
        <FormControl component="fieldset">
          <FormLabel component="legend">Select difficulty:</FormLabel>
          <RadioGroup aria-label="options" name="options" value={difficulty} onChange={handleDifficultyChange} row>
            <FormControlLabel
              value="easy"
              disabled={difficultyDisabled}
              control={<Radio color="primary" />}
              label="Easy"
            />
            <FormControlLabel
              value="medium"
              disabled={difficultyDisabled}
              control={<Radio color="primary" />}
              label="Medium"
            />
            <FormControlLabel
              value="hard"
              disabled={difficultyDisabled}
              control={<Radio color="primary" />}
              label="Hard"
            />
          </RadioGroup>
        </FormControl>
      </div>
      <div className="OptionsContainer__start">
        <Button
          variant="outlined"
          color={buttonLabel === 'Stop' ? 'secondary' : 'primary'}
          onClick={() => props.startGame(buttonLabel)}
        >
          {buttonLabel}
        </Button>
      </div>
      <div className="OptionsContainer__letter">
        <div className="OptionsContainer__letter-number">{currentNumber}</div>
      </div>
      <div className="OptionsContainer__letter-input">
        <TextField
          label="Input Letter"
          variant="outlined"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={(event) => {
            props.handleInputChange(event);
            setInputValue('');
          }}
          inputProps={{
            maxLength: 1,
          }}
          disabled={inputDisabled}
        />
      </div>
    </div>
  );
}

export default Options;
