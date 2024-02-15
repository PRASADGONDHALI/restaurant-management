import React from "react";
import Layout from "../../components/Layout/Layout";
import { Card, Col, Container, Row } from "react-bootstrap";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/authContext";

const AdminDash = () => {
    const [auth] = useAuth();
  return (
    <Layout title={"Admin Dashboard- Delicious"}>
      <Container fluid className="m-3 p-3">
            <Row>
            <Col md={3}>
                <AdminMenu/>
            </Col>
            <Col md={9}>
            <Card className="w-75 p-4">
              <Card.Body>
                <h3 className="mb-4 text-center fw-bold">ADMIN PROFILE</h3>
                <div className="mb-3">
                  <h5 className="text-secondary">Admin Name:</h5>
                  <h4 className="fw-bold">{auth?.token ? auth?.token?.user?.name.toUpperCase() : ""}</h4>
                </div>
                <div className="mb-3">
                  <h5 className="text-secondary">Admin Email:</h5>
                  <h4 className="fw-bold">{auth?.token ? auth?.token?.user?.email : ""}</h4>
                </div>
                <div className="mb-3">
                  <h5 className="text-secondary">Admin Contact:</h5>
                  <h4 className="fw-bold">{auth?.token ? auth?.token?.user?.phone : ""}</h4>
                </div>
              </Card.Body>
            </Card>
          </Col>
            </Row>
      </Container>
    </Layout>
  );
};

export default AdminDash;
