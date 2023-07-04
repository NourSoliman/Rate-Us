import React,{useEffect} from 'react'
import {Col , Row } from 'react-bootstrap'
import Store from './Store'
import StoresSideBar from './StoresSideBar'
import StoreDetails from './StoreDetails'
import CommentsGraph from './CommentsGraph';
import NavBar from '../Home/NavBar'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import Footer from '../Home/Footer'
const StoreMainPage = () => {
  const token = Cookies.get(`token`)
  const navigate = useNavigate()
  useEffect(()=>{
    if(!token){
      navigate(`/login`)
    }
  },[token , navigate])
  return (
    <div className="store-main-container ">
      <Col lg={12}>
      <NavBar />
      </Col>
    <Row className="row-container">
      <Row className='storeDetails-row'>
        <Col xs={12}>
        <StoreDetails />
        </Col>
      </Row>
        <Col lg={2} md={12} xs={12} className="main-left-column">
            <StoresSideBar />
        </Col>
        <Col lg={5} md={6} xs={12} className="main-middle-column">
            <Store />
        </Col>
        <Col lg={5} md={6} xs={12} className="main-right-column">
        <CommentsGraph />
        </Col>
        <Col lg={12}>
          <Footer />
        </Col>
    </Row>
    </div>
  )
}

export default StoreMainPage