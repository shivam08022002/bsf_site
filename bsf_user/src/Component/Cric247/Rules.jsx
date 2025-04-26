import './css/Rules.css';
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from "react"
import UserNotificationPopup from './UserNotificationPopup';
import Modal from './Modal';
import TokenService from '../../services/token-service';
import CustomToggleButton from './CustomToggleButton';
import RulesPage from './RulesPage';
export default function Rules({ role, logout, isSmallScreen, userId }) {

    const { state } = useLocation();
    let navigate = useNavigate();
    const { notificationMessage } = state ? state : "";
    console.log("rules", userId, notificationMessage);

    useEffect(() => {
        window.scrollTo(0, 0);
        console.log("rules", "useEffect", notificationMessage);
        const isNotificationPopupDisplayed = TokenService.isNotificationPopupDisplayed(userId);
        console.log("rules", isNotificationPopupDisplayed);
        if (!isNotificationPopupDisplayed && notificationMessage) {
            setModalOpen(true);
        }
    }, [notificationMessage]);

    const [isModalOpen, setModalOpen] = useState(false);
    const closeAgentNotificationPopup = (e) => {
        e.preventDefault();
        TokenService.notificationPopupDisplayed(userId);
        setModalOpen(false);
    };

    const [language, setLanguage] = useState('en');
    const handleLanguageChange = (newLanguage) => {
        setLanguage(newLanguage);
    };

    const goToHomePage = () => {
        navigate("/home");
    };

    return (
        <div className="rules-root">
            {isModalOpen && (
                <Modal onClose={() => setModalOpen(false)} isSmallScreen={isSmallScreen}>
                    <UserNotificationPopup role={role} logout={logout} notificationMessage={notificationMessage} closeAgentNotificationPopup={closeAgentNotificationPopup} />
                </Modal>
            )}
            <div className="rules-toggle-button-container">
                <CustomToggleButton onLanguageChange={handleLanguageChange} />
            </div>
            <div className="rules-page-container">
                <RulesPage lang={language} onMainMenuClick={goToHomePage} />
            </div>
        </div>
    );
};