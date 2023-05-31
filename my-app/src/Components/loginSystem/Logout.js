import React from 'react'
import { useDispatch  } from 'react-redux'
import { logoutAction } from '../../Redux/actions/actions'
const Logout = () => {
    const dispatch = useDispatch()
    const handleLogout = () =>{ 
      
        dispatch(logoutAction());
    }
  return (
    <div>
        <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Logout