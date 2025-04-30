import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LandingPage from './Component/Cric247/LandingPage';
import { useSelector, useDispatch } from 'react-redux';
import LoginPage from './Component/Cric247/LoginPage';
import Rules from './Component/Cric247/Rules';
import Home from './Component/Cric247/Home';
import InPlay from './Component/Cric247/InPlay';
import Upcoming from './Component/Cric247/Upcoming';
import Tournament from './Component/Cric247/Tournament';
import CasinoPage from './Component/Casino247/CasinoPage';
import Settings from './Component/Cric247/Settings';
import CricChangePassword from './Component/Cric247/CricChangePassword';
import Sidebar from './Component/Cric247/Sidebar';
import Header from './Component/Header/Header';
import Footer from './Component/Footer/Footer';
import Marquee from './Component/Marquee/Marquee';
import UserNotificationPopup from './Component/Cric247/UserNotificationPopup';
import LedgerMatch from './component/ledger/LedgerMatch';
import Ledger from './component/ledger/Ledger';
import Statement from './Component/Statement/Statement';
import ProfitLoss from './Component/ProfitLoss/ProfitLoss';
import { logout } from './actions/auth';
import TokenService from './services/token-service';
import VirtualGames from './Component/Cric247/VirtualGame';
import Schedule from './Component/Cric247/Schedule';
import LoginHistory from './Component/Cric247/LoginHistory';
import PasswordHistory from './Component/Cric247/PasswordHistory';
import BetHistory from './Component/Cric247/BetHistory';
import TournamentMatches from './Component/Cric247/TournamentMatches';
import './App.css';
import MatchScreenCricket from './Component/MatchScreen/MatchScreenCricket';
// FooterWrapper component to conditionally render Footer
const FooterWrapper = ({ children }) => {
  const location = useLocation();
  const isRulesPage = location.pathname === '/rules';
  
  return (
    <>
      {children}
      {!isRulesPage && <Footer />}
    </>
  );
};

// Protected route component with layout
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const isRulesPage = location.pathname === '/rules';
  
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    TokenService.removeUser();
    // Clear the modal flag when logging out
    localStorage.removeItem('homeModalShown');
    dispatch(logout());
    Navigate('/');
  };
  
  return (
    <>
      <Header user={user} toggleSidebar={toggleSidebar} onLogout={handleLogout} />
      <Marquee bannerMessage={user?.bannerMessage} />
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} handleLogout={handleLogout} user={user} />
      <main className="main-content">
        {children}
      </main>
      {!isRulesPage && <Footer />}
    </>
  );
};

// Match screen route wrapper that excludes footer
const MatchScreenRoute = ({ children }) => {
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    TokenService.removeUser();
    localStorage.removeItem('homeModalShown');
    dispatch(logout());
    Navigate('/');
  };
  
  return (
    <>
      <Header user={user} toggleSidebar={toggleSidebar} onLogout={handleLogout} />
      <Marquee bannerMessage={user?.bannerMessage} />
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} handleLogout={handleLogout} user={user} />
      <main className="main-content">
        {children}
      </main>
      {/* No footer for match screen */}
    </>
  );
};

function App() {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);
  const [supportedSports] = useState([]);
  // const [role, setRole] = useState();
  const { user: currentUser } = useSelector((state) => state.auth);
  // const [user, setUser] = useState(null);
  const { user, isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    TokenService.removeUser();
    localStorage.removeItem('homeModalShown');
    dispatch(logout());
    Navigate('/');
  };

  const closeAgentNotificationPopup = () => {
    setShowNotification(false);
  };
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Router>
      <div className="app-container"> {showNotification && ( <UserNotificationPopup role="User" logout={handleLogout} notificationMessage={notificationMessage} closeAgentNotificationPopup={closeAgentNotificationPopup} /> )}
        
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/rules" element={<ProtectedRoute><Rules role="User" logout={handleLogout} isSmallScreen={isSmallScreen} setShowNotification={setShowNotification}setNotificationMessage={setNotificationMessage}userId={user ? user.userId : null}/></ProtectedRoute>} />
          <Route path="/home" element={<ProtectedRoute><Home user={user} role="User" logout={handleLogout} isSmallScreen={isSmallScreen} /></ProtectedRoute>}/>
          {/* ledger */}
          {currentUser && currentUser.userId && <Route path="/ledger" element={<ProtectedRoute><Ledger isLoggedIn={isLoggedIn} logout={handleLogout} supportedSports={supportedSports} userId={currentUser.userId} /></ProtectedRoute>} />}
          <Route path="/ledgermatch/:matchId" element={<ProtectedRoute><LedgerMatch role= "User" logout={handleLogout} /></ProtectedRoute>} />
          {/* End of ledger */}

          {/* Schedule */}
          <Route path="/schedule" element={<ProtectedRoute><Schedule /></ProtectedRoute>} />
          {/* End of Schedule */}

          {/* New routes */}
          <Route path="/statement" element={<ProtectedRoute><Statement /></ProtectedRoute>} />
          <Route path="/profitloss" element={<ProtectedRoute><ProfitLoss /></ProtectedRoute>} />
          <Route path="/bethistory" element={<ProtectedRoute><BetHistory /></ProtectedRoute>} />
          <Route path="/loginhistory" element={<ProtectedRoute><LoginHistory /></ProtectedRoute>} />
          <Route path="/passwordhistory" element={<ProtectedRoute><PasswordHistory /></ProtectedRoute>} />
          <Route path="/coinhistory" element={<ProtectedRoute><Statement /></ProtectedRoute>} />
          {/* End of new routes */}

          {/* Matches Routing */}
          <Route path="/inplay" element={<ProtectedRoute><InPlay role="User" logout={handleLogout} supportedSports={supportedSports} isSmallScreen={isSmallScreen} /></ProtectedRoute>}/>
          <Route path="/upcoming" element={<ProtectedRoute><Upcoming role="User" logout={handleLogout} supportedSports={supportedSports} isSmallScreen={isSmallScreen} /></ProtectedRoute>} />
          <Route path="/tournament" element={<ProtectedRoute><Tournament role="User" logout={handleLogout} isSmallScreen={isSmallScreen} /></ProtectedRoute>} />
          <Route path="/seriesmatches" element={<ProtectedRoute><TournamentMatches role="User" logout={handleLogout} supportedSports={supportedSports} isSmallScreen={isSmallScreen} /></ProtectedRoute>}/>
          <Route path="/inplay/matchscreen/:sport/:id/:title" element={<MatchScreenRoute><MatchScreenCricket role="User" logout={handleLogout} supportedSports={supportedSports} isSmallScreen={isSmallScreen} /></MatchScreenRoute>} />
          <Route path="/upcoming/matchscreen/:sport/:id/:title" element={<MatchScreenRoute><MatchScreenCricket role="User" logout={handleLogout} supportedSports={supportedSports} isSmallScreen={isSmallScreen} /></MatchScreenRoute>} />
          <Route path="/seriesmatches/matchscreen/:sport/:id/:title" element={<MatchScreenRoute><MatchScreenCricket role="User" logout={handleLogout} supportedSports={supportedSports} isSmallScreen={isSmallScreen} /></MatchScreenRoute>} />
  
          <Route path="/casino" element={<ProtectedRoute><CasinoPage role="User" logout={handleLogout} supportedSports={supportedSports} isSmallScreen={isSmallScreen} /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings role="User" isLoggedIn={isLoggedIn} logout={handleLogout} /></ProtectedRoute>} />
          <Route path="/virtualgames" element={<ProtectedRoute><VirtualGames role="User" isLoggedIn={isLoggedIn} logout={handleLogout} /></ProtectedRoute>} />
          {TokenService.getUser() && <Route path="/changepassword" element={<ProtectedRoute><CricChangePassword role="User" logout={handleLogout} /></ProtectedRoute>} />}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
