import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import TokenService from "../../services/token-service";
import { changePassword, changePasswordProfile } from "../../actions/auth";
import { clearMessage } from "../../actions/message";
import { useNavigate } from "react-router-dom";
import './css/ChangePassword.css';

const CricChangePassword = ({ role, logout }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  
  let navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(clearMessage());
  }, [dispatch]);

  const onChangeOldPassword = (e) => {
    const password = e.target.value;
    setOldPassword(password);
    setError((prev) => ({ ...prev, oldPassword: "" }));
    setSuccessMessage("");
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setNewPassword(password);
    setError((prev) => ({ ...prev, newPassword: "" }));
    setSuccessMessage("");
  };

  const onChangeConfirmPassword = (e) => {
    const password = e.target.value;
    setConfirmNewPassword(password);
    setError((prev) => ({ ...prev, confirmNewPassword: "" }));
    setSuccessMessage("");
  };

  const validateInput = () => {
    const newErrors = {};

    if (!oldPassword) {
      newErrors.oldPassword = "Old password is required.";
    }

    if (!newPassword) {
      newErrors.newPassword = "New password is required.";
    } else if (newPassword.length < 6 || newPassword.length > 40) {
      newErrors.newPassword = "Password must be between 6 and 40 characters.";
    }

    if (!confirmNewPassword) {
      newErrors.confirmNewPassword = "Please confirm the new password.";
    } else if (newPassword !== confirmNewPassword) {
      newErrors.confirmNewPassword =
        "Password and Confirm Password do not match.";
    }

    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setLoading(true);
    
    const user = TokenService.getUser(role);
    if (validateInput()) {
      if (user && user.accountStatus === "ACTIVE") {
        dispatch(changePasswordProfile(oldPassword, newPassword, role))
          .then((data) => {
            setLoading(false);
            console.log("cp profile data:", data);
            if (data.status === 401) {
              if (data.data === "Wrong password") {
                setError((prev) => ({ ...prev, oldPassword: "Incorrect old password" }));
              } else {
                logout();
              }
            } else {
              if (data.status === 200) {
                setSuccessMessage("Password Changed Successfully!");
                // Clear fields
                setOldPassword("");
                setNewPassword("");
                setConfirmNewPassword("");
              } else {
                setError((prev) => ({ ...prev, oldPassword: data || "An error occurred" }));
              }
            }
          })
          .catch(() => {
            setLoading(false);
            setError((prev) => ({ ...prev, oldPassword: "An error occurred. Please try again." }));
          });
      } else {
        const userId = user.userId;
        dispatch(changePassword(oldPassword, newPassword, userId, role))
          .then((data) => {
            setLoading(false);
            console.log("cp data:", data);
            if (data.status === 401) {
              if (data.data === "Wrong password") {
                setError((prev) => ({ ...prev, oldPassword: "Incorrect old password" }));
              } else {
                logout();
              }
            } else {
              if (data.status === 200) {
                setSuccessMessage("Password Changed Successfully!");
                // Navigate after a short delay
                setTimeout(() => navigate("/home"), 1500);
              } else {
                setError((prev) => ({ ...prev, oldPassword: data || "An error occurred" }));
              }
            }
          })
          .catch(() => {
            setLoading(false);
            setError((prev) => ({ ...prev, oldPassword: "An error occurred. Please try again." }));
          });
      }
    } else {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="reset-password-root">
      <div className="reset-password-container">
        <div className="reset-password-header-container">
          <label className="reset-password-header">Change Password</label>
        </div>
        <div className="reset-password-body-container">
          {successMessage && (
            <div style={{ color: '#10b981', textAlign: 'center', fontWeight: 'bold', marginBottom: '10px' }}>
              {successMessage}
            </div>
          )}
          
          <div>
            <input
              placeholder="OLD PASSWORD"
              type="password"
              className="reset-password-input"
              value={oldPassword}
              onChange={(e) => onChangeOldPassword(e)}
            />
            {error.oldPassword && <div className="error-message">{error.oldPassword}</div>}
          </div>
          
          <div>
            <input
              placeholder="NEW PASSWORD"
              type="password"
              className="reset-password-input"
              value={newPassword}
              onChange={(e) => onChangePassword(e)}
            />
            {error.newPassword && <div className="error-message">{error.newPassword}</div>}
          </div>
          
          <div>
            <input
              placeholder="CONFIRM PASSWORD"
              type="password"
              className="reset-password-input"
              value={confirmNewPassword}
              onChange={(e) => onChangeConfirmPassword(e)}
            />
            {error.confirmNewPassword && <div className="error-message">{error.confirmNewPassword}</div>}
          </div>
          
          <button 
            className="reset-password-button" 
            onClick={(e) => handleChangePassword(e)}
            disabled={loading}
          >
            {loading ? "Processing..." : "Change Password"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CricChangePassword;
