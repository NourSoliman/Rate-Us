import React from 'react'
import { NavLink } from 'react-router-dom'
import Logout from '../loginSystem/Logout'
import { useSelector } from 'react-redux';
function Home() {
    const { userName } = useSelector((state) => state.user);
  return (
    <div>
        <ul>
            <NavLink to="/register">SignUp</NavLink>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/addStore">Add Store</NavLink>
            <NavLink to={`/DashBoard/${userName}`}>DashBoard</NavLink>
            <NavLink to={`/changePassword/${userName}`}>ChangePassword</NavLink>
            <NavLink><Logout /></NavLink>
            <NavLink to={`/allStores`}>allStores</NavLink>
        </ul>
    </div>
  )
}

export default Home