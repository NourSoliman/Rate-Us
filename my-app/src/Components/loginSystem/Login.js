
import React, { useState   , useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoginAction, userData } from '../../Redux/actions/actions';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import jwt_decode from 'jwt-decode'
import { LOGIN_SUCCESS } from '../../Redux/actions/types';
import Cookies from 'js-cookie';
const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const error = useSelector((state) => state.user.error);
  // console.log('error login', error);
  // const msg = useSelector((state) => state.user.msg);
  // console.log('msg login', msg);
  const loggedIn = useSelector((state)=>state.user.loggedIn)

  useEffect(()=>{
    const token = Cookies.get(`token`)
    if(loggedIn || token) {
      // dispatch(LoginAction(userData))
      navigate(`/`)
    }
  },[loggedIn , navigate])


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
        // document.cookie = `token=${token}; path=/; max-age=86400;`;
        Cookies.set(`token`, token , {expires : 1})
        console.log(token);
        
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {/* <ToastContainer position="top-center"/> */}
      <p>Login Form</p>
      <form onSubmit={handleSubmit}>
        <label>UserName</label>
        <input
          type="text"
          placeholder="Enter Your User-Name"
          name="userName"
          value={userName}
          onChange={e => setUserName(e.target.value)}
        ></input>
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter Your Password"
          name="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        ></input>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
