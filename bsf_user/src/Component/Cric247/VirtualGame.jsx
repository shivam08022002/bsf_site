import React, { useEffect } from 'react';
import './css/VirtualGames.css';
export const HEIGHT_LAZY_IMAGE = "100%";
export const WIDTH_LAZY_IMAGE = "100%";
export const HEIGHT_LAZY_IMAGE_PIXEL = "100px";
export const WIDTH_LAZY_IMAGE_PIXEL = "100px";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import AVIATOR_IMG from '../../assets/aviator.jpeg';
import PUSPARANI_IMG from '../../assets/pusparani.jpeg';
import { useNavigate } from 'react-router-dom';

const VirtualGames = () => {
  const navigate = useNavigate();
  
  const handleAviatorClick = (e) => {
    e.preventDefault();
    navigate("/aviator");
  };

  const handlePusparaniClick = (e) => {
    e.preventDefault();
    navigate("/pushparani");
  };
 
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="virtual-games-root">
      <div className="virtual-games-container">
        <div className="virtual-games-header">
          <h1>Virtual Games</h1>
          <p>Experience the Thrill of the Game</p>
        </div>

        <div className="virtual-game-container">
          <div className="virtual-game-card">
            <div className="game-image-container">
              <LazyLoadImage
                height="100%"
                width="100%"
                alt="Aviator Game"
                effect="blur"
                src={AVIATOR_IMG}
                wrapperProps={{
                  style: { transitionDelay: "0s" },
                }}
              />
              <div className="game-overlay">
                <h3>AVIATOR</h3>
                <p>Test your luck with the rising multiplier</p>
              </div>
            </div>
            <div className="card-buttons">
              <button className="btn-play" onClick={(e) => handleAviatorClick(e)}>Play Now</button>
              <button className="btn-info" onClick={(e) => handleAviatorClick(e)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
                Info
              </button>
            </div>
          </div>

          <div className="virtual-game-card">
            <div className="game-image-container">
              <LazyLoadImage
                height="100%"
                width="100%"
                alt="Pushparani Game"
                effect="blur"
                src={PUSPARANI_IMG}
                wrapperProps={{
                  style: { transitionDelay: "0s" },
                }}
              />
              <div className="game-overlay">
                <h3>PUSHPARANI</h3>
                <p>Discover the treasures of Pushparani</p>
              </div>
            </div>
            <div className="card-buttons">
              <button className="btn-play" onClick={(e) => handlePusparaniClick(e)}>Play Now</button>
              <button className="btn-info" onClick={(e) => handlePusparaniClick(e)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
                Info
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualGames;