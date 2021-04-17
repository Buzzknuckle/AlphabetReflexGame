import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Options.scss';
import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@material-ui/core';

function Options(props) {
  const [inputValue, setInputValue] = useState('');

  const handleDifficultyChange = (event) => {
    props.setDifficulty(event.target.value);
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
          <RadioGroup
            aria-label="options"
            name="options"
            value={props.difficulty}
            onChange={handleDifficultyChange}
            row
          >
            <FormControlLabel
              value="easy"
              disabled={props.difficultyDisabled}
              control={<Radio color="primary" />}
              label="Easy"
            />
            <FormControlLabel
              value="medium"
              disabled={props.difficultyDisabled}
              control={<Radio color="primary" />}
              label="Medium"
            />
            <FormControlLabel
              value="hard"
              disabled={props.difficultyDisabled}
              control={<Radio color="primary" />}
              label="Hard"
            />
          </RadioGroup>
        </FormControl>
      </div>
      <div className="OptionsContainer__start">
        <Button
          variant="outlined"
          color={props.buttonLabel === 'Stop' ? 'secondary' : 'primary'}
          onClick={() => props.startGame(props.buttonLabel)}
        >
          {props.buttonLabel}
        </Button>
      </div>
      <div className="OptionsContainer__letter">
        <div className="OptionsContainer__letter-number">{props.currentNumber}</div>
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
          disabled={props.inputDisabled}
        />
      </div>
    </div>
  );
}

Options.propTypes = {
  difficulty: PropTypes.string,
  currentNumber: PropTypes.number,
  buttonLabel: PropTypes.string,
  inputDisabled: PropTypes.bool,
  difficultyDisabled: PropTypes.bool,
  handleInputChange: PropTypes.func,
  setDifficulty: PropTypes.func,
  startGame: PropTypes.func,
};

export default Options;
