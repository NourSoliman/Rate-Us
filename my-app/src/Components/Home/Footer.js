import React from 'react';
import { NavLink } from 'react-bootstrap';
import { FaFacebookF, FaTwitter } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <p>We would greatly appreciate your assistance in providing honest reviews for other stores on our website. Your feedback will help shoppers make informed decisions and contribute to a thriving community of users.</p>
      </div>
      <div className="footer-right">
        <p>&copy; {new Date().getFullYear()} صوت المستهلك. All rights reserved.</p>
      </div>
      <div className="footer-middle">
        <ul className="social-media-icons">
          <li className='facebook'><NavLink to="https://www.facebook.com/profile.php?id=100085587985479" target="_blank"><FaFacebookF /></NavLink></li>
          <li className="twitter"><NavLink to="#"><FaTwitter /></NavLink></li>
        </ul>
      </div>
    
    </footer>
  );
};

export default Footer;
