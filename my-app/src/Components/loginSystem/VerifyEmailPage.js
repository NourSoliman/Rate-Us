import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import axios from 'axios';
import verifiedPic from '../Images/verified1.png'
import failedPic from '../Images/failed.png'
import { Spinner } from 'react-bootstrap';
import './login.css'
function VerifyEmailPage() {
  const { token } = useParams();
  const [verificationStatus, setVerificationStatus] = useState(false);
  const [isLoading , setIsLoading] = useState(true)
  useEffect(()=>{
    const verifyEmailUrl = async () => {
      try {
        // const url = `http://localhost:1997/api/verify-email?token=${token}`
        //Render
        const url = `https://rate-us.onrender.com/api/verify-email?token=${token}`
        const {data} = await axios.get(url)
        console.log(data)
        setVerificationStatus(true)
      }catch(error) {
        console.log(error);
        setVerificationStatus(false)
      } finally{
        setIsLoading(false)
      }
    }
    if(verificationStatus===false){
      verifyEmailUrl()
    } else{
      setIsLoading(false);
    }

  },[token , verificationStatus])
  if (isLoading) {
    return (
      <div className='loading-spinner'>
        <Spinner animation='border' role='status'>
          <span className='sr-only'></span>
        </Spinner>
        <h2>Verifying Email...</h2>
      </div>
    );
  }
    return (
      <div className='container'>
        {verificationStatus === true ? (
          <div className='true-div'>
            <img src={verifiedPic} alt='verifiedPic' className='verifiedPic' />
            <h2>Email Verified Successfully</h2>
            <NavLink to='/login' className='login'>
              Login Now
            </NavLink>
          </div>
        ) : (
          <div className='true-div'>
            <img src={failedPic} alt='failedPic' className='verifiedPic' />
            <h2>Error Verifying Email</h2>
            <NavLink to='/register' className='register'>
              Register
            </NavLink>
          </div>
        )}
      </div>
    );
  }

export default VerifyEmailPage;
