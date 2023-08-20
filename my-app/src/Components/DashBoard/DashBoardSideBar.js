import React , {useState} from 'react';
import { useDispatch } from 'react-redux';
import { AccountCircle, Chat } from '@mui/icons-material';
import { DASHBOARD_PROFILE_DETAILS, DASHBOARD_COMMENTS , DASHBOARD_COMMENTS_FIRST } from '../../Redux/dashboardRedux/Types';
import './dashboard.css';
import './dashboardMedia.css'

const DashBoardSideBar = () => {
  const dispatch = useDispatch();
  const [activeButton, setActiveButton] = useState('');
  const handleProfileDetailsClick = () => {
    dispatch({ type: DASHBOARD_PROFILE_DETAILS });
    setActiveButton('profileDetails');
  };

  const handleCommentDetailsClick = () => {
    dispatch({ type: DASHBOARD_COMMENTS });
    setActiveButton('myComments');
  };

  return (
    <div className="dashboardsidebar-container">
        <div className='buttons-container'>
        
      <div className={`button-item ${activeButton === 'profileDetails' ? 'active' : ''}`}>
          <AccountCircle style={{color:`#0d6efd`}}/>
        <div onClick={handleProfileDetailsClick} className="profileDetails">
          <span className="profile-details">ProfileDetails</span>
        </div>
      </div>
      <div className={`button-item ${activeButton === 'myComments' ? 'active' : ''}`} >
          <Chat style={{color:`#0d6efd`}}/>
        <div onClick={handleCommentDetailsClick} className="my-comments">
            <span className='my-comment'>My-Comments</span>
        </div>
      </div>
      </div>
    </div>
  );
};

export default DashBoardSideBar;
