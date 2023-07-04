import React from 'react';
import { Col, Row } from 'react-bootstrap';
import DashBoard from './DashBoard';
import DashBoardNavBar from './DashBoardNavBar';
import DashBoardSideBar from './DashBoardSideBar';
import Footer from '../Home/Footer';
import './dashboard.css'; 
import './dashboardMedia.css'

const DashBoardMain = () => {
  return (
    <div className="dashboard-wrapper">
      <DashBoardNavBar />
      <div className="dashboard-content">
        <Row className="dashboard-row">
          <Col className="dashBoard-left-column" lg={2} md={3} xs={12}>
            <DashBoardSideBar />
          </Col>
          <Col className="main-right-column" lg={10} md={9} xs={12}>
            <DashBoard />
          </Col>
        </Row>
      </div>
      <Footer />
    </div>
  );
};

export default DashBoardMain;
