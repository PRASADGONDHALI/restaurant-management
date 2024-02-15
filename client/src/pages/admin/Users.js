import React from "react";
import Layout from "../../components/Layout/Layout";
import { Card, Col, Container, Row } from "react-bootstrap";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/authContext";
const Users = () => {
    const [auth] = useAuth();
  return (
    <Layout title={"Dashboard - All Users"}>
      <Container fluid className="m-3 p-3">
            <Row>
            <Col md={3}>
                <AdminMenu/>
            </Col>
            <Col md={9}>
            <Card className="w-75 p-3">
                <h3>Admin Name :{auth.token ? auth.token.user.name.toUpperCase():""}</h3>
            </Card>
            </Col>
            </Row>
      </Container>
    </Layout>
  )
}

export default Users