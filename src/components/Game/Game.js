import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import LetterItem from '../LetterItem/LetterItem';
import './Game.scss';

function Game(props) {
  return (
    <div className="GameContainer">
      <Grid container spacing={0}>
        {props.letters.map((letterObj, index) => {
          return (
            <Grid key={letterObj.letter + index} item xs={2}>
              <LetterItem letter={letterObj} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

Game.propTypes = {
  letters: PropTypes.arrayOf(
    PropTypes.shape({
      status: PropTypes.string,
      letter: PropTypes.string,
      number: PropTypes.number,
    })
  ),
};

export default Game;
