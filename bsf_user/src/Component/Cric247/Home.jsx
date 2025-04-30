import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SliderBanner from './SliderBanner';
import HomeModal from './HomeModal';
import './css/Home.css';
// Import SVG assets
import cricketSvg from '../../assets/cricket-svgrepo-com.svg';
import games2Svg from '../../assets/games-control-svgrepo-com (1).svg';
import trophySvg from '../../assets/trophy-svgrepo-com1.svg';
import calendarSvg from '../../assets/calendar-svgrepo-com.svg';
import casinoSvg from '../../assets/casino-cards-svgrepo-com.svg';
import passwordSvg from '../../assets/password-account-security-reset-safety-svgrepo-com.svg';
import transactionalSvg from '../../assets/financial-report-svgrepo-com.svg';

const Home = () => {
  const navigate = useNavigate();

  const buttons = [
    {
      id: 'liveMatch',
      label: 'LIVE MATCH',
      path: '/inplay',
      iconSrc: cricketSvg
    },
    {
      id: 'rules',
      label: 'RULES',
      path: '/rules',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
      )
    },
    {
      id: 'ledger',
      label: 'LEDGER',
      path: '/ledger',
      iconSrc: transactionalSvg
    },
    {
      id: 'statement',
      label: 'STATEMENT',
      path: '/statement',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
          <line x1="8" y1="14" x2="16" y2="14"></line>
          <line x1="8" y1="18" x2="12" y2="18"></line>
        </svg>
      )
    },
    {
      id: 'password',
      label: 'PASSWORD',
      path: '/changepassword',
      iconSrc: passwordSvg
    },
    {
      id: 'upcoming',
      label: 'UPCOMING',
      path: '/upcoming',
      iconSrc: calendarSvg
    },
    {
      id: 'virtualgames',
      label: 'VIRTUAL GAMES',
      path: '/virtualgames',
      iconSrc: games2Svg
    },
    {
      id: 'games',
      label: 'CASINO GAMES',
      path: '/casino',
      iconSrc: casinoSvg
    },
    {
      id: 'settings',
      label: 'SETTINGS',
      path: '/settings',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
      )
    },
    {
      id: 'tournament',
      label: 'TOURNAMENT',
      path: '/tournament',
      iconSrc: trophySvg
    },

   
  ];

  const handleButtonClick = (path) => {
    navigate(path);
  };


  // Dividing buttons into two groups
  const firstGroup = buttons.slice(0, 5);
  const secondGroup = buttons.slice(5);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="home-container">
      <HomeModal />
      <div className="home-content">
        <div className="home-button-container-parent">
          <div className="home-button-container">
            {firstGroup.map((button) => (
              <button
                key={button.id}
                className="home-button"
                onClick={() => handleButtonClick(button.path)}
              >
                <div className="button-icon">
                  {button.iconSrc ? 
                    <img src={button.iconSrc} alt={button.label} className="button-svg" width="24" height="24" /> : 
                    button.icon
                  }
                </div>
                <div className="button-label">{button.label}</div>
              </button>
            ))}
          </div>
          <div className="home-button-container">
            {secondGroup.map((button) => (
              <button
                key={button.id}
                className="home-button"
                onClick={() => handleButtonClick(button.path)}
              >
                <div className="button-icon">
                  {button.iconSrc ? 
                    <img src={button.iconSrc} alt={button.label} className="button-svg" width="24" height="24" /> : 
                    button.icon
                  }
                </div>
                <div className="button-label">{button.label}</div>
              </button>
            ))}
          </div>
        </div>
        <SliderBanner />
      </div>
    </div>
  );
};

export default Home; 