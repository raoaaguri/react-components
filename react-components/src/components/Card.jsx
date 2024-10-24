import React from 'react';
import './Card.css';

const Card = ({ 
  title, 
  description, 
  children 
}) => {
  return (
    <div className="card">
      {/* Check if children contain Image or Button components */}
      {children || (
        <>
          <div className="card-content">
            {title && <h3 className="card-title">{title}</h3>}
            {description && <p className="card-description">{description}</p>}
          </div>
        </>
      )}
    </div>
  );
};

export default Card;
