import React from 'react';
import PropTypes from 'prop-types';
import './LetterItem.scss';

function LetterItem(props) {
  return (
    <div className="LetterItemContainer">
      <span className={`LetterItemContainer__letter ${props.letter.status}`}>
        {props.letter.letter} ({props.letter.number})
      </span>
    </div>
  );
}

LetterItem.propTypes = {
  letter: PropTypes.shape({
    status: PropTypes.string,
    letter: PropTypes.string,
    number: PropTypes.number,
  }),
};

export default LetterItem;
