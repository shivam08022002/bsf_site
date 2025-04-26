import React from 'react';
import './css/VirtualGames.css';
export const HEIGHT_LAZY_IMAGE = "100%";
export const WIDTH_LAZY_IMAGE = "100%";
export const HEIGHT_LAZY_IMAGE_PIXEL = "100px";
export const WIDTH_LAZY_IMAGE_PIXEL = "100px";
import { LazyLoadImage} from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import AVIATOR_IMG from '../../assets/aviator.jpeg';
import PUSPARANI_IMG from '../../assets/pusparani.jpeg';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const VirtualGames = () => {

  let navigate = useNavigate();
  
  const handleAviatorClick = (e) => {
    console.log("aviator click")
    e.preventDefault();
    navigate("/aviator");
  };

  const handlePusparaniClick = (e) => {
    console.log("aviator click")
    e.preventDefault();
    navigate("/pushparani");  };
 
    useEffect(() => {
    window.scrollTo(0, 0);
}, []);

  const banners = {
    casino: {
      title: "Virtual Games",
      tagline: "Experience the Thrill of the Game",
      bgImage: PUSPARANI_IMG,
    },
  };

  const currentBanner = banners["casino"] || banners.casino;

  
  return (
    <div className="virtual-games-root">
      <div className="virtual-games-container">
        <div
          className="casino-page-banner"
          style={{ backgroundImage: `url(${currentBanner.bgImage})`, }}
        >
          <div className="banner-content">
            <div className="banner-text">
              <h1>{currentBanner.title}</h1>
              <p>{currentBanner.tagline}</p>
            </div>
          </div>
        </div>
        <div className="virtual-game-container">
          <div className="virtual-game-card">
            <LazyLoadImage
              height={HEIGHT_LAZY_IMAGE}
              width={WIDTH_LAZY_IMAGE}
              alt={"aviator"}
              effect="blur"
              src={AVIATOR_IMG}
              wrapperProps={{
                // If you need to, you can tweak the effect transition using the wrapper style.
                style: { transitionDelay: "0s" },
              }}
            />
            <div className="card-buttons">
              <button className="btn-grad" onClick={(e) => handleAviatorClick(e)}>Play</button>
              <button className="btn" onClick={(e) => handleAviatorClick(e)}>AVIATOR</button>
            </div>
          </div>
          <div className="virtual-game-card">
            <LazyLoadImage
              height={HEIGHT_LAZY_IMAGE}
              width={WIDTH_LAZY_IMAGE}
              alt={"pusparani"}
              effect="blur"
              src={PUSPARANI_IMG}
              wrapperProps={{
                // If you need to, you can tweak the effect transition using the wrapper style.
                style: { transitionDelay: "0s" },
              }}
            />
            <div className="card-buttons">
              <button className="btn-grad" onClick={(e) => handlePusparaniClick(e)}>Play</button>
              <button className="btn" onClick={(e) => handlePusparaniClick(e)}>PUSHPARANI</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualGames;