import React , {useState, useEffect} from 'react'
import {useDispatch , useSelector} from 'react-redux'
import {userData} from '../../Redux/actions/actions'
import Home from '../Home/Home'
import ChangePasswordForm from './ChangePassword'
import Male from '../Images/Male.png'
import Female from '../Images/Female.png'
import { Spinner } from 'react-bootstrap';
import { GET_USER_SUCCESS } from '../../Redux/actions/types'
import { NavLink } from 'react-router-dom'
import { useParams } from 'react-router-dom';
const DashBoard = () => {
    const dispatch = useDispatch()
    const{userName} = useParams();
    // const userName = useSelector((state) => state.user.userName)
    const user = useSelector((state) => state.user.user);
    const [loading ,setLoading] = useState(true)
    console.log(userName)
    // useEffect(()=>{
    //     if(userName){
    //         dispatch(userData(userName)).then(()=>{
    //             setLoading(false)
    //         })
    //     }
    // },[dispatch,userName])
    useEffect(() => {
        const userData = localStorage.getItem('userData');
        if (userData) {
          const parsedUserData = JSON.parse(userData);
          dispatch({ type: GET_USER_SUCCESS, payload: parsedUserData });
          setLoading(false);
        } else {
          if (userName) {
            dispatch(userData(userName)).then(() => {
              setLoading(false);
            });
          }
        }
      }, [dispatch, userName]);

    const renderGenderPicture = () =>{
        if(user && user.gender === `female`){
            return <img src={Female} alt="female" className="img-fluid"></img>
        }else if(user && user.gender === `male`) {
            return <img src={Male} alt="male" className="img-fluid"></img>
        }
    }
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
      };
      if (loading) {
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
    <div className="container mt-4">
      <Home />
      {user && (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Dashboard</h5>
            <p className="card-text">
              {user.verified ? 'Verified User' : 'Not Verified User'}
            </p>
            <p className="card-text">Username: {user.userName}</p>
            <p className="card-text">Email: {user.email}</p>
            <p className='card-text'>Password:*****<NavLink to={`/changePassword/${userName}`}>Change Password</NavLink></p>
            <p className="card-text">
              Creation Date: {formatDate(user.creationDate)}
            </p>
            {renderGenderPicture()}
          </div>
        </div>
      )}
    </div>
  )
}

export default DashBoard