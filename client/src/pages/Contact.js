import React from 'react'
import Layout from '../components/Layout/Layout'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMobile } from '@fortawesome/free-solid-svg-icons';


const Contact = () => {
  return (
    <Layout title={'Contact us - Delicious'}>
    <Container className="shared-container">
    <Row className='row'>
    <Col md={6} className="shared-image">
        <Image src="/images/contact.jpg" alt="Contact Us" fluid />
      </Col>
      <Col md={5} className="shared-info">
        <div className='info-box'><h2 className='info-heading'>Contact Us</h2></div>
        <p className='mt-2'>Any query or information about our products?
        Feel free to call anytime. We are available 24/7.</p>

        <div className="contact-icons">
            <FontAwesomeIcon icon={faEnvelope} className='me-2' />
            <p className='mb-0'>contact@delicious.com</p>
          </div>

          <div className="contact-icons">
            <FontAwesomeIcon icon={faPhone} className='me-2' />
            <p className='mb-0'>+91 8806076352</p>
          </div>

          <div className="contact-icons">
            <FontAwesomeIcon icon={faMobile} className='me-2' />
            <p className='mb-0'>+1 987 654 3210</p>
          </div>
      </Col>
    </Row>
  </Container></Layout>  )
}

export default Contact