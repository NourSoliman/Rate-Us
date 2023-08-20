import React from 'react'
import { Row , Col } from 'react-bootstrap'
import MiddleFooter from './MiddleFooter'
import Footer from './Footer'
function MainFooter() {
  return (
    <div>
    <Row>
        <Col lg="12">
        <MiddleFooter />
        </Col>
        <Col lg="12">
        <Footer />
        </Col>
    </Row>
    </div>
  )
}

export default MainFooter