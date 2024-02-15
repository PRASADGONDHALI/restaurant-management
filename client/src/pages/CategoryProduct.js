import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductsByCat } from "../services/Apis";
import Layout from "../components/Layout/Layout";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { useCart } from "../context/Cart";
import { BASE_URL } from "../services/Helper";

const CategoryProduct = () => {
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const productsByCat = async () => {
    try {
      const response = await getProductsByCat(params.slug);
      setProducts(response?.products);
      setCategory(response?.category);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (params?.slug) {
      productsByCat();
    }
  }, [params?.slug]);

  return (
    <Layout title={`${params?.slug?.toUpperCase()} - Delicious`}>
      <Container fluid className="pt-4 pb-4">
        <h3 className="text-center mb-4">{category?.name?.toUpperCase()}</h3>
        <h6 className="text-center mb-4" style={{ fontSize: "18px" }}>
          {products?.length} results found
        </h6>
        <Row xs={1} md={2} lg={4} className="g-4">
          {products.map((product) => (
            <Col key={product._id} className="d-flex">
              <Card className="h-80">
                <Card.Img
                  variant="top"
                  src={`${BASE_URL}/api/v1/product/product-photo/${product._id}`}
                />
                <Card.Body>
                  <Card.Title className="fw-bold mb-3">{product.name?.toUpperCase()}</Card.Title>
                  <Card.Text className="mb-3">{product.description?.substring(0, 50)}</Card.Text>
                  <Card.Text className="fw-bold">₹{product.price}</Card.Text>
                  <div className="d-grid mt-3">
                    <Button
                      variant="primary"
                      onClick={() => navigate(`/product/${product.slug}`)}
                    >
                      More Details
                    </Button>
                    <Button
                variant="dark"
                className="mt-3 add-to-cart-btn"
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
                ADD TO CART
              </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </Layout>
  );
};

export default CategoryProduct;
