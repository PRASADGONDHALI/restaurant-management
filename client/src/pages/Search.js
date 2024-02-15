import React from "react";
import Layout from "../components/Layout/Layout";
import { useSearch } from "../context/Search";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useCart } from "../context/Cart";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL } from "../services/Helper";

const Search = () => {
  const [values] = useSearch();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  return (
    <Layout title={"Search - Delicious"}>
      <Container fluid>
        <div className="text-center">
          <h1 className="my-4">Search Results</h1>
          <h5>
            {values?.results?.length < 1
              ? "No Products Found"
              : `Found ${values.results?.length || 0} Products`}
          </h5>
          <Row className="justify-content-center">
            {values?.results?.map((product) => (
              <Col key={product._id} md={3} className="mb-4">
                <Card className="h-100">
                  <Card.Img
                    variant="top"
                    src={`${BASE_URL}/api/v1/product/product-photo/${product._id}`}
                    className="card-img-top"
                  />
                  <Card.Body className="text-start">
                    <h6 className="fw-bold">{product.name?.toUpperCase()}</h6>
                    <Card.Text>
                      {product.description?.substring(0, 20)}
                    </Card.Text>
                    <h6 className="fw-bold">₹{product.price}</h6>
                    <div className="d-flex justify-content-between">
                      <Button
                        variant="primary"
                        className="ms-1"
                        onClick={() => navigate(`/product/${product.slug}`)}
                      >
                        More Details
                      </Button>
                      <Button
                        variant="dark"
                        className="ms-1"
                        onClick={() => {
                          setCart([...cart, product]);
                          localStorage.setItem(
                            "cart",
                            JSON.stringify([...cart, product])
                          );
                          toast.success("Item added to cart", {
                            position: "top-center",
                          });
                        }}
                      >
                        Add to Carts
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </Layout>
  );
};

export default Search;
