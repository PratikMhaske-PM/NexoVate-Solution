import React, { useState } from 'react';
import './ServiceCard.css';

const ServiceCard = ({ icon, title, description }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="service-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="icon-container">
        <div className="icon-wrapper">
          {icon}
        </div>
        <h3 className="service-title">{title}</h3>
      </div>
      <p className="service-description">{description}</p>
      
      <div className={`learn-more ${isHovered ? 'visible' : ''}`}>
        <span>Learn more</span>
        <svg className="arrow-icon" width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </div>
    </div>
  );
};

export default ServiceCard;