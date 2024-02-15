import React from "react";
import Layout from "../components/Layout/Layout";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

const Policy = () => {
  return (
    <Layout title={'Privacy and Policy - Delicious'}>
      <Container className="shared-container">
        <Row className="row">
          <Col md={6} className="shared-image">
            <Image src="/images/about.jpg" alt="Privacy Policy" fluid />
          </Col>
          <Col md={5} className="shared-info">
            <div className="info-box">
              <h2 className="info-heading">Privacy Policy</h2>
            </div>
            <p className="mt-2">
              At Delicious, we respect your privacy and are committed to
              protecting your personal information. This Privacy Policy outlines
              how we collect, use, and safeguard your data when you use our
              online services.
            </p>
            <p>
              We collect minimal personal information necessary for order
              processing and to enhance your experience. Your data is securely
              handled, and we do not share it with third parties without your
              consent.
            </p>
            <p>
              Please review our full Privacy Policy below to understand how we
              handle your information. If you have any questions or concerns,
              feel free to contact us.
            </p>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Policy;
