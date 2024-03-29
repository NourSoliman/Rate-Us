import React from 'react'
import NavBar from './NavBar'
import StoreSlider from './StoreSlider'
import './Home.css'
import BannerSlider from './BannersSlider';
import {  Col , Row , Container } from "react-bootstrap";
import HighRatedStores from './HighRatedStores';
function Home() {
  return (
    <div>

    <Container>
    <Row className='home-page-container'>
      {/* <Col lg={12}>
      <NavBar />
      </Col> */}
      <Col lg={12}>
        <BannerSlider />
        </Col>
      <Col className='slider-container' lg={12}>
      <StoreSlider />
        </Col>
        <Col lg={12}>
        <HighRatedStores />
        </Col>

    </Row>
    </Container>
          </div>
  )
}

export default Home