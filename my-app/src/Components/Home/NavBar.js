import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@mui/material";
import {  Dashboard, Store } from "@mui/icons-material";
import Logo from '../Images/Logo4.png'
import { Menu, MenuItem } from "@mui/material";
import { fetchStoreTypes } from "../../Redux/storesRedux/storeAction";
import Male from "../Images/Male.png";
import Female from "../Images/Female.png";
import Logout from "../loginSystem/Logout";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import DarkMode from "../light-dark/DarkMode";
import { Container , Row , Col } from "react-bootstrap";
import "./Navbar.css";
const NavBar = () => {
  const { userName } = useSelector((state) => state.user);
  const [closeMenu, setCloseMenu] = useState(null);
  const [profileMenuOpen, setProfileMenuOpen] = useState(null);
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.user.loggedIn);

  //token
  const token = Cookies.get(`token`);
  const decodedToken = token ? jwt_decode(token) : null;
  const gender = decodedToken ? decodedToken.gender : null;
  //handle close menu
  const handleOpenMenu = (e) => {
    setCloseMenu(e.currentTarget);
  };
  const handleOpenProfileMenu = (event) => {
    setProfileMenuOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setCloseMenu(null);
  };
  const handleCloseProfileMenu = () => {
    setProfileMenuOpen(null);
  };

  const handleFilterStoreTypes = (sellingTypes) => {
    dispatch(fetchStoreTypes(sellingTypes));
    handleCloseMenu();
  };
  return (
    <div className="navBar-Container">
      <Container>
      <Row>
      <div className="logo-container">
      <Col lg="3" sm={5}>
        <NavLink to="/">
        <img src={Logo} alt="LogoName" className="logo"/>
        </NavLink>
      </Col>
      <Col lg="8" className="nav-col" sm={5}>
      <ul className="links-Container">
        {!token && (
          <ul className="ul-sign">
            <li>
              <NavLink to="/register">SignUp</NavLink>
            </li>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li>
              <DarkMode />
            </li>
          </ul>
        )}
        {token && (
          <>
            <li className="stores-li">
              <NavLink to={`/allStores`}>
                <Button color="inherit" startIcon={<Store />} className="all-stores-button custom-button">
                  All Stores
                </Button>
              </NavLink>
            </li>
            <li className="nav-dark">
              <DarkMode />
            </li>
            {/* <li className="stores-li">
              <Button onClick={handleOpenMenu}>Store Categories</Button>
              <Menu
                anchorEl={closeMenu}
                open={Boolean(closeMenu)}
                onClose={handleCloseMenu}
                className="custom-menu"
              >
                <MenuItem onClick={() => handleFilterStoreTypes("Clothes")}>
                  <NavLink to={`/stores/selling/Clothes`}>Clothes</NavLink>
                </MenuItem>
                <MenuItem onClick={() => handleFilterStoreTypes("Shorts")}>
                  <NavLink to={`/stores/selling/Shorts`}>Shorts</NavLink>
                </MenuItem>
                <MenuItem onClick={() => handleFilterStoreTypes("Books")}>
                  <NavLink to={`/stores/selling/Books`}>Books</NavLink>
                </MenuItem>
              </Menu>
            </li> */}
            <li>
              <Button onClick={handleOpenProfileMenu}>
                {gender === "male" ? (
                  <img src={Male} alt="Male" className="profilePicture" />
                ) : (
                  <img src={Female} alt="Female" className="profilePicture" />
                )}
              </Button>
              <Menu
                anchorEl={profileMenuOpen}
                open={Boolean(profileMenuOpen)}
                onClose={handleCloseProfileMenu}
              >
                <MenuItem className="custom-menu-item">
                  <NavLink to={`/DashBoard/${userName}`}>
                    <Button color="inherit" startIcon={<Dashboard />}
                    onClick={handleCloseProfileMenu}
                    >
                      Dashboard
                    </Button>
                  </NavLink>
                </MenuItem>
                <MenuItem >
                <DarkMode />
                </MenuItem>
                <MenuItem>
                  <Logout />
                </MenuItem>
              </Menu>
            </li>
          </>
        )}
      </ul>
      </Col>
      </div>
      </Row>
      </Container>
    </div>
  );
};

export default NavBar;
