import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './css/Sidebar.css';
import TokenService from "../../services/token-service";
import { httpHelpers } from "../../services/httpHelpers";

// Custom icon components using SVG
const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18l6-6-6-6"></path>
  </svg>
);

const Sidebar = ({ isOpen, toggleSidebar, handleLogout, user }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [balance, setBalance] = useState(0);
  const api = httpHelpers();

  const menuItems = [
    { label: 'HOME', path: '/home' },
    { label: 'SCHEDULE', path: '/schedule' },
    { label: 'LIVE MATCH', path: '/inplay' },
    { label: 'TOURNAMENT', path: '/tournament' },
    { label: 'UPCOMING', path: '/upcoming' },
    { label: 'RULES', path: '/rules' },
    { label: 'LEDGER', path: '/ledger' },
    { label: 'STATEMENT', path: '/statement' },
    { label: 'PROFIT LOSS', path: '/profitloss' },
    { label: 'BET HISTORY', path: '/bethistory' },
    { label: 'LOGIN HISTORY', path: '/loginhistory' },
    { label: 'PASSWORD HISTORY', path: '/passwordhistory' },
    { label: 'PASSWORD', path: '/changepassword' },
    { label: ' CASINO GAMES', path: '/casino' },
    { label: 'SETTINGS', path: '/settings' },
    { label: 'LOGOUT', path: '/', isLogout: true }
  ];

  const fetchBalance = () => {
    api
      .get(`${"gamma/getBalance"}`)
      .then(res => {
        if (res && res.data) {
          if (res.status === 401) {
            if (handleLogout) handleLogout();
          } else if (res.status === 200) {
            setBalance(res.data.balance);
          }
        }
      })
      .catch(err => {
        console.log("error fetching balance", err);
        if (err) {
          if (err.data) {
            if (err.data.status && err.data.status === 401) {
              if (handleLogout) handleLogout();
            }
          } else if (err.response) {
            if (err.response.status && err.response.status === 401) {
              if (handleLogout) handleLogout();
            }
          }
        }
      });
  };

  useEffect(() => {
    if (user && user.accountStatus && user.accountStatus.includes("ACTIVE")) {
      fetchBalance();
    } else {
      const newUser = TokenService.getUser();
      if (newUser) {
        setBalance(newUser.balance);
      }
    }
  }, [user]);

  const handleNavigation = (item) => {
    if (item.isLogout) {
      // Clear the home modal flag when logging out
      localStorage.removeItem('homeModalShown');
      if (handleLogout) handleLogout();
    } else {
      navigate(item.path);
    }
    toggleSidebar();
  };

  return (
    <div className={`sidebar-overlay ${isOpen ? 'active' : ''}`} onClick={toggleSidebar}>
      <div className={`sidebar ${isOpen ? 'open' : ''}`} onClick={(e) => e.stopPropagation()}>
        <div className="sidebar-header">
        {user && (
          <div className="sidebar-user-info">
            <div className="sidebar-user-name">
            {/* <label>User: </label> */}
              <span>{user.userId || user.userName} ({user.firstName || ''})</span>
            </div>
            <div className="sidebar-user-balance">
              <label>Balance: </label>
              <span>{balance}</span>
            </div>
          </div>
        )}
          <button className="close-sidebar" onClick={toggleSidebar}>
            <CloseIcon />
          </button>


        </div>


        
        <div className="sidebar-menu">
          {menuItems.map((item, index) => (
            <div 
              key={index}
              className={`menu-item ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => handleNavigation(item)}
            >
              <span className="menu-text">{item.label}</span>
              <span className="arrow-icon">
                <ArrowRightIcon />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;