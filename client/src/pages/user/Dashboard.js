import React from 'react'
import Layout from '../../components/Layout/Layout'
import { useAuth } from '../../context/authContext';
import { Card, Col, Container, Row } from 'react-bootstrap';
import UserMenu from '../../components/Layout/UserMenu';

const Dashboard = () => {
  const [auth] = useAuth();
  return (
<Layout title="Dashboard - Delicious">
  <Container fluid className="m-3 p-3">
    <Row>
      <Col md={3}>
        <UserMenu />
      </Col>
      <Col md={8}>
  <Card className="p-5 shadow-lg rounded">
    <Card.Body>
      <h3 className="mb-4 text-center">User Profile</h3>
      <div className="mb-4">
        <h5 className="text-secondary">User Name:</h5>
        <h4 className="fw-bold">{auth?.token ? auth?.token?.user?.name?.toUpperCase() : ""}</h4>
      </div>
      <div className="mb-4">
        <h5 className="text-secondary">Email:</h5>
        <h4 className="fw-bold">{auth?.token ? auth?.token?.user?.email?.toUpperCase() : ""}</h4>
      </div>
      <div className="mb-4">
        <h5 className="text-secondary">Mobile No.:</h5>
        <h4 className="fw-bold">{auth?.token ? auth?.token?.user?.phone : ""}</h4>
      </div>
      <div className="mb-4">
        <h5 className="text-secondary">Address:</h5>
        <h4 className="fw-bold">{auth?.token ? auth?.token?.user?.address?.toUpperCase() : ""}</h4>
      </div>
    </Card.Body>
  </Card>
</Col>

    </Row>
  </Container>
</Layout>

  )
}

export default Dashboard