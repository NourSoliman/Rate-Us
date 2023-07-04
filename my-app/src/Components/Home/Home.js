import React from 'react'
import NavBar from './NavBar'
import StoreSlider from './StoreSlider'
import './Home.css'
import BannerSlider from './BannersSlider';
import {  Col , Row } from "react-bootstrap";
import HighRatedStores from './HighRatedStores';
import Footer from './Footer';
function Home() {
  return (
    <div>
    <Row className='home-page-container'>
      <Col lg={12}>
      <NavBar />
      </Col>
      <Col lg={12}>
        <BannerSlider />
        </Col>
      <Col className='slider-container' lg={12}>
      <StoreSlider />
        </Col>
        <Col lg={12}>
        <HighRatedStores />
        </Col>
        <Footer />
    </Row>
          </div>
  )
}

export default Home