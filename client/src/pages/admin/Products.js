import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { Card, Col, Container, Row, Button } from "react-bootstrap";
import AdminMenu from "../../components/Layout/AdminMenu";
import { toast } from "react-toastify";
import { getAllProducts } from "../../services/Apis";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../services/Helper";

const Products = () => {
  const [products, setProducts] = useState([]);
  const allProducts = async () => {
    try {
      const response = await getAllProducts();
      if (response?.products) {
        setProducts(response.products);
      }
    } catch (error) {
      toast.error("Error in fetching products", {
        position: "top-center",
      });
    }
  };
  useEffect(() => {
    allProducts();
  }, []);
  return (
    <Layout title={"Products - Delicious"}>
      <Container fluid className="m-3 p-3">
        <Row>
          <Col md={3}>
            <AdminMenu />
          </Col>
          <Col md={9}>
            <h1 className="text-center mb-4">All Product List</h1>
            <Row className="justify-content-center">
              {products?.map((product) => (
                <Col key={product._id} md={4} className="mb-4">
                  <Link
                    to={`/dashboard/admin/product/${product.slug}`}
                    className="product-link text-decoration-none"
                  >
                    <Card className="shadow-sm h-100">
                      <Card.Img
                        variant="top"
                        src={`${BASE_URL}/api/v1/product/product-photo/${product._id}`}
                      />
                      <Card.Body>
                        <h6 className="fw-bold">
                          {product?.name?.toUpperCase()}
                        </h6>
                        <Card.Text>
                          {product.description.substring(0, 20)}
                        </Card.Text>
                        <h5 className="fw-bold">₹{product.price}</h5>
                      </Card.Body>
                    </Card>
                  </Link>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Products;
