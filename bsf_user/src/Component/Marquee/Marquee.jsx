import React from 'react';
import './Marquee.css';

const Marquee = ({bannerMessage}) => {
  return (
    <div className="marquee-container">
      <div className="marquee-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
      </div>
      <div className="marquee-content">
        <span>{ bannerMessage || 'Welcome to NICE 247! Play and win exciting games. Latest updates and promotions available. Enjoy your gaming experience.'}</span>
      </div>
    </div>
  );
};

export default Marquee; 