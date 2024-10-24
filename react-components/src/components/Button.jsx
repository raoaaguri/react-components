import React from 'react';

const Button = ({ text, position = 'bottom-center', style, onClick }) => (
  <button 
    className={`card-button ${position}`} 
    style={style}
    onClick={onClick}
  >
    {text}
  </button>
);

export default Button;
