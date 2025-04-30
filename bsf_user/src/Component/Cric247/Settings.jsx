import './css/Home.css';
import React, { useEffect, useState } from "react"
import { httpHelpers } from "../../services/httpHelpers";
import './css/Settings.css';
import { savePreBetPreferencesOnServer } from "../../actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage } from "../../actions/message";

export default function Settings({isLoggedIn, logout }) {

    useEffect(() => {
        dispatch(clearMessage());
    }, []);

    const { message } = useSelector(state => state.message);
    const dispatch = useDispatch();
    const [successful, setSuccessful] = useState(false);

    let getPreBetPreferences = "gamma/preBetPreference";
    const api = httpHelpers();

    const fetchPreBetPreferences = () => {
        api
            .get(`${getPreBetPreferences}`)
            .then(res => {
                console.log("pre bet res", res);
                if (res && res.data) {
                    setFormData({
                        pb1: res.data.pb1,
                        pb2: res.data.pb2,
                        pb3: res.data.pb3,
                        pb4: res.data.pb4,
                        pb5: res.data.pb5,
                        pb6: res.data.pb6,
                        pb7: res.data.pb7,
                        pb8: res.data.pb8,
                        userId: res.data.userId,
                    })
                }
            })

            .catch(err => {
                console.log("error error", err);
                if (err) {
                    if (err.data) {
                        if (err.data.status && err.data.status === 401) {
                            logout();
                        }
                    } else if (err.response) {
                        if (err.response.status && err.response.status === 401) {
                            logout();
                        }
                    }
                }
            });
    };

    useEffect(() => {
        if (isLoggedIn) {
            window.scrollTo(0, 0);
            fetchPreBetPreferences();
        } else {
            logout();
        }
    }, []);

    const [formData, setFormData] = useState({
        pb1: '',
        pb2: '',
        pb3: '',
        pb4: '',
        pb5: '',
        pb6: '',
        pb7: '',
        pb8: '',
        userId: '',
    });

    const [errors, setErrors] = useState({});

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: '', // Clear error for this specific input
        }));
    };

    // Validate input fields on submit
    const validateForm = () => {
        let newErrors = {};
        let isValid = true;

        // Loop through each field and check the conditions
        Object.keys(formData).forEach((key) => {
            const value = formData[key];
            if (value === '') {
                newErrors[key] = 'Field cannot be empty';
                isValid = false;
            } else if (!isNaN(value) && (parseFloat(value) < 10)) {
                newErrors[key] = 'Minimum value 10';
                isValid = false;
            }
        });

        setErrors(newErrors);
        return isValid;
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("submitting")
        if (validateForm()) {
            savePreBetPreferences();
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    const savePreBetPreferences = () => {
        console.log("savePreBetPreferences", formData);
        setSuccessful(false);
        dispatch(savePreBetPreferencesOnServer(formData.pb1, formData.pb2, formData.pb3, formData.pb4, formData.pb5, formData.pb6, formData.pb7, formData.pb8))
            .then((data) => {
                console.log("save pre bet res: ", data);
                if (data.status === 401) {
                    logout();
                } else if (data.status === 200) {
                    setSuccessful(true);
                } else {
                    setSuccessful(false);
                    alert(data.data);
                }
            })
            .catch(() => {
            });
    }

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            {successful && <span className="saved">Bets Amount Saved Successfully!</span>}
            <div className="form-row">
                <div className="input-container">
                    <input
                        type="text"
                        name="pb1"
                        className="input-button"
                        value={formData.pb1}
                        onChange={handleChange}
                        placeholder="Bet 1"
                    />
                    {errors.pb1 && <span className="error">{errors.pb1}</span>}
                </div>

                <div className="input-container">
                    <input
                        type="text"
                        name="pb2"
                        className="input-button"
                        value={formData.pb2}
                        onChange={handleChange}
                        placeholder="Bet 2"
                    />
                    {errors.pb2 && <span className="error">{errors.pb2}</span>}
                </div>

                <div className="input-container">
                    <input
                        type="text"
                        name="pb3"
                        className="input-button"
                        value={formData.pb3}
                        onChange={handleChange}
                        placeholder="Bet 3"
                    />
                    {errors.pb3 && <span className="error">{errors.pb3}</span>}
                </div>

                <div className="input-container">
                    <input
                        type="text"
                        name="pb4"
                        className="input-button"
                        value={formData.pb4}
                        onChange={handleChange}
                        placeholder="Bet 4"
                    />
                    {errors.pb4 && <span className="error">{errors.pb4}</span>}
                </div>
            </div>

            <div className="form-row">
                <div className="input-container">
                    <input
                        type="text"
                        name="pb5"
                        className="input-button"
                        value={formData.pb5}
                        onChange={handleChange}
                        placeholder="Bet 5"
                    />
                    {errors.pb5 && <span className="error">{errors.pb5}</span>}
                </div>

                <div className="input-container">
                    <input
                        type="text"
                        name="pb6"
                        className="input-button"
                        value={formData.pb6}
                        onChange={handleChange}
                        placeholder="Bet 6"
                    />
                    {errors.pb6 && <span className="error">{errors.pb6}</span>}
                </div>

                <div className="input-container">
                    <input
                        type="text"
                        name="pb7"
                        className="input-button"
                        value={formData.pb7}
                        onChange={handleChange}
                        placeholder="Bet 7"
                    />
                    {errors.pb7 && <span className="error">{errors.pb7}</span>}
                </div>

                <div className="input-container">
                    <input
                        type="text"
                        name="pb8"
                        className="input-button"
                        value={formData.pb8}
                        onChange={handleChange}
                        placeholder="Bet 8"
                    />
                    {errors.pb8 && <span className="error">{errors.pb8}</span>}
                </div>
            </div>

            <div className="form-row">
                <button type="submit" className="save-button">
                    Save
                </button>
            </div>
        </form>
    );
};