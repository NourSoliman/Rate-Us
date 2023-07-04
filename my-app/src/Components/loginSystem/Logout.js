import React from 'react'
import { useDispatch  } from 'react-redux'
import { Button } from '@mui/material';
import { Logout } from '@mui/icons-material';
import { logoutAction } from '../../Redux/actions/actions'
const LogoutButton = () => {
    const dispatch = useDispatch()
    const handleLogout = () =>{ 
      
        dispatch(logoutAction());
    }
  return (
    <div>
        <Button onClick={handleLogout} startIcon={<Logout />}>Logout</Button>
    </div>
  )
}

export default LogoutButton