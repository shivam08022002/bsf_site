import React from "react";
import { isEmail, isMobilePhone } from "validator";
import TokenService from "../../services/token-service";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const validEmail = (value) => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                This is not a valid email.
            </div>
        );
    }
};

const vusername = (value) => {
    const re = /^\S*$/;
    if (!re.test(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                User Name can not contain spaces.
            </div>
        );
    } else if (value.length < 3 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                The username must be between 3 and 20 characters.
            </div>
        );
    }
};

const vpassword = (value) => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="alert alert-danger" role="alert">
                The password must be between 6 and 40 characters.
            </div>
        );
    }
};

const validPhone = (value) => {
    console.log(value)
    if (!isMobilePhone(value) || value.length < 10) {
        return (
            <div className="alert alert-danger" role="alert">
                This is not a valid phone.
            </div>
        );
    }
};

const validCommission = (value) => {
    console.log(value)
    if (value > 100 || value < 0) {
        return (
            <div className="alert alert-danger" role="alert">
                Please enter in valid range (0 - 100).
            </div>
        );
    }
};

const UserNotificationPopup = ({ role, logout, notificationMessage, closeAgentNotificationPopup }) => {
    let registerBy = role;
    const user = TokenService.getUser();

    if (user === null) {
        logout();
    }

    return (
        <div className="user-notification-popup-container">
            <div className="user-notification-popup-header">
                <label>NICE 247 Important Notice</label>
            </div>
            <div className="user-notification-popup-body">
                <label>{notificationMessage}</label>
            </div>
            <div className="user-notification-popup-separator"></div>
            <div className="user-notification-popup-close-button">
                <button
                    className="board-buttons board-buttons-nav-bar-dark-small-agent-notification-close" style={{border: "none"}}
                    onClick={(e) => closeAgentNotificationPopup(e)} >Close</button>
            </div>
        </div>
    );
};

export default UserNotificationPopup;