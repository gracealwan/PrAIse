import React from 'react';

const ToggleButton = ({ handleClick, currentPage }) => {
  return (
    <button onClick={handleClick}>
      {currentPage === 'home' ? 'About' : 'Home'}
    </button>
  );
};

export default ToggleButton;
