import React, {useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {ChangePassword} from '../../Redux/actions/actions'
import { Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom'; 
import './Change.css'
import NavBar from '../Home/NavBar';
function ChangePasswordForm() {
    const [oldPassword, setOldPassword] = useState(``)
    const [newPassword, setNewPassword] = useState(``)
    const [confirmPassword , setConfirmPassword] = useState(``)
    const dispatch = useDispatch()
    const {passwordLoading } = useSelector((state)=>state.user)
    const handleChangePassword = () =>{
        dispatch(ChangePassword(oldPassword, newPassword , userName , confirmPassword))
    }
    const { userName } = useParams();
    console.log(`from react` , userName);
    if (passwordLoading) {
        return (
          <div className='loading-spinner'>
            <Spinner animation='border' role='status'>
              <span className='sr-only'></span>
            </Spinner>
            <h2>Getting User Data</h2>
          </div>
        );
      }
  return (
    <div>
    <div className='change-password-form'>
        <label className='form-label'>Current Password</label>
        <input type="password" placeholder='Current Password' value={oldPassword} onChange={(e)=> setOldPassword(e.target.value)} className='form-input'></input>
        <label className='form-label'>New Password</label>
        <input type="password" placeholder='New Password' value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} className='form-input'/>
        <label className='form-label'>Confirm Password</label>
        <input type="password" placeholder='confirm Password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} className='form-input' />
        <button onClick={handleChangePassword} className='form-button'>Change Password</button>
    </div>
    </div>
  )
}

export default ChangePasswordForm