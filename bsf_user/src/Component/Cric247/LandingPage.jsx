import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/LandingPage.css';

const LandingPage = () => {
    const navigate = useNavigate();

    const goToLoginPage = (e) => {
        e.preventDefault();
        setTimeout(() => {
            navigate('/login');
        }, 400);
    };

    return (
        <div className="landing-page-background-image">
            <div className="landing-page-content-container">
                <label className="landing-page-site-name-label">NICE 247</label>
                <span className="landing-page-separator"></span>
                <button className="landing-page-login-button" onClick={(e) => goToLoginPage(e)}>LOGIN</button>
            </div>
        </div>
    );
};

export default LandingPage; 