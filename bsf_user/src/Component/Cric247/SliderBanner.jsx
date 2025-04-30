import React, { useState, useEffect, useRef, useCallback } from 'react';
import './css/SliderBanner.css';
import Banner1 from '../../assets/banner/Banner1.png';
import Banner2 from '../../assets/banner/Banner2.png';
import Banner3 from '../../assets/banner/Banner3.jpeg';

const SliderBanner = () => {
  // Using your actual banner images
  const bannerImages = [
    Banner1,
    Banner2,
    Banner3
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [prevSlide, setPrevSlide] = useState(bannerImages.length - 1);
  const timerRef = useRef(null);
  const isPausedRef = useRef(false);
  
  // Define goToNextSlide as a useCallback to avoid recreation on each render
  const goToNextSlide = useCallback(() => {
    setPrevSlide(currentSlide);
    setCurrentSlide((prev) => (prev === bannerImages.length - 1 ? 0 : prev + 1));
  }, [currentSlide, bannerImages.length]);
  
  // Reset the timer whenever the dependencies change
  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    timerRef.current = setInterval(() => {
      if (!isPausedRef.current) {
        goToNextSlide();
      }
    }, 2000);
    
    // Clear interval on unmount
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [goToNextSlide]);
  
  // Manual navigation
  const goToSlide = (index) => {
    if (index === currentSlide) return;
    
    setPrevSlide(currentSlide);
    setCurrentSlide(index);
  };
  
  const goToPrevSlide = () => {
    const newIndex = currentSlide === 0 ? bannerImages.length - 1 : currentSlide - 1;
    setPrevSlide(currentSlide);
    setCurrentSlide(newIndex);
  };

  const handleMouseEnter = () => {
    isPausedRef.current = true;
  };

  const handleMouseLeave = () => {
    isPausedRef.current = false;
  };

  // Force the component to re-render every 2 seconds
  useEffect(() => {
    const forceUpdateInterval = setInterval(() => {
      // This empty function just forces a re-render
    }, 2000);
    
    return () => clearInterval(forceUpdateInterval);
  }, []);

  return (
    <div 
      className="slider-banner" 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="slides">
        {bannerImages.map((image, index) => (
          <div 
            key={index} 
            className={`slide ${index === currentSlide ? 'active' : ''} ${index === prevSlide ? 'prev' : ''}`}
            data-testid={`slide-${index}`}
          >
            <img src={image} alt={`Banner ${index + 1}`} />
          </div>
        ))}
      </div>
      
      <button className="slider-arrow prev" onClick={goToPrevSlide} aria-label="Previous slide">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      
      <button className="slider-arrow next" onClick={goToNextSlide} aria-label="Next slide">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
      
      <div className="slider-dots">
        {bannerImages.map((_, index) => (
          <button 
            key={index} 
            className={`dot ${index === currentSlide ? 'active' : ''}`} 
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default SliderBanner;