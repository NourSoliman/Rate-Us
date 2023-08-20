import React,{useEffect} from 'react'
import {Col , Row } from 'react-bootstrap'
import Store from './Store'
import StoresSideBar from './StoresSideBar'
import StoreDetails from './StoreDetails'
import CommentsGraph from './CommentsGraph';
import Cookies from 'js-cookie'
import { Comment } from  'react-loader-spinner'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const StoreMainPage = () => {
  const token = Cookies.get(`token`)
  const isLoading = useSelector((state)=>state.store.isLoading)

  const navigate = useNavigate()
  useEffect(()=>{
    if(!token){
      navigate(`/login`)
    }
  },[token , navigate])
  // if (isLoading) {
  //   return (
  //     <div className="loading-spinner">
  //       <Comment 
  //         visible={true}
  //         height="80"
  //         width="80"
  //         ariaLabel="comment-loading"
  //         wrapperStyle={{}}
  //         wrapperClass="comment-wrapper"
  //         color="#fff"
  //         backgroundColor="#F4442E"
  //       >
  //         <span className="sr-only"></span>
  //       </Comment>
  //       <h2>Loading...</h2>
  //     </div>
  //   );
  // }
  return (
    <div className="store-main-container ">
      {/* <Col lg={12}>
      <NavBar />
      </Col> */}
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
        {/* <Col lg={12}>
          <Footer />
        </Col> */}
    </Row>
    </div>
  )
}

export default StoreMainPage