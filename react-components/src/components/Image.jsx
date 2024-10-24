import React from 'react';

const Image = ({ src, alt, position = 'top', style }) => (
  <img 
    src={src} 
    alt={alt} 
    className={`card-image ${position}`} 
    style={style} 
  />
);

export default Image;
