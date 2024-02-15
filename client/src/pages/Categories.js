import React from "react";
import Layout from "../components/Layout/Layout";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";
import { Card, Col, Container, Row } from "react-bootstrap";
const Categories = () => {
  const categories = useCategory();
  return (
    <Layout title={"All Categories - Delicious"}>
      <Container className="pt-2">
        <Row>
          <h1 className="text-center">ALL CATEGORIES</h1>
          {categories?.map((category) => (
            <Col md={6} className="mt-4" key={category._id}>
              <Link
                to={`/category/${category.slug}`}
                className="text-decoration-none category-link"
              >
                <Card className="h-100 shadow rounded category-card">
                  <Card.Body
                    className="d-flex align-items-center justify-content-center"
                    
                  >
                    <h5 className="m-0 fw-bold" style={{fontSize:'16px'}}>{category.name.toUpperCase()}</h5>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </Layout>
  );
};

export default Categories;
