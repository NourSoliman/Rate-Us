import React, { useState , useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../Redux/actions/actions';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender , setGender] = useState(``);
  const [profilePicture , setProfilePicture] = useState(``);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const error = useSelector(state => state.user.error);
  console.log('Error:', error);
  const msg = useSelector(state => state.user.msg)
  console.log('Msg:', msg);
  const loggedIn = useSelector((state)=> state.user.loggedIn)
  useEffect(()=>{
    if(loggedIn) {
      navigate(`/`)
    }
  },[navigate ,loggedIn])
  const handleSubmit = e => {
    e.preventDefault();
    const userData = {
      userName,
      email,
      password,
      confirmPassword,
      gender,
    };
    dispatch(register(userData));
  };
  const handleGenderChange = (e) => {
    setGender(e.target.value)
    // setProfilePicture(getProfilePicture(e.target.value))
  }
  // const getProfilePicture = (gender) =>{
  //   if(gender === `female`) {
  //     return Female
  //   } else if(gender === `male`) {
  //     return Male
  //   }
  //   return ''
  // }
  return (
    <div>
      <h2>Registration Form</h2>
      {/* {error && <p>{error}</p>}
      {msg && <p>{msg}</p>} */}
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input type="text" value={userName} onChange={e => setUserName(e.target.value)} />
        <br />
        <label>Email:</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        <br />
        <label>Password:</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <br />
        <label>Confirm Password:</label>
        <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
        <br />
        <label>Gender</label>
        <div>
          <input type="radio" id="male" name='gender' value="male" checked={gender === `male`} onChange={handleGenderChange}></input>
          <label htmlFor="male">Male</label>
        </div>
        <div>
          <input type="radio" id="female" name="gender" value="female" checked={gender === `female`} onChange={handleGenderChange}></input>
          <label htmlFor="female">Female</label>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
