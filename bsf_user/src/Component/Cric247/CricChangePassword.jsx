import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  let navigate = useNavigate();


  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(clearMessage());
  }, []);

  const onChangeOldPassword = (e) => {
    const password = e.target.value;
    setOldPassword(password);
    setError((prev) => ({ ...prev, oldPassword: "" }));
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setNewPassword(password);
    setError((prev) => ({ ...prev, newPassword: "" }));
  };

  const onChangeConfirmPassword = (e) => {
    const password = e.target.value;
    setConfirmNewPassword(password);
    setError((prev) => ({ ...prev, confirmNewPassword: "" }));
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
    const user = TokenService.getUser(role);
    if (validateInput()) {
      if (user && user.accountStatus === "ACTIVE") {
        dispatch(changePasswordProfile(oldPassword, newPassword, role))
          .then((data) => {
            console.log("cp profile data:", data);
            if (data.status === 401) {
              if (data.data === "Wrong password") {
                alert("wrong password");
              } else {
                logout();
              }
            } else {
              if (data.status === 200) {
                alert("Password Changed Successfully!");
              } else {
                alert(data);
              }
            }
          })
          .catch(() => {
          });
      } else {
        const userId = user.userId;
        dispatch(changePassword(oldPassword, newPassword, userId, role))
          .then((data) => {
            console.log("cp data:", data);
            if (data.status === 401) {
              if (data.data === "Wrong password") {
                alert("wrong password");
              } else {
                logout();
              }
            } else {
              if (data.status === 200) {
                navigate("/home");
              } else {
                alert(data);
              }
            }
          })
          .catch(() => {

          });
      }
    }
  };

  return (
    <div className="reset-password-root">
      <div className="reset-password-container">
        <div className="reset-password-header-container">
          <label className="reset-password-header">Change Password</label>
        </div>
        <div className="reset-password-body-container">
          <input
            placeholder="OLD PASSWORD"
            // label="Old Password"
            // variant="standard"
            // margin="normal"
            type="password"
            className="reset-password-input"
            onChange={(e) => onChangeOldPassword(e)}
            error={!!error.oldPassword}
            helperText={error.oldPassword}
          />
          <input
            placeholder="NEW PASSWORD"
            // label="New Password"
            // variant="standard"
            // margin="normal"
            type="password"
            className="reset-password-input"
            onChange={(e) => onChangePassword(e)}
            error={!!error.newPassword}
            helperText={error.newPassword}
          />
          <input
            placeholder="CONFIRM PASSWORD"
            // label="Confirm Password"
            // variant="standard"
            // margin="normal"
            type="password"
            className="reset-password-input"
            onChange={(e) => onChangeConfirmPassword(e)}
            error={!!error.confirmNewPassword}
            helperText={error.confirmNewPassword}
          />
          <button className="reset-password-button" onClick={(e) => handleChangePassword(e)}>Done</button>
        </div>
      </div>
    </div>
  );
};

export default CricChangePassword;
