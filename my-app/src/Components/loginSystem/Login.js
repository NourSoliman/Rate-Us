import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoginAction } from "../../Redux/actions/actions";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { NavLink } from "react-router-dom";
import DarkMode from "../light-dark/DarkMode";
import Logo from "../Images/Logo4.png";
import { Spinner } from "react-bootstrap";
const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loggedIn = useSelector((state) => state.user.loggedIn);
  const loading = useSelector((state) => state.user.loading)
  useEffect(() => {
    const token = Cookies.get(`token`);
    if (loggedIn || token) {
      navigate(`/`);
    }
  }, [loggedIn, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      userName,
      password,
    };
    try {
      const response = await dispatch(LoginAction(userData));
      if (response && response.token) {
        const token = response.token;
        Cookies.set(`token`, token, { expires: 1 });
        console.log(token);
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (loading) {
    return (
      <div className="loading-spinner">
        <Spinner animation="border" role="status">
          <span className="sr-only"></span>
        </Spinner>
        <h2>Logging...</h2>
      </div>
    );
  }
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
          fillOpacity="1"
          d="M0,288L30,272C60,256,120,224,180,197.3C240,171,300,149,360,149.3C420,149,480,171,540,165.3C600,160,660,128,720,106.7C780,85,840,75,900,74.7C960,75,1020,85,1080,96C1140,107,1200,117,1260,112C1320,107,1380,85,1410,74.7L1440,64L1440,0L1410,0C1380,0,1320,0,1260,0C1200,0,1140,0,1080,0C1020,0,960,0,900,0C840,0,780,0,720,0C660,0,600,0,540,0C480,0,420,0,360,0C300,0,240,0,180,0C120,0,60,0,30,0L0,0Z"
        ></path>
      </svg>
      <div className="login-container">
        <p className="login-title">Login Form</p>
        <form onSubmit={handleSubmit}>
          <label>UserName</label>
          <input
            type="text"
            placeholder="Enter Your User-Name"
            name="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          ></input>
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter Your Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <button type="submit" className="login-button">Login</button>
        </form>
        <p className="sign-up-link">
          Don't Have an Account?<NavLink to="/register">SignUp</NavLink>
        </p>
        <div className="login-dark">
          <DarkMode />
        </div>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        style={{ position: "absolute", bottom: "0", left: "0" }}
      >
        <path
          fill="white"
          fillOpacity="1"
          d="M0,288L30,272C60,256,120,224,180,197.3C240,171,300,149,360,149.3C420,149,480,171,540,165.3C600,160,660,128,720,106.7C780,85,840,75,900,74.7C960,75,1020,85,1080,96C1140,107,1200,117,1260,112C1320,107,1380,85,1410,74.7L1440,64L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"
        ></path>
      </svg>
    </div>
  );
};

export default Login;
