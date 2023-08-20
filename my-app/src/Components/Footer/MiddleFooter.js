import React from 'react'
import { Row , Col , Container } from 'react-bootstrap'
import B2 from '../Images/2B.png'
import alibaba from '../Images/alibaba.png'
import amazon from '../Images/amazon.png'
import barnes from '../Images/barnes.png'
import ebay from '../Images/ebay.png'
import rakuten from '../Images/rakuten.png'
import target from '../Images/target.png'
import walmart from '../Images/walmart.png'
const MiddleFooter = () => {
  return (
    <div className='middle-nav-container'>
    <Container>
        <Row>
            <Col lg="3" sm="6" xs="6">
            <img src={B2} alt="store-logo" className='stores-logo'/>
            </Col>
            <Col lg="3" sm="6" xs="6">
            <img src={alibaba} alt="store-logo" className='stores-logo'/>
            </Col>
            <Col lg="3" sm="6" xs="6">
            <img src={amazon} alt="store-logo" className='stores-logo'/>
            </Col>
            <Col lg="3" sm="6" xs="6">
            <img src={barnes} alt="store-logo" className='stores-logo'/>
            </Col>
            <Col lg="3" sm="6" xs="6">
            <img src={ebay} alt="store-logo" className='stores-logo'/>
            </Col>
            <Col lg="3" sm="6" xs="6">
            <img src={rakuten} alt="store-logo" className='stores-logo'/>
            </Col>
            <Col lg="3" sm="6" xs="6">
            <img src={target} alt="store-logo" className='stores-logo'/>
            </Col>
            <Col lg="3" sm="6" xs="6">
            <img src={walmart} alt="store-logo" className='stores-logo'/>
            </Col>
        </Row>
    </Container>
    </div>
  )
}

export default MiddleFooter