import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../Redux/actions/actions";
import { useNavigate } from "react-router-dom";
import Logo from "../Images/Logo4.png";
import { NavLink } from "react-router-dom";
import './register.css'
import DarkMode from "../light-dark/DarkMode";
import { Spinner } from "react-bootstrap";
const RegistrationForm = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState(``);
  const [userNameError, setUserNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [dayOfBirth, setDayOfBirth] = useState("");
  const [monthOfBirth, setMonthOfBirth] = useState("");
  const [yearOfBirth, setYearOfBirth] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const error = useSelector((state) => state.user.error);
  console.log("Error:", error);
  const msg = useSelector((state) => state.user.msg);
  console.log("Msg:", msg);
  const loggedIn = useSelector((state) => state.user.loggedIn);

  const validateUserName = (value) => {
    const userNameRegex = /^[A-Z][a-zA-Z0-9]{4,}$/;
    return userNameRegex.test(value);
  };
  const validatePassword = (value) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
    return passwordRegex.test(value);
  };
  useEffect(() => {
    if (loggedIn) {
      navigate(`/`);
    }
  }, [navigate, loggedIn]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateUserName(userName)) {
      setUserNameError(true);
      return;
    } else if (!validatePassword(password)) {
      setPasswordError(true);
      return;
    }
    const userData = {
      userName,
      email,
      password,
      confirmPassword,
      gender,
      dayOfBirth,
      monthOfBirth,
      yearOfBirth,
    };
    dispatch(register(userData));
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
    // setProfilePicture(getProfilePicture(e.target.value))
  };

  const handleUserName = (e) => {
    setUserName(e.target.value);
    setUserNameError(false);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setPasswordError(false);
  };
  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordError(false);
  };
  //date of birth functions 
  const handleDayOfBirth = (e) => {
    const value = e.target.value.slice(0, 2); // Accept only 2 numbers
    setDayOfBirth(value);
  };

  const handleMonthOfBirth = (e) => {
    const value = e.target.value.slice(0, 2); // Accept only 2 numbers
    setMonthOfBirth(value);
  };

  const handleYearOfBirth = (e) => {
    const value = e.target.value; // Accept any value entered by the user
    setYearOfBirth(value);
  };


  return (
    <div>
      <div className="login-logo">
        <NavLink to="/">
          <img src={Logo} alt="LogoName" className="login-logo" />
        </NavLink>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        style={{ position: "absolute", top: "0", left: "0" }}
      >
        <path
          fill="white"
          fill-opacity="1"
          d="M0,288L30,272C60,256,120,224,180,197.3C240,171,300,149,360,149.3C420,149,480,171,540,165.3C600,160,660,128,720,106.7C780,85,840,75,900,74.7C960,75,1020,85,1080,96C1140,107,1200,117,1260,112C1320,107,1380,85,1410,74.7L1440,64L1440,0L1410,0C1380,0,1320,0,1260,0C1200,0,1140,0,1080,0C1020,0,960,0,900,0C840,0,780,0,720,0C660,0,600,0,540,0C480,0,420,0,360,0C300,0,240,0,180,0C120,0,60,0,30,0L0,0Z"
        ></path>
      </svg>
      <div className="register-container">

      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <label className="form-label">Username:</label>
        <input type="text" value={userName} onChange={handleUserName}  className={userNameError ? 'input-error' : ''}/>
        {userNameError && (
          <ul className="userName-error">
            <li>the first letter must be upperCase</li>
            <li>minimum length of 5 characters.</li>
          </ul>
        )}
        <br />
        <label className="form-label">Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label className="form-label">Password:</label>
        <input type="password" value={password} onChange={handlePassword} className={passwordError ? 'input-error' : ''}/>
        {passwordError && (
          <ul className="userName-error">
          <li>
            Password should contain atleast 1 upperCase letter
          </li>
          <li>
            Password Must Contain atleast 1 Number
          </li>
          </ul>
        )}
        <br />
        <label className="form-label">Confirm Password:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={handleConfirmPassword}
        />
        <br />
        <label className="form-label">Gender</label>
        <div>
          <input
            type="radio"
            id="male"
            name="gender"
            value="male"
            checked={gender === `male`}
            onChange={handleGenderChange}
            required
          ></input>
          <label htmlFor="male">Male</label>
        </div>
        <div>
          <input
            type="radio"
            id="female"
            name="gender"
            value="female"
            checked={gender === `female`}
            onChange={handleGenderChange}
            required
          ></input>
          <label htmlFor="female">Female</label>
        </div>
        <div className="date-of-birth">
        <div>
          <label className="form-label">Day:</label>
          <input
            type="number"
            value={dayOfBirth}
            onChange={handleDayOfBirth}
            min={1}
            max={31}
            required
          />
        </div>
        <div>
          <label className="form-label">Month:</label>
          <input
            type="number"
            value={monthOfBirth}
            onChange={handleMonthOfBirth}
            min={1}
            max={12}
            required
          />
        </div>
        <div>
          <label className="form-label">Year:</label>
          <input
            type="number"
            value={yearOfBirth}
            onChange={handleYearOfBirth}
            min={1950}
            max={2023}
            required
          />
        </div>
        </div>
        <button type="submit" className="submit-button">Register</button>
        <p className="sign-up-link">
          Have an Account?<NavLink to="/login">Login</NavLink>
        </p>
        <div className="login-dark">
          <DarkMode />
        </div>
      </form>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        style={{ position: "absolute", bottom: "0", left: "0" }}
      >
        <path
          fill="white"
          fill-opacity="1"
          d="M0,288L30,272C60,256,120,224,180,197.3C240,171,300,149,360,149.3C420,149,480,171,540,165.3C600,160,660,128,720,106.7C780,85,840,75,900,74.7C960,75,1020,85,1080,96C1140,107,1200,117,1260,112C1320,107,1380,85,1410,74.7L1440,64L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"
        ></path>
      </svg>
    </div>
  );
};

export default RegistrationForm;
