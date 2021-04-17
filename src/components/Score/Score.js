import React from 'react';
import PropTypes from 'prop-types';
import './Score.scss';

function Score(props) {
  return (
    <div className="ScoreContainer">
      <span className="ScoreContainer__score">score</span>
      <span className="ScoreContainer__hit">hit: {props.lettersHit}</span>
      <span className="ScoreContainer__miss">miss: {props.lettersMissed}</span>
      <span className="ScoreContainer__left">left: {props.lettersLeft}</span>
    </div>
  );
}

Score.propTypes = {
  lettersHit: PropTypes.number,
  lettersMissed: PropTypes.number,
  lettersLeft: PropTypes.number,
};

export default Score;
