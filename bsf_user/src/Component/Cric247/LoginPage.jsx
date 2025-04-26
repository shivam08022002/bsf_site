import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../actions/auth";
import TokenService from "../../services/token-service";
import { httpHelpers } from "../../services/httpHelpers";
import './css/LoginPage.css';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState(null);
    const [captchaText, setCaptchaText] = useState('');
    const [userInput, setUserInput] = useState('');
    const [isValidCaptcha, setIsValidCaptcha] = useState(null);
    const canvasRef = useRef(null);

    // Function to generate random CAPTCHA text
    const generateCaptchaText = () => {
        const chars = '0123456789';
        let captcha = '';
        for (let i = 0; i < 4; i++) {
            captcha += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return captcha;
    };

    // Function to draw the CAPTCHA on the canvas
    const drawCaptcha = () => {
        const captcha = generateCaptchaText();
        setCaptchaText(captcha);

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Clear previous drawing
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Background color
        ctx.fillStyle = '#f3f3f3';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Set font to bold and size
        ctx.font = '600 18px Arial';
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#416b42';

        // Draw each character with a wavy effect
        const xStart = 30;
        const waveAmplitude = 8; // Reduced height of the wave
        const waveFrequency = 0.2; // Frequency of the wave

        // Adjust spacing between characters
        const charSpacing = 15;

        for (let i = 0; i < captcha.length; i++) {
            const char = captcha[i];

            // Calculate y position for wavy effect using sine wave
            const x = xStart + i * charSpacing; // Adjust x position for each character
            const y = canvas.height / 2 + Math.sin(i * waveFrequency) * waveAmplitude;

            ctx.fillText(char, x, y); // Draw each character at x, y
        }
    };

    // Regenerate CAPTCHA on mount and when needed
    useEffect(() => {
        window.scrollTo(0, 0);
        drawCaptcha();
    }, []);

    const onChangeUserName = (e) => {
        const un = e.target.value;
        const firstTwo = un.substring(0, 2).toUpperCase();
        const restOfString = un.substring(2);  // Get the rest of the string
        const username = firstTwo + restOfString;
        setUsername(username);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        setError(null);
        
        if (!username || !password) {
            setError("Please enter username and password");
            return;
        }
        
        if (userInput.toLowerCase() === captchaText.toLowerCase()) {
            setIsValidCaptcha(true);
        } else {
            setIsValidCaptcha(false);
            setUserInput('');
            drawCaptcha();
            return;
        }
        
        dispatch(login(username, password))
            .then((data) => {
                if (data.status === 401) {
                    setError("User name or password not found");
                    drawCaptcha();
                } else {
                    if (data.status === 200) {
                        if (data && data.data && data.data.accessToken === null) {
                            if (data.data.accountStatus.includes("NEW")) {
                                navigate("/changepassword");
                            }
                        }
                        if (data && data.data && data.data.accountStatus && data.data.accountStatus.includes("ACTIVE")) {
                            TokenService.setUser(data.data);
                            fetchNotificationMessage();
                        }
                    } else {
                        setError(data.data);
                        drawCaptcha();
                    }
                }
            })
            .catch(() => {
                setError("Connection Time Out.");
                drawCaptcha();
            });
    };

    let getNotificationMessage = "gamma/getGlobalProperty/userNotificationMessage";
    const api = httpHelpers();

    const fetchNotificationMessage = () => {
        api
            .get(`${getNotificationMessage}`)
            .then(res => {
                if (res && res.data) {
                    let notificationMessage = res.data;
                    navigate("/rules", { state: { notificationMessage } });
                } else {
                    navigate("/rules");
                }
            })
            .catch(err => {
                if (err) {
                    if (err.data) {
                        if (err.data.status && err.data.status === 401) {
                            // Handle logout if needed
                            navigate("/");
                        }
                    } else if (err.response) {
                        if (err.response.status && err.response.status === 401) {
                            // Handle logout if needed
                            navigate("/");
                        }
                    }
                }
            });
    };

    return (
        <div className="nice247-login-container">
            <div className="nice247-login-overlay">
                <div className="nice247-login-box">
                    <label className="nice247-login-title">NICE 247</label>    
                    <input
                        type="text"
                        className="nice247-login-input"
                        value={username}
                        onChange={onChangeUserName}
                        placeholder="User Name"
                    />
                    <input
                        type="password"
                        className="nice247-login-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                    <div className="captcha-container">
                        <canvas ref={canvasRef} width={120} height={44} style={{ border: '0.5px solid black' }} />
                    </div>
                    {isValidCaptcha === false && <p className="error-message">Enter Correct Number!</p>}
                    <input
                        type="tel"
                        className="nice247-login-input captcha-input"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        required
                        placeholder="Enter Number"
                    />
                    {error && <p className="error-message">{error}</p>}
                    <button className="nice247-login-button" onClick={handleLogin}>
                        LOG IN
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage; 