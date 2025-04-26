import React, { useState, useEffect, useRef } from 'react';
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
  const sliderIntervalRef = useRef(null);
  const isPausedRef = useRef(false);
  
  const startAutoSlide = () => {
    if (sliderIntervalRef.current) {
      clearInterval(sliderIntervalRef.current);
    }
    
    sliderIntervalRef.current = setInterval(() => {
      if (!isPausedRef.current) {
        goToNextSlide();
      }
    }, 2000); // Change slide every 2 seconds
  };
  
  useEffect(() => {
    startAutoSlide();
    
    return () => {
      if (sliderIntervalRef.current) {
        clearInterval(sliderIntervalRef.current);
      }
    };
  }, []);
  
  // Manual navigation
  const goToSlide = (index) => {
    if (index === currentSlide) return;
    
    setPrevSlide(currentSlide);
    setCurrentSlide(index);
    startAutoSlide(); // Reset timer after manual navigation
  };
  
  const goToPrevSlide = () => {
    const newIndex = currentSlide === 0 ? bannerImages.length - 1 : currentSlide - 1;
    setPrevSlide(currentSlide);
    setCurrentSlide(newIndex);
    startAutoSlide(); // Reset timer after manual navigation
  };
  
  const goToNextSlide = () => {
    const newIndex = currentSlide === bannerImages.length - 1 ? 0 : currentSlide + 1;
    setPrevSlide(currentSlide);
    setCurrentSlide(newIndex);
  };

  const handleMouseEnter = () => {
    isPausedRef.current = true;
  };

  const handleMouseLeave = () => {
    isPausedRef.current = false;
  };

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
          >
            <img src={image} alt={`Banner ${index + 1}`} />
          </div>
        ))}
      </div>
      
      <button className="slider-arrow prev" onClick={goToPrevSlide}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      
      <button className="slider-arrow next" onClick={goToNextSlide}>
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
          />
        ))}
      </div>
    </div>
  );
};

export default SliderBanner;