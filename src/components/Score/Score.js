import React from 'react';
import { useSelector } from 'react-redux';
import './Score.scss';

function Score() {
  const { lettersHit, lettersMissed, lettersLeft } = useSelector((state) => state.score);

  return (
    <div className="ScoreContainer">
      <span className="ScoreContainer__score">score</span>
      <span className="ScoreContainer__hit">hit: {lettersHit}</span>
      <span className="ScoreContainer__miss">miss: {lettersMissed}</span>
      <span className="ScoreContainer__left">left: {lettersLeft}</span>
    </div>
  );
}

export default Score;
