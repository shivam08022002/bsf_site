import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import TokenService from "../../services/token-service";
import { httpHelpers } from "../../services/httpHelpers";
import App_Icon from '../../assets/Nice-247.png';

const Header = ({ user, toggleSidebar, onLogout }) => {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(0);
  const [exposure, setExposure] = useState(0);
  const [, setForceUpdate] = useState(0); // Force UI update
  const api = httpHelpers();

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      // Navigate to the landing page
      navigate('/');
    }
  };

  const navigateToHome = () => {
    navigate('/home');
  };

  const navigateToLiveMatch = () => {
    navigate('/inplay');
  };

  const fetchBalance = () => {
    api
      .get(`${"gamma/getBalance"}`)
      .then(res => {
        if (res && res.data) {
          if (res.status === 401) {
            handleLogout();
          } else if (res.status === 200) {
            setBalance(res.data.balance);
            setExposure(res.data.exposure);
          }
        }
      })
      .catch(err => {
        console.log("error fetching balance", err);
        if (err) {
          if (err.data) {
            if (err.data.status && err.data.status === 401) {
              handleLogout();
            }
          } else if (err.response) {
            if (err.response.status && err.response.status === 401) {
              handleLogout();
            }
          }
        }
      });
  };

  const fetchBannerMessage = () => {
    api
      .get(`gamma/getGlobalProperty/userNotificationMessage`)
      .then(res => {
        console.log("get banner message res", res);
        if (res && res.data && user) {
          // Update the user object to include the banner message
          user.bannerMessage = res.data;
          // Force UI update
          setForceUpdate(prev => prev + 1);
        }
      })
      .catch(err => {
        console.log("error fetching banner message", err);
        if (err) {
          if (err.data) {
            if (err.data.status && err.data.status === 401) {
              handleLogout();
            }
          } else if (err.response) {
            if (err.response.status && err.response.status === 401) {
              handleLogout();
            }
          }
        }
      });
  };

  useEffect(() => {
    if (user && user.accountStatus && user.accountStatus.includes("ACTIVE")) {
      fetchBalance();
      fetchBannerMessage();

      // Set up a timer to fetch the balance every 5 seconds
      const intervalId = setInterval(() => {
        fetchBalance();
      }, 5000);

      // Clean up the interval when the component unmounts
      return () => clearInterval(intervalId);
    } else {
      const newUser = TokenService.getUser();
      if (newUser) {
        setBalance(newUser.balance);
      }
    }
  }, [user]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <header className="header">
      <div className="header-left-content">
        <div className="header-logo">
          <img src={App_Icon} alt="NICE 247" className="app-logo" onClick={() => navigate('/home')} />
        </div>
        
        <div className="header-user-info">
          <div className="user-info-item id">
            <span className="info-value">{user && user.userId || 'Guest'}&nbsp;{user && user.firstName ? `(${user.firstName})` : ''}</span>
          </div>
          <div className="user-info-coins">
            <div className="user-info-item">
              <span className="info-label">Coins:</span>
              <span className="info-value">{balance}</span>
            </div>
            <div className="user-info-item">
              <span className="info-label">Exp:</span>
              <span className="info-value exposure" style={{ color: exposure >= 0 ? 'lightgreen' : 'red' }}>
                {exposure < 0 ? `(${Math.abs(exposure)})` : exposure}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="header-actions">
        <button className="nav-button home" onClick={navigateToHome}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          <span>HOME</span>
        </button>
        <button className="nav-button live-match-button" onClick={navigateToLiveMatch}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <polygon points="10 8 16 12 10 16 10 8"></polygon>
          </svg>
          <span>LIVE MATCH</span>
        </button>
        <button className="nav-button logout-button" onClick={handleLogout}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          <span>LOGOUT</span>
        </button>
        <button className="menu-button" onClick={toggleSidebar}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header; 