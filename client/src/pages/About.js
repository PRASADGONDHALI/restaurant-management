import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Layout from "../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={'About us - Delicious'}>
      <Container className="shared-container">
        <Row className="row">
          <Col md={6} className="shared-image">
            <Image src="/images/about.jpg" alt="About Us" fluid />
          </Col>
          <Col md={5} className="shared-info">
            <div className="info-box">
              <h2 className="info-heading">About Us</h2>
            </div>
            <p className="mt-2">
              Welcome to our online restaurant, where delightful flavors and
              culinary excellence meet at your fingertips. At Delicious, we're
              dedicated to providing a remarkable dining experience right from
              our kitchen to your home. Our commitment to quality ingredients
              and exceptional service sets us apart in the world of online
              dining.
            </p>
            <p>
              Explore our digital menu and embark on a journey of taste and
              satisfaction. From meticulously prepared dishes to a virtual
              ambiance that invites you in, we aim to make every online visit to
              Delicious a delightful one.
            </p>
            <p>
              Join us as we celebrate the art of online food delivery and the
              joy of savoring moments at your own table. Your satisfaction is
              our priority, and we look forward to serving you with excellence,
              one delicious meal at a time.
            </p>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default About;
